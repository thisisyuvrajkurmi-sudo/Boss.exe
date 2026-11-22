import './styles/main.css';
import { sceneSVG } from './scene.js';
import { ACTS, KEYS, NAGS, ENDINGS } from './acts.js';
import { audio, settings, saveSettings } from './audio.js';

const $ = (s) => document.querySelector(s);
const SVGNS = 'http://www.w3.org/2000/svg';
const st = { chaos: 0, warn: 0, busy: true, running: false, timers: [], prev: 'menu' };
const later = (ms, fn) => { const t = setTimeout(fn, ms); st.timers.push(t); };
const clearTimers = () => { st.timers.forEach(clearTimeout); st.timers = []; };

$('#sceneHost').innerHTML = sceneSVG;
audio.load(import.meta.env.BASE_URL);

let current = 'menu';
function show(name) {
  if (name === 'back') name = st.prev === 'game' ? 'game' : 'menu';
  if (name === 'settings' || name === 'credits') st.prev = current;
  if (name !== 'game') { st.running = false; clearTimers(); }
  document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.id === name));
  current = name;
  if (name === 'game' && !st.running) startRound();
}

function startRound() {
  clearTimers(); audio.stop();
  Object.assign(st, { chaos: 0, warn: 0, busy: true, running: true });
  $('#caption').classList.remove('on');
  updateHud();
  const boss = $('#boss');
  boss.className = 'boss b-walk';
  caption('Here comes the boss\u2026');
  later(1800, () => { boss.className = 'boss'; st.busy = false; caption(''); scheduleNag(); });
}

function updateHud() { $('#chaos').textContent = st.chaos; $('#warn').textContent = st.warn; }
function caption(t) { const c = $('#caption'); c.textContent = t; c.classList.toggle('on', !!t); }

function scheduleNag() {
  later(6500, () => {
    if (!st.running) return;
    if (!st.busy) {
      const b = $('#boss'); b.classList.add('talk');
      caption('\u201C' + NAGS[Math.floor(Math.random() * NAGS.length)] + '\u201D');
      later(2200, () => { if (!st.busy) { b.classList.remove('talk'); caption(''); } });
    }
    scheduleNag();
  });
}

function burst(a) {
  const layer = $('#fxLayer');
  const t = document.createElementNS(SVGNS, 'text');
  t.setAttribute('x', 610); t.setAttribute('y', 150); t.setAttribute('class', 'burst'); t.textContent = a.word;
  layer.appendChild(t); later(1000, () => t.remove());
  if (a.red) {
    for (let i = 0; i < 7; i++) {
      const c = document.createElementNS(SVGNS, 'circle');
      c.setAttribute('cx', 612); c.setAttribute('cy', 240); c.setAttribute('r', 3 + Math.random() * 4); c.setAttribute('class', 'splat');
      c.style.setProperty('--sx', (Math.random() * 120 - 60) + 'px'); c.style.setProperty('--sy', (Math.random() * -90 + 20) + 'px');
      layer.appendChild(c); later(1000, () => c.remove());
    }
  }
}

function run(id) {
  const a = ACTS[id];
  if (!a || !st.running || st.busy) return;
  st.busy = true;
  const el = id === 'boss' ? null : document.getElementById(id);
  const boss = $('#boss'); boss.classList.remove('talk');
  if (el) {
    el.style.setProperty('--dx', a.dx + 'px'); el.style.setProperty('--dy', a.dy + 'px');
    el.style.animationDuration = (a.dur - 100) + 'ms';
    el.classList.add('fx');
  }
  $('#player').classList.add('p-flinch');
  later(a.at, () => {
    boss.className = 'boss ' + a.anim + ' ' + a.face;
    audio.play(a.snd); shake(); burst(a); caption(a.text);
  });
  later(a.dur, () => {
    if (el) el.classList.remove('fx');
    $('#player').classList.remove('p-flinch');
    boss.className = 'boss';
    if (a.type === 'chaos') st.chaos++; else st.warn++;
    updateHud();
    if (st.chaos >= 8) return end('chaos');
    if (st.warn >= 3) return end('warn');
    st.busy = false;
  });
}

function shake() {
  if (settings.reduceMotion) return;
  const s = $('#stage'); s.classList.remove('shake'); void s.offsetWidth; s.classList.add('shake');
}

function end(kind) {
  st.running = false; clearTimers();
  $('#iris').classList.add('close');
  later(900, () => {
    audio.play('gameover');
    $('#overReason').textContent = ENDINGS[kind];
    $('#overStats').textContent = `Chaos ${st.chaos}/8 \u00B7 Warnings ${st.warn}/3`;
    show('over');
    $('#iris').classList.remove('close');
    const o = $('#over'); o.classList.remove('slam'); void o.offsetWidth; o.classList.add('slam');
  });
}

// Input
$('#sceneHost').addEventListener('click', (e) => {
  const o = e.target.closest('[data-act]'); if (o) run(o.dataset.act);
  else if (e.target.closest('#boss')) run('boss');
});
$('#sceneHost').addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset && e.target.dataset.act) { e.preventDefault(); run(e.target.dataset.act); }
});
$('#boss').setAttribute('data-act', 'boss'); $('#boss').setAttribute('tabindex', '0'); $('#boss').setAttribute('role', 'button'); $('#boss').setAttribute('aria-label', 'Boss'); $('#boss').dataset.label = 'The boss';
const hint = $('#hint'), defHint = hint.textContent;
$('#sceneHost').addEventListener('pointerover', (e) => { const o = e.target.closest('[data-label]'); hint.textContent = o ? 'Click: ' + o.dataset.label : defHint; });
$('#sceneHost').addEventListener('focusin', (e) => { const o = e.target.closest('[data-label]'); if (o) hint.textContent = 'Press Enter: ' + o.dataset.label; });

document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-go]');
  audio.startAmbience();
  if (!b) return;
  if (b.dataset.go === 'play') { st.running = false; }
  show(b.dataset.go);
});
$('#replayBtn').addEventListener('click', () => { st.running = false; show('game'); });
$('#restartBtn').addEventListener('click', () => { st.running = false; startRound(); });
$('#menuBtn').addEventListener('click', () => show('menu'));

function applyMute() {
  $('#muteBtn').textContent = settings.muted ? '🔇' : '🔊';
  $('#setSound').checked = !settings.muted; audio.refresh(); saveSettings();
}
$('#muteBtn').addEventListener('click', () => { settings.muted = !settings.muted; applyMute(); });
$('#setSound').addEventListener('change', (e) => { settings.muted = !e.target.checked; applyMute(); });
$('#setMusic').addEventListener('input', (e) => { settings.music = +e.target.value; audio.refresh(); saveSettings(); });
$('#setSfx').addEventListener('input', (e) => { settings.sfx = +e.target.value; saveSettings(); });
$('#setMotion').addEventListener('change', (e) => { settings.reduceMotion = e.target.checked; document.body.classList.toggle('rm', settings.reduceMotion); saveSettings(); });
$('#setMusic').value = settings.music; $('#setSfx').value = settings.sfx; $('#setMotion').checked = settings.reduceMotion;
document.body.classList.toggle('rm', settings.reduceMotion); applyMute();

const fsOK = document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen;
if (!fsOK) $('#fsBtn').style.display = 'none';
$('#fsBtn').addEventListener('click', () => {
  try {
    if (document.fullscreenElement) document.exitFullscreen();
    else (document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen).call(document.documentElement);
  } catch (e) { /* ignore */ }
});

document.addEventListener('keydown', (e) => {
  if (current !== 'game') return;
  if (/^[0-9]$/.test(e.key)) run(KEYS[(+e.key + 9) % 10]);
  else if (e.key === 'm' || e.key === 'M') $('#muteBtn').click();
  else if (e.key === 'r' || e.key === 'R') $('#restartBtn').click();
  else if (e.key === 'f' || e.key === 'F') $('#fsBtn').click();
  else if (e.key === 'Escape') show('menu');
});

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register(import.meta.env.BASE_URL + 'service-worker.js').catch(() => {}));
}
show('menu');
