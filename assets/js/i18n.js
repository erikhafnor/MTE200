// Simple bilingual dictionary (NO/EN)
const I18N_DICT = {
  en: {
    course_code: 'MTE200',
    course_title: 'Medical Equipment',
    tagline: 'Laboratory exercises in biomedical instrumentation & safety.',
    choose_intro: 'Explore the exercises below. Prepare, perform, reflect.',
    exercise_catalog: 'Exercise Catalog',
  search_placeholder: 'Search exercises...',
  empty_results: 'No exercises match your search.',
  previous_btn: 'Previous',
  next_btn: 'Next',
  reset_progress: 'Reset Progress',
  download_docx: 'Download .docx',
    about_header: 'About',
    about_text: 'These lab exercises support core learning outcomes in medical technology: measurement principles, risk management, patient safety, and regulatory awareness.',
    footer_course: 'MTE200 – Educational use only.'
  },
  no: {
    course_code: 'MTE200',
    course_title: 'Medisinsk utstyr',
    tagline: 'Laboratorieøvelser i biomedisinsk instrumentering og sikkerhet.',
    choose_intro: 'Utforsk øvelsene nedenfor. Forbered, utfør, reflekter.',
    exercise_catalog: 'Øvelseskatalog',
  search_placeholder: 'Søk i øvelser...',
  empty_results: 'Ingen øvelser matcher søket.',
  previous_btn: 'Forrige',
  next_btn: 'Neste',
  reset_progress: 'Nullstill fremdrift',
  download_docx: 'Last ned .docx',
    about_header: 'Om',
    about_text: 'Disse labøvelsene støtter læringsmål i medisinsk teknologi: måleprinsipper, risikohåndtering, pasientsikkerhet og regulatorisk forståelse.',
    footer_course: 'MTE200 – Kun til undervisningsbruk.'
  }
};

let currentLang = 'en';

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = I18N_DICT[currentLang][key];
    if (value) el.textContent = value;
  });
  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = I18N_DICT[currentLang][key];
    if (value) el.setAttribute('placeholder', value);
  });
  // Update per-exercise dynamic strings if any
  if (window.updateExerciseCards) window.updateExerciseCards();
}

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === 'no' ? 'no' : 'en';
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  applyTranslations();
  localStorage.setItem('mte200_lang', lang);
}

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('mte200_lang');
  if (saved && (saved === 'no' || saved === 'en')) currentLang = saved;
  setLanguage(currentLang);
  document.getElementById('lang-no').addEventListener('click', ()=>setLanguage('no'));
  document.getElementById('lang-en').addEventListener('click', ()=>setLanguage('en'));
});
