"""Copy the supplied field materials and generate the website resource index."""
import json, shutil
from pathlib import Path

SOURCE = Path(r'C:\Users\xpatt\OneDrive\Desktop\INTEGRATION\SENTINEL SITES')
OUT = Path(__file__).resolve().parents[1] / 'dist'
LIB = OUT / 'resources'
LIB.mkdir(exist_ok=True)
items=[]
# Only privacy-reviewed resources may be published. Never import participant workbooks.
PUBLIC_RESOURCES = ['cqi-examples', 'district-staging', 'facility-staging', 'kpi-feedback', 'kpi-reference', 'mentorship-guide', 'quality-of-care', 'regional-staging', 'sop-diagrams', 'sop-diagrams-editable', 'staging-feedback', 'weekly-programme']
def add(src, slug, title, category, note=''):
    if slug not in PUBLIC_RESOURCES:
        return
    src=SOURCE/src
    dest=LIB/(slug+src.suffix.lower())
    shutil.copy2(src,dest)
    items.append(dict(id=slug,title=title,category=category,note=note,url='resources/'+dest.name,format=src.suffix[1:].upper(),size=round(dest.stat().st_size/1024)))

for slug,name in [('facility','Facility'),('district','District'),('regional','Regional')]:
    src=next(p for p in SOURCE.glob('*.pdf') if name+' Maturity' in p.name)
    add(src.relative_to(SOURCE),slug+'-staging',name+' maturity staging tool','Assessment','PDF reference copy. Complete and submit the assessment in the online tool.')
add(next(p for p in SOURCE.glob('*.pdf') if 'Key Performance' in p.name).relative_to(SOURCE),'kpi-reference','Baseline key performance indicators','Assessment','PDF reference copy. Follow the reporting period, definitions and data sources in the online form.')
base=Path('SENTINEL SITES')
add(base/'Agenda'/'1. Weekly Program for Sentinel Site Activation.docx','weekly-programme','Weekly activation programme','Programme','Original 6–12 September schedule. Use the activity sequence with your assigned visit dates.')
for file,slug,title,note in [
('Mentorship Tool & Links to Tools.docx','mentorship-guide','Mentorship tool and links','Supporting guidance for assessment and mentorship'),
('Sentinel Site KPI Feedback.docx','kpi-feedback','KPI technical feedback','Supporting feedback document; the online tool remains the submission route'),
('Sentinel Site Maturity Staging Tools Technical Feedback.docx','staging-feedback','Maturity staging technical feedback','Supporting feedback document'),
('SOP flow diagrams_Aug 2026__.pdf','sop-diagrams','Integrated care SOP flow diagrams','August 2026 • printable reference'),
('SOP flow diagrams_Aug 2026__.docx','sop-diagrams-editable','Integrated care SOP flow diagrams — editable','August 2026 • Word copy')]:
    add(base/'Mentorship Tools and SOPs'/file,slug,title,'SOPs & CQI',note)
for file,slug,title in [
('4. Quality of Care.pptx','quality-of-care','Quality of care'),
('6. Examples of CQI Projects using SOPs.pptx','cqi-examples','Examples of CQI projects using SOPs')]:
    add(base/'Presentations'/file,slug,title,'Presentations')


# Remove obsolete downloads so unlinked files cannot remain publicly accessible.
allowed = {Path(item['url']).name for item in items}
for existing in LIB.iterdir():
    if existing.is_file() and existing.name not in allowed:
        existing.unlink()
(OUT/'data.js').write_text('window.SENTINEL_DATA = '+json.dumps(dict(resources=items),ensure_ascii=False)+';\n',encoding='utf-8')
print(f'Prepared {len(items)} privacy-reviewed resources.')
