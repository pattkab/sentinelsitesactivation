"""Copy the supplied field materials and generate the website resource index."""
import csv, json, shutil
from pathlib import Path
import openpyxl

SOURCE = Path(r'C:\Users\xpatt\OneDrive\Desktop\INTEGRATION\SENTINEL SITES')
OUT = Path(__file__).resolve().parents[1] / 'dist'
LIB = OUT / 'resources'
LIB.mkdir(exist_ok=True)
items=[]
def add(src, slug, title, category, note=''):
    src=SOURCE/src
    dest=LIB/(slug+src.suffix.lower())
    shutil.copy2(src,dest)
    items.append(dict(id=slug,title=title,category=category,note=note,url='resources/'+dest.name,format=src.suffix[1:].upper(),size=round(dest.stat().st_size/1024)))

add(Path('DG Letter Activation of Sentinel Sites.pdf'),'dg-letter','Director General’s activation letter','Programme','4 September 2026. Original launch dates; use the relevant phase allocation for later visits.')
add(Path('Sentinel_Sites_Concept_Note_Revised_9-Mar-26.docx'),'concept-note','Sentinel sites concept note','Programme','Learning, adaptation and integrated service delivery • revised 9 March 2026')
for slug,name in [('facility','Facility'),('district','District'),('regional','Regional')]:
    src=next(p for p in SOURCE.glob('*.pdf') if name+' Maturity' in p.name)
    add(src.relative_to(SOURCE),slug+'-staging',name+' maturity staging tool','Assessment','PDF reference copy. Complete and submit the assessment in the online tool.')
add(next(p for p in SOURCE.glob('*.pdf') if 'Key Performance' in p.name).relative_to(SOURCE),'kpi-reference','Baseline key performance indicators','Assessment','PDF reference copy. Follow the reporting period, definitions and data sources in the online form.')
base=Path('SENTINEL SITES')
add(base/'Agenda'/'1. Weekly Program for Sentinel Site Activation.docx','weekly-programme','Weekly activation programme','Programme','Original 6–12 September schedule. Use the activity sequence with your assigned visit dates.')
add(base/'Logistics & Admin'/'List of Integration Sentinels.xlsx','sentinel-sites','List of integration sentinel sites','Programme')
for file,slug,title,note in [
('Mentorship Tool & Links to Tools.docx','mentorship-guide','Mentorship tool and links','Supporting guidance for assessment and mentorship'),
('QI documentation Journal.docx','qi-journal','Quality improvement documentation journal','Document the project, tests of change and follow-up'),
('Sentinel Site KPI Feedback.docx','kpi-feedback','KPI technical feedback','Supporting feedback document; the online tool remains the submission route'),
('Sentinel Site Maturity Staging Tools Technical Feedback.docx','staging-feedback','Maturity staging technical feedback','Supporting feedback document'),
('SOP flow diagrams_Aug 2026__.pdf','sop-diagrams','Integrated care SOP flow diagrams','August 2026 • printable reference'),
('SOP flow diagrams_Aug 2026__.docx','sop-diagrams-editable','Integrated care SOP flow diagrams — editable','August 2026 • Word copy')]:
    add(base/'Mentorship Tools and SOPs'/file,slug,title,'SOPs & CQI',note)
for file,slug,title in [
('1. Abridged Overview Activation presentation_11 Sept 2026.pptx','activation-overview','Abridged activation overview'),
('1. Comprehensive Overview Sentinel_Sites_Activation PPT 22 Sept 2026.pptx','comprehensive-overview','Comprehensive activation overview'),
('1. Overview Integrated Delivery of Health Services-Sentinel.pptx','integrated-delivery','Overview of integrated health service delivery'),
('2. Sentinel_Learning_Sites_Orientation_Sept 6 2026.pptx','sentinel-orientation','Sentinel learning sites orientation'),
('3. Data Collection Tool Slides.pptx','data-collection','Data collection tools'),
('4. Quality of Care.pptx','quality-of-care','Quality of care'),
('5. SOPs at Sentinel Sites_.pptx','sops-presentation','SOPs at sentinel sites'),
('6. Examples of CQI Projects using SOPs.pptx','cqi-examples','Examples of CQI projects using SOPs')]:
    add(base/'Presentations'/file,slug,title,'Presentations')
add(base/'Reporting tools'/'Revised Sentinel_Site_Facility_Activation_Summary_and_Agreed_Actions.docx','facility-report','Facility activation summary and agreed actions','Reporting','One report per facility. Supplied template includes Akokoro/Apac example details: replace the facility, date, names and sign-off before use.')
add(base/'Reporting tools'/'Revised Sentinel_Site_Mission_Synthesis_Report_by Team Leads_.docx','mission-report','Mission synthesis report for team leads','Reporting','Cross-site summary. Replace the prefilled Lango region with your mission details.')

wb=openpyxl.load_workbook(next((SOURCE/'MOROTO Region').glob('*.xlsx')),data_only=True)
teams=[]
for row in wb.active.iter_rows(min_row=3,values_only=True):
    if len(row)>=6 and row[0] and row[5]:
        teams.append(dict(name=str(row[0]).strip(),role=str(row[1] or '').strip(),level=str(row[2] or '').strip(),region=str(row[5]).strip()))
with (LIB/'phase-3-team-allocations.csv').open('w',newline='',encoding='utf-8-sig') as f:
    writer=csv.DictWriter(f,fieldnames=['name','role','level','region']);writer.writeheader();writer.writerows(teams)
items.append(dict(id='phase-3',title='Phase 3 team allocations',category='Programme',note='27 September–3 October 2026 • public copy without phone numbers or email addresses',url='resources/phase-3-team-allocations.csv',format='CSV',size=round((LIB/'phase-3-team-allocations.csv').stat().st_size/1024)))
(OUT/'data.js').write_text('window.SENTINEL_DATA = '+json.dumps(dict(resources=items,teams=teams),ensure_ascii=False)+';\n',encoding='utf-8')
print(f'Prepared {len(items)} resources and {len(teams)} team assignments.')
