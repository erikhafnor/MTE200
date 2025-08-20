// Logic for interactive exercise page
(function(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const ex = EXERCISES.find(e=>e.id===id);
  const steps = EXERCISE_STEPS[id] || [];
  const progressKey = 'mte200_progress_'+id;

  if(!ex){
    document.getElementById('steps-container').innerHTML = '<div class="empty-state">Exercise not found.</div>';
    return;
  }

  function loadProgress(){
    try{ return JSON.parse(localStorage.getItem(progressKey))||{current:0,completed:[]} }catch(e){return {current:0,completed:[]};}
  }
  function saveProgress(){ localStorage.setItem(progressKey, JSON.stringify(state)); }

  let state = loadProgress();
  if(state.current >= steps.length) state.current = steps.length-1;

  function renderMeta(){
    const lang = window.currentLang || 'en';
    document.getElementById('exercise-title').textContent = ex.title[lang];
    document.getElementById('exercise-blurb').textContent = ex.blurb[lang];
    const dl = document.getElementById('download-docx');
    dl.textContent = I18N_DICT[lang].download_docx;
    dl.href = encodeURI(ex.file);
  }

  function renderSteps(){
    const container = document.getElementById('steps-container');
    const lang = window.currentLang || 'en';
    container.innerHTML = '';
    steps.forEach((s,idx)=>{
      const card = document.createElement('div');
      card.className = 'step-card'+(state.completed.includes(idx)?' completed':'')+(idx===state.current?' active':'');
      card.setAttribute('data-step', idx);
      card.innerHTML = `
        <div class="step-card-header">
          <div class="step-index">${idx+1}</div>
          <div class="step-title">${s.title[lang]}</div>
        </div>
        <div class="step-body">${s.body[lang]}</div>
      `;
      card.addEventListener('click',()=>{ state.current=idx; update(); });
      container.appendChild(card);
    });
  }

  function updateProgressUI(){
    const fill = document.getElementById('progress-fill');
    const completedCount = state.completed.length;
    const pct = steps.length? ((completedCount)/steps.length)*100 : 0;
    fill.style.width = pct+'%';
    const lang = window.currentLang || 'en';
    document.getElementById('step-count').textContent = `${completedCount}/${steps.length} ${lang==='no'?'fullført':'completed'}`;
    document.getElementById('completion-indicator').textContent = pct===100? (lang==='no'?'Alle steg fullført':'All steps completed'):'';
  }

  function updateNav(){
    const prev = document.getElementById('prev-step');
    const next = document.getElementById('next-step');
    prev.disabled = state.current<=0;
    next.disabled = state.current>=steps.length-1;
  }

  function autoScrollCurrent(){
    const active = document.querySelector('.step-card.active');
    if(active){ active.scrollIntoView({behavior:'smooth', block:'center'}); }
  }

  function update(){
    if(!state.completed.includes(state.current)) state.completed.push(state.current);
    renderSteps();
    updateProgressUI();
    updateNav();
    saveProgress();
    autoScrollCurrent();
  }

  document.getElementById('prev-step').addEventListener('click',()=>{ if(state.current>0){state.current--; update();}});
  document.getElementById('next-step').addEventListener('click',()=>{ if(state.current<steps.length-1){state.current++; update();}});
  document.getElementById('reset-progress').addEventListener('click',()=>{ if(confirm('Reset progress?')){ state={current:0,completed:[]}; update(); }});

  // Re-render on language change
  const origApply = window.updateExerciseCards; // not used here but keep reference
  const observer = new MutationObserver(()=>{ renderMeta(); renderSteps(); updateProgressUI(); updateNav(); });
  observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  async function loadFullText(){
    // Map exercise id to doc filename used in extraction
    const map = {
      ekg: 'Laboppgave EKG-registrering.html',
      bp_pulseox: 'Laboppgave blodtrykk og pulsoksymetri.html',
      defib: 'Laboppgave defibrillator.html',
      diathermy: 'Laboppgave diatermi.html',
      infusion: 'Laboppgave infusjonspumper.html',
      respirator: 'Laboppgave respirator.html',
      ultrasound: 'laboppgave ultralyd.html'
    };
    const file = map[id];
    if(!file) return;
    try {
      const resp = await fetch('extracted/' + encodeURI(file));
      if(!resp.ok) return;
      const html = await resp.text();
      const full = document.getElementById('full-text');
      full.innerHTML = '<div class="lab-meta-callout">'+(window.currentLang==='no'?'Dette er den fulle teksten fra Word-filen.':'Full text extracted from the original Word document.')+'</div>' + html;
      buildTOC();
      initScrollSpy();
    } catch(e){/* ignore */}
  }

  function slugify(text){
    return text.toLowerCase().trim().replace(/[^a-z0-9\u00C0-\u017F\s-]/g,'').replace(/\s+/g,'-').slice(0,80);
  }

  function buildTOC(){
    const container = document.getElementById('full-text');
    const tocEl = document.getElementById('toc');
    if(!container || !tocEl) return;
    const headings = [...container.querySelectorAll('h2, h3, h4')];
    if(!headings.length){ tocEl.innerHTML=''; return; }
    const list = document.createElement('ol');
    headings.forEach(h=>{
      const level = parseInt(h.tagName.substring(1),10);
      if(!h.id){ h.id = slugify(h.textContent); }
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      a.classList.add('toc-lvl-'+level);
      li.appendChild(a);
      list.appendChild(li);
    });
    tocEl.innerHTML = '<h5>'+(window.currentLang==='no'?'Oversikt':'Outline')+'</h5>';
    tocEl.appendChild(list);
  }

  function initScrollSpy(){
    const tocEl = document.getElementById('toc');
    if(!tocEl) return;
    const links = [...tocEl.querySelectorAll('a')];
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          links.forEach(l=>l.classList.toggle('active', l.getAttribute('href')==='#'+entry.target.id));
        }
      });
    },{ rootMargin: '0px 0px -70% 0px', threshold:0});
    links.forEach(l=>{
      const target = document.getElementById(l.getAttribute('href').slice(1));
      if(target) observer.observe(target);
    });
  }

  function setMode(mode){
    const stepsView = document.getElementById('steps-view');
    const full = document.getElementById('full-text');
    document.querySelectorAll('.toggle-mode').forEach(b=>b.classList.toggle('mode-active', b.dataset.mode===mode));
    if(mode==='full'){
      stepsView.style.display='none';
      full.classList.add('active');
    } else {
      stepsView.style.display='block';
      full.classList.remove('active');
    }
  }

  document.getElementById('mode-steps').addEventListener('click', ()=> setMode('steps'));
  document.getElementById('mode-full').addEventListener('click', ()=> setMode('full'));

  renderMeta();
  renderSteps();
  updateProgressUI();
  updateNav();
  autoScrollCurrent();
  loadFullText();
})();
