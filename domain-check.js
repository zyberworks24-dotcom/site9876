/* Email domain security checker. Looks up SPF, DMARC, DKIM and MX records via
   public DNS-over-HTTPS (Google) from the browser, and grades the result.
   No server of ours is involved; only public DNS is queried. */
(function(){
  const form = document.getElementById('dcForm');
  const input = document.getElementById('dcInput');
  const result = document.getElementById('dcResult');
  const go = document.getElementById('dcGo');
  if (!form) return;

  const DOH = 'https://dns.google/resolve';
  const DKIM_SELECTORS = ['google', 'default', 'selector1', 'selector2', 'k1', 'dkim', 's1', 's2', 'mail', 'mandrill', 'zoho'];

  async function query(name, type){
    const r = await fetch(`${DOH}?name=${encodeURIComponent(name)}&type=${type}`, { headers: { 'accept': 'application/dns-json' } });
    if (!r.ok) throw new Error('DNS lookup failed');
    return r.json();
  }
  function txtValues(json){
    return (json.Answer || []).filter(a => a.type === 16).map(a => a.data.replace(/^"|"$/g, '').replace(/"\s+"/g, ''));
  }

  function gradeLetter(score){
    return score >= 5 ? 'A' : score >= 4 ? 'B' : score >= 2.5 ? 'C' : score >= 1.5 ? 'D' : 'F';
  }
  const ICON = {
    good: `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5 9.5 17 19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    warn: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 4 22 20H2L12 4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 10v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    bad: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`
  };

  function checkCard(c){
    return `
      <div class="dc-check dc-${c.state}">
        <span class="dc-check-icon">${ICON[c.state]}</span>
        <div class="dc-check-body">
          <p class="dc-check-title">${c.title}</p>
          <p class="dc-check-text">${c.text}</p>
          ${c.record ? `<code class="dc-record">${c.record}</code>` : ''}
        </div>
      </div>`;
  }

  async function run(domain){
    result.innerHTML = `<div class="pw-card" style="text-align:center"><p class="pw-lead" style="margin:0">Checking <strong>${domain}</strong>…</p></div>`;
    let checks = [];
    let score = 0;

    // SPF
    try {
      const spf = txtValues(await query(domain, 'TXT')).find(t => /^v=spf1/i.test(t));
      if (!spf){
        checks.push({ title: 'SPF', state: 'bad', text: 'No SPF record found. Anyone can more easily send email that looks like it comes from this domain.' });
      } else {
        const all = (spf.match(/[~\-?+]all/) || [])[0] || '';
        if (all === '-all'){ score += 2; checks.push({ title: 'SPF', state: 'good', text: 'SPF is published with a hard fail (-all), which tells receivers to reject unauthorised senders.', record: spf }); }
        else if (all === '~all'){ score += 1.5; checks.push({ title: 'SPF', state: 'good', text: 'SPF is published with a soft fail (~all). Combined with DMARC this is effective; a hard fail (-all) is the strictest option.', record: spf }); }
        else { score += 0.8; checks.push({ title: 'SPF', state: 'warn', text: 'An SPF record exists but its policy is weak (' + (all || 'no all mechanism') + '). Tighten it to ~all or -all.', record: spf }); }
      }
    } catch(e){ checks.push({ title: 'SPF', state: 'warn', text: 'Could not read SPF (DNS lookup issue). Try again.' }); }

    // DMARC
    try {
      const dmarc = txtValues(await query('_dmarc.' + domain, 'TXT')).find(t => /^v=DMARC1/i.test(t));
      if (!dmarc){
        checks.push({ title: 'DMARC', state: 'bad', text: 'No DMARC record found. Without DMARC, SPF and DKIM are not enforced and you get no visibility of spoofing.' });
      } else {
        const p = ((dmarc.match(/\bp=([a-z]+)/i) || [])[1] || 'none').toLowerCase();
        if (p === 'reject'){ score += 3.5; checks.push({ title: 'DMARC', state: 'good', text: 'DMARC is set to reject, the strongest policy. Spoofed mail is rejected outright.', record: dmarc }); }
        else if (p === 'quarantine'){ score += 2.5; checks.push({ title: 'DMARC', state: 'warn', text: 'DMARC is set to quarantine. Strong. Move to reject once you are confident nothing legitimate is being caught.', record: dmarc }); }
        else { score += 1; checks.push({ title: 'DMARC', state: 'warn', text: 'DMARC is in monitoring mode (p=none). It reports but does not block spoofing yet. Progress to quarantine, then reject.', record: dmarc }); }
      }
    } catch(e){ checks.push({ title: 'DMARC', state: 'warn', text: 'Could not read DMARC (DNS lookup issue). Try again.' }); }

    // DKIM (best effort across common selectors)
    try {
      const found = [];
      await Promise.all(DKIM_SELECTORS.map(async sel => {
        try {
          const j = await query(`${sel}._domainkey.${domain}`, 'TXT');
          const rec = txtValues(j).find(t => /v=DKIM1|k=rsa|p=/i.test(t));
          if (rec) found.push(sel);
        } catch(e){}
      }));
      if (found.length){ score += 0.5; checks.push({ title: 'DKIM', state: 'good', text: `A DKIM key was found (selector: ${found.join(', ')}). Your mail can be cryptographically signed.` }); }
      else { checks.push({ title: 'DKIM', state: 'warn', text: 'No DKIM key found on the common selectors we checked. Your provider may use a custom selector, so this is not conclusive, but it is worth confirming DKIM is enabled.' }); }
    } catch(e){ checks.push({ title: 'DKIM', state: 'warn', text: 'Could not check DKIM.' }); }

    // MX
    try {
      const mx = (await query(domain, 'MX')).Answer || [];
      const hosts = mx.filter(a => a.type === 15).map(a => a.data.replace(/\.$/, '').replace(/^\d+\s+/, ''));
      if (hosts.length){ checks.push({ title: 'MX (mail servers)', state: 'good', text: 'This domain receives email via ' + hosts.length + ' mail server' + (hosts.length === 1 ? '' : 's') + '.', record: hosts.slice(0, 3).join('  ·  ') }); }
      else { checks.push({ title: 'MX (mail servers)', state: 'warn', text: 'No MX records found. This domain may not be set up to receive email.' }); }
    } catch(e){ checks.push({ title: 'MX (mail servers)', state: 'warn', text: 'Could not read MX records.' }); }

    const letter = gradeLetter(score);
    const gcolor = letter === 'A' ? '#4ade80' : letter === 'B' ? '#38bdf8' : letter === 'C' ? '#fbbf24' : letter === 'D' ? '#fb923c' : '#f87171';
    const verdict = (letter === 'A' || letter === 'B')
      ? 'Solid. Your domain is well defended against email spoofing.'
      : letter === 'C'
        ? 'A reasonable start, but there are clear gaps an attacker could use.'
        : 'This domain is exposed to spoofing and impersonation. Worth fixing soon.';

    result.innerHTML = `
      <div class="pw-card dc-result reveal">
        <div class="dc-grade">
          <div class="dc-grade-ring" style="border-color:${gcolor};color:${gcolor}">${letter}</div>
          <div class="dc-grade-body">
            <p class="dc-grade-domain">${domain}</p>
            <p class="dc-grade-verdict">${verdict}</p>
          </div>
        </div>
        <div class="dc-checks">${checks.map(checkCard).join('')}</div>
        <div class="cta-actions" style="margin-top:8px">
          <button type="button" class="btn btn-primary" data-contact data-service="Cybersecurity Audits">Fix this with us</button>
          <button type="button" class="btn btn-ghost" id="dcAgain">Check another domain</button>
        </div>
        <p class="dc-note">This is an indicative check of public DNS records, not a full email security audit. DKIM detection is best effort.</p>
      </div>`;
    const again = document.getElementById('dcAgain');
    if (again) again.addEventListener('click', () => { input.value = ''; input.focus(); result.innerHTML = ''; });
    observeReveal(result);
  }

  function clean(v){
    return (v || '').trim().toLowerCase()
      .replace(/^https?:\/\//, '').replace(/^mailto:/, '')
      .replace(/^[^@]*@/, '').replace(/\/.*$/, '').replace(/\s+/g, '');
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const domain = clean(input.value);
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)){
      result.innerHTML = `<div class="pw-card" style="text-align:center"><p class="pw-lead" style="margin:0;color:#fbbf24">Please enter a valid domain, like yourcompany.com.au</p></div>`;
      return;
    }
    go.disabled = true; go.textContent = 'Checking…';
    try { await run(domain); } catch(e){ result.innerHTML = `<div class="pw-card" style="text-align:center"><p class="pw-lead" style="margin:0">Something went wrong looking that up. Please try again.</p></div>`; }
    go.disabled = false; go.textContent = 'Check';
  });
})();
