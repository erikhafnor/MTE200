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

  renderMeta();
  renderSteps();
  updateProgressUI();
  updateNav();
  autoScrollCurrent();
})();
