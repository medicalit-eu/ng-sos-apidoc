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

## Developer Integration Options

NG SOS provides multiple ways for developers to integrate with our APIs, designed to suit different development workflows and preferences:

### Interactive API Reference with Redoc

Each API includes an **interactive API reference** powered by Redoc, providing a comprehensive, navigable view of all endpoints, request/response schemas, and examples:

- **[EMS API Reference](./ems/api-reference/)** - Complete Emergency Message Server API documentation with live examples
- **[PSAP Connector API Reference](./psap-connector/api-reference/)** - Full PSAP Connector Server API with request/response details
- **[Portal URL API Reference](./portal-url/api-reference/)** - Portal URL API endpoints and parameters

**Redoc Features:**
- **Search functionality** - Quickly find endpoints, parameters, or schemas
- **Code samples** - Auto-generated request examples in multiple languages
- **Schema visualization** - Interactive exploration of complex data structures
- **Try-it-out capability** - Test endpoints directly from the documentation
- **Deep linking** - Share direct links to specific endpoints or schemas
- **Responsive design** - Works seamlessly on desktop and mobile devices

### OpenAPI Specifications

Download the complete OpenAPI 3.0 specifications for programmatic access or tooling integration:
- [EMS OpenAPI Spec](https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/specs/ng-sos-ems-v1.0.0.yaml)
- [PSAP Connector OpenAPI Spec](https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/specs/ng-sos-psap-connector-v2.0.0.yaml)
- [Portal URL OpenAPI Spec](https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/specs/ng-sos-portal-url-v1.0.0.yaml)

**Use cases for OpenAPI specs:**
- Generate client SDKs in your preferred language
- Import into API testing tools (Postman, Insomnia, etc.)
- Validate API requests/responses in your application
- Generate mock servers for testing
- Create custom documentation

### LLM Integration

NG SOS API documentation is optimized for Large Language Model (LLM) integration, enabling AI-powered development assistance:

**[llms.txt](https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/llms.txt)** - Lightweight navigation map
- High-level structure and overview of all APIs
- Links to key documentation sections
- Ideal for quick AI assistant context loading
- Follows the [llms.txt specification](https://llmstxt.org/)

**[llms-full.txt](https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/llms-full.txt)** - Complete documentation bundle
- Flattened version of all narrative documentation
- Includes all OpenAPI specifications
- Full API endpoint descriptions and examples
- Perfect for comprehensive AI assistance

**How to use with AI tools:**
- **GitHub Copilot** - Automatically indexes this repository for context-aware suggestions
- **ChatGPT/Claude** - Upload llms-full.txt for comprehensive API knowledge
- **Custom AI integrations** - Parse llms.txt for structured documentation access
- **RAG systems** - Use as a knowledge base for AI-powered developer tools

**Benefits:**
- Get instant answers about API endpoints and parameters
- Generate code snippets with correct API usage
- Understand error handling and best practices
- Explore integration patterns and examples

## SDK Support

We provide officially supported SDKs for common programming languages:
- **TypeScript/JavaScript**: `/sdk/typescript/`
- **C#/.NET**: `/sdk/csharp/`
- **Python**: `/sdk/python/`

SDKs are automatically generated from our OpenAPI specifications to ensure they stay in sync with the latest API changes.

## Support

For questions, issues, or feedback:
- **Email**: mdybal@medicalit.eu
- **GitHub**: [medicalit-eu/ng-sos-apidoc](https://github.com/medicalit-eu/ng-sos-apidoc)

## License

This documentation is maintained by Medical IT EU. For licensing information, please contact us directly.
