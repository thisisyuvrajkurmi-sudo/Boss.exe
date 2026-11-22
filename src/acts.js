// at = ms until impact, dur = total ms, dx/dy = object toss, snd = audio key (punch|stab|scold|gameover)
export const ACTS = {
  keyboard: { snd: 'punch', at: 560, dur: 1900, dx: 330, dy: -90,  anim: 'b-fly',   face: 'ouch', word: 'WHAM!', type: 'chaos', text: 'Keyboard to the face. He is now a QWERTY impression.' },
  monitor:  { snd: 'punch', at: 560, dur: 1900, dx: 300, dy: -70,  anim: 'b-hit',   face: 'ouch', word: 'CRASH!', type: 'chaos', text: 'Monitor delivered. The Q3 slides finally have an impact.' },
  printer:  { snd: 'punch', at: 640, dur: 2000, dx: 540, dy: -60,  anim: 'b-spin',  face: 'ouch', word: 'KA-CHUNK!', type: 'chaos', text: 'The printer finally did something fast.' },
  chair:    { snd: 'punch', at: 640, dur: 2000, dx: 440, dy: 0,    anim: 'b-fly',   face: 'ouch', word: 'ZOOM!', type: 'chaos', text: 'Ergonomic chair. Maximum ergonomic impact.' },
  plant:    { snd: 'punch', at: 560, dur: 1900, dx: 120, dy: -150, anim: 'b-hit',   face: 'ouch', word: 'THUNK!', type: 'chaos', text: 'Employee of the month: the fern.' },
  stapler:  { snd: 'stab',  at: 560, dur: 1900, dx: 190, dy: -40,  anim: 'b-stab',  face: 'ouch', word: 'CHK!', type: 'chaos', red: true, text: 'Stapled his tie to the wall. Very professional.' },
  scissors: { snd: 'stab',  at: 560, dur: 1900, dx: 220, dy: -50,  anim: 'b-stab',  face: 'ouch', word: 'SNIP!', type: 'chaos', red: true, text: 'Snip. He now has a clip-on lifestyle.' },
  mug:      { snd: 'scold', at: 560, dur: 2100, dx: 250, dy: -60,  anim: 'b-scold', face: 'yell', word: 'SPLASH!', type: 'warn', text: 'Hot coffee. He is NOT happy. Warning issued.' },
  clock:    { snd: 'scold', at: 300, dur: 1900, dx: 0,   dy: 0,    anim: 'b-scold', face: 'yell', word: 'LATE!', type: 'warn', text: '"You were three seconds late!" Warning issued.' },
  boss:     { snd: 'scold', at: 200, dur: 1900, dx: 0,   dy: 0,    anim: 'b-scold', face: 'yell', word: 'HEY!', type: 'warn', text: '"Do we poke people here?!" Warning issued.' }
};
export const KEYS = ['boss', 'keyboard', 'monitor', 'mug', 'stapler', 'scissors', 'printer', 'chair', 'plant', 'clock'];
export const NAGS = [
  'Let\u2019s circle back on that synergy.', 'Per my last email\u2026', 'Can you work this weekend?',
  'I need this by yesterday.', 'We\u2019re a family here.', 'Quick meeting? It\u2019s only 3 hours.'
];
export const ENDINGS = {
  chaos: 'HR Incident Report #1 has been filed. He survived. His tie did not.',
  warn: 'Three warnings. You have been let go. Please return your stapler.'
};
