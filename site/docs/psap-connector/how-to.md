# PSAP Connector Server - How-To Guide

This guide provides step-by-step instructions for common tasks with the PSAP Connector API.

## How to Check Server Status

Query the PSAP Connector to verify it's operational and get version information.

### Endpoint
```
GET /about
```

### Request Example

```bash
curl -X GET https://api.ng-sos.com/about \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "name": "NG SOS PSAP Connector",
  "version": "2.0.0",
  "status": "operational",
  "uptime": "15d 7h 23m",
  "connectedPsaps": 5
}
```

### Use Cases
- Health monitoring and alerting
- Version compatibility checks
- Deployment verification

## How to Assign an Incident to a PSAP

Route an emergency incident to the appropriate PSAP based on location and type.

### Endpoint
```
POST /api/v1/incidents/assign
```

### Prerequisites
- Valid incident ID from EMS
- Location data (latitude/longitude or address)
- Incident type

### Request Example

```bash
curl -X POST https://api.ng-sos.com/api/v1/incidents/assign \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "incidentId": "inc-67890",
    "location": {
      "latitude": 50.0755,
      "longitude": 14.4378,
      "address": "Palladium Shopping Center, Prague"
    },
    "type": "medical",
    "severity": "high",
    "description": "Person collapsed in shopping center"
  }'
```

### Response

```json
{
  "assignmentId": "asn-12345",
  "incidentId": "inc-67890",
  "assignedPsap": {
    "id": "psap-prague-central",
    "name": "Prague Central PSAP",
    "region": "Prague"
  },
  "status": "assigned",
  "estimatedResponseTime": "5 minutes",
  "assignedAt": "2024-01-09T13:00:00Z"
}
```

### Routing Logic

The PSAP Connector automatically determines the best PSAP based on:
1. Geographic location (primary factor)
2. Incident type specialization
3. Current PSAP capacity and availability
4. Configured routing rules

### Error Handling

Common errors:
- **400 Bad Request**: Missing required fields or invalid location data
- **404 Not Found**: No PSAP found for the given location
- **503 Service Unavailable**: All PSAPs at capacity

## How to Query Incidents by Region

Retrieve all incidents for a specific geographic region.

### Endpoint
```
GET /api/v1/regions/{regionId}/incidents
```

### Request Example

```bash
curl -X GET "https://api.ng-sos.com/api/v1/regions/prague/incidents?status=active" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Query Parameters
- `status`: Filter by incident status (active, resolved, all)
- `type`: Filter by incident type (medical, fire, police)
- `since`: Return incidents since timestamp (ISO 8601)
- `limit`: Maximum number of results (default: 50, max: 200)

### Response

```json
{
  "region": "prague",
  "totalIncidents": 3,
  "incidents": [
    {
      "incidentId": "inc-67890",
      "type": "medical",
      "status": "in_progress",
      "location": {
        "latitude": 50.0755,
        "longitude": 14.4378,
        "address": "Palladium Shopping Center"
      },
      "assignedPsap": "psap-prague-central",
      "createdAt": "2024-01-09T13:00:00Z"
    },
    {
      "incidentId": "inc-67891",
      "type": "fire",
      "status": "active",
      "location": {
        "latitude": 50.0880,
        "longitude": 14.4207,
        "address": "Old Town Square"
      },
      "assignedPsap": "psap-prague-fire",
      "createdAt": "2024-01-09T13:15:00Z"
    }
  ]
}
```

## How to Request Multi-PSAP Collaboration

For large-scale incidents requiring coordination between multiple PSAPs.

### Endpoint
```
POST /api/v1/collaboration/request
```

### Request Example

```bash
curl -X POST https://api.ng-sos.com/api/v1/collaboration/request \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "incidentId": "inc-67892",
    "requestingPsap": "psap-prague-central",
    "supportingPsaps": [
      "psap-prague-fire",
      "psap-central-bohemia"
    ],
    "reason": "Multi-vehicle accident on highway, requires fire and medical response across region boundaries",
    "priority": "high"
  }'
```

### Response

```json
{
  "collaborationId": "collab-45678",
  "incidentId": "inc-67892",
  "status": "pending",
  "requestingPsap": "psap-prague-central",
  "supportingPsaps": [
    {
      "psapId": "psap-prague-fire",
      "status": "notified",
      "notifiedAt": "2024-01-09T13:30:00Z"
    },
    {
      "psapId": "psap-central-bohemia",
      "status": "notified",
      "notifiedAt": "2024-01-09T13:30:00Z"
    }
  ]
}
```

## How to Confirm or Reject Collaboration

PSAPs can accept or decline collaboration requests.

### Confirm Collaboration

```bash
curl -X POST https://api.ng-sos.com/api/v1/collaboration/collab-45678/confirm \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "psapId": "psap-prague-fire",
    "resources": {
      "units": 2,
      "personnel": 8,
      "estimatedArrival": "10 minutes"
    }
  }'
```

### Reject Collaboration

```bash
curl -X POST https://api.ng-sos.com/api/v1/collaboration/collab-45678/reject \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "psapId": "psap-central-bohemia",
    "reason": "All units currently deployed to other emergencies"
  }'
```

### Response (Confirm)

```json
{
  "collaborationId": "collab-45678",
  "psapId": "psap-prague-fire",
  "status": "confirmed",
  "confirmedAt": "2024-01-09T13:32:00Z",
  "resources": {
    "units": 2,
    "personnel": 8,
    "estimatedArrival": "10 minutes"
  }
}
```

## How to Update Incident Status

Update the current status of an incident being handled by a PSAP.

### Endpoint
```
PATCH /api/v1/incidents/{incidentId}/status
```

### Request Example

```bash
curl -X PATCH https://api.ng-sos.com/api/v1/incidents/inc-67890/status \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress",
    "psapId": "psap-prague-central",
    "notes": "Ambulance dispatched, ETA 3 minutes",
    "respondingUnits": [
      {
        "unitId": "amb-101",
        "type": "ambulance",
        "personnel": 2
      }
    ]
  }'
```

### Status Values
- `assigned`: Incident assigned to PSAP
- `accepted`: PSAP confirmed receipt
- `in_progress`: Emergency response underway
- `resolved`: Incident resolved
- `cancelled`: Incident cancelled (false alarm)
- `transferred`: Incident transferred to another PSAP

### Response

```json
{
  "incidentId": "inc-67890",
  "status": "in_progress",
  "updatedAt": "2024-01-09T13:35:00Z",
  "updatedBy": "psap-prague-central",
  "history": [
    {
      "status": "assigned",
      "timestamp": "2024-01-09T13:00:00Z"
    },
    {
      "status": "accepted",
      "timestamp": "2024-01-09T13:01:00Z"
    },
    {
      "status": "in_progress",
      "timestamp": "2024-01-09T13:35:00Z"
    }
  ]
}
```

## How to List Available Regions

Query all regions served by the PSAP Connector.

### Endpoint
```
GET /api/v1/regions
```

### Request Example

```bash
curl -X GET https://api.ng-sos.com/api/v1/regions \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "totalRegions": 5,
  "regions": [
    {
      "id": "prague",
      "name": "Prague",
      "country": "Czech Republic",
      "psaps": [
        {
          "id": "psap-prague-central",
          "name": "Prague Central PSAP",
          "types": ["medical", "police"]
        },
        {
          "id": "psap-prague-fire",
          "name": "Prague Fire Department",
          "types": ["fire"]
        }
      ],
      "coordinates": {
        "center": {"latitude": 50.0755, "longitude": 14.4378},
        "bounds": {
          "north": 50.1773,
          "south": 49.9419,
          "east": 14.7068,
          "west": 14.2244
        }
      }
    }
  ]
}
```

## Best Practices

### Routing Optimization
- Always provide accurate location data (latitude/longitude)
- Include detailed incident descriptions to aid routing
- Specify incident type and severity correctly

### Status Updates
- Update incident status in real-time as situations evolve
- Include relevant details in status notes
- Use appropriate status values for accurate tracking

### Collaboration
- Only request collaboration when truly needed
- Provide clear reasons for collaboration requests
- Respond to collaboration requests promptly

### Error Handling
Implement robust error handling:

```javascript
async function assignIncidentWithRetry(incident) {
  try {
    return await assignIncident(incident);
  } catch (error) {
    if (error.status === 404) {
      // No PSAP found - try expanding search radius
      console.error('No PSAP found for location:', incident.location);
      // Implement fallback logic
    } else if (error.status === 503) {
      // PSAPs at capacity - escalate
      console.error('All PSAPs unavailable');
      // Implement escalation logic
    }
    throw error;
  }
}
```

## Troubleshooting

### Common Issues

**Issue**: No PSAP found for location (404)
- **Solution**: Verify latitude/longitude are valid and within served regions
- **Solution**: Check if region configuration includes the location

**Issue**: Assignment fails with 503
- **Solution**: All PSAPs may be at capacity - check PSAP status
- **Solution**: Implement queue logic or escalation procedures

**Issue**: Collaboration requests timing out
- **Solution**: Ensure supporting PSAPs have valid configurations
- **Solution**: Check network connectivity to PSAPs

**Issue**: Status updates not reflected
- **Solution**: Verify incident ID is correct
- **Solution**: Check that PSAP has permission to update the incident

## Integration Examples

### Node.js/TypeScript

```typescript
import { PsapConnectorClient } from '@ng-sos/psap-connector-sdk';

const client = new PsapConnectorClient({
  apiKey: process.env.NG_SOS_API_KEY
});

// Assign an incident
const assignment = await client.incidents.assign({
  incidentId: 'inc-67890',
  location: { latitude: 50.0755, longitude: 14.4378 },
  type: 'medical',
  severity: 'high'
});

console.log(`Assigned to: ${assignment.assignedPsap.name}`);
```

### Python

```python
from ng_sos import PsapConnectorClient

client = PsapConnectorClient(api_key=os.environ['NG_SOS_API_KEY'])

# Query region incidents
incidents = client.regions.get_incidents(
    region_id='prague',
    status='active'
)

for incident in incidents:
    print(f"Incident {incident.id}: {incident.status}")
```

## Additional Resources

- [PSAP Connector OpenAPI Specification](../../specs/ng-sos-psap-connector-v2.0.0.yaml)
- [Getting Started Guide](../getting-started.md)
- [EMS Documentation](../ems/overview.md)

## Support

For technical support:
- Email: mdybal@medicalit.eu
- GitHub: [medicalit-eu/ng-sos-apidoc](https://github.com/medicalit-eu/ng-sos-apidoc)
