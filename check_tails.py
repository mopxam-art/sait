import sys
import io
import json

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

data = open('v4_final_concept/data.js', encoding='utf-8').read().replace('const categories = ', '').replace(';', '')
j = json.loads(data)

for c in j:
    for p in c['poems']:
        lines = p['text'].split('\n')
        tail = '\n  '.join(lines[-3:]) if len(lines) >= 3 else '\n  '.join(lines)
        print(f"TITLE: {p['title']}")
        print(f"  {tail}")
        print("-" * 20)
