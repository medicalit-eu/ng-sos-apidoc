# NG SOS API Documentation

> **Comprehensive API documentation for the NG SOS emergency services platform**

[![Documentation](https://img.shields.io/badge/docs-live-brightgreen)](https://medicalit-eu.github.io/ng-sos-apidoc/)
[![GitHub](https://img.shields.io/github/license/medicalit-eu/ng-sos-apidoc)](LICENSE)

Welcome to the NG SOS API documentation repository. This project provides complete, developer-friendly documentation for all NG SOS servers, including OpenAPI specifications, narrative guides, code examples, and automatically generated SDKs.

## 📚 What's Inside

The NG SOS platform consists of three primary APIs:

### [Emergency Message Server (EMS)](docs/ems/overview.md)
Handles emergency message processing and management from multiple sources including SMS and mobile apps.
- **Version**: 1.0.0
- **Use cases**: SMS integration, incident reporting, message routing

### [PSAP Connector Server](docs/psap-connector/overview.md)
Routes emergency incidents to the appropriate Public Safety Answering Points (PSAPs).
- **Version**: 2.0.0
- **Use cases**: Call routing, multi-PSAP coordination, incident management

### [Portal URL API](docs/portal-url/overview.md)
Provides deep linking and integration with the NG SOS web portal.
- **Version**: 1.0.0
- **Use cases**: URL generation, form pre-filling, iFrame embedding

## 🚀 Quick Start

### View Documentation

Visit our **[Interactive Documentation Site](https://medicalit-eu.github.io/ng-sos-apidoc/)** for the complete guide.

### Using the APIs

```bash
# Example: Query PSAP Connector status
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.ng-sos.com/about
```

See the [Getting Started Guide](docs/getting-started.md) for authentication, error handling, and best practices.

### Using SDKs

We provide officially supported SDKs for:
- **TypeScript/JavaScript** - `/sdk/typescript/`
- **C#/.NET** - `/sdk/csharp/`
- **Python** - `/sdk/python/`

SDKs are automatically generated from our OpenAPI specifications.

## 📁 Repository Structure

```
ng-sos-apidoc/
├── docs/                    # Narrative documentation (Markdown)
│   ├── index.md            # Documentation landing page
│   ├── getting-started.md  # Authentication, errors, best practices
│   ├── ems/                # EMS API guides
│   ├── psap-connector/     # PSAP Connector guides
│   └── portal-url/         # Portal URL API guides
├── specs/                   # Versioned OpenAPI specifications
│   ├── ng-sos-ems-v1.0.0.yaml
│   ├── ng-sos-psap-connector-v2.0.0.yaml
│   └── ng-sos-portal-url-v1.0.0.yaml
├── sdk/                     # Generated SDKs (not committed)
│   ├── typescript/
│   ├── csharp/
│   └── python/
├── scripts/                 # Build and generation scripts
│   ├── generate-llms-full.sh
│   ├── generate-sdks.sh
│   └── validate-specs.sh
├── site/                    # Docusaurus documentation website
├── llms.txt                 # AI assistant map (llms.txt spec)
├── llms-full.txt           # Complete flattened documentation
└── .github/workflows/       # CI/CD automation
```

## 🔧 Development

### Prerequisites

- Node.js 20 or later
- Bash (for scripts)
- (Optional) OpenAPI Generator for SDK generation

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/medicalit-eu/ng-sos-apidoc.git
   cd ng-sos-apidoc
   ```

2. **Install Docusaurus dependencies**
   ```bash
   cd site
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   
   The documentation site will open at `http://localhost:3000`

### Building Documentation

```bash
# Generate llms-full.txt
bash scripts/generate-llms-full.sh

# Validate OpenAPI specs
bash scripts/validate-specs.sh

# Generate SDKs (requires OpenAPI Generator)
bash scripts/generate-sdks.sh

# Build Docusaurus site
cd site
npm run build
```

## 🤖 AI-Friendly Documentation

This repository includes special files for AI assistants and LLM integration:

- **`llms.txt`**: High-level map following the [llms.txt specification](https://llmstxt.org/)
- **`llms-full.txt`**: Complete flattened documentation for comprehensive AI context

These files enable AI assistants like GitHub Copilot and ChatGPT to accurately answer questions about the NG SOS APIs.

## 🔄 Continuous Integration

Every push to `main` automatically:
1. Validates all OpenAPI specifications
2. Generates `llms-full.txt`
3. Builds the Docusaurus documentation site
4. Deploys to GitHub Pages

See [`.github/workflows/build.yml`](.github/workflows/build.yml) for details.

## 📖 OpenAPI Specifications

All API specifications are in the [`/specs`](specs/) directory:

- [EMS v1.0.0](specs/ng-sos-ems-v1.0.0.yaml) - Emergency Message Server
- [PSAP Connector v2.0.0](specs/ng-sos-psap-connector-v2.0.0.yaml) - PSAP routing
- [Portal URL v1.0.0](specs/ng-sos-portal-url-v1.0.0.yaml) - Web portal integration

These specs are the source of truth for:
- Interactive documentation
- SDK generation
- API contract testing
- Client integration

## 🤝 Contributing

We welcome contributions! To update documentation:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improve-docs`)
3. Make your changes to:
   - Markdown files in `/docs` for narrative documentation
   - YAML files in `/specs` for API specifications
4. Commit your changes (`git commit -am 'Improve EMS documentation'`)
5. Push to the branch (`git push origin feature/improve-docs`)
6. Open a Pull Request

### Documentation Guidelines

- Use clear, concise language
- Include code examples for complex concepts
- Keep paragraphs to 3-5 sentences
- Test all code examples
- Follow existing formatting conventions

## 📄 License

This documentation is maintained by Medical IT EU.

## 📧 Support

For questions, issues, or feedback:

- **Email**: mdybal@medicalit.eu
- **GitHub Issues**: [Open an issue](https://github.com/medicalit-eu/ng-sos-apidoc/issues)
- **Documentation**: [View docs](https://medicalit-eu.github.io/ng-sos-apidoc/)

## 🎯 Project Goals

This documentation project aims to:

1. ✅ Provide clear, comprehensive API documentation
2. ✅ Support rapid client integration with generated SDKs
3. ✅ Enable AI-assisted development with llms.txt
4. ✅ Maintain documentation alongside API changes
5. ✅ Follow documentation best practices and conventions

---

**Built with** [Docusaurus](https://docusaurus.io/) | **Deployed on** [GitHub Pages](https://pages.github.com/)