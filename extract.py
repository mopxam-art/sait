import zipfile
import xml.etree.ElementTree as ET

def extract(path, out_path):
    with zipfile.ZipFile(path) as z:
        xml_content = z.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        
        with open(out_path, 'w', encoding='utf-8') as f:
            for p in tree.iter():
                if p.tag.endswith('p'):
                    text = ''.join(node.text for node in p.iter() if node.tag.endswith('t') and node.text)
                    if text.strip():
                        f.write(text + '\n')
                    else:
                        f.write('\n')

extract('1.docx', '1.txt')
extract('++++Виктор  Морхат вершы (1).docx', 'all.txt')
