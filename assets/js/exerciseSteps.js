// Structured step-by-step content for each exercise.
// Keep concise; can expand later. Each step supports EN / NO text.

const EXERCISE_STEPS = {
  ekg: [
    {
      title: { en: 'Objective', no: 'Mål' },
      body: { en: 'Understand ECG lead placement and observe how filters affect signal morphology.', no: 'Forstå EKG-avleder og observer hvordan filtre påvirker signalform.' }
    },
    {
      title: { en: 'Safety Check', no: 'Sikkerhetssjekk' },
      body: { en: 'Verify patient simulator or consent; inspect cables for damage before connecting.', no: 'Bekreft pasientsimulator eller samtykke; inspiser kabler for skader før tilkobling.' }
    },
    {
      title: { en: 'Lead Placement', no: 'Avleder' },
      body: { en: 'Place limb and precordial leads per standard; ensure skin prep for low impedance.', no: 'Plasser ekstremitets- og prekordialavledninger korrekt; sørg for god hudforberedelse.' }
    },
    {
      title: { en: 'Signal Capture', no: 'Signalopptak' },
      body: { en: 'Record baseline trace at 25 mm/s; annotate any artifacts observed.', no: 'Registrer basislinje ved 25 mm/s; noter eventuelle artefakter.' }
    },
    {
      title: { en: 'Filter Exploration', no: 'Filterutforskning' },
      body: { en: 'Toggle mains and baseline filters; compare QRS amplitude and ST segment changes.', no: 'Aktiver nett- og basislinjefiltre; sammenlign QRS-amplitude og ST-endringer.' }
    },
    {
      title: { en: 'Reflection', no: 'Refleksjon' },
      body: { en: 'Summarize how filtering can mask clinical features; propose mitigation strategies.', no: 'Oppsummer hvordan filtrering kan maskere kliniske trekk; foreslå tiltak.' }
    }
  ],
  bp_pulseox: [
    { title:{en:'Objective',no:'Mål'}, body:{en:'Measure blood pressure manually and with an automatic device; compare readings.', no:'Mål blodtrykk manuelt og med automatisk apparat; sammenlign verdier.'} },
    { title:{en:'Cuff Selection',no:'Mansjettvalg'}, body:{en:'Select proper cuff size (40% width, 80% length of arm circumference).', no:'Velg korrekt mansjettstørrelse (40% bredde, 80% lengde av armomkrets).'} },
    { title:{en:'Manual Measurement',no:'Manuell måling'}, body:{en:'Palpate brachial artery, inflate 30 mmHg above disappearance, deflate 2–3 mmHg/s.', no:'Palper brachialarterien, blås opp 30 mmHg over forsvinning, tøm 2–3 mmHg/s.'} },
    { title:{en:'Pulse Oximetry',no:'Pulsoksimetri'}, body:{en:'Apply sensor, note SpO₂ stability and pleth waveform quality.', no:'Plasser sensor, noter SpO₂ stabilitet og pletysmografens kvalitet.'} },
    { title:{en:'Error Sources',no:'Feilkilder'}, body:{en:'List motion, poor perfusion, ambient light; quantify potential bias.', no:'List bevegelse, dårlig perfusjon, omgivelseslys; kvantifiser mulig bias.'} },
    { title:{en:'Reflection',no:'Refleksjon'}, body:{en:'Interpret differences and indicate which method you trust more and why.', no:'Tolk forskjeller og angi hvilken metode du stoler mest på og hvorfor.'} }
  ],
  defib: [
    { title:{en:'Objective',no:'Mål'}, body:{en:'Understand defibrillator energy selection and safety checks.', no:'Forstå energivalg og sikkerhetstester for defibrillator.'}},
    { title:{en:'Self-Test',no:'Selvtest'}, body:{en:'Run device self-test; confirm readiness indicators.', no:'Kjør selvtest; bekreft klarindikatorer.'}},
    { title:{en:'Charging',no:'Opplading'}, body:{en:'Select 150–200 J, charge and simulate shock delivery (no patient).', no:'Velg 150–200 J, lad opp og simuler støt (ingen pasient).'}},
    { title:{en:'Pads Placement',no:'Pad-plassering'}, body:{en:'Anterior-lateral placement; ensure full adhesion.', no:'Antero-lateral plassering; sikker full kontakt.'}},
    { title:{en:'Post-Event Check',no:'Etterkontroll'}, body:{en:'Document energy, impedance, and any alarms.', no:'Dokumenter energi, impedans og eventuelle alarmer.'}},
    { title:{en:'Reflection',no:'Refleksjon'}, body:{en:'Summarize safety considerations observed.', no:'Oppsummer observerte sikkerhetsaspekter.'}}
  ],
  infusion: [
    { title:{en:'Objective',no:'Mål'}, body:{en:'Assess infusion pump accuracy and alarm responsiveness.', no:'Vurdér infusjonspumpens nøyaktighet og alarmrespons.'}},
    { title:{en:'Setup',no:'Oppsett'}, body:{en:'Prime line, remove air, set prescribed rate.', no:'Prim slange, fjern luft, sett foreskrevet hastighet.'}},
    { title:{en:'Volume Verification',no:'Volumverifisering'}, body:{en:'Collect output over fixed time; calculate error %.', no:'Samle volum over gitt tid; beregn feilprosent.'}},
    { title:{en:'Occlusion Test',no:'Okklusjonstest'}, body:{en:'Clamp line and measure alarm latency.', no:'Klem slangen og mål alarmforsinkelse.'}},
    { title:{en:'Battery Test',no:'Batteritest'}, body:{en:'If permitted, run briefly on battery, note indicators.', no:'Hvis mulig, kjør kort på batteri, noter indikatorer.'}},
    { title:{en:'Reflection',no:'Refleksjon'}, body:{en:'Discuss clinical impact of flow deviations.', no:'Diskuter klinisk effekt av strømsavvik.'}}
  ],
  respirator: [
    { title:{en:'Objective',no:'Mål'}, body:{en:'Explore ventilation modes and patient safety features.', no:'Utforsk ventilasjonsmoduser og sikkerhetsfunksjoner.'}},
    { title:{en:'Pre-Use Check',no:'Forbrukssjekk'}, body:{en:'Run automated test (leaks, valves).', no:'Kjør automatisk test (lekkasjer, ventiler).'}},
    { title:{en:'Mode Comparison',no:'Modus-sammenligning'}, body:{en:'Compare volume vs pressure control waveforms.', no:'Sammenlign volum- og trykkstyrte bølgeformer.'}},
    { title:{en:'Alarm Limits',no:'Alarmgrenser'}, body:{en:'Set appropriate high/low pressure and volume limits.', no:'Sett passende høye/lave trykk- og volumgrenser.'}},
    { title:{en:'Humidification',no:'Fukting'}, body:{en:'Check humidifier function and condensate management.', no:'Kontroller fukter og kondenshåndtering.'}},
    { title:{en:'Reflection',no:'Refleksjon'}, body:{en:'List key safety interlocks observed.', no:'List viktige sikkerhetsinterlocks.'}}
  ],
  ultrasound: [
    { title:{en:'Objective',no:'Mål'}, body:{en:'Understand probe selection and image optimization.', no:'Forstå prober og bildeoptimalisering.'}},
    { title:{en:'Probe Handling',no:'Probehåndtering'}, body:{en:'Apply gel, maintain consistent pressure.', no:'Påfør gel, hold jevnt trykk.'}},
    { title:{en:'Depth & Gain',no:'Dybde & gain'}, body:{en:'Adjust depth and overall gain for region of interest.', no:'Juster dybde og total gain for interesseområde.'}},
    { title:{en:'Focal Zones',no:'Fokalsoner'}, body:{en:'Set focal zone at/just below target structure.', no:'Sett fokalsone ved/under målstruktur.'}},
    { title:{en:'Artifacts',no:'Artefakter'}, body:{en:'Identify reverberation or shadowing.', no:'Identifiser reverberasjon eller skygge.'}},
    { title:{en:'Reflection',no:'Refleksjon'}, body:{en:'Explain artifact mitigation strategy.', no:'Forklar strategi for artefakt-redusering.'}}
  ],
  diathermy: [
    { title:{en:'Objective',no:'Mål'}, body:{en:'Examine monopolar vs bipolar electrosurgery basics.', no:'Undersøk monopolar vs bipolar elektrokirurgi.'}},
    { title:{en:'Plate Placement',no:'Plateplassering'}, body:{en:'Apply return electrode on well-perfused muscle.', no:'Plasser returplate på godt perfundert muskel.'}},
    { title:{en:'Power Setting',no:'Effektinnstilling'}, body:{en:'Select minimal effective power for cut/coag.', no:'Velg laveste effekt som fungerer for kutt/koagulasjon.'}},
    { title:{en:'Smoke Management',no:'Røykhåndtering'}, body:{en:'Demonstrate evacuation for safety.', no:'Vis røykavsug for sikkerhet.'}},
    { title:{en:'Insulation Check',no:'Isolasjonskontroll'}, body:{en:'Inspect instrument insulation for defects.', no:'Inspiser instrumentisolasjon for skader.'}},
    { title:{en:'Reflection',no:'Refleksjon'}, body:{en:'Assess risk controls applied.', no:'Vurdér brukte risikokontroller.'}}
  ]
};
