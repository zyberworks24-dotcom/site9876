/* Notable breaches timeline: click through well-known incidents and the lesson
   from each. Frontend only, driven by data/breaches.json. */
const brWrap = document.getElementById('brWrap');
const BR_ARROW = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const BR_BULB = `<svg viewBox="0 0 24 24" fill="none"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 4 10.5c-.6.6-1 1.3-1 2.2H9c0-.9-.4-1.6-1-2.2A6 6 0 0 1 12 3Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

let BR = null;
let cur = 0;

function render(){
  const b = BR.breaches[cur];
  const n = BR.breaches.length;
  const fill = n > 1 ? (cur / (n - 1)) * 100 : 0;
  brWrap.innerHTML = `
    <div class="atk-head reveal">
      <p class="eyebrow">INTERACTIVE · BREACH TIMELINE</p>
      <h1>Learn from<br><span class="grad-text">other people's breaches.</span></h1>
      <p class="atk-intro">${BR.intro}</p>
    </div>

    <div class="atk-chain">
      <div class="atk-line"><span class="atk-line-fill" style="width:${fill}%"></span></div>
      <div class="atk-nodes">
        ${BR.breaches.map((x, i) => `
          <button class="atk-node ${i === cur ? 'active' : ''} ${i < cur ? 'done' : ''}" data-i="${i}" aria-label="${x.year} ${x.name}">
            <span class="atk-node-dot">${x.year.slice(2)}</span>
            <span class="atk-node-label">${x.name}</span>
          </button>
        `).join('')}
      </div>
    </div>

    <div class="atk-stage">
      <div class="atk-stage-num">${b.year} · ${b.region}</div>
      <h2 class="atk-phase">${b.name}</h2>
      <p class="atk-attacker">${b.what}</p>
      <div class="atk-stops">
        <p class="atk-stops-label">${BR_BULB} The lesson</p>
        <p class="br-lesson">${b.lesson}</p>
      </div>
    </div>

    <div class="atk-controls">
      <button class="btn btn-ghost" id="brPrev" ${cur === 0 ? 'disabled' : ''}>Previous</button>
      <span class="br-count">${cur + 1} / ${n}</span>
      <button class="btn btn-primary" id="brNext">${cur === n - 1 ? 'Start over' : 'Next'} ${cur === n - 1 ? '' : BR_ARROW}</button>
    </div>

    ${cur === n - 1 ? `
    <div class="cta" style="padding:20px 0 0">
      <div class="cta-card reveal-scale">
        <h2>The same lessons keep repeating.</h2>
        <p>MFA, patching, backups, least privilege, and knowing your data. We help you get the fundamentals right before you become the next headline.</p>
        <div class="cta-actions">
          <a href="assessments" class="btn btn-primary btn-lg">Check your posture</a>
          <button type="button" class="btn btn-ghost btn-lg" data-contact>Let's chat</button>
        </div>
      </div>
    </div>` : ''}
  `;
  brWrap.querySelectorAll('.atk-node').forEach(el => el.addEventListener('click', () => { cur = parseInt(el.dataset.i, 10); render(); }));
  document.getElementById('brPrev').addEventListener('click', () => { if (cur > 0){ cur--; render(); } });
  document.getElementById('brNext').addEventListener('click', () => { cur = (cur === BR.breaches.length - 1) ? 0 : cur + 1; render(); });
  observeReveal(brWrap);
}

async function initBreaches(){
  if (!brWrap) return;
  try { BR = await fetchJSON('data/breaches.json'); }
  catch (err){ brWrap.innerHTML = `<p class="atk-intro">Couldn't load the timeline. <a href="./" style="color:var(--blue)">Return home</a>.</p>`; return; }
  render();
}

document.addEventListener('DOMContentLoaded', initBreaches);
