// Metadata for exercises; Word docs will be linked directly for now.
// Filenames in the repository root; adjust paths if moved.
const EXERCISES = [
  {
    id: 'ekg',
    file: 'Laboppgave EKG-registrering.docx',
    title: { en: 'ECG Recording', no: 'EKG-registrering' },
    tags: ['monitoring'],
    blurb: {
      en: 'Signal acquisition basics, lead placement, filter effects, safety.',
      no: 'Grunnleggende signalopptak, avleder, filtre og sikkerhet.'
    }
  },
  {
    id: 'bp_pulseox',
    file: 'Laboppgave blodtrykk og pulsoksymetri.docx',
    title: { en: 'Blood Pressure & Pulse Oximetry', no: 'Blodtrykk og pulsoksymetri' },
    tags: ['vitals'],
    blurb: {
      en: 'Non-invasive BP measurement principles and SpO₂ estimation.',
      no: 'Prinsipper for ikke-invasivt blodtrykk og SpO₂-estimering.'
    }
  },
  {
    id: 'defib',
    file: 'Laboppgave defibrillator.docx',
    title: { en: 'Defibrillator', no: 'Defibrillator' },
    tags: ['therapy','safety'],
    blurb: {
      en: 'Energy delivery, waveform concepts, checks, and safety protocols.',
      no: 'Energilevering, bølgeformer, tester og sikkerhetsprosedyrer.'
    }
  },
  {
    id: 'infusion',
    file: 'Laboppgave infusjonspumper.docx',
    title: { en: 'Infusion Pumps', no: 'Infusjonspumper' },
    tags: ['therapy','pumps'],
    blurb: {
      en: 'Flow accuracy, alarm handling, and occlusion detection.',
      no: 'Strømnøyaktighet, alarmer og okklusjonsdeteksjon.'
    }
  },
  {
    id: 'respirator',
    file: 'Laboppgave respirator.docx',
    title: { en: 'Ventilator', no: 'Respirator' },
    tags: ['therapy','respiratory'],
    blurb: {
      en: 'Modes, waveforms, patient safety and monitoring.',
      no: 'Moduser, bølgeformer, pasientsikkerhet og overvåkning.'
    }
  },
  {
    id: 'ultrasound',
    file: 'laboppgave ultralyd.docx',
    title: { en: 'Ultrasound', no: 'Ultralyd' },
    tags: ['imaging'],
    blurb: {
      en: 'Transducer physics, B-mode imaging and artifact recognition.',
      no: 'Transducerfysikk, B-modus avbildning og artefakter.'
    }
  },
  {
    id: 'diathermy',
    file: 'Laboppgave diatermi.docx',
    title: { en: 'Diathermy', no: 'Diatermi' },
    tags: ['therapy','electrosurgery'],
    blurb: {
      en: 'Electrosurgical unit principles and safety considerations.',
      no: 'Prinsipper for elektrokirurgi og sikkerhetsaspekter.'
    }
  }
];

function createExerciseCard(ex) {
  const lang = window.currentLang || 'en';
  const card = document.createElement('a');
  card.className = 'project-card';
  card.href = `exercise.html?id=${encodeURIComponent(ex.id)}`;
  const title = ex.title[lang];
  const blurb = ex.blurb[lang];
  card.innerHTML = `
  <h4>${title}</h4>
  <p>${blurb}</p>
  <div class="badges">${ex.tags.map(t=>`<span class="badge">${t}</span>`).join('')}</div>
  <span class="open-link">${lang==='no'?'Åpne':'Open'}</span>
  `;
  return card;
}

function filterExercises(query) {
  if (!query) return EXERCISES;
  const q = query.toLowerCase();
  return EXERCISES.filter(ex => {
    const lang = window.currentLang || 'en';
    return (
      ex.title[lang].toLowerCase().includes(q) ||
      ex.blurb[lang].toLowerCase().includes(q) ||
      ex.tags.some(t=>t.toLowerCase().includes(q))
    );
  });
}

function renderExercises() {
  const grid = document.getElementById('exercise-grid');
  grid.innerHTML='';
  const searchInput = document.getElementById('exercise-search');
  const query = searchInput ? searchInput.value.trim() : '';
  const list = filterExercises(query);
  if (list.length === 0) {
    const empty = document.createElement('div');
    empty.className='empty-state';
    const lang = window.currentLang || 'en';
    empty.textContent = I18N_DICT[lang].empty_results;
    grid.appendChild(empty);
    return;
  }
  list.forEach(ex=>grid.appendChild(createExerciseCard(ex)));
}

window.updateExerciseCards = renderExercises;

window.addEventListener('DOMContentLoaded', () => {
  renderExercises();
  const search = document.getElementById('exercise-search');
  const clearBtn = document.getElementById('clear-search');
  if (search) {
    search.addEventListener('input', () => {
      renderExercises();
    });
    search.addEventListener('keydown', e => { if (e.key==='Escape'){ search.value=''; renderExercises(); search.blur(); }});
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', () => { if (search){ search.value=''; search.focus(); renderExercises(); }});
  }
});
