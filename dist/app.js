'use strict';
const DATA = window.SENTINEL_DATA;
const LINKS = {
 staging:'https://uhacentral.com/-/single/ZCbWrbEDtLOt88FlmnrlS32rsTVJmOV?st=pDVZNJ2NMh9ZtMKq5OLNo1nIo9MAdA',
 kpi:'https://uhacentral.com/-/single/IQMUPFMAfQC6WbO2bqXOWdMRHfQylHK?st=y9OQN!9qhUJx0PjNL11NKMGpqhcAK10a4lelQQiSvoHNhR5dluAjXqoKTdmnaQBX',
 action:'https://uhacentral.com/-/single/HA4jxCDTSfIBeC26PmoCSr1bUeN0Mjm?st=eWmrmIUr7NapOuEOCszbtpX4hm79PtJP1Z4H0hOBdeKPIoNSu92DQjRgpJB$JOjw',
 sops:'https://uganda-integrated-care-sops.pattkab.chatgpt.site/',
 drive:'https://drive.google.com/drive/folders/1EwPBAMrvi6Ep32qMVQJxEsASAhSRi8fE'
};
const STAGING_CODE='$q9iNC!gitjRApLTUo2iA!thx72hhWLqpc';
const DECKS=[
 {title:'Abridged Overview Activation presentation, 11 Sept 2026',url:'https://docs.google.com/presentation/d/1yCJzDETw3oOaRzjage5dHjoDxtrDBLc7/edit?usp=drive_link&ouid=117775352150827193595&rtpof=true&sd=true'},
 {title:'Overview Integrated Delivery of Health Services-Sentinel',url:'https://docs.google.com/presentation/d/1yj0vwdNsa7xo8wEis95GRp73mZsbzRcm/edit?usp=drive_link&ouid=117775352150827193595&rtpof=true&sd=true'},
 {title:'Sentinel Learning Sites Orientation, Sept 6 2026',url:'https://docs.google.com/presentation/d/1HrApIMlXEG3TenMsFs-7QcxfTmBuFiMZ/edit?usp=drive_link&ouid=117775352150827193595&rtpof=true&sd=true'},
 {title:'Data Collection Tool Slides',url:'https://docs.google.com/presentation/d/1rMPk6Q5qmyEUMfAGjLzi8KsHQxKugm1A/edit?usp=drive_link&ouid=117775352150827193595&rtpof=true&sd=true'},
 {title:'Quality of Care',url:'https://docs.google.com/presentation/d/1P9lA-i3ewPDiSQqHFCd_votbfzYbMoy5/edit?usp=drive_link&ouid=117775352150827193595&rtpof=true&sd=true'},
 {title:'SOPs at Sentinel Sites',url:'https://docs.google.com/presentation/d/10DdZ3FbV9a4TP44mHSTwSZ4oG376I6a8/edit?usp=drive_link&ouid=117775352150827193595&rtpof=true&sd=true'}
];
const CLOUD_DOCS=[
 {title:'Revised Sentinel Site Facility Activation Summary and Agreed Actions',url:'https://docs.google.com/document/d/1X-iJzTHCjSe1-yOkuYwp4I4xmx0hL4oC/edit?usp=drive_link&ouid=117775352150827193595&rtpof=true&sd=true'},
 {title:'Revised Sentinel Site Mission Synthesis Report by Team Leads',url:'https://docs.google.com/document/d/1LIdL-HtNVCq5AFrdhFWJ2Jc5w3xQCu_K/edit?usp=drive_link&ouid=117775352150827193595&rtpof=true&sd=true'}
];
const paths={
 arrow:'M7 17 17 7M7 7h10v10',right:'M4 12h16m-6-6 6 6-6 6',
 stage:'M4 20h16M6 16V9m6 7V4m6 12v-5',chart:'M4 4v16h16M7 14l4-4 4 2 5-7',
 action:'M9 5H5v15h14V5h-4M9 3h6v4H9zM8 12h8m-8 4h5',book:'M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1zm0 0v15',
 file:'M14 3H5v18h14V8l-5-5zm0 0v5h5M8 13h8m-8 4h6',folder:'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z',present:'M3 4h18v12H3zM12 16v3M7 21l5-2 5 2',
 check:'m5 12 4 4L19 6',calendar:'M5 5h14v16H5zM8 3v4m8-4v4M5 10h14',search:'M20 20l-5-5m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0',print:'M7 9V3h10v6M7 17H4V9h16v8h-3M7 14h10v7H7z'};
const icon=(name)=>`<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[name]||paths.file}"/></svg>`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ext=(key,label,classes='button secondary')=>`<a class="${classes}" href="${esc(LINKS[key])}" target="_blank" rel="noopener noreferrer">${label}${icon('arrow')}</a>`;
const download=(id,label,classes='button secondary')=>{const r=DATA.resources.find(item=>item.id===id);return `<a class="${classes}" href="${esc(r.url)}" download>${label||esc(r.title)}${icon('file')}</a>`;};
const heading=(eyebrow,title,description,extra='')=>`<div class="page-heading"><div><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${description}</p></div>${extra}</div>`;
const main=document.querySelector('main');
let filter='',query='';
let checks=Array(8).fill(false);
let storageAvailable=true;
try{const saved=JSON.parse(sessionStorage.getItem('sentinel-checklist')||'null');if(Array.isArray(saved)&&saved.length===8)checks=saved.map(Boolean);}catch{storageAvailable=false;}

function overview(){
 return heading('SENTINEL SITE ACTIVATION','Ready for the field.','Open the tools, presentations and reporting templates, then follow the stepwise process to activate the sentinel site.')+`
 <section aria-labelledby="essential-heading"><div class="section-heading"><div><h2 id="essential-heading">Important links</h2><p>Three groups for the visit, plus the shared drive for coordination files. Then continue with the activation sequence below.</p></div></div>
 <div class="link-categories">
 <section class="category-block" aria-labelledby="tools-heading"><div class="category-head"><span class="category-index">01</span><div><h3 id="tools-heading">Tools</h3><p>Open the form, complete every required field, then click SUBMIT.</p></div></div>
 <div class="tool-grid">
 ${tool('staging','stage','Staging Tool','Regional, district and facility assessments. Select the relevant level from the dropdown. Enter the access code when the form asks for it.','Open staging tool',STAGING_CODE)}
 ${tool('kpi','chart','Key Performance Indicators','Work with the facility M&E focal person to collect the baseline performance data.','Open KPI form')}
 ${tool('action','action','Shared Experiences and Action Plan','Turn identified gaps into agreed actions. Record good practices and lessons.','Open action & learning form')}
 ${tool('sops','book','SOPs','Standard Operating Procedures for integrated care delivery, guidance and feedback.','Open SOPs portal')}
 </div></section>
 <section class="category-block" aria-labelledby="presentations-heading"><div class="category-head"><span class="category-index">02</span><div><h3 id="presentations-heading">Presentations</h3><p>Decks for the activation visit, named as in the shared documents. Open in Google Slides.</p></div></div>
 <div class="deck-grid">${DECKS.map(deck).join('')}</div></section>
 <section class="category-block" aria-labelledby="reports-heading"><div class="category-head"><span class="category-index">03</span><div><h3 id="reports-heading">Reporting templates</h3><p>One facility summary per sentinel site. Team leads also complete the mission synthesis. Download a copy before you travel, or open the shared document.</p></div></div>
 <div class="report-list">
 ${reportRow(CLOUD_DOCS[0].title,'Findings, agreed actions and follow-up for this sentinel site.','facility-report',CLOUD_DOCS[0].url)}
 ${reportRow(CLOUD_DOCS[1].title,'Cross-site findings, priorities and follow-up. Completed by team leads.','mission-report',CLOUD_DOCS[1].url)}
 </div></section>
 </div>
 <a class="drive-link" href="${esc(LINKS.drive)}" target="_blank" rel="noopener noreferrer"><span class="icon">${icon('folder')}</span><span><strong>Shared Google Drive</strong><small>Coordination documents, field resources and team files for the mission.</small></span><span class="drive-open">Open drive${icon('arrow')}</span></a>
 </section>
 <section id="sequence" aria-labelledby="sequence-heading"><div class="section-heading"><div><h2 id="sequence-heading">Your activation sequence: the stepwise process flow</h2><p>Work through these steps with the region, the district and the facility. Open the tool named in each step.</p></div><button class="button secondary" id="toggle-steps" type="button" aria-expanded="false">Expand all</button></div>
 ${stepsMarkup()}
 <p class="after-block"><a class="text-link" href="#checklist">Tick the completion checklist before you leave ${icon('right')}</a></p></section>`;
}
function tool(key,img,title,description,action,code){
 const codeBlock=code?`<p class="access-code"><span>Access code</span><code>${esc(code)}</code><button class="copy-code" type="button" data-copy="${esc(code)}">Copy</button></p>`:'';
 return `<article class="tool-card"><span class="icon">${icon(img)}</span><h3>${esc(title)}</h3><p>${description}</p>${codeBlock}<a class="card-bottom" href="${esc(LINKS[key])}" target="_blank" rel="noopener noreferrer">${action}${icon('arrow')}</a></article>`;
}
function deck({title,url}){return `<a class="deck-card" href="${esc(url)}" target="_blank" rel="noopener noreferrer"><span class="icon">${icon('present')}</span><h3>${esc(title)}</h3><span class="deck-open">Slides${icon('arrow')}</span></a>`;}
function reportRow(title,text,fileId,cloudUrl){
 const file=DATA.resources.find(item=>item.id===fileId);
 return `<article class="report-row"><div class="report-copy"><h3>${esc(title)}</h3><p>${esc(text)}</p></div><div class="report-actions"><a class="button secondary" href="${esc(file.url)}" download aria-label="Download ${esc(title)}">Download${icon('file')}</a><a class="button secondary" href="${esc(cloudUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(title)} in Google Docs">Cloud copy${icon('arrow')}</a></div></article>`;
}
const stages=[
 {title:'Prepare and align with the region',time:'Regional entry · usually Monday',body:'Bring regional leadership and the mentorship team together before district and facility work.',bullets:['Orient Regional Referral Hospital (RRH) leadership on sentinel sites as learning hubs for integrated service delivery.','Agree roles, team allocation, local arrangements and the week’s programme. Involve implementing partners and the relevant district teams.','Administer the regional maturity staging assessment. Choose the regional tool in the dropdown and click SUBMIT when complete.'],links:()=>ext('staging','Open staging tool')+download('weekly-programme','Weekly programme')},
 {title:'Engage the district leadership',time:'District entry · before facility assessment',body:'Visit the district and work with District Health Team (DHT) leadership.',bullets:['Introduce the objectives, expected deliverables and mentorship approach. Include the Diocesan Health Coordinator where relevant.','Administer the district maturity staging assessment using the district option in the online tool.','Check completeness and click SUBMIT. Retain notes on gaps, good practices and issues needing regional support.'],links:()=>ext('staging','Open staging tool')},
 {title:'Orient the facility and establish the baseline',time:'Facility entry · start early in the visit',body:'Use the abridged activation presentation with facility leadership and health workers, then start the assessments.',bullets:['Involve facility leaders, department heads, CQI leads, integration coordinators, health workers and implementing partners.','Administer facility staging across the nine domains. Review evidence with the relevant departments and keep notes for the report.','Give the KPI form to the facility monitoring and evaluation (M&E) focal person early so data collection can begin. Follow each indicator’s definition, data source and reporting period.','Complete all required fields and click SUBMIT in both the staging and KPI tools. Keep notes separately for your facility summary.'],links:()=>ext('staging','Open staging tool')+ext('kpi','Baseline KPIs')},
 {title:'Mentor on SOPs and start a CQI project',time:'During facility work · Tuesday–Friday',body:'Turn the assessment findings into practical changes at the service points.',bullets:['Schedule the CQI and standard operating procedure (SOP) presentations with the facility over the remaining days.','Distribute SOPs to the stations where they will be used. Update the continuing medical education (CME) schedule so each SOP has time for a later presentation.','Strengthen or revitalise the CQI/Quality of Care team. Start at least one project that supports the use of and adherence to SOPs.','Document the priority problem, first change to test, QI lead, indicator to monitor and first review date. Let the facility know there will be an end-of-visit debrief.'],links:()=>ext('sops','SOPs & feedback')+download('cqi-examples','CQI project examples')},
 {title:'Agree the action matrix and capture learning',time:'After assessment · before the debrief',body:'Use the findings from staging and KPIs to agree realistic corrective actions.',bullets:['For each priority gap, agree the corrective action, responsible person and timeline with the facility team. Identify support required from the district, RRH or MoH.','Record best practices and lessons in the shared learning section. Base actions on the gaps actually identified.','Fully populate the action matrix and shared learning form, review the entries and click SUBMIT. The online action tracker is the accountability record between visits.'],links:()=>ext('action','Action matrix & shared learning')},
 {title:'Debrief, report and agree follow-up',time:'Close-out · before leaving the facility',body:'Review the findings and agreed actions with facility leadership and confirm the follow-up arrangements.',bullets:['Complete one facility activation report per sentinel site as the baseline. Summarise strengths, key KPI findings, up to five priority gaps, priority actions, CQI focus and escalation needs.','Download the facility reporting template below and complete it with the current visit details.','Agree the next mentorship date and the responsible DHT/RRH focal person. Team leads use the mission synthesis template for cross-site findings.','Check that daily attendance lists are signed, with separate lists for facilitators and facility participants. Confirm the report submission arrangement with your team lead.'],links:()=>download('facility-report','Facility report')+download('mission-report','Team lead synthesis')}
];
function stepsMarkup(){
 return `<div class="notice"><strong>Throughout the visit:</strong> keep working notes and collect signed attendance daily. Facilitators and facility participants sign separate lists. Online forms need an internet connection. A downloaded file is a reference copy and does not submit an assessment.</div>`+
 stages.map((s,i)=>`<details class="guide-step" ${i===0?'open':''}><summary><span class="step-number">0${i+1}</span><div><h2>${s.title}</h2><small>${s.time}</small></div></summary><div class="step-body"><p>${s.body}</p><ul>${s.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>${s.links()?`<div class="step-links">${s.links()}</div>`:''}</div></details>`).join('')+
 `<section class="panel" style="margin-top:28px"><h2>The nine assessment domains</h2><p class="panel-intro">Use the online staging tool for the full questions, evidence requirements and scoring.</p><ol class="domains">${['Leadership and governance','Service delivery','Supply chain and medicines management','Health management information system (HMIS)','Human resources for health','Laboratory systems and diagnostics','Community systems and routine services','Health financing','Quality improvement'].map(d=>`<li>${d}</li>`).join('')}</ol></section>`;
}
function guide(){
 return heading('STEP-BY-STEP','The activation guide','The same stepwise process as on Home. Facility work runs Tuesday to Friday. Coordinate exact timings with local leadership, and open the tool named in each step.',`<button class="button secondary" id="toggle-steps" type="button" aria-expanded="false">Expand all</button>`)+
 stepsMarkup()+
 `<p class="after-block"><a class="text-link" href="#checklist">Tick the completion checklist before you leave ${icon('right')}</a></p>`;
}
function resources(){
 return heading('DOWNLOADS & REFERENCES','Files for the visit','Download presentations, assessment references, mentorship notes and reporting templates. The online tools, slide decks and shared templates are on Home.')+
 `<div class="toolbar"><label class="search-wrap"><span class="sr-only">Search resources</span>${icon('search')}<input id="resource-search" type="search" placeholder="Search presentations, SOPs, assessments…" value="${esc(query)}"></label><label class="field"><span>Category</span><select id="resource-category"><option value="">All categories</option>${['Programme','Assessment','Presentations','SOPs & CQI','Reporting'].map(c=>`<option ${filter===c?'selected':''}>${esc(c)}</option>`).join('')}</select></label></div><p class="result-count" id="result-count" role="status"></p><div class="resource-grid" id="resource-results"></div><div class="notice">Some source materials include earlier visit dates or example entries. Check the resource notes before use. Reference PDFs support preparation; assessments must still be submitted in the online forms.</div>`;
}
function renderResources(){const list=DATA.resources.filter(r=>(!filter||r.category===filter)&&`${r.title} ${r.note} ${r.category} ${r.format}`.toLowerCase().includes(query.toLowerCase().trim()));document.querySelector('#result-count').textContent=`${list.length} of ${DATA.resources.length} resources`;document.querySelector('#resource-results').innerHTML=list.length?list.map(r=>`<article class="resource"><span class="file-icon ${r.format.toLowerCase()}">${r.format}</span><div><span class="category">${esc(r.category)}</span><h3>${esc(r.title)}</h3>${r.note?`<p>${esc(r.note)}</p>`:''}<div class="resource-meta"><span>${r.size>=1024?(r.size/1024).toFixed(1)+' MB':r.size+' KB'}</span><a href="${r.url}" download aria-label="Download ${esc(r.title)}">Download ↓</a>${r.format==='PDF'?`<a href="${r.url}" target="_blank" rel="noopener noreferrer" aria-label="View ${esc(r.title)}">View ↗</a>`:''}</div></div></article>`).join(''):`<div class="empty"><h3>No matching resources</h3><p>Try a different search or select All categories.</p><button class="button secondary" id="clear-search" type="button">Clear filters</button></div>`;document.querySelector('#clear-search')?.addEventListener('click',()=>{query='';filter='';document.querySelector('#resource-search').value='';document.querySelector('#resource-category').value='';renderResources();});}
const deliverables=[
 ['Regional staging assessment completed','The regional tool is fully populated and submitted; coordinate this with the regional team.'],
 ['District staging assessment completed','The district tool is fully populated and submitted.'],
 ['Facility staging assessment completed','All relevant domains are assessed and the facility form is submitted.'],
 ['Baseline KPIs completed and submitted','The facility M&E focal person has supported data collection and the completed KPI form is submitted.'],
 ['At least one CQI project started','The project supports SOP use and adherence, with a QI lead, a measure and a first review date.'],
 ['Action matrix and shared learning submitted','Corrective actions have responsible persons and timelines. Good practices and learning are recorded.'],
 ['Facility baseline report completed','One report for this sentinel site. Follow-up and submission arrangements are agreed.'],
 ['Daily attendance lists completed','Each day has signed attendance, with separate lists for facilitators and facility participants.']
];
function checkItem(i){const d=deliverables[i];return `<label class="check-item"><input type="checkbox" data-check="${i}" ${checks[i]?'checked':''}><span><strong>${esc(d[0])}</strong><small>${esc(d[1])}</small></span></label>`;}
function checkGroup(title,text,actions,indexes){return `<div class="check-group"><div class="check-group-head"><div><h3>${title}</h3><p>${text}</p></div>${actions?`<div class="step-links">${actions}</div>`:''}</div>${indexes.map(checkItem).join('')}</div>`;}
function checklist(){
 return heading('BEFORE YOU LEAVE','Close the visit with confidence','Tick this list for the facility you are in now. A tick is a personal reminder. It does not submit or verify an official form.',`<button class="button secondary" id="print-checklist" type="button">${icon('print')} Print checklist</button>`)+
 `<section class="panel"><div class="progress-row"><strong id="progress-label" role="status"></strong><span>Visit completion</span></div><div class="progress-track" role="progressbar" aria-label="Checklist completion" aria-valuemin="0" aria-valuemax="8"><div id="progress-fill"></div></div>`+
 checkGroup('Staging assessments','Regional, district and facility each use the same online tool. Choose the level from the dropdown, then click SUBMIT.',ext('staging','Open staging tool'),[0,1,2])+
 checkGroup('Baseline KPIs','Collect the figures with the facility M&E focal person, then submit the form.',ext('kpi','Open KPI form'),[3])+
 checkGroup('CQI project','Start one project that supports use of the SOPs, with a lead, a measure and a review date.',ext('sops','Open SOPs'),[4])+
 checkGroup('Actions and learning','Record the corrective action, the owner, the timeline and what the team learned.',ext('action','Open action form'),[5])+
 checkGroup('Facility report','Scores stay in the online tools. This written report is the baseline for the site. Team leads also complete the mission synthesis.',download('facility-report','Facility template')+download('mission-report','Mission synthesis'),[6])+
 checkGroup('Attendance','Signed lists for every day of the visit, kept separate for facilitators and participants.','',[7])+
 `<div class="check-actions"><p id="storage-note">${storageAvailable?'Progress stays in this browser tab for this visit. Reset the list before the next facility.':'Browser storage is unavailable. Progress lasts only while this page remains open.'}</p><button class="button secondary" id="reset-checklist" type="button">Reset for next facility</button></div></section>`;
}
function updateChecks(){const count=checks.filter(Boolean).length;document.querySelector('#progress-label').textContent=count===8?'8 of 8 ready for close-out':`${count} of 8 completed`;document.querySelector('#progress-fill').style.width=count/8*100+'%';document.querySelector('[role="progressbar"]').setAttribute('aria-valuenow',count);try{sessionStorage.setItem('sentinel-checklist',JSON.stringify(checks));}catch{document.querySelector('#storage-note').textContent='Browser storage is unavailable. Progress lasts only while this page remains open.';}}
function teams(){
 return heading('PROGRAMME','The field week','Phase 3 runs from 27 September to 3 October 2026. Confirm facility assignments and final timings with your team lead.')+
 `<section class="week" aria-label="Typical activation week">${[['MONDAY','Regional entry','Orientation, regional staging and final team allocation.'],['TUESDAY','District & facility entry','District engagement, facility orientation and staging.'],['WEDNESDAY','Baseline & SOPs','Continue assessment, collect KPIs and orient on SOPs.'],['THURSDAY','CQI & learning','Start a CQI project and document practical learning.'],['FRIDAY','Actions & close-out','Agree actions, debrief, report and confirm follow-up.']].map(d=>`<article class="day-card"><span>${d[0]}</span><h3>${d[1]}</h3><p>${d[2]}</p></article>`).join('')}</section>`+
 `<div class="notice">Use this week as the planning view. The actions and tools for each day are in the <a href="#guide">activation guide</a>. Confirm arrangements through your internal coordination channel.</div>`+
 `<section class="panel" style="margin-top:28px"><h2>Bring the right people together</h2><p class="panel-intro">Engage leadership and the teams who will deliver and sustain integrated care.</p><div class="stakeholders">${['RRH leadership','DHT leadership','Diocesan Health Coordinator','Facility leaders & department heads','CQI leads & integration coordinators','Health workers','Implementing partners: JCRC, UHA, FHI360, UCMB'].map(s=>`<span>${s}</span>`).join('')}</div></section>`;
}
const pages={overview,guide,resources,checklist,teams};
const labels={overview:'Home',guide:'Activation guide',resources:'Resource library',checklist:'Completion checklist',teams:'Field schedule'};
function render(focus=false){
 const page=location.hash.slice(1).split('/')[0]||'overview';
 const current=Object.hasOwn(pages,page)?page:'overview';
 document.querySelectorAll('[data-page]').forEach(a=>{const active=a.dataset.page===current;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 document.querySelector('#page-label').textContent=labels[current];
 document.title=`${labels[current]} | Sentinel Site Activation`;
 main.innerHTML=pages[current]();
 if(current==='resources'){renderResources();document.querySelector('#resource-search').addEventListener('input',e=>{query=e.target.value;renderResources();});document.querySelector('#resource-category').addEventListener('change',e=>{filter=e.target.value;renderResources();});}
 if(current==='checklist'){updateChecks();document.querySelectorAll('[data-check]').forEach(c=>c.addEventListener('change',()=>{checks[Number(c.dataset.check)]=c.checked;updateChecks();}));document.querySelector('#print-checklist').addEventListener('click',()=>window.print());document.querySelector('#reset-checklist').addEventListener('click',()=>{if(checks.some(Boolean)&&!window.confirm('Clear this visit’s checklist and start the next facility?'))return;checks.fill(false);document.querySelectorAll('[data-check]').forEach(c=>c.checked=false);updateChecks();});}
 const toggle=document.querySelector('#toggle-steps');
 if(toggle) toggle.addEventListener('click',()=>{const steps=[...document.querySelectorAll('.guide-step')];const expand=steps.some(step=>!step.open);steps.forEach(step=>{step.open=expand;});toggle.textContent=expand?'Collapse all':'Expand all';toggle.setAttribute('aria-expanded',String(expand));});
 document.querySelectorAll('.copy-code').forEach(btn=>btn.addEventListener('click',async()=>{const code=btn.getAttribute('data-copy')||'';const label=btn.textContent;try{await navigator.clipboard.writeText(code);btn.textContent='Copied';}catch{const field=btn.previousElementSibling;if(field&&window.getSelection){const range=document.createRange();range.selectNodeContents(field);const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);}btn.textContent='Selected';}setTimeout(()=>{btn.textContent=label;},1600);}));
 if(focus){window.scrollTo(0,0);main.focus({preventScroll:true});}
}
document.addEventListener('click',e=>{const a=e.target.closest('[data-resource-filter]');if(!a)return;filter=a.dataset.resourceFilter;query='';if(location.hash.split('/')[0]==='#resources')render(true);});
window.addEventListener('hashchange',()=>render(true));
render();
