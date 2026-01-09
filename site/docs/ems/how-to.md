# Emergency Message Server (EMS) - How-To Guide

This guide provides step-by-step instructions for common tasks with the EMS API.

## How to Receive SMS Messages

The EMS API receives SMS messages through the Develogi integration endpoint.

### Endpoint
```
POST /integrations/develogi/v1/sms-receive
```

### Prerequisites
- Valid API authentication token
- Develogi integration configured

### Request Example

```bash
curl -X POST https://api.ng-sos.com/integrations/develogi/v1/sms-receive \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+420123456789",
    "message": "Emergency at Main Street 123, Prague",
    "timestamp": "2024-01-09T13:00:00Z",
    "messageId": "msg-12345"
  }'
```

### Response

On success, you receive a `200 OK` response:

```json
{
  "status": "received",
  "incidentId": "inc-67890"
}
```

### Error Handling

If the request fails, check these common issues:
- **400 Bad Request**: Missing required fields (phoneNumber, message, timestamp)
- **401 Unauthorized**: Invalid or missing API token
- **415 Unsupported Media Type**: Missing or incorrect Content-Type header

## How to Update SMS Status

Update the delivery status of an SMS that was sent through the system.

### Endpoint
```
POST /integrations/develogi/v1/sms-status
```

### Request Example

```bash
curl -X POST https://api.ng-sos.com/integrations/develogi/v1/sms-status \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "messageId": "msg-12345",
    "status": "delivered",
    "timestamp": "2024-01-09T13:05:00Z"
  }'
```

### Status Values
- `sent`: Message was sent from the system
- `delivered`: Message was delivered to recipient
- `failed`: Delivery failed
- `pending`: Message is queued for delivery

### Response

```json
{
  "status": "updated",
  "messageId": "msg-12345"
}
```

## How to Handle Mobile App Incidents

Mobile applications can report incidents directly to EMS.

### Endpoint
```
POST /api/v1/incidents
```

### Request Example

```bash
curl -X POST https://api.ng-sos.com/api/v1/incidents \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "medical",
    "description": "Person collapsed in shopping center",
    "location": {
      "latitude": 50.0755,
      "longitude": 14.4378,
      "address": "Palladium Shopping Center, Prague"
    },
    "reporter": {
      "name": "John Doe",
      "phone": "+420123456789"
    },
    "severity": "high"
  }'
```

### Response

```json
{
  "incidentId": "inc-67890",
  "status": "created",
  "estimatedResponseTime": "5 minutes",
  "confirmationCode": "CODE-1234"
}
```

## How to Query Incident Status

Check the current status of an incident.

### Endpoint
```
GET /api/v1/incidents/{incidentId}
```

### Request Example

```bash
curl -X GET https://api.ng-sos.com/api/v1/incidents/inc-67890 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "incidentId": "inc-67890",
  "status": "in_progress",
  "type": "medical",
  "created": "2024-01-09T13:00:00Z",
  "updated": "2024-01-09T13:05:00Z",
  "assignedTo": "PSAP-Prague-Central",
  "location": {
    "latitude": 50.0755,
    "longitude": 14.4378,
    "address": "Palladium Shopping Center, Prague"
  }
}
```

### Status Values
- `created`: Incident was created and is being processed
- `assigned`: Incident assigned to a PSAP
- `in_progress`: Emergency services are responding
- `resolved`: Incident has been resolved
- `cancelled`: Incident was cancelled

## How to Integrate with PSAP Connector

EMS works together with the PSAP Connector to route emergencies. Here's how they interact:

### Step 1: EMS Receives Emergency
EMS receives an emergency message (via SMS or mobile app).

### Step 2: EMS Creates Incident
EMS processes the message and creates an incident record.

### Step 3: EMS Notifies PSAP Connector
EMS sends the incident to the PSAP Connector for routing:

```bash
curl -X POST https://api.ng-sos.com/api/v1/psap-connector/incidents \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "incidentId": "inc-67890",
    "location": {
      "latitude": 50.0755,
      "longitude": 14.4378
    },
    "type": "medical"
  }'
```

### Step 4: PSAP Connector Routes to Appropriate PSAP
The PSAP Connector determines which PSAP should handle the incident based on location and type.

Check the [PSAP Connector documentation](../psap-connector/overview.md) for more details on the routing logic.

## Best Practices

### Message Validation
Always validate incoming messages before processing:
- Check for required fields
- Validate phone number format
- Sanitize message content to prevent injection attacks

### Error Recovery
Implement retry logic with exponential backoff:
```javascript
async function sendWithRetry(data, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await sendToEMS(data);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(Math.pow(2, i) * 1000);
    }
  }
}
```

### Logging
Log all emergency messages for audit and debugging:
- Message content (with PII considerations)
- Timestamps
- Processing results
- Error conditions

### Testing
Test your integration thoroughly:
- Use test API keys in development
- Verify error handling with invalid data
- Test rate limiting behavior
- Validate location data accuracy

## Troubleshooting

### Common Issues

**Issue**: 401 Unauthorized responses
- **Solution**: Verify your API key is correct and included in the Authorization header

**Issue**: Messages not being routed
- **Solution**: Check that location data is valid and falls within a supported region

**Issue**: Rate limit errors (429)
- **Solution**: Implement exponential backoff and reduce request frequency

**Issue**: Location parsing failures
- **Solution**: Ensure latitude/longitude are within valid ranges (-90 to 90, -180 to 180)

## Additional Resources

- [EMS OpenAPI Specification](https://github.com/medicalit-eu/ng-sos-apidoc/blob/mahttps://github.com/medicalit-eu/ng-sos-apidoc/blob/main/specs/ng-sos-ems-v1.0.0.yaml)
- [Getting Started Guide](../getting-started.md)
- [PSAP Connector Documentation](../psap-connector/overview.md)

## Support

For technical support or questions:
- Email: mdybal@medicalit.eu
- GitHub Issues: [medicalit-eu/ng-sos-apidoc](https://github.com/medicalit-eu/ng-sos-apidoc)
