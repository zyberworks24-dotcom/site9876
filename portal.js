/* Zyberworks client portal.
 *
 * To go live: create a free Firebase project, enable Google sign-in, create a
 * Firestore database, and paste your web config into FIREBASE_CONFIG below.
 * See PORTAL-SETUP.md in the repo for the exact steps and security rules.
 *
 * Until FIREBASE_CONFIG is set, the portal runs in a clearly-labelled preview
 * with sample data, so you can see the experience without a backend.
 */
const FIREBASE_CONFIG = null; // e.g. { apiKey: "...", authDomain: "...", projectId: "...", ... }

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

function dashboardShell({ name, email, licenses, sample, onSignOut }){
  const list = licenses.length
    ? `<div class="lic-grid">${licenses.map(licenseCard).join('')}</div>`
    : `<div class="portal-empty"><p>No licenses are on file for your account yet.</p><p class="portal-empty-sub">If that looks wrong, <a href="#" data-contact data-service="Managed IT Support">contact us</a> and we will sort it out.</p></div>`;
  root.innerHTML = `
    ${sample ? `<div class="portal-banner">Preview mode &middot; the licenses below are <strong>sample data</strong>, not a real account. Connect Firebase to enable real sign-in and per-customer data (see PORTAL-SETUP.md).</div>` : ''}
    <div class="portal-head">
      <div>
        <p class="eyebrow">CLIENT PORTAL</p>
        <h1>Welcome${name ? ', ' + name.split(' ')[0] : ''}.</h1>
        <p class="portal-sub">${email ? 'Signed in as ' + email : ''}</p>
      </div>
      <button class="btn btn-ghost" id="portalSignOut">${sample ? 'Exit preview' : 'Sign out'}</button>
    </div>
    <h2 class="portal-h2">Your licenses &amp; services</h2>
    ${list}
    <div class="portal-help">
      <p>Need to add seats, renew, or add a product? <a href="#" data-contact>Talk to your Zyberworks team →</a></p>
    </div>
  `;
  const btn = document.getElementById('portalSignOut');
  if (btn) btn.addEventListener('click', onSignOut);
  observeReveal(root);
}

/* ---------- Demo / preview mode ---------- */
const SAMPLE_LICENSES = [
  { product: 'CrowdStrike Falcon', tier: 'Falcon Enterprise', status: 'Active', seats: 120, expiry: '30 Jun 2027', reference: 'ZW-CS-1042', notes: 'Managed detection and response included.' },
  { product: 'Blocksi', tier: 'Content Filtering + Classroom', status: 'Active', seats: 450, expiry: '31 Jan 2027', reference: 'ZW-BL-0087' },
  { product: 'Managed IT Support', tier: 'Business SLA', status: 'Expiring', seats: null, expiry: '05 Oct 2026', reference: 'ZW-MS-0311', notes: 'Renewal quote due shortly.' }
];

function renderSignedOutDemo(){
  root.innerHTML = `
    <div class="portal-card">
      <p class="eyebrow">CLIENT PORTAL</p>
      <h1>Sign in to your<br><span class="grad-text">Zyberworks portal.</span></h1>
      <p class="portal-lead">View your active licenses, renewals, and managed services in one place.</p>
      <button class="portal-google" id="portalGoogle">
        <span class="pg-icon">G</span> Sign in with Google
      </button>
      <p class="portal-preview-note">This is a preview. Real Google sign-in and your actual licenses switch on once Firebase is connected. For now, you can explore the dashboard with sample data.</p>
      <button class="btn btn-ghost" id="portalDemoBtn">View sample dashboard</button>
    </div>
  `;
  const go = () => dashboardShell({
    name: 'Sample User', email: 'sample@yourcompany.com',
    licenses: SAMPLE_LICENSES, sample: true, onSignOut: renderSignedOutDemo
  });
  document.getElementById('portalGoogle').addEventListener('click', go);
  document.getElementById('portalDemoBtn').addEventListener('click', go);
  observeReveal(root);
}

/* ---------- Live mode (Firebase) ---------- */
function loadScript(src){
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src; s.async = true;
    s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function initLive(){
  const V = '10.12.0';
  try {
    await loadScript(`https://www.gstatic.com/firebasejs/${V}/firebase-app-compat.js`);
    await loadScript(`https://www.gstatic.com/firebasejs/${V}/firebase-auth-compat.js`);
    await loadScript(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore-compat.js`);
  } catch (err){
    renderSignedOutDemo();
    return;
  }
  firebase.initializeApp(FIREBASE_CONFIG);
  const auth = firebase.auth();
  const db = firebase.firestore();

  function renderSignIn(){
    root.innerHTML = `
      <div class="portal-card">
        <p class="eyebrow">CLIENT PORTAL</p>
        <h1>Sign in to your<br><span class="grad-text">Zyberworks portal.</span></h1>
        <p class="portal-lead">View your active licenses, renewals, and managed services in one place.</p>
        <button class="portal-google" id="portalGoogle"><span class="pg-icon">G</span> Sign in with Google</button>
        <p class="portal-preview-note">We only use your Google account to confirm who you are. See our <a href="privacy.html">privacy policy</a>.</p>
      </div>`;
    document.getElementById('portalGoogle').addEventListener('click', () => {
      auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(err => {
        root.querySelector('.portal-preview-note').textContent = 'Sign in was cancelled or failed. Please try again.';
      });
    });
    observeReveal(root);
  }

  async function renderDashboard(user){
    root.innerHTML = `<div class="portal-loading">Loading your account…</div>`;
    let licenses = [];
    try {
      const snap = await db.collection('licenses').where('email', '==', user.email).get();
      licenses = snap.docs.map(d => d.data());
    } catch (err){ licenses = []; }
    dashboardShell({
      name: user.displayName, email: user.email, licenses, sample: false,
      onSignOut: () => auth.signOut()
    });
  }

  auth.onAuthStateChanged(user => { user ? renderDashboard(user) : renderSignIn(); });
}

function initPortal(){
  if (!root) return;
  if (FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey) initLive();
  else renderSignedOutDemo();
}

document.addEventListener('DOMContentLoaded', initPortal);
