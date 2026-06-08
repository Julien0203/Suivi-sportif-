/* ============================================================
   SPORT CRM — Application v3
   ============================================================ */

// ============================================================
// 1. DONNÉES
// ============================================================

const WORKOUT_PLAN = {
  bras: {
    label: 'Bras', short: 'BR', color: '#FF4500', schedule: 1,
    A: ['Curl pupitre barre EZ', 'Curl haltère incliné', 'Dips', 'Extensions verticales à la poulie', 'Curl haltère debout sur banc incliné'],
    B: ['Barre front', 'Extensions des triceps à la poulie haute à la corde', 'Curl Spider', 'Curl Zottman', 'Kickback']
  },
  pec: {
    label: 'Pectoraux', short: 'PE', color: '#FF0080', schedule: 2,
    A: ['Développé couché à la Smith machine', 'Développé incliné à la machine convergente', 'Développé incliné avec haltères', 'Dips buste penché en avant', 'Écartés à la poulie vis-à-vis'],
    B: ['Développé incliné à la barre', 'Développé décliné aux haltères', 'Écartés décliné avec haltères', 'Développé couché serré avec haltères', 'Svend press']
  },
  dos: {
    label: 'Dos', short: 'DO', color: '#00FF80', schedule: 3,
    A: ['Tirage vertical poitrine', 'Tractions lestées', 'Rowing barre', 'Tirage vertical prise serrée', 'Tirage horizontal à la poulie'],
    B: ['Rowing à un bras', 'Reverse fly', 'Tractions', 'Tirage vertical', 'Tirage Horizontal à la Poulie']
  },
  epaules: {
    label: 'Épaules', short: 'EP', color: '#00D0FF', schedule: 4,
    A: ['Presse à épaules inclinée', 'Élévations latérales', 'Développé militaire barre', 'Développé Arnold'],
    B: ['Oiseau assis sur un banc', 'Élévations frontales à la poulie basse', 'Tirage menton barre guidée', 'Face pull', 'Élévations latérales']
  },
  jambes: {
    label: 'Jambes', short: 'JA', color: '#CC00FF', schedule: 5,
    A: ['Hack squat', 'Fentes avant avec haltères', 'Squat', 'Leg extension', 'Squat à la Smith machine'],
    B: ['Hip thrust', 'Goblet squat avec haltère', 'Squat bulgare avec haltères', 'Presse à cuisses horizontale', 'Leg extension']
  }
};

const DAY_TO_MUSCLE = { 1: 'bras', 2: 'pec', 3: 'dos', 4: 'epaules', 5: 'jambes' };
const MUSCLE_KEYS  = ['bras', 'pec', 'dos', 'epaules', 'jambes'];
const SETS         = 4;
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
const DEFAULTS = { view: 'dashboard', theme: 'dark', weekType: 'A', workouts: [], runs: [], nutrition: [], weights: [], weightGoal: { kg: 70, date: null }, profile: {}, nutGoal: { cal: 3000, prot: 150 }, runGoal: 15 };

function loadState() {
  try { S = { ...DEFAULTS, ...JSON.parse(localStorage.getItem('sport-crm-v2') || '{}') }; }
  catch { S = { ...DEFAULTS }; }
  RUN_GOAL_KM  = S.runGoal || 15;
  NUTRI_TARGETS = { calories: S.nutGoal?.cal || 3000, protein: S.nutGoal?.prot || 150 };
}
function save() {
  localStorage.setItem('sport-crm-v2', JSON.stringify(S));
  schedulePush();
}

// ============================================================
// 2b. FIREBASE CLOUD SYNC
// ============================================================

let db = null;
let syncCode = localStorage.getItem('sport-crm-synckey') || null;
let _syncTimer = null;

function initFirebase() {
  try {
    if (typeof firebase === 'undefined' || typeof FIREBASE_CONFIG === 'undefined' || FIREBASE_CONFIG.apiKey === 'REMPLACER') return;
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    db = firebase.firestore();
    db.enablePersistence({ synchronizeTabs: true }).catch(() => {});
  } catch(e) { console.warn('[Sync] Firebase init:', e); }
}

function _syncRef() {
  return (db && syncCode) ? db.collection('sport_crm').doc(syncCode) : null;
}

function _setSyncIcon(status) {
  const btn = document.getElementById('sync-btn');
  if (!btn) return;
  btn.dataset.status = status;
  btn.title = { idle: 'Sync cloud', syncing: 'Sync…', synced: 'Synchronisé ✓', offline: 'Hors ligne' }[status] || '';
}

function schedulePush() {
  clearTimeout(_syncTimer);
  _syncTimer = setTimeout(pushToCloud, 2000);
}

async function pushToCloud() {
  const ref = _syncRef(); if (!ref) return;
  _setSyncIcon('syncing');
  try {
    const data = { ...S, _syncAt: firebase.firestore.Timestamp.now() };
    delete data.view;
    await ref.set(data);
    _setSyncIcon('synced');
  } catch(e) { _setSyncIcon('offline'); }
}

async function pullFromCloud() {
  const ref = _syncRef(); if (!ref) return;
  _setSyncIcon('syncing');
  try {
    const doc = await ref.get();
    if (doc.exists) {
      const remote = doc.data();
      const view = S.view; const theme = S.theme;
      delete remote._syncAt;
      S = { ...DEFAULTS, ...remote, view, theme };
      localStorage.setItem('sport-crm-v2', JSON.stringify(S));
      RUN_GOAL_KM   = S.runGoal || 15;
      NUTRI_TARGETS = { calories: S.nutGoal?.cal || 3000, protein: S.nutGoal?.prot || 150 };
      _setSyncIcon('synced');
      navigate(S.view || 'dashboard');
      showToast('Données synchronisées ✓');
    } else {
      await pushToCloud();
    }
  } catch(e) { _setSyncIcon('offline'); showToast('Hors ligne — données locales utilisées'); }
}

function _generateSyncCode() {
  return 'xxxx-xxxx-xxxx'.replace(/x/g, () => Math.random().toString(36)[2]);
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
    ${!syncCode ? `
      <p class="t3" style="font-size:13px;line-height:1.7;margin-bottom:16px">
        Crée un code personnel pour sauvegarder tes données dans le cloud et les retrouver sur n'importe quel appareil.
      </p>
      <button class="btn btn-primary" style="margin-bottom:16px" onclick="createSyncCode()">Créer mon code de sync</button>
      <div class="divider"></div>
      <div class="t3" style="font-size:12px;margin:14px 0 8px">Tu as déjà un code ?</div>
      <input id="sync-code-input" class="form-inp" placeholder="xxxx-xxxx-xxxx" style="margin-bottom:8px">
      <button class="btn btn-ghost" onclick="linkSyncCode()">Lier ce code</button>
    ` : `
      <div class="prof-settings-card" style="margin-bottom:14px">
        <div class="prof-row">
          <span class="prof-row-label">Code de sync</span>
          <span style="font-family:monospace;font-size:13px;letter-spacing:.06em;color:var(--t1)">${syncCode}</span>
        </div>
      </div>
      <button class="btn btn-ghost btn-sm" style="margin-bottom:12px" onclick="copySyncCode()">Copier le code</button>
      <p class="t3" style="font-size:11px;line-height:1.7">
        Entre ce code sur un autre appareil pour retrouver toutes tes données.
      </p>
      <div class="divider mt-12"></div>
      <button class="btn btn-ghost btn-sm" style="margin-top:14px" onclick="forcePull()">Récupérer depuis le cloud</button>
      <button class="btn btn-danger btn-sm" style="margin-top:8px" onclick="unlinkSync()">Délier ce code</button>
    `}
  `);
}

function createSyncCode() {
  syncCode = _generateSyncCode();
  localStorage.setItem('sport-crm-synckey', syncCode);
  closeModal(); showSyncModal();
  pushToCloud();
  showToast('Code créé — données sauvegardées dans le cloud ☁');
}

function linkSyncCode() {
  const val = document.getElementById('sync-code-input')?.value.trim().toLowerCase();
  if (!val) { showToast('Entre un code valide'); return; }
  syncCode = val;
  localStorage.setItem('sport-crm-synckey', syncCode);
  closeModal();
  pullFromCloud();
}

function forcePull() {
  closeModal();
  pullFromCloud();
}

function copySyncCode() {
  navigator.clipboard?.writeText(syncCode).then(() => { showToast('Code copié ✓'); closeModal(); });
}

function unlinkSync() {
  syncCode = null;
  localStorage.removeItem('sport-crm-synckey');
  closeModal(); _setSyncIcon('idle');
  showToast('Code de sync supprimé');
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
  const today    = new Date();
  const dow      = today.getDay();
  const muscle   = DAY_TO_MUSCLE[dow];
  const twk      = thisWeekKey();
  const pwk      = prevWeekKey();
  const tv       = totalVol(twk);
  const pv       = totalVol(pwk);
  const delta    = pv > 0 ? ((tv - pv) / pv * 100) : null;
  const thisVM   = volByMuscle(twk);
  const km       = totalKm(twk);
  const runs     = runsThisWeek();
  const wtdone   = workoutsThisWeek().length;
  const accentColor = muscle ? WORKOUT_PLAN[muscle].color : '#666666';
  const todayDone = muscle
    ? workoutsThisWeek().some(w => w.date === todayStr() && w.muscleGroup === muscle)
    : false;

  // Nutrition
  const todayNutri = (S.nutrition || []).filter(n => n.date === todayStr());
  const todayCal   = todayNutri.reduce((s, n) => s + n.calories, 0);
  const todayProt  = todayNutri.reduce((s, n) => s + n.protein, 0);
  const calPct     = Math.min(todayCal / NUTRI_TARGETS.calories * 100, 100);
  const protPct    = Math.min(todayProt / NUTRI_TARGETS.protein * 100, 100);

  // Poids
  const sortedW = [...(S.weights || [])].sort((a, b) => a.date.localeCompare(b.date));
  const lastW   = sortedW[sortedW.length - 1];
  const last7W  = sortedW.slice(-7);

  function sparkSVG(pts, w = 110, h = 34) {
    if (pts.length < 2) return '';
    const vals = pts.map(x => x.weight);
    const mn = Math.min(...vals), mx = Math.max(...vals), rng = (mx - mn) || 0.5;
    const cs = vals.map((v, i) => {
      const x = (i / (vals.length - 1)) * w;
      const y = h - 4 - ((v - mn) / rng) * (h - 10);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    const line = cs.join(' L ');
    return `<path d="M ${line}" fill="none" stroke="var(--blue)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M ${line} L ${w},${h} L 0,${h} Z" fill="var(--blue)" opacity=".1"/>`;
  }

  // SVG ring helper
  function ring(pct, color, r = 36, sw = 7) {
    const c = 2 * Math.PI * r;
    return `<circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--surface2)" stroke-width="${sw}"/>
      <circle cx="50" cy="50" r="${r}" fill="none" stroke="${color}" stroke-width="${sw}"
        stroke-linecap="round"
        stroke-dasharray="${(c * Math.min(pct, 1)).toFixed(1)} ${c.toFixed(1)}"
        transform="rotate(-90 50 50)"/>`;
  }

  // Calendrier semaine
  const todayDow = today.getDay();
  const monday   = new Date(today);
  monday.setDate(today.getDate() - (todayDow === 0 ? 6 : todayDow - 1));
  monday.setHours(0, 0, 0, 0);
  const WD_ORDER = [1, 2, 3, 4, 5, 6, 0];
  const WD_LBL   = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  const calDots = WD_ORDER.map((d, i) => {
    const date    = new Date(monday);
    date.setDate(monday.getDate() + i);
    const ds      = localDateStr(date);
    const mk      = DAY_TO_MUSCLE[d];
    const isToday = ds === todayStr();
    const isFuture = ds > todayStr();
    const isDone  = mk
      ? S.workouts.some(w => w.date === ds && w.muscleGroup === mk)
      : S.runs.some(r => r.date === ds);
    const col = mk ? WORKOUT_PLAN[mk].color : 'var(--c-run)';
    return { d, i, ds, mk, isToday, isFuture, isDone, col };
  });

  // Max vol pour barres
  const maxMV = Math.max(...MUSCLE_KEYS.map(k => thisVM[k]), 1);

  // Récent
  const recent = [
    ...S.workouts.map(w => ({ ...w, kind: 'w' })),
    ...S.runs.map(r => ({ ...r, kind: 'r' }))
  ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

  document.getElementById('app').innerHTML = `
  <div class="dash-grid">

    <!-- ① HERO TODAY -->
    <div class="today-card" style="border-top-color:${accentColor};--today-color:${accentColor}">
      <div class="today-meta">
        <span class="today-day">${DAYS_FULL[dow]} — Sem. ${S.weekType}</span>
        ${delta !== null
          ? `<span class="delta-pill ${delta >= 0 ? 'delta-up' : 'delta-down'}">${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%</span>`
          : `<span class="delta-pill delta-neu">1re sem.</span>`}
      </div>
      <div class="today-muscle">${muscle ? WORKOUT_PLAN[muscle].label : 'Repos'}</div>
      <div class="today-week-tag">${muscle
        ? `${WORKOUT_PLAN[muscle][S.weekType].length} exercices · ${SETS} séries`
        : 'L · Bras &nbsp;·&nbsp; M · Pec &nbsp;·&nbsp; M · Dos &nbsp;·&nbsp; J · Épau. &nbsp;·&nbsp; V · Jam.'}</div>
      ${muscle && !todayDone
        ? `<button class="today-cta" style="background:${accentColor};color:#000;box-shadow:0 6px 24px ${accentColor}44" onclick="navigate('workout')">Commencer la séance</button>`
        : muscle
          ? `<div class="today-done"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Séance enregistrée</div>`
          : `<div class="today-rest">Week-end · récupération</div>`}
    </div>

    <!-- ② VOLUME DONUT -->
    <div class="card dash-half dash-vol" style="border-top:2px solid ${accentColor}">
      <div class="sect-lbl">Volume</div>
      <div class="donut-wrap">
        <svg viewBox="0 0 100 100" class="donut-svg">
          ${ring(wtdone / 5, accentColor)}
        </svg>
        <div class="donut-center">
          <div class="donut-val">${wtdone}<span class="donut-den">/5</span></div>
          <div class="donut-sublbl">séances</div>
        </div>
      </div>
      <div class="donut-foot">${fmtVol(tv)} kg${delta !== null ? ' · ' + (delta >= 0 ? '+' : '') + delta.toFixed(1) + '%' : ''}</div>
    </div>

    <!-- ③ COURSE DONUT -->
    <div class="card dash-half dash-run" style="--card-accent:var(--c-run)">
      <div class="sect-lbl">Course</div>
      <div class="donut-wrap">
        <svg viewBox="0 0 100 100" class="donut-svg">
          ${ring(km / RUN_GOAL_KM, 'var(--c-run)')}
        </svg>
        <div class="donut-center">
          <div class="donut-val" style="font-size:18px">${km.toFixed(1)}<span class="donut-den"> km</span></div>
          <div class="donut-sublbl">${runs.length}/${RUN_SESSIONS} sorties</div>
        </div>
      </div>
      <div class="donut-foot">Objectif ${RUN_GOAL_KM} km</div>
    </div>

    <!-- ④ CALENDRIER SEMAINE -->
    <div class="card week-cal-card">
      <div class="sect-lbl mb-10">Cette semaine</div>
      <div class="week-cal">
        ${calDots.map(({ i, ds, mk, isToday, isFuture, isDone, col }) => {
          const dotClass = isDone ? 'wc-done' : (mk && !isFuture ? 'wc-missed' : !mk ? 'wc-rest' : 'wc-plan');
          return `
          <div class="wc-day${isToday ? ' wc-today' : ''}">
            <div class="wc-lbl">${WD_LBL[i]}</div>
            <div class="wc-dot ${dotClass}" style="${isDone ? `background:${col};box-shadow:0 0 12px ${col}55` : ''}">
              ${isDone && mk ? `<span class="wc-text">${WORKOUT_PLAN[mk].short}</span>` : ''}
              ${isDone && !mk ? `<span class="wc-text">KM</span>` : ''}
            </div>
            <div class="wc-num">${new Date(ds + 'T12:00:00').getDate()}</div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- ⑤ MUSCLE BREAKDOWN -->
    <div class="card bk-card">
      <div class="sect-row" style="margin-bottom:14px">
        <span class="sect-lbl">Groupes musculaires</span>
        <span class="t3" style="font-size:11px">${wtdone}/5 séances</span>
      </div>
      ${MUSCLE_KEYS.map(k => {
        const m   = WORKOUT_PLAN[k];
        const vol = thisVM[k];
        const pct = (vol / maxMV) * 100;
        const done = workoutsThisWeek().some(w => w.muscleGroup === k);
        return `
        <div class="bk-row">
          <div class="bk-dot" style="background:${m.color}"></div>
          <span class="bk-name">${m.label}</span>
          <div class="bk-track">
            <div class="bk-fill" style="width:${pct.toFixed(1)}%;background:linear-gradient(90deg,${m.color}18,${m.color}44);border-right:2px solid ${vol > 0 ? m.color : 'transparent'}"></div>
          </div>
          <span class="bk-vol">${vol > 0 ? fmtVol(vol) + ' kg' : '—'}</span>
          <span class="bk-check">${done ? `<span style="color:${m.color}">✓</span>` : '<span style="color:var(--t4)">·</span>'}</span>
        </div>`;
      }).join('')}
    </div>

    <!-- ⑥ NUTRITION -->
    <div class="card dash-half dash-nutri" onclick="navigate('nutrition')" style="cursor:pointer;border-top:2px solid #FF6B35">
      <div class="sect-lbl" style="margin-bottom:12px">Nutrition</div>
      <div class="nut-rings">
        <svg viewBox="0 0 100 100" class="donut-svg" style="width:90px;height:90px;flex-shrink:0">
          ${ring(calPct / 100, '#FF6B35', 38, 7)}
          ${ring(protPct / 100, 'var(--blue)', 26, 6)}
          <text x="50" y="47" text-anchor="middle" font-size="14" font-weight="500" fill="var(--t1)" font-family="system-ui,sans-serif">${Math.round(calPct)}%</text>
          <text x="50" y="61" text-anchor="middle" font-size="8" fill="var(--t3)" font-family="system-ui,sans-serif">kcal</text>
        </svg>
        <div class="nut-legend">
          <div class="nut-row"><span class="nut-dot" style="background:#FF6B35"></span><div><div class="nut-val">${todayCal} kcal</div><div class="nut-target">/ ${NUTRI_TARGETS.calories}</div></div></div>
          <div class="nut-row"><span class="nut-dot" style="background:var(--blue)"></span><div><div class="nut-val">${todayProt}g</div><div class="nut-target">/ ${NUTRI_TARGETS.protein}g prot.</div></div></div>
        </div>
      </div>
    </div>

    <!-- ⑦ POIDS -->
    <div class="card dash-half dash-poids" onclick="navigate('nutrition')" style="cursor:pointer;border-top:2px solid var(--blue)">
      <div class="sect-row" style="margin-bottom:6px">
        <span class="sect-lbl">Poids</span>
        ${lastW ? `<span class="t3" style="font-size:10px">${lastW.date === todayStr() ? 'Auj.' : formatDate(lastW.date)}</span>` : ''}
      </div>
      ${lastW
        ? `<div class="weight-big">${lastW.weight}<span class="weight-unit"> kg</span></div>
           ${last7W.length >= 2
             ? `<svg class="sparkline-svg" viewBox="0 0 110 36" preserveAspectRatio="none">${sparkSVG(last7W)}</svg>`
             : `<div style="font-size:11px;color:var(--t3);margin-top:8px">Continue d'enregistrer</div>`}`
        : `<div style="font-size:12px;color:var(--t3);padding:16px 0">Aucun poids<br>enregistré</div>`}
    </div>

    <!-- ⑧ ACTIVITÉ RÉCENTE -->
    <div class="card recent-card">
      <div class="sect-lbl mb-10">Activité récente</div>
      ${recent.length === 0
        ? `<div style="padding:20px 0;text-align:center;font-size:13px;color:var(--t3)">Aucune activité enregistrée</div>`
        : recent.map(item => item.kind === 'w' ? `
          <div class="recent-row" onclick="openSessionDetail('${item.id}')">
            <div class="rec-icon" style="background:${WORKOUT_PLAN[item.muscleGroup].color}18;border:1px solid ${WORKOUT_PLAN[item.muscleGroup].color}44;color:${WORKOUT_PLAN[item.muscleGroup].color}">${WORKOUT_PLAN[item.muscleGroup].short}</div>
            <div class="flex-1">
              <div class="rec-title">${WORKOUT_PLAN[item.muscleGroup].label}</div>
              <div class="rec-sub">${formatDate(item.date)} · Sem. ${item.weekType}</div>
            </div>
            <span class="rec-val">${fmtVol(item.totalVolume)} kg</span>
          </div>` : `
          <div class="recent-row" onclick="openRunDetail('${item.id}')">
            <div class="rec-icon" style="background:rgba(0,255,212,.08);border:1px solid rgba(0,255,212,.3);color:var(--c-run)">KM</div>
            <div class="flex-1">
              <div class="rec-title">${item.distance.toFixed(1)} km</div>
              <div class="rec-sub">${formatDate(item.date)} · ${fmtPace(item.pace)}/km</div>
            </div>
            <span class="rec-val">${formatDur(item.duration)}</span>
          </div>`
        ).join('')}
    </div>

  </div>
  <div class="spacer"></div>
  `;
}

// ============================================================
// 5. SÉANCE
// ============================================================

let wkState = { muscleGroup: null, weekType: 'A', date: '', prevExercises: [] };

function renderWorkout() {
  const dow = new Date().getDay();
  wkState.muscleGroup = wkState.muscleGroup || DAY_TO_MUSCLE[dow] || 'bras';
  wkState.weekType    = S.weekType;
  wkState.date        = todayStr();
  renderWorkoutForm();
}

function renderWorkoutForm() {
  const mg   = wkState.muscleGroup;
  const wt   = wkState.weekType;
  const exos = WORKOUT_PLAN[mg][wt];
  const last = getLastSession(mg, wt);
  const m    = WORKOUT_PLAN[mg];
  wkState.prevExercises = last ? last.exercises : [];

  document.getElementById('app').innerHTML = `
  <div class="workout-desktop">

    <!-- LEFT: Selectors + Summary -->
    <div class="workout-sidebar">
      <div class="card card-sm mb-10">
        <div class="sect-lbl" style="margin-bottom:10px">Groupe musculaire</div>
        <div class="muscle-chips mb-10">
          ${MUSCLE_KEYS.map(k=>`
            <button class="chip ${k===mg?'active':''}"
              style="${k===mg?`background:${WORKOUT_PLAN[k].color};border-color:${WORKOUT_PLAN[k].color};color:#000;box-shadow:0 0 14px ${WORKOUT_PLAN[k].color}70;`:''}"
              onclick="setWorkoutMuscle('${k}')">
              ${WORKOUT_PLAN[k].label}
            </button>`).join('')}
        </div>
        <div class="sect-lbl" style="margin-bottom:8px">Semaine</div>
        <div class="flex gap-8 mb-10">
          <button class="chip chip-plain ${wt==='A'?'active-a':''}" onclick="setWorkoutWeek('A')">Semaine A</button>
          <button class="chip chip-plain ${wt==='B'?'active-b':''}" onclick="setWorkoutWeek('B')">Semaine B</button>
        </div>
        <div class="sect-lbl" style="margin-bottom:8px">Date</div>
        <input type="date" class="form-inp" id="wk-date" value="${wkState.date}" onchange="wkState.date=this.value">
      </div>

      ${last ? `
      <button class="btn btn-ghost btn-sm mb-10" onclick="fillAllFromLast()" style="gap:5px">
        ↩ Reprendre la dernière séance
      </button>` : ''}

      <!-- Summary / Save -->
      <div class="session-bar" style="position:relative;top:auto">
        <div>
          <div class="sect-lbl" style="margin-bottom:2px">Volume session</div>
          <div><span class="sess-vol" id="session-total">0</span> <span class="sess-unit">kg</span></div>
          ${last
            ? `<div class="sess-ref">Réf. ${fmtVol(last.totalVolume)} kg <span id="session-delta"></span></div>`
            : `<div class="sess-ref">Première séance</div>`}
        </div>
        <button class="btn btn-primary btn-inline btn-sm" onclick="saveWorkout()">Terminer la séance</button>
      </div>

      <div class="form-group mt-12">
        <label class="form-lbl">Notes</label>
        <textarea class="form-inp" id="wk-notes" placeholder="Ressenti, conditions..."></textarea>
      </div>
      <button class="btn btn-primary mt-8" onclick="saveWorkout()">Enregistrer la séance</button>
    </div>

    <!-- RIGHT: Exercises -->
    <div>
      ${exos.map((name, ei) => {
        const prevSets = last ? (last.exercises[ei]?.sets || []) : [];
        const prevLine = prevSets.length ? prevSets.map(s=>`${s.weight}×${s.reps}`).join(' · ') : null;
        return `
        <div class="ex-block" id="ex-${ei}">
          <div class="ex-head">
            <div>
              <div class="ex-meta">Exercice ${ei+1} / ${exos.length}</div>
              <div class="ex-name">${name}</div>
              ${prevLine ? `<div class="ex-prev">Dernière · ${prevLine}</div>` : ''}
            </div>
            <div style="display:flex;gap:5px;flex-shrink:0">
              ${last ? `<button class="copy-pill" onclick="fillFromLast(${ei})" title="Reprendre la séance précédente">↩ Réf.</button>` : ''}
              <button class="copy-pill" onclick="copyFirstSet(${ei})">S1→tous</button>
            </div>
          </div>
          ${Array.from({length:SETS},(_,si)=>{
            const pv = prevSets[si]||{weight:'',reps:''};
            return `
            <div class="set-row">
              <span class="set-num">S${si+1}${pv.weight?`<span class="prev-ref">${pv.weight}×${pv.reps}</span>`:''}</span>
              <div class="inp-pill">
                <button class="adj-btn" onclick="adj(${ei},${si},'weight',-2.5)">−</button>
                <input type="number" class="set-input" inputmode="decimal" step="0.5"
                  id="w-${ei}-${si}" value="${pv.weight}" placeholder="—"
                  oninput="updateVols()" onchange="updateVols()">
                <span class="set-unit-lbl">kg</span>
                <button class="adj-btn" onclick="adj(${ei},${si},'weight',2.5)">+</button>
              </div>
              <span class="set-x">×</span>
              <div class="inp-pill">
                <button class="adj-btn" onclick="adj(${ei},${si},'reps',-1)">−</button>
                <input type="number" class="set-input" inputmode="numeric" step="1"
                  id="r-${ei}-${si}" value="${pv.reps}" placeholder="—"
                  oninput="updateVols()" onchange="updateVols()">
                <span class="set-unit-lbl">rep</span>
                <button class="adj-btn" onclick="adj(${ei},${si},'reps',1)">+</button>
              </div>
              <span class="set-vol" id="sv-${ei}-${si}">—</span>
              <button class="set-timer-btn" onclick="startRestTimer()" title="Chrono 1m30">⏱</button>
            </div>`;
          }).join('')}
          <div class="ex-total" id="ex-vol-${ei}">0 kg</div>
        </div>`;
      }).join('')}
      <div class="spacer"></div>
    </div>

  </div>
  `;
  updateVols();
}

function setWorkoutMuscle(k) { wkState.muscleGroup = k; renderWorkoutForm(); }
function setWorkoutWeek(wt)  { wkState.weekType = wt;   renderWorkoutForm(); }

function adj(ei, si, field, step) {
  const el = document.getElementById(`${field==='weight'?'w':'r'}-${ei}-${si}`);
  if (!el) return;
  if (field==='weight') el.value = Math.max(0, Math.round(((parseFloat(el.value)||0) + step)*10)/10);
  else el.value = Math.max(1, (parseInt(el.value)||0) + step);
  updateVols();
}

function copyFirstSet(ei) {
  const w0 = document.getElementById(`w-${ei}-0`)?.value||'';
  const r0 = document.getElementById(`r-${ei}-0`)?.value||'';
  for (let si=1;si<SETS;si++) {
    const we=document.getElementById(`w-${ei}-${si}`), re=document.getElementById(`r-${ei}-${si}`);
    if(we) we.value=w0; if(re) re.value=r0;
  }
  updateVols();
}

function updateVols() {
  const exos = WORKOUT_PLAN[wkState.muscleGroup][wkState.weekType];
  let total = 0;
  exos.forEach((_,ei)=>{
    let ev=0;
    for(let si=0;si<SETS;si++){
      const w=parseFloat(document.getElementById(`w-${ei}-${si}`)?.value)||0;
      const r=parseInt(document.getElementById(`r-${ei}-${si}`)?.value)||0;
      const v=w*r; ev+=v;
      const el=document.getElementById(`sv-${ei}-${si}`);
      if(el){
        if(v>0){
          const prev=wkState.prevExercises[ei]?.sets[si];
          const prevVol=(parseFloat(prev?.weight)||0)*(parseInt(prev?.reps)||0);
          const d=prevVol>0?(v>prevVol?`<span style="color:var(--green);font-size:9px">↑</span>`:v<prevVol?`<span style="color:var(--red);font-size:9px">↓</span>`:''):'';
          el.innerHTML=`${fmtVol(v)} kg${d}`;
        } else el.textContent='—';
      }
    }
    const el=document.getElementById(`ex-vol-${ei}`);
    if(el) el.textContent = fmtVol(ev)+' kg';
    total+=ev;
  });
  const te=document.getElementById('session-total');
  if(te) te.textContent=fmtVol(total);
  const last=getLastSession(wkState.muscleGroup, wkState.weekType);
  const de=document.getElementById('session-delta');
  if(de&&last&&total>0){
    const d=((total-last.totalVolume)/last.totalVolume*100);
    de.innerHTML=`<span class="${d>=0?'up':'down'}">${d>=0?'↑':'↓'} ${Math.abs(d).toFixed(1)}%</span>`;
  }
}

function saveWorkout() {
  const mg   = wkState.muscleGroup;
  const wt   = wkState.weekType;
  const date = document.getElementById('wk-date')?.value || todayStr();
  const notes= document.getElementById('wk-notes')?.value||'';
  const exos = WORKOUT_PLAN[mg][wt];
  const exercises = exos.map((name,ei)=>({
    name, sets: Array.from({length:SETS},(_,si)=>({
      weight: parseFloat(document.getElementById(`w-${ei}-${si}`)?.value)||0,
      reps:   parseInt(document.getElementById(`r-${ei}-${si}`)?.value)||0
    }))
  }));
  const totalVolume = calcSessionVol(exercises);
  S.weekType = wt;
  S.workouts.push({ id:uid(), date, weekKey:getWeekKey(date), weekType:wt, muscleGroup:mg, exercises, totalVolume, notes });
  save();
  showToast(`${WORKOUT_PLAN[mg].label} · ${fmtVol(totalVolume)} kg`);
  wkState.muscleGroup = null;
  navigate('dashboard');
}

// ============================================================
// 5b. CHRONO REPOS
// ============================================================

let timerState = { active: false, remaining: 90, interval: null };
const TIMER_DURATION = 90;

function startRestTimer() {
  if (timerState.interval) clearInterval(timerState.interval);
  timerState.remaining = TIMER_DURATION;
  timerState.active    = true;
  renderTimerBanner();
  timerState.interval = setInterval(() => {
    timerState.remaining--;
    if (timerState.remaining <= 0) {
      clearInterval(timerState.interval);
      timerState.interval = null;
      timerState.active   = false;
      onTimerEnd();
    } else {
      updateTimerBanner();
    }
  }, 1000);
}

function stopTimer() {
  if (timerState.interval) clearInterval(timerState.interval);
  timerState.interval = null;
  timerState.active   = false;
  const el = document.getElementById('timer-banner');
  if (el) el.classList.remove('active', 'timer-urgent');
}

function renderTimerBanner() {
  let el = document.getElementById('timer-banner');
  if (!el) {
    el = document.createElement('div');
    el.id = 'timer-banner';
    el.className = 'timer-banner';
    document.body.appendChild(el);
  }
  el.classList.remove('timer-urgent');
  const C = 2 * Math.PI * 15.9;
  el.innerHTML = `
    <div class="timer-left">
      <div class="timer-lbl">REPOS</div>
      <div class="timer-count" id="timer-count">${formatTimerTime(timerState.remaining)}</div>
    </div>
    <div class="timer-ring-wrap">
      <svg class="timer-ring" viewBox="0 0 36 36">
        <circle class="timer-ring-bg"   cx="18" cy="18" r="15.9" fill="none" stroke-width="2"/>
        <circle class="timer-ring-fill" id="timer-ring-fill" cx="18" cy="18" r="15.9" fill="none" stroke-width="2"
          stroke-dasharray="${C.toFixed(1)}"
          stroke-dashoffset="0"
          transform="rotate(-90 18 18)"/>
      </svg>
    </div>
    <button class="timer-close" onclick="stopTimer()">✕</button>
  `;
  el.classList.add('active');
}

function updateTimerBanner() {
  const countEl = document.getElementById('timer-count');
  if (countEl) countEl.textContent = formatTimerTime(timerState.remaining);
  const ring = document.getElementById('timer-ring-fill');
  if (ring) {
    const C = 2 * Math.PI * 15.9;
    ring.style.strokeDashoffset = (C * (1 - timerState.remaining / TIMER_DURATION)).toFixed(2);
  }
  const banner = document.getElementById('timer-banner');
  if (banner && timerState.remaining <= 10) banner.classList.add('timer-urgent');
}

function onTimerEnd() {
  const el = document.getElementById('timer-banner');
  if (el) el.classList.remove('active', 'timer-urgent');
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
  showToast('💪 C\'est parti !');
}

function formatTimerTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

// ============================================================
// 5c. NUTRITION & POIDS
// ============================================================

let NUTRI_TARGETS = { calories: 3000, protein: 150 };
// Calculé pour 61 kg · 1m75 · ~25 ans · activité modérée-élevée · prise de masse
// BMR Mifflin-St Jeor ≈ 1584 kcal · TDEE ×1.55 ≈ 2455 · Surplus +500 ≈ 2955 → 3000 kcal
// Protéines : 2.5 g/kg × 61 ≈ 152 → 150 g

let nutriTab    = 'today';
let nutriCharts = {};

function destroyNutriCharts() {
  Object.values(nutriCharts).forEach(c => { try { c.destroy(); } catch {} });
  nutriCharts = {};
}

function renderNutrition() {
  const today    = todayStr();
  const entries  = (S.nutrition || []).filter(n => n.date === today);
  const todayCal  = entries.reduce((s, n) => s + (n.calories || 0), 0);
  const todayProt = entries.reduce((s, n) => s + (n.protein  || 0), 0);
  const calPct  = Math.min((todayCal  / NUTRI_TARGETS.calories) * 100, 100);
  const protPct = Math.min((todayProt / NUTRI_TARGETS.protein)  * 100, 100);

  document.getElementById('app').innerHTML = `
    <div class="tab-row">
      <button class="tab-btn ${nutriTab==='today' ?'active':''}" onclick="setNutriTab('today')">Aujourd'hui</button>
      <button class="tab-btn ${nutriTab==='stats' ?'active':''}" onclick="setNutriTab('stats')">Stats</button>
      <button class="tab-btn ${nutriTab==='weight'?'active':''}" onclick="setNutriTab('weight')">Poids</button>
    </div>
    ${nutriTab === 'today'  ? _nutriToday(todayCal, todayProt, calPct, protPct, entries) : ''}
    ${nutriTab === 'stats'  ? _nutriStats() : ''}
    ${nutriTab === 'weight' ? _nutriWeight() : ''}
    <div class="spacer"></div>
  `;
  requestAnimationFrame(buildNutriCharts);
}

function _nutriToday(todayCal, todayProt, calPct, protPct, entries) {
  return `
    <div class="card">
      <div class="sect-row" style="margin-bottom:16px">
        <span class="sect-lbl">Objectif · Prise de masse</span>
        <span class="t3" style="font-size:10px">61 kg · 1m75</span>
      </div>

      <div style="margin-bottom:16px">
        <div class="flex-between" style="margin-bottom:7px">
          <span style="font-size:22px;font-weight:300;color:var(--t1);font-variant-numeric:tabular-nums">
            ${todayCal.toLocaleString('fr-FR')} <span style="font-size:13px;color:var(--t3)">kcal</span>
          </span>
          <span style="font-size:11px;color:var(--t3)">/ ${NUTRI_TARGETS.calories.toLocaleString('fr-FR')}</span>
        </div>
        <div class="nutri-track"><div class="nutri-fill nutri-cal" style="width:${calPct}%"></div></div>
        <div class="flex-between" style="margin-top:5px">
          <span class="sect-lbl">Calories</span>
          <span style="font-size:10px;color:${calPct>=100?'var(--green)':'var(--t3)'}">${calPct>=100?'Objectif ✓':Math.max(0,NUTRI_TARGETS.calories-todayCal)+' restantes'}</span>
        </div>
      </div>

      <div>
        <div class="flex-between" style="margin-bottom:7px">
          <span style="font-size:22px;font-weight:300;color:var(--t1);font-variant-numeric:tabular-nums">
            ${todayProt} <span style="font-size:13px;color:var(--t3)">g</span>
          </span>
          <span style="font-size:11px;color:var(--t3)">/ ${NUTRI_TARGETS.protein}g protéines</span>
        </div>
        <div class="nutri-track"><div class="nutri-fill nutri-prot" style="width:${protPct}%"></div></div>
        <div class="flex-between" style="margin-top:5px">
          <span class="sect-lbl">Protéines</span>
          <span style="font-size:10px;color:${protPct>=100?'var(--green)':'var(--t3)'}">${protPct>=100?'Objectif ✓':Math.max(0,NUTRI_TARGETS.protein-todayProt)+'g restantes'}</span>
        </div>
      </div>
    </div>

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
              ${e.protein>0?`<span style="color:var(--blue)">${e.protein}g prot.</span> · `:''}${e.calories} kcal
            </div>
          </div>
          <button class="copy-pill" onclick="deleteNutrition('${e.id}')" style="color:var(--red)">×</button>
        </div>
      `).join('')}
    </div>` : ''}
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
        <div class="stat-num" style="color:${diff!==null?(diff>=0?'var(--green)':'var(--red)'):'var(--t1)'}">
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

function logNutrition() {
  const cal  = parseInt(document.getElementById('n-cal')?.value)   || 0;
  const prot = parseFloat(document.getElementById('n-prot')?.value) || 0;
  const note = document.getElementById('n-note')?.value || '';
  if (!cal && !prot) { showToast('Entre calories ou protéines'); return; }
  if (!S.nutrition) S.nutrition = [];
  S.nutrition.push({ id: uid(), date: todayStr(), calories: cal, protein: prot, note });
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
      data:{ labels:dayLbls, datasets:[{ data, backgroundColor:'#FF6B3580', borderColor:'#FF6B35', borderWidth:0, borderRadius:4 }]},
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
      data:{ labels:dayLbls, datasets:[{ data, backgroundColor:'#00D0FF80', borderColor:'#00D0FF', borderWidth:0, borderRadius:4 }]},
      options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false} },
        scales:{ x:{grid:{display:false},ticks:{maxRotation:0}},
          y:{grid:{color:grid}, suggestedMax:NUTRI_TARGETS.protein+20, ticks:{callback:v=>v+'g'}} }
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
        data:{ labels:wlbls, datasets:[{ data:wvals, borderColor:'#00FF80', backgroundColor:'rgba(0,255,128,.06)',
          fill:true, tension:.3, pointRadius:3, pointBackgroundColor:'#00FF80', spanGaps:true }]},
        options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false} },
          scales:{ x:{grid:{display:false},ticks:{maxRotation:0}},
            y:{grid:{color:grid}, min:wmin, max:wmax, ticks:{callback:v=>v+' kg'}} }
        }
      });
    }
  }
}

// ============================================================
// 6. COURSE
// ============================================================

function renderRun() {
  document.getElementById('app').innerHTML = `
    <div class="card">
      <div class="sect-lbl" style="margin-bottom:14px">Logger une course</div>

      <div class="form-group">
        <label class="form-lbl">Date</label>
        <input type="date" class="form-inp" id="run-date" value="${todayStr()}">
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-lbl">Distance</label>
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
    <div class="spacer"></div>
  `;
}

function calcRun() {
  const dist = parseFloat(document.getElementById('run-dist')?.value)||0;
  const dur  = parseDur(document.getElementById('run-dur')?.value||'');
  document.getElementById('run-pace').textContent = dist>0&&dur>0 ? fmtPace(dur/dist)+' /km' : '--:--';
  document.getElementById('run-cal').textContent  = dist>0 ? `~${Math.round(dist*CAL_PER_KM)} kcal` : '— kcal';
}

function setFeeling(v) {
  document.querySelectorAll('.feel-btn').forEach((b,i)=>b.classList.toggle('active',i+1===v));
}

function saveRun() {
  const dist = parseFloat(document.getElementById('run-dist')?.value)||0;
  const dur  = parseDur(document.getElementById('run-dur')?.value||'');
  const date = document.getElementById('run-date')?.value||todayStr();
  const notes= document.getElementById('run-notes')?.value||'';
  const feel = parseInt(document.querySelector('.feel-btn.active')?.dataset.v||'3');
  if(dist<=0){ showToast('Entre la distance'); return; }
  S.runs.push({ id:uid(), date, weekKey:getWeekKey(date), distance:dist, duration:dur, pace:dur>0?dur/dist:0, calories:Math.round(dist*CAL_PER_KM), feeling:feel, notes });
  save();
  showToast(`${dist.toFixed(1)} km · ${fmtPace(dur>0?dur/dist:0)}/km`);
  navigate('dashboard');
}

// ============================================================
// 7. HISTORIQUE
// ============================================================

let histTab = 'workout';

function renderHistory() {
  const items = histTab==='workout'
    ? [...S.workouts].sort((a,b)=>b.date.localeCompare(a.date))
    : [...S.runs].sort((a,b)=>b.date.localeCompare(a.date));

  const groups = {};
  items.forEach(item=>{
    const d=new Date(item.date+'T12:00:00');
    const k=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    if(!groups[k]) groups[k]={lbl:`${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`,items:[]};
    groups[k].items.push(item);
  });

  document.getElementById('app').innerHTML = `
    <div class="tab-row">
      <button class="tab-btn ${histTab==='workout'?'active':''}" onclick="setHistTab('workout')">Musculation (${S.workouts.length})</button>
      <button class="tab-btn ${histTab==='run'?'active':''}" onclick="setHistTab('run')">Course (${S.runs.length})</button>
    </div>

    ${Object.keys(groups).length===0
      ? `<div class="empty"><div class="empty-icon">—</div><h3>Aucune session</h3><p>Commence à logger tes entraînements.</p></div>`
      : Object.keys(groups).sort().reverse().map(gk=>`
        <div class="month-lbl">${groups[gk].lbl}</div>
        ${groups[gk].items.map(item => histTab==='workout' ? `
          <div class="hist-item" onclick="openSessionDetail('${item.id}')">
            <div class="hist-icon" style="background:${WORKOUT_PLAN[item.muscleGroup].color}">${WORKOUT_PLAN[item.muscleGroup].short}</div>
            <div class="hist-info">
              <div class="hist-title">${WORKOUT_PLAN[item.muscleGroup].label} · Sem. ${item.weekType}</div>
              <div class="hist-sub">${formatDate(item.date)} · ${item.exercises.length} exercices</div>
            </div>
            <div class="hist-right">
              <div class="hist-vol">${fmtVol(item.totalVolume)} kg</div>
            </div>
            <span class="hist-chev">›</span>
          </div>
        ` : `
          <div class="hist-item" onclick="openRunDetail('${item.id}')">
            <div class="hist-icon" style="background:#00FFD4">KM</div>
            <div class="hist-info">
              <div class="hist-title">${item.distance.toFixed(1)} km</div>
              <div class="hist-sub">${formatDate(item.date)} · ${fmtPace(item.pace)}/km · ${FEEL_LABELS[(item.feeling||3)-1]}</div>
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

function openSessionDetail(id) {
  const s = S.workouts.find(w=>w.id===id); if(!s) return;
  const m = WORKOUT_PLAN[s.muscleGroup];
  showModal(`
    <div class="modal-head">
      <div>
        <div class="t3" style="font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:3px">${m.label} · Semaine ${s.weekType}</div>
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
        <div class="t3" style="font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:3px">Course</div>
        <div class="modal-title">${r.distance.toFixed(2)} km</div>
        <div class="t3" style="font-size:12px;margin-top:2px">${formatDate(r.date)}</div>
      </div>
      <button class="modal-close" onclick="closeModal()">×</button>
    </div>
    <div class="stats-grid mt-12">
      <div class="stat-box"><div class="stat-lbl">Durée</div><div class="stat-num" style="font-size:22px">${formatDur(r.duration)}</div></div>
      <div class="stat-box"><div class="stat-lbl">Allure</div><div class="stat-num" style="font-size:20px">${fmtPace(r.pace)}<span class="stat-unit">/km</span></div></div>
      <div class="stat-box"><div class="stat-lbl">Calories</div><div class="stat-num">${r.calories}<span class="stat-unit"> kcal</span></div></div>
      <div class="stat-box"><div class="stat-lbl">Ressenti</div><div class="stat-num" style="font-size:20px">${FEEL_LABELS[(r.feeling||3)-1]}</div></div>
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
let period = 8;

function renderStats() {
  const bestVol = (() => { const wks=[...new Set(S.workouts.map(w=>w.weekKey))]; return wks.length?Math.round(Math.max(...wks.map(wk=>totalVol(wk)))):0; })();
  const avgPace = (() => { const ps=S.runs.filter(r=>r.pace>0).map(r=>r.pace); return ps.length?fmtPace(ps.reduce((s,p)=>s+p,0)/ps.length):'--:--'; })();

  document.getElementById('app').innerHTML = `
    <div class="period-row">
      <button class="period-btn ${period===4?'active':''}" onclick="setPeriod(4)">4 sem.</button>
      <button class="period-btn ${period===8?'active':''}" onclick="setPeriod(8)">8 sem.</button>
      <button class="period-btn ${period===12?'active':''}" onclick="setPeriod(12)">3 mois</button>
    </div>

    <div class="stats-grid">
      <div class="stat-box">
        <div class="stat-lbl">Séances</div>
        <div class="stat-num">${S.workouts.length}</div>
        <div class="stat-sub">Musculation</div>
      </div>
      <div class="stat-box">
        <div class="stat-lbl">Km total</div>
        <div class="stat-num">${S.runs.reduce((s,r)=>s+r.distance,0).toFixed(0)}<span class="stat-unit"> km</span></div>
        <div class="stat-sub">${S.runs.length} sorties</div>
      </div>
      <div class="stat-box">
        <div class="stat-lbl">Meilleure sem.</div>
        <div class="stat-num" style="font-size:22px">${(bestVol/1000).toFixed(1)}<span class="stat-unit"> t</span></div>
        <div class="stat-sub">Volume muscu</div>
      </div>
      <div class="stat-box">
        <div class="stat-lbl">Allure moy.</div>
        <div class="stat-num" style="font-size:22px">${avgPace}<span class="stat-unit">/km</span></div>
        <div class="stat-sub">Toutes sorties</div>
      </div>
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

    ${S.runs.length > 0 ? (() => {
      const best = [...S.runs].filter(r=>r.pace>0).sort((a,b)=>a.pace-b.pace)[0];
      const longest = [...S.runs].sort((a,b)=>b.distance-a.distance)[0];
      const totalCal = S.runs.reduce((s,r)=>s+r.calories,0);
      return `<div class="card">
        <div class="sect-row" style="margin-bottom:14px">
          <span class="sect-lbl">Running · records</span>
        </div>
        <div class="stats-grid" style="margin-bottom:0">
          <div class="stat-box">
            <div class="stat-lbl">Meilleure allure</div>
            <div class="stat-num" style="font-size:22px">${fmtPace(best.pace)}<span class="stat-unit">/km</span></div>
            <div class="stat-sub">${formatDate(best.date)}</div>
          </div>
          <div class="stat-box">
            <div class="stat-lbl">Plus longue sortie</div>
            <div class="stat-num" style="font-size:22px">${longest.distance.toFixed(1)}<span class="stat-unit"> km</span></div>
            <div class="stat-sub">${formatDate(longest.date)}</div>
          </div>
          <div class="stat-box">
            <div class="stat-lbl">Total km</div>
            <div class="stat-num" style="font-size:22px">${S.runs.reduce((s,r)=>s+r.distance,0).toFixed(0)}<span class="stat-unit"> km</span></div>
            <div class="stat-sub">${S.runs.length} sorties</div>
          </div>
          <div class="stat-box">
            <div class="stat-lbl">Calories totales</div>
            <div class="stat-num" style="font-size:22px">${(totalCal/1000).toFixed(1)}<span class="stat-unit">k</span></div>
            <div class="stat-sub">kcal brûlées</div>
          </div>
        </div>
      </div>`;
    })() : ''}

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
      <div class="card" style="margin-bottom:0">
        <div class="chart-lbl"><span>Course · km/sem.</span></div>
        <div class="chart-wrap chart-wrap-sm"><canvas id="chart-run"></canvas></div>
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
  const initial   = (p.name||'?')[0].toUpperCase();

  document.getElementById('app').innerHTML = `
    <!-- AVATAR + NOM -->
    <div class="prof-header">
      <div class="prof-avatar">${initial}</div>
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
          <span class="prof-legend-dash" style="border-color:#22C55E"></span>Ligne cible
        </span>
        <span class="prof-legend-item">
          <span class="prof-legend-solid"></span>Réel
        </span>
      </div>
    </div>

    <!-- SETTINGS GROUPS -->
    <div class="prof-group-lbl">Nutrition</div>
    <div class="prof-settings-card">
      <div class="prof-row">
        <div class="prof-row-left">
          <span class="prof-row-dot" style="background:#FF6B35"></span>
          <span class="prof-row-label">Calories / jour</span>
        </div>
        <div class="prof-row-right">
          <input id="g-cal" class="prof-row-input" type="number"
            value="${nut.cal||3000}" step="50" min="500" max="6000">
          <span class="prof-row-unit">kcal</span>
        </div>
      </div>
      <div class="prof-row-divider"></div>
      <div class="prof-row">
        <div class="prof-row-left">
          <span class="prof-row-dot" style="background:var(--blue)"></span>
          <span class="prof-row-label">Protéines / jour</span>
        </div>
        <div class="prof-row-right">
          <input id="g-prot" class="prof-row-input" type="number"
            value="${nut.prot||150}" step="5" min="20" max="400">
          <span class="prof-row-unit">g</span>
        </div>
      </div>
    </div>

    <div class="prof-group-lbl">Course</div>
    <div class="prof-settings-card">
      <div class="prof-row">
        <div class="prof-row-left">
          <span class="prof-row-dot" style="background:var(--c-run)"></span>
          <span class="prof-row-label">Objectif hebdomadaire</span>
        </div>
        <div class="prof-row-right">
          <input id="g-km" class="prof-row-input" type="number"
            value="${S.runGoal||15}" step="1" min="0" max="300">
          <span class="prof-row-unit">km</span>
        </div>
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
  gradTarget.addColorStop(0, 'rgba(34,197,94,.10)');
  gradTarget.addColorStop(1, 'rgba(34,197,94,0)');

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
        borderColor: '#22C55E',
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
          ticks: { maxTicksLimit: 4, callback: v => v + ' kg', color: tickColor, font: { size: 10 } },
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
  S.nutGoal = { cal: parseInt(document.getElementById('g-cal')?.value) || 3000, prot: parseInt(document.getElementById('g-prot')?.value) || 150 };
  S.runGoal = parseInt(document.getElementById('g-km')?.value) || 15;
  RUN_GOAL_KM  = S.runGoal;
  NUTRI_TARGETS = { calories: S.nutGoal.cal, protein: S.nutGoal.prot };
  save();
  showToast('Enregistré ✓');
  buildWeightChart();
}

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
      backgroundColor:'#00FFD470', borderColor:'#00FFD4', borderWidth:0, borderRadius:4 }]},
    options:{ responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{x:{grid:{display:false},ticks:{maxRotation:0}}, y:{suggestedMax:RUN_GOAL_KM+2,grid:{color:grid},ticks:{callback:v=>v+' km'}}}
    }
  });
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
  if(!el){ el=document.createElement('div'); el.id='toast'; el.style.cssText=`position:fixed;bottom:calc(var(--nav-h)+14px);left:50%;transform:translateX(-50%);padding:10px 18px;border-radius:var(--r-sm);font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;z-index:300;white-space:nowrap;max-width:90vw;text-align:center;transition:opacity .3s,transform .3s;`; document.body.appendChild(el); }
  el.textContent=msg; el.style.opacity='1'; el.style.transform='translateX(-50%) translateY(0)';
  clearTimeout(_toast);
  _toast=setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateX(-50%) translateY(8px)'; },2600);
}

// ============================================================
// 10. NAVIGATION
// ============================================================

function toggleMenu() { document.body.classList.toggle('menu-open'); }
function closeMenu()  { document.body.classList.remove('menu-open'); }

function initSwipe() {
  const VIEWS = ['dashboard','workout','run','nutrition','history','stats','profile'];
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
  S.view = view;
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.toggle('active',el.dataset.view===view));
  if(view!=='stats')      destroyCharts();
  if(view!=='nutrition')  destroyNutriCharts();
  ({ dashboard:renderDashboard, workout:renderWorkout, run:renderRun, history:renderHistory, stats:renderStats, nutrition:renderNutrition, profile:renderProfile })[view]?.();
  const app = document.getElementById('app');
  app.scrollTop = 0;
  const first = app.firstElementChild;
  if (first) { first.style.animation='none'; first.offsetHeight; first.style.animation='viewIn .2s cubic-bezier(.16,1,.3,1) both'; }
}

function initEvents() {
  document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>{navigate(b.dataset.view);closeMenu();}));

  document.getElementById('btn-theme').addEventListener('click',()=>{
    const isLight = document.documentElement.dataset.theme==='light';
    const next = isLight ? 'dark' : 'light';
    document.documentElement.dataset.theme=next; S.theme=next; save();
    document.getElementById('icon-sun').style.display  = next==='dark'?'none':'block';
    document.getElementById('icon-moon').style.display = next==='dark'?'block':'none';
    document.getElementById('meta-theme').content = next==='dark'?'#0f0f0f':'#f2f2f2';
    if(S.view==='stats'){ destroyCharts(); renderStats(); }
  });

  document.getElementById('btn-week-toggle').addEventListener('click',()=>{
    S.weekType = S.weekType==='A'?'B':'A'; save(); updateWeekBadge();
    if(S.view==='workout') renderWorkout();
    else if(S.view==='dashboard') renderDashboard();
    showToast(`Semaine ${S.weekType}`);
  });

  document.getElementById('modal-overlay').addEventListener('click',e=>{ if(e.target.id==='modal-overlay') closeModal(); });
}

function updateWeekBadge() {
  const b=document.getElementById('btn-week-toggle');
  if(!b) return;
  b.textContent=`SEM. ${S.weekType}`;
  b.className=`week-badge${S.weekType==='B'?' week-b':''}`;
}

function applyTheme() {
  document.documentElement.dataset.theme=S.theme;
  const dark=S.theme==='dark';
  document.getElementById('icon-sun').style.display  = dark?'none':'block';
  document.getElementById('icon-moon').style.display = dark?'block':'none';
  document.getElementById('meta-theme').content = dark?'#0f0f0f':'#f2f2f2';
}

// ============================================================
// 11. PWA & INIT
// ============================================================

function registerSW() {
  if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
}

function init() {
  loadState(); applyTheme(); updateWeekBadge(); initEvents();
  navigate(S.view||'dashboard'); registerSW();
  initSwipe();
  initFirebase();
  if (syncCode && db) pullFromCloud();
}

init();
