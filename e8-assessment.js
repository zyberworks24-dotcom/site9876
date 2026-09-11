/* Essential Eight self-assessment. Runs entirely in the browser; nothing is sent anywhere. */
const E8 = [
  {
    key: 'appcontrol', name: 'Application control',
    q: 'Can only approved applications run on your workstations and servers?',
    opts: [
      'No control. Users can install and run whatever they like.',
      'Some application allow-listing on workstations.',
      'Allow-listing enforced on workstations and servers, with logging.',
      'Fully enforced everywhere, validated, using the recommended block rules.'
    ]
  },
  {
    key: 'patchapps', name: 'Patch applications',
    q: 'How quickly are vulnerabilities in internet-facing applications patched?',
    opts: [
      'Ad hoc, or we are not sure.',
      'Usually within a month.',
      'Within two weeks, and faster when actively exploited.',
      'Within 48 hours, with regular vulnerability scanning.'
    ]
  },
  {
    key: 'macros', name: 'Office macro settings',
    q: 'How are Microsoft Office macros controlled?',
    opts: [
      'Macros run freely for everyone.',
      'Blocked for users who do not have a business need.',
      'Allowed only from trusted locations or when digitally signed.',
      'Only signed by trusted publishers, with execution logged.'
    ]
  },
  {
    key: 'hardening', name: 'User application hardening',
    q: 'Are browsers and everyday apps hardened (ads, Flash, Java, unneeded features blocked)?',
    opts: [
      'Everything runs on default settings.',
      'Some hardening applied to web browsers.',
      'Browsers, Office and PDF readers hardened, with logging.',
      'Fully hardened to current guidance, with monitoring.'
    ]
  },
  {
    key: 'admin', name: 'Restrict admin privileges',
    q: 'How are administrative privileges managed?',
    opts: [
      'Many people hold standing local admin rights.',
      'Some restriction, reviewed occasionally.',
      'Privileged access is requested, limited, and kept off email and the web.',
      'Just-in-time admin, fully segregated and logged.'
    ]
  },
  {
    key: 'patchos', name: 'Patch operating systems',
    q: 'How quickly are operating system vulnerabilities patched?',
    opts: [
      'Ad hoc, or some systems are past end of life.',
      'Usually within a month.',
      'Within two weeks across the estate.',
      'Within 48 hours, with no unsupported operating systems in use.'
    ]
  },
  {
    key: 'mfa', name: 'Multi-factor authentication',
    q: 'Where is multi-factor authentication enforced?',
    opts: [
      'Not used.',
      'On some internet-facing services.',
      'On all internet-facing services and for privileged users.',
      'Phishing-resistant MFA across the board, with logging.'
    ]
  },
  {
    key: 'backups', name: 'Regular backups',
    q: 'How are backups performed and tested?',
    opts: [
      'No regular backups.',
      'Backups are taken but rarely tested.',
      'Automated, retained, access-controlled, and tested.',
      'Synchronised to retention, restoration tested, privileged access prevented.'
    ]
  }
];

const wrap = document.getElementById('e8Wrap');
const answers = new Array(E8.length).fill(null);
let idx = 0; // -1 = intro, 0..7 = questions, 8 = result
let stage = 'intro';

function levelLabel(l){ return ['Level 0', 'Level 1', 'Level 2', 'Level 3'][l]; }
function levelWord(l){ return ['Not started', 'Developing', 'Established', 'Advanced'][l]; }

function renderIntro(){
  wrap.innerHTML = `
    <div class="e8-card e8-intro reveal">
      <p class="eyebrow">FREE SELF-ASSESSMENT</p>
      <h1>How mature is your<br><span class="grad-text">Essential Eight?</span></h1>
      <p class="e8-lead">Answer eight quick questions and get an instant read on your maturity across the ASD Essential Eight, plus where to focus first. It takes about two minutes.</p>
      <ul class="e8-meta">
        <li><span>8</span> questions</li>
        <li><span>~2</span> minutes</li>
        <li><span>100%</span> private</li>
      </ul>
      <p class="e8-privacy">Nothing you enter leaves your browser. We only see your answers if you choose to send them with a request for an uplift plan.</p>
      <button class="btn btn-primary btn-lg" id="e8Start">Start the assessment</button>
    </div>
  `;
  document.getElementById('e8Start').addEventListener('click', () => { stage = 'q'; idx = 0; renderQuestion(); });
  observeReveal(wrap);
}

function renderQuestion(){
  const item = E8[idx];
  const chosen = answers[idx];
  wrap.innerHTML = `
    <div class="e8-card e8-question">
      <div class="e8-progress">
        <div class="e8-progress-bar"><span style="width:${((idx) / E8.length) * 100}%"></span></div>
        <span class="e8-progress-label">Question ${idx + 1} of ${E8.length}</span>
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
        <button class="btn btn-ghost" id="e8Back">${idx === 0 ? 'Back to start' : 'Previous'}</button>
        <span class="e8-dots">${E8.map((_, i) => `<i class="${i === idx ? 'on' : ''} ${answers[i] !== null ? 'done' : ''}"></i>`).join('')}</span>
      </div>
    </div>
  `;
  wrap.querySelectorAll('.e8-option').forEach(btn => {
    btn.addEventListener('click', () => {
      answers[idx] = parseInt(btn.dataset.val, 10);
      if (idx < E8.length - 1){ idx++; renderQuestion(); }
      else { stage = 'result'; renderResult(); }
    });
  });
  document.getElementById('e8Back').addEventListener('click', () => {
    if (idx === 0){ stage = 'intro'; renderIntro(); }
    else { idx--; renderQuestion(); }
  });
}

function renderResult(){
  const scored = answers.map((a, i) => ({ ...E8[i], level: a === null ? 0 : a }));
  const overall = Math.min(...scored.map(s => s.level));
  const weakest = scored.filter(s => s.level === overall);
  const atOrAbove2 = scored.filter(s => s.level >= 2).length;

  const interp = overall === 0
    ? 'You have clear gaps that an attacker could use today. The priority is to establish a baseline across every strategy.'
    : overall === 1
      ? 'You have the beginnings of a program. The Essential Eight is scored on your weakest strategy, so the focus is lifting the laggards to a consistent Level 1 and beyond.'
      : overall === 2
        ? 'A solid, established posture. You are well placed to target Level 3 on the strategies that matter most to your risk profile.'
        : 'An advanced posture across the board. The work now is assurance: keeping it there and proving it under audit.';

  const summaryForEmail =
    `Essential Eight self-assessment result\r\n` +
    `Overall maturity: ${levelLabel(overall)} (${levelWord(overall)})\r\n\r\n` +
    scored.map(s => `${s.name}: ${levelLabel(s.level)}`).join('\r\n') +
    `\r\n\r\nWeakest areas: ${weakest.map(w => w.name).join(', ')}\r\n\r\nI'd like a tailored uplift plan.`;

  wrap.innerHTML = `
    <div class="e8-card e8-result">
      <p class="eyebrow">YOUR RESULT</p>
      <div class="e8-score">
        <div class="e8-score-ring" style="--lvl:${overall}">
          <span class="e8-score-num">${overall}</span>
          <span class="e8-score-of">/ 3</span>
        </div>
        <div class="e8-score-body">
          <h1>Overall maturity: ${levelWord(overall)}</h1>
          <p>The Essential Eight is scored on your <strong>weakest</strong> strategy, so your overall level is ${levelLabel(overall)}. ${atOrAbove2} of 8 strategies are at Level 2 or above.</p>
        </div>
      </div>

      <div class="e8-bars">
        ${scored.map(s => `
          <div class="e8-bar-row ${s.level === overall ? 'weak' : ''}">
            <span class="e8-bar-name">${s.name}</span>
            <div class="e8-bar-track">
              ${[0,1,2,3].map(l => `<span class="e8-seg ${l <= s.level ? 'fill' : ''} ${l === 0 ? '' : ''}"></span>`).join('')}
            </div>
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
        <button class="btn btn-primary btn-lg" id="e8Plan">Get a tailored uplift plan</button>
        <button class="btn btn-ghost" id="e8Retake">Retake the assessment</button>
      </div>
      <p class="e8-privacy">This result stays in your browser. Sending it for an uplift plan is your choice, and it goes to enquiry@zyberworks.com.au.</p>
    </div>
  `;

  document.getElementById('e8Retake').addEventListener('click', () => {
    answers.fill(null); idx = 0; stage = 'intro'; renderIntro();
  });
  document.getElementById('e8Plan').addEventListener('click', () => {
    if (window.ZW && window.ZW.openContact){
      window.ZW.openContact({ service: 'ASD Essential Eight', message: summaryForEmail });
    } else {
      window.location.href = 'index.html#contact';
    }
  });
}

document.addEventListener('DOMContentLoaded', renderIntro);
