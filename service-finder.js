/* "Which service do I need?" wizard. Frontend only. Tallies the services
   implied by each answer and recommends the strongest matches. */
const finderWrap = document.getElementById('finderWrap');
const F_ARROW = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

let FQ = [];
let SVC = [];
let answers = [];
let idx = 0;

function renderIntro(){
  finderWrap.innerHTML = `
    <div class="e8-card e8-intro reveal">
      <p class="eyebrow">FREE TOOL</p>
      <h1>Which service<br><span class="grad-text">do you need?</span></h1>
      <p class="e8-lead">Answer four quick questions and we will point you to the Zyberworks services that best fit your situation, so a menu of seventeen becomes a clear next step.</p>
      <ul class="e8-meta">
        <li><span>4</span> questions</li>
        <li><span>~1</span> minute</li>
        <li><span>100%</span> private</li>
      </ul>
      <button class="btn btn-primary btn-lg" id="fnStart">Find my services</button>
    </div>`;
  document.getElementById('fnStart').addEventListener('click', () => { idx = 0; renderQuestion(); });
  observeReveal(finderWrap);
}

function renderQuestion(){
  const item = FQ[idx];
  const n = FQ.length;
  const chosen = answers[idx];
  finderWrap.innerHTML = `
    <div class="e8-card e8-question">
      <div class="e8-progress">
        <div class="e8-progress-bar"><span style="width:${(idx / n) * 100}%"></span></div>
        <span class="e8-progress-label">Question ${idx + 1} of ${n}</span>
      </div>
      <h2 class="e8-q">${item.q}</h2>
      <div class="e8-options">
        ${item.opts.map((o, i) => `
          <button class="e8-option ${chosen === i ? 'selected' : ''}" data-val="${i}">
            <span class="e8-option-text" style="font-size:15px">${o.label}</span>
          </button>
        `).join('')}
      </div>
      <div class="e8-nav">
        <button class="btn btn-ghost" id="fnBack">${idx === 0 ? 'Back to start' : 'Previous'}</button>
        <span class="e8-dots">${FQ.map((_, i) => `<i class="${i === idx ? 'on' : ''} ${answers[i] != null ? 'done' : ''}"></i>`).join('')}</span>
      </div>
    </div>`;
  finderWrap.querySelectorAll('.e8-option').forEach(btn => {
    btn.addEventListener('click', () => {
      answers[idx] = parseInt(btn.dataset.val, 10);
      if (idx < FQ.length - 1){ idx++; renderQuestion(); }
      else renderResult();
    });
  });
  document.getElementById('fnBack').addEventListener('click', () => {
    if (idx === 0) renderIntro();
    else { idx--; renderQuestion(); }
  });
}

function renderResult(){
  const tally = {};
  answers.forEach((a, qi) => {
    if (a == null) return;
    (FQ[qi].opts[a].services || []).forEach(id => { tally[id] = (tally[id] || 0) + 1; });
  });
  const ranked = Object.keys(tally).sort((a, b) => tally[b] - tally[a]);
  const top = ranked.slice(0, 4).map(id => SVC.find(s => s.id === id)).filter(Boolean);
  const names = top.map(s => s.title).join(', ');

  finderWrap.innerHTML = `
    <div class="e8-card e8-result">
      <p class="eyebrow">YOUR SHORTLIST</p>
      <h1 style="font-size:clamp(26px,4vw,36px);font-weight:800;letter-spacing:-.02em;margin:8px 0 8px">Start here.</h1>
      <p class="e8-lead" style="margin-bottom:22px">Based on your answers, these are the services that fit best. They often work together, and we will tailor the mix to you.</p>
      <div class="grid" style="margin-bottom:24px">
        ${top.map(s => `
          <a class="card shown" href="services/${s.id}">
            <div class="card-icon">${ICONS[s.icon] || ''}</div>
            <h3>${s.title}</h3>
            <p>${s.tagline}</p>
            <div class="card-arrow">Learn more ${F_ARROW}</div>
          </a>
        `).join('')}
      </div>
      <div class="e8-result-cta">
        <button class="btn btn-primary btn-lg" data-contact data-service="${top[0] ? top[0].title : ''}">Discuss these with us</button>
        <button class="btn btn-ghost" id="fnRetake">Start over</button>
        <a class="btn btn-ghost" href="assessment?a=cyber-basics">Or check your posture</a>
      </div>
      <p class="e8-privacy">Not sure? A two-minute posture assessment is a good next step. Everything here stays in your browser.</p>
    </div>`;
  document.getElementById('fnRetake').addEventListener('click', () => { answers = []; idx = 0; renderIntro(); });
  observeReveal(finderWrap);
}

async function initFinder(){
  if (!finderWrap) return;
  try {
    const def = await fetchJSON('data/service-finder.json');
    FQ = def.questions || [];
    SVC = await fetchJSON('data/services.json');
  } catch (err){
    finderWrap.innerHTML = `<p class="e8-lead">Couldn't load this tool. <a href="services" style="color:var(--blue)">Browse all services</a>.</p>`;
    return;
  }
  answers = new Array(FQ.length).fill(null);
  renderIntro();
}

document.addEventListener('DOMContentLoaded', initFinder);
