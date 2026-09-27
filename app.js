/* ============================================================
   SPORT CRM — Application v3
   ============================================================ */

// ============================================================
// 1. DONNÉES
// ============================================================

// Programme PPL : 6 séances différentes par semaine (Push 1, Pull 1, Legs 1, Push 2, Pull 2, Legs 2),
// et une semaine A / une semaine B aux exercices différents, qui alternent d'après la date.
// Clés de séance : 'A1', 'A2', 'B1', 'B2' (lettre = semaine, chiffre = 1re ou 2e séance du groupe).
// Chaque exercice : { name, img (illustration dans img/exos/), sets, reps (plage cible), rest }.
const WORKOUT_PLAN = {
  push: {
    label: 'Push', short: 'PU', color: '#0A0A0A',
    focus: { A1: 'Pecs lourds', A2: 'Épaules et haut des pecs', B1: 'Pecs aux haltères', B2: 'Guidé et poulies' },
    A1: [
      { name: 'Développé couché barre', img: 'dc-barre', sets: 4, reps: '5-8', rest: '2-3 min' },
      { name: 'Développé incliné haltères', img: 'di-halteres', sets: 3, reps: '8-12', rest: '2 min' },
      { name: 'Développé épaules haltères', img: 'de-halteres', sets: 3, reps: '8-12', rest: '2 min' },
      { name: 'Écarté poulie vis-à-vis', img: 'ecarte-vis-a-vis', sets: 3, reps: '12-15', rest: '60-90 s' },
      { name: 'Élévations latérales haltères', img: 'lat-halteres', sets: 4, reps: '12-20', rest: '60-90 s' },
      { name: 'Extension triceps poulie haute corde', img: 'tri-corde', sets: 3, reps: '10-15', rest: '60-90 s' }
    ],
    A2: [
      { name: 'Développé épaules machine', img: 'de-machine', sets: 4, reps: '6-10', rest: '2-3 min' },
      { name: 'Développé incliné machine convergente', img: 'di-machine', sets: 3, reps: '8-12', rest: '2 min' },
      { name: 'Dips pectoraux', img: 'dips', sets: 3, reps: '8-12', rest: '2 min' },
      { name: 'Élévations latérales poulie', img: 'lat-poulie', sets: 4, reps: '12-20', rest: '60-90 s' },
      { name: 'Écarté unilatéral poulie', img: 'ecarte-unilateral', sets: 3, reps: '12-15', rest: '60-90 s' },
      { name: 'Barre au front', img: 'barre-front', sets: 3, reps: '8-12', rest: '90 s' },
      { name: 'Extension triceps nuque poulie basse', img: 'tri-nuque-poulie', sets: 2, reps: '12-15', rest: '60 s' }
    ],
    B1: [
      { name: 'Développé couché haltères', img: 'dc-halteres', sets: 4, reps: '6-10', rest: '2-3 min' },
      { name: 'Développé incliné barre', img: 'di-barre', sets: 3, reps: '6-10', rest: '2-3 min' },
      { name: 'Développé Arnold', img: 'arnold', sets: 3, reps: '8-12', rest: '2 min' },
      { name: 'Écarté couché haltères', img: 'ecarte-halteres', sets: 3, reps: '10-15', rest: '60-90 s' },
      { name: 'Élévations latérales machine', img: 'lat-machine', sets: 4, reps: '12-20', rest: '60-90 s' },
      { name: 'Extension triceps poulie haute', img: 'tri-poulie', sets: 3, reps: '10-15', rest: '60-90 s' }
    ],
    B2: [
      { name: 'Développé couché Smith machine', img: 'dc-smith', sets: 4, reps: '6-10', rest: '2-3 min' },
      { name: 'Développé épaules Smith machine', img: 'de-smith', sets: 3, reps: '8-12', rest: '2 min' },
      { name: 'Développé incliné poulie', img: 'di-poulie', sets: 3, reps: '10-12', rest: '90 s' },
      { name: 'Écarté poulie vis-à-vis', img: 'ecarte-vis-a-vis', sets: 3, reps: '12-15', rest: '60-90 s' },
      { name: 'Élévations latérales buste incliné', img: 'lat-incline', sets: 3, reps: '12-15', rest: '60-90 s' },
      { name: 'Extension triceps assis haltère', img: 'tri-assis', sets: 3, reps: '10-12', rest: '90 s' },
      { name: 'Tate press', img: 'tate-press', sets: 2, reps: '10-12', rest: '60 s' }
    ]
  },
  pull: {
    label: 'Pull', short: 'PL', color: '#6E6E6E',
    focus: { A1: 'Largeur du dos', A2: 'Épaisseur du dos', B1: 'Tirages et rowings', B2: 'Prises variées' },
    A1: [
      { name: 'Tractions', img: 'tractions', sets: 4, reps: '6-10', rest: '2-3 min' },
      { name: 'Rowing barre', img: 'rowing-barre', sets: 4, reps: '6-10', rest: '2-3 min' },
      { name: 'Tirage horizontal poulie', img: 'tirage-horizontal', sets: 3, reps: '10-12', rest: '90 s' },
      { name: 'Oiseau à la poulie', img: 'oiseau-poulie', sets: 3, reps: '12-15', rest: '60-90 s' },
      { name: 'Curl barre', img: 'curl-barre', sets: 3, reps: '8-12', rest: '60-90 s' },
      { name: 'Curl marteau haltères', img: 'curl-marteau', sets: 3, reps: '10-12', rest: '60-90 s' },
      { name: 'Relevé de genoux suspendu', img: 'releve-genoux', sets: 3, reps: '10-15', rest: '60 s' }
    ],
    A2: [
      { name: 'Tirage vertical prise serrée', img: 'tv-serre', sets: 4, reps: '8-12', rest: '2 min' },
      { name: 'Rowing machine Hammer Strength', img: 'rowing-hammer', sets: 4, reps: '8-12', rest: '2 min' },
      { name: 'Pull-over poulie', img: 'pullover-poulie', sets: 3, reps: '12-15', rest: '60-90 s' },
      { name: 'Face pull', img: 'face-pull', sets: 3, reps: '15-20', rest: '60 s' },
      { name: 'Curl haltères banc incliné', img: 'curl-incline', sets: 3, reps: '8-12', rest: '60-90 s' },
      { name: 'Curl pupitre barre EZ', img: 'curl-pupitre', sets: 2, reps: '10-12', rest: '60-90 s' }
    ],
    B1: [
      { name: 'Tirage vertical prise large', img: 'tv-large', sets: 4, reps: '8-12', rest: '2 min' },
      { name: 'Rowing haltères banc incliné', img: 'rowing-banc-incline', sets: 4, reps: '8-12', rest: '2 min' },
      { name: 'Rowing machine prise pronation', img: 'rowing-pronation', sets: 3, reps: '10-12', rest: '90 s' },
      { name: 'Élévation en Y à la poulie', img: 'y-raise', sets: 3, reps: '12-15', rest: '60 s' },
      { name: 'Curl haltères alterné', img: 'curl-alterne', sets: 3, reps: '8-12', rest: '60-90 s' },
      { name: 'Curl poulie basse', img: 'curl-poulie', sets: 2, reps: '12-15', rest: '60 s' },
      { name: 'Sit-up décliné', img: 'situp-decline', sets: 3, reps: '10-15', rest: '60 s' }
    ],
    B2: [
      { name: 'Tirage vertical prise inversée', img: 'tv-inverse', sets: 4, reps: '6-10', rest: '2 min' },
      { name: 'Tirage horizontal prise large', img: 'th-large', sets: 4, reps: '8-12', rest: '2 min' },
      { name: 'Tirage vertical banc incliné', img: 'tv-incline', sets: 3, reps: '10-12', rest: '90 s' },
      { name: 'Oiseau à la poulie', img: 'oiseau-poulie', sets: 3, reps: '12-15', rest: '60-90 s' },
      { name: 'Curl marteau au pupitre', img: 'curl-marteau-pupitre', sets: 3, reps: '10-12', rest: '60-90 s' },
      { name: 'Curl concentré', img: 'curl-concentre', sets: 2, reps: '12-15', rest: '60 s' }
    ]
  },
  legs: {
    label: 'Legs', short: 'LE', color: '#ABABAB',
    focus: { A1: 'Quadriceps', A2: 'Ischios et fessiers', B1: 'Quadriceps guidés', B2: 'Chaîne postérieure' },
    A1: [
      { name: 'Squat barre', img: 'squat-barre', sets: 4, reps: '5-8', rest: '2-3 min' },
      { name: 'Presse à cuisses 45°', img: 'presse-45', sets: 3, reps: '8-12', rest: '2 min' },
      { name: 'Leg extension', img: 'leg-extension', sets: 3, reps: '12-15', rest: '60-90 s' },
      { name: 'Leg curl assis', img: 'leg-curl-assis', sets: 4, reps: '10-15', rest: '60-90 s' },
      { name: 'Hip thrust machine', img: 'hip-thrust', sets: 3, reps: '8-12', rest: '90 s' },
      { name: 'Mollets debout barre', img: 'mollets-debout', sets: 4, reps: '10-15', rest: '60 s' },
      { name: 'Crunch machine', img: 'crunch-machine', sets: 3, reps: '10-15', rest: '60 s' }
    ],
    A2: [
      { name: 'Hack squat', img: 'hack-squat', sets: 4, reps: '6-10', rest: '2-3 min' },
      { name: 'Soulevé de terre roumain', img: 'sdt-roumain', sets: 3, reps: '8-10', rest: '2-3 min' },
      { name: 'Leg curl allongé', img: 'leg-curl-allonge', sets: 3, reps: '10-12', rest: '60-90 s' },
      { name: 'Leg extension', img: 'leg-extension', sets: 3, reps: '12-15', rest: '60-90 s' },
      { name: 'Extension de hanche machine', img: 'ext-hanche', sets: 3, reps: '12-15', rest: '60-90 s' },
      { name: 'Mollets presse assis', img: 'mollets-assis-presse', sets: 4, reps: '12-20', rest: '60 s' },
      { name: 'Relevé de jambes chaise romaine', img: 'releve-chaise', sets: 3, reps: '10-15', rest: '60 s' }
    ],
    B1: [
      { name: 'Squat Smith machine', img: 'squat-smith', sets: 4, reps: '6-10', rest: '2-3 min' },
      { name: 'Presse à cuisses 45°', img: 'presse-45', sets: 3, reps: '10-12', rest: '2 min' },
      { name: 'Leg extension', img: 'leg-extension', sets: 3, reps: '12-15', rest: '60-90 s' },
      { name: 'Leg curl assis', img: 'leg-curl-assis', sets: 4, reps: '10-15', rest: '60-90 s' },
      { name: 'Hip thrust machine', img: 'hip-thrust', sets: 4, reps: '8-12', rest: '90 s' },
      { name: 'Mollets presse 45°', img: 'mollets-presse', sets: 4, reps: '10-15', rest: '60 s' },
      { name: 'Crunch au sol', img: 'crunch-sol', sets: 3, reps: '15-20', rest: '60 s' }
    ],
    B2: [
      { name: 'Soulevé de terre', img: 'sdt', sets: 3, reps: '4-6', rest: '3 min' },
      { name: 'Presse à cuisses verticale', img: 'presse-verticale', sets: 3, reps: '10-12', rest: '2 min' },
      { name: 'Leg curl allongé', img: 'leg-curl-allonge', sets: 4, reps: '8-12', rest: '60-90 s' },
      { name: 'Leg extension', img: 'leg-extension', sets: 3, reps: '12-15', rest: '60-90 s' },
      { name: 'Extension de hanche machine', img: 'ext-hanche', sets: 3, reps: '12-15', rest: '60-90 s' },
      { name: 'Mollets assis barre', img: 'mollets-assis-barre', sets: 4, reps: '12-20', rest: '60 s' },
      { name: 'Relevé de genoux suspendu', img: 'releve-genoux', sets: 3, reps: '10-15', rest: '60 s' }
    ]
  }
};

// Repos conseillé en secondes (borne basse) : '2-3 min' → 120, '90 s' → 90
function restSeconds(rest) {
  const n = parseInt(String(rest).match(/\d+/)?.[0] || '90', 10);
  return /min/.test(rest) ? n * 60 : n;
}

const MUSCLE_KEYS = ['push', 'pull', 'legs'];
// Rotation continue des 6 séances (Push A → Pull A → Legs A → Push B → Pull B → Legs B → …)
// Semaine en cours : 6 séances à la suite. La lettre A/B se déduit de la date (parité de la semaine).
const WEEK_SLOTS = [['push', 1], ['pull', 1], ['legs', 1], ['push', 2], ['pull', 2], ['legs', 2]];
const SESSION_KEYS = ['A1', 'A2', 'B1', 'B2'];

// Illustrations : nom d'exercice → fichier (img/exos/<slug>.jpg image fixe, .mp4 animation en boucle).
// Anciens noms (programmes précédents) rattachés à l'illustration la plus proche pour l'historique.
const EXO_MEDIA = {
  'Développé couché barre ou Smith': 'dc-barre', 'Développé épaules machine convergente': 'de-machine',
  'Écartés poulie basse': 'ecarte-vis-a-vis', 'Extensions triceps overhead poulie': 'tri-nuque-poulie',
  'Développé militaire barre/machine': 'de-machine', 'Dips lestés/machine': 'dips', 'Pec deck': 'ecarte-vis-a-vis',
  'Barre au front EZ/extensions corde': 'barre-front', 'Tirage vertical neutre/tractions lestées': 'tv-serre',
  'Rowing machine convergente': 'rowing-hammer', 'Pullover poulie haute': 'pullover-poulie', 'Face pulls': 'face-pull',
  'Curl incliné haltères': 'curl-incline', 'SDT roumain/rack pulls': 'sdt-roumain', 'Rowing haltère unilatéral': 'rowing-banc-incline',
  'Curl pupitre machine': 'curl-pupitre', 'Curl marteau haltères assis': 'curl-marteau', 'Squat barre ou pendulum/hack': 'squat-barre',
  'Presse à cuisses': 'presse-45', 'Mollets debout': 'mollets-debout', 'Crunch poulie haute': 'crunch-machine',
  'Hack squat/squat bulgare': 'hack-squat', 'SDT roumain haltères': 'sdt-roumain', 'Mollets assis': 'mollets-assis-presse'
};
MUSCLE_KEYS.forEach(g => SESSION_KEYS.forEach(v => WORKOUT_PLAN[g][v].forEach(ex => { EXO_MEDIA[ex.name] = ex.img; })));
function exoImg(name)   { const s = EXO_MEDIA[name]; return s ? `img/exos/${s}.jpg` : null; }
function exoVideo(name) { const s = EXO_MEDIA[name]; return s ? `img/exos/${s}.mp4` : null; }

// Même exercice sous un ancien nom : sert à retrouver ta dernière perf après le changement de programme
const PREV_ALIASES = {
  'Développé couché barre': ['Développé couché barre ou Smith'],
  'Développé épaules machine': ['Développé épaules machine convergente'],
  'Dips pectoraux': ['Dips lestés/machine'],
  'Barre au front': ['Barre au front EZ/extensions corde'],
  'Rowing machine Hammer Strength': ['Rowing machine convergente'],
  'Pull-over poulie': ['Pullover poulie haute'],
  'Face pull': ['Face pulls'],
  'Curl haltères banc incliné': ['Curl incliné haltères'],
  'Curl marteau haltères': ['Curl marteau haltères assis'],
  'Soulevé de terre roumain': ['SDT roumain/rack pulls'],
  'Squat barre': ['Squat barre ou pendulum/hack'],
  'Presse à cuisses 45°': ['Presse à cuisses'],
  'Hack squat': ['Hack squat/squat bulgare'],
  'Mollets debout barre': ['Mollets debout'],
  'Mollets presse assis': ['Mollets assis']
};

// Anciens groupes (split 5 muscles) — pour que l'historique et les stats des
// séances déjà enregistrées restent lisibles après le passage au PPL.
const LEGACY_GROUPS = {
  bras:    { label: 'Bras',      short: 'BR', color: '#0A0A0A' },
  pec:     { label: 'Pectoraux', short: 'PE', color: '#4A4A4A' },
  dos:     { label: 'Dos',       short: 'DO', color: '#6E6E6E' },
  epaules: { label: 'Épaules',   short: 'EP', color: '#8E8E8E' },
  jambes:  { label: 'Jambes',    short: 'JA', color: '#ABABAB' }
};
function groupLabel(k) { return WORKOUT_PLAN[k]?.label || LEGACY_GROUPS[k]?.label || k; }
function groupColor(k) { return WORKOUT_PLAN[k]?.color || LEGACY_GROUPS[k]?.color || '#8E8E93'; }
function groupShort(k) { return WORKOUT_PLAN[k]?.short || LEGACY_GROUPS[k]?.short || (k||'').slice(0,2).toUpperCase(); }
let RUN_GOAL_KM  = 15;
const RUN_SESSIONS = 3;
const CAL_PER_KM   = 65;
const MONTHS_FR    = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc'];
const DAYS_FR      = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
const DAYS_FULL    = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const FEEL_LABELS  = ['Nul','Dur','OK','Bien','Top'];

// ============================================================
// 2. ÉTAT & PERSISTANCE
// ============================================================

let S = {};
const DEFAULTS = { view: 'dashboard', theme: 'light', weekType: 'A', workouts: [], runs: [], rides: [], nutrition: [], weights: [], weightGoal: { kg: 70, date: null }, profile: {}, nutGoal: { cal: 2400, prot: 175, carbs: 250, fat: 80, water: 2500 }, runGoal: 15, journal: {}, prs: {}, hydration: {}, shopping: { checked: {}, weekStart: null } };

function loadState() {
  try { S = { ...DEFAULTS, ...JSON.parse(localStorage.getItem('sport-crm-v2') || '{}') }; }
  catch { S = { ...DEFAULTS }; }
  RUN_GOAL_KM  = S.runGoal || 15;
  NUTRI_TARGETS = { calories: S.nutGoal?.cal || 2400, protein: S.nutGoal?.prot || 175, carbs: S.nutGoal?.carbs || 250, fat: S.nutGoal?.fat || 80, water: S.nutGoal?.water || 2500 };
}
function save() {
  S._updatedAt = Date.now();            // horodatage : sert d'arbitre anti-écrasement au pull cloud
  localStorage.setItem('sport-crm-v2', JSON.stringify(S));
  schedulePush();
}

// ============================================================
// 2c. SAUVEGARDES DE SECOURS (sur le téléphone, IndexedDB)
// ============================================================
// 10 copies complètes des données, prises après chaque séance et une fois par jour.
// Si iOS vide le stockage de l'app, la plus récente est restaurée automatiquement au démarrage.

const BACKUP_KEEP = 10;
function _idb() {
  return new Promise((ok, ko) => {
    if (!('indexedDB' in window)) return ko(new Error('indexedDB absent'));
    const rq = indexedDB.open('tempo-backups', 1);
    rq.onupgradeneeded = () => rq.result.createObjectStore('snaps', { keyPath: 'ts' });
    rq.onsuccess = () => ok(rq.result);
    rq.onerror = () => ko(rq.error);
  });
}
async function listBackups() {
  try {
    const dbx = await _idb();
    return await new Promise(ok => {
      const rq = dbx.transaction('snaps').objectStore('snaps').getAll();
      rq.onsuccess = () => ok((rq.result || []).sort((a, b) => b.ts - a.ts));
      rq.onerror = () => ok([]);
    });
  } catch { return []; }
}
async function saveBackup(reason = 'auto') {
  try {
    const data = JSON.parse(JSON.stringify(S)); delete data.view;
    const dbx = await _idb();
    const tx = dbx.transaction('snaps', 'readwrite');
    tx.objectStore('snaps').put({ ts: Date.now(), reason, workouts: (S.workouts || []).length, data });
    await new Promise(ok => { tx.oncomplete = ok; tx.onerror = ok; });
    const all = await listBackups();
    if (all.length > BACKUP_KEEP) {
      const tx2 = dbx.transaction('snaps', 'readwrite');
      all.slice(BACKUP_KEEP).forEach(b => tx2.objectStore('snaps').delete(b.ts));
    }
    localStorage.setItem('tempo-last-backup', String(Date.now()));
  } catch (e) { console.warn('[Sauvegarde]', e); }
}
function restoreData(data) {
  const view = S.view;
  S = { ...DEFAULTS, ...data, view, _updatedAt: Date.now() };
  save();
  navigate(S.view || 'dashboard');
}
async function restoreBackup(ts) {
  const b = (await listBackups()).find(x => x.ts === ts);
  if (!b) return;
  if (!confirm(`Restaurer la sauvegarde du ${new Date(ts).toLocaleString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })} (${b.workouts} séances) ? Tes données actuelles seront remplacées.`)) return;
  await saveBackup('avant restauration');
  restoreData(b.data);
  closeModal();
  showToast('Sauvegarde restaurée ✓');
}
async function showBackupsModal() {
  const all = await listBackups();
  showModal(`
    <div class="modal-head"><div><div class="modal-title">Sauvegardes de secours</div></div><button class="modal-close" onclick="closeModal()" aria-label="Fermer">×</button></div>
    <p class="t2" style="font-size:14px;line-height:1.5;margin-bottom:14px">Copies de tes données gardées sur ce téléphone, après chaque séance et une fois par jour.</p>
    ${all.length ? `<div class="backup-list">${all.map(b => `
      <div class="backup-row">
        <div><b>${new Date(b.ts).toLocaleString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</b><span>${b.workouts} séances · ${b.reason}</span></div>
        <button class="btn btn-ghost btn-sm btn-inline" onclick="restoreBackup(${b.ts})">Restaurer</button>
      </div>`).join('')}</div>` : '<p class="t3">Aucune sauvegarde pour l’instant.</p>'}
    <button class="btn btn-primary" style="margin-top:14px" onclick="saveBackup('manuelle').then(showBackupsModal)">Sauvegarder maintenant</button>
  `);
}
// Au démarrage : stockage persistant, restauration si les données ont disparu, copie quotidienne
async function initBackups() {
  try { await navigator.storage?.persist?.(); } catch {}
  const all = await listBackups();
  const latest = all[0];
  if (latest && !(S.workouts || []).length && latest.workouts > 0) {
    restoreData(latest.data);
    showToast(`Données restaurées depuis la sauvegarde du téléphone (${latest.workouts} séances)`);
    return;
  }
  const last = parseInt(localStorage.getItem('tempo-last-backup') || '0', 10);
  if ((S.workouts || []).length && Date.now() - last > 20 * 3600 * 1000) saveBackup('quotidienne');
}

// ============================================================
// 2b. FIREBASE CLOUD SYNC — Google Auth
// ============================================================

let db          = null;
let fbAuth      = null;
let currentUser = null;
let _syncTimer  = null;
let _pendingPush = false;   // true tant qu'une modif locale n'a pas été poussée au cloud

async function initFirebase() {
  try {
    if (typeof firebase === 'undefined' || typeof FIREBASE_CONFIG === 'undefined') return;
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    db     = firebase.firestore();
    fbAuth = firebase.auth();
    // Attendre que la persistance LOCAL soit active avant tout
    await fbAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    db.enablePersistence({ synchronizeTabs: true }).catch(() => {});

    // Écoute les changements de connexion
    fbAuth.onAuthStateChanged(user => {
      currentUser = user;
      syncStatus = user ? 'synced' : 'off';
      _updateSyncBtn();
      if (user) pullFromCloud();
      else if (S.view === 'dashboard') renderDashboard();
    });
    // Retour d'une connexion par redirection (repli iPhone)
    fbAuth.getRedirectResult().then(r => { if (r?.user) onSignedIn(r.user); }).catch(e => { if (e?.code) showToast('Connexion impossible : ' + e.code); });
  } catch(e) { console.warn('[Sync] Firebase init:', e); }
}

function _syncRef() {
  return (db && currentUser) ? db.collection('users').doc(currentUser.uid) : null;
}

function _updateSyncBtn() {
  const av = document.getElementById('av-btn');
  if (av) av.outerHTML = avatarBtn();
  const chip = document.getElementById('sync-chip');
  if (chip) chip.outerHTML = syncChip();
  if (currentUser) document.querySelector('.sync-banner')?.remove();
  const btn = document.getElementById('sync-btn');
  if (!btn) return;
  if (currentUser?.photoURL) {
    btn.innerHTML = `<img src="${currentUser.photoURL}" style="width:26px;height:26px;border-radius:50%;object-fit:cover;display:block">`;
    btn.title = currentUser.displayName || currentUser.email;
    btn.dataset.status = 'signed-in';
  } else {
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`;
    btn.title = 'Connexion cloud';
    btn.dataset.status = 'idle';
  }
}

// État de la synchro cloud : 'off' (pas connecté) · 'syncing' · 'synced' · 'pending' · 'offline'
let syncStatus = 'off';
function _setSyncIcon(status) {
  syncStatus = currentUser ? status : 'off';
  const chip = document.getElementById('sync-chip');
  if (chip) chip.outerHTML = syncChip();
}
function syncChip() {
  if (!currentUser) return '';
  const st = _pendingPush && syncStatus === 'synced' ? 'pending' : syncStatus;
  const label = { synced: 'Synchronisé', syncing: 'Synchronisation…', pending: 'En attente de synchro', offline: 'Hors ligne · sauvegardé sur le téléphone' }[st] || 'Synchronisé';
  return `<button class="sync-chip st-${st}" id="sync-chip" onclick="showSyncModal()" aria-label="${label}" title="${label}">${ICON_CLOUD}<i></i></button>`;
}
// Encart d'accueil tant que la sauvegarde cloud n'est pas active
function syncBanner() {
  if (currentUser || !db && typeof firebase === 'undefined') return currentUser ? '' : `
    <div class="sync-banner"><div><b>Tes séances ne sont que sur ce téléphone</b><span>Active la sauvegarde cloud pour ne jamais les perdre.</span></div></div>`;
  return `
    <button class="sync-banner" onclick="signInWithGoogle()">
      <div><b>Tes séances ne sont que sur ce téléphone</b><span>Active la sauvegarde cloud (compte Google) pour ne jamais les perdre.</span></div>
      <span class="sync-banner-btn">Activer</span>
    </button>`;
}

function schedulePush() {
  _pendingPush = true;
  clearTimeout(_syncTimer);
  _syncTimer = setTimeout(pushToCloud, 2000);
}

// Pousse immédiatement s'il reste une modif locale en attente (fin de séance, mise en arrière-plan).
function flushPush() { if (_pendingPush) pushToCloud(); }

async function pushToCloud() {
  clearTimeout(_syncTimer); _pendingPush = false;
  const ref = _syncRef(); if (!ref) return;
  _setSyncIcon('syncing');
  try {
    const data = { ...S, _syncAt: firebase.firestore.Timestamp.now() };
    delete data.view;
    await ref.set(data);
    _setSyncIcon('synced');
  } catch(e) { _pendingPush = true; _setSyncIcon('offline'); }  // échec → on garde le flag pour réessayer
}

async function pullFromCloud() {
  const ref = _syncRef(); if (!ref) return;
  _setSyncIcon('syncing');
  try {
    const doc = await ref.get();
    if (doc.exists) {
      const remote = doc.data();
      // Arbitrage anti-perte : si le local est plus récent que le cloud (séance pas encore poussée),
      // on NE remplace PAS le local — on pousse le local vers le cloud à la place.
      const localTs  = S._updatedAt || 0;
      const remoteTs = remote._updatedAt || 0;
      if (remoteTs < localTs) {
        await pushToCloud();
        _setSyncIcon('synced');
        return;
      }
      const view = S.view; const theme = S.theme;
      delete remote._syncAt;
      S = { ...DEFAULTS, ...remote, view, theme };
      localStorage.setItem('sport-crm-v2', JSON.stringify(S));
      RUN_GOAL_KM   = S.runGoal || 15;
      NUTRI_TARGETS = { calories: S.nutGoal?.cal || 2400, protein: S.nutGoal?.prot || 175, carbs: S.nutGoal?.carbs || 250, fat: S.nutGoal?.fat || 80, water: S.nutGoal?.water || 2500 };
      applyOneTimeFixes();
      _setSyncIcon('synced');
      navigate(S.view || 'dashboard');
      showToast('Données synchronisées ✓');
    } else {
      // Aucune donnée cloud → pousse les données locales
      await pushToCloud();
      showToast('Données sauvegardées dans le cloud ☁');
    }
  } catch(e) { _setSyncIcon('offline'); showToast('Hors ligne — données locales utilisées'); }
}

function refreshApp() {
  if (currentUser) {
    // Connecté → pull cloud + reload
    pullFromCloud();
  } else {
    // Non connecté → simple reload
    window.location.reload(true);
  }
}

async function signInWithGoogle() {
  if (!fbAuth) { showToast('Firebase non chargé — recharge l\'app'); return; }
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    showToast('Connexion Google…');
    const result = await fbAuth.signInWithPopup(provider);
    if (result.user) await onSignedIn(result.user);
  } catch(e) {
    if (e.code === 'auth/popup-closed-by-user' || e.code === 'auth/cancelled-popup-request') return;
    // Sur iPhone, l'app installée bloque souvent la fenêtre de connexion : on passe par une redirection
    if (['auth/popup-blocked', 'auth/operation-not-supported-in-this-environment', 'auth/web-storage-unsupported'].includes(e.code)) {
      try { saveWkDraft(); flushPush(); await fbAuth.signInWithRedirect(provider); return; } catch (e2) { e = e2; }
    }
    showToast('Connexion impossible : ' + (e.code || e.message) + ' · réessaie depuis Safari');
  }
}
async function onSignedIn(user) {
  currentUser = user;
  _updateSyncBtn();
  closeModal();
  showToast('Sauvegarde cloud activée ✓');
  await pullFromCloud();
  navigate(S.view || 'dashboard');
}

async function signOutUser() {
  if (!fbAuth) return;
  await fbAuth.signOut();
  currentUser = null;
  _updateSyncBtn();
  closeModal();
  showToast('Déconnecté');
}

function showSyncModal() {
  showModal(`
    <div class="modal-head">
      <div>
        <div class="t3">CLOUD SYNC</div>
        <div class="modal-title">Synchronisation</div>
      </div>
      <button class="modal-close" onclick="closeModal()">×</button>
    </div>
    ${currentUser ? `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;padding:14px;background:var(--surface2);border-radius:14px">
        ${currentUser.photoURL ? `<img src="${currentUser.photoURL}" style="width:44px;height:44px;border-radius:50%;flex-shrink:0">` : ''}
        <div>
          <div style="font-size:15px;font-weight:600;color:var(--t1)">${currentUser.displayName || 'Utilisateur'}</div>
          <div style="font-size:11px;color:var(--t3);margin-top:2px">${currentUser.email}</div>
        </div>
      </div>
      <button class="btn btn-ghost btn-sm" style="margin-bottom:8px;width:100%" onclick="pullFromCloud();closeModal()">⬇ Récupérer depuis le cloud</button>
      <button class="btn btn-ghost btn-sm" style="margin-bottom:8px;width:100%" onclick="pushToCloud();closeModal()">⬆ Forcer la sauvegarde</button>
      <div class="divider mt-12"></div>
      <button class="btn btn-danger btn-sm" style="margin-top:14px;width:100%" onclick="signOutUser()">Se déconnecter</button>
    ` : `
      <p class="t3" style="font-size:13px;line-height:1.7;margin-bottom:20px">
        Connecte-toi avec Google pour sauvegarder tes données dans le cloud et les retrouver sur n'importe quel appareil — même si tu réinstalles l'app.
      </p>
      <button class="btn btn-primary" style="width:100%;display:flex;align-items:center;justify-content:center;gap:10px" onclick="signInWithGoogle()">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continuer avec Google
      </button>
    `}
  `);
}

// ============================================================
// 3. UTILITAIRES
// ============================================================

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }

function getWeekKey(date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
  d.setHours(0,0,0,0);
  return localDateStr(d);
}

function localDateStr(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function todayStr()    { return localDateStr(new Date()); }
function thisWeekKey() { return getWeekKey(new Date()); }
function prevWeekKey() { const d = new Date(); d.setDate(d.getDate()-7); return getWeekKey(d); }

// Index de semaine (nb de semaines depuis l'epoch) à partir d'une weekKey (lundi)
function weekIndex(weekKey) { return Math.round(new Date(weekKey + 'T00:00:00').getTime() / 604800000); }

// Type de semaine A/B déduit automatiquement de la date du jour.
// On se cale sur l'alternance de l'historique pour rester cohérent ;
// à défaut, parité de l'index de semaine.
function autoWeekType() {
  const cur = weekIndex(thisWeekKey());
  const last = (S.workouts||[]).filter(w => w.weekKey && w.weekType).sort((a,b) => b.date.localeCompare(a.date))[0];
  if (last) {
    const diff = cur - weekIndex(last.weekKey);
    return (((diff % 2) + 2) % 2 === 0) ? last.weekType : (last.weekType === 'A' ? 'B' : 'A');
  }
  return (cur % 2 === 0) ? 'A' : 'B';
}

function formatDate(ds) {
  const d = new Date(ds + 'T12:00:00');
  return `${DAYS_FR[d.getDay()]} ${d.getDate()} ${MONTHS_FR[d.getMonth()]}`;
}
function formatDur(s)  { const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),ss=s%60; return h>0?`${h}h${String(m).padStart(2,'0')}`:`${m}:${String(ss).padStart(2,'0')}`; }
function parseDur(str) { const p=str.trim().split(':').map(Number); return p.length===3?p[0]*3600+p[1]*60+p[2]:p[0]*60+(p[1]||0); }
function fmtPace(s)    { if(!s||s<=0) return '--:--'; return `${Math.floor(s/60)}:${String(Math.round(s%60)).padStart(2,'0')}`; }
function fmtVol(v)     { return Math.round(v).toLocaleString('fr-FR'); }

function calcSessionVol(exs) {
  return exs.reduce((t,ex) => t + ex.sets.reduce((s,set) => s+(parseFloat(set.weight)||0)*(parseInt(set.reps)||0), 0), 0);
}

function getLastSession(mg, wt) {
  return S.workouts.filter(w => w.muscleGroup===mg && w.weekType===wt).sort((a,b) => b.date.localeCompare(a.date))[0] || null;
}

// Lettre de la semaine (A/B) d'après la date : parité du numéro de semaine, sans choix manuel.
function weekLetter(date = new Date()) { return weekIndex(getWeekKey(date)) % 2 === 0 ? 'A' : 'B'; }
// Les 6 séances de la semaine, dans l'ordre : [['push','A1'], ['pull','A1'], …, ['legs','A2']]
function weekSessions(letter = weekLetter()) { return WEEK_SLOTS.map(([g, n]) => [g, letter + n]); }
function doneThisWeek() {
  const wk = thisWeekKey();
  return S.workouts.filter(w => w.weekKey === wk && MUSCLE_KEYS.includes(w.muscleGroup));
}
function isSessionDone(g, v) { return doneThisWeek().some(w => w.muscleGroup === g && w.weekType === v); }
function weekDoneCount() { return weekSessions().filter(([g, v]) => isSessionDone(g, v)).length; }

// Prochaine séance : celle qui suit la dernière faite cette semaine (une séance sautée ne décale rien).
// Semaine bouclée : on repart de la 1re séance. Renvoie [groupe, séance] (ex. ['pull', 'B1']).
function nextPPLSession() {
  const seq = weekSessions();
  const done = doneThisWeek().filter(w => seq.some(([g, v]) => g === w.muscleGroup && v === w.weekType));
  if (!done.length) return seq[0];
  const last = [...done].sort((a, b) => a.date.localeCompare(b.date)).at(-1);
  const idx = seq.findIndex(([g, v]) => g === last.muscleGroup && v === last.weekType);
  for (let k = 1; k <= seq.length; k++) {
    const cand = seq[(idx + k) % seq.length];
    if (!isSessionDone(...cand)) return cand;
  }
  return seq[0];
}

// Séance d'un groupe à faire cette semaine (sa 1re si pas encore faite, sinon sa 2e)
function variantForGroup(g) {
  const L = weekLetter();
  return isSessionDone(g, L + '1') && !isSessionDone(g, L + '2') ? L + '2' : L + '1';
}
// Rang de la séance dans la semaine (1 à 6)
function sessionIndex(g, v) { return WEEK_SLOTS.findIndex(([gg, n]) => gg === g && `${n}` === `${v}`.slice(1)) + 1; }
function sessionTitle(g, v) { return `${WORKOUT_PLAN[g]?.label || groupLabel(g)} ${/^[AB][12]$/.test(v) ? v.slice(1) : (v || '')}`.trim(); }

// Dernière perf connue d'un exercice (par son nom, ancien nom compris), quelle que soit la séance
function lastSetsFor(name) {
  const names = [name, ...(PREV_ALIASES[name] || [])];
  const sorted = [...S.workouts].sort((a, b) => b.date.localeCompare(a.date));
  for (const w of sorted) {
    const ex = (w.exercises || []).find(e => names.includes(e.name));
    if (ex && ex.sets?.some(st => parseFloat(st.weight) > 0)) return ex.sets;
  }
  return [];
}

// Évolution du volume d'une séance vs la précédente du même groupe + semaine A/B.
// Renvoie le % (positif = progression) ou null s'il n'y a pas de séance de référence.
function sessionVolDelta(item) {
  const prev = S.workouts
    .filter(w => w.muscleGroup===item.muscleGroup && w.weekType===item.weekType && w.date < item.date && w.id !== item.id)
    .sort((a,b) => b.date.localeCompare(a.date))[0];
  if (!prev || !prev.totalVolume) return null;
  return (item.totalVolume - prev.totalVolume) / prev.totalVolume * 100;
}
function workoutsThisWeek()   { return S.workouts.filter(w => w.weekKey === thisWeekKey()); }
function workoutsPrevWeek()   { return S.workouts.filter(w => w.weekKey === prevWeekKey()); }
function runsThisWeek()       { return S.runs.filter(r => r.weekKey === thisWeekKey()); }
function totalVol(wk)         { return S.workouts.filter(w=>w.weekKey===wk).reduce((s,w)=>s+w.totalVolume,0); }
function volByMuscle(wk)      { const o={}; MUSCLE_KEYS.forEach(k=>o[k]=0); S.workouts.filter(w=>w.weekKey===wk).forEach(w=>{o[w.muscleGroup]=(o[w.muscleGroup]||0)+w.totalVolume;}); return o; }
function totalKm(wk)          { return S.runs.filter(r=>r.weekKey===wk).reduce((s,r)=>s+r.distance,0); }

function weeksFor(n) {
  const w=[]; for(let i=n-1;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i*7);w.push(getWeekKey(d));} return w;
}
function weekLbl(wk) { const d=new Date(wk+'T12:00:00'); return `${d.getDate()} ${MONTHS_FR[d.getMonth()]}`; }

// ============================================================
// 3b. STREAKS, JOURNAL & NOTIFICATIONS
// ============================================================

function calcStreak(dates) {
  if (!dates.length) return 0;
  const unique = [...new Set(dates)].sort().reverse();
  const today  = todayStr();
  const yest   = (() => { const d = new Date(); d.setDate(d.getDate()-1); return localDateStr(d); })();
  if (unique[0] !== today && unique[0] !== yest) return 0;
  let streak = 0, expected = unique[0];
  for (const d of unique) {
    if (d === expected) {
      streak++;
      const dt = new Date(expected + 'T12:00'); dt.setDate(dt.getDate() - 1);
      expected = localDateStr(dt);
    } else if (d < expected) break;
  }
  return streak;
}

function getStreaks() {
  const wkDates  = (S.workouts || []).map(w => w.date);
  const nutDates = (S.nutrition || []).map(n => n.date);
  const runDates = (S.runs || []).map(r => r.date);
  const allDates = [...new Set([...wkDates, ...nutDates, ...runDates])];
  return {
    workout:   calcStreak(wkDates),
    nutrition: calcStreak(nutDates),
    overall:   calcStreak(allDates)
  };
}

function saveDayNote() {
  const text = document.getElementById('day-note')?.value ?? '';
  if (!S.journal) S.journal = {};
  S.journal[todayStr()] = text;
  save();
}

// ── Notifications ────────────────────────────────────────────
const NOTIF_MORNING = [
  { title: '💪 C\'est l\'heure de s\'entraîner !',   body: 'Une séance aujourd\'hui te rapproche de ton objectif.' },
  { title: '🌅 Bonne journée, champion !',            body: 'Ta séance du jour t\'attend, elle est déjà prête.' },
  { title: '🔥 Le feu ne s\'éteint pas !',            body: 'Garde le rythme : une séance de plus cette semaine.' },
];
const NOTIF_EVENING = [
  { title: '🌙 Bilan de la journée ?',                body: 'Pense à enregistrer ta séance si tu l\'as faite !' },
  { title: '✅ Tu as tout fait aujourd\'hui ?',        body: 'Une séance de plus au compteur. Bien joué !' },
  { title: '💤 Bonne récupération ce soir !',         body: 'Le corps se renforce pendant le repos. Continue !' },
];

function initNotifs() {
  // iOS n'accepte la demande de permission qu'après un geste de l'utilisateur (bouton Activer)
  if (notifPermission() === 'granted') checkAndNotify();
}

function checkAndNotify() {
  const h     = new Date().getHours();
  const today = todayStr();
  const last  = JSON.parse(localStorage.getItem('notif_track') || '{}');
  const rnd   = arr => arr[Math.floor(Math.random() * arr.length)];
  if (h >= 8 && h < 11 && last.morning !== today) {
    const n = rnd(NOTIF_MORNING);
    showLocalNotif(n.title, n.body, 'rappel');
    localStorage.setItem('notif_track', JSON.stringify({ ...last, morning: today }));
  }
  if (h >= 18 && h < 22 && last.evening !== today) {
    const n = rnd(NOTIF_EVENING);
    showLocalNotif(n.title, n.body, 'rappel');
    localStorage.setItem('notif_track', JSON.stringify({ ...last, evening: today }));
  }
}

// ============================================================
// 3b. PROGRESSION & RECORDS
// ============================================================

function estimateOneRM(w, r) {
  if (!w || !r || r <= 0) return 0;
  return Math.round(w * (1 + r / 30));
}

function getBestSet(muscleGroup) {
  let best = null;
  S.workouts.filter(w => w.muscleGroup === muscleGroup).forEach(s => {
    s.exercises.forEach(ex => {
      ex.sets.forEach(set => {
        const orm = estimateOneRM(set.weight, set.reps);
        if (orm > (best?.orm || 0))
          best = { orm, weight: set.weight, reps: set.reps, exercise: ex.name, date: s.date };
      });
    });
  });
  return best;
}

function getMuscleProgression(muscleGroup) {
  const wks    = weeksFor(8);
  const recent = wks.slice(4).reduce((s, wk) => s + (volByMuscle(wk)[muscleGroup] || 0), 0);
  const prev   = wks.slice(0, 4).reduce((s, wk) => s + (volByMuscle(wk)[muscleGroup] || 0), 0);
  return { recent, prev, pct: prev > 0 ? (recent - prev) / prev * 100 : null };
}

function fillFromLast(ei) {
  const prev = wkState.prevExercises[ei];
  if (!prev) return;
  prev.sets.forEach((ps, si) => {
    const we = document.getElementById(`w-${ei}-${si}`);
    const re = document.getElementById(`r-${ei}-${si}`);
    if (we) we.value = ps.weight || '';
    if (re) re.value = ps.reps || '';
  });
  updateVols();
}

function fillAllFromLast() {
  if (!wkState.prevExercises.length) { showToast('Aucune séance précédente'); return; }
  wkState.prevExercises.forEach((_, ei) => fillFromLast(ei));
  showToast('Charges reprises');
}

// ============================================================
// 4. DASHBOARD
// ============================================================

function renderDashboard() {
  const draft   = activeWkDraft();                                  // séance commencée et pas terminée
  const [g, v]  = draft ? [draft.mg, draft.wt] : nextPPLSession();
  const plan    = WORKOUT_PLAN[g][v];
  const nSets   = plan.reduce((n, e) => n + e.sets, 0);
  const mins    = Math.round(plan.reduce((n, e) => n + e.sets * (restSeconds(e.rest) + 40), 0) / 60 / 5) * 5;
  const rot     = sessionIndex(g, v);
  const weekN   = weekDoneCount();
  const todayW  = S.workouts.find(w => w.date === todayStr() && MUSCLE_KEYS.includes(w.muscleGroup));
  const first   = (S.profile?.name || '').trim().split(/\s+/)[0];

  // Nutrition, eau, poids du jour
  const todayNutri = (S.nutrition || []).filter(n => n.date === todayStr());
  const kcal = Math.ceil(todayNutri.reduce((t, n) => t + (n.calories || 0), 0));
  const prot = Math.ceil(todayNutri.reduce((t, n) => t + (n.protein  || 0), 0));
  const water = (S.hydration || {})[todayStr()] || 0;
  const weights = [...(S.weights || [])].sort((a, b) => a.date.localeCompare(b.date));
  const lastW = weights.at(-1), prevW = weights.at(-2);
  const pct = (a, b) => Math.min(a / b * 100, 100).toFixed(1);

  // Semaine (lundi → dimanche)
  const now = new Date(), monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7)); monday.setHours(0, 0, 0, 0);
  const week = ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((lbl, i) => {
    const d = new Date(monday); d.setDate(monday.getDate() + i);
    const ds = localDateStr(d);
    const active = S.workouts.some(w => w.date === ds) || S.runs.some(r => r.date === ds) || (S.rides || []).some(r => r.date === ds);
    return { lbl, day: d.getDate(), today: ds === todayStr(), active };
  });
  const wtdone = workoutsThisWeek().filter(w => MUSCLE_KEYS.includes(w.muscleGroup)).length;
  const km = totalKm(thisWeekKey());
  const streaks = getStreaks();

  const recent = S.workouts.map(w => ({ ...w, kind: 'w' }))
    .sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  const headline = weekN >= 6
    ? `Semaine bouclée,<br><span>6 séances sur 6.</span>`
    : todayW
      ? `Séance faite,<br><span>prochaine : ${sessionTitle(g, v)}.</span>`
      : `Ta séance du jour,<br><span>${sessionTitle(g, v)}.</span>`;

  document.getElementById('app').innerHTML = `
    <header class="dash-top">
      <div>
        <div class="view-kicker">${dashDateLabel()}</div>
        <div class="dash-hello">Salut${first ? ' ' + first : ''}<span class="hello-q">, prêt ?</span></div>
      </div>
      <div class="dash-top-r">${syncChip()}${avatarBtn()}</div>
    </header>
    ${currentUser ? '' : syncBanner()}

    <h1 class="dash-h1">${headline}</h1>

    <div class="days" aria-label="Cette semaine">
      ${week.map(d => `<div class="day${d.today ? ' on' : ''}${d.active ? ' done' : ''}"><small>${d.lbl}</small><b>${d.day}</b><i></i></div>`).join('')}
    </div>

    <section class="banner">
      <div class="banner-txt">
        <div class="banner-k">${draft ? 'Séance en cours' : `Semaine ${v[0]} · ${rot} sur 6`}</div>
        <div class="banner-n">${sessionTitle(g, v)}</div>
        <div class="banner-m">${WORKOUT_PLAN[g].focus?.[v] || ''}<br>${plan.length} exercices · ${nSets} séries<br>≈ ${mins} min</div>
        <button class="banner-btn" onclick="startSeance()"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12-7.5z"/></svg>${draft ? 'Reprendre' : 'Démarrer'}</button>
      </div>
      <img class="banner-img" src="img/hero/${plan[0].img}.jpg" alt="" decoding="async">
    </section>

    <div class="sec-row"><h2>Corps</h2><button class="sec-link" onclick="navigate('body')">Voir</button></div>
    <div class="stack">
      <button class="lcard" onclick="navigate('body')">
        <span class="th">${ICON_SCALE}</span>
        <span class="lcard-b"><span class="lcard-t">Poids<em>${lastW ? String(lastW.weight).replace('.', ',') + ' kg' : '—'}</em></span>
          <span class="lcard-s">${lastW ? `${formatDate(lastW.date)}${prevW ? ` · ${(lastW.weight - prevW.weight) > 0 ? '+' : ''}${(lastW.weight - prevW.weight).toFixed(1).replace('.', ',')} kg` : ''}` : 'Touche pour te peser'}</span></span>
      </button>
    </div>

    <div class="sec-row"><h2>Cette semaine</h2><button class="sec-link" onclick="navigate('progress')">Progrès</button></div>
    <div class="card week-card">
      <div class="wk-line"><span>Séances · semaine ${weekLetter()}</span><b>${weekN} <small>/ 6</small></b></div>
      <span class="prog"><i style="width:${pct(weekN, 6)}%"></i></span>
      <div class="wk-groups">
        ${weekSessions().map(([k, vv]) => {
          const done = isSessionDone(k, vv);
          return `<span class="pill${done ? ' pill-ink' : ''}">${done ? '✓ ' : ''}${sessionTitle(k, vv)}</span>`;
        }).join('')}
      </div>
      ${streaks.overall > 1 ? `<div class="wk-streak">${streaks.overall} jours actifs d'affilée${streaks.workout > 1 ? ` · ${streaks.workout} séances de suite` : ''}</div>` : ''}
    </div>

    ${recent.length ? `
    <div class="sec-row"><h2>Récent</h2><button class="sec-link" onclick="navigate('history')">Historique</button></div>
    <div class="stack">
      ${recent.map(item => item.kind === 'w' ? `
        <button class="lcard" onclick="openSessionDetail('${item.id}')">
          ${exoThumbHTML(item.exercises?.[0]?.name)}
          <span class="lcard-b"><span class="lcard-t">${sessionTitle(item.muscleGroup, item.weekType)}<em>${fmtVol(item.totalVolume)} kg</em></span>
            <span class="lcard-s">${formatDate(item.date)} · ${item.exercises?.length || 0} exercices${item.duration ? ' · ' + formatDur(item.duration) : ''}</span></span>
        </button>` : `
        <button class="lcard" onclick="openRunDetail('${item.id}')">
          <span class="th">${ICON_RUN}</span>
          <span class="lcard-b"><span class="lcard-t">Course<em>${item.distance.toFixed(1).replace('.', ',')} km</em></span>
            <span class="lcard-s">${formatDate(item.date)} · ${fmtPace(item.pace)}/km · ${formatDur(item.duration)}</span></span>
        </button>`).join('')}
    </div>` : ''}

    <div class="sec-row"><h2>Note du jour</h2></div>
    <div class="card note-card">
      <textarea class="note-inp" id="day-note" placeholder="Ressenti, sommeil, objectifs…" oninput="saveDayNote()">${(S.journal || {})[todayStr()] || ''}</textarea>
    </div>
    <div class="spacer"></div>
  `;
}

function dashDateLabel() {
  const d = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  return d.charAt(0).toUpperCase() + d.slice(1);
}

// Eau depuis l'accueil : ajoute au jour même et reste sur l'accueil
function dashWater(ml) {
  if (!S.hydration) S.hydration = {};
  S.hydration[todayStr()] = Math.max(0, (S.hydration[todayStr()] || 0) + ml);
  save(); haptic([6]); renderDashboard();
}

// Brouillon de séance commencée (au moins une valeur saisie) → { mg, wt } ou null
function activeWkDraft() {
  if (!hasActiveWkDraft()) return null;
  try { const d = JSON.parse(localStorage.getItem(WK_DRAFT_KEY)); return WORKOUT_PLAN[d.mg]?.[d.wt] ? { mg: d.mg, wt: d.wt } : null; }
  catch { return null; }
}

// Accueil → séance : ouvre la séance proposée et lance le chrono
function startSeance() {
  seanceMode = 'muscu';
  wkState.muscleGroup = null;
  navigate('workout');
  if (!wkTimer.startTs) startWkTimer();
  renderRunbar();
}

// ============================================================
// 5. SÉANCE
// ============================================================

let wkState = { muscleGroup: null, weekType: 'A', date: '', prevExercises: [], doneSets: {} };
let wkTimer = { startTs: null, interval: null, running: false };

function startWkTimer() {
  if (!wkTimer.startTs) wkTimer.startTs = Date.now();
  wkTimer.running = true;
  clearInterval(wkTimer.interval);
  wkTimer.interval = setInterval(_tickWkTimer, 1000);
  _tickWkTimer();
  _updateTimerBtn();
}
function _tickWkTimer() {
  const el = document.getElementById('session-timer');
  if (el && wkTimer.startTs) el.textContent = formatDur(Math.floor((Date.now() - wkTimer.startTs) / 1000));
}
function _updateTimerBtn() {
  const btn = document.getElementById('timer-toggle-btn');
  if (btn) btn.classList.toggle('paused', !!wkTimer.startTs && !wkTimer.running);
}
function toggleWkTimer() {
  if (wkTimer.running) { pauseWkTimer(); } else { startWkTimer(); }
}
function pauseWkTimer() {
  clearInterval(wkTimer.interval); wkTimer.interval = null; wkTimer.running = false;
  _updateTimerBtn();
}
function stopWkTimer()  { pauseWkTimer(); wkTimer.startTs = null; }

const WK_DRAFT_KEY = 'wk-draft';
const WK_DRAFT_TTL = 72 * 60 * 60 * 1000; // 72 h : un brouillon oublié n'est plus effacé en silence (on propose de l'enregistrer)

function saveWkDraft() {
  if (!wkState.muscleGroup) return;
  // Formulaire absent (ex. onglet Course affiché) : on n'écrase pas le brouillon avec des champs vides
  if (!document.getElementById('wk-date')) return;
  const mg = wkState.muscleGroup, wt = wkState.weekType;
  const exos = WORKOUT_PLAN[mg][wt];
  const inputs = {};
  exos.forEach((ex, ei) => {
    for (let si = 0; si < ex.sets; si++) {
      const w = document.getElementById(`w-${ei}-${si}`)?.value || '';
      const r = document.getElementById(`r-${ei}-${si}`)?.value || '';
      inputs[`${ei}-${si}`] = { w, r };
    }
  });
  localStorage.setItem(WK_DRAFT_KEY, JSON.stringify({
    mg, wt, date: wkState.date,
    notes: document.getElementById('wk-notes')?.value || '',
    inputs, done: Object.keys(wkState.doneSets || {}).filter(k => wkState.doneSets[k]),
    startTs: wkTimer.startTs || null, _ts: Date.now()
  }));
}

function loadWkDraft(mg, wt) {
  try {
    const raw = localStorage.getItem(WK_DRAFT_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw);
    if (Date.now() - (d._ts || 0) > WK_DRAFT_TTL) { localStorage.removeItem(WK_DRAFT_KEY); return null; }
    return (d.mg === mg && d.wt === wt) ? d : null;
  } catch { return null; }
}

function clearWkDraft() { localStorage.removeItem(WK_DRAFT_KEY); }

// Séance en cours récente (< 4h) avec au moins une valeur saisie :
// sert à rouvrir automatiquement l'onglet Séance après un rechargement iOS.
function hasActiveWkDraft() {
  try {
    const raw = localStorage.getItem(WK_DRAFT_KEY);
    if (!raw) return false;
    const d = JSON.parse(raw);
    if (Date.now() - (d._ts || 0) > 4 * 60 * 60 * 1000) return false;
    return Object.values(d.inputs || {}).some(v => v.w || v.r);
  } catch { return false; }
}

function renderWorkout() {
  // Brouillon d'un ancien programme (séances 'A'/'B') : plus de séance correspondante, on l'écarte
  let draft = (() => { try { const r = localStorage.getItem(WK_DRAFT_KEY); if (!r) return null; const d = JSON.parse(r); return (Date.now() - (d._ts||0) < WK_DRAFT_TTL) ? d : null; } catch { return null; } })();
  if (draft && !WORKOUT_PLAN[draft.mg]?.[draft.wt]) { clearWkDraft(); draft = null; }
  const [nextG, nextV] = nextPPLSession();
  wkState.muscleGroup = wkState.muscleGroup || draft?.mg || nextG;
  // Brouillon de ce groupe : on reprend sa séance (sinon les exos ne correspondraient pas à la saisie).
  // Sinon, la séance de ce groupe prévue cette semaine.
  wkState.weekType = (draft && draft.mg === wkState.muscleGroup) ? draft.wt
                   : (wkState.muscleGroup === nextG ? nextV : variantForGroup(wkState.muscleGroup));
  // Séance reprise depuis un brouillon : on garde SA date (sinon une séance finie le lendemain serait mal datée)
  wkState.date     = (draft && draft.mg === wkState.muscleGroup && draft.wt === wkState.weekType && draft.date) ? draft.date : todayStr();
  // Après un rechargement iOS en pleine séance : le chrono reprend là où il en était
  if (!wkTimer.startTs && draft?.startTs && draft.mg === wkState.muscleGroup && draft.wt === wkState.weekType) {
    wkTimer.startTs = draft.startTs;
    startWkTimer();
  }
  renderWorkoutForm();
}

// Suggestion de charge (double progression) : si à la dernière séance toutes les
// séries ont atteint le HAUT de la plage de reps, on suggère +2,5 kg (haut du corps)
// ou +5 kg (jambes). Renvoie { inc, weight } ou null.
function progressionHint(mg, ex, prevExercise) {
  const sets = prevExercise?.sets || [];
  if (!sets.length) return null;
  const top = parseInt(String(ex.reps).split('-').pop(), 10);
  if (!top) return null;
  const allTop = sets.every(s => (parseFloat(s.weight)||0) > 0 && (parseInt(s.reps)||0) >= top);
  if (!allTop) return null;
  const inc = mg === 'legs' ? 5 : 2.5;
  const baseW = Math.max(...sets.map(s => parseFloat(s.weight)||0));
  return { inc, weight: Math.round((baseW + inc) * 10) / 10 };
}

function renderWorkoutForm() {
  const mg   = wkState.muscleGroup;
  const wt   = wkState.weekType;
  const exos = WORKOUT_PLAN[mg][wt];
  const last = getLastSession(mg, wt);
  const m    = WORKOUT_PLAN[mg];
  wkState.prevExercises = last ? last.exercises : [];
  // Dernière perf de chaque exercice (par nom) : sert à colorer les séries (plus lourd / pareil / moins lourd)
  wkState.prevSets = WORKOUT_PLAN[mg][wt].map(ex => lastSetsFor(ex.name));
  const draft = loadWkDraft(mg, wt);
  // Séries validées du brouillon (anciens brouillons sans cette info : série remplie = faite)
  wkState.doneSets = {};
  if (Array.isArray(draft?.done)) draft.done.forEach(k => { wkState.doneSets[k] = true; });
  else exos.forEach((ex, ei) => {
    for (let si = 0; si < ex.sets; si++) {
      const dv = draft?.inputs?.[`${ei}-${si}`];
      if (dv && parseFloat(dv.w) > 0 && parseInt(dv.r) > 0) wkState.doneSets[`${ei}-${si}`] = true;
    }
  });
  if (wkState.openKey !== mg + wt) { wkState.openKey = mg + wt; wkState.openEx = firstOpenEx(exos); }
  const rot = sessionIndex(mg, wt);

  document.getElementById('app').innerHTML = `
    <header class="view-head">
      <div class="view-head-l">
        <button class="icon-btn" onclick="leaveSeance()" aria-label="Retour à l'accueil">${ICON_BACK}</button>
        <div class="wk-titles"><div class="view-kicker">Semaine ${wt[0]} · séance ${rot} sur 6</div><h1 class="view-title">${sessionTitle(mg, wt)}</h1>${m.focus?.[wt] ? `<div class="wk-focus">${m.focus[wt]}</div>` : ''}</div>
      </div>
    </header>
    ${chipRow(SEANCE_CHIPS, mg, 'setSeanceGroup')}
    <div class="wk-meta">
      <label class="date-chip">${ICON_CAL}<input type="date" id="wk-date" value="${wkState.date}" max="${todayStr()}" aria-label="Date de la séance" onchange="wkState.date=this.value||todayStr();saveWkDraft()"></label>
      <span class="wk-ref">${last ? `Réf. ${fmtVol(last.totalVolume)} kg <span id="session-delta"></span>` : 'Première fois'}</span>
    </div>
    ${notifPermission() === 'default' && !localStorage.getItem('notif-hint-off') ? `
    <div class="notif-hint" id="notif-hint">
      <span>Sois prévenu si tu quittes l'app sans enregistrer ta séance.</span>
      <button class="btn btn-primary btn-sm btn-inline" onclick="askNotifPermission()">Activer</button>
      <button class="notif-hint-x" onclick="localStorage.setItem('notif-hint-off','1');document.getElementById('notif-hint')?.remove()" aria-label="Masquer">×</button>
    </div>` : ''}
    <div class="wk-progress" id="wk-progress" role="progressbar" aria-label="Progression de la séance" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
      <div class="wk-progress-top"><span id="wk-prog-s">0 série sur ${exos.reduce((t, e) => t + e.sets, 0)}</span><b id="wk-pct">0 %</b></div>
      <span class="prog wk-prog"><i id="wk-prog-fill" style="width:0%"></i></span>
    </div>
    <div class="ex-list">${exos.map((ex, ei) => exCard(ex, ei, mg, last, draft)).join('')}</div>
    <div class="spacer"></div>
  `;
  mountRunbar();
  updateVols();
  mountExMedia(wkState.openEx);
}

// Animation de l'exercice ouvert (une seule vidéo à la fois : légère pour le téléphone)
function mountExMedia(ei) {
  document.querySelectorAll('.ex-media').forEach(el => { if (el.id !== `ex-media-${ei}`) el.innerHTML = ''; });
  if (ei == null) return;
  const el = document.getElementById(`ex-media-${ei}`);
  const name = curExos()[ei]?.name;
  const vid = exoVideo(name);
  if (!el || !vid || el.firstChild) return;
  el.innerHTML = `<video src="${vid}" poster="${exoImg(name)}" autoplay muted loop playsinline preload="auto" aria-label="Démonstration : ${name.replace(/"/g, '')}"></video>`;
  el.firstChild.play?.().catch(() => {});
}

// Une carte par exercice : ligne photo + nom + progression ; l'exercice ouvert montre ses séries.
// Toutes les séries restent dans le DOM (brouillon, volumes et enregistrement les lisent).
function exCard(ex, ei, mg, last, draft) {
  const name = ex.name;
  const open = wkState.openEx === ei;
  const prevSets = lastSetsFor(name);
  const hint = progressionHint(mg, ex, { sets: prevSets });
  const safe = name.replace(/'/g, "\\'");
  const prevW = prevSets.map(s => parseFloat(s.weight) || 0);
  const lastTxt = prevW.some(Boolean)
    ? (prevW.every(w => w === prevW[0])
        ? `Dernière fois : ${String(prevW[0]).replace('.', ',')} kg × ${prevSets.map(s => s.reps || '–').join(', ')}`
        : `Dernière fois : ${prevSets.map(s => `${String(s.weight || 0).replace('.', ',')}×${s.reps || '–'}`).join(' · ')}`)
    : '';
  const pr = (S.prs || {})[name]?.date === todayStr();
  return `
  <article class="ex-card${open ? ' open' : ''}" id="ex-${ei}">
    <button class="ex-row" onclick="openEx(${ei})" aria-expanded="${open}">
      ${exoThumbHTML(name)}
      <span class="ex-row-b">
        <span class="ex-row-t">${name}${pr ? ' <span class="pr-badge" aria-label="Record du jour">🏆</span>' : ''}</span>
        <span class="ex-row-s" id="ex-sub-${ei}">${ex.sets} × ${ex.reps} · repos ${ex.rest}</span>
        <span class="prog"><i id="ex-prog-${ei}" style="width:0%"></i></span>
      </span>
    </button>
    <div class="ex-body">
      <div class="ex-media" id="ex-media-${ei}"></div>
      <div class="ex-tools">
        <span class="pill">${ex.sets} × ${ex.reps}</span>
        <span class="pill">Repos ${ex.rest}</span>
        ${hint ? `<span class="pill pill-ink">+${String(hint.inc).replace('.', ',')} kg conseillé</span>` : ''}
      </div>
      <div class="ex-last"><span>${lastTxt || 'Première fois sur cet exercice'}</span>
        <button class="tool-btn" onclick="copyExName(this,'${safe}')" aria-label="Copier le nom de l'exercice">${ICON_COPY}</button></div>
      ${Array.from({ length: ex.sets }, (_, si) => {
        const pv = prevSets[si] || prevSets[prevSets.length - 1] || {};
        const dv = draft?.inputs?.[`${ei}-${si}`];
        const onIn = si === 0 ? `autoFillFromS1(${ei})` : 'updateVols()';
        return `
        <div class="set-card" id="set-row-${ei}-${si}">
          <span class="set-n"><span class="set-n-l">Série </span>${si + 1}</span>
          <label class="fld"><input type="number" class="set-input" inputmode="decimal" step="0.5" id="w-${ei}-${si}"
            value="${dv?.w ?? ''}" placeholder="${hint ? hint.weight : (pv.weight || '')}" aria-label="Poids série ${si + 1}" oninput="${onIn}"><small>kg</small></label>
          <label class="fld"><input type="number" class="set-input" inputmode="numeric" step="1" id="r-${ei}-${si}"
            value="${dv?.r ?? ''}" placeholder="${pv.reps || ''}" aria-label="Reps série ${si + 1}" oninput="${onIn}"><small>reps</small></label>
          <button class="set-ok" id="chk-${ei}-${si}" onclick="validateSet(${ei},${si})" aria-pressed="false" aria-label="Valider la série ${si + 1}">${ICON_CHECK}</button>
        </div>`;
      }).join('')}
      <button class="ex-s1" onclick="copyFirstSet(${ei})">Recopier la série 1 sur les suivantes</button>
    </div>
  </article>`;
}

function exoThumbHTML(name) {
  const src = exoImg(name);
  return `<span class="th">${src ? `<img src="${src}" alt="" loading="lazy" decoding="async">` : ICON_DUMBBELL}</span>`;
}

function curExos() { return WORKOUT_PLAN[wkState.muscleGroup]?.[wkState.weekType] || []; }
function exIsDone(ei, exos = curExos()) {
  return Array.from({ length: exos[ei].sets }, (_, si) => wkState.doneSets[`${ei}-${si}`]).every(Boolean);
}
// Premier exercice pas terminé (null si tout est fait)
function firstOpenEx(exos = curExos()) {
  const i = exos.findIndex((_, ei) => !exIsDone(ei, exos));
  return i === -1 ? null : i;
}

function openEx(ei, force = false) {
  const same = wkState.openEx === ei && !force;
  document.querySelectorAll('.ex-card.open').forEach(c => {
    c.classList.remove('open');
    c.querySelector('.ex-row')?.setAttribute('aria-expanded', 'false');
  });
  wkState.openEx = same ? null : ei;
  mountExMedia(wkState.openEx);
  if (!same) {
    const card = document.getElementById(`ex-${ei}`);
    card?.classList.add('open');
    card?.querySelector('.ex-row')?.setAttribute('aria-expanded', 'true');
    setTimeout(() => card?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }
  refreshSetStates();
}

// Changer de groupe ou de variante efface la saisie d'une séance commencée : on demande d'abord.
function confirmLeaveDraft(mg, wt) {
  const d = activeWkDraft();
  if (!d || (d.mg === mg && d.wt === wt)) return true;
  return confirm(`Ta séance ${sessionTitle(d.mg, d.wt)} est en cours. La quitter efface ce que tu as saisi. Continuer ?`);
}

function setWorkoutMuscle(k) {
  if (k === wkState.muscleGroup) return;
  const wt = k === nextPPLSession()[0] ? nextPPLSession()[1] : variantForGroup(k);
  if (!confirmLeaveDraft(k, wt)) return;
  if (activeWkDraft()) clearWkDraft();
  wkState.muscleGroup = k; wkState.weekType = wt;
  renderWorkoutForm();
}

function exSetCount(ei) { return curExos()[ei]?.sets || 0; }

// Saisir la série 1 recopie ses valeurs sur les séries suivantes pas encore faites
function autoFillFromS1(ei) {
  const w0 = document.getElementById(`w-${ei}-0`)?.value || '';
  const r0 = document.getElementById(`r-${ei}-0`)?.value || '';
  for (let si = 1; si < exSetCount(ei); si++) {
    if (wkState.doneSets[`${ei}-${si}`]) continue;
    const we = document.getElementById(`w-${ei}-${si}`);
    const re = document.getElementById(`r-${ei}-${si}`);
    if (we) we.value = w0;
    if (re) re.value = r0;
  }
  updateVols();
}
function copyFirstSet(ei) { autoFillFromS1(ei); haptic([4]); }

// ✓ : valide la série (en reprenant la valeur proposée en gris si le champ est vide),
// lance le repos de l'exercice, puis ouvre l'exercice suivant quand toutes ses séries sont faites.
function validateSet(ei, si) {
  const key = `${ei}-${si}`;
  const exos = curExos();
  if (wkState.doneSets[key]) { wkState.doneSets[key] = false; haptic([4]); updateVols(); return; }
  const we = document.getElementById(`w-${ei}-${si}`);
  const re = document.getElementById(`r-${ei}-${si}`);
  if (!we.value && we.placeholder) we.value = we.placeholder;
  if (!re.value && re.placeholder) re.value = re.placeholder;
  if (!(parseFloat(we.value) > 0)) { we.focus(); showToast('Entre le poids de la série'); return; }
  if (!(parseInt(re.value) > 0))   { re.focus(); showToast('Entre le nombre de reps'); return; }
  wkState.doneSets[key] = true;
  haptic([10, 20, 10]);
  if (!wkTimer.startTs) startWkTimer();
  updateVols();
  const next = firstOpenEx(exos);
  if (next === null) { stopTimer(); showToast('Séance complète · tu peux terminer'); return; }
  startRestTimer(restSeconds(exos[ei].rest));
  if (exIsDone(ei, exos)) setTimeout(() => openEx(next, true), 350);
}

function copyExName(btn, name) {
  const icon = btn?.innerHTML;
  const done = () => { showToast(`« ${name} » copié`); if (btn) { btn.textContent = '✓'; setTimeout(() => { btn.innerHTML = icon; }, 1200); } };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(name).then(done).catch(() => fallbackCopy(name, done));
  } else { fallbackCopy(name, done); }
}
function fallbackCopy(text, done) {
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.focus(); ta.select();
  try { document.execCommand('copy'); done(); } catch (e) {}
  document.body.removeChild(ta);
}

function updateVols() {
  const exos = curExos();
  let total = 0;
  exos.forEach((ex, ei) => {
    let ev = 0, done = 0;
    for (let si = 0; si < ex.sets; si++) {
      const w = parseFloat(document.getElementById(`w-${ei}-${si}`)?.value) || 0;
      const r = parseInt(document.getElementById(`r-${ei}-${si}`)?.value) || 0;
      if (wkState.doneSets[`${ei}-${si}`]) { done++; ev += w * r; }   // volume des séries faites uniquement
    }
    total += ev;
    const bar = document.getElementById(`ex-prog-${ei}`);
    if (bar) bar.style.width = `${(done / ex.sets * 100).toFixed(1)}%`;
    const sub = document.getElementById(`ex-sub-${ei}`);
    if (sub) sub.textContent = done === ex.sets ? `${ex.sets} séries · ${fmtVol(ev)} kg · fait`
      : done ? `${done} sur ${ex.sets} séries · ${fmtVol(ev)} kg`
      : `${ex.sets} × ${ex.reps} · repos ${ex.rest}`;
  });
  wkState.total = total;
  const te = document.getElementById('session-total');
  if (te) te.textContent = fmtVol(total);
  const pe = document.getElementById('rb-prog');
  if (pe) pe.textContent = seanceProgressLabel();
  updateSeanceProgress();
  const last = getLastSession(wkState.muscleGroup, wkState.weekType);
  const de = document.getElementById('session-delta');
  if (de) de.textContent = (last && total > 0) ? `· ${total >= last.totalVolume ? '+' : '−'}${Math.abs((total - last.totalVolume) / last.totalVolume * 100).toFixed(0)} %` : '';
  refreshSetStates();
  saveWkDraft();
}

// Séries faites (fond gris + ✓ noir) et série en cours (contour noir) de l'exercice ouvert
function refreshSetStates() {
  curExos().forEach((ex, ei) => {
    let curFound = false;
    for (let si = 0; si < ex.sets; si++) {
      const row = document.getElementById(`set-row-${ei}-${si}`);
      if (!row) continue;
      const done = !!wkState.doneSets[`${ei}-${si}`];
      const cur = !done && !curFound && wkState.openEx === ei;
      if (cur) curFound = true;
      row.classList.toggle('done', done);
      row.classList.toggle('cur', cur);
      document.getElementById(`chk-${ei}-${si}`)?.setAttribute('aria-pressed', String(done));
      // Couleur de la série vs la dernière fois : vert = plus lourd (ou pas de référence), orange = même poids, rouge = moins lourd.
      // Rouge et orange s'affichent dès la saisie (contour du champ poids) ; la série validée prend la couleur pleine.
      const tone = setTone(ei, si);
      ['t-up', 't-same', 't-down'].forEach(c => row.classList.toggle(c, (tone || 'up') === c.slice(2) && (done || !!tone)));
      const wf = document.getElementById(`w-${ei}-${si}`)?.closest('.fld');
      if (wf) ['t-up', 't-same', 't-down'].forEach(c => wf.classList.toggle(c, !done && tone === c.slice(2)));
    }
  });
}

function setTone(ei, si) {
  const w = parseFloat(document.getElementById(`w-${ei}-${si}`)?.value) || 0;
  const prev = wkState.prevSets?.[ei] || [];
  const pw = parseFloat((prev[si] || prev[prev.length - 1])?.weight) || 0;
  if (!w || !pw) return null;
  return w > pw ? 'up' : w === pw ? 'same' : 'down';
}

// Progression de la séance : séries validées / séries prévues
function seanceProgress() {
  const exos = curExos();
  const total = exos.reduce((t, e) => t + e.sets, 0);
  const done = exos.reduce((t, e, ei) => t + Array.from({ length: e.sets }, (_, si) => wkState.doneSets[`${ei}-${si}`]).filter(Boolean).length, 0);
  return { done, total, pct: total ? Math.round(done / total * 100) : 0 };
}
function seanceProgressLabel() {
  const p = seanceProgress();
  return `${p.pct} % · ${p.done}/${p.total} séries`;
}
function updateSeanceProgress() {
  const p = seanceProgress();
  const fill = document.getElementById('wk-prog-fill');
  if (!fill) return;
  fill.style.width = `${p.pct}%`;
  document.getElementById('wk-pct').textContent = `${p.pct} %`;
  document.getElementById('wk-prog-s').textContent = p.done === p.total ? 'Toutes les séries sont faites' : `${p.done} série${p.done > 1 ? 's' : ''} sur ${p.total}`;
  const box = document.getElementById('wk-progress');
  box.setAttribute('aria-valuenow', p.pct);
  box.classList.toggle('full', p.pct === 100);
}

// ── Barre de séance : remplace la barre d'onglets pendant la muscu (chrono, repos, Terminer)
function mountRunbar() {
  document.body.classList.add('in-seance');
  let bar = document.getElementById('runbar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'runbar'; bar.className = 'runbar';
    document.body.appendChild(bar);
  }
  renderRunbar();
}
function unmountRunbar() {
  document.body.classList.remove('in-seance');
  document.getElementById('runbar')?.remove();
}
function renderRunbar() {
  const bar = document.getElementById('runbar');
  if (!bar) return;
  if (timerState.active) {
    bar.innerHTML = `
      <div class="rb-l">
        <svg class="rb-ring" viewBox="0 0 36 36" aria-hidden="true">
          <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="3"/>
          <circle id="rest-ring" cx="18" cy="18" r="15" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"
            stroke-dasharray="94.25" stroke-dashoffset="0" transform="rotate(-90 18 18)"/>
        </svg>
        <div class="rb-t"><b id="rest-count" aria-live="off">${formatTimerTime(restRemaining())}</b><small>Repos</small></div>
      </div>
      <div class="rb-r">
        <button class="rb-ghost" onclick="stopTimer()">Passer</button>
        <button class="rb-btn" onclick="addRest(30)">+30 s</button>
      </div>`;
    updateRestUI();
    return;
  }
  const started = !!wkTimer.startTs || Object.values(wkState.doneSets).some(Boolean);
  bar.innerHTML = `
    <button class="rb-l rb-timer${started && !wkTimer.running ? ' paused' : ''}" id="timer-toggle-btn" onclick="${wkTimer.startTs ? 'toggleWkTimer()' : 'startWkTimer();renderRunbar()'}" aria-label="Chrono de séance : pause ou reprise">
      <div class="rb-t"><b id="session-timer">${wkTimer.startTs ? formatDur(Math.floor((Date.now() - wkTimer.startTs) / 1000)) : '00:00'}</b>
        <small><span id="rb-prog">${seanceProgressLabel()}</span> · <span id="session-total">${fmtVol(wkState.total || 0)}</span> kg</small></div>
    </button>
    ${started
      ? `<button class="rb-btn" onclick="saveWorkout()">Terminer</button>`
      : `<button class="rb-btn" onclick="startWkTimer();renderRunbar()">Démarrer</button>`}`;
}

function leaveSeance() { saveWkDraft(); navigate('dashboard'); }

let _savingWorkout = false;
// validatedOnly : n'enregistre que les séries validées (✓). Sinon, s'il reste des séries remplies
// mais pas validées (souvent recopiées depuis la série 1), on demande si elles ont été faites.
function saveWorkout(validatedOnly = false) {
  if (_savingWorkout) return;
  const mg   = wkState.muscleGroup;
  const wt   = wkState.weekType;
  const exos = WORKOUT_PLAN[mg][wt];
  const val  = (id, f) => f(document.getElementById(id)?.value) || 0;
  const filledNotDone = exos.reduce((t, ex, ei) => t + Array.from({ length: ex.sets }, (_, si) =>
    !wkState.doneSets[`${ei}-${si}`] && val(`w-${ei}-${si}`, parseFloat) > 0 && val(`r-${ei}-${si}`, parseInt) > 0).filter(Boolean).length, 0);
  let keepUnvalidated = false;
  if (!validatedOnly && filledNotDone) {
    keepUnvalidated = confirm(`${filledNotDone} série${filledNotDone > 1 ? 's sont remplies' : ' est remplie'} mais pas validée${filledNotDone > 1 ? 's' : ''} (✓).\n\nOK : ${filledNotDone > 1 ? 'les' : 'la'} compter comme faite${filledNotDone > 1 ? 's' : ''}.\nAnnuler : ne garder que les séries validées.`);
  }
  _savingWorkout = true;
  setTimeout(() => { _savingWorkout = false; }, 3000);
  const date = document.getElementById('wk-date')?.value || todayStr();
  const notes= document.getElementById('wk-notes')?.value||'';
  const exercises = exos.map((ex,ei)=>({
    name: ex.name, sets: Array.from({length:ex.sets},(_,si)=>{
      const keep = wkState.doneSets[`${ei}-${si}`] || keepUnvalidated;
      return keep ? { weight: val(`w-${ei}-${si}`, parseFloat), reps: val(`r-${ei}-${si}`, parseInt) } : { weight: 0, reps: 0 };
    })
  }));
  const totalVolume = calcSessionVol(exercises);
  const duration = wkTimer.startTs ? Math.floor((Date.now() - wkTimer.startTs) / 1000) : 0;
  stopWkTimer();
  stopTimer();
  wkState.openKey = null;
  S.weekType = wt;
  S.workouts.push({ id:uid(), date, weekKey:getWeekKey(date), weekType:wt, muscleGroup:mg, exercises, totalVolume, notes, duration });

  // Détection PRs
  if (!S.prs) S.prs = {};
  const newPRs = [];
  exercises.forEach(ex => {
    ex.sets.forEach(set => {
      if (!set.weight || !set.reps) return;
      const score = set.weight * set.reps;
      const prev = S.prs[ex.name];
      if (!prev || score > (prev.weight * prev.reps)) {
        S.prs[ex.name] = { weight: set.weight, reps: set.reps, date };
        newPRs.push(`${ex.name} — ${set.weight}kg × ${set.reps}`);
      }
    });
  });

  save();
  flushPush();          // séance = donnée critique : on pousse au cloud tout de suite, sans attendre les 2 s
  saveBackup('séance');
  clearWkDraft();
  haptic([40, 30, 80]);
  if (newPRs.length) {
    setTimeout(() => showToast(`🏆 PR : ${newPRs[0]}`), 600);
  }
  showToast(`${WORKOUT_PLAN[mg].label} · ${fmtVol(totalVolume)} kg · ${formatDur(duration)}`);
  wkState.muscleGroup = null;
  navigate('dashboard');
}

// ============================================================
// 5d. SÉANCE OUBLIÉE
// ============================================================

function notifPermission() {
  if (typeof Notification === 'undefined' || !('serviceWorker' in navigator)) return 'unsupported';
  return Notification.permission;
}
// Notification via le service worker (seule méthode affichée par iOS pour une app installée)
async function showLocalNotif(title, body, tag) {
  if (notifPermission() !== 'granted') return false;
  try {
    const reg = await navigator.serviceWorker.ready;
    await reg.showNotification(title, { body, tag, icon: './icon.png', badge: './icon.png', renotify: true, data: { url: './' } });
    return true;
  } catch { return false; }
}
async function askNotifPermission() {
  if (notifPermission() === 'unsupported') { showToast('Notifications indisponibles : installe Tempo sur l\'écran d\'accueil (iOS 16.4 ou plus)'); return; }
  const p = await Notification.requestPermission();
  showToast(p === 'granted' ? 'Notifications activées ✓' : 'Notifications refusées · Réglages › Tempo pour les autoriser');
  document.getElementById('notif-hint')?.remove();
  const btn = document.getElementById('notif-btn'); if (btn) btn.textContent = p === 'granted' ? 'Activées ✓' : 'Activer';
}

// Brouillon en cours avec au moins une série validée : { mg, wt, done, total, pct, startTs, ts, date }
function draftInfo() {
  try {
    const d = JSON.parse(localStorage.getItem(WK_DRAFT_KEY) || 'null');
    if (!d || !WORKOUT_PLAN[d.mg]?.[d.wt]) return null;
    const total = WORKOUT_PLAN[d.mg][d.wt].reduce((t, e) => t + e.sets, 0);
    const done = Array.isArray(d.done) ? d.done.length : Object.values(d.inputs || {}).filter(v => parseFloat(v.w) > 0 && parseInt(v.r) > 0).length;
    if (!done) return null;
    return { ...d, done, total, pct: Math.round(done / total * 100), ts: d._ts || Date.now() };
  } catch { return null; }
}

// En quittant l'app : séance finie à 100 % mais pas enregistrée → notification
function notifyForgottenOnLeave() {
  if (S.view !== 'workout' || seanceMode !== 'muscu') return;
  const p = seanceProgress();
  if (p.total && p.pct === 100) {
    showLocalNotif('Séance pas encore enregistrée', `${sessionTitle(wkState.muscleGroup, wkState.weekType)} est finie à 100 %. Ouvre Tempo et appuie sur Terminer pour l'enregistrer.`, 'seance-oubliee');
  }
}

// À la réouverture (plus de 2 h après la dernière activité) : proposer d'enregistrer la séance restée en cours
let _forgotPromptShown = false;
function checkForgottenOnOpen() {
  const d = draftInfo();
  if (!d || _forgotPromptShown || Date.now() - d.ts < 2 * 3600 * 1000) return;
  _forgotPromptShown = true;
  const ago = Math.round((Date.now() - d.ts) / 3600000);
  showModal(`
    <div class="modal-head"><div><div class="modal-title">Séance pas enregistrée</div></div><button class="modal-close" onclick="closeModal()" aria-label="Fermer">×</button></div>
    <div class="forgot-card">
      <b>${sessionTitle(d.mg, d.wt)}</b>
      <span>${formatDate(d.date || todayStr())} · dernière activité il y a ${ago} h</span>
      <span class="prog wk-prog"><i style="width:${d.pct}%"></i></span>
      <span>${d.done} séries sur ${d.total} · ${d.pct} %</span>
    </div>
    <button class="btn btn-primary" onclick="finishDraftSession()">Enregistrer la séance</button>
    <button class="btn btn-ghost" style="margin-top:8px" onclick="closeModal();startSeance()">Reprendre</button>
    <button class="btn btn-danger" style="margin-top:8px" onclick="discardDraftSession()">Supprimer</button>
  `);
}
function finishDraftSession() {
  const d = draftInfo(); if (!d) { closeModal(); return; }
  closeModal();
  seanceMode = 'muscu'; wkState.muscleGroup = d.mg; wkState.openKey = null;
  navigate('workout');
  // Durée = du début à la dernière activité (pas jusqu'à maintenant)
  if (d.startTs) { wkTimer.startTs = Date.now() - Math.max(0, d.ts - d.startTs); }
  _savingWorkout = false;
  saveWorkout(true);   // « telle quelle » = uniquement les séries validées
}
function discardDraftSession() {
  if (!confirm('Supprimer cette séance ? Les séries saisies seront perdues.')) return;
  clearWkDraft(); stopWkTimer(); wkState.muscleGroup = null; wkState.openKey = null;
  closeModal(); navigate('dashboard'); showToast('Séance supprimée');
}

// ============================================================
// 5b. CHRONO REPOS
// ============================================================

let timerState = { active: false, endTs: 0, total: 90, interval: null };

function startRestTimer(sec = 90) {
  clearInterval(timerState.interval);
  timerState = { active: true, endTs: Date.now() + sec * 1000, total: sec, interval: setInterval(tickRest, 250) };
  renderRunbar();
}
function restRemaining() { return Math.max(0, Math.ceil((timerState.endTs - Date.now()) / 1000)); }
function tickRest() {
  if (restRemaining() <= 0) { stopTimer(); onTimerEnd(); }
  else updateRestUI();
}
function addRest(sec) { timerState.endTs += sec * 1000; timerState.total += sec; haptic([4]); updateRestUI(); }
function stopTimer() {
  clearInterval(timerState.interval);
  timerState.interval = null;
  timerState.active = false;
  renderRunbar();
}
function updateRestUI() {
  const left = restRemaining();
  const c = document.getElementById('rest-count');
  if (c) c.textContent = formatTimerTime(left);
  const ring = document.getElementById('rest-ring');
  if (ring) ring.style.strokeDashoffset = (94.25 * (1 - left / timerState.total)).toFixed(2);
}

function onTimerEnd() {
  try { navigator.vibrate([200, 100, 200]); } catch {}
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.6);
  } catch {}
  showToast('Repos terminé · série suivante');
}

function formatTimerTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

// ============================================================
// 5c. NUTRITION & POIDS
// ============================================================

let NUTRI_TARGETS = { calories: 2400, protein: 175, carbs: 250, fat: 80, water: 2500 };
// Recomposition corporelle (sèche + muscle) : léger déficit + protéines élevées.
// ~2400 kcal · 175 g protéines (≈2.9 g/kg) · 250 g glucides · 80 g lipides.
// Jour OFF : viser 2000-2100 kcal (glucides ↓).

const MEAL_PRESETS = [
  // ── Féculents ──────────────────────────────────────────────────────
  {
    category: 'Féculents',
    name: 'Aligot',
    emoji: '🥔',
    defaultG: 200,
    perG: { cal: 1.80, prot: 0.05, carbs: 0.15, fat: 0.11 },
    note: 'Aligot',
    detail: 'par 100g : ~180 kcal · 5g prot · 15g glucides · 11g lip.'
  },
  {
    category: 'Féculents',
    name: 'Patates cuites',
    emoji: '🥔',
    defaultG: 300,
    perG: { cal: 0.75, prot: 0.017, carbs: 0.17, fat: 0.001 },
    note: 'Patates cuites à l\'eau',
    detail: 'par 100g cuit : ~75 kcal · 1,7g prot · 17g glucides · 0,1g lip.'
  },
  {
    category: 'Féculents',
    name: 'Pâtes cuites',
    emoji: '🍝',
    defaultG: 300,
    perG: { cal: 1.4, prot: 0.04, carbs: 0.28, fat: 0.01 },
    note: 'Pâtes cuites',
    detail: 'par 100g cuit : ~140 kcal · 4g prot · 28g glucides'
  },
  {
    category: 'Féculents',
    name: 'Pâtes protéines Panzani',
    emoji: '🍝',
    defaultG: 250,
    perG: { cal: 1.58, prot: 0.09, carbs: 0.252, fat: 0.0135 },
    note: 'Panzani Les Protéinées, pesées cuites',
    detail: 'par 100g cuit : ~158 kcal · 9g prot · 25g glucides · 1,4g lip.'
  },
  {
    category: 'Féculents',
    name: 'Lasagnes',
    emoji: '🍜',
    defaultG: 350,
    perG: { cal: 1.45, prot: 0.075, carbs: 0.13, fat: 0.07 },
    note: 'Lasagnes bolognaise',
    detail: 'par 100g : ~145 kcal · 7,5g prot · 13g glucides · 7g lip.'
  },
  {
    category: 'Féculents',
    name: 'Riz basmati cuit',
    emoji: '🍚',
    defaultG: 300,
    perG: { cal: 1.167, prot: 0.0233, carbs: 0.25, fat: 0.003 },
    note: 'Riz basmati cuit',
    detail: 'par 100g cuit : ~117 kcal · 2,3g prot · 25g glucides'
  },
  {
    category: 'Féculents',
    name: 'Frites',
    emoji: '🍟',
    defaultG: 150,
    perG: { cal: 2.90, prot: 0.035, carbs: 0.38, fat: 0.14 },
    note: 'Frites',
    detail: 'par 100g : ~290 kcal · 3,5g prot · 38g glucides · 14g lip.'
  },
  {
    category: 'Féculents',
    name: 'Ravioles du Dauphiné',
    emoji: '🥟',
    defaultG: 150,
    perG: { cal: 2.75, prot: 0.12, carbs: 0.40, fat: 0.085 },
    note: 'Ravioles du Dauphiné',
    detail: 'par 100g : ~275 kcal · 12g prot · 40g glucides · 8,5g lip.'
  },
  // ── Viandes ────────────────────────────────────────────────────────
  {
    category: 'Viandes',
    name: 'Bœuf bourguignon',
    emoji: '🍲',
    defaultG: 250,
    perG: { cal: 1.50, prot: 0.13, carbs: 0.05, fat: 0.08 },
    note: 'Bœuf bourguignon',
    detail: 'par 100g : ~150 kcal · 13g prot · 5g glucides · 8g lip.'
  },
  {
    category: 'Viandes',
    name: 'Basse côte de bœuf',
    emoji: '🥩',
    defaultG: 150,
    perG: { cal: 2.50, prot: 0.26, carbs: 0, fat: 0.16 },
    note: 'Basse côte de bœuf cuite',
    detail: 'par 100g cuit : ~250 kcal · 26g prot · 0g glucides · 16g lip.'
  },
  {
    category: 'Viandes',
    name: 'Museau de porc',
    emoji: '🐖',
    defaultG: 100,
    perG: { cal: 1.50, prot: 0.09, carbs: 0, fat: 0.12 },
    note: 'Museau de porc',
    detail: 'par 100g : ~150 kcal · 9g prot · 0g glucides · 12g lip.'
  },
  {
    category: 'Viandes',
    name: 'Agneau cuit',
    emoji: '🍖',
    defaultG: 150,
    perG: { cal: 2.50, prot: 0.25, carbs: 0, fat: 0.16 },
    note: 'Agneau cuit',
    detail: 'par 100g cuit : ~250 kcal · 25g prot · 0g glucides · 16g lip.'
  },
  {
    category: 'Viandes',
    name: 'Pintade cuite',
    emoji: '🍗',
    defaultG: 150,
    perG: { cal: 1.70, prot: 0.29, carbs: 0, fat: 0.06 },
    note: 'Pintade cuite',
    detail: 'par 100g cuit : ~170 kcal · 29g prot · 0g glucides · 6g lip.'
  },
  {
    category: 'Viandes',
    name: 'Blanc de poulet cuit',
    emoji: '🍗',
    defaultG: 150,
    perG: { cal: 1.65, prot: 0.31, carbs: 0, fat: 0.036 },
    note: 'Blanc de poulet cuit',
    detail: 'par 100g cuit : ~165 kcal · 31g prot · 0g glucides · 3,6g lip.'
  },
  {
    category: 'Viandes',
    name: 'Filet de bœuf cuit',
    emoji: '🥩',
    defaultG: 150,
    perG: { cal: 2.00, prot: 0.27, carbs: 0, fat: 0.10 },
    note: 'Filet de bœuf cuit',
    detail: 'par 100g cuit : ~200 kcal · 27g prot · 0g glucides · 10g lip.'
  },
  {
    category: 'Viandes',
    name: 'Boulettes de viande',
    emoji: '🧆',
    defaultG: 150,
    perG: { cal: 2.50, prot: 0.16, carbs: 0.06, fat: 0.18 },
    note: 'Boulettes de viande cuites',
    detail: 'par 100g cuit : ~250 kcal · 16g prot · 6g glucides · 18g lip.'
  },
  {
    category: 'Viandes',
    name: 'Chevreuil rôti',
    emoji: '🦌',
    defaultG: 150,
    perG: { cal: 1.22, prot: 0.268, carbs: 0, fat: 0.021 },
    note: 'Chevreuil rôti',
    detail: 'par 100g cuit : ~122 kcal · 26,8g prot · 0g glucides · 2,1g lip.'
  },
  {
    category: 'Viandes',
    name: 'Dinde (escalope cuite)',
    emoji: '🦃',
    defaultG: 150,
    perG: { cal: 1.35, prot: 0.29, carbs: 0, fat: 0.015 },
    note: 'Escalope de dinde cuite',
    detail: 'par 100g cuit : ~135 kcal · 29g prot · 0g glucides · 1,5g lip.'
  },
  {
    category: 'Viandes',
    name: 'Jambon blanc',
    emoji: '🍖',
    defaultG: 80,
    perG: { cal: 1.07, prot: 0.184, carbs: 0.005, fat: 0.035 },
    note: 'Jambon blanc cuit',
    detail: 'par 100g : ~107 kcal · 18,4g prot · 0,5g glucides · 3,5g lip. (2 tranches ≈ 80g)'
  },
  {
    category: 'Viandes',
    name: 'Porc (filet cuit)',
    emoji: '🥩',
    defaultG: 150,
    perG: { cal: 1.53, prot: 0.26, carbs: 0, fat: 0.05 },
    note: 'Filet de porc cuit',
    detail: 'par 100g cuit : ~153 kcal · 26g prot · 0g glucides · 5g lip.'
  },
  {
    category: 'Viandes',
    name: 'Saucisse de Toulouse (cuite)',
    emoji: '🌭',
    defaultG: 120,
    perG: { cal: 2.80, prot: 0.14, carbs: 0, fat: 0.25 },
    note: 'Saucisse de Toulouse cuite',
    detail: 'par 100g cuit : ~280 kcal · 14g prot · 0g glucides · 25g lip.'
  },
  {
    category: 'Viandes',
    name: 'Travers de porc (cuit)',
    emoji: '🥩',
    defaultG: 200,
    perG: { cal: 2.90, prot: 0.17, carbs: 0, fat: 0.24 },
    note: 'Travers de porc cuit',
    detail: 'par 100g cuit : ~290 kcal · 17g prot · 0g glucides · 24g lip.'
  },
  {
    category: 'Viandes',
    name: 'Steak',
    emoji: '🥩',
    defaultG: 130,
    perG: { cal: 1.31, prot: 0.154, carbs: 0, fat: 0.08 },
    note: 'Steak',
    detail: 'par 100g : ~131 kcal · 15g prot · 0g glucides'
  },
  {
    category: 'Viandes',
    name: 'Viande hachée 5% MG',
    emoji: '🥩',
    defaultG: 150,
    perG: { cal: 1.21, prot: 0.198, carbs: 0, fat: 0.05 },
    note: 'Bœuf haché 5% MG (cru)',
    detail: 'par 100g cru : ~121 kcal · 19,8g prot · 0g glucides · 5g lip.'
  },
  // ── Poissons & mer ─────────────────────────────────────────────────
  {
    category: 'Poissons & mer',
    name: 'Cabillaud cuit',
    emoji: '🐟',
    defaultG: 150,
    perG: { cal: 0.90, prot: 0.20, carbs: 0, fat: 0.008 },
    note: 'Cabillaud cuit',
    detail: 'par 100g cuit : ~90 kcal · 20g prot · 0g glucides · 0,8g lip.'
  },
  {
    category: 'Poissons & mer',
    name: 'Crevettes cuites',
    emoji: '🦐',
    defaultG: 100,
    perG: { cal: 0.99, prot: 0.209, carbs: 0, fat: 0.017 },
    note: 'Crevettes cuites',
    detail: 'par 100g : ~99 kcal · 20,9g prot · 0g glucides · 1,7g lip.'
  },
  {
    category: 'Poissons & mer',
    name: 'Saumon (filet cuit)',
    emoji: '🐟',
    defaultG: 150,
    perG: { cal: 2.06, prot: 0.204, carbs: 0, fat: 0.134 },
    note: 'Saumon filet cuit',
    detail: 'par 100g cuit : ~206 kcal · 20,4g prot · 0g glucides · 13,4g lip.'
  },
  {
    category: 'Poissons & mer',
    name: 'Sushis au saumon',
    emoji: '🍣',
    defaultG: 220,
    perG: { cal: 1.50, prot: 0.09, carbs: 0.22, fat: 0.035 },
    note: 'Sushis au saumon',
    detail: 'par 100g : ~150 kcal · 9g prot · 22g glucides · 3,5g lip. (≈6 pièces = 220g)'
  },
  {
    category: 'Poissons & mer',
    name: 'Sushis au thon',
    emoji: '🍣',
    defaultG: 220,
    perG: { cal: 1.40, prot: 0.095, carbs: 0.24, fat: 0.012 },
    note: 'Sushis au thon',
    detail: 'par 100g : ~140 kcal · 9,5g prot · 24g glucides · 1,2g lip. (≈6 pièces = 220g)'
  },
  {
    category: 'Poissons & mer',
    name: 'Thon en boîte (naturel)',
    emoji: '🥫',
    defaultG: 120,
    perG: { cal: 1.16, prot: 0.255, carbs: 0, fat: 0.01 },
    note: 'Thon au naturel égoutté',
    detail: 'par 100g égoutté : ~116 kcal · 25,5g prot · 0g glucides · 1g lip.'
  },
  {
    category: 'Poissons & mer',
    name: 'Truite',
    emoji: '🐟',
    defaultG: 100,
    perG: { cal: 1.3, prot: 0.2, carbs: 0, fat: 0.06 },
    note: 'Truite',
    detail: 'par 100g : ~130 kcal · 20g prot · 0g glucides'
  },
  {
    category: 'Poissons & mer',
    name: 'Poulpe cuit',
    emoji: '🐙',
    defaultG: 150,
    perG: { cal: 0.82, prot: 0.148, carbs: 0.022, fat: 0.01 },
    note: 'Poulpe cuit',
    detail: 'par 100g : ~82 kcal · 14,8g prot · 2,2g glucides · 1g lip.'
  },
  // ── Laitiers ───────────────────────────────────────────────────────
  {
    category: 'Laitiers',
    name: 'Chèvre (bûche)',
    emoji: '🧀',
    defaultG: 30,
    perG: { cal: 2.90, prot: 0.19, carbs: 0.01, fat: 0.24 },
    note: 'Bûche de chèvre',
    detail: 'par 100g : ~290 kcal · 19g prot · 1g glucides · 24g lip.'
  },
  {
    category: 'Laitiers',
    name: 'Skyr',
    emoji: '🥛',
    defaultG: 200,
    perG: { cal: 0.63, prot: 0.10, carbs: 0.04, fat: 0.002 },
    note: 'Skyr',
    detail: 'par 100g : ~63 kcal · 10g prot · 4g glucides · 0,2g lip.'
  },
  // ── Œufs ───────────────────────────────────────────────────────────
  {
    category: 'Œufs',
    name: 'Œuf entier',
    emoji: '🥚',
    defaultG: 120,
    perG: { cal: 1.43, prot: 0.126, carbs: 0.007, fat: 0.095 },
    note: 'Œuf entier cuit',
    detail: 'par 100g : ~143 kcal · 12,6g prot · 0,7g glucides · 9,5g lip. (1 œuf ≈ 60g)'
  },
  // ── Légumes ────────────────────────────────────────────────────────
  {
    category: 'Légumes',
    name: 'Brocoli cuit',
    emoji: '🥦',
    defaultG: 200,
    perG: { cal: 0.35, prot: 0.037, carbs: 0.045, fat: 0.005 },
    note: 'Brocoli cuit à la vapeur',
    detail: 'par 100g cuit : ~35 kcal · 3,7g prot · 4,5g glucides · 0,5g lip.'
  },
  {
    category: 'Légumes',
    name: 'Haricots rouges',
    emoji: '🫘',
    defaultG: 150,
    perG: { cal: 1.27, prot: 0.086, carbs: 0.227, fat: 0.005 },
    note: 'Haricots rouges cuits',
    detail: 'par 100g cuit : ~127 kcal · 8,6g prot · 22,7g glucides · 0,5g lip.'
  },
  {
    category: 'Légumes',
    name: 'Mélange de légumes',
    emoji: '🥕',
    defaultG: 200,
    perG: { cal: 0.45, prot: 0.025, carbs: 0.06, fat: 0.005 },
    note: 'Mélange de légumes cuits',
    detail: 'par 100g cuit : ~45 kcal · 2,5g prot · 6g glucides · 0,5g lip.'
  },
  // ── Fruits ─────────────────────────────────────────────────────────
  {
    category: 'Fruits',
    name: 'Banane',
    emoji: '🍌',
    defaultG: 120,
    perG: { cal: 0.89, prot: 0.011, carbs: 0.23, fat: 0.003 },
    note: 'Banane',
    detail: 'par 100g : ~89 kcal · 1,1g prot · 23g glucides · 0,3g lip. (1 banane ≈ 120g)'
  },
  // ── Petit-déjeuner ─────────────────────────────────────────────────
  {
    category: 'Petit-déj',
    name: 'Smoothie matin',
    emoji: '🥤',
    defaultG: null,
    calories: 957,
    protein: 57,
    carbs: 100,
    fat: 45,
    note: 'Smoothie matin',
    detail: '50g avoine · 250g skyr · 50g beurre cacahuète · 300ml lait · banane · 15 amandes'
  }
];

// Journée type recomp (≈ 2300-2400 kcal / 175 g protéines répartis sur 4 repas).
const DAY_PLAN = [
  { emoji: '🌅', name: 'Petit-déjeuner', items: "Flocons d'avoine 80 g · Whey 30 g · Fruits rouges · Beurre de cacahuète 15 g",
    calories: 550, protein: 40, carbs: 55, fat: 18 },
  { emoji: '🍽️', name: 'Déjeuner', items: 'Poulet/bœuf maigre 150 g · Riz ou pâtes 80 g (cru) · Légumes · Huile olive 10 g',
    calories: 650, protein: 50, carbs: 65, fat: 18 },
  { emoji: '🥤', name: 'Collation', items: 'Skyr/fromage blanc 250 g · Amandes 20 g · Banane',
    calories: 400, protein: 35, carbs: 35, fat: 12 },
  { emoji: '🌙', name: 'Dîner', items: 'Poisson/œufs/viande 150 g · Patate douce 200 g · Légumes verts · ½ avocat',
    calories: 700, protein: 50, carbs: 55, fat: 25 }
];

// Liste de courses hebdo (cochable, réinitialisée chaque semaine).
const SHOPPING_LIST = [
  { cat: 'Protéines',        items: ['Poulet', 'Bœuf maigre', 'Poisson blanc', 'Saumon', 'Œufs', 'Whey', 'Skyr / fromage blanc', 'Thon'] },
  { cat: 'Glucides',         items: ["Flocons d'avoine", 'Riz', 'Pâtes', 'Patate douce', 'Pain complet'] },
  { cat: 'Légumes & fruits', items: ['Brocoli', 'Épinards', 'Courgette', 'Haricots verts', 'Salade', 'Tomates', 'Banane', 'Fruits rouges'] },
  { cat: 'Graisses',         items: ['Huile olive', 'Avocat', 'Amandes', 'Beurre de cacahuète'] },
  { cat: 'Divers',           items: ['Café / thé', 'Épices', 'Sel / poivre'] }
];
const SHOPPING_AVOID = ['Sodas & jus sucrés', 'Alcool', 'Fritures', 'Sucreries industrielles'];

let nutriTab    = 'today';
let nutriDate   = todayStr();
let nutriCharts = {};

function destroyNutriCharts() {
  Object.values(nutriCharts).forEach(c => { try { c.destroy(); } catch {} });
  nutriCharts = {};
}

function renderNutrition() {
  // Le poids vit désormais dans Corps : ses actions (logWeight/deleteWeight) rappellent renderNutrition
  if (S.view === 'body') { renderBody(); return; }
  if (nutriTab === 'weight') nutriTab = 'today';
  const today    = nutriDate;
  const entries  = (S.nutrition || []).filter(n => n.date === today);
  const todayCal  = Math.ceil(entries.reduce((s, n) => s + (n.calories || 0), 0));
  const todayProt = Math.ceil(entries.reduce((s, n) => s + (n.protein  || 0), 0));
  const todayCarbs = Math.round(entries.reduce((s, n) => s + (n.carbs || 0), 0));
  const todayFat   = Math.round(entries.reduce((s, n) => s + (n.fat   || 0), 0));
  const burned     = calcCaloriesBurned(today);
  const effectiveCal = NUTRI_TARGETS.calories + burned;
  const calPct  = Math.min((todayCal  / effectiveCal)          * 100, 100);
  const protPct = Math.min((todayProt / NUTRI_TARGETS.protein)  * 100, 100);
  const carbsPct = Math.min((todayCarbs / NUTRI_TARGETS.carbs)  * 100, 100);
  const fatPct   = Math.min((todayFat   / NUTRI_TARGETS.fat)    * 100, 100);
  const waterMl  = (S.hydration || {})[today] || 0;
  const waterPct = Math.min((waterMl / NUTRI_TARGETS.water) * 100, 100);

  document.getElementById('app').innerHTML = viewHead('Nutrition') + `
    <div class="tab-row">
      <button class="tab-btn ${nutriTab==='today' ?'active':''}" onclick="setNutriTab('today')">Aujourd'hui</button>
      <button class="tab-btn ${nutriTab==='plan'  ?'active':''}" onclick="setNutriTab('plan')">Plan</button>
      <button class="tab-btn ${nutriTab==='stats' ?'active':''}" onclick="setNutriTab('stats')">Stats</button>
    </div>
    ${nutriTab === 'today'  ? _nutriToday(todayCal, todayProt, todayCarbs, todayFat, calPct, protPct, carbsPct, fatPct, effectiveCal, burned, waterMl, waterPct, entries) : ''}
    ${nutriTab === 'plan'   ? _nutriPlan() : ''}
    ${nutriTab === 'stats'  ? _nutriStats() : ''}
    <div class="spacer"></div>
  `;
  requestAnimationFrame(buildNutriCharts);
}

function _nutriToday(todayCal, todayProt, todayCarbs, todayFat, calPct, protPct, carbsPct, fatPct, effectiveCal, burned, waterMl, waterPct, entries) {
  return `
    <div class="card">
      <div class="sect-row" style="margin-bottom:12px">
        <span class="sect-lbl">${nutriDate === todayStr() ? "Aujourd'hui" : formatDate(nutriDate)}</span>
        <input type="date" class="form-inp wk-date-inline" id="nutri-date" value="${nutriDate}" max="${todayStr()}" onchange="setNutriDate(this.value)">
      </div>
      <div class="sect-row" style="margin-bottom:16px">
        <span class="sect-lbl">Objectif · Recomposition</span>
        ${burned > 0 ? `<span class="t3" style="font-size:10px;color:var(--green)">+${burned} kcal sport</span>` : '<span class="t3" style="font-size:10px">2400 kcal · 175 g prot</span>'}
      </div>

      <div style="margin-bottom:14px">
        <div class="flex-between" style="margin-bottom:7px">
          <span style="font-size:22px;font-weight:300;color:var(--t1);font-variant-numeric:tabular-nums">
            ${todayCal.toLocaleString('fr-FR')} <span style="font-size:13px;color:var(--t3)">kcal</span>
          </span>
          <span style="font-size:11px;color:var(--t3)">/ ${effectiveCal.toLocaleString('fr-FR')}</span>
        </div>
        <div class="nutri-track"><div class="nutri-fill nutri-cal" style="--p:${calPct/100}"></div></div>
        <div class="flex-between" style="margin-top:5px">
          <span class="sect-lbl">Calories</span>
          <span style="font-size:10px;color:${calPct>=100?'var(--green)':'var(--t3)'}">${calPct>=100?'Objectif ✓':Math.max(0,effectiveCal-todayCal)+' restantes'}</span>
        </div>
      </div>

      <div style="margin-bottom:14px">
        <div class="flex-between" style="margin-bottom:7px">
          <span style="font-size:18px;font-weight:300;color:var(--t1);font-variant-numeric:tabular-nums">
            ${todayProt} <span style="font-size:12px;color:var(--t3)">g</span>
          </span>
          <span style="font-size:11px;color:var(--t3)">/ ${NUTRI_TARGETS.protein}g protéines</span>
        </div>
        <div class="nutri-track"><div class="nutri-fill nutri-prot" style="--p:${protPct/100}"></div></div>
        <div class="flex-between" style="margin-top:5px">
          <span class="sect-lbl">Protéines</span>
          <span style="font-size:10px;color:${protPct>=100?'var(--green)':'var(--t3)'}">${protPct>=100?'Objectif ✓':Math.max(0,NUTRI_TARGETS.protein-todayProt)+'g restantes'}</span>
        </div>
      </div>

      <div style="margin-bottom:14px">
        <div class="flex-between" style="margin-bottom:7px">
          <span style="font-size:18px;font-weight:300;color:var(--t1);font-variant-numeric:tabular-nums">
            ${todayCarbs} <span style="font-size:12px;color:var(--t3)">g</span>
          </span>
          <span style="font-size:11px;color:var(--t3)">/ ${NUTRI_TARGETS.carbs}g glucides</span>
        </div>
        <div class="nutri-track"><div class="nutri-fill nutri-carbs" style="--p:${carbsPct/100}"></div></div>
        <div class="flex-between" style="margin-top:5px">
          <span class="sect-lbl">Glucides</span>
          <span style="font-size:10px;color:${carbsPct>=100?'var(--green)':'var(--t3)'}">${carbsPct>=100?'Objectif ✓':Math.max(0,NUTRI_TARGETS.carbs-todayCarbs)+'g restants'}</span>
        </div>
      </div>

      <div>
        <div class="flex-between" style="margin-bottom:7px">
          <span style="font-size:18px;font-weight:300;color:var(--t1);font-variant-numeric:tabular-nums">
            ${todayFat} <span style="font-size:12px;color:var(--t3)">g</span>
          </span>
          <span style="font-size:11px;color:var(--t3)">/ ${NUTRI_TARGETS.fat}g lipides</span>
        </div>
        <div class="nutri-track"><div class="nutri-fill nutri-fat" style="--p:${fatPct/100}"></div></div>
        <div class="flex-between" style="margin-top:5px">
          <span class="sect-lbl">Lipides</span>
          <span style="font-size:10px;color:${fatPct>=100?'var(--green)':'var(--t3)'}">${fatPct>=100?'Objectif ✓':Math.max(0,NUTRI_TARGETS.fat-todayFat)+'g restants'}</span>
        </div>
      </div>
    </div>

    <!-- HYDRATATION -->
    <div class="card">
      <div class="sect-row" style="margin-bottom:12px">
        <span class="sect-lbl">💧 Hydratation</span>
        <span class="t3" style="font-size:10px">${(waterMl/1000).toFixed(1)} / ${(NUTRI_TARGETS.water/1000).toFixed(1)} L</span>
      </div>
      <div class="nutri-track" style="margin-bottom:12px"><div class="nutri-fill nutri-water" style="--p:${waterPct/100}"></div></div>
      <div class="flex-between">
        <button class="btn btn-ghost btn-sm" onclick="addWater(-250)" style="flex:1;margin-right:8px">−250 ml</button>
        <span style="font-size:15px;font-weight:600;color:var(--t1);flex:0;padding:0 12px">${waterMl} ml</span>
        <button class="btn btn-primary btn-sm" onclick="addWater(250)" style="flex:1;margin-left:8px">+250 ml</button>
      </div>
    </div>

    ${MEAL_PRESETS.length > 0 ? (() => {
      const cats = [...new Set(MEAL_PRESETS.map(p => p.category))];
      const CAT_EMOJI = { 'Féculents':'🌾', 'Viandes':'🥩', 'Poissons & mer':'🐟', 'Laitiers':'🥛', 'Œufs':'🥚', 'Légumes':'🥦', 'Fruits':'🍌', 'Petit-déj':'☀️' };
      return `<div class="card">
      <div class="sect-lbl" style="margin-bottom:12px">Repas enregistrés</div>
      <div class="meal-presets-list">
        ${cats.map((cat, ci) => {
          const catId = cat.replace(/[^a-zA-Z0-9]/g, '_');
          const isFirst = ci === 0;
          const items = MEAL_PRESETS.map((p,i)=>({...p,_i:i})).filter(p=>p.category===cat);
          return `
          <div class="preset-cat-header" onclick="togglePresetCat('${catId}')">
            <span class="preset-cat-header-left">${CAT_EMOJI[cat]||''} ${cat} <span style="color:var(--t3);font-weight:400;font-size:11px">${items.length}</span></span>
            <svg id="parrow-${catId}" class="preset-cat-arrow${isFirst?' open':''}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="preset-cat-items" id="pcat-${catId}" style="display:${isFirst?'block':'none'}">
            ${items.map(p => {
              const hasG = !!p.perG;
              const initCal   = hasG ? Math.ceil(p.perG.cal * p.defaultG) : p.calories;
              const initProt  = hasG ? Math.ceil(p.perG.prot * p.defaultG) : p.protein;
              const initCarbs = hasG ? Math.round((p.perG.carbs||0) * p.defaultG) : (p.carbs||0);
              const initFat   = hasG ? Math.round((p.perG.fat||0) * p.defaultG)   : (p.fat||0);
              return `
              <div class="meal-preset-row">
                <div class="meal-preset-info">
                  <div class="meal-preset-name">${p.emoji} ${p.name}</div>
                  ${hasG ? `<div class="preset-gram-row">
                    <input type="number" inputmode="numeric" class="preset-gram-inp" id="preset-g-${p._i}"
                      value="${p.defaultG}" min="1" max="2000"
                      oninput="updatePresetCalc(${p._i})">
                    <span class="preset-gram-unit">g</span>
                  </div>` : `<div class="meal-preset-detail">${p.detail}</div>`}
                  <div class="meal-preset-macros" id="preset-macros-${p._i}">
                    <span class="preset-cal">${initCal} kcal</span>
                    <span class="preset-dot">·</span>
                    <span class="preset-prot">${initProt}g prot.</span>
                    ${initCarbs>0?`<span class="preset-dot">·</span><span class="preset-carbs">${initCarbs}g gluc.</span>`:''}
                    ${initFat>0?`<span class="preset-dot">·</span><span class="preset-fat">${initFat}g lip.</span>`:''}
                  </div>
                </div>
                <button class="btn-preset-add" onclick="logNutriPreset(${p._i})">+</button>
              </div>`;
            }).join('')}
          </div>`;
        }).join('')}
      </div>
    </div>`;
    })() : ''}

    <div class="card">
      <div class="sect-lbl" style="margin-bottom:14px">Ajouter un repas</div>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-lbl">Calories (kcal)</label>
          <input type="number" class="form-inp" inputmode="numeric" id="n-cal" placeholder="500">
        </div>
        <div class="form-group">
          <label class="form-lbl">Protéines (g)</label>
          <input type="number" class="form-inp" inputmode="decimal" step="0.5" id="n-prot" placeholder="30">
        </div>
        <div class="form-group">
          <label class="form-lbl">Glucides (g)</label>
          <input type="number" class="form-inp" inputmode="numeric" id="n-carbs" placeholder="60">
        </div>
        <div class="form-group">
          <label class="form-lbl">Lipides (g)</label>
          <input type="number" class="form-inp" inputmode="numeric" id="n-fat" placeholder="10">
        </div>
      </div>
      <div class="form-group">
        <label class="form-lbl">Repas / Note</label>
        <input type="text" class="form-inp" id="n-note" placeholder="Petit-déj, déjeuner, dîner...">
      </div>
      <button class="btn btn-primary" onclick="logNutrition()">Ajouter</button>
    </div>

    ${entries.length > 0 ? `
    <div class="card">
      <div class="sect-lbl" style="margin-bottom:14px">Repas du jour</div>
      ${entries.map(e=>`
        <div class="nutri-entry">
          <div class="nutri-entry-info">
            <div style="font-size:13px;color:var(--t1)">${e.note||'Repas'}</div>
            <div style="font-size:11px;color:var(--t3);margin-top:2px">
              ${e.protein>0?`<span style="color:var(--blue)">${e.protein}g prot.</span> · `:''}${e.calories} kcal${e.carbs>0?` · ${e.carbs}g gluc.`:''}${e.fat>0?` · ${e.fat}g lip.`:''}
            </div>
          </div>
          <button class="copy-pill" onclick="deleteNutrition('${e.id}')" style="color:var(--red)">×</button>
        </div>
      `).join('')}
    </div>` : ''}
  `;
}

// Initialise l'objet courses et remet les cases à zéro au changement de semaine.
function ensureShopping() {
  if (!S.shopping) S.shopping = { checked: {}, weekStart: null };
  const wk = thisWeekKey();
  if (S.shopping.weekStart !== wk) {
    S.shopping.checked = {};
    S.shopping.weekStart = wk;
    save();
  }
}

function _nutriPlan() {
  ensureShopping();
  const checked = S.shopping.checked || {};

  const meals = DAY_PLAN.map((m, i) => `
    <div class="plan-meal">
      <div class="plan-meal-head">
        <span class="plan-meal-name">${m.emoji} ${m.name}</span>
        <button class="copy-pill" onclick="logDayMeal(${i})">Logger</button>
      </div>
      <div class="plan-meal-items">${m.items}</div>
      <div class="plan-meal-macros">${m.calories} kcal · ${m.protein} g prot · ${m.carbs} g gluc · ${m.fat} g lip</div>
    </div>`).join('');

  const shop = SHOPPING_LIST.map(g => `
    <div class="shop-group">
      <div class="shop-cat">${g.cat}</div>
      ${g.items.map(it => {
        const on = !!checked[it];
        return `<label class="shop-item${on?' on':''}" onclick="toggleShopItem('${it.replace(/'/g,"\\'")}')">
          <span class="shop-box">${on?'✓':''}</span>${it}
        </label>`;
      }).join('')}
    </div>`).join('');

  return `
    <div class="card">
      <div class="sect-row" style="margin-bottom:12px">
        <span class="sect-lbl">🍽️ Journée type</span>
        <span class="t3" style="font-size:10px">≈ 2300 kcal · 175 g prot</span>
      </div>
      ${meals}
      <div class="plan-note">Jour OFF (repos) : viser <b>2000-2100 kcal</b>, réduire surtout les glucides.</div>
    </div>

    <div class="card">
      <div class="sect-lbl" style="margin-bottom:10px">⚖️ Règles d'ajustement</div>
      <ul class="plan-rules">
        <li>Poids <b>stable 2 semaines</b> → −200 kcal (glucides) pour relancer la perte de gras.</li>
        <li>Force qui <b>baisse</b> ou fatigue → +150-200 kcal, garder les protéines hautes.</li>
        <li>Protéines <b>non négociables</b> : ~175 g/jour même les jours OFF.</li>
        <li>Eau ≥ 2,5 L · sommeil 7-8 h : leviers de recomp aussi importants que la salle.</li>
      </ul>
    </div>

    <div class="card">
      <div class="sect-row" style="margin-bottom:10px">
        <span class="sect-lbl">🛒 Liste de courses</span>
        <button class="copy-pill" onclick="resetShopping()">Réinitialiser</button>
      </div>
      ${shop}
      <div class="shop-avoid"><b>À éviter :</b> ${SHOPPING_AVOID.join(' · ')}</div>
    </div>
  `;
}

function _nutriStats() {
  const days7  = Array.from({length:7},  (_,i)=>{ const d=new Date(); d.setDate(d.getDate()-6+i);  return localDateStr(d); });
  const days30 = Array.from({length:30}, (_,i)=>{ const d=new Date(); d.setDate(d.getDate()-29+i); return localDateStr(d); });
  const get  = (date,key) => (S.nutrition||[]).filter(n=>n.date===date).reduce((s,n)=>s+(n[key]||0),0);
  const avgA = arr => { const f=arr.filter(v=>v>0); return f.length ? Math.round(f.reduce((s,v)=>s+v,0)/f.length) : 0; };
  const avg7Cal  = avgA(days7.map( d=>get(d,'calories')));
  const avg7Prot = avgA(days7.map( d=>get(d,'protein')));
  const avg30Cal = avgA(days30.map(d=>get(d,'calories')));
  let streak=0;
  for(let i=0;i<90;i++){
    const d=new Date(); d.setDate(d.getDate()-i);
    const ds=localDateStr(d);
    if((S.nutrition||[]).some(n=>n.date===ds)) streak++;
    else if(i>0) break;
  }
  return `
    <div class="stats-grid">
      <div class="stat-box">
        <div class="stat-lbl">Moy. 7 jours</div>
        <div class="stat-num" style="font-size:20px">${avg7Cal||'—'}<span class="stat-unit"> kcal</span></div>
        <div class="stat-sub">Obj. ${NUTRI_TARGETS.calories}</div>
      </div>
      <div class="stat-box">
        <div class="stat-lbl">Protéines · 7j</div>
        <div class="stat-num" style="font-size:20px">${avg7Prot||'—'}<span class="stat-unit"> g</span></div>
        <div class="stat-sub">Obj. ${NUTRI_TARGETS.protein}g</div>
      </div>
      <div class="stat-box">
        <div class="stat-lbl">Moy. 30 jours</div>
        <div class="stat-num" style="font-size:20px">${avg30Cal||'—'}<span class="stat-unit"> kcal</span></div>
        <div class="stat-sub">Calories</div>
      </div>
      <div class="stat-box">
        <div class="stat-lbl">Streak</div>
        <div class="stat-num" style="font-size:20px">${streak}<span class="stat-unit"> j</span></div>
        <div class="stat-sub">Jours de log</div>
      </div>
    </div>

    <div class="card">
      <div class="sect-lbl" style="margin-bottom:16px">Objectifs calculés · Prise de masse</div>
      <div>
        <div class="nutri-target-row"><span class="nutri-target-lbl">Calories/jour</span><span class="nutri-target-val">${NUTRI_TARGETS.calories} kcal</span></div>
        <div class="divider"></div>
        <div class="nutri-target-row"><span class="nutri-target-lbl">Protéines/jour</span><span class="nutri-target-val">${NUTRI_TARGETS.protein} g</span></div>
        <div class="divider"></div>
        <div class="nutri-target-row"><span class="nutri-target-lbl">Surplus calorique</span><span class="nutri-target-val" style="color:var(--green)">+500 kcal</span></div>
        <div class="divider"></div>
        <div class="nutri-target-row"><span class="nutri-target-lbl">TDEE estimé</span><span class="nutri-target-val">2 455 kcal</span></div>
      </div>
      <div style="margin-top:12px;font-size:11px;color:var(--t3);line-height:1.8">
        Calculé pour 61 kg · 1m75 · ~25 ans · activité modérée-élevée.<br>
        Protéines : 2,5 g/kg · BMR Mifflin-St Jeor.
      </div>
    </div>

    <div class="charts-pair">
      <div class="card" style="margin-bottom:0">
        <div class="chart-lbl"><span>Calories · 7 jours</span></div>
        <div class="chart-wrap chart-wrap-sm"><canvas id="chart-cal"></canvas></div>
      </div>
      <div class="card" style="margin-bottom:0">
        <div class="chart-lbl"><span>Protéines · 7 jours</span></div>
        <div class="chart-wrap chart-wrap-sm"><canvas id="chart-prot"></canvas></div>
      </div>
    </div>

    <div class="charts-pair">
      <div class="card" style="margin-bottom:0">
        <div class="chart-lbl"><span>Glucides · 7 jours</span></div>
        <div class="chart-wrap chart-wrap-sm"><canvas id="chart-carbs"></canvas></div>
      </div>
      <div class="card" style="margin-bottom:0">
        <div class="chart-lbl"><span>Lipides · 7 jours</span></div>
        <div class="chart-wrap chart-wrap-sm"><canvas id="chart-fat"></canvas></div>
      </div>
    </div>

    <div class="card">
      <div class="chart-lbl"><span>Hydratation · 30 jours</span><span style="font-size:11px;color:var(--t3)">% objectif ${NUTRI_TARGETS.water/1000}L</span></div>
      <div class="chart-wrap" style="height:140px"><canvas id="chart-water"></canvas></div>
    </div>
  `;
}

function _nutriWeight() {
  const weights = [...(S.weights||[])].sort((a,b)=>a.date.localeCompare(b.date));
  const latest  = weights[weights.length-1];
  const first   = weights[0];
  const diff    = latest && first && weights.length > 1 ? +(latest.weight - first.weight).toFixed(1) : null;
  const todayW  = (S.weights||[]).find(w => w.date === todayStr());
  return `
    <div class="card">
      <div class="sect-lbl" style="margin-bottom:14px">Logger mon poids</div>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-lbl">Poids (kg)</label>
          <input type="number" class="form-inp" inputmode="decimal" step="0.1" id="w-weight"
            value="${todayW ? todayW.weight : ''}" placeholder="${latest ? latest.weight : '61.0'}">
        </div>
        <div class="form-group">
          <label class="form-lbl">Date</label>
          <input type="date" class="form-inp" id="w-date" value="${todayStr()}">
        </div>
      </div>
      <button class="btn btn-primary" onclick="logWeight()">Enregistrer</button>
    </div>

    ${weights.length > 0 ? `
    <div class="stats-grid">
      <div class="stat-box">
        <div class="stat-lbl">Dernier pesée</div>
        <div class="stat-num">${latest.weight}<span class="stat-unit"> kg</span></div>
        <div class="stat-sub">${formatDate(latest.date)}</div>
      </div>
      <div class="stat-box">
        <div class="stat-lbl">Évolution</div>
        <div class="stat-num" style="color:var(--t1)">
          ${diff!==null?(diff>0?'+':'')+diff:'—'}<span class="stat-unit"> kg</span>
        </div>
        <div class="stat-sub">${weights.length>1?weights.length+' mesures':'Première mesure'}</div>
      </div>
    </div>

    <div class="card">
      <div class="chart-lbl"><span>Évolution du poids</span></div>
      <div class="chart-wrap"><canvas id="chart-weight"></canvas></div>
    </div>

    <div class="card">
      <div class="sect-lbl" style="margin-bottom:14px">Historique</div>
      ${[...weights].reverse().slice(0,10).map(w=>`
        <div class="nutri-entry">
          <div class="nutri-entry-info">
            <div style="font-size:13px;color:var(--t1)">${w.weight} kg</div>
            <div style="font-size:11px;color:var(--t3);margin-top:2px">${formatDate(w.date)}</div>
          </div>
          <button class="copy-pill" onclick="deleteWeight('${w.id}')" style="color:var(--red)">×</button>
        </div>
      `).join('')}
    </div>` : `<div class="empty"><div class="empty-icon">—</div><h3>Aucune mesure</h3><p>Commence à logger ton poids pour suivre ta progression.</p></div>`}
  `;
}

function togglePresetCat(catId) {
  const items = document.getElementById('pcat-' + catId);
  const arrow  = document.getElementById('parrow-' + catId);
  if (!items) return;
  const open = items.style.display !== 'none';
  items.style.display = open ? 'none' : 'block';
  arrow?.classList.toggle('open', !open);
}

function updatePresetCalc(idx) {
  const p = MEAL_PRESETS[idx];
  if (!p?.perG) return;
  const g = parseFloat(document.getElementById(`preset-g-${idx}`)?.value) || p.defaultG;
  const cal   = Math.ceil(p.perG.cal * g);
  const prot  = Math.ceil(p.perG.prot * g);
  const carbs = Math.round((p.perG.carbs || 0) * g);
  const fat   = Math.round((p.perG.fat || 0) * g);
  const el = document.getElementById(`preset-macros-${idx}`);
  if (el) el.innerHTML = `<span class="preset-cal">${cal} kcal</span><span class="preset-dot">·</span><span class="preset-prot">${prot}g prot.</span>${carbs>0?`<span class="preset-dot">·</span><span class="preset-carbs">${carbs}g gluc.</span>`:''}${fat>0?`<span class="preset-dot">·</span><span class="preset-fat">${fat}g lip.</span>`:''}`;
}

function addWater(ml) {
  const d = nutriDate;
  if (!S.hydration) S.hydration = {};
  S.hydration[d] = Math.max(0, (S.hydration[d] || 0) + ml);
  save();
  renderNutrition();
}

function logNutriPreset(idx) {
  const p = MEAL_PRESETS[idx];
  if (!p) return;
  let cal = p.calories, prot = p.protein, carbs = p.carbs || 0, fat = p.fat || 0;
  if (p.perG) {
    const g = parseFloat(document.getElementById(`preset-g-${idx}`)?.value) || p.defaultG;
    cal   = Math.ceil(p.perG.cal * g);
    prot  = Math.ceil(p.perG.prot * g);
    carbs = Math.round((p.perG.carbs || 0) * g);
    fat   = Math.round((p.perG.fat || 0) * g);
  }
  if (!S.nutrition) S.nutrition = [];
  S.nutrition.push({ id: uid(), date: nutriDate, calories: cal, protein: prot, carbs, fat, note: p.note });
  save();
  haptic([4]);
  showToast(`${p.emoji} ${p.name} ajouté`);
  renderNutrition();
}

function logDayMeal(idx) {
  const m = DAY_PLAN[idx];
  if (!m) return;
  if (!S.nutrition) S.nutrition = [];
  S.nutrition.push({ id: uid(), date: nutriDate, calories: m.calories, protein: m.protein, carbs: m.carbs, fat: m.fat, note: m.name });
  save();
  haptic([4]);
  showToast(`${m.emoji} ${m.name} ajouté`);
  nutriTab = 'today';
  renderNutrition();
}

function toggleShopItem(item) {
  ensureShopping();
  S.shopping.checked[item] = !S.shopping.checked[item];
  save();
  haptic([4]);
  renderNutrition();
}

function resetShopping() {
  if (!S.shopping) S.shopping = { checked: {}, weekStart: null };
  S.shopping.checked = {};
  S.shopping.weekStart = thisWeekKey();
  save();
  haptic([8]);
  showToast('Liste réinitialisée');
  renderNutrition();
}

function logNutrition() {
  const cal   = parseInt(document.getElementById('n-cal')?.value)   || 0;
  const prot  = parseFloat(document.getElementById('n-prot')?.value) || 0;
  const carbs = parseInt(document.getElementById('n-carbs')?.value) || 0;
  const fat   = parseInt(document.getElementById('n-fat')?.value)   || 0;
  const note  = document.getElementById('n-note')?.value || '';
  if (!cal && !prot) { showToast('Entre calories ou protéines'); return; }
  if (!S.nutrition) S.nutrition = [];
  S.nutrition.push({ id: uid(), date: nutriDate, calories: cal, protein: prot, carbs, fat, note });
  save();
  showToast('Repas ajouté');
  renderNutrition();
}

function deleteNutrition(id) {
  S.nutrition = (S.nutrition || []).filter(n => n.id !== id);
  save(); renderNutrition();
}

function logWeight() {
  const w    = parseFloat(document.getElementById('w-weight')?.value);
  const date = document.getElementById('w-date')?.value || todayStr();
  if (!w || w <= 0) { showToast('Entre ton poids'); return; }
  if (!S.weights) S.weights = [];
  S.weights = S.weights.filter(x => x.date !== date);
  S.weights.push({ id: uid(), date, weight: w });
  save();
  showToast(`${w} kg enregistré`);
  renderNutrition();
}

function deleteWeight(id) {
  S.weights = (S.weights || []).filter(w => w.id !== id);
  save(); renderNutrition();
}

function setNutriTab(tab) { nutriTab = tab; renderNutrition(); }
function setNutriDate(date) { nutriDate = date || todayStr(); renderNutrition(); }

function calcCaloriesBurned(date) {
  const runCal  = (S.runs  ||[]).filter(r=>r.date===date).reduce((s,r)=>s+(r.calories||Math.round((r.distance||0)*CAL_PER_KM)),0);
  const rideCal = (S.rides ||[]).filter(r=>r.date===date).reduce((s,r)=>s+(r.calories||Math.round((r.km||0)*40)),0);
  const wkCal   = (S.workouts||[]).filter(w=>w.date===date).reduce((s,w)=>s+Math.round(((w.duration||2700)/60)*5),0);
  return runCal + rideCal + wkCal;
}

function buildNutriCharts() {
  if (typeof Chart === 'undefined') return;
  destroyNutriCharts();
  const dark = document.documentElement.dataset.theme !== 'light';
  const grid = dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.05)';
  Chart.defaults.color = dark ? '#555555' : '#999999';
  Chart.defaults.borderColor = grid;
  Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif";
  Chart.defaults.font.size = 10;

  const days7 = Array.from({length:7}, (_,i)=>{ const d=new Date(); d.setDate(d.getDate()-6+i); return localDateStr(d); });
  const dayLbls = days7.map(d=>{ const dt=new Date(d+'T12:00:00'); return `${dt.getDate()}/${dt.getMonth()+1}`; });

  const cc = document.getElementById('chart-cal')?.getContext('2d');
  if (cc) {
    const data = days7.map(d=>(S.nutrition||[]).filter(n=>n.date===d).reduce((s,n)=>s+n.calories,0)||null);
    nutriCharts.cal = new Chart(cc, {
      type:'bar',
      data:{ labels:dayLbls, datasets:[{ data, backgroundColor:'#0A0A0A80', borderColor:'#0A0A0A', borderWidth:0, borderRadius:4 }]},
      options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false} },
        scales:{ x:{grid:{display:false},ticks:{maxRotation:0}},
          y:{grid:{color:grid}, suggestedMax:NUTRI_TARGETS.calories+200, ticks:{callback:v=>v>=1000?(v/1000).toFixed(1)+'k':v}} }
      }
    });
  }

  const pc = document.getElementById('chart-prot')?.getContext('2d');
  if (pc) {
    const data = days7.map(d=>(S.nutrition||[]).filter(n=>n.date===d).reduce((s,n)=>s+n.protein,0)||null);
    nutriCharts.prot = new Chart(pc, {
      type:'bar',
      data:{ labels:dayLbls, datasets:[{ data, backgroundColor:'#0A0A0A80', borderColor:'#0A0A0A', borderWidth:0, borderRadius:4 }]},
      options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false} },
        scales:{ x:{grid:{display:false},ticks:{maxRotation:0}},
          y:{grid:{color:grid}, suggestedMax:NUTRI_TARGETS.protein+20, ticks:{callback:v=>v+'g'}} }
      }
    });
  }

  const cbc = document.getElementById('chart-carbs')?.getContext('2d');
  if (cbc) {
    const data = days7.map(d=>(S.nutrition||[]).filter(n=>n.date===d).reduce((s,n)=>s+(n.carbs||0),0)||null);
    nutriCharts.carbs = new Chart(cbc, {
      type:'bar',
      data:{ labels:dayLbls, datasets:[{ data, backgroundColor:'#0A0A0A80', borderColor:'#0A0A0A', borderWidth:0, borderRadius:4 }]},
      options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false} },
        scales:{ x:{grid:{display:false},ticks:{maxRotation:0}},
          y:{grid:{color:grid}, suggestedMax:NUTRI_TARGETS.carbs+40, ticks:{callback:v=>v+'g'}} }
      }
    });
  }

  const fc = document.getElementById('chart-fat')?.getContext('2d');
  if (fc) {
    const data = days7.map(d=>(S.nutrition||[]).filter(n=>n.date===d).reduce((s,n)=>s+(n.fat||0),0)||null);
    nutriCharts.fat = new Chart(fc, {
      type:'bar',
      data:{ labels:dayLbls, datasets:[{ data, backgroundColor:'#0A0A0A80', borderColor:'#0A0A0A', borderWidth:0, borderRadius:4 }]},
      options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false} },
        scales:{ x:{grid:{display:false},ticks:{maxRotation:0}},
          y:{grid:{color:grid}, suggestedMax:NUTRI_TARGETS.fat+15, ticks:{callback:v=>v+'g'}} }
      }
    });
  }

  const hwc = document.getElementById('chart-water')?.getContext('2d');
  if (hwc) {
    const days30 = Array.from({length:30}, (_,i)=>{ const d=new Date(); d.setDate(d.getDate()-29+i); return localDateStr(d); });
    const hwLbls = days30.map(d=>{ const dt=new Date(d+'T12:00:00'); return `${dt.getDate()}/${dt.getMonth()+1}`; });
    const hwData = days30.map(d => {
      const ml = (S.hydration||{})[d] || 0;
      return ml > 0 ? Math.round((ml / NUTRI_TARGETS.water) * 100) : null;
    });
    const hwColors = hwData.map(v => v === null ? 'transparent' : v >= 100 ? '#0A0A0A99' : v >= 70 ? '#0A0A0A99' : '#0A0A0A99');
    const hwBorders = hwData.map(v => v === null ? 'transparent' : v >= 100 ? '#0A0A0A' : v >= 70 ? '#0A0A0A' : '#0A0A0A');
    nutriCharts.water = new Chart(hwc, {
      type: 'bar',
      data: { labels: hwLbls, datasets: [{ data: hwData, backgroundColor: hwColors, borderColor: hwBorders, borderWidth: 0, borderRadius: 3 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, annotation: {} },
        scales: {
          x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 10 } },
          y: { grid: { color: grid }, min: 0, max: 120, ticks: { callback: v => v + '%', stepSize: 25 },
            afterDataLimits(ax) { ax.max = 120; } }
        }
      }
    });
  }

  const wc = document.getElementById('chart-weight')?.getContext('2d');
  if (wc) {
    const wdata = [...(S.weights||[])].sort((a,b)=>a.date.localeCompare(b.date)).slice(-30);
    if (wdata.length > 0) {
      const wlbls = wdata.map(w=>{ const d=new Date(w.date+'T12:00:00'); return `${d.getDate()}/${d.getMonth()+1}`; });
      const wvals = wdata.map(w=>w.weight);
      const wmin  = Math.min(...wvals) - 1;
      const wmax  = Math.max(...wvals) + 1;
      nutriCharts.weight = new Chart(wc, {
        type:'line',
        data:{ labels:wlbls, datasets:[{ data:wvals, borderColor:'#0A0A0A', backgroundColor:'rgba(10,10,10,.04)',
          fill:true, tension:.3, pointRadius:3, pointBackgroundColor:'#0A0A0A', spanGaps:true }]},
        options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false} },
          scales:{ x:{grid:{display:false},ticks:{maxRotation:0}},
            y:{grid:{color:grid}, min:wmin, max:wmax, ticks:{callback:v=>(Math.round(v*10)/10)+' kg'}} }
        }
      });
    }
  }
}

// ============================================================
// 6. COURSE & VÉLO
// ============================================================

let runTab = 'run';

function renderRun() {
  document.getElementById('app').innerHTML = seanceHead() + `
    ${runTab === 'run' ? _runForm() : _rideForm()}
    <div class="spacer"></div>
  `;
}

function setRunTab(tab) { runTab = tab; seanceMode = tab; renderRun(); }

function _runForm() {
  return `
    <div class="card">
      <div class="sect-lbl" style="margin-bottom:14px">Logger une course</div>

      <div class="form-group" style="text-align:center">
        <label class="form-lbl">Date</label>
        <input type="date" class="form-inp" id="run-date" value="${todayStr()}">
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-lbl">Distance (km)</label>
          <input type="number" class="form-inp" inputmode="decimal" step="0.1"
            id="run-dist" placeholder="5.0" oninput="calcRun()">
        </div>
        <div class="form-group">
          <label class="form-lbl">Durée (mm:ss)</label>
          <input type="text" class="form-inp" id="run-dur" placeholder="25:30" oninput="calcRun()">
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-lbl">Allure / km</label>
          <div class="form-auto" id="run-pace">--:--</div>
        </div>
        <div class="form-group">
          <label class="form-lbl">Calories (estimé)</label>
          <div class="form-auto" id="run-cal">— kcal</div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-lbl">Dénivelé + (m)</label>
        <input type="number" class="form-inp" inputmode="numeric" id="run-elev" placeholder="0">
      </div>

      <div class="form-group">
        <label class="form-lbl">Ressenti</label>
        <div class="feel-row">
          ${FEEL_LABELS.map((lbl,i)=>`
            <button class="feel-btn ${i===2?'active':''}" data-v="${i+1}" onclick="setFeeling(${i+1})">${lbl}</button>`).join('')}
        </div>
      </div>

      <div class="form-group">
        <label class="form-lbl">Notes</label>
        <textarea class="form-inp" id="run-notes" placeholder="Parcours, météo..."></textarea>
      </div>

      <button class="btn btn-primary mt-8" onclick="saveRun()">Enregistrer la course</button>
    </div>
  `;
}

function _rideForm() {
  return `
    <div class="card">
      <div class="sect-lbl" style="margin-bottom:14px">Logger une sortie vélo</div>

      <div class="form-group" style="text-align:center">
        <label class="form-lbl">Date</label>
        <input type="date" class="form-inp" id="ride-date" value="${todayStr()}">
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-lbl">Distance (km)</label>
          <input type="number" class="form-inp" inputmode="decimal" step="0.1"
            id="ride-dist" placeholder="20.0" oninput="calcRide()">
        </div>
        <div class="form-group">
          <label class="form-lbl">Durée (mm:ss)</label>
          <input type="text" class="form-inp" id="ride-dur" placeholder="60:00" oninput="calcRide()">
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-lbl">Vitesse moy.</label>
          <div class="form-auto" id="ride-speed">-- km/h</div>
        </div>
        <div class="form-group">
          <label class="form-lbl">Calories (estimé)</label>
          <div class="form-auto" id="ride-cal">— kcal</div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-lbl">Dénivelé + (m)</label>
        <input type="number" class="form-inp" inputmode="numeric" id="ride-elev" placeholder="0">
      </div>

      <div class="form-group">
        <label class="form-lbl">Ressenti</label>
        <div class="feel-row">
          ${FEEL_LABELS.map((lbl,i)=>`
            <button class="feel-btn ${i===2?'active':''}" data-v="${i+1}" onclick="setFeeling(${i+1})">${lbl}</button>`).join('')}
        </div>
      </div>

      <div class="form-group">
        <label class="form-lbl">Notes</label>
        <textarea class="form-inp" id="ride-notes" placeholder="Parcours, météo..."></textarea>
      </div>

      <button class="btn btn-primary mt-8" onclick="saveRide()">Enregistrer la sortie</button>
    </div>
  `;
}

function calcRun() {
  const dist = parseFloat(document.getElementById('run-dist')?.value)||0;
  const dur  = parseDur(document.getElementById('run-dur')?.value||'');
  document.getElementById('run-pace').textContent = dist>0&&dur>0 ? fmtPace(dur/dist)+' /km' : '--:--';
  document.getElementById('run-cal').textContent  = dist>0 ? `~${Math.round(dist*CAL_PER_KM)} kcal` : '— kcal';
}

function calcRide() {
  const dist = parseFloat(document.getElementById('ride-dist')?.value)||0;
  const dur  = parseDur(document.getElementById('ride-dur')?.value||'');
  const speed = dist>0&&dur>0 ? (dist/(dur/3600)).toFixed(1)+' km/h' : '-- km/h';
  document.getElementById('ride-speed').textContent = speed;
  document.getElementById('ride-cal').textContent   = dist>0 ? `~${Math.round(dist*40)} kcal` : '— kcal';
}

function setFeeling(v) {
  document.querySelectorAll('.feel-btn').forEach((b,i)=>b.classList.toggle('active',i+1===v));
}

let _savingRun = false;
function saveRun() {
  if (_savingRun) return; _savingRun = true;
  setTimeout(() => { _savingRun = false; }, 3000);
  const dist = parseFloat(document.getElementById('run-dist')?.value)||0;
  const dur  = parseDur(document.getElementById('run-dur')?.value||'');
  const date = document.getElementById('run-date')?.value||todayStr();
  const notes= document.getElementById('run-notes')?.value||'';
  const feel = parseInt(document.querySelector('.feel-btn.active')?.dataset.v||'3');
  const elev = parseInt(document.getElementById('run-elev')?.value)||0;
  if(dist<=0){ _savingRun = false; showToast('Entre la distance'); return; }
  S.runs.push({ id:uid(), date, weekKey:getWeekKey(date), distance:dist, duration:dur, pace:dur>0?dur/dist:0, calories:Math.round(dist*CAL_PER_KM), feeling:feel, notes, elev });
  save();
  haptic([40, 30, 80]);
  showToast(`${dist.toFixed(1)} km · ${fmtPace(dur>0?dur/dist:0)}/km`);
  navigate('dashboard');
}

let _savingRide = false;
function saveRide() {
  if (_savingRide) return; _savingRide = true;
  setTimeout(() => { _savingRide = false; }, 3000);
  const km   = parseFloat(document.getElementById('ride-dist')?.value)||0;
  const dur  = parseDur(document.getElementById('ride-dur')?.value||'');
  const date = document.getElementById('ride-date')?.value||todayStr();
  const notes= document.getElementById('ride-notes')?.value||'';
  const feel = parseInt(document.querySelector('.feel-btn.active')?.dataset.v||'3');
  const elev = parseInt(document.getElementById('ride-elev')?.value)||0;
  if(km<=0){ _savingRide = false; showToast('Entre la distance'); return; }
  if (!S.rides) S.rides = [];
  S.rides.push({ id:uid(), date, weekKey:getWeekKey(date), km, duration:dur, speed:dur>0?(km/(dur/3600)):0, calories:Math.round(km*40), feeling:feel, notes, elev });
  save();
  haptic([40, 30, 80]);
  showToast(`🚴 ${km.toFixed(1)} km · ${Math.round(km*40)} kcal`);
  navigate('dashboard');
}

// ============================================================
// 7. HISTORIQUE
// ============================================================

let histTab = 'workout';

function renderHistory() {
  histTab = 'workout';   // historique musculation uniquement (course/vélo retirés de l'interface)
  const items = [...S.workouts].sort((a,b)=>b.date.localeCompare(a.date));

  const groups = {};
  items.forEach(item=>{
    const d=new Date(item.date+'T12:00:00');
    const k=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    if(!groups[k]) groups[k]={lbl:`${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`,items:[]};
    groups[k].items.push(item);
  });

  document.getElementById('app').innerHTML = progressHead() + `

    ${Object.keys(groups).length===0
      ? `<div class="empty"><div class="empty-icon">—</div><h3>Aucune session</h3><p>Commence à logger tes entraînements.</p></div>`
      : Object.keys(groups).sort().reverse().map(gk=>`
        <div class="month-lbl">${groups[gk].lbl}</div>
        ${groups[gk].items.map(item => histTab==='workout' ? (() => {
          const dlt = sessionVolDelta(item);
          return `
          <div class="hist-item" onclick="openSessionDetail('${item.id}')">
            <div class="hist-icon" style="background:${groupColor(item.muscleGroup)}">${groupShort(item.muscleGroup)}</div>
            <div class="hist-info">
              <div class="hist-title">${sessionTitle(item.muscleGroup, item.weekType)}</div>
              <div class="hist-sub">${/^[AB][12]$/.test(item.weekType) ? `Sem. ${item.weekType[0]} · ` : ''}${formatDate(item.date)} · ${item.exercises.length} exos</div>
            </div>
            <div class="hist-right">
              <div class="hist-vol">${fmtVol(item.totalVolume)} kg</div>
              ${dlt!==null
                ? `<div class="hist-delta ${dlt>=0?'delta-up':'delta-down'}">${dlt>=0?'↑':'↓'} ${Math.abs(dlt).toFixed(1)}%</div>`
                : `<div class="hist-delta delta-neu">1re séance</div>`}
            </div>
            <span class="hist-chev">›</span>
          </div>`;
        })() : histTab==='run' ? `
          <div class="hist-item" onclick="openRunDetail('${item.id}')">
            <div class="hist-icon" style="background:#6E6E6E">KM</div>
            <div class="hist-info">
              <div class="hist-title">${item.distance.toFixed(1)} km${item.elev>0?` · ↑${item.elev}m`:''}</div>
              <div class="hist-sub">${formatDate(item.date)} · ${fmtPace(item.pace)}/km · ${FEEL_LABELS[(item.feeling||3)-1]}</div>
            </div>
            <div class="hist-right">
              <div class="hist-vol">${formatDur(item.duration)}</div>
              <div class="hist-date2">${item.calories} kcal</div>
            </div>
            <span class="hist-chev">›</span>
          </div>
        ` : `
          <div class="hist-item" onclick="openRideDetail('${item.id}')">
            <div class="hist-icon" style="background:#8E8E8E">🚴</div>
            <div class="hist-info">
              <div class="hist-title">${item.km.toFixed(1)} km${item.elev>0?` · ↑${item.elev}m`:''}</div>
              <div class="hist-sub">${formatDate(item.date)} · ${item.speed>0?item.speed.toFixed(1)+' km/h':''} · ${FEEL_LABELS[(item.feeling||3)-1]}</div>
            </div>
            <div class="hist-right">
              <div class="hist-vol">${formatDur(item.duration)}</div>
              <div class="hist-date2">${item.calories} kcal</div>
            </div>
            <span class="hist-chev">›</span>
          </div>
        `).join('')}
      `).join('')}
    <div class="spacer"></div>
  `;
}

function setHistTab(tab) { histTab=tab; renderHistory(); }

function openRideDetail(id) {
  const r = (S.rides||[]).find(x=>x.id===id); if(!r) return;
  showModal(`
    <div class="modal-head">
      <div>
        <div class="t3" style="font-size:13px;font-weight:500;margin-bottom:3px">🚴 Vélo</div>
        <div class="modal-title">${r.km.toFixed(2)} km</div>
        <div class="t3" style="font-size:12px;margin-top:2px">${formatDate(r.date)}</div>
      </div>
      <button class="modal-close" onclick="closeModal()">×</button>
    </div>
    <div class="stats-grid mt-12">
      <div class="stat-box"><div class="stat-lbl">Durée</div><div class="stat-num" style="font-size:22px">${formatDur(r.duration)}</div></div>
      <div class="stat-box"><div class="stat-lbl">Vitesse</div><div class="stat-num" style="font-size:20px">${r.speed>0?r.speed.toFixed(1):'--'}<span class="stat-unit"> km/h</span></div></div>
      <div class="stat-box"><div class="stat-lbl">Calories</div><div class="stat-num">${r.calories}<span class="stat-unit"> kcal</span></div></div>
      ${r.elev>0?`<div class="stat-box"><div class="stat-lbl">Dénivelé+</div><div class="stat-num">${r.elev}<span class="stat-unit"> m</span></div></div>`:`<div class="stat-box"><div class="stat-lbl">Ressenti</div><div class="stat-num" style="font-size:20px">${FEEL_LABELS[(r.feeling||3)-1]}</div></div>`}
    </div>
    ${r.notes?`<div class="t3 mt-12" style="font-size:12px;padding:10px;background:var(--surface2);border-radius:var(--r-xs);border:1px solid var(--border)">${r.notes}</div>`:''}
    <button class="btn btn-danger btn-sm mt-12" onclick="deleteRide('${id}')">Supprimer cette sortie</button>
  `);
}

function deleteRide(id) { if(!confirm('Supprimer ?')) return; S.rides=(S.rides||[]).filter(r=>r.id!==id); save(); closeModal(); renderHistory(); }

function exportCSV(type) {
  let csv, filename;
  if (type === 'workout') {
    const rows = [['Date','Muscle','Semaine','Volume (kg)','Exercice','Série','Poids (kg)','Reps']];
    S.workouts.sort((a,b)=>a.date.localeCompare(b.date)).forEach(w => {
      w.exercises.forEach(ex => {
        ex.sets.forEach((s,i) => {
          rows.push([w.date, groupLabel(w.muscleGroup), w.weekType, w.totalVolume, ex.name, i+1, s.weight, s.reps]);
        });
      });
    });
    csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    filename = 'tempo-musculation.csv';
  } else {
    const rows = [['Date','Distance (km)','Durée (s)','Allure (s/km)','Calories','Ressenti','Notes']];
    S.runs.sort((a,b)=>a.date.localeCompare(b.date)).forEach(r => {
      rows.push([r.date, r.distance, r.duration, Math.round(r.pace), r.calories, FEEL_LABELS[(r.feeling||3)-1], r.notes||'']);
    });
    csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    filename = 'tempo-course.csv';
  }
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
  showToast('Export CSV téléchargé ✓');
}

function openSessionDetail(id) {
  const s = S.workouts.find(w=>w.id===id); if(!s) return;
  showModal(`
    <div class="modal-head">
      <div>
        <div class="t3" style="font-size:13px;font-weight:500;margin-bottom:3px">${sessionTitle(s.muscleGroup, s.weekType)}${/^[AB][12]$/.test(s.weekType) ? ' · semaine ' + s.weekType[0] : ''}</div>
        <div class="modal-title">${fmtVol(s.totalVolume)} kg</div>
        <div class="t3" style="font-size:12px;margin-top:2px">${formatDate(s.date)}</div>
      </div>
      <button class="modal-close" onclick="closeModal()">×</button>
    </div>
    ${s.exercises.map(ex=>{
      const ev=ex.sets.reduce((t,ss)=>t+(ss.weight*ss.reps),0);
      return `<div class="detail-ex">
        <div class="detail-name">${ex.name} <span class="t3" style="font-size:11px;font-weight:600">· ${fmtVol(ev)} kg</span></div>
        <div>${ex.sets.map((ss,i)=>`<span class="detail-tag">S${i+1} ${ss.weight} kg × ${ss.reps}</span>`).join('')}</div>
      </div>`;
    }).join('')}
    ${s.notes?`<div class="t3 mt-12" style="font-size:12px;padding:10px;background:var(--surface2);border-radius:var(--r-xs);border:1px solid var(--border)">${s.notes}</div>`:''}
    <button class="btn btn-danger btn-sm mt-12" onclick="deleteWorkout('${id}')">Supprimer cette séance</button>
  `);
}

function openRunDetail(id) {
  const r = S.runs.find(x=>x.id===id); if(!r) return;
  showModal(`
    <div class="modal-head">
      <div>
        <div class="t3" style="font-size:13px;font-weight:500;margin-bottom:3px">Course</div>
        <div class="modal-title">${r.distance.toFixed(2)} km</div>
        <div class="t3" style="font-size:12px;margin-top:2px">${formatDate(r.date)}</div>
      </div>
      <button class="modal-close" onclick="closeModal()">×</button>
    </div>
    <div class="stats-grid mt-12">
      <div class="stat-box"><div class="stat-lbl">Durée</div><div class="stat-num" style="font-size:22px">${formatDur(r.duration)}</div></div>
      <div class="stat-box"><div class="stat-lbl">Allure</div><div class="stat-num" style="font-size:20px">${fmtPace(r.pace)}<span class="stat-unit">/km</span></div></div>
      <div class="stat-box"><div class="stat-lbl">Calories</div><div class="stat-num">${r.calories}<span class="stat-unit"> kcal</span></div></div>
      ${r.elev>0?`<div class="stat-box"><div class="stat-lbl">Dénivelé+</div><div class="stat-num">${r.elev}<span class="stat-unit"> m</span></div></div>`:`<div class="stat-box"><div class="stat-lbl">Ressenti</div><div class="stat-num" style="font-size:20px">${FEEL_LABELS[(r.feeling||3)-1]}</div></div>`}
    </div>
    ${r.notes?`<div class="t3 mt-12" style="font-size:12px;padding:10px;background:var(--surface2);border-radius:var(--r-xs);border:1px solid var(--border)">${r.notes}</div>`:''}
    <button class="btn btn-danger btn-sm mt-12" onclick="deleteRun('${id}')">Supprimer cette course</button>
  `);
}

function deleteWorkout(id) { if(!confirm('Supprimer ?')) return; S.workouts=S.workouts.filter(w=>w.id!==id); save(); closeModal(); renderHistory(); }
function deleteRun(id)     { if(!confirm('Supprimer ?')) return; S.runs=S.runs.filter(r=>r.id!==id); save(); closeModal(); renderHistory(); }

// ============================================================
// 8. STATISTIQUES
// ============================================================

let charts = {};
let period = 4;

function buildKiviatSVG() {
  const N = MUSCLE_KEYS.length;
  const W = 320, H = 280, CX = 140, CY = 140, R = 90, LEVELS = 5;
  const dark = document.documentElement.dataset.theme !== 'light';
  const angles = MUSCLE_KEYS.map((_, i) => (2 * Math.PI * i / N) - Math.PI / 2);
  const colors = MUSCLE_KEYS.map(k => WORKOUT_PLAN[k].color);
  const labels = MUSCLE_KEYS.map(k => WORKOUT_PLAN[k].label);
  const rv = MUSCLE_KEYS.map(k => getMuscleProgression(k).recent);
  const pv = MUSCLE_KEYS.map(k => getMuscleProgression(k).prev);
  const maxVal = Math.max(...rv, ...pv, 1);

  const px = (i, val) => CX + (val / maxVal) * R * Math.cos(angles[i]);
  const py = (i, val) => CY + (val / maxVal) * R * Math.sin(angles[i]);
  const gx = (i, lv)  => CX + (lv / LEVELS) * R * Math.cos(angles[i]);
  const gy = (i, lv)  => CY + (lv / LEVELS) * R * Math.sin(angles[i]);

  const gridColor  = dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.07)';
  const fillRecent = dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.05)';
  const strokeR    = dark ? 'rgba(255,255,255,.75)' : 'rgba(0,0,0,.65)';

  // Grid pentagons
  const grid = Array.from({length: LEVELS}, (_, l) =>
    `<polygon points="${MUSCLE_KEYS.map((_,i)=>`${gx(i,l+1)},${gy(i,l+1)}`).join(' ')}" fill="none" stroke="${gridColor}" stroke-width="1"/>`
  ).join('');

  // Colored axis lines
  const axes = MUSCLE_KEYS.map((_, i) =>
    `<line x1="${CX}" y1="${CY}" x2="${gx(i,LEVELS)}" y2="${gy(i,LEVELS)}" stroke="${colors[i]}" stroke-width="1.5" stroke-opacity=".45"/>`
  ).join('');

  // Colored sector fills (very subtle)
  const sectors = MUSCLE_KEYS.map((_, i) => {
    const a0 = angles[i] - Math.PI / N, a1 = angles[i] + Math.PI / N;
    const x0 = CX + R * Math.cos(a0), y0 = CY + R * Math.sin(a0);
    const x1 = CX + R * Math.cos(a1), y1 = CY + R * Math.sin(a1);
    return `<polygon points="${CX},${CY} ${x0},${y0} ${x1},${y1}" fill="${colors[i]}" fill-opacity=".04"/>`;
  }).join('');

  // Polygons
  const prevPoly   = MUSCLE_KEYS.map((_,i)=>`${px(i,pv[i])},${py(i,pv[i])}`).join(' ');
  const recentPoly = MUSCLE_KEYS.map((_,i)=>`${px(i,rv[i])},${py(i,rv[i])}`).join(' ');

  // Colored dots on recent polygon
  const dots = MUSCLE_KEYS.map((_, i) =>
    `<circle cx="${px(i,rv[i])}" cy="${py(i,rv[i])}" r="4.5" fill="${colors[i]}" stroke="${dark?'#0a0a0a':'#fff'}" stroke-width="1.5"/>`
  ).join('');

  // Labels — short names to avoid overflow
  const shortLabels = { bras:'Bras', pec:'Pecto.', dos:'Dos', epaules:'Épau.', jambes:'Jambes' };
  const lblEls = MUSCLE_KEYS.map((k, i) => {
    const a = angles[i], lr = R + 18;
    const x = CX + lr * Math.cos(a), y = CY + lr * Math.sin(a);
    const anchor = Math.cos(a) > 0.1 ? 'start' : Math.cos(a) < -0.1 ? 'end' : 'middle';
    return `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle" fill="${colors[i]}" font-size="11" font-weight="700" font-family="-apple-system,BlinkMacSystemFont,sans-serif">${shortLabels[k]||labels[i]}</text>`;
  }).join('');

  return `<svg viewBox="-10 -10 ${W+30} ${H+20}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">
    ${sectors}${grid}${axes}
    <polygon points="${prevPoly}" fill="rgba(140,140,140,.06)" stroke="rgba(140,140,140,.3)" stroke-width="1.5" stroke-dasharray="4 3"/>
    <polygon points="${recentPoly}" fill="${fillRecent}" stroke="${strokeR}" stroke-width="2"/>
    ${dots}${lblEls}
  </svg>`;
}

function renderStats() {
  const bestVol = (() => { const wks=[...new Set(S.workouts.map(w=>w.weekKey))]; return wks.length?Math.round(Math.max(...wks.map(wk=>totalVol(wk)))):0; })();
  const avgPace = (() => { const ps=S.runs.filter(r=>r.pace>0).map(r=>r.pace); return ps.length?fmtPace(ps.reduce((s,p)=>s+p,0)/ps.length):'--:--'; })();

  document.getElementById('app').innerHTML = progressHead() + `
    <div class="period-row">
      <button class="period-btn ${period===2?'active':''}" onclick="setPeriod(2)">2 sem.</button>
      <button class="period-btn ${period===4?'active':''}" onclick="setPeriod(4)">1 mois</button>
      <button class="period-btn ${period===12?'active':''}" onclick="setPeriod(12)">3 mois</button>
    </div>

    <div class="stats-grid">
      <div class="stat-box">
        <div class="stat-lbl">Séances</div>
        <div class="stat-num">${S.workouts.length}</div>
        <div class="stat-sub">Musculation</div>
      </div>
      <div class="stat-box">
        <div class="stat-lbl">Volume total</div>
        <div class="stat-num">${(S.workouts.reduce((t,w)=>t+(w.totalVolume||0),0)/1000).toFixed(0)}<span class="stat-unit"> t</span></div>
        <div class="stat-sub">Toutes séances</div>
      </div>
      <div class="stat-box">
        <div class="stat-lbl">Meilleure sem.</div>
        <div class="stat-num" style="font-size:22px">${(bestVol/1000).toFixed(1)}<span class="stat-unit"> t</span></div>
        <div class="stat-sub">Volume muscu</div>
      </div>
      <div class="stat-box">
        <div class="stat-lbl">Durée moy.</div>
        <div class="stat-num" style="font-size:22px">${(() => { const d = S.workouts.filter(w => w.duration > 0); return d.length ? formatDur(Math.round(d.reduce((t, w) => t + w.duration, 0) / d.length)) : '—'; })()}</div>
        <div class="stat-sub">Par séance</div>
      </div>
    </div>

    <!-- KIVIAT RADAR SVG -->
    <div class="card">
      <div class="chart-lbl" style="margin-bottom:8px">
        <span>Kiviat · Volume par muscle</span>
        <div class="legend">
          <span class="legend-lbl"><span class="legend-dot" style="background:var(--t1);opacity:.7"></span>4 sem.</span>
          <span class="legend-lbl"><span class="legend-dot" style="background:var(--t4)"></span>préc.</span>
        </div>
      </div>
      <div style="width:100%;height:260px">${buildKiviatSVG()}</div>
    </div>

    <!-- PROGRESSION PAR MUSCLE -->
    <div class="card">
      <div class="sect-row" style="margin-bottom:14px">
        <span class="sect-lbl">Progression · 4 sem. vs précédentes</span>
      </div>
      <div class="prog-grid">
        ${MUSCLE_KEYS.map(k => {
          const m = WORKOUT_PLAN[k];
          const pg = getMuscleProgression(k);
          const cls = pg.pct === null ? 'prog-neu' : pg.pct > 0 ? 'prog-up' : pg.pct < 0 ? 'prog-down' : 'prog-neu';
          const txt = pg.pct === null ? '—' : pg.pct > 0 ? `+${pg.pct.toFixed(0)}%` : `${pg.pct.toFixed(0)}%`;
          return `<div class="prog-box">
            <div class="prog-dot-row">
              <div class="muscle-dot" style="background:${m.color}"></div>
              <span class="prog-name">${m.label}</span>
            </div>
            <div class="prog-vol">${pg.recent>0?fmtVol(pg.recent):'0'}<span class="prog-unit"> kg</span></div>
            <div class="prog-delta ${cls}">${txt}</div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- RECORDS PERSONNELS -->
    <div class="card">
      <div class="sect-row" style="margin-bottom:14px">
        <span class="sect-lbl">Records · 1RM estimé (Epley)</span>
      </div>
      <div class="pr-list">
        ${MUSCLE_KEYS.map(k => {
          const m = WORKOUT_PLAN[k];
          const pr = getBestSet(k);
          return `<div class="pr-row">
            <div class="pr-dot" style="background:${m.color}"></div>
            <div class="pr-info">
              <div class="pr-musc">${m.label}</div>
              ${pr ? `<div class="pr-ex">${pr.exercise}</div>` : ''}
            </div>
            <div>
              <div class="pr-val">${pr ? `${pr.weight} kg × ${pr.reps}` : '—'}</div>
              <div class="pr-sub">${pr ? `≈ ${pr.orm} kg 1RM · ${formatDate(pr.date)}` : 'Aucune séance'}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>


    <div class="card">
      <div class="chart-lbl">
        <span>Volume par muscle</span>
        <div class="legend">
          ${MUSCLE_KEYS.map(k=>`<span class="legend-lbl"><span class="legend-dot" style="background:${WORKOUT_PLAN[k].color}"></span>${WORKOUT_PLAN[k].label}</span>`).join('')}
        </div>
      </div>
      <div class="chart-wrap"><canvas id="chart-muscle"></canvas></div>
    </div>

    <div class="charts-pair">
      <div class="card" style="margin-bottom:0">
        <div class="chart-lbl"><span>Volume total</span></div>
        <div class="chart-wrap chart-wrap-sm"><canvas id="chart-total"></canvas></div>
      </div>
    </div>

    <div class="spacer"></div>
  `;
  requestAnimationFrame(buildCharts);
}

function setPeriod(n) { period=n; destroyCharts(); renderStats(); }

// ============================================================
// 8b. PROFIL & PARAMÈTRES
// ============================================================

function renderProfile() {
  const g   = S.weightGoal || {};
  const p   = S.profile    || {};
  const nut = S.nutGoal    || {};
  const sortedW   = [...(S.weights||[])].sort((a,b)=>a.date.localeCompare(b.date));
  const currentW  = sortedW.length ? sortedW[sortedW.length-1].weight : null;
  const goalKg    = g.kg || 70;
  const initial   = p.name ? p.name[0].toUpperCase() : null;

  document.getElementById('app').innerHTML = profileHead() + `
    <!-- NOM -->
    <div class="prof-header">
      <input id="p-name" class="prof-name-input" type="text"
        value="${p.name||''}" placeholder="Ton prénom" spellcheck="false">
      <div class="prof-meta-row">
        <input id="p-age" class="prof-meta-input" type="number"
          value="${p.age||''}" placeholder="—" min="10" max="99">
        <span class="prof-meta-unit">ans</span>
        <span class="prof-meta-sep">·</span>
        <input id="p-height" class="prof-meta-input" type="number"
          value="${p.height||''}" placeholder="—" min="100" max="250">
        <span class="prof-meta-unit">cm</span>
      </div>
    </div>

    <!-- OBJECTIF POIDS -->
    <div class="card prof-goal-card">
      <div class="prof-goal-top">
        <div>
          <div class="prof-section-lbl">Objectif poids</div>
          <div class="prof-goal-row">
            <input id="g-start" class="prof-goal-from-edit" type="number"
              value="${S.weightGoal?.startKg || currentW || ''}"
              placeholder="${currentW || '—'}" step="0.5" min="30" max="200">
            <span class="prof-goal-unit">kg</span>
            <span class="prof-goal-arrow">→</span>
            <input id="g-kg" class="prof-goal-to" type="number"
              value="${goalKg}" step="0.5" min="30" max="200">
            <span class="prof-goal-unit">kg</span>
          </div>
        </div>
        <div class="prof-goal-date-col">
          <div class="prof-section-lbl">Échéance</div>
          <input id="g-date" class="prof-date-input" type="date" value="${g.date||''}">
        </div>
      </div>
      <div class="chart-wrap" style="height:185px;margin-top:18px">
        <canvas id="chart-weight-goal"></canvas>
      </div>
      <div class="prof-legend">
        <span class="prof-legend-item">
          <span class="prof-legend-dash" style="border-color:#0A0A0A"></span>Ligne cible
        </span>
        <span class="prof-legend-item">
          <span class="prof-legend-solid"></span>Réel
        </span>
      </div>
    </div>

    <!-- SETTINGS GROUPS -->
    <div class="prof-group-lbl">Cloud Sync</div>
    ${currentUser ? `
    <div class="prof-settings-card" style="padding:20px 18px">
      <div style="display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center">
        ${currentUser.photoURL
          ? `<img src="${currentUser.photoURL}" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:3px solid var(--green);box-shadow:0 0 0 4px rgba(10,10,10,.06)">`
          : `<div style="width:72px;height:72px;border-radius:50%;background:var(--c-dos);display:flex;align-items:center;justify-content:center;font-size:28px;color:#fff;font-weight:700">${(currentUser.displayName||'?')[0].toUpperCase()}</div>`}
        <div>
          <div style="font-size:16px;font-weight:600;color:var(--t1)">${currentUser.displayName||'Connecté'}</div>
          <div style="font-size:12px;color:var(--t3);margin-top:2px">${currentUser.email}</div>
          <div style="font-size:11px;color:var(--green);margin-top:6px;font-weight:500">✓ Synchronisé</div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="signOutUser()" style="margin-top:4px">Se déconnecter</button>
      </div>
    </div>
    ` : `
    <div class="prof-settings-card">
      <div class="prof-row">
        <div class="prof-row-left">
          <span class="prof-row-dot" style="background:var(--c-dos)"></span>
          <span class="prof-row-label">Sauvegarder dans le cloud</span>
        </div>
        <div class="prof-row-right">
          <button class="btn btn-ghost btn-sm" onclick="showSyncModal()">Connecter</button>
        </div>
      </div>
    </div>
    `}

    <div class="prof-group-lbl">Rappels</div>
    <div class="prof-settings-card">
      <div class="prof-row">
        <div class="prof-row-left">
          <span class="prof-row-dot" style="background:var(--green)"></span>
          <span class="prof-row-label">Rappel entraînement</span>
        </div>
        <div class="prof-row-right">
          <button class="btn btn-ghost btn-sm" onclick="askNotifPermission()" id="notif-btn">
            ${notifPermission() === 'granted' ? 'Activées ✓' : notifPermission() === 'unsupported' ? 'Indisponible' : 'Activer'}
          </button>
        </div>
      </div>
    </div>

    <div class="prof-group-lbl">Sauvegardes</div>
    <div class="prof-settings-card">
      <div class="prof-row">
        <div class="prof-row-left"><span class="prof-row-label">Sauvegardes de secours</span></div>
        <div class="prof-row-right"><button class="btn btn-ghost btn-sm" onclick="showBackupsModal()">Voir</button></div>
      </div>
    </div>

    <button class="btn btn-primary" onclick="saveProfile()"
      style="width:100%;margin-top:4px;margin-bottom:20px">Enregistrer</button>
    <div class="spacer"></div>
  `;
  requestAnimationFrame(buildWeightChart);
}

function buildWeightChart() {
  if(typeof Chart === 'undefined') return;
  if(charts.weightGoal) { try { charts.weightGoal.destroy(); } catch {} delete charts.weightGoal; }
  const wgc = document.getElementById('chart-weight-goal')?.getContext('2d');
  if(!wgc) return;

  const dark       = document.documentElement.dataset.theme !== 'light';
  const goalKg     = S.weightGoal?.kg || 70;
  const sortedW    = [...(S.weights||[])].sort((a,b) => a.date.localeCompare(b.date));
  const startDate  = sortedW.length ? sortedW[0].date : todayStr();
  const startWeight = S.weightGoal?.startKg
    || (sortedW.length ? sortedW[0].weight : goalKg);

  const defWeeks = Math.max(12, Math.ceil(Math.abs(startWeight - goalKg) / 0.5));
  const defEnd = (() => { const d = new Date(startDate); d.setDate(d.getDate() + defWeeks * 7); return d.toISOString().slice(0,10); })();
  const endDate    = S.weightGoal?.date || defEnd;
  const displayEnd = endDate > todayStr() ? endDate : todayStr();

  // Gradients
  const h = 185;
  const gradReal = wgc.createLinearGradient(0, 0, 0, h);
  gradReal.addColorStop(0, dark ? 'rgba(224,224,224,.18)' : 'rgba(20,20,20,.12)');
  gradReal.addColorStop(1, dark ? 'rgba(224,224,224,0)'   : 'rgba(20,20,20,0)');
  const gradTarget = wgc.createLinearGradient(0, 0, 0, h);
  gradTarget.addColorStop(0, 'rgba(10,10,10,.08)');
  gradTarget.addColorStop(1, 'rgba(10,10,10,0)');

  const labels = [], targetLine = [], actualLine = [];
  const d0 = new Date(startDate);
  const dEnd = new Date(displayEnd);
  const totalDays = Math.max(1, Math.round((new Date(endDate) - d0) / 86400000));
  const weightDiff = startWeight - goalKg;

  let cur = new Date(d0);
  while(cur <= dEnd) {
    const dateStr = cur.toISOString().slice(0,10);
    const dayN    = Math.round((cur - d0) / 86400000);
    labels.push(cur.toLocaleDateString('fr-FR', { day:'2-digit', month:'2-digit' }));
    targetLine.push(+(startWeight - weightDiff * Math.min(dayN, totalDays) / totalDays).toFixed(1));
    const entry = sortedW.find(w => w.date === dateStr);
    actualLine.push(entry ? entry.weight : null);
    cur.setDate(cur.getDate() + 7);
  }

  const tickColor = dark ? '#3a3a3a' : '#ccc';
  const allW = sortedW.map(w => w.weight);
  const yMin = Math.min(goalKg, startWeight, ...allW) - 1.5;
  const yMax = Math.max(goalKg, startWeight, ...allW) + 1.5;

  charts.weightGoal = new Chart(wgc, {
    type: 'line',
    data: { labels, datasets: [
      {
        label: 'Ligne cible',
        data: targetLine,
        borderColor: '#0A0A0A',
        borderWidth: 1.5,
        borderDash: [5, 6],
        pointRadius: 0,
        fill: true,
        backgroundColor: gradTarget,
        tension: 0,
      },
      {
        label: 'Mon poids réel',
        data: actualLine,
        borderColor: dark ? '#d0d0d0' : '#1a1a1a',
        backgroundColor: gradReal,
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: dark ? '#d0d0d0' : '#1a1a1a',
        pointBorderWidth: 0,
        fill: true,
        tension: 0.4,
        spanGaps: false,
      }
    ]},
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y?.toFixed(1)||'-'} kg` } }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { maxRotation: 0, maxTicksLimit: 6, color: tickColor, font: { size: 10 } }
        },
        y: {
          grid: { display: false },
          border: { display: false },
          ticks: { maxTicksLimit: 4, callback: v => (Math.round(v*10)/10) + ' kg', color: tickColor, font: { size: 10 } },
          min: yMin, max: yMax,
        }
      }
    }
  });
}

function saveProfile() {
  S.profile = {
    name: document.getElementById('p-name')?.value?.trim() || '',
    age: parseInt(document.getElementById('p-age')?.value) || null,
    height: parseInt(document.getElementById('p-height')?.value) || null,
  };
  const newKg    = parseFloat(document.getElementById('g-kg')?.value);
  const newStart = parseFloat(document.getElementById('g-start')?.value);
  S.weightGoal = {
    kg:      isNaN(newKg)    ? 70   : newKg,
    startKg: isNaN(newStart) ? null : newStart,
    date:    document.getElementById('g-date')?.value || null,
  };
  // Objectifs nutrition / course : plus modifiables ici, on garde les valeurs enregistrées
  const g = S.nutGoal || {};
  const val = (id, cur, def) => parseInt(document.getElementById(id)?.value) || cur || def;
  S.nutGoal = { cal: val('g-cal', g.cal, 2400), prot: val('g-prot', g.prot, 175), carbs: val('g-carbs', g.carbs, 250), fat: val('g-fat', g.fat, 80), water: val('g-water', g.water, 2500) };
  S.runGoal = val('g-km', S.runGoal, 15);
  RUN_GOAL_KM  = S.runGoal;
  NUTRI_TARGETS = { calories: S.nutGoal.cal, protein: S.nutGoal.prot, carbs: S.nutGoal.carbs, fat: S.nutGoal.fat, water: S.nutGoal.water };
  save();
  showToast('Enregistré ✓');
  buildWeightChart();
}

// ============================================================
// 8a. ÉVOLUTION PAR MUSCLE (Progrès · Évolution)
// ============================================================
// Volume = tonnage de la semaine (poids × reps) des exercices du muscle.
// Charge = indice de force : 1RM estimé (Epley) de chaque exercice comparé à ta 1re fois
// sur cet exercice, moyenné par semaine. Comparable même quand les exercices changent (semaines A/B).

const MUSCLES = ['Pecs', 'Dos', 'Épaules', 'Biceps', 'Triceps', 'Quadriceps', 'Ischios', 'Fessiers', 'Mollets', 'Abdos'];
const SLUG_MUSCLE = {
  Pecs:       ['dc-barre', 'di-halteres', 'ecarte-vis-a-vis', 'di-machine', 'dips', 'ecarte-unilateral', 'dc-halteres', 'di-barre', 'ecarte-halteres', 'dc-smith', 'di-poulie'],
  'Épaules':  ['de-halteres', 'lat-halteres', 'de-machine', 'lat-poulie', 'arnold', 'lat-machine', 'de-smith', 'lat-incline', 'oiseau-poulie', 'face-pull', 'y-raise'],
  Triceps:    ['tri-corde', 'barre-front', 'tri-nuque-poulie', 'tri-poulie', 'tri-assis', 'tate-press'],
  Dos:        ['tractions', 'rowing-barre', 'tirage-horizontal', 'tv-serre', 'rowing-hammer', 'pullover-poulie', 'tv-large', 'rowing-banc-incline', 'rowing-pronation', 'tv-inverse', 'th-large', 'tv-incline'],
  Biceps:     ['curl-barre', 'curl-marteau', 'curl-incline', 'curl-pupitre', 'curl-alterne', 'curl-poulie', 'curl-marteau-pupitre', 'curl-concentre'],
  Quadriceps: ['squat-barre', 'presse-45', 'leg-extension', 'hack-squat', 'squat-smith', 'presse-verticale'],
  Ischios:    ['leg-curl-assis', 'sdt-roumain', 'leg-curl-allonge', 'sdt'],
  Fessiers:   ['hip-thrust', 'ext-hanche'],
  Mollets:    ['mollets-debout', 'mollets-assis-presse', 'mollets-presse', 'mollets-assis-barre'],
  Abdos:      ['releve-genoux', 'crunch-machine', 'releve-chaise', 'situp-decline', 'crunch-sol']
};
const MUSCLE_OF_SLUG = {};
Object.entries(SLUG_MUSCLE).forEach(([m, slugs]) => slugs.forEach(sl => { MUSCLE_OF_SLUG[sl] = m; }));
// Ancien nom → nom actuel (pour qu'un même exercice garde une seule référence de force)
const CANON_NAME = {};
Object.entries(PREV_ALIASES).forEach(([cur, olds]) => olds.forEach(o => { CANON_NAME[o] = cur; }));
function canonExo(name) { return CANON_NAME[name] || name; }
function exoMuscle(name) { return MUSCLE_OF_SLUG[EXO_MEDIA[name]] || null; }
function e1rm(w, r) { return (w > 0 && r > 0) ? w * (1 + Math.min(r, 20) / 30) : 0; }
// Exercices au poids du corps : charge réelle = poids de corps (dernière pesée) + lest
const BODYWEIGHT_SLUGS = ['tractions', 'dips'];
// Muscles suivis en répétitions (exercices au poids du corps, le tonnage n'aurait pas de sens)
const REPS_MUSCLES = ['Abdos'];
function bodyWeight() { const w = [...(S.weights || [])].sort((a, b) => a.date.localeCompare(b.date)).at(-1); return w?.weight || 75; }

let evoMuscle = 'Pecs';
let evoWeeks  = 12;

// Clés des N dernières semaines (lundi), de la plus ancienne à la plus récente
function lastWeekKeys(n) {
  return Array.from({ length: n }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (n - 1 - i) * 7); return getWeekKey(d); });
}

// Historique par exercice : [{ date, weekKey, e1rm, vol, reps }] trié par date
function exoHistory() {
  const map = {};
  const bw = bodyWeight();
  [...S.workouts].sort((a, b) => a.date.localeCompare(b.date)).forEach(w => {
    (w.exercises || []).forEach(ex => {
      const name = canonExo(ex.name);
      const extra = BODYWEIGHT_SLUGS.includes(EXO_MEDIA[name]) ? bw : 0;
      const sets = (ex.sets || []).map(st => ({ w: (parseFloat(st.weight) || 0) + extra, r: parseInt(st.reps) || 0 }));
      const best = Math.max(0, ...sets.map(st => e1rm(st.w, st.r)));
      const vol = sets.reduce((t, st) => t + st.w * st.r, 0);
      const reps = sets.reduce((t, st) => t + st.r, 0);
      if (!reps) return;
      (map[name] = map[name] || []).push({ date: w.date, weekKey: w.weekKey || getWeekKey(w.date), e1rm: best, vol, reps });
    });
  });
  return map;
}

// Séries hebdo d'un muscle : volume (t, ou reps si exercices au poids du corps) et indice de charge (% vs 1re fois)
function muscleSeries(muscle, weeks, hist = exoHistory()) {
  const keys = lastWeekKeys(weeks);
  const exos = Object.keys(hist).filter(n => exoMuscle(n) === muscle);
  const byWeek = keys.map(k => ({ key: k, vol: 0, reps: 0, idx: [] }));
  exos.forEach(n => {
    const h = hist[n];
    const base = h.find(x => x.e1rm > 0)?.e1rm || 0;
    h.forEach(x => {
      const wk = byWeek.find(b => b.key === x.weekKey);
      if (!wk) return;
      wk.vol += x.vol; wk.reps += x.reps;
      if (base && x.e1rm) wk.idx.push(x.e1rm / base * 100 - 100);
    });
  });
  const useReps = REPS_MUSCLES.includes(muscle) || (byWeek.every(b => !b.vol) && byWeek.some(b => b.reps));
  return {
    keys, useReps, exos,
    volume: byWeek.map(b => useReps ? b.reps : Math.round(b.vol / 100) / 10),       // tonnes, 1 décimale
    charge: byWeek.map(b => b.idx.length ? Math.round(b.idx.reduce((t, v) => t + v, 0) / b.idx.length * 10) / 10 : null)
  };
}

function pctDelta(a, b) { return b > 0 ? Math.round((a - b) / b * 100) : null; }
function deltaPill(v, suffix = '%') {
  if (v === null || v === undefined || isNaN(v)) return '<span class="dpill">—</span>';
  const cls = v > 0 ? 'up' : v < 0 ? 'down' : '';
  return `<span class="dpill ${cls}">${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v).toLocaleString('fr-FR')} ${suffix}</span>`;
}
// Résumé : volume des 4 dernières semaines vs les 4 précédentes, charge (dernier point vs premier de la période)
function seriesSummary(sr) {
  const v = sr.volume, n = v.length;
  const last4 = v.slice(-4).reduce((t, x) => t + x, 0), prev4 = v.slice(-8, -4).reduce((t, x) => t + x, 0);
  // Charge : dernier point connu, et son évolution sur 4 semaines (vs le dernier point d'il y a 4 semaines ou avant)
  const c = sr.charge, lastI = c.map((x, i) => x === null ? -1 : i).reduce((a, b) => Math.max(a, b), -1);
  let refI = -1; for (let i = lastI - 4; i >= 0; i--) { if (c[i] !== null) { refI = i; break; } }
  return { last4, volDelta: pctDelta(last4, prev4), chargeNow: lastI >= 0 ? c[lastI] : null,
           chargeDelta: (lastI >= 0 && refI >= 0) ? Math.round((c[lastI] - c[refI]) * 10) / 10 : null };
}

function sparkline(values, w = 76, h = 26) {
  const pts = values.map((v, i) => [i, v]).filter(([, v]) => v !== null);
  if (pts.length < 2) return `<svg class="evo-spark" viewBox="0 0 ${w} ${h}" aria-hidden="true"></svg>`;
  // Échelle sur l'étendue des valeurs (tendance lisible), avec une marge de 15 %
  const hi = Math.max(...pts.map(p => p[1])), lo = Math.min(...pts.map(p => p[1])), pad = (hi - lo) * 0.15 || 1;
  const max = hi + pad, min = Math.max(0, lo - pad);
  const x = i => (i / (values.length - 1)) * (w - 4) + 2;
  const y = v => h - 3 - ((v - min) / (max - min || 1)) * (h - 6);
  const d = pts.map(([i, v], k) => `${k ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const [li, lv] = pts[pts.length - 1];
  return `<svg class="evo-spark" viewBox="0 0 ${w} ${h}" aria-hidden="true"><path d="${d}" fill="none" stroke="#0A0A0A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${x(li).toFixed(1)}" cy="${y(lv).toFixed(1)}" r="2.4" fill="#0A0A0A"/></svg>`;
}

function renderEvolution() {
  const hist = exoHistory();
  const sr = muscleSeries(evoMuscle, evoWeeks, hist);
  const sum = seriesSummary(sr);
  const unit = sr.useReps ? 'reps' : 't';
  const hasData = sr.volume.some(v => v > 0);

  // Exercices du muscle sur la période : 1RM estimé de la 1re à la dernière séance
  const from = sr.keys[0];
  const exRows = sr.exos.map(n => {
    const h = hist[n].filter(x => x.weekKey >= from && x.e1rm > 0);
    if (!h.length) return null;
    return { n, first: h[0].e1rm, last: h[h.length - 1].e1rm, date: h[h.length - 1].date };
  }).filter(Boolean).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);

  const allRows = MUSCLES.map(m => ({ m, sr: muscleSeries(m, evoWeeks, hist) }))
    .map(o => ({ ...o, sum: seriesSummary(o.sr) }))
    .filter(o => o.sr.volume.some(v => v > 0));

  document.getElementById('app').innerHTML = progressHead() + `
    <div class="evo-muscles" role="tablist" aria-label="Groupe musculaire">
      ${MUSCLES.map(m => `<button class="chip ${evoMuscle === m ? 'active' : ''}" role="tab" aria-selected="${evoMuscle === m}" onclick="setEvoMuscle('${m}')">${m}</button>`).join('')}
    </div>

    <section class="card evo-card">
      <div class="evo-head">
        <h2>${evoMuscle}</h2>
        <div class="evo-seg" role="group" aria-label="Période">
          ${[[8, '8 sem.'], [12, '12 sem.'], [26, '6 mois']].map(([n, l]) => `<button class="${evoWeeks === n ? 'active' : ''}" aria-pressed="${evoWeeks === n}" onclick="setEvoWeeks(${n})">${l}</button>`).join('')}
        </div>
      </div>
      <div class="evo-kpis">
        <div class="evo-kpi">
          <span class="evo-kpi-l">Volume · 4 sem.</span>
          <b>${sr.useReps ? Math.round(sum.last4).toLocaleString('fr-FR') : sum.last4.toFixed(1).replace('.', ',')} <small>${unit}</small></b>
          ${deltaPill(sum.volDelta)}<span class="evo-kpi-s">vs 4 sem. avant</span>
        </div>
        <div class="evo-kpi">
          <span class="evo-kpi-l">Force</span>
          <b>${sum.chargeNow === null ? '—' : `${sum.chargeNow > 0 ? '+' : ''}${String(sum.chargeNow).replace('.', ',')} <small>%</small>`}</b>
          ${deltaPill(sum.chargeDelta, 'pts')}<span class="evo-kpi-s">en 4 semaines</span>
        </div>
      </div>
      ${hasData ? `
        <div class="evo-legend"><span><i class="lg-bar"></i>Volume (${unit})</span><span><i class="lg-line"></i>Charge (% vs 1re fois)</span></div>
        <div class="evo-chart"><canvas id="chart-evo" aria-label="Évolution du volume et de la charge — ${evoMuscle}"></canvas></div>`
      : `<div class="empty evo-empty"><h3>Pas encore de séance</h3><p>Les exercices « ${evoMuscle} » apparaîtront ici dès ta première séance enregistrée.</p></div>`}
    </section>

    ${exRows.length ? `
    <div class="sec-row"><h2>Exercices · 1RM estimé</h2></div>
    <div class="card evo-list">
      ${exRows.map(r => `
        <div class="evo-ex">
          ${exoThumbHTML(r.n)}
          <div class="evo-ex-b"><span class="evo-ex-n">${r.n}</span><span class="evo-ex-s">${Math.round(r.first)} → ${Math.round(r.last)} kg · ${r.date.slice(8, 10)}/${r.date.slice(5, 7)}</span></div>
          ${deltaPill(pctDelta(r.last, r.first))}
        </div>`).join('')}
    </div>` : ''}

    ${allRows.length ? `
    <div class="sec-row"><h2>Tous les muscles</h2><span class="sec-note">volume · charge</span></div>
    <div class="card evo-list">
      ${allRows.map(o => `
        <button class="evo-row${o.m === evoMuscle ? ' on' : ''}" onclick="setEvoMuscle('${o.m}')">
          <span class="evo-row-n">${o.m}</span>
          ${sparkline(o.sr.volume)}
          <span class="evo-row-d">${deltaPill(o.sum.volDelta)}${deltaPill(o.sum.chargeDelta, 'pts')}</span>
        </button>`).join('')}
    </div>` : ''}
    <div class="spacer"></div>
  `;
  if (hasData) requestAnimationFrame(() => buildEvoChart(sr, unit));
}

function buildEvoChart(sr, unit) {
  const el = document.getElementById('chart-evo');
  if (!el || typeof Chart === 'undefined') return;
  if (charts.evo) { try { charts.evo.destroy(); } catch {} }
  const labels = sr.keys.map(k => { const d = new Date(k + 'T12:00:00'); return `${d.getDate()}/${d.getMonth() + 1}`; });
  const last = sr.volume.length - 1;
  const font = { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 11 };
  const fmtVolume = v => unit === 'reps' ? `${Math.round(v)} reps` : `${String(v).replace('.', ',')} t`;
  charts.evo = new Chart(el.getContext('2d'), {
    data: {
      labels,
      datasets: [
        { type: 'bar', label: 'Volume', data: sr.volume, yAxisID: 'y', order: 2,
          backgroundColor: sr.volume.map((_, i) => i === last ? '#0A0A0A' : '#E4E4E4'),
          hoverBackgroundColor: sr.volume.map((_, i) => i === last ? '#0A0A0A' : '#CFCFCF'),
          borderRadius: 6, borderSkipped: false, maxBarThickness: 22, categoryPercentage: 0.72 },
        { type: 'line', label: 'Charge', data: sr.charge, yAxisID: 'y1', order: 1, spanGaps: true,
          borderColor: '#0A0A0A', borderWidth: 2.2, tension: 0.35, fill: false,
          pointRadius: sr.charge.map((v, i) => v === null ? 0 : (i === sr.charge.map((x, j) => x === null ? -1 : j).reduce((a, b) => Math.max(a, b)) ? 4.5 : 2.5)),
          pointBackgroundColor: '#fff', pointBorderColor: '#0A0A0A', pointBorderWidth: 2, pointHoverRadius: 5 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false, animation: { duration: 350 },
      interaction: { mode: 'index', intersect: false },
      layout: { padding: { top: 6, right: 2, left: 0, bottom: 0 } },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0A0A0A', titleColor: '#fff', bodyColor: '#E6E6E6', padding: 10, cornerRadius: 10,
          displayColors: false, titleFont: { ...font, weight: '600' }, bodyFont: font,
          callbacks: {
            title: items => `Semaine du ${formatDate(sr.keys[items[0].dataIndex])}`,
            label: ctx => ctx.dataset.label === 'Volume'
              ? `Volume : ${fmtVolume(ctx.parsed.y)}`
              : (ctx.parsed.y === null ? '' : `Charge : ${ctx.parsed.y > 0 ? '+' : ''}${String(ctx.parsed.y).replace('.', ',')} %`)
          }
        }
      },
      scales: {
        x: { grid: { display: false }, border: { display: false }, ticks: { color: '#737373', font, maxRotation: 0, autoSkip: true, maxTicksLimit: 6 } },
        y: { position: 'left', beginAtZero: true, grid: { color: '#F0F0F0' }, border: { display: false },
             ticks: { color: '#737373', font, maxTicksLimit: 4, callback: v => unit === 'reps' ? v : `${String(v).replace('.', ',')} t` } },
        y1: { position: 'right', grid: { display: false }, border: { display: false }, grace: '15%',
              min: Math.min(0, Math.floor(Math.min(...sr.charge.filter(v => v !== null), 0) / 5) * 5),
              ticks: { color: '#0A0A0A', font, maxTicksLimit: 4, callback: v => `${v > 0 ? '+' : ''}${Math.round(v)} %` } }
      }
    }
  });
}

function setEvoMuscle(m) { evoMuscle = m; destroyCharts(); renderEvolution(); document.getElementById('app').scrollTop = 0; }
function setEvoWeeks(n)  { evoWeeks = n;  destroyCharts(); renderEvolution(); }

function destroyCharts() {
  Object.values(charts).forEach(c=>{ try{ c.destroy(); }catch{} });
  charts={};
}

function buildCharts() {
  if(typeof Chart==='undefined') return;
  const wks   = weeksFor(period);
  const labels= wks.map(weekLbl);
  const dark  = document.documentElement.dataset.theme!=='light';
  const grid  = dark?'rgba(255,255,255,.05)':'rgba(0,0,0,.05)';
  const txt   = dark?'#555555':'#999999';

  Chart.defaults.color = txt;
  Chart.defaults.borderColor = grid;
  Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif";
  Chart.defaults.font.size = 10;

  const mc = document.getElementById('chart-muscle')?.getContext('2d');
  if(mc) charts.muscle = new Chart(mc, {
    type:'bar',
    data: { labels, datasets: MUSCLE_KEYS.map(k=>({
      label: WORKOUT_PLAN[k].label,
      data: wks.map(wk=>{ const v=volByMuscle(wk)[k]; return v>0?Math.round(v):null; }),
      backgroundColor: WORKOUT_PLAN[k].color+'90',
      borderColor: WORKOUT_PLAN[k].color,
      borderWidth: 0, borderRadius: 3
    }))},
    options: { responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false} },
      scales:{ x:{stacked:true,grid:{display:false},ticks:{maxRotation:0}}, y:{stacked:true,grid:{color:grid},ticks:{callback:v=>v>=1000?(v/1000).toFixed(1)+'t':v}} }
    }
  });

  const tc = document.getElementById('chart-total')?.getContext('2d');
  if(tc) charts.total = new Chart(tc, {
    type:'line',
    data: { labels, datasets:[{ data: wks.map(wk=>{ const v=totalVol(wk); return v>0?Math.round(v):null; }),
      borderColor: dark?'#f0f0f0':'#0a0a0a',
      backgroundColor: dark?'rgba(240,240,240,.04)':'rgba(10,10,10,.04)',
      fill:true, tension:.4, pointRadius:3,
      pointBackgroundColor: dark?'#f0f0f0':'#0a0a0a', spanGaps:true }]},
    options:{ responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{x:{grid:{display:false},ticks:{maxRotation:0}}, y:{grid:{color:grid},ticks:{callback:v=>v>=1000?(v/1000).toFixed(1)+'t':v}}}
    }
  });

  const rc = document.getElementById('chart-run')?.getContext('2d');
  if(rc) charts.run = new Chart(rc, {
    type:'bar',
    data:{ labels, datasets:[{ data: wks.map(wk=>{ const k=totalKm(wk); return k>0?+k.toFixed(1):null; }),
      backgroundColor:'#6E6E6E70', borderColor:'#6E6E6E', borderWidth:0, borderRadius:4 }]},
    options:{ responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{x:{grid:{display:false},ticks:{maxRotation:0}}, y:{suggestedMax:RUN_GOAL_KM+2,grid:{color:grid},ticks:{callback:v=>v+' km'}}}
    }
  });

  const wdc = document.getElementById('chart-water-daily')?.getContext('2d');
  if(wdc) {
    const days30 = Array.from({length:30}, (_,i)=>{ const d=new Date(); d.setDate(d.getDate()-29+i); return localDateStr(d); });
    const wdLbls = days30.map(d=>{ const dt=new Date(d+'T12:00:00'); return `${dt.getDate()}/${dt.getMonth()+1}`; });
    const wdData = days30.map(d => { const ml=(S.hydration||{})[d]||0; return ml>0 ? +(ml/1000).toFixed(2) : null; });
    const goalL  = NUTRI_TARGETS.water / 1000;
    const darkMode = document.documentElement.getAttribute('data-theme') !== 'light';
    charts.waterDaily = new Chart(wdc, {
      type: 'line',
      data: { labels: wdLbls, datasets: [
        { label: 'Eau (L)', data: wdData,
          borderColor: '#0A0A0A', borderWidth: 2,
          backgroundColor: darkMode ? 'rgba(10,10,10,.05)' : 'rgba(10,10,10,.06)',
          fill: true, tension: .35, spanGaps: true,
          pointRadius: 4, pointBackgroundColor: '#0A0A0A', pointBorderColor: 'transparent' },
        { label: 'Objectif', data: days30.map(() => goalL),
          borderColor: '#0A0A0A40', borderDash: [4,4], borderWidth: 1.5,
          pointRadius: 0, fill: false, tension: 0 }
      ]},
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 10, color: darkMode?'#888':'#999' } },
          y: { grid: { color: grid }, min: 0, ticks: { callback: v => v + ' L', color: darkMode?'#888':'#999' } }
        }
      }
    });
  }
}

// ============================================================
// 9. MODAL & TOAST
// ============================================================

function showModal(html) {
  document.getElementById('modal-box').innerHTML = html;
  document.getElementById('modal-overlay').classList.remove('hidden');
}
function closeModal() { document.getElementById('modal-overlay').classList.add('hidden'); }

let _toast;
function showToast(msg) {
  let el = document.getElementById('toast');
  if(!el){ el=document.createElement('div'); el.id='toast'; el.style.cssText=`position:fixed;bottom:calc(var(--nav-h) + 14px);left:50%;transform:translateX(-50%);padding:10px 18px;border-radius:var(--r-sm);font-size:13px;font-weight:600;z-index:300;white-space:nowrap;max-width:90vw;text-align:center;transition:opacity .3s,transform .3s;`; document.body.appendChild(el); }
  el.textContent=msg; el.style.opacity='1'; el.style.transform='translateX(-50%) translateY(0)';
  clearTimeout(_toast);
  _toast=setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateX(-50%) translateY(8px)'; },2600);
}

// ============================================================
// 9c. COQUE : EN-TÊTES DE VUE, PASTILLES, ONGLETS REGROUPÉS
// ============================================================

let seanceMode  = 'muscu';     // Séance : 'muscu' | 'run' | 'ride'
let progressTab = 'evolution'; // Progrès : 'evolution' | 'history' | 'stats'

const VIEW_RENDERERS = {
  dashboard: () => renderDashboard(),
  workout:   () => renderSeance(),
  body:      () => renderBody(),
  progress:  () => renderProgress(),
  profile:   () => renderProfile()
};

const ICON_BACK   = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
const ICON_CHECK    = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const ICON_CAL      = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>';
const ICON_COPY     = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>';
const ICON_DUMBBELL = '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M9 10v12M23 10v12M5 13v6M27 13v6M9 16h14"/></svg>';
const ICON_FLAME    = '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M16 4c1.5 4 7 6.5 7 13a7 7 0 0 1-14 0c0-4 2.5-5.5 2.5-9.5 2 1.3 3 3 4 4.5 0-2.8.5-5.5.5-8z"/></svg>';
const ICON_EGG      = '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M16 4c5 0 9 8 9 14a9 9 0 0 1-18 0c0-6 4-14 9-14z"/><circle cx="16" cy="19" r="3.5"/></svg>';
const ICON_DROP     = '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M16 4c4 5.5 8 9.5 8 15a8 8 0 0 1-16 0c0-5.5 4-9.5 8-15z"/></svg>';
const ICON_SCALE    = '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="5" y="5" width="22" height="22" rx="6"/><path d="M11 13a7 7 0 0 1 10 0M16 13l2-3"/></svg>';
const ICON_RUN      = '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="19" cy="6" r="2.5"/><path d="M12 14l4-4 4 3 3 1M16 10l-2 7 5 4v6M14 17l-4 5H6"/></svg>';
const ICON_CLOUD    = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.1 9.6 4.2 4.2 0 0 0 7 18z"/></svg>';
const ICON_PERSON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>';

function viewHead(title, { kicker = '', left = '', right = '' } = {}) {
  return `
    <header class="view-head">
      <div class="view-head-l">
        ${left}
        <div>${kicker ? `<div class="view-kicker">${kicker}</div>` : ''}<h1 class="view-title">${title}</h1></div>
      </div>
      ${right ? `<div class="view-head-r">${right}</div>` : ''}
    </header>`;
}

function chipRow(items, active, fn) {
  return `<div class="chip-row" role="tablist">${items.map(([k, l]) =>
    `<button class="chip ${k === active ? 'active' : ''}" role="tab" aria-selected="${k === active}" onclick="${fn}('${k}')">${l}</button>`
  ).join('')}</div>`;
}

// Pastille profil : photo Google si connecté, sinon initiale du prénom (ou pictogramme)
function avatarBtn() {
  const photo   = currentUser?.photoURL;
  const initial = (S.profile?.name || '').trim().charAt(0).toUpperCase();
  const inner   = photo ? `<img src="${photo}" alt="">` : (initial || ICON_PERSON);
  return `<button class="av-btn" id="av-btn" onclick="navigate('profile')" aria-label="Profil et réglages">${inner}</button>`;
}

function dashHead() {
  const d = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  return viewHead("Aujourd'hui", { kicker: d.charAt(0).toUpperCase() + d.slice(1), right: avatarBtn() });
}

const SEANCE_CHIPS = [['push', 'Push'], ['pull', 'Pull'], ['legs', 'Legs']];

// En-tête de la vue Cardio (la muscu a son propre en-tête dans renderWorkoutForm)
function seanceHead() {
  return viewHead('Cardio', { kicker: 'Séance' })
    + chipRow(SEANCE_CHIPS, 'cardio', 'setSeanceGroup')
    + chipRow([['run', 'Course'], ['ride', 'Vélo']], seanceMode, 'setSeanceMode');
}

function setSeanceGroup(k) {
  if (seanceMode !== 'muscu') {
    if (!confirmLeaveDraft(k, k === wkState.muscleGroup ? wkState.weekType : variantForGroup(k))) return;
    seanceMode = 'muscu';
    if (k !== wkState.muscleGroup) { if (activeWkDraft()) clearWkDraft(); wkState.muscleGroup = k; }
    renderSeance();
    return;
  }
  setWorkoutMuscle(k);
}

function progressHead() {
  return viewHead('Progrès') + chipRow([['evolution', 'Évolution'], ['history', 'Historique'], ['stats', 'Stats']], progressTab, 'setProgressTab');
}

function profileHead() {
  return viewHead('Profil', { left: `<button class="icon-btn" onclick="navigate('dashboard')" aria-label="Retour">${ICON_BACK}</button>` });
}

// Séance = musculation uniquement (l'espace course/vélo a été retiré, les données restent en mémoire)
function renderSeance() { seanceMode = 'muscu'; renderWorkout(); }

function setSeanceMode(mode) {
  if (mode === seanceMode) return;
  if (seanceMode === 'muscu') saveWkDraft();   // garde la saisie en cours avant de passer au cardio
  seanceMode = mode;
  if (mode !== 'muscu') runTab = mode;
  renderSeance();
  document.getElementById('app').scrollTop = 0;
}

function renderProgress() { progressTab === 'stats' ? renderStats() : progressTab === 'history' ? renderHistory() : renderEvolution(); }

function setProgressTab(tab) {
  if (tab === progressTab) return;
  progressTab = tab;
  destroyCharts();
  renderProgress();
  document.getElementById('app').scrollTop = 0;
}

// Corps : pour l'instant le suivi du poids (déplacé depuis Nutrition). Mesures et photos arrivent à l'étape 3.
function renderBody() {
  document.getElementById('app').innerHTML = viewHead('Corps') + _nutriWeight() + '<div class="spacer"></div>';
  requestAnimationFrame(buildNutriCharts);
}

// L'app peut rester ouverte en arrière-plan d'un jour à l'autre (PWA iOS) :
// au retour, on recale les dates « du jour » pour ne pas enregistrer sur la veille.
let _lastDay = todayStr();
function checkDayRollover() {
  const t = todayStr();
  if (t === _lastDay) return;
  if (nutriDate === _lastDay) nutriDate = t;
  _lastDay = t;
  if (S.view === 'workout' && seanceMode === 'muscu' && hasActiveWkDraft()) return;  // séance en cours : on garde sa date
  navigate(S.view);
}

// ============================================================
// 10. NAVIGATION
// ============================================================

function toggleMenu() { document.body.classList.toggle('menu-open'); }
function closeMenu()  { document.body.classList.remove('menu-open'); }

// ============================================================
// 9b. HAPTIC & PULL-TO-REFRESH
// ============================================================

function haptic(pattern = [8]) {
  try { navigator.vibrate(pattern); } catch {}
}

function initPullToRefresh() {
  const el = document.getElementById('app');
  let sy = 0, pulling = false;
  let indicator = null;

  function getIndicator() {
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'ptr-indicator';
      document.body.appendChild(indicator);
    }
    return indicator;
  }

  el.addEventListener('touchstart', e => {
    if (el.scrollTop === 0) { sy = e.touches[0].clientY; pulling = true; }
    else pulling = false;
  }, { passive: true });

  el.addEventListener('touchmove', e => {
    if (!pulling) return;
    const dy = e.touches[0].clientY - sy;
    if (dy > 0 && dy < 100) {
      const ind = getIndicator();
      ind.style.opacity = String(Math.min(dy / 60, 1));
      ind.style.transform = `translateX(-50%) translateY(${Math.min(dy * 0.5, 32)}px)`;
      ind.textContent = dy > 60 ? '↻ Relâcher' : '↓ Tirer pour synchro';
    }
  }, { passive: true });

  el.addEventListener('touchend', e => {
    if (!pulling) return;
    const dy = e.changedTouches[0].clientY - sy;
    pulling = false;
    const ind = indicator;
    if (ind) { ind.style.opacity = '0'; ind.style.transform = 'translateX(-50%) translateY(0)'; }
    if (dy > 60) {
      haptic([10, 30, 10]);
      if (db && currentUser) {
        pullFromCloud();
        showToast('Synchronisation…');
      } else {
        showToast('Sync cloud non configuré');
      }
    }
  }, { passive: true });
}

// Barre d'onglets glissable (comme Apple Music) : une bulle suit le doigt d'un onglet à l'autre,
// l'onglet sous le doigt s'allume, et on y va en relâchant. Un simple tap marche toujours.
let _navGestureAt = 0;
function initNavGesture() {
  const nav = document.getElementById('bottom-nav');
  if (!nav || nav.querySelector('.nav-lens')) return;
  const lens = document.createElement('span');
  lens.className = 'nav-lens'; lens.setAttribute('aria-hidden', 'true');
  nav.prepend(lens);
  const items = () => [...nav.querySelectorAll('.nav-item')];
  const lensW = () => lens.offsetWidth || 64;
  const centerOf = el => { const r = el.getBoundingClientRect(), n = nav.getBoundingClientRect(); return r.left - n.left + r.width / 2; };
  const setX = (cx, scale = 1) => { lens.style.transform = `translateX(${(cx - lensW() / 2).toFixed(1)}px) scale(${scale})`; };
  window.moveNavLens = () => {
    const a = nav.querySelector('.nav-item.active');
    lens.style.opacity = a ? '1' : '0';
    if (a) setX(centerOf(a));
  };
  let drag = null;
  const follow = x => {
    const n = nav.getBoundingClientRect(), list = items();
    const min = centerOf(list[0]), max = centerOf(list[list.length - 1]);
    const cx = Math.min(max, Math.max(min, x - n.left));
    setX(cx, 1.14);
    const hover = list.reduce((best, el) => Math.abs(centerOf(el) - cx) < Math.abs(centerOf(best) - cx) ? el : best, list[0]);
    if (hover !== drag.hover) { list.forEach(el => el.classList.toggle('hover', el === hover)); drag.hover = hover; if (drag.started) haptic([6]); }
    drag.started = true;
  };
  nav.addEventListener('pointerdown', e => {
    if (e.button > 0) return;
    drag = { id: e.pointerId, hover: null, started: false };
    try { nav.setPointerCapture(e.pointerId); } catch {}
    nav.classList.add('dragging'); lens.style.opacity = '1';
    follow(e.clientX);
  });
  nav.addEventListener('pointermove', e => { if (drag && e.pointerId === drag.id) follow(e.clientX); });
  const end = cancel => {
    if (!drag) return;
    const target = drag.hover; drag = null;
    nav.classList.remove('dragging');
    items().forEach(el => el.classList.remove('hover'));
    if (!cancel && target) { _navGestureAt = Date.now(); if (target.dataset.view !== S.view) navigate(target.dataset.view); }
    window.moveNavLens();
  };
  nav.addEventListener('pointerup', () => end(false));
  nav.addEventListener('pointercancel', () => end(true));
  window.addEventListener('resize', () => window.moveNavLens());
  requestAnimationFrame(window.moveNavLens);
}

function initSwipe() {
  const VIEWS = ['dashboard','workout','body','progress'];
  let sx = 0, sy = 0, st = 0;
  const el = document.getElementById('app');
  el.addEventListener('touchstart', e => { sx=e.touches[0].clientX; sy=e.touches[0].clientY; st=Date.now(); }, {passive:true});
  el.addEventListener('touchend', e => {
    if (document.body.classList.contains('menu-open')) return;
    const dx=e.changedTouches[0].clientX-sx, dy=e.changedTouches[0].clientY-sy;
    if (Date.now()-st>400 || Math.abs(dx)<60 || Math.abs(dx)<Math.abs(dy)*2) return;
    const idx=VIEWS.indexOf(S.view||'dashboard');
    if (dx<0 && idx<VIEWS.length-1) navigate(VIEWS[idx+1]);
    else if (dx>0 && idx>0)          navigate(VIEWS[idx-1]);
  }, {passive:true});
}

function navigate(view) {
  // Anciennes vues regroupées : Course/Vélo → Séance, Historique/Stats → Progrès
  if (view === 'run')       { view = 'workout'; }
  if (view === 'nutrition') { view = 'dashboard'; }
  if (view === 'history') { progressTab = 'history'; view = 'progress'; }
  if (view === 'stats')   { progressTab = 'stats';   view = 'progress'; }
  if (!VIEW_RENDERERS[view]) view = 'dashboard';
  S.view = view;
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.toggle('active',el.dataset.view===view));
  unmountRunbar();
  destroyCharts();
  destroyNutriCharts();
  if(view!=='workout')    pauseWkTimer();
  VIEW_RENDERERS[view]();
  window.moveNavLens?.();
  const app = document.getElementById('app');
  app.scrollTop = 0;
  const first = app.firstElementChild;
  if (first) { first.style.animation='none'; first.offsetHeight; first.style.animation='viewIn .2s cubic-bezier(.16,1,.3,1) both'; }
}

function initEvents() {
  // Tap / clavier ; ignoré juste après un glissé (déjà géré par initNavGesture)
  document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>{ if (Date.now() - _navGestureAt < 500) return; navigate(b.dataset.view); closeMenu(); }));

  document.getElementById('modal-overlay').addEventListener('click',e=>{ if(e.target.id==='modal-overlay') closeModal(); });

  // Sauvegarde du brouillon de séance dès que l'app se ferme / passe en arrière-plan
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') { if (S.view === 'workout') saveWkDraft(); flushPush(); notifyForgottenOnLeave(); }
    else { checkDayRollover(); checkForgottenOnOpen(); }
  });
  window.addEventListener('pagehide', () => { if (S.view === 'workout') saveWkDraft(); flushPush(); });
}

function updateWeekBadge() {
  const b=document.getElementById('btn-week-toggle');
  if(!b) return;
  b.textContent=`SEM. ${S.weekType}`;
  b.className=`week-badge${S.weekType==='B'?' week-b':''}`;
}

function applyTheme() {
  document.documentElement.dataset.theme = 'light';
  const m = document.getElementById('meta-theme'); if (m) m.content = '#ffffff';
}

// ============================================================
// 11. PWA & INIT
// ============================================================

function registerSW() {
  if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
}

function scheduleNotification() {
  if (!('Notification' in window)) { showToast('Notifications non supportées'); return; }
  if (Notification.permission === 'granted') {
    showModal(`
      <div class="modal-head">
        <div><div class="t3">RAPPELS</div><div class="modal-title">Rappel entraînement</div></div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <p class="t3" style="font-size:13px;line-height:1.7;margin-bottom:16px">Les notifications sont activées.<br>Un rappel quotidien te sera envoyé à 18h les jours d'entraînement.</p>
      <button class="btn btn-primary" style="margin-bottom:8px" onclick="fireTestNotif()">Tester maintenant</button>
      <button class="btn btn-ghost" onclick="closeModal()">Fermer</button>
    `);
  } else {
    Notification.requestPermission().then(p => {
      if (p === 'granted') {
        showToast('Rappels activés ✓');
        const btn = document.getElementById('notif-btn');
        if (btn) btn.textContent = 'Configuré ✓';
        fireTestNotif();
      } else {
        showToast('Notifications refusées');
      }
    });
  }
}

function fireTestNotif() {
  closeModal();
  const [g, v] = nextPPLSession();
  const title = `Séance ${sessionTitle(g, v)} · semaine ${v[0]} 💪`;
  const body  = `${WORKOUT_PLAN[g][v].length} exercices · PPL — C'est parti !`;
  showLocalNotif(title, body, 'test').then(ok => showToast(ok ? 'Notification test envoyée ✓' : 'Notifications non autorisées'));
}

// Correctifs ponctuels sur les données (chacun protégé par son flag, idempotents)
function applyOneTimeFixes() {
  let changed = false;

  // Décaler les entrées nutrition du 1er juillet au 30 juin
  if (!S._nutFix0701) {
    (S.nutrition || []).forEach(n => { if (n.date === '2026-07-01') { n.date = '2026-06-30'; changed = true; } });
    S._nutFix0701 = true;
    changed = true;
  }

  // Repas oublié du 19 juillet : 300g basse côte cuite + 400g pâtes cuites
  if (!S._nutAdd0719) {
    if (!S.nutrition) S.nutrition = [];
    S.nutrition.push(
      { id: uid(), date: '2026-07-19', calories: 750, protein: 78, carbs: 0,   fat: 48, note: 'Basse côte cuite (300g)' },
      { id: uid(), date: '2026-07-19', calories: 560, protein: 16, carbs: 112, fat: 4,  note: 'Pâtes cuites (400g)' }
    );
    S._nutAdd0719 = true;
    changed = true;
  }

  // Repas oublié du 20 juillet : 400g bœuf bourguignon + 900g pâtes cuites
  if (!S._nutAdd0720) {
    if (!S.nutrition) S.nutrition = [];
    S.nutrition.push(
      { id: uid(), date: '2026-07-20', calories: 600,  protein: 52, carbs: 20,  fat: 32, note: 'Bœuf bourguignon (400g)' },
      { id: uid(), date: '2026-07-20', calories: 1260, protein: 36, carbs: 252, fat: 9,  note: 'Pâtes cuites (900g)' }
    );
    S._nutAdd0720 = true;
    changed = true;
  }

  // Remplacement d'exercices jambes (semaine B) dans la dernière séance : renommer + fixer les poids
  if (!S._jambesSwap1) {
    const map = {
      'Goblet squat avec haltère':   { name: 'Super hack squat', weight: 100 },
      'Squat bulgare avec haltères': { name: 'Leg curling',      weight: 30 },
      'Presse à cuisses horizontale':{ name: 'Squat machine',    weight: 40 }
    };
    const last = (S.workouts || [])
      .filter(w => w.muscleGroup === 'jambes' && w.weekType === 'B')
      .sort((a, b) => b.date.localeCompare(a.date))[0];
    if (last && last.exercises) {
      last.exercises.forEach(ex => {
        const r = map[ex.name];
        if (r) { ex.name = r.name; (ex.sets || []).forEach(s => { s.weight = r.weight; }); }
      });
      last.totalVolume = calcSessionVol(last.exercises);
    }
    S._jambesSwap1 = true;
    changed = true;
  }

  // Passage aux objectifs de recomposition (2400 kcal / 175 g prot).
  // On écrase l'ancien objectif prise de masse (3000/150) déjà sauvegardé.
  if (!S._recompGoals) {
    S.nutGoal = { cal: 2400, prot: 175, carbs: 250, fat: 80, water: (S.nutGoal?.water || 2500) };
    NUTRI_TARGETS = { calories: 2400, protein: 175, carbs: 250, fat: 80, water: S.nutGoal.water };
    S._recompGoals = true;
    changed = true;
  }

  if (changed) save();
}

function init() {
  loadState(); applyOneTimeFixes(); S.weekType = weekLetter();
  if (hasActiveWkDraft()) S.view = 'workout'; // reprendre une séance en cours après rechargement
  applyTheme(); updateWeekBadge(); initEvents();
  navigate(S.view||'dashboard'); registerSW();
  initSwipe(); initPullToRefresh(); initNavGesture();
  initFirebase(); // onAuthStateChanged gère le pull automatique
  initNotifs();
  initBackups();
  setTimeout(checkForgottenOnOpen, 800);
}

init();
