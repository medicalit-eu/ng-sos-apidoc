# NG SOS API Documentation

Welcome to the NG SOS API documentation. This comprehensive resource provides everything you need to integrate with the NG SOS (Next Generation State Operating System) emergency services platform.

## Overview

The NG SOS platform consists of three primary APIs that work together to provide a complete emergency services solution:

### [Emergency Message Server (EMS)](./ems/overview.md)
The Emergency Message Server handles emergency message processing and management, including SMS reception and integration with emergency services.

- **Version**: 1.0.0
- **Purpose**: Process and manage emergency messages from multiple sources
- **Key Features**: SMS integration, message routing, emergency service integration

### [PSAP Connector Server](./psap-connector/overview.md)
The PSAP Connector Server provides connectivity between the NG SOS platform and Public Safety Answering Points (PSAPs).

- **Version**: 2.0.0
- **Purpose**: Connect emergency calls to appropriate PSAPs
- **Key Features**: Call routing, incident management, regional coordination

### [Portal URL API](./portal-url/overview.md)
The Portal URL API provides URLs and endpoints for the NG SOS portal, facilitating easy integration into third-party applications.

- **Version**: 1.0.0
- **Purpose**: Deep linking and portal integration
- **Key Features**: Incident views, pre-filled forms, archive access

## Quick Start

New to NG SOS? Start with our [Getting Started guide](./getting-started.md) to learn about:
- Authentication and API keys
- API versioning strategy
- Common error handling
- Rate limits and best practices

## API Reference

Interactive API documentation is available for each API:
- [EMS API Reference](./ems/api-reference.mdx)
- [PSAP Connector API Reference](./psap-connector/api-reference.mdx)
- [Portal URL API Reference](./portal-url/api-reference.mdx)

## SDK Support

We provide officially supported SDKs for common programming languages:
- **TypeScript/JavaScript**: `/sdk/typescript/`
- **C#/.NET**: `/sdk/csharp/`
- **Python**: `/sdk/python/`

SDKs are automatically generated from our OpenAPI specifications to ensure they stay in sync with the latest API changes.

## Support

For questions, issues, or feedback:
- **Email**: mdybal@medicalit.eu

## License

This documentation is maintained by Medical IT EU. For licensing information, please contact us directly.
