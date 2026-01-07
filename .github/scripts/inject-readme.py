#!/usr/bin/env python3
"""
Script to inject README content into OpenAPI specifications.
This script is run during the GitHub Pages deployment to add README
content as the description field in each OpenAPI spec.

Note: OpenAPI specs already contain descriptions, so this script
is kept for backwards compatibility but may not be necessary.
"""

import json
import os
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    print("PyYAML not installed. Installing...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pyyaml"])
    import yaml


def inject_readme_to_spec(spec_path, readme_path):
    """
    Add README content as description field to an OpenAPI specification.
    
    Args:
        spec_path: Path to the OpenAPI YAML/JSON file
        readme_path: Path to the README.md file
    """
    try:
        # Determine file format
        is_yaml = spec_path.suffix in ['.yaml', '.yml']
        
        # Read the OpenAPI spec
        with open(spec_path, 'r', encoding='utf-8-sig') as f:
            if is_yaml:
                spec = yaml.safe_load(f)
            else:
                spec = json.load(f)
        
        # Check if description already exists
        if 'info' in spec and 'description' in spec.get('info', {}):
            print(f"ℹ {spec_path} already has a description, skipping injection")
            return True
        
        # Read the README content
        with open(readme_path, 'r', encoding='utf-8') as f:
            readme = f.read()
        
        # Inject README as description
        if 'info' not in spec:
            spec['info'] = {}
        
        spec['info']['description'] = readme
        
        # Write back the modified spec
        with open(spec_path, 'w', encoding='utf-8') as f:
            if is_yaml:
                yaml.dump(spec, f, default_flow_style=False, allow_unicode=True, sort_keys=False)
            else:
                json.dump(spec, f, indent=2, ensure_ascii=False)
        
        print(f"✓ Successfully injected README into {spec_path}")
        return True
        
    except FileNotFoundError as e:
        print(f"✗ Error: File not found - {e}", file=sys.stderr)
        return False
    except (json.JSONDecodeError, yaml.YAMLError) as e:
        print(f"✗ Error: Invalid format in {spec_path} - {e}", file=sys.stderr)
        return False
    except Exception as e:
        print(f"✗ Error processing {spec_path}: {e}", file=sys.stderr)
        return False


def main():
    """Main function to process all API specifications."""
    # Define the API directories
    apis = ['ems', 'portal-url', 'psap-connector']
    
    success_count = 0
    fail_count = 0
    
    print("Injecting README content into OpenAPI specifications...")
    print("-" * 60)
    
    for api in apis:
        # Try YAML first, then JSON
        spec_path = Path(api) / 'openapi.yaml'
        if not spec_path.exists():
            spec_path = Path(api) / 'openapi.json'
        
        readme_path = Path(api) / 'README.md'
        
        if inject_readme_to_spec(spec_path, readme_path):
            success_count += 1
        else:
            fail_count += 1
    
    print("-" * 60)
    print(f"Completed: {success_count} successful, {fail_count} failed")
    
    # Exit with error code if any injection failed
    if fail_count > 0:
        sys.exit(1)


if __name__ == '__main__':
    main()
