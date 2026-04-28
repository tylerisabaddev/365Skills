// ============================
//  365 Skills · App logic
// ============================

const PAGE_SIZE = 60;
const STORAGE_KEY = 'skills365_v1';
const DEV_STORAGE_KEY = 'skills365_dev_v1';

// ---- State ----
let state = loadState();
let activeFilter = 'All';
let page = 0;
let currentModalDay = null;
let devMode = false;
let devState = loadDevState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return {
    startDate: new Date().toISOString().slice(0,10),
    completed: {},
    notes: {}
  };
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e) {}
}

function loadDevState() {
  try {
    const raw = localStorage.getItem(DEV_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migrate old saves that predate seenReplacements
      if (!parsed.seenReplacements) parsed.seenReplacements = {};
      return parsed;
    }
  } catch(e) {}
  return { approved: {}, rejected: {}, replacements: {}, seenReplacements: {} };
}

function saveDevState() {
  try { localStorage.setItem(DEV_STORAGE_KEY, JSON.stringify(devState)); } catch(e) {}
}

// Returns replacement skill for a day if one exists, otherwise original
function getSkillResolved(day) {
  if (devState.replacements[day]) return devState.replacements[day];
  return getSkill(day);
}

// ---- Date helpers ----
function todayStr() { return new Date().toISOString().slice(0,10); }
function daysBetween(a, b) {
  const d1 = new Date(a), d2 = new Date(b);
  return Math.round((d2 - d1) / (1000*60*60*24));
}
function currentDayNumber() {
  const since = daysBetween(state.startDate, todayStr());
  return Math.max(1, Math.min(365, since + 1));
}

// ---- Streak calculation ----
function calcStreak() {
  const dates = Object.values(state.completed).sort();
  if (!dates.length) return { current: 0, best: 0 };

  const uniqueDates = [...new Set(dates)].sort();
  let best = 1, currentRun = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    if (daysBetween(uniqueDates[i-1], uniqueDates[i]) === 1) {
      currentRun++;
      best = Math.max(best, currentRun);
    } else {
      currentRun = 1;
    }
  }

  const today = todayStr();
  const lastDate = uniqueDates[uniqueDates.length - 1];
  const gap = daysBetween(lastDate, today);
  let current = 0;
  if (gap <= 1) {
    current = 1;
    for (let i = uniqueDates.length - 1; i > 0; i--) {
      if (daysBetween(uniqueDates[i-1], uniqueDates[i]) === 1) current++;
      else break;
    }
  }

  return { current, best };
}

// ---- Toggle complete ----
function toggleComplete(day) {
  if (state.completed[day]) {
    delete state.completed[day];
  } else {
    state.completed[day] = todayStr();
  }
  saveState();
  renderAll();
}

// ---- Note save (debounced) ----
let noteTimer = null;
function saveNote(day, text) {
  clearTimeout(noteTimer);
  const status = document.getElementById('save-status');
  if (status) status.textContent = '';
  noteTimer = setTimeout(() => {
    if (text.trim()) state.notes[day] = text;
    else delete state.notes[day];
    saveState();
    if (status) {
      status.textContent = '✓ saved';
      setTimeout(() => { if (status.textContent === '✓ saved') status.textContent = ''; }, 1800);
    }
    renderGrid();
  }, 500);
}

// ---- Filter / search ----
function getFiltered() {
  const q = document.getElementById('search').value.trim().toLowerCase();
  return SKILLS.filter(([d, name, cat]) => {
    const matchCat = activeFilter === 'All' || cat === activeFilter;
    if (!matchCat) return false;
    if (!q) return true;
    const displayName = devState.replacements[d] ? devState.replacements[d].name : name;
    return displayName.toLowerCase().includes(q) ||
           cat.toLowerCase().includes(q) ||
           String(d).includes(q);
  });
}

// ---- Renders ----
function renderStats() {
  const completedCount = Object.keys(state.completed).length;
  const { current, best } = calcStreak();
  document.getElementById('done-count').textContent = completedCount;
  document.getElementById('streak').textContent = current;
  document.getElementById('best-streak').textContent = best;
  document.getElementById('pct').textContent = Math.round(completedCount / 365 * 100);
  document.getElementById('start-date').textContent = formatDate(state.startDate);
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
}

function renderToday() {
  const day = currentDayNumber();
  const skill = getSkillResolved(day);
  if (!skill) return;
  document.getElementById('today-day').textContent = day;
  document.getElementById('today-skill').textContent = skill.name;
  document.getElementById('today-meta').textContent =
    `${skill.category} · ${skill.difficulty} · ${skill.time}`;

  const isDone = !!state.completed[day];
  const btn = document.getElementById('today-mark');
  btn.textContent = isDone ? '✓ Completed today' : 'Mark complete';
  btn.className = isDone ? 'success' : 'primary';
}

function renderFilters() {
  const wrap = document.getElementById('cat-filters');
  if (wrap.children.length) return;
  CATEGORIES.forEach(c => {
    const b = document.createElement('button');
    b.className = 'pill' + (c === activeFilter ? ' active' : '');
    b.textContent = c;
    b.onclick = () => {
      activeFilter = c;
      page = 0;
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      b.classList.add('active');
      renderGrid();
    };
    wrap.appendChild(b);
  });
}

function renderGrid() {
  const data = getFiltered();
  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  if (page >= totalPages) page = 0;
  const slice = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const todayD = currentDayNumber();

  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  if (!slice.length) {
    grid.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--ink-muted); grid-column: 1/-1; background: var(--surface); border-radius: 5px;">No skills match your search.</div>';
  } else {
    slice.forEach(([d, name, cat]) => {
      const card = document.createElement('div');
      const isDone = !!state.completed[d];
      const isToday = d === todayD;
      const isPast = d < todayD;
      const isIncomplete = isPast && !isDone;
      const hasNote = !!(state.notes[d] && state.notes[d].trim());
      const isApproved = !!devState.approved[d];
      const isReplaced = !!devState.replacements[d];
      const displayName = isReplaced ? devState.replacements[d].name : name;
      const displayCat = isReplaced ? devState.replacements[d].category : cat;

      let cls = 'card';
      if (isDone) cls += ' done';
      else if (isIncomplete) cls += ' incomplete';
      if (isToday) cls += ' today-card';
      if (isApproved) cls += ' dev-approved';
      if (isReplaced) cls += ' dev-replaced';

      card.className = cls;

      const devOverlay = devMode ? `
        <div class="dev-overlay">
          <button class="dev-approve-btn" onclick="devApprove(${d}, event)" title="Good skill — keep it">✓</button>
          <button class="dev-reject-btn" onclick="devReject(${d}, event)" title="Bad skill — replace it">✗</button>
        </div>` : '';

      const approvedBadge = isApproved ? '<span class="dev-badge approved">✓ kept</span>' : '';
      const replacedBadge = isReplaced ? '<span class="dev-badge replaced">replaced</span>' : '';

      card.innerHTML = `
        <div>
          <div class="day-num">Day ${d}${isToday ? ' · TODAY' : ''}</div>
          <div class="skill-name">${displayName}${approvedBadge}${replacedBadge}</div>
        </div>
        <div class="card-foot">
          <span class="cat">${displayCat}</span>
          <span>
            ${hasNote ? '<span class="has-note">✎ note</span>' : ''}
            ${isDone ? '<span class="check-mark">✓ done</span>' : ''}
            ${isIncomplete ? '<span class="missed-mark">✗ missed</span>' : ''}
          </span>
        </div>
        ${devOverlay}
      `;
      card.onclick = () => openModal(d);
      grid.appendChild(card);
    });
  }

  // Pager
  const pager = document.getElementById('pager');
  pager.innerHTML = '';
  if (totalPages > 1) {
    const prev = document.createElement('button');
    prev.textContent = '← Prev';
    prev.disabled = page === 0;
    prev.onclick = () => { if (page > 0) { page--; renderGrid(); window.scrollTo({ top: document.querySelector('.controls').offsetTop - 80, behavior: 'smooth' }); } };

    const next = document.createElement('button');
    next.textContent = 'Next →';
    next.disabled = page >= totalPages - 1;
    next.onclick = () => { if (page < totalPages - 1) { page++; renderGrid(); window.scrollTo({ top: document.querySelector('.controls').offsetTop - 80, behavior: 'smooth' }); } };

    const info = document.createElement('span');
    info.textContent = `Page ${page+1} / ${totalPages}`;

    pager.append(prev, info, next);
  }
}

// ---- Skill images (Wikipedia) ----
async function loadSkillImages(skillName) {
  const wrap = document.getElementById('m-images');
  if (!wrap) return;
  wrap.innerHTML = '<div class="img-loading">loading images...</div>';

  try {
    const q = encodeURIComponent(skillName);
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${q}&prop=pageimages&piprop=thumbnail&pithumbsize=500&format=json&origin=*&gsrlimit=6`;
    const res = await fetch(url);
    const data = await res.json();

    const pages = data.query?.pages ? Object.values(data.query.pages) : [];
    const images = pages
      .filter(p => p.thumbnail?.source)
      .map(p => ({ url: p.thumbnail.source, title: p.title }))
      .slice(0, 3);

    if (!images.length) {
      wrap.innerHTML = '<div class="img-loading">no images found</div>';
      return;
    }

    wrap.innerHTML = images.map(img => `
      <div class="skill-img-wrap">
        <img src="${img.url}" alt="${img.title}" loading="lazy">
        <span class="img-caption">${img.title}</span>
      </div>
    `).join('');
  } catch(e) {
    wrap.innerHTML = '';
  }
}

// ---- Modal ----
function openModal(day) {
  const skill = getSkillResolved(day);
  if (!skill) return;
  currentModalDay = day;

  document.getElementById('m-day').textContent = day;
  document.getElementById('m-skill').textContent = skill.name;
  document.getElementById('m-cat').textContent = skill.category;
  document.getElementById('m-diff').textContent = skill.difficulty;
  document.getElementById('m-time').textContent = skill.time;
  document.getElementById('m-desc').textContent = skill.description;
  document.getElementById('m-howto').textContent = skill.howto;

  loadSkillImages(skill.name);

  const resWrap = document.getElementById('m-resources');
  resWrap.innerHTML = '';
  skill.resources.forEach(r => {
    const span = document.createElement('span');
    span.textContent = '→ ' + r;
    span.style.fontSize = '13px';
    span.style.color = 'var(--ink-soft)';
    span.style.paddingBottom = '0.3rem';
    span.style.borderBottom = '1px dotted var(--line-strong)';
    resWrap.appendChild(span);
  });
  const searchLink = document.createElement('a');
  const q = encodeURIComponent('how to ' + skill.name + ' tutorial');
  searchLink.href = `https://www.youtube.com/results?search_query=${q}`;
  searchLink.target = '_blank';
  searchLink.rel = 'noopener';
  searchLink.textContent = `↗ Find tutorials on YouTube`;
  resWrap.appendChild(searchLink);

  const noteEl = document.getElementById('m-note');
  noteEl.value = state.notes[day] || '';
  document.getElementById('save-status').textContent = '';
  noteEl.oninput = () => saveNote(day, noteEl.value);

  const toggle = document.getElementById('m-toggle');
  const isDone = !!state.completed[day];
  toggle.textContent = isDone ? '✓ Mark incomplete' : 'Mark complete';
  toggle.className = isDone ? 'success' : 'primary';
  toggle.onclick = () => {
    toggleComplete(day);
    openModal(day);
  };

  document.getElementById('m-prev').onclick = () => { if (day > 1) openModal(day - 1); };
  document.getElementById('m-next').onclick = () => { if (day < 365) openModal(day + 1); };

  document.getElementById('modal-bg').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-bg').classList.remove('open');
  document.body.style.overflow = '';
  currentModalDay = null;
}

// ============================================================
//  DEV MODE
// ============================================================

function toggleDevMode() {
  devMode = !devMode;
  document.body.classList.toggle('dev-mode', devMode);
  const btn = document.getElementById('dev-toggle');
  btn.classList.toggle('active', devMode);
  btn.textContent = devMode ? '⚙ Dev: ON' : '⚙ Dev Mode';
  renderDevPanel();
  renderGrid();
}

function devApprove(day, e) {
  e.stopPropagation();
  devState.approved[day] = true;
  saveDevState();
  renderGrid();
  renderDevPanel();
}

function devReject(day, e) {
  e.stopPropagation();
  if (!devState.seenReplacements) devState.seenReplacements = {};
  const original = SKILLS.find(s => s[0] === day);
  const originalName = original ? original[1] : '?';
  const category = original ? original[2] : 'Mind';

  // Record the current replacement (or original) as seen for this day before replacing
  if (!devState.seenReplacements[day]) devState.seenReplacements[day] = [];
  const currentName = devState.replacements[day]
    ? devState.replacements[day].name
    : originalName;
  if (!devState.seenReplacements[day].includes(currentName)) {
    devState.seenReplacements[day].push(currentName);
  }

  devState.rejected[day] = {
    originalName,
    category,
    rejectedAt: new Date().toISOString()
  };
  delete devState.approved[day];

  const replacement = pickReplacement(day, category);
  if (replacement) {
    devState.replacements[day] = replacement;
  } else {
    // Pool exhausted for this category
    devState.replacements[day] = {
      day, name: `[New ${category} skill needed]`, category,
      difficulty: '—', time: '—', description: 'All backups used — add more to BACKUP_SKILLS.',
      howto: '', resources: [], isReplacement: true
    };
  }

  saveDevState();
  renderGrid();
  renderDevPanel();
}

function pickReplacement(day, category) {
  const pool = BACKUP_SKILLS[category] || [];
  // Never show a name that has already appeared in this day's slot
  const seenForDay = new Set(devState.seenReplacements[day] || []);
  const available = pool.filter(s => !seenForDay.has(s.name));
  if (!available.length) return null;

  const pick = available[Math.floor(Math.random() * available.length)];
  // Pre-emptively mark it seen so even if called twice it won't repeat
  if (!devState.seenReplacements[day]) devState.seenReplacements[day] = [];
  devState.seenReplacements[day].push(pick.name);

  const base = CATEGORY_INFO[category] || CATEGORY_INFO['Mind'];
  return {
    day,
    name: pick.name,
    category,
    difficulty: base.diff,
    time: base.time,
    description: `${pick.name} — ${base.desc.toLowerCase()}`,
    howto: base.howto,
    resources: base.res,
    isReplacement: true
  };
}

function renderDevPanel() {
  const panel = document.getElementById('dev-panel');
  if (!panel) return;
  const approvedCount = Object.keys(devState.approved).length;
  const rejectedCount = Object.keys(devState.rejected).length;
  const replacedCount = Object.keys(devState.replacements).length;
  const pending = 365 - approvedCount - rejectedCount;

  panel.innerHTML = `
    <div class="dev-panel-title">⚙ Skill Feedback</div>
    <div class="dev-stat-row"><span>Approved</span><span class="dev-val-green">${approvedCount}</span></div>
    <div class="dev-stat-row"><span>Rejected</span><span class="dev-val-red">${rejectedCount}</span></div>
    <div class="dev-stat-row"><span>Replaced</span><span class="dev-val-amber">${replacedCount}</span></div>
    <div class="dev-stat-row"><span>Pending</span><span class="dev-val">${pending}</span></div>
    <button class="dev-export-btn" onclick="exportDevData()">Export JSON ↓</button>
  `;
}

function exportDevData() {
  const data = {
    exportedAt: new Date().toISOString(),
    summary: {
      approved: Object.keys(devState.approved).length,
      rejected: Object.keys(devState.rejected).length,
      replaced: Object.keys(devState.replacements).length
    },
    approved: Object.keys(devState.approved).map(d => {
      const s = getSkillResolved(Number(d));
      return { day: Number(d), name: s?.name, category: s?.category };
    }),
    rejected: Object.entries(devState.rejected).map(([d, info]) => ({
      day: Number(d),
      originalName: info.originalName,
      category: info.category,
      replacedWith: devState.replacements[d]?.name || null,
      rejectedAt: info.rejectedAt
    }))
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `365skills-feedback-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ============================================================
//  CLOCK + TIMEZONE
// ============================================================
const TIMEZONES = [
  { region: 'Pacific',   name: 'Los Angeles',  tz: 'America/Los_Angeles' },
  { region: 'Mountain',  name: 'Denver',       tz: 'America/Denver' },
  { region: 'Central',   name: 'Chicago',      tz: 'America/Chicago' },
  { region: 'Eastern',   name: 'New York',     tz: 'America/New_York' },
  { region: 'UTC',       name: 'Universal',    tz: 'UTC' },
  { region: 'London',    name: 'UK',           tz: 'Europe/London' },
  { region: 'Paris',     name: 'Europe',       tz: 'Europe/Paris' },
  { region: 'Dubai',     name: 'Gulf',         tz: 'Asia/Dubai' },
  { region: 'Tokyo',     name: 'Japan',        tz: 'Asia/Tokyo' },
  { region: 'Sydney',    name: 'Australia',    tz: 'Australia/Sydney' },
];

const TZ_STORAGE_KEY = 'skills365_tz';
let currentTZ = localStorage.getItem(TZ_STORAGE_KEY) || 'America/Denver';

function updateClock() {
  const now = new Date();
  const dateParts = new Intl.DateTimeFormat('en-US', {
    timeZone: currentTZ, weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  }).formatToParts(now);

  const d = {};
  dateParts.forEach(p => { d[p.type] = p.value; });
  document.getElementById('clock-date').textContent =
    `${d.weekday} · ${d.month} ${d.day} · ${d.year}`.toUpperCase();

  const tzAbbr = new Intl.DateTimeFormat('en-US', {
    timeZone: currentTZ, timeZoneName: 'short'
  }).formatToParts(now).find(p => p.type === 'timeZoneName')?.value || '';

  const timeStr = new Intl.DateTimeFormat('en-US', {
    timeZone: currentTZ, hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true
  }).format(now);

  document.getElementById('clock-time').textContent = `${timeStr}  ${tzAbbr}`;
}

function initClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

function renderTZOptions() {
  const list = document.getElementById('tz-list');
  list.innerHTML = TIMEZONES.map(({ region, name, tz }) => `
    <button class="tz-option${tz === currentTZ ? ' active' : ''}" onclick="selectTZ('${tz}')">
      <span class="tz-region">${region}</span>
      <span class="tz-name">${name}</span>
    </button>
  `).join('');
}

function selectTZ(tz) {
  currentTZ = tz;
  localStorage.setItem(TZ_STORAGE_KEY, tz);
  updateClock();
  renderTZOptions();
}

function initSettings() {
  const settingsBtn = document.getElementById('settings-btn');
  const popover     = document.getElementById('settings-popover');
  renderTZOptions();

  settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('lock-popover').classList.remove('open');
    popover.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!popover.contains(e.target) && e.target !== settingsBtn) {
      popover.classList.remove('open');
    }
  });
}

// ============================================================
//  LOCK / PASSWORD GATE
// ============================================================
const _dp = [116,121,108,101,114,115,101,99,114,101,116].map(c=>String.fromCharCode(c)).join('');

function initLock() {

  const lockBtn = document.getElementById('lock-btn');
  const popover = document.getElementById('lock-popover');

  lockBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (document.body.classList.contains('dev-unlocked')) {
      applyLocked();
      return;
    }
    popover.classList.toggle('open');
    if (popover.classList.contains('open')) {
      const input = document.getElementById('lock-input');
      if (input) input.focus();
    }
  });

  // Event delegation so keydown still works after innerHTML resets
  popover.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitPassword();
    if (e.key === 'Escape') popover.classList.remove('open');
  });

  // Close popover when clicking outside
  document.addEventListener('click', (e) => {
    if (!popover.contains(e.target) && e.target !== lockBtn) {
      popover.classList.remove('open');
    }
  });
}

function applyLocked() {
  if (devMode) toggleDevMode();
  document.body.classList.remove('dev-unlocked');
  const lockBtn = document.getElementById('lock-btn');
  lockBtn.classList.remove('unlocked');
  lockBtn.textContent = '🔒';
  document.getElementById('lock-popover').classList.remove('open');
  document.getElementById('lock-popover-title').textContent = 'Dev access';
  document.getElementById('lock-popover-body').innerHTML =
    '<input class="lock-input" id="lock-input" type="password" placeholder="enter password" autocomplete="off"><div class="lock-error" id="lock-error"></div>';
  renderGrid();
}

function submitPassword() {
  const input = document.getElementById('lock-input');
  const error = document.getElementById('lock-error');

  if (input.value === _dp) {
    applyUnlocked();
    input.value = '';
    document.getElementById('lock-popover').classList.remove('open');
  } else {
    input.classList.add('error');
    error.textContent = 'incorrect';
    input.value = '';
    setTimeout(() => {
      input.classList.remove('error');
      error.textContent = '';
    }, 1400);
    input.focus();
  }
}

function applyUnlocked() {
  document.body.classList.add('dev-unlocked');
  document.getElementById('lock-btn').classList.add('unlocked');
  document.getElementById('lock-btn').textContent = '🔓';
  document.getElementById('lock-popover-title').textContent = 'Dev mode unlocked';
  document.getElementById('lock-popover-body').innerHTML =
    '<div class="lock-unlocked-msg">✓ dev tools available</div>';
}

// ---- Wire up events ----
function init() {
  renderFilters();
  renderAll();
  renderDevPanel();
  initClock();
  initSettings();
  initLock();

  document.getElementById('dev-toggle').onclick = toggleDevMode;
  document.getElementById('search').addEventListener('input', () => { page = 0; renderGrid(); });
  document.getElementById('jump-today').onclick = () => {
    activeFilter = 'All';
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    document.querySelector('.pill').classList.add('active');
    document.getElementById('search').value = '';
    const todayD = currentDayNumber();
    const idx = SKILLS.findIndex(s => s[0] === todayD);
    page = Math.floor(idx / PAGE_SIZE);
    renderGrid();
    setTimeout(() => {
      window.scrollTo({ top: document.querySelector('.today-hero').offsetTop - 80, behavior: 'smooth' });
    }, 100);
  };
  document.getElementById('today-mark').onclick = () => {
    toggleComplete(currentDayNumber());
  };
  document.getElementById('today-detail').onclick = () => openModal(currentDayNumber());

  document.getElementById('modal-close').onclick = closeModal;
  document.getElementById('modal-bg').addEventListener('click', (e) => {
    if (e.target.id === 'modal-bg') closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('modal-bg').classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft' && currentModalDay > 1) openModal(currentModalDay - 1);
    if (e.key === 'ArrowRight' && currentModalDay < 365) openModal(currentModalDay + 1);
  });
}

function renderAll() {
  renderStats();
  renderToday();
  renderGrid();
}

document.addEventListener('DOMContentLoaded', init);
