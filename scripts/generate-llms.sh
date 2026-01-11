#!/bin/bash
# Script to generate llms.txt - a navigation map for AI assistants

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_FILE="$ROOT_DIR/llms.txt"

echo "Generating llms.txt..."
echo "Root directory: $ROOT_DIR"

# Start with empty file
> "$OUTPUT_FILE"

# Use a comprehensive description for the project
PROJECT_DESC="Comprehensive API documentation for the NG SOS (Next Generation State Operating System) emergency services platform. Includes three primary APIs: Emergency Message Server (EMS) for message processing, PSAP Connector for routing emergency calls to Public Safety Answering Points, and Portal URL API for web portal integration. Complete with OpenAPI specifications, narrative guides, code examples, and SDK support for TypeScript, C#, and Python."

# Add header with description
cat >> "$OUTPUT_FILE" << EOF
# NG SOS API Documentation

> $PROJECT_DESC

## Overview

- Introduction: https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/docs/index.md
- Getting Started: https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/docs/getting-started.md
- GitHub Repository: https://github.com/medicalit-eu/ng-sos-apidoc

## API Reference

EOF

# Add OpenAPI specs with version information
for spec_file in "$ROOT_DIR/specs"/*.yaml; do
    if [ -f "$spec_file" ]; then
        spec_name=$(basename "$spec_file")
        # Extract version from filename (e.g., ng-sos-ems-v1.0.0.yaml -> v1.0.0)
        # Use sed for better portability across macOS and Linux
        version=$(echo "$spec_name" | sed -n 's/.*\(v[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\).*/\1/p')
        
        # Determine API name for the link text
        if [[ "$spec_name" == *"ems"* ]]; then
            api_name="EMS"
        elif [[ "$spec_name" == *"psap-connector"* ]]; then
            api_name="PSAP Connector"
        elif [[ "$spec_name" == *"portal-url"* ]]; then
            api_name="Portal URL"
        else
            api_name="API"
        fi
        
        echo "- $api_name OpenAPI Spec ($version): https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/specs/$spec_name" >> "$OUTPUT_FILE"
    fi
done

# Add Guides section
cat >> "$OUTPUT_FILE" << 'EOF'

## Guides

### Emergency Message Server (EMS)

- EMS Overview: https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/docs/ems/overview.md
- EMS How-To Guide: https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/docs/ems/how-to.md

### PSAP Connector

- PSAP Connector Overview: https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/docs/psap-connector/overview.md
- PSAP Connector How-To Guide: https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/docs/psap-connector/how-to.md

### Portal URL API

- Portal URL Overview: https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/docs/portal-url/overview.md
- Portal URL How-To Guide: https://github.com/medicalit-eu/ng-sos-apidoc/blob/main/docs/portal-url/how-to.md

## SDKs

- TypeScript/JavaScript SDK: https://github.com/medicalit-eu/ng-sos-apidoc/tree/main/sdk/typescript
- C#/.NET SDK: https://github.com/medicalit-eu/ng-sos-apidoc/tree/main/sdk/csharp
- Python SDK: https://github.com/medicalit-eu/ng-sos-apidoc/tree/main/sdk/python

## Resources

- Full Documentation (llms-full.txt): https://medicalit-eu.github.io/ng-sos-apidoc/llms-full.txt
- Interactive Documentation: https://medicalit-eu.github.io/ng-sos-apidoc/

## Contact

- Email: mdybal@medicalit.eu
- Organization: Medical IT EU

## Allowed Domains

- github.com
- medicalit-eu.github.io
- ng-sos.com
- api.ng-sos.com
- portal.ng-sos.com
EOF

echo ""
echo "✓ Successfully generated llms.txt"
echo "  Output file: $OUTPUT_FILE"
# Use wc for better portability, convert bytes to human-readable format
file_size=$(wc -c < "$OUTPUT_FILE" | awk '{print $1}')
if [ "$file_size" -ge 1024 ]; then
    file_size_kb=$((file_size / 1024))
    echo "  File size: ${file_size_kb}K"
else
    echo "  File size: ${file_size} bytes"
fi
