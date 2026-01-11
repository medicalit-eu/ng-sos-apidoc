# PSAP Connector Server - Overview

The PSAP Connector Server is a critical routing component of the NG SOS platform that connects emergency incidents to the appropriate Public Safety Answering Points (PSAPs).

## What is PSAP Connector?

The PSAP Connector acts as an intelligent routing layer between the Emergency Message Server and regional PSAPs. It determines which PSAP should handle each incident based on location, incident type, and PSAP capacity.

## Key Capabilities

### Intelligent Routing
The PSAP Connector analyzes incident data to determine the optimal PSAP:
- Geographic location-based routing
- Incident type matching (medical, fire, police)
- PSAP availability and capacity
- Backup routing when primary PSAP is unavailable

### Incident Management
Comprehensive incident lifecycle management:
- Incident assignment to PSAPs
- Status tracking and updates
- Region-based incident organization
- Collaboration between multiple PSAPs

### PSAP Integration
Seamless connectivity with PSAP systems:
- Real-time incident notification
- Two-way status synchronization
- Collaboration confirmation/rejection
- Region management

### System Information
Operational endpoints for monitoring:
- Server health and status (`/about`)
- Version information
- Configuration details

## Architecture

The PSAP Connector sits between EMS and regional PSAPs:

```
[EMS] ---> [PSAP Connector] ---> [PSAP Prague]
                |
                +---> [PSAP Brno]
                |
                +---> [PSAP Ostrava]
```

## Use Cases

### Use Case 1: Geographic Routing
An emergency occurs in Prague. The PSAP Connector:
1. Receives incident from EMS with location data
2. Determines the incident is within Prague PSAP jurisdiction
3. Routes the incident to Prague PSAP
4. Confirms assignment with EMS
5. Monitors incident status

### Use Case 2: Multi-PSAP Collaboration
A large-scale incident requires multiple PSAPs. The PSAP Connector:
1. Assigns the primary incident to the local PSAP
2. Identifies affected regions requiring collaboration
3. Sends collaboration requests to neighboring PSAPs
4. Coordinates responses and status updates
5. Manages the collaborative response

### Use Case 3: Failover Routing
The primary PSAP is at capacity or unavailable. The PSAP Connector:
1. Detects primary PSAP unavailability
2. Identifies backup PSAP based on jurisdiction overlap
3. Routes incident to backup PSAP
4. Notifies EMS of the routing change
5. Restores primary routing when available

## API Organization

The PSAP Connector API is organized by functional area:

- **About** (`/about`): Server information and health status
- **Incidents** (`/api/v1/incidents/*`): Incident assignment and management
- **Regions** (`/api/v1/regions/*`): Region-based incident queries
- **Collaboration** (`/api/v1/collaboration/*`): Multi-PSAP coordination

## Getting Started

To start using the PSAP Connector API:

1. Review the [Getting Started guide](../getting-started.md) for authentication
2. Check the [PSAP Connector How-To guide](./how-to.md) for common tasks
3. Explore the [OpenAPI specification](https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/specs/ng-sos-psap-connector-v2.0.0.yaml)

## Data Model

### Key Resources

**Incident Assignment**: Links incidents to PSAPs
- Incident ID from EMS
- Assigned PSAP identifier
- Assignment timestamp
- Status (assigned, accepted, in_progress, resolved)

**Region**: Geographic area served by a PSAP
- Region identifier and name
- Geographic boundaries
- Assigned PSAP
- Priority and capacity

**Collaboration Request**: Multi-PSAP coordination
- Primary incident
- Requesting PSAP
- Supporting PSAPs
- Collaboration status

## Routing Logic

The PSAP Connector uses sophisticated routing logic:

### Primary Routing Factors
1. **Geographic location**: Incident coordinates matched to PSAP regions
2. **Incident type**: Some PSAPs specialize in specific emergency types
3. **PSAP capacity**: Available resources and current load
4. **Priority rules**: Configurable routing policies

### Fallback Mechanisms
- Nearest PSAP when location is ambiguous
- Round-robin when multiple PSAPs serve the same area
- Manual override capability for special cases

## Security

The PSAP Connector implements enterprise-grade security:
- Mutual TLS for PSAP connections
- Bearer token authentication for API access
- Role-based access control (RBAC)
- Comprehensive audit logging
- Encryption at rest and in transit

## High Availability

Designed for 99.99% uptime:
- Active-active clustering
- Geographic redundancy
- Automatic failover
- Health monitoring and alerting
- Zero-downtime updates

## Performance

Optimized for emergency response:
- Sub-100ms routing decisions
- Supports 10,000+ concurrent incidents
- Real-time status updates
- Efficient database queries with caching

## Monitoring and Observability

Built-in monitoring capabilities:
- Prometheus metrics endpoints
- Structured logging (JSON)
- OpenTelemetry tracing
- Health check endpoints
- Performance dashboards

## Integration Points

### Upstream: Emergency Message Server
Receives incident notifications from EMS with:
- Incident details and metadata
- Location information
- Incident type and severity
- Reporter information

### Downstream: PSAP Systems
Sends incident assignments to PSAPs via:
- REST API integration
- Webhook notifications
- Message queue (when configured)
- Legacy protocol adapters (when needed)

## Versioning

PSAP Connector follows semantic versioning:
- **Current version**: 2.0.0
- **Previous version**: 1.x.x (deprecated, supported until 2025-12-31)

Version 2.0 introduces:
- Enhanced routing algorithms
- Multi-region collaboration
- Improved performance and scalability
- New REST API endpoints

## Next Steps

- Learn [how to perform common tasks](./how-to.md) with PSAP Connector
- Review the [complete API reference](https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/specs/ng-sos-psap-connector-v2.0.0.yaml)
- Explore [EMS integration](../ems/overview.md)
- Understand [Portal URL API](../portal-url/overview.md) for UI integration
