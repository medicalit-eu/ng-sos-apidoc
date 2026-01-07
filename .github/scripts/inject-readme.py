#!/usr/bin/env python3
"""
Script to inject README content into OpenAPI specifications and index.html.
This script is run during the GitHub Pages deployment to add README
content as the description field in each OpenAPI spec and into the main page.
"""

import html
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
    # Escape HTML in the entire input first to prevent XSS
    text = html.escape(markdown_text)
    
    # Convert code blocks first (before inline code) and protect them from further processing
    code_blocks = []
    def save_code_block(match):
        # Code block content is already escaped above
        content = match.group(1)
        code_blocks.append(f'<pre><code>{content}</code></pre>')
        return f'\n__CODE_BLOCK_{len(code_blocks)-1}__\n'
    
    text = re.sub(r'```\n?(.*?)\n?```', save_code_block, text, flags=re.DOTALL)
    
    # Convert headers (content is already escaped)
    text = re.sub(r'^### (.+)$', r'<h3>\1</h3>', text, flags=re.MULTILINE)
    text = re.sub(r'^## (.+)$', r'<h2>\1</h2>', text, flags=re.MULTILINE)
    text = re.sub(r'^# (.+)$', r'<h1>\1</h1>', text, flags=re.MULTILINE)
    
    # Convert links [text](url) - content is already escaped
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', text)
    
    # Convert bold **text** (before italic) - content is already escaped
    text = re.sub(r'\*\*([^\*]+)\*\*', r'<strong>\1</strong>', text)
    
    # Convert italic *text* - content is already escaped
    text = re.sub(r'\*([^\*]+)\*', r'<em>\1</em>', text)
    
    # Convert inline code `code` - content is already escaped
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    
    # Process lines for list conversion (content is already escaped)
    lines = text.split('\n')
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
    
    text = '\n'.join(result)
    
    # Convert paragraphs - process line by line instead of splitting by blank lines
    lines = text.split('\n')
    html_lines = []
    
    for i, line in enumerate(lines):
        stripped = line.strip()
        
        # Skip empty lines
        if not stripped:
            html_lines.append('')
            continue
        
        # Don't wrap code block placeholders or HTML elements
        if (stripped.startswith('__CODE_BLOCK_') or
            stripped.startswith('<h') or 
            stripped.startswith('<ul>') or stripped.startswith('</ul>') or
            stripped.startswith('<ol>') or stripped.startswith('</ol>') or
            stripped.startswith('<pre>') or stripped.startswith('</pre>') or
            stripped.startswith('<li>') or stripped.startswith('</li>')):
            html_lines.append(line)
        else:
            # Wrap regular text in paragraph tags (content is already escaped)
            html_lines.append(f'<p>{stripped}</p>')
    
    output_html = '\n'.join(html_lines)
    
    # Restore code blocks
    for i, code_block in enumerate(code_blocks):
        output_html = output_html.replace(f'__CODE_BLOCK_{i}__', code_block)
    
    return output_html


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
