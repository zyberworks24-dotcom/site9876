/* Anatomy of an Attack: an interactive walk through the stages of a breach
   and the control that breaks the chain at each one. Frontend only. */
const atkWrap = document.getElementById('atkWrap');

const ATK_ICONS = {
  mail: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.2" stroke="currentColor" stroke-width="1.6"/><path d="M4 7.5l8 5.5 8-5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  cursor: `<svg viewBox="0 0 24 24" fill="none"><path d="M5 4l6 15 2.2-5.8L19 11 5 4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  bug: `<svg viewBox="0 0 24 24" fill="none"><rect x="8" y="8" width="8" height="10" rx="4" stroke="currentColor" stroke-width="1.6"/><path d="M12 5v3M8.5 10 5 8M15.5 10 19 8M8 13H4M16 13h4M8.5 16 5 18M15.5 16 19 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  key: `<svg viewBox="0 0 24 24" fill="none"><circle cx="8" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><path d="M11.5 12H21l-2 2 2 2M15 12v3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  network: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="2.2" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="18" r="2.2" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="18" r="2.2" stroke="currentColor" stroke-width="1.5"/><path d="M12 7.2 6.4 16.2M12 7.2l5.6 9M7.2 18h9.6" stroke="currentColor" stroke-width="1.4"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" stroke-width="1.6"/></svg>`
};
const SHIELD = `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3 20 6.5V12c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.5 12 11 14.5 15.5 9.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ARROW = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

let ATK = null;
let cur = 0;
let playing = false;
let timer = null;

function chainMarkup(){
  const n = ATK.steps.length;
  const fill = n > 1 ? (cur / (n - 1)) * 100 : 0;
  return `
    <div class="atk-chain">
      <div class="atk-line"><span class="atk-line-fill" style="width:${fill}%"></span></div>
      <div class="atk-nodes">
        ${ATK.steps.map((s, i) => `
          <button class="atk-node ${i === cur ? 'active' : ''} ${i < cur ? 'done' : ''}" data-i="${i}" aria-label="${s.phase}">
            <span class="atk-node-dot">${ATK_ICONS[s.icon] || ''}</span>
            <span class="atk-node-label">${s.phase}</span>
          </button>
        `).join('')}
      </div>
    </div>`;
}

function render(){
  const s = ATK.steps[cur];
  const n = ATK.steps.length;
  const last = cur === n - 1;
  atkWrap.innerHTML = `
    <div class="atk-head reveal">
      <p class="eyebrow">INTERACTIVE · ANATOMY OF AN ATTACK</p>
      <h1>How one email<br><span class="grad-text">becomes a crisis.</span></h1>
      <p class="atk-intro">${ATK.intro}</p>
    </div>

    ${chainMarkup()}

    <div class="atk-stage">
      <div class="atk-stage-num">Step ${cur + 1} of ${n}</div>
      <h2 class="atk-phase"><span class="atk-phase-icon">${ATK_ICONS[s.icon] || ''}</span>${s.phase}</h2>
      <p class="atk-attacker">${s.attacker}</p>
      <p class="atk-impact"><span>Impact</span> ${s.impact}</p>
      <div class="atk-stops">
        <p class="atk-stops-label">${SHIELD} What breaks the chain here</p>
        <div class="atk-stops-list">
          ${s.stops.map(st => `<a class="atk-stop" href="${st.label ? st.href : '#'}">${st.label} ${ARROW}</a>`).join('')}
        </div>
      </div>
      ${last ? `<div class="atk-outcome">${ATK.outcome}</div>` : ''}
    </div>

    <div class="atk-controls">
      <button class="btn btn-ghost" id="atkPrev" ${cur === 0 ? 'disabled' : ''}>Previous</button>
      <button class="btn btn-ghost atk-play" id="atkPlay">${playing ? 'Pause' : 'Play'}</button>
      ${last
        ? `<button class="btn btn-primary" id="atkNext">Start over</button>`
        : `<button class="btn btn-primary" id="atkNext">Next step ${ARROW}</button>`}
    </div>

    ${last ? `
    <div class="cta" style="padding:20px 0 0">
      <div class="cta-card reveal-scale">
        <h2>Where would an attacker stop, in your environment?</h2>
        <p>Find your weakest link with a two-minute assessment, or talk to us about closing the gaps.</p>
        <div class="cta-actions">
          <a href="assessment?a=ransomware" class="btn btn-primary btn-lg">Ransomware readiness check</a>
          <button type="button" class="btn btn-ghost btn-lg" data-contact>Let's chat</button>
        </div>
      </div>
    </div>` : ''}
  `;

  atkWrap.querySelectorAll('.atk-node').forEach(b => b.addEventListener('click', () => { stop(); cur = parseInt(b.dataset.i, 10); render(); }));
  document.getElementById('atkPrev').addEventListener('click', () => { stop(); if (cur > 0){ cur--; render(); } });
  document.getElementById('atkNext').addEventListener('click', () => {
    stop();
    cur = last ? 0 : cur + 1;
    render();
  });
  document.getElementById('atkPlay').addEventListener('click', () => playing ? stop() : play());
  observeReveal(atkWrap);
}

function play(){
  playing = true;
  render();
  timer = setInterval(() => {
    if (cur < ATK.steps.length - 1){ cur++; render(); }
    else stop();
  }, 3200);
}
function stop(){
  playing = false;
  if (timer){ clearInterval(timer); timer = null; }
}

async function initAttack(){
  if (!atkWrap) return;
  try { ATK = await fetchJSON('data/attack.json'); }
  catch (err){ atkWrap.innerHTML = `<p class="atk-intro">Couldn't load this walkthrough. <a href="./" style="color:var(--blue)">Return home</a>.</p>`; return; }
  render();
}

document.addEventListener('DOMContentLoaded', initAttack);
