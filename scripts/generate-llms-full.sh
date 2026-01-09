#!/bin/bash
# Script to generate llms-full.txt - a flattened version of all documentation

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_FILE="$ROOT_DIR/llms-full.txt"

echo "Generating llms-full.txt..."
echo "Root directory: $ROOT_DIR"

# Start with empty file
> "$OUTPUT_FILE"

# Add header
cat >> "$OUTPUT_FILE" << 'EOF'
================================================================================
NG SOS API DOCUMENTATION - COMPLETE REFERENCE
================================================================================

This file contains the complete NG SOS API documentation including all guides,
specifications summaries, and reference materials. It is generated automatically
from the documentation source files.

Generated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")

================================================================================

EOF

# Include llms.txt first
if [ -f "$ROOT_DIR/llms.txt" ]; then
    echo "Including llms.txt..."
    echo "================================================================================
LLMS.TXT - AI ASSISTANT MAP
================================================================================
" >> "$OUTPUT_FILE"
    cat "$ROOT_DIR/llms.txt" >> "$OUTPUT_FILE"
    echo -e "\n\n" >> "$OUTPUT_FILE"
fi

# Function to add a markdown file with header
add_markdown_file() {
    local file="$1"
    local title="$2"
    
    if [ -f "$file" ]; then
        echo "Including: $title"
        echo "================================================================================
$title
================================================================================
File: $file
" >> "$OUTPUT_FILE"
        cat "$file" >> "$OUTPUT_FILE"
        echo -e "\n\n" >> "$OUTPUT_FILE"
    else
        echo "Warning: File not found: $file"
    fi
}

# Add all documentation files
echo ""
echo "Adding documentation files..."

add_markdown_file "$ROOT_DIR/docs/index.md" "DOCUMENTATION INDEX"
add_markdown_file "$ROOT_DIR/docs/getting-started.md" "GETTING STARTED GUIDE"

# EMS Documentation
add_markdown_file "$ROOT_DIR/docs/ems/overview.md" "EMS - OVERVIEW"
add_markdown_file "$ROOT_DIR/docs/ems/how-to.md" "EMS - HOW-TO GUIDE"

# PSAP Connector Documentation
add_markdown_file "$ROOT_DIR/docs/psap-connector/overview.md" "PSAP CONNECTOR - OVERVIEW"
add_markdown_file "$ROOT_DIR/docs/psap-connector/how-to.md" "PSAP CONNECTOR - HOW-TO GUIDE"

# Portal URL Documentation
add_markdown_file "$ROOT_DIR/docs/portal-url/overview.md" "PORTAL URL API - OVERVIEW"
add_markdown_file "$ROOT_DIR/docs/portal-url/how-to.md" "PORTAL URL API - HOW-TO GUIDE"

# Add OpenAPI spec summaries
echo ""
echo "Adding OpenAPI specification summaries..."

for spec_file in "$ROOT_DIR/specs"/*.yaml; do
    if [ -f "$spec_file" ]; then
        spec_name=$(basename "$spec_file")
        echo "Processing: $spec_name"
        
        echo "================================================================================
OPENAPI SPECIFICATION: $spec_name
================================================================================
" >> "$OUTPUT_FILE"
        
        # Extract key information from OpenAPI spec using grep/sed
        echo "Info:" >> "$OUTPUT_FILE"
        grep -A 20 "^info:" "$spec_file" | head -25 >> "$OUTPUT_FILE" 2>/dev/null || true
        
        echo -e "\nPaths:" >> "$OUTPUT_FILE"
        grep "^  /.*:" "$spec_file" | head -50 >> "$OUTPUT_FILE" 2>/dev/null || true
        
        echo -e "\n\n" >> "$OUTPUT_FILE"
    fi
done

# Add footer
cat >> "$OUTPUT_FILE" << 'EOF'
================================================================================
END OF DOCUMENTATION
================================================================================

For the complete interactive documentation, visit:
https://medicalit-eu.github.io/ng-sos-apidoc/

For questions and support:
Email: mdybal@medicalit.eu
GitHub: https://github.com/medicalit-eu/ng-sos-apidoc

================================================================================
EOF

echo ""
echo "✓ Successfully generated llms-full.txt"
echo "  Output file: $OUTPUT_FILE"
echo "  File size: $(du -h "$OUTPUT_FILE" | cut -f1)"
