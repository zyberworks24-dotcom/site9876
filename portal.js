/* Zyberworks licenses page.
 *
 * This reads data/licenses.json and displays it. That file lives in the public
 * repo, so treat everything in it as publicly visible. There is intentionally
 * no sign-in here: a login in front of a public file would only look secure
 * without actually restricting anything. If you later need real per-customer
 * or domain-restricted access, that requires a backend gatekeeper (ask and we
 * can add a Cloudflare Worker that verifies a Google domain login).
 */
const root = document.getElementById('portalRoot');

function statusPill(status){
  const s = (status || '').toLowerCase();
  const cls = s === 'active' ? 'ok' : (s === 'expiring' ? 'warn' : (s === 'expired' ? 'bad' : ''));
  return `<span class="lic-status ${cls}">${status || 'Unknown'}</span>`;
}

function licenseCard(l){
  return `
    <div class="lic-card">
      <div class="lic-top">
        <div>
          <p class="lic-product">${l.product || 'License'}</p>
          <p class="lic-tier">${l.tier || ''}</p>
        </div>
        ${statusPill(l.status)}
      </div>
      <div class="lic-meta">
        ${l.seats != null ? `<div><span>Seats</span>${l.seats}</div>` : ''}
        ${l.expiry ? `<div><span>Renews</span>${l.expiry}</div>` : ''}
        ${l.reference ? `<div><span>Reference</span>${l.reference}</div>` : ''}
      </div>
      ${l.notes ? `<p class="lic-notes">${l.notes}</p>` : ''}
    </div>`;
}

function renderEmpty(){
  root.innerHTML = `
    <div class="portal-card">
      <p class="eyebrow">LICENSES &amp; SERVICES</p>
      <h1>Nothing here<br><span class="grad-text">just yet.</span></h1>
      <p class="portal-lead">License records appear here once they are added to <code>data/licenses.json</code> in the repo.</p>
      <div class="portal-help"><p>Questions about your licenses? <a href="#" data-contact>Talk to your Zyberworks team →</a></p></div>
    </div>`;
  observeReveal(root);
}

function renderLicenses(data){
  const groups = (data && Array.isArray(data.groups)) ? data.groups : [];
  const hasAny = groups.some(g => (g.licenses || []).length);
  if (!hasAny){ renderEmpty(); return; }

  root.innerHTML = `
    <div class="portal-head">
      <div>
        <p class="eyebrow">LICENSES &amp; SERVICES</p>
        <h1>Your licenses &amp; services</h1>
        ${data.updated ? `<p class="portal-sub">Last updated ${data.updated}</p>` : ''}
      </div>
    </div>
    ${data.note ? `<div class="portal-banner">${data.note}</div>` : ''}
    ${groups.map(g => `
      ${g.label ? `<h2 class="portal-h2">${g.label}</h2>` : ''}
      <div class="lic-grid">${(g.licenses || []).map(licenseCard).join('')}</div>
    `).join('')}
    <div class="portal-help">
      <p>Need to add seats, renew, or add a product? <a href="#" data-contact>Talk to your Zyberworks team →</a></p>
    </div>
  `;
  observeReveal(root);
}

async function initPortal(){
  if (!root) return;
  let data = null;
  try { data = await fetchJSON('data/licenses.json'); } catch (err){ data = null; }
  renderLicenses(data);
}

document.addEventListener('DOMContentLoaded', initPortal);
