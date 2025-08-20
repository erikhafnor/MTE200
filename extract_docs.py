import mammoth, json, pathlib, re
from bs4 import BeautifulSoup

DOC_FILES = [
    'Laboppgave EKG-registrering.docx',
    'Laboppgave blodtrykk og pulsoksymetri.docx',
    'Laboppgave defibrillator.docx',
    'Laboppgave diatermi.docx',
    'Laboppgave infusjonspumper.docx',
    'Laboppgave respirator.docx',
    'laboppgave ultralyd.docx'
]

out_dir = pathlib.Path('extracted')
out_dir.mkdir(exist_ok=True)
summary = {}
for fname in DOC_FILES:
    path_obj = pathlib.Path(fname)
    if not path_obj.exists():
        print(f"Missing: {fname}")
        continue
    with open(path_obj, 'rb') as f:
        result = mammoth.convert_to_html(f)
    raw_html = result.value
    soup = BeautifulSoup(raw_html, 'html.parser')

    # Promote standalone <p> that look like headings (short, no period, capitalized) to <h2>
    for p_tag in list(soup.find_all('p')):
        text = p_tag.get_text(strip=True)
        if not text:
            continue
        if len(text) < 70 and text[0].isupper() and text.count('.') == 0 and len(text.split()) <= 8:
            # avoid transforming if already followed by heading or is an inline image caption
            if p_tag.find('img'):
                continue
            new_h = soup.new_tag('h2')
            new_h.string = text
            p_tag.replace_with(new_h)

    # Normalize sequential heading levels (avoid skipping from h2 to h4 etc.)
    # For simplicity convert any h1/h3/h4/h5 to h2 to maintain consistent rhythm inside fragment
    for level in ['h1','h3','h4','h5','h6']:
        for h in soup.find_all(level):
            h.name = 'h2'

    # Table styling: wrap tables in a responsive div and add classes
    for tbl in soup.find_all('table'):
        tbl['class'] = (tbl.get('class') or []) + ['lab-table']
        wrapper = soup.new_tag('div', **{'class':'table-wrapper'})
        tbl.replace_with(wrapper)
        wrapper.append(tbl)

    # Remove empty paragraphs
    for para in soup.find_all('p'):
        if not para.get_text(strip=True) and not para.find('img'):
            para.decompose()

    # Collapse excessive blank lines in HTML string
    prettified = soup.prettify()
    cleaned = re.sub(r'\n{3,}', '\n\n', prettified if isinstance(prettified, str) else str(prettified))
    summary[fname] = cleaned
    (out_dir / (path_obj.stem + '.html')).write_text(cleaned, encoding='utf-8')

(pathlib.Path('extracted') / 'index.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding='utf-8')
print('Extraction complete.')
