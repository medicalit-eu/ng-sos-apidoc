# Getting Started

This guide will help you get up and running with the NG SOS APIs quickly and efficiently.

## Prerequisites

Before you begin, you will need:
- A valid API key (contact mdybal@medicalit.eu to obtain access)
- Basic understanding of RESTful APIs
- HTTP client library for your programming language

## Authentication

All NG SOS APIs use bearer token authentication. Include your API key in the `Authorization` header of each request:

```http
Authorization: Bearer YOUR_API_KEY
```

Example with curl:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.ng-sos.com/api/endpoint
```

### Security Best Practices

You should follow these security guidelines:
- Never commit API keys to version control
- Store keys in environment variables or secure key management systems
- Rotate keys periodically
- Use different keys for development and production environments

## API Versioning

NG SOS APIs follow semantic versioning (MAJOR.MINOR.PATCH). The API version is included in the OpenAPI specification and in the base URL where applicable.

### Version Policy

- **Major versions** (e.g., 1.x.x to 2.x.x): Breaking changes that require code updates
- **Minor versions** (e.g., 1.1.x to 1.2.x): New features that are backward compatible
- **Patch versions** (e.g., 1.1.1 to 1.1.2): Bug fixes and minor improvements

When a new major version is released, the previous version will be supported for at least 12 months to allow migration time.

## Request and Response Format

All APIs use JSON for request and response bodies. Set the `Content-Type` header appropriately:

```http
Content-Type: application/json
```

Example POST request:

```json
{
  "field1": "value1",
  "field2": "value2"
}
```

## Error Handling

The NG SOS APIs use standard HTTP status codes to indicate success or failure:

### Success Codes
- **200 OK**: Request succeeded
- **201 Created**: Resource was successfully created
- **204 No Content**: Request succeeded with no response body

### Client Error Codes
- **400 Bad Request**: Invalid request format or parameters
- **401 Unauthorized**: Missing or invalid authentication
- **403 Forbidden**: Valid authentication but insufficient permissions
- **404 Not Found**: Resource does not exist
- **415 Unsupported Media Type**: Invalid Content-Type header

### Server Error Codes
- **500 Internal Server Error**: Unexpected server error
- **503 Service Unavailable**: Service temporarily unavailable

### Error Response Format

Error responses include a JSON body with details:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Missing required field: phoneNumber",
    "details": {}
  }
}
```

## Rate Limits

To ensure fair usage and system stability, the NG SOS APIs implement rate limiting:

- **Default limit**: 100 requests per minute per API key
- **Burst limit**: 20 requests per second

When you exceed the rate limit, you will receive a `429 Too Many Requests` response. The response includes `Retry-After` header indicating when you can retry.

### Best Practices
- Implement exponential backoff when retrying failed requests
- Cache responses when appropriate
- Use webhooks instead of polling where available

## Making Your First Request

Let's make a simple request to the PSAP Connector API to get the server information:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.ng-sos.com/about
```

Expected response:

```json
{
  "version": "2.0.0",
  "name": "NG SOS PSAP Connector",
  "status": "operational"
}
```

## Next Steps

Now that you understand the basics, explore the specific APIs:
- [Emergency Message Server (EMS)](./ems/overview.md)
- [PSAP Connector Server](./psap-connector/overview.md)
- [Portal URL API](./portal-url/overview.md)

Or dive into the complete [API Reference](../specs/) documentation.

## Getting Help

If you encounter issues or have questions:
- Check the [OpenAPI specifications](../specs/) for detailed endpoint documentation
- Review the how-to guides for each API
- Contact support at mdybal@medicalit.eu
