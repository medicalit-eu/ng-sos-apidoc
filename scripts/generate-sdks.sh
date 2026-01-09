#!/bin/bash
# Script to generate SDKs from OpenAPI specifications

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
SPECS_DIR="$ROOT_DIR/specs"
SDK_DIR="$ROOT_DIR/sdk"

echo "=========================================="
echo "NG SOS SDK Generation"
echo "=========================================="
echo ""

# Check if OpenAPI Generator is installed
if ! command -v openapi-generator-cli &> /dev/null; then
    echo "OpenAPI Generator CLI not found. Installing via npm..."
    npm install -g @openapitools/openapi-generator-cli
fi

# Create SDK directories
mkdir -p "$SDK_DIR/typescript"
mkdir -p "$SDK_DIR/csharp"
mkdir -p "$SDK_DIR/python"

echo "Generating SDKs for all API specifications..."
echo ""

# Function to generate SDK for a specific language
generate_sdk() {
    local spec_file="$1"
    local language="$2"
    local output_dir="$3"
    local package_name="$4"
    
    local spec_name=$(basename "$spec_file" .yaml)
    
    echo "Generating $language SDK for $spec_name..."
    
    # Extract API name and version from filename
    # Example: ng-sos-ems-v1.0.0.yaml -> ems, 1.0.0
    local api_name=$(echo "$spec_name" | sed -E 's/ng-sos-(.+)-v[0-9].*/\1/')
    local version=$(echo "$spec_name" | sed -E 's/.*-v([0-9]+\.[0-9]+\.[0-9]+).*/\1/')
    
    local lang_output_dir="$output_dir/$api_name"
    
    case "$language" in
        typescript)
            openapi-generator-cli generate \
                -i "$spec_file" \
                -g typescript-axios \
                -o "$lang_output_dir" \
                --additional-properties=npmName="@ng-sos/${api_name}",npmVersion="${version}",supportsES6=true
            ;;
        csharp)
            openapi-generator-cli generate \
                -i "$spec_file" \
                -g csharp-netcore \
                -o "$lang_output_dir" \
                --additional-properties=packageName="NgSos.${package_name}",packageVersion="${version}",targetFramework="net8.0"
            ;;
        python)
            openapi-generator-cli generate \
                -i "$spec_file" \
                -g python \
                -o "$lang_output_dir" \
                --additional-properties=packageName="ng_sos_${api_name}",packageVersion="${version}",projectName="ng-sos-${api_name}"
            ;;
        *)
            echo "Unknown language: $language"
            return 1
            ;;
    esac
    
    echo "✓ Generated $language SDK for $spec_name"
    echo ""
}

# Generate SDKs for all specifications
for spec_file in "$SPECS_DIR"/*.yaml; do
    if [ -f "$spec_file" ]; then
        spec_name=$(basename "$spec_file" .yaml)
        
        # Determine package name based on API
        if [[ "$spec_name" == *"ems"* ]]; then
            package_name="Ems"
        elif [[ "$spec_name" == *"psap-connector"* ]]; then
            package_name="PsapConnector"
        elif [[ "$spec_name" == *"portal-url"* ]]; then
            package_name="PortalUrl"
        else
            package_name="Api"
        fi
        
        # Generate for each language
        generate_sdk "$spec_file" "typescript" "$SDK_DIR/typescript" "$package_name"
        generate_sdk "$spec_file" "csharp" "$SDK_DIR/csharp" "$package_name"
        generate_sdk "$spec_file" "python" "$SDK_DIR/python" "$package_name"
    fi
done

echo "=========================================="
echo "SDK Generation Complete!"
echo "=========================================="
echo ""
echo "Generated SDKs:"
echo "  TypeScript: $SDK_DIR/typescript/"
echo "  C#:         $SDK_DIR/csharp/"
echo "  Python:     $SDK_DIR/python/"
echo ""
echo "Note: SDKs are in .gitignore and will be regenerated on each build."
echo "To publish SDKs, use the appropriate package registry for each language."
