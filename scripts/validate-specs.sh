#!/bin/bash
# Script to validate OpenAPI specifications

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
SPECS_DIR="$ROOT_DIR/specs"

echo "=========================================="
echo "NG SOS OpenAPI Spec Validation"
echo "=========================================="
echo ""

# Check if spectral is installed, if not install it
if ! command -v spectral &> /dev/null; then
    echo "Spectral not found. Installing via npm..."
    npm install -g @stoplight/spectral-cli
fi

echo "Validating OpenAPI specifications..."
echo ""

validation_failed=0

# Validate each spec file
for spec_file in "$SPECS_DIR"/*.yaml; do
    if [ -f "$spec_file" ]; then
        spec_name=$(basename "$spec_file")
        echo "Validating: $spec_name"
        
        if spectral lint "$spec_file" --format pretty; then
            echo "✓ $spec_name is valid"
        else
            echo "✗ $spec_name has validation errors"
            validation_failed=1
        fi
        echo ""
    fi
done

if [ $validation_failed -eq 0 ]; then
    echo "=========================================="
    echo "All specifications are valid!"
    echo "=========================================="
    exit 0
else
    echo "=========================================="
    echo "Some specifications have errors"
    echo "=========================================="
    exit 1
fi
