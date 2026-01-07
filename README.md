# NG SOS API Documentation

Welcome to the NG SOS API documentation repository. This repository contains OpenAPI specifications for all NG SOS servers and provides a comprehensive, interactive API documentation website.

## 📚 Available APIs

### [Emergency Message Server (EMS)](./ems/)
The Emergency Message Server handles emergency message processing and management.
- **Version**: 1.0.0
- [View Documentation](https://medicalit-eu.github.io/ng-sos-apidoc/ems.html)

### [PSAP Connector Server](./psap-connector/)
The PSAP Connector Server provides connectivity between the NG SOS platform and Public Safety Answering Points.
- **Version**: 2.0.0
- [View Documentation](https://medicalit-eu.github.io/ng-sos-apidoc/psap-connector.html)

### [Portal URL API](./portal-url/)
The Portal URL API provides URLs and endpoints for the NG SOS portal.
- **Version**: 1.0.0
- [View Documentation](https://medicalit-eu.github.io/ng-sos-apidoc/portal-url.html)

## 🌐 Interactive Documentation

Visit our [API Documentation Website](https://medicalit-eu.github.io/ng-sos-apidoc/) to explore the APIs with an interactive interface powered by [Scalar](https://scalar.com/).

## 📁 Repository Structure

```
ng-sos-apidoc/
├── ems/
│   ├── README.md
│   └── openapi.json
├── psap-connector/
│   ├── README.md
│   └── openapi.json
├── portal-url/
│   ├── README.md
│   └── openapi.json
└── index.html (GitHub Pages)
```

## 🚀 Contributing

To update API specifications:
1. Update the corresponding `openapi.json` file in the server's folder
2. Update the `README.md` if necessary
3. The documentation website will be automatically updated via GitHub Pages

## 📧 Contact

For questions or issues, please contact: mdybal@medicalit.eu