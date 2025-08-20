import mammoth, json, pathlib

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
    p = pathlib.Path(fname)
    if not p.exists():
        print(f"Missing: {fname}")
        continue
    with open(p, 'rb') as f:
        result = mammoth.convert_to_html(f)
    html = result.value
    # Basic cleanup: collapse multiple spaces
    summary[fname] = html
    (out_dir / (p.stem + '.html')).write_text(html, encoding='utf-8')

(pathlib.Path('extracted') / 'index.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding='utf-8')
print('Extraction complete.')
