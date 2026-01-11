# NG SOS API Documentation

> **Documentation repository for NG SOS API platform - for documentation developers and contributors**

[![Documentation](https://img.shields.io/badge/docs-live-brightgreen)](https://medicalit-eu.github.io/ng-sos-apidoc/)
[![GitHub](https://img.shields.io/github/license/medicalit-eu/ng-sos-apidoc)](LICENSE)

This repository contains the source code and tools for building the NG SOS API documentation. It is designed for **documentation developers, contributors, and maintainers** who want to work on the documentation itself.

**📖 Looking for API documentation?** Visit **[https://medicalit-eu.github.io/ng-sos-apidoc/](https://medicalit-eu.github.io/ng-sos-apidoc/)** for the complete interactive documentation site.

## 🎯 What This Repository Does

This is a documentation-as-code project that:

- **Maintains OpenAPI specifications** for three NG SOS APIs (EMS, PSAP Connector, Portal URL)
- **Generates interactive documentation** using Docusaurus and Redocusaurus
- **Produces SDKs** for TypeScript, C#, and Python from OpenAPI specs
- **Creates AI-friendly documentation** files (llms.txt, llms-full.txt) for LLM integration
- **Automatically deploys** to GitHub Pages on every commit to main
- **Validates specifications** to ensure quality and correctness

## 🛠️ Technologies Used

This documentation project is built with:

- **[Docusaurus 3.9.2](https://docusaurus.io/)** - Modern static site generator for documentation
- **[Redocusaurus](https://github.com/rohit-gohri/redocusaurus)** - OpenAPI documentation plugin for Docusaurus  
- **[OpenAPI Generator](https://openapi-generator.tech/)** - SDK generation from OpenAPI specs
- **[Node.js 20+](https://nodejs.org/)** - JavaScript runtime for build tools
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe configuration
- **[GitHub Pages](https://pages.github.com/)** - Free hosting for documentation site
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD automation

## 📁 Repository Structure

Understanding the repository layout:

```
ng-sos-apidoc/
├── docs/                           # Source Markdown files for narrative documentation
│   ├── index.md                   # Main landing page content
│   ├── getting-started.md         # Getting started guide
│   ├── ems/                       # EMS API documentation
│   ├── psap-connector/            # PSAP Connector documentation
│   └── portal-url/                # Portal URL API documentation
│
├── specs/                          # OpenAPI 3.0 specifications (source of truth)
│   ├── ng-sos-ems-v1.0.0.yaml
│   ├── ng-sos-psap-connector-v2.0.0.yaml
│   └── ng-sos-portal-url-v1.0.0.yaml
│
├── site/                           # Docusaurus application
│   ├── docs/                      # Copied from /docs during build
│   ├── src/                       # React components and pages
│   ├── static/                    # Static assets (images, files)
│   ├── docusaurus.config.ts       # Docusaurus configuration
│   ├── sidebars.ts                # Documentation sidebar structure
│   └── package.json               # Node.js dependencies
│
├── scripts/                        # Build automation scripts
│   ├── generate-llms-full.sh     # Creates llms-full.txt from all docs
│   ├── generate-sdks.sh          # Generates SDKs from OpenAPI specs
│   └── validate-specs.sh         # Validates OpenAPI specifications
│
├── sdk/                            # Generated SDKs (in .gitignore, regenerated on build)
│   ├── typescript/               # TypeScript/JavaScript SDK
│   ├── csharp/                   # C#/.NET SDK
│   └── python/                   # Python SDK
│
├── .github/workflows/              # GitHub Actions CI/CD
│   └── build.yml                 # Build and deploy pipeline
│
├── llms.txt                        # AI assistant navigation map
├── llms-full.txt                  # Complete flattened documentation for LLMs
└── README.md                       # This file
```

### Key Directories Explained

- **`/docs`** - Source of truth for narrative documentation. Edit Markdown files here.
- **`/specs`** - Source of truth for API contracts. Edit OpenAPI YAML files here.
- **`/site`** - Docusaurus application. Contains configuration, theme, and React components.
- **`/scripts`** - Automation scripts for building, validating, and generating artifacts.
- **`/sdk`** - Auto-generated, not committed to git. Regenerated from specs on each build.

## 🚀 Getting Started for Contributors

### Prerequisites

- **Node.js 20+** - Required for Docusaurus
- **Bash** - For running build scripts (pre-installed on macOS/Linux, use WSL or Git Bash on Windows)
- **Git** - For version control
- **(Optional) OpenAPI Generator CLI** - For SDK generation (installed automatically by script if needed)

### Initial Setup

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

3. **Start local development server**
   ```bash
   npm start
   ```
   
   The documentation site will open at `http://localhost:3000` with hot reloading enabled.

### Development Workflow

#### Editing Documentation

1. **Edit Markdown files** in `/docs` directory
   ```bash
   # Example: Edit EMS overview
   vim docs/ems/overview.md
   ```

2. **Preview changes** - Docusaurus will auto-reload at `http://localhost:3000`

3. **Commit your changes**
   ```bash
   git add docs/
   git commit -m "Update EMS documentation"
   git push
   ```

#### Editing OpenAPI Specifications

1. **Edit YAML files** in `/specs` directory
   ```bash
   # Example: Update PSAP Connector API
   vim specs/ng-sos-psap-connector-v2.0.0.yaml
   ```

2. **Validate your changes**
   ```bash
   bash scripts/validate-specs.sh
   ```

3. **Preview OpenAPI docs** at `http://localhost:3000` - Redocusaurus renders them automatically

#### Updating Docusaurus Configuration

- **`site/docusaurus.config.ts`** - Site configuration, navbar, footer, plugins
- **`site/sidebars.ts`** - Sidebar navigation structure
- **`site/src/`** - Custom React components and pages

## 🔨 Build Scripts

The repository includes several automation scripts in the `/scripts` directory:

### `validate-specs.sh`

Validates all OpenAPI specifications for correctness.

```bash
bash scripts/validate-specs.sh
```

**What it does:**
- Checks YAML syntax
- Validates against OpenAPI 3.0 specification
- Reports any errors or warnings

**When to use:** Before committing changes to OpenAPI specs

### `generate-llms-full.sh`

Generates `llms-full.txt` - a flattened version of all documentation for LLM context.

```bash
bash scripts/generate-llms-full.sh
```

**What it does:**
- Concatenates all Markdown files from `/docs`
- Includes OpenAPI specifications
- Creates a single file for AI assistant consumption

**When to use:** This runs automatically in CI, but you can run it locally to test

### `generate-sdks.sh`

Generates SDKs for TypeScript, C#, and Python from OpenAPI specifications.

```bash
bash scripts/generate-sdks.sh
```

**What it does:**
- Installs OpenAPI Generator CLI if not present
- Generates SDK for each language from each spec
- Outputs to `/sdk/{language}/{api-name}/`

**When to use:** When you want to test SDK generation locally (not required for documentation work)

**Note:** SDKs are in `.gitignore` and are not committed to the repository.

## 🔄 CI/CD Pipeline

Every commit to `main` triggers an automated workflow (`.github/workflows/build.yml`):

1. **Checkout code** - Gets latest version
2. **Setup Node.js 20** - Installs build environment
3. **Install dependencies** - Runs `npm install` in `/site`
4. **Generate llms-full.txt** - Creates AI-friendly documentation
5. **Copy LLMS files** - Moves `llms.txt` and `llms-full.txt` to `/site/static/`
6. **Copy documentation** - Moves `/docs` to `/site/docs`
7. **Build Docusaurus** - Generates static site
8. **Deploy to GitHub Pages** - Publishes to https://medicalit-eu.github.io/ng-sos-apidoc/

**Build time:** Approximately 2-3 minutes

**Testing:** Pull requests also trigger the build (but don't deploy) to catch errors early.

## 📝 Contributing Guidelines

### For Documentation Writers

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/improve-ems-docs`)
3. **Edit Markdown files** in `/docs`
   - Use clear, concise language
   - Include code examples where appropriate
   - Keep paragraphs to 3-5 sentences
   - Follow existing formatting conventions
4. **Test locally** with `npm start` in `/site`
5. **Commit your changes** (`git commit -am 'Improve EMS authentication docs'`)
6. **Push to your fork** (`git push origin feature/improve-ems-docs`)
7. **Open a Pull Request**

### For API Specification Maintainers

1. **Edit OpenAPI YAML files** in `/specs`
2. **Validate changes** with `bash scripts/validate-specs.sh`
3. **Test rendering** in local Docusaurus (Redocusaurus will show changes)
4. **Follow semantic versioning** for API versions
5. **Update version in filename** if changing version (e.g., `v2.0.0` → `v2.1.0`)
6. **Commit and create PR** as above

### Documentation Standards

- **Markdown:** Use standard Markdown with Docusaurus extensions
- **Code blocks:** Always specify language (```bash, ```typescript, etc.)
- **Links:** Use relative links for internal docs, absolute for external
- **Images:** Store in `/site/static/img` and reference with `/img/...`
- **OpenAPI:** Follow OpenAPI 3.0 specification strictly

## 🤖 AI-Friendly Documentation

This repository implements the **[llms.txt specification](https://llmstxt.org/)** for LLM integration:

- **`llms.txt`** - High-level navigation map for AI assistants (manually maintained)
- **`llms-full.txt`** - Complete flattened documentation (auto-generated from all docs)

These files enable AI assistants (GitHub Copilot, ChatGPT, Claude, etc.) to accurately answer questions about the NG SOS APIs.

**For maintainers:** Update `llms.txt` when adding new major sections. The `llms-full.txt` is regenerated automatically on each build.

**Accessing LLMS files on the web:**
- **Live site:** https://medicalit-eu.github.io/ng-sos-apidoc/llms.txt
- **Live site:** https://medicalit-eu.github.io/ng-sos-apidoc/llms-full.txt
- **Repository:** https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/llms.txt
- **Repository:** https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/llms-full.txt

The files are automatically deployed to the website during the build process and are available at the root of the site.

## 🏗️ Building for Production

To build the documentation site locally:

```bash
# From repository root
cd site
npm run build
```

The static site is generated in `site/build/` and can be served with:

```bash
npm run serve
```

**Note:** In production, GitHub Actions handles all building and deployment automatically.

## 🔍 Troubleshooting

### Docusaurus won't start

```bash
# Clear cache and reinstall
cd site
rm -rf node_modules package-lock.json
npm install
npm start
```

### OpenAPI specs not rendering

- Check YAML syntax with `bash scripts/validate-specs.sh`
- Ensure specs are valid OpenAPI 3.0
- Restart Docusaurus dev server

### Build fails in CI

- Check GitHub Actions logs in the repository
- Test build locally with `npm run build`
- Ensure all internal links are valid

## 📚 Useful Resources

### Documentation Tools
- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Redocusaurus Plugin](https://github.com/rohit-gohri/redocusaurus)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.0)
- [OpenAPI Generator](https://openapi-generator.tech/)

### Writing Guides
- [Markdown Guide](https://www.markdownguide.org/)
- [OpenAPI Style Guide](https://github.com/OAI/OpenAPI-Style-Guide)
- [Technical Writing Best Practices](https://developers.google.com/tech-writing)

## 📄 License

This documentation is maintained by Medical IT EU.

## 📧 Contact & Support

**For documentation contributors:**
- **GitHub Issues:** [Open an issue](https://github.com/medicalit-eu/ng-sos-apidoc/issues) for bugs or suggestions
- **Pull Requests:** Submit PRs for documentation improvements
- **Email:** mdybal@medicalit.eu

**For API users:**
- Visit the [live documentation](https://medicalit-eu.github.io/ng-sos-apidoc/)
- Check the [Getting Started Guide](https://medicalit-eu.github.io/ng-sos-apidoc/getting-started)

---

**Built with** [Docusaurus](https://docusaurus.io/) | **Deployed on** [GitHub Pages](https://pages.github.com/)