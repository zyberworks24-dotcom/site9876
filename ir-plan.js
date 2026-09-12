/* Incident Response Plan builder. Generates a printable starter plan from a
   few inputs, entirely in the browser. Nothing is sent anywhere. */
(function(){
  const app = document.getElementById('irApp');
  const head = document.getElementById('irHead');
  if (!app) return;

  function esc(t){ return (t || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function line(v, fallback){ return (v && v.trim()) ? esc(v.trim()) : `<span class="ir-blank">${fallback}</span>`; }

  function renderForm(){
    app.innerHTML = `
      <div class="pw-card reveal">
        <form id="irForm">
          <div class="ir-grid">
            <div class="ir-field"><label>Organisation name</label><input name="org" placeholder="Your organisation"></div>
            <div class="ir-field"><label>Plan owner</label><input name="owner" placeholder="e.g. IT Manager"></div>
          </div>
          <p class="ir-legend">Key contacts (used in the plan)</p>
          <div class="ir-grid">
            <div class="ir-field"><label>IT / security lead</label><input name="itName" placeholder="Name"></div>
            <div class="ir-field"><label>Their contact</label><input name="itContact" placeholder="Phone or email"></div>
            <div class="ir-field"><label>Management / decision maker</label><input name="mgmtName" placeholder="Name"></div>
            <div class="ir-field"><label>Their contact</label><input name="mgmtContact" placeholder="Phone or email"></div>
            <div class="ir-field"><label>External IT / security partner</label><input name="partnerName" placeholder="e.g. Zyberworks" value="Zyberworks"></div>
            <div class="ir-field"><label>Their contact</label><input name="partnerContact" placeholder="Phone or email" value="enquiry@zyberworks.com.au"></div>
          </div>
          <div class="ir-field" style="margin-top:4px"><label>Your most critical systems and data</label><textarea name="critical" rows="2" placeholder="e.g. email, finance system, patient records, e-commerce site"></textarea></div>
          <p class="ir-legend">A few quick facts</p>
          <label class="pg-check"><input type="checkbox" name="backups"> We have backups that are tested and kept offline or immutable</label>
          <label class="pg-check"><input type="checkbox" name="insurance"> We have cyber insurance</label>
          <label class="pg-check"><input type="checkbox" name="personal"> We hold personal information about individuals</label>
          <button type="submit" class="btn btn-primary btn-lg" style="width:100%;margin-top:20px">Generate my plan</button>
        </form>
      </div>`;
    document.getElementById('irForm').addEventListener('submit', e => {
      e.preventDefault();
      const f = e.target;
      const d = {};
      ['org','owner','itName','itContact','mgmtName','mgmtContact','partnerName','partnerContact','critical'].forEach(k => d[k] = f.elements[k].value);
      d.backups = f.elements['backups'].checked;
      d.insurance = f.elements['insurance'].checked;
      d.personal = f.elements['personal'].checked;
      renderPlan(d);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    observeReveal(app);
  }

  function renderPlan(d){
    if (head) head.hidden = true;
    const today = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
    const ndb = d.personal ? `
      <li><strong>Notifiable Data Breaches (NDB):</strong> because we hold personal information, assess whether the incident is likely to result in serious harm. If so, notify affected individuals and the Office of the Australian Information Commissioner (OAIC) as soon as practicable, within the required timeframe.</li>` : '';
    const ins = d.insurance ? `
      <li><strong>Cyber insurer:</strong> notify your insurer early. Many policies require prompt notice and may provide an incident response panel. Do not agree to costs or engage vendors before checking policy terms.</li>` : '';
    const backupNote = d.backups
      ? 'You have indicated backups are tested and kept offline or immutable, which is exactly what recovery depends on.'
      : 'You have not confirmed tested, offline or immutable backups. This is the single most important thing to fix, because it is what lets you recover without paying a ransom.';

    app.innerHTML = `
      <div class="ir-toolbar">
        <button class="btn btn-primary" id="irPrint">Print / Save as PDF</button>
        <button class="btn btn-ghost" id="irEdit">Edit answers</button>
      </div>
      <article class="ir-doc" id="irDoc">
        <header class="ir-doc-head">
          <h1>Cyber Incident Response Plan</h1>
          <p class="ir-doc-org">${line(d.org, 'Your organisation')}</p>
          <p class="ir-doc-meta">Starter plan · generated ${today} · owner: ${line(d.owner, 'to be assigned')}</p>
        </header>

        <h2>1. Purpose</h2>
        <p>This plan sets out how ${line(d.org, 'the organisation')} prepares for, responds to, and recovers from a cyber security incident. Its goal is to limit harm, restore operations quickly, and meet our legal obligations. Speed and clear roles matter more than perfection.</p>

        <h2>2. Who does what</h2>
        <table class="ir-table">
          <tr><th>Role</th><th>Who</th><th>Contact</th></tr>
          <tr><td>IT / security lead (coordinates the response)</td><td>${line(d.itName, 'Name')}</td><td>${line(d.itContact, 'Contact')}</td></tr>
          <tr><td>Management / decision maker (approves major actions)</td><td>${line(d.mgmtName, 'Name')}</td><td>${line(d.mgmtContact, 'Contact')}</td></tr>
          <tr><td>External IT / security partner (specialist help)</td><td>${line(d.partnerName, 'Name')}</td><td>${line(d.partnerContact, 'Contact')}</td></tr>
        </table>

        <h2>3. What counts as an incident, and how serious</h2>
        <ul>
          <li><strong>Low:</strong> a single blocked phishing email, one device with contained malware, no data at risk.</li>
          <li><strong>Medium:</strong> a compromised account, malware on several devices, limited disruption.</li>
          <li><strong>High:</strong> confirmed unauthorised access, data at risk, or a key service down.</li>
          <li><strong>Critical:</strong> ransomware, major data theft, or a business-wide outage.</li>
        </ul>
        <p>When in doubt, treat it as more serious and escalate. Our most critical systems and data are: ${line(d.critical, 'to be listed')}.</p>

        <h2>4. The response, step by step</h2>
        <ol class="ir-steps">
          <li><strong>Prepare.</strong> Keep this plan current, know your backups work, and make sure everyone knows how to report something suspicious.</li>
          <li><strong>Identify.</strong> Confirm what is happening. Record the time, what was seen, and which systems are affected. Start a simple incident log and keep it going throughout.</li>
          <li><strong>Contain.</strong> Stop the spread. Isolate affected devices from the network (do not just turn them off, as that can lose evidence). Disable compromised accounts and reset passwords. Preserve logs.</li>
          <li><strong>Eradicate.</strong> Remove the cause: malware, unauthorised access, or the exploited weakness. Patch and harden before anything goes back online.</li>
          <li><strong>Recover.</strong> Restore from known-good backups, verify systems are clean, and bring services back in a controlled way while watching closely. ${esc(backupNote)}</li>
          <li><strong>Review.</strong> Within two weeks, hold a short lessons-learned session. What worked, what did not, and what will we change? Update this plan.</li>
        </ol>

        <h2>5. Key decisions and who to notify</h2>
        <ul>
          <li><strong>Isolate or stay online?</strong> The IT/security lead recommends, management decides. Containing damage usually beats staying online.</li>
          <li><strong>Bring in specialist help:</strong> engage your external partner early for anything High or Critical.</li>${ins}${ndb}
          <li><strong>Report to authorities:</strong> serious incidents can be reported to the Australian Cyber Security Centre (ACSC) via ReportCyber. Report suspected crime to the police.</li>
          <li><strong>Ransom:</strong> paying is a last resort, is not guaranteed to work, and may be unlawful in some cases. Decisions rest with management, with legal and specialist advice.</li>
        </ul>

        <h2>6. Communication</h2>
        <ul>
          <li><strong>Internal:</strong> tell staff what to do and not do (for example, do not use affected systems). Keep updates brief and regular.</li>
          <li><strong>Customers and partners:</strong> be honest and timely if they are affected. Agree messaging before it goes out.</li>
          <li><strong>Media and public:</strong> route all enquiries to one nominated spokesperson.</li>
        </ul>

        <h2>7. After the incident</h2>
        <p>Close the incident only when systems are verified clean, monitoring is in place, and the log is complete. Complete the lessons-learned review, action the improvements, and re-test this plan at least once a year.</p>

        <footer class="ir-doc-foot">
          <p>Prepared with the Zyberworks incident response plan builder. For a plan built, tested, and exercised with your team, talk to us: enquiry@zyberworks.com.au</p>
        </footer>
      </article>

      <div class="cta-actions" style="justify-content:center;margin-top:8px" id="irCta">
        <button type="button" class="btn btn-primary btn-lg" data-contact data-service="IT Project Consulting">Make this a real, tested plan</button>
        <a href="assessment?a=ransomware" class="btn btn-ghost btn-lg">Check your ransomware readiness</a>
      </div>`;
    document.getElementById('irPrint').addEventListener('click', () => window.print());
    document.getElementById('irEdit').addEventListener('click', () => { if (head) head.hidden = false; renderForm(); window.scrollTo({top:0}); });
    observeReveal(app);
  }

  renderForm();
})();
