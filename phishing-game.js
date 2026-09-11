/* Spot the Phish: a quick game to tell phishing emails from genuine ones.
   Frontend only; content is illustrative and fictional. */
const phishWrap = document.getElementById('phishWrap');
const P_CHECK = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5 9.5 17 19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const P_X = `<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`;

let EMAILS = [];
let idx = 0;
let score = 0;
let answered = false;

function renderIntro(){
  phishWrap.innerHTML = `
    <div class="phish-card phish-intro reveal">
      <p class="eyebrow">INTERACTIVE GAME</p>
      <h1>Can you<br><span class="grad-text">spot the phish?</span></h1>
      <p class="phish-lead">We will show you ${EMAILS.length} emails. For each one, decide: is it safe, or a phishing attempt? You will see the red flags after every answer. Every example here is made up for training.</p>
      <button class="btn btn-primary btn-lg" id="phStart">Start the game</button>
    </div>`;
  document.getElementById('phStart').addEventListener('click', () => { idx = 0; score = 0; renderEmail(); });
  observeReveal(phishWrap);
}

function esc(t){ return (t || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function renderEmail(){
  answered = false;
  const e = EMAILS[idx];
  const initial = (e.from || '?').trim().charAt(0).toUpperCase();
  phishWrap.innerHTML = `
    <div class="phish-top">
      <span class="phish-count">Email ${idx + 1} of ${EMAILS.length}</span>
      <span class="phish-score">Score: ${score}</span>
    </div>
    <div class="phish-email">
      <div class="phish-email-head">
        <div class="phish-avatar">${initial}</div>
        <div class="phish-meta">
          <p class="phish-from">${esc(e.from)} <span class="phish-addr">&lt;${esc(e.email)}&gt;</span></p>
          <p class="phish-subject">${esc(e.subject)}</p>
        </div>
      </div>
      <div class="phish-body">${esc(e.body).replace(/\n/g, '<br>')}</div>
    </div>
    <div class="phish-actions" id="phActions">
      <button class="btn btn-ghost btn-lg phish-btn" data-guess="safe">Looks safe</button>
      <button class="btn btn-primary btn-lg phish-btn" data-guess="phish">It's a phish</button>
    </div>
    <div class="phish-reveal" id="phReveal" hidden></div>`;
  phishWrap.querySelectorAll('.phish-btn').forEach(b => b.addEventListener('click', () => answer(b.dataset.guess === 'phish')));
}

function answer(guessPhish){
  if (answered) return;
  answered = true;
  const e = EMAILS[idx];
  const correct = guessPhish === e.phish;
  if (correct) score++;
  document.getElementById('phActions').hidden = true;
  const last = idx === EMAILS.length - 1;
  const reveal = document.getElementById('phReveal');
  reveal.hidden = false;
  reveal.innerHTML = `
    <div class="phish-verdict ${correct ? 'ok' : 'bad'}">
      <span class="phish-verdict-icon">${correct ? P_CHECK : P_X}</span>
      <div>
        <p class="phish-verdict-title">${correct ? 'Correct' : 'Not quite'} — this email is ${e.phish ? 'a phishing attempt' : 'likely genuine'}.</p>
        <p class="phish-verdict-sub">${e.phish ? 'Here is what gives it away:' : 'Here is why it looks legitimate:'}</p>
      </div>
    </div>
    <ul class="phish-flags">
      ${e.flags.map(f => `<li>${esc(f)}</li>`).join('')}
    </ul>
    <div class="phish-next">
      <button class="btn btn-primary btn-lg" id="phNext">${last ? 'See my result' : 'Next email'}</button>
    </div>`;
  document.getElementById('phNext').addEventListener('click', () => {
    if (last) renderResult();
    else { idx++; renderEmail(); }
  });
}

function renderResult(){
  const n = EMAILS.length;
  const pct = Math.round((score / n) * 100);
  const verdict = pct === 100 ? 'Perfect. You have a sharp eye.'
    : pct >= 70 ? 'Strong. You would stop most real attacks.'
    : pct >= 40 ? 'Not bad, but a determined phish could still get through.'
    : 'This is exactly why training matters. The good news: it is learnable.';
  phishWrap.innerHTML = `
    <div class="phish-card phish-result">
      <p class="eyebrow">YOUR RESULT</p>
      <div class="phish-score-big"><span class="grad-text">${score}</span> / ${n}</div>
      <p class="phish-result-verdict">${verdict}</p>
      <p class="phish-lead">Attackers only need one person to click, once. Regular, realistic training turns your team from the weakest link into a strong first line of defence.</p>
      <div class="cta-actions" style="justify-content:center">
        <button class="btn btn-primary btn-lg" id="phRetry">Play again</button>
        <button type="button" class="btn btn-ghost btn-lg" data-contact data-service="Managed IT Support">Talk about staff training</button>
      </div>
    </div>`;
  document.getElementById('phRetry').addEventListener('click', () => { idx = 0; score = 0; renderEmail(); });
  observeReveal(phishWrap);
}

async function initPhish(){
  if (!phishWrap) return;
  try { EMAILS = await fetchJSON('data/phishing.json'); }
  catch (err){ phishWrap.innerHTML = `<p class="phish-lead">Couldn't load the game. <a href="index.html" style="color:var(--blue)">Return home</a>.</p>`; return; }
  renderIntro();
}

document.addEventListener('DOMContentLoaded', initPhish);
