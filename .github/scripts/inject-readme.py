#!/usr/bin/env python3
"""
Script to inject README content into OpenAPI specifications and index.html.
This script is run during the GitHub Pages deployment to add README
content as the description field in each OpenAPI spec and into the main page.
"""

import json
import os
import re
import sys
from pathlib import Path


def inject_readme_to_spec(spec_path, readme_path):
    """
    Add README content as description field to an OpenAPI specification.
    
    Args:
        spec_path: Path to the OpenAPI JSON file
        readme_path: Path to the README.md file
    """
    try:
        # Read the OpenAPI spec (handle BOM if present)
        with open(spec_path, 'r', encoding='utf-8-sig') as f:
            spec = json.load(f)
        
        # Read the README content
        with open(readme_path, 'r', encoding='utf-8') as f:
            readme = f.read()
        
        # Inject README as description
        if 'info' not in spec:
            spec['info'] = {}
        
        spec['info']['description'] = readme
        
        # Write back the modified spec (without BOM)
        with open(spec_path, 'w', encoding='utf-8') as f:
            json.dump(spec, f, indent=2, ensure_ascii=False)
        
        print(f"✓ Successfully injected README into {spec_path}")
        return True
        
    except FileNotFoundError as e:
        print(f"✗ Error: File not found - {e}", file=sys.stderr)
        return False
    except json.JSONDecodeError as e:
        print(f"✗ Error: Invalid JSON in {spec_path} - {e}", file=sys.stderr)
        return False
    except Exception as e:
        print(f"✗ Error processing {spec_path}: {e}", file=sys.stderr)
        return False


def markdown_to_html(markdown_text):
    """
    Convert markdown to HTML using simple regex patterns.
    Supports basic markdown syntax.
    
    Args:
        markdown_text: The markdown text to convert
    
    Returns:
        HTML string
    """
    html = markdown_text
    
    # Convert code blocks first (before inline code)
    html = re.sub(r'```\n(.*?)\n```', r'<pre><code>\1</code></pre>', html, flags=re.DOTALL)
    
    # Convert headers
    html = re.sub(r'^### (.+)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.+)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^# (.+)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)
    
    # Convert links [text](url)
    html = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', html)
    
    # Convert bold **text** (before italic)
    html = re.sub(r'\*\*([^\*]+)\*\*', r'<strong>\1</strong>', html)
    
    # Convert italic *text*
    html = re.sub(r'(?<!\*)\*([^\*]+)\*(?!\*)', r'<em>\1</em>', html)
    
    # Convert inline code `code`
    html = re.sub(r'`([^`]+)`', r'<code>\1</code>', html)
    
    # Process lines for list conversion
    lines = html.split('\n')
    in_list = False
    in_numbered_list = False
    result = []
    
    for line in lines:
        stripped = line.strip()
        
        # Handle unordered lists
        if stripped.startswith('- '):
            if in_numbered_list:
                result.append('</ol>')
                in_numbered_list = False
            if not in_list:
                result.append('<ul>')
                in_list = True
            result.append(f'<li>{stripped[2:]}</li>')
        # Handle numbered lists
        elif re.match(r'^\d+\.\s', stripped):
            if in_list:
                result.append('</ul>')
                in_list = False
            if not in_numbered_list:
                result.append('<ol>')
                in_numbered_list = True
            content = re.sub(r'^\d+\.\s', '', stripped)
            result.append(f'<li>{content}</li>')
        else:
            if in_list:
                result.append('</ul>')
                in_list = False
            if in_numbered_list:
                result.append('</ol>')
                in_numbered_list = False
            result.append(line)
    
    if in_list:
        result.append('</ul>')
    if in_numbered_list:
        result.append('</ol>')
    
    html = '\n'.join(result)
    
    # Convert paragraphs - process line by line instead of splitting by blank lines
    lines = html.split('\n')
    html_lines = []
    
    for i, line in enumerate(lines):
        stripped = line.strip()
        
        # Skip empty lines
        if not stripped:
            html_lines.append('')
            continue
        
        # Don't wrap if it's already an HTML element
        if (stripped.startswith('<h') or 
            stripped.startswith('<ul>') or stripped.startswith('</ul>') or
            stripped.startswith('<ol>') or stripped.startswith('</ol>') or
            stripped.startswith('<pre>') or stripped.startswith('</pre>') or
            stripped.startswith('<li>') or stripped.startswith('</li>')):
            html_lines.append(line)
        else:
            # Check if previous line was a header or list
            prev_line = lines[i-1].strip() if i > 0 else ''
            next_line = lines[i+1].strip() if i < len(lines) - 1 else ''
            
            # Wrap regular text in paragraph tags
            html_lines.append(f'<p>{stripped}</p>')
    
    return '\n'.join(html_lines)


def inject_readme_to_index(index_path, readme_path):
    """
    Inject README content as HTML into index.html.
    
    Args:
        index_path: Path to the index.html file
        readme_path: Path to the README.md file
    """
    try:
        # Read the index.html
        with open(index_path, 'r', encoding='utf-8') as f:
            html = f.read()
        
        # Read the README content
        with open(readme_path, 'r', encoding='utf-8') as f:
            readme = f.read()
        
        # Convert markdown to HTML
        readme_html = markdown_to_html(readme)
        
        # Inject README HTML into the placeholder
        html = html.replace(
            '<!-- README content will be inserted here during deployment -->',
            readme_html
        )
        
        # Write back the modified HTML
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(html)
        
        print(f"✓ Successfully injected README into {index_path}")
        return True
        
    except FileNotFoundError as e:
        print(f"✗ Error: File not found - {e}", file=sys.stderr)
        return False
    except Exception as e:
        print(f"✗ Error processing {index_path}: {e}", file=sys.stderr)
        return False


def main():
    """Main function to process all API specifications and index.html."""
    # Define the API directories
    apis = ['ems', 'portal-url', 'psap-connector']
    
    success_count = 0
    fail_count = 0
    
    print("Injecting README content into OpenAPI specifications and index.html...")
    print("-" * 60)
    
    # Process API specs
    for api in apis:
        spec_path = Path(api) / 'openapi.json'
        readme_path = Path(api) / 'README.md'
        
        if inject_readme_to_spec(spec_path, readme_path):
            success_count += 1
        else:
            fail_count += 1
    
    # Process index.html with main README
    if inject_readme_to_index(Path('index.html'), Path('README.md')):
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
