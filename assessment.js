/* Generic self-assessment engine. Runs entirely in the browser; nothing is sent
   anywhere. The assessment to run is chosen by body[data-assessment] or ?a=<id>,
   and its questions live in data/assessments/<id>.json. */
const wrap = document.getElementById('e8Wrap');
const LEVEL_WORD = ['Not started', 'Developing', 'Established', 'Advanced'];
const levelLabel = l => 'Level ' + l;

let DEF = null;
let answers = [];
let idx = 0;

function minutesLabel(n){ return Math.max(1, Math.ceil(n * 15 / 60)); }

function overallLevel(levels){
  if (!levels.length) return 0;
  if (DEF.scoring === 'average'){
    return Math.round(levels.reduce((a, b) => a + b, 0) / levels.length);
  }
  return Math.min(...levels); // default: weakest area (matches the ASD approach)
}

function renderIntro(){
  const n = DEF.items.length;
  wrap.innerHTML = `
    <div class="e8-card e8-intro reveal">
      <p class="eyebrow">${DEF.eyebrow || 'FREE SELF-ASSESSMENT'}</p>
      <h1>${DEF.heading || DEF.title}</h1>
      <p class="e8-lead">${DEF.lead || ''}</p>
      <ul class="e8-meta">
        <li><span>${n}</span> questions</li>
        <li><span>~${minutesLabel(n)}</span> minute${minutesLabel(n) === 1 ? '' : 's'}</li>
        <li><span>100%</span> private</li>
      </ul>
      <p class="e8-privacy">Nothing you enter leaves your browser. We only see your answers if you choose to send them with a request for a tailored plan. This is an indicative self-assessment, not a formal audit.</p>
      <div class="hero-actions">
        <button class="btn btn-primary btn-lg" id="asStart">Start the assessment</button>
        <a class="btn btn-ghost" href="assessments">All assessments</a>
      </div>
    </div>
  `;
  document.getElementById('asStart').addEventListener('click', () => { idx = 0; renderQuestion(); });
  observeReveal(wrap);
}

function renderQuestion(){
  const item = DEF.items[idx];
  const chosen = answers[idx];
  const n = DEF.items.length;
  wrap.innerHTML = `
    <div class="e8-card e8-question">
      <div class="e8-progress">
        <div class="e8-progress-bar"><span style="width:${(idx / n) * 100}%"></span></div>
        <span class="e8-progress-label">Question ${idx + 1} of ${n}</span>
      </div>
      <p class="e8-strategy">${item.name}</p>
      <h2 class="e8-q">${item.q}</h2>
      <div class="e8-options">
        ${item.opts.map((o, i) => `
          <button class="e8-option ${chosen === i ? 'selected' : ''}" data-val="${i}">
            <span class="e8-option-level">${levelLabel(i)}</span>
            <span class="e8-option-text">${o}</span>
          </button>
        `).join('')}
      </div>
      <div class="e8-nav">
        <button class="btn btn-ghost" id="asBack">${idx === 0 ? 'Back to start' : 'Previous'}</button>
        <span class="e8-dots">${DEF.items.map((_, i) => `<i class="${i === idx ? 'on' : ''} ${answers[i] !== null && answers[i] !== undefined ? 'done' : ''}"></i>`).join('')}</span>
      </div>
    </div>
  `;
  wrap.querySelectorAll('.e8-option').forEach(btn => {
    btn.addEventListener('click', () => {
      answers[idx] = parseInt(btn.dataset.val, 10);
      if (idx < DEF.items.length - 1){ idx++; renderQuestion(); }
      else renderResult();
    });
  });
  document.getElementById('asBack').addEventListener('click', () => {
    if (idx === 0) renderIntro();
    else { idx--; renderQuestion(); }
  });
}

function renderResult(){
  const scored = answers.map((a, i) => ({ name: DEF.items[i].name, level: (a == null ? 0 : a) }));
  const lowest = Math.min(...scored.map(s => s.level));
  const overall = overallLevel(scored.map(s => s.level));
  const weakest = scored.filter(s => s.level === lowest);
  const atOrAbove2 = scored.filter(s => s.level >= 2).length;

  const interp = (DEF.interpret && DEF.interpret[overall]) || [
    'There are clear gaps an attacker could use today. The priority is to establish a baseline across every area.',
    'You have the beginnings of a program. The focus now is lifting the weaker areas to a consistent standard.',
    'A solid, established posture. You are well placed to target the top level where it matters most to your risk.',
    'An advanced posture across the board. The work now is assurance: keeping it there and proving it.'
  ][overall];

  const summaryForEmail =
    `${DEF.title} self-assessment result\r\n` +
    `Overall maturity: ${levelLabel(overall)} (${LEVEL_WORD[overall]})\r\n\r\n` +
    scored.map(s => `${s.name}: ${levelLabel(s.level)}`).join('\r\n') +
    `\r\n\r\nWeakest areas: ${weakest.map(w => w.name).join(', ')}\r\n\r\nI'd like a tailored plan.`;

  wrap.innerHTML = `
    <div class="e8-card e8-result">
      <p class="eyebrow">YOUR RESULT · ${DEF.short || DEF.title}</p>
      <div class="e8-score">
        <div class="e8-score-ring" style="--lvl:${overall}">
          <span class="e8-score-num">${overall}</span>
          <span class="e8-score-of">/ 3</span>
        </div>
        <div class="e8-score-body">
          <h1>Overall maturity: ${LEVEL_WORD[overall]}</h1>
          <p>${DEF.scoring === 'average'
            ? `This is the average across the areas assessed. ${atOrAbove2} of ${scored.length} are at Level 2 or above.`
            : `Scored on your <strong>weakest</strong> area, so your overall level is ${levelLabel(overall)}. ${atOrAbove2} of ${scored.length} are at Level 2 or above.`}</p>
        </div>
      </div>

      <div class="e8-bars">
        ${scored.map(s => `
          <div class="e8-bar-row ${s.level === lowest ? 'weak' : ''}">
            <span class="e8-bar-name">${s.name}</span>
            <div class="e8-bar-track">${[0,1,2,3].map(l => `<span class="e8-seg ${l <= s.level ? 'fill' : ''}"></span>`).join('')}</div>
            <span class="e8-bar-lvl">${levelLabel(s.level)}</span>
          </div>
        `).join('')}
      </div>

      <div class="e8-interp">
        <h2>What this means</h2>
        <p>${interp}</p>
        ${weakest.length ? `<p class="e8-focus"><strong>Focus first:</strong> ${weakest.map(w => w.name).join(', ')}.</p>` : ''}
      </div>

      <div class="e8-result-cta">
        <button class="btn btn-primary btn-lg" id="asPlan">Get a tailored plan</button>
        <button class="btn btn-ghost" id="asRetake">Retake</button>
        <a class="btn btn-ghost" href="assessments">Other assessments</a>
      </div>
      <p class="e8-privacy">This result stays in your browser. Sending it for a plan is your choice, and it goes to enquiry@zyberworks.com.au.</p>
    </div>
  `;

  document.getElementById('asRetake').addEventListener('click', () => { answers = new Array(DEF.items.length).fill(null); idx = 0; renderIntro(); });
  document.getElementById('asPlan').addEventListener('click', () => {
    if (window.ZW && window.ZW.openContact){
      window.ZW.openContact({ service: DEF.service || '', message: summaryForEmail });
    } else {
      window.location.href = './#contact';
    }
  });
}

async function initAssessment(){
  if (!wrap) return;
  const id = document.body.dataset.assessment || new URLSearchParams(location.search).get('a') || 'essential-eight';
  try {
    DEF = await fetchJSON('data/assessments/' + id + '.json');
  } catch (err){
    wrap.innerHTML = `<div class="e8-card"><p class="e8-lead">Couldn't load this assessment. <a href="assessments" style="color:var(--blue)">See all assessments</a>.</p></div>`;
    return;
  }
  document.title = DEF.title + ' — Zyberworks';
  const md = document.querySelector('meta[name="description"]');
  if (md && DEF.lead) md.setAttribute('content', DEF.lead);
  answers = new Array(DEF.items.length).fill(null);
  renderIntro();
}

document.addEventListener('DOMContentLoaded', initAssessment);
