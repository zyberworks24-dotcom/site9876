/* Password strength checker. Runs entirely in the browser; the password is
   never sent anywhere. Uses zxcvbn when available, with a simple fallback. */
(function(){
  const input = document.getElementById('pwInput');
  const toggle = document.getElementById('pwToggle');
  const fill = document.getElementById('pwMeterFill');
  const label = document.getElementById('pwLabel');
  const crackEl = document.getElementById('pwCrack');
  const feedback = document.getElementById('pwFeedback');
  if (!input) return;

  const WORDS = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const COLORS = ['#f87171', '#fb923c', '#fbbf24', '#38bdf8', '#4ade80'];

  function fallback(pw){
    let variety = 0;
    if (/[a-z]/.test(pw)) variety++;
    if (/[A-Z]/.test(pw)) variety++;
    if (/[0-9]/.test(pw)) variety++;
    if (/[^A-Za-z0-9]/.test(pw)) variety++;
    let score = 0;
    if (pw.length >= 8 && variety >= 2) score = 1;
    if (pw.length >= 12 && variety >= 3) score = 2;
    if (pw.length >= 16 && variety >= 3) score = 3;
    if (pw.length >= 20 && variety >= 4) score = 4;
    const guessesLog10 = pw.length * (variety >= 3 ? 1.8 : variety >= 2 ? 1.4 : 1.0);
    const seconds = Math.pow(10, guessesLog10) / 1e4;
    return { score, crack: humanTime(seconds), warning: '', suggestions: pw.length < 12 ? ['Make it longer, ideally a passphrase of several words.'] : [] };
  }

  function humanTime(s){
    if (s < 1) return 'less than a second';
    const units = [['century', 3153600000], ['year', 31536000], ['month', 2592000], ['day', 86400], ['hour', 3600], ['minute', 60], ['second', 1]];
    for (const [name, secs] of units){
      if (s >= secs){ const v = Math.round(s / secs); return v + ' ' + name + (v === 1 ? '' : name === 'century' ? 'ies'.replace('ies','ies') : 's'); }
    }
    return 'less than a second';
  }

  function evaluate(){
    const pw = input.value;
    if (!pw){
      fill.style.width = '0%';
      label.textContent = 'Waiting…';
      label.style.color = 'var(--text-faint)';
      crackEl.textContent = '';
      feedback.innerHTML = '';
      return;
    }
    let score, crack, warning, suggestions;
    if (typeof window.zxcvbn === 'function'){
      const r = window.zxcvbn(pw.slice(0, 100));
      score = r.score;
      crack = r.crack_times_display.offline_slow_hashing_1e4_per_second;
      warning = r.feedback.warning || '';
      suggestions = r.feedback.suggestions || [];
    } else {
      const f = fallback(pw);
      score = f.score; crack = f.crack; warning = f.warning; suggestions = f.suggestions;
    }
    fill.style.width = ((score + 1) / 5 * 100) + '%';
    fill.style.background = COLORS[score];
    label.textContent = WORDS[score];
    label.style.color = COLORS[score];
    crackEl.textContent = 'Time to crack: ' + crack;
    const tips = [];
    if (warning) tips.push(`<p class="pw-fb-warn">${warning}</p>`);
    if (suggestions && suggestions.length) tips.push(`<ul class="pw-fb-list">${suggestions.map(s => `<li>${s}</li>`).join('')}</ul>`);
    feedback.innerHTML = tips.join('');
  }

  input.addEventListener('input', evaluate);
  toggle.addEventListener('click', () => {
    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';
    toggle.textContent = showing ? 'Show' : 'Hide';
    input.focus();
  });
})();
