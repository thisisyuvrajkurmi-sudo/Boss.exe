const obj = (id, label, inner) =>
  `<g class="obj" id="${id}" data-act="${id}" data-label="${label}" tabindex="0" role="button" aria-label="${label}">${inner}</g>`;

export const sceneSVG = `
<svg id="scene" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <rect width="800" height="450" fill="#101010"/>
  <rect y="370" width="800" height="80" fill="#060606"/>
  <line x1="0" y1="370" x2="800" y2="370" stroke="#2a2a2a"/>
  <g stroke="#333" fill="#0b0b0b"><rect x="60" y="40" width="190" height="130"/>
    <path d="M70 160V120h22v40M96 160V95h26v65M126 160V130h20v30M150 160V105h30v55M184 160V125h22v35M210 160V110h30v50" fill="#1b1b1b"/></g>
  ${obj('clock', 'Wall clock', `<circle cx="400" cy="70" r="32" fill="#1c1c1c" stroke="#ddd" stroke-width="3"/><line x1="400" y1="70" x2="400" y2="50" stroke="#fff" stroke-width="3"/><line x1="400" y1="70" x2="415" y2="76" stroke="#fff" stroke-width="3"/>`)}
  ${obj('printer', 'Printer', `<rect x="20" y="300" width="80" height="70" rx="4" fill="#2e2e2e" stroke="#777"/><rect x="30" y="285" width="60" height="15" fill="#eee"/><rect x="30" y="325" width="60" height="6" fill="#111"/><circle cx="86" cy="312" r="3" fill="#aaa"/>`)}
  ${obj('plant', 'Potted plant', `<path d="M470 330h36l-6 40h-24z" fill="#555" stroke="#aaa"/><path d="M488 330q-30-40-12-70M488 330q0-60 8-80M488 330q30-30 26-60" stroke="#ccc" stroke-width="5" fill="none" stroke-linecap="round"/>`)}
  ${obj('chair', 'Office chair', `<rect x="104" y="268" width="14" height="92" rx="6" fill="#4a4a4a"/><rect x="104" y="345" width="78" height="12" rx="5" fill="#4a4a4a"/><line x1="143" y1="357" x2="143" y2="388" stroke="#888" stroke-width="5"/><line x1="118" y1="390" x2="168" y2="390" stroke="#888" stroke-width="5"/><circle cx="120" cy="394" r="5" fill="#ccc"/><circle cx="166" cy="394" r="5" fill="#ccc"/>`)}
  <g id="player">
    <g class="pbody"><rect x="124" y="286" width="38" height="62" rx="10" fill="#cfcfcf"/><path d="M162 300L238 318" stroke="#cfcfcf" stroke-width="12" stroke-linecap="round"/>
    <circle cx="145" cy="262" r="24" fill="#f2f2f2"/><path d="M122 258q22-26 46-4" fill="#111"/>
    <circle cx="152" cy="262" r="3" fill="#111"/><circle cx="164" cy="262" r="3" fill="#111"/><path d="M150 274q8 4 16 0" stroke="#111" fill="none" stroke-width="2"/></g>
  </g>
  <rect x="100" y="332" width="335" height="16" fill="#2a2a2a" stroke="#555"/>
  <rect x="112" y="348" width="10" height="42" fill="#222"/><rect x="415" y="348" width="10" height="42" fill="#222"/>
  ${obj('monitor', 'Computer monitor', `<rect x="236" y="258" width="104" height="66" rx="4" fill="#1d1d1d" stroke="#ddd" stroke-width="3"/><rect x="244" y="266" width="88" height="50" fill="#e8e8e8"/><path d="M250 276h50M250 286h70M250 296h40" stroke="#222" stroke-width="3"/><rect x="278" y="324" width="20" height="8" fill="#888"/>`)}
  ${obj('keyboard', 'Keyboard', `<rect x="232" y="322" width="96" height="10" rx="3" fill="#ddd" stroke="#444"/><path d="M238 327h84" stroke="#555" stroke-dasharray="4 3"/>`)}
  ${obj('mug', 'Coffee mug', `<rect x="346" y="310" width="22" height="22" rx="3" fill="#eee"/><path d="M368 315h6q4 0 4 6t-4 6h-6" stroke="#eee" stroke-width="3" fill="none"/><path d="M352 304q-4-8 0-12M360 304q-4-8 0-12" stroke="#888" fill="none"/>`)}
  ${obj('scissors', 'Scissors', `<path d="M380 330l22-18M380 312l22 18" stroke="#ddd" stroke-width="3"/><circle cx="378" cy="312" r="5" fill="none" stroke="#fff" stroke-width="2"/><circle cx="378" cy="330" r="5" fill="none" stroke="#fff" stroke-width="2"/>`)}
  ${obj('stapler', 'Stapler', `<rect x="408" y="320" width="26" height="12" rx="3" fill="#eee"/><rect x="408" y="314" width="26" height="8" rx="3" fill="#888"/>`)}
  <g id="boss" class="boss">
    <g class="legs"><rect class="leg l1" x="584" y="338" width="24" height="50" fill="#222"/><rect class="leg l2" x="614" y="338" width="24" height="50" fill="#222"/>
    <rect x="578" y="384" width="34" height="9" rx="4" fill="#eee"/><rect x="612" y="384" width="34" height="9" rx="4" fill="#eee"/></g>
    <rect x="556" y="250" width="18" height="74" rx="9" fill="#3a3a3a"/><rect x="648" y="250" width="18" height="74" rx="9" fill="#3a3a3a"/>
    <rect x="574" y="244" width="76" height="98" rx="10" fill="#3a3a3a" stroke="#777"/>
    <path d="M612 244l-12 18 12 8 12-8z" fill="#eee"/><path d="M612 266l-8 14 8 50 8-50z" fill="#fff" stroke="#111"/>
    <circle cx="612" cy="208" r="38" fill="#eee"/><path d="M574 200q10-40 40-36 30-4 38 36-24-18-78 0z" fill="#111"/>
    <g class="f f-idle"><circle cx="600" cy="205" r="4" fill="#111"/><circle cx="624" cy="205" r="4" fill="#111"/><path d="M590 194l20 6M634 194l-20 6" stroke="#111" stroke-width="3"/><path class="mouth" d="M598 226q14 7 28 0" stroke="#111" stroke-width="3" fill="none"/></g>
    <g class="f f-ouch"><path d="M594 199l12 12M606 199l-12 12M618 199l12 12M630 199l-12 12" stroke="#111" stroke-width="3"/><ellipse cx="612" cy="228" rx="9" ry="12" fill="#111"/></g>
    <g class="f f-yell"><circle cx="600" cy="205" r="3" fill="#111"/><circle cx="624" cy="205" r="3" fill="#111"/><path d="M588 188l22 12M636 188l-22 12" stroke="#111" stroke-width="4"/><path d="M596 220h32l-4 22h-24z" fill="#111"/><path d="M600 220v6M608 220v6M616 220v6M624 220v6" stroke="#fff" stroke-width="3"/></g>
  </g>
  <g id="fxLayer"></g>
</svg>`;
