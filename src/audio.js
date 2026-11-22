const FILES = { punch: 'punch.mp3', stab: 'stab.mp3', scold: 'scold.mp3', gameover: 'gameover.mp3' };
const KEY = 'office-meltdown-settings';
export const settings = { muted: false, music: 0.5, sfx: 0.8, reduceMotion: false };
try { Object.assign(settings, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* ignore */ }
export const saveSettings = () => { try { localStorage.setItem(KEY, JSON.stringify(settings)); } catch (e) { /* ignore */ } };

const clips = {};
let current = null, ctx = null, amb = null;

export const audio = {
  load(base) {
    for (const [k, f] of Object.entries(FILES)) {
      try {
        const a = new Audio(base + 'assets/audio/' + f);
        a.preload = 'auto';
        a.addEventListener('error', () => { clips[k] = null; console.warn('Missing audio:', f); });
        clips[k] = a;
      } catch (e) { clips[k] = null; }
    }
  },
  play(name) {
    if (settings.muted) return;
    const a = clips[name];
    if (!a) return;
    if (current && current !== a) { current.pause(); }
    try { a.pause(); a.currentTime = 0; a.volume = settings.sfx; current = a; a.play().catch(() => {}); } catch (e) { /* ignore */ }
  },
  stop() { if (current) { try { current.pause(); } catch (e) { /* ignore */ } current = null; } },
  startAmbience() {
    if (amb || !(window.AudioContext || window.webkitAudioContext)) { this.refresh(); return; }
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      const gain = ctx.createGain();
      const len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < len; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; }
      const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 400;
      const hum = ctx.createOscillator(); hum.frequency.value = 60; const hg = ctx.createGain(); hg.gain.value = 0.03;
      src.connect(lp).connect(gain); hum.connect(hg).connect(gain); gain.connect(ctx.destination);
      src.start(); hum.start(); amb = gain; this.refresh();
    } catch (e) { amb = null; }
  },
  refresh() {
    if (amb) amb.gain.value = settings.muted ? 0 : settings.music * 0.5;
    if (settings.muted) this.stop();
    if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
  }
};
