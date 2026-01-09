# Emergency Message Server (EMS) - Overview

The Emergency Message Server (EMS) is a critical component of the NG SOS platform that handles emergency message processing and management from multiple sources.

## What is EMS?

EMS acts as the central message processing hub for emergency communications. It receives messages through various integration points, processes them according to business rules, and routes them to appropriate emergency service providers.

## Key Capabilities

### SMS Integration
EMS integrates with telecommunications providers to receive and process emergency SMS messages. Currently supported:
- **Develogi Integration**: Receive SMS messages and status updates through the Develogi platform

### Message Processing
The server processes incoming emergency messages by:
- Validating message format and content
- Extracting location information when available
- Categorizing message urgency and type
- Routing to appropriate emergency services

### Mobile App Integration
EMS provides endpoints for mobile applications to:
- Report incidents directly
- Update incident status
- Provide location and multimedia data

### PSAP Connector Integration
EMS works in tandem with the PSAP Connector to ensure emergency messages reach the right Public Safety Answering Points.

## Architecture

EMS follows a microservices architecture pattern with these main components:

```
[SMS Provider] ---> [EMS API] ---> [Message Queue] ---> [PSAP Connector]
                        |
                [Mobile Apps] ---> [EMS API]
```

## Use Cases

### Use Case 1: SMS Emergency Alert
A citizen sends an emergency SMS to a designated number. EMS:
1. Receives the SMS via Develogi integration
2. Parses the message content and extracts metadata
3. Determines the caller's location (if available)
4. Routes the alert to the appropriate PSAP
5. Sends confirmation back to the sender

### Use Case 2: Mobile App Incident Report
A mobile app user reports an emergency. EMS:
1. Receives structured incident data via API
2. Validates the incident information
3. Enriches with location data
4. Creates an incident record
5. Notifies relevant emergency services

### Use Case 3: Status Updates
Emergency service providers can query and update incident status through EMS endpoints.

## API Organization

The EMS API is organized by integration type:

- **Develogi Integration** (`/integrations/develogi/v1/*`): SMS reception and status updates
- **Mobile Integration**: Endpoints for mobile app incident reporting
- **PSAP Integration**: Connectivity with PSAP Connector services

## Getting Started

To start using the EMS API:

1. Review the [Getting Started guide](../getting-started.md) for authentication
2. Check the [EMS How-To guide](./how-to.md) for common tasks
3. Explore the [EMS API Reference](./api-reference.mdx) for complete endpoint details

## Data Model

### Key Resources

**Emergency Message**: The core entity representing an emergency communication
- Source (SMS, mobile app, etc.)
- Content and metadata
- Location information
- Timestamp and status

**Integration Event**: Record of external system interactions
- Integration type (Develogi, etc.)
- Event type (received, delivered, failed)
- Payload and response data

## Security

EMS implements multiple security layers:
- Bearer token authentication for all endpoints
- Request validation and sanitization
- Rate limiting to prevent abuse
- Audit logging of all operations

## Performance

EMS is designed for high availability:
- Sub-second response times for message reception
- Automatic failover and redundancy
- Horizontal scaling capability
- Message queue for reliable delivery

## Next Steps

- Learn [how to perform common tasks](./how-to.md) with EMS
- Review the [complete API reference](./api-reference.mdx)
- Explore [PSAP Connector integration](../psap-connector/overview.md)
