import os

def build_single_file():
    base_dir = 'v4_final_concept'
    
    with open(os.path.join(base_dir, 'index.html'), 'r', encoding='utf-8') as f:
        html = f.read()
        
    with open(os.path.join(base_dir, 'style.css'), 'r', encoding='utf-8') as f:
        css = f.read()
        
    with open(os.path.join(base_dir, 'data.js'), 'r', encoding='utf-8') as f:
        data_js = f.read()
        
    with open(os.path.join(base_dir, 'script.js'), 'r', encoding='utf-8') as f:
        script_js = f.read()
        
    # Replace CSS
    css_tag = '<link rel="stylesheet" href="style.css">'
    html = html.replace(css_tag, f'<style>\n{css}\n</style>')
    
    # Replace data.js
    data_tag = '<script src="data.js"></script>'
    html = html.replace(data_tag, f'<script>\n{data_js}\n</script>')
    
    # Replace script.js
    script_tag = '<script src="script.js"></script>'
    html = html.replace(script_tag, f'<script>\n{script_js}\n</script>')
    
    output_path = os.path.join(base_dir, 'Виктор Морхат - Поэтический архив.html')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
        
    print(f'Successfully created {output_path}')

if __name__ == '__main__':
    build_single_file()
