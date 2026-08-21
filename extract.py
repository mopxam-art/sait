import re
import json

def parse_poems():
    with open('all.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by the separator (* * * * or form feed \f or ---)
    parts = re.split(r'\* \* \* \*|\f|---', content)
    
    poems = []
    
    for part in parts:
        part = part.strip()
        if not part:
            continue
            
        lines = [line.strip() for line in part.split('\n') if line.strip()]
        if not lines:
            continue
            
        # First line is usually title
        title = lines[0]
        if title == 'Віктар Морхат.  Вершы.':
            lines = lines[1:]
            if not lines: continue
            title = lines[0]
            
        # Clean title
        title = title.strip('. *-=\n\r\t')
        
        # Skip if title is empty or just weird characters
        if not title or len(title) < 3:
            continue
            
        # The rest is text
        text_lines = []
        for line in part.split('\n'):
            line = line.strip()
            if line == 'Віктар Морхат.  Вершы.': continue
            if line == title or line == title + '.': continue
            text_lines.append(line)
            
        # Join text lines, keeping paragraphs
        text_raw = '\n'.join(text_lines).strip()
        # Clean up multiple newlines
        text_clean = re.sub(r'\n{3,}', '\n\n', text_raw)
        
        # Skip if too short
        if len(text_clean) < 10:
            continue
            
        poems.append({
            'title': title,
            'subtitle': '',
            'text': text_clean,
            'date': ''
        })
        
    # Now group them. The user wants all of them added. 
    # Let's put the ones we already know in their specific categories, and the rest in "Лірычныя"
    categories = [
        {'title': 'Прырода', 'poems': []},
        {'title': 'Сям\'я', 'poems': []},
        {'title': 'Роздум аб жыцці і вечнасці', 'poems': []},
        {'title': 'Сцежкамі радзімы і гісторыі', 'poems': []},
        {'title': 'Лірычныя', 'poems': []},
        {'title': 'Незакончанае', 'poems': []}
    ]
    
    keywords = {
        0: ['вясна', 'восень', 'лета', 'зіма', 'снег', 'лес', 'поле', 'птушк', 'прырода', 'вецер', 'сонца', 'дрэў', 'кветк'],
        1: ['бацьк', 'маці', 'сын', 'дачк', 'сям\'я', 'жонк', 'дзеці', 'ўнукі', 'дзядул', 'бабул', 'родн'],
        2: ['жыццё', 'вечнасць', 'смерць', 'лёс', 'час', 'мроі', 'душа', 'бог', 'шлях', 'мары', 'год'],
        3: ['дзісна', 'беларус', 'радзіма', 'гісторыя', 'зямля', 'край', 'вёск', 'горад', 'народ']
    }
    
    for poem in poems:
        text_lower = (poem['title'] + " " + poem['text']).lower()
        
        # Check if unfinished is mentioned in title
        if 'незакончанае' in poem['title'].lower() or 'чарнавік' in poem['title'].lower():
            categories[5]['poems'].append(poem)
            continue
            
        scores = {0: 0, 1: 0, 2: 0, 3: 0}
        for cat_idx, words in keywords.items():
            for word in words:
                scores[cat_idx] += text_lower.count(word)
                
        # Find max score
        max_score = -1
        best_cat = 4 # Default to 'Лірычныя'
        
        for cat_idx, score in scores.items():
            if score > max_score and score > 2: # At least 3 keyword matches required to confidently categorize
                max_score = score
                best_cat = cat_idx
                
        # Hardcode some known ones just in case
        if 'Memento mori' in poem['title']:
            best_cat = 2
        elif 'Дзісеншчыны' in poem['title']:
            best_cat = 3
            
        categories[best_cat]['poems'].append(poem)
        
    # Remove empty categories
    categories = [cat for cat in categories if len(cat['poems']) > 0]
            
    # Generate JS
    js_content = "const categories = " + json.dumps(categories, ensure_ascii=False, indent=4) + ";\n"
    
    with open('v4_final_concept/data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
        
if __name__ == '__main__':
    parse_poems()
