import docx

doc = docx.Document('++++Виктор  Морхат вершы (1).docx')
text = []
for p in doc.paragraphs:
    # Check for page breaks in runs
    has_page_break = False
    for run in p.runs:
        if 'w:br' in run._element.xml and 'type="page"' in run._element.xml:
            has_page_break = True
    
    if has_page_break:
        text.append('\f')
    
    text.append(p.text)

with open('docx_text.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(text))
