/* ===================== Shared base path ===================== */
const BASE = document.body.dataset.base || '';

/* ===================== Icons ===================== */
const ICONS = {
  pentest: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2.4" stroke="currentColor" stroke-width="1.5"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  iso: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2 19 5.2V11c0 5-3 8.5-7 10-4-1.5-7-5-7-10V5.2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8.5 12 11 14.5 15.5 9.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  e8: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="1.3" fill="currentColor"/><circle cx="12" cy="8" r="1.3" fill="currentColor"/><circle cx="16" cy="8" r="1.3" fill="currentColor"/><circle cx="8" cy="12" r="1.3" fill="currentColor"/><circle cx="16" cy="12" r="1.3" fill="currentColor"/><circle cx="8" cy="16" r="1.3" fill="currentColor"/><circle cx="12" cy="16" r="1.3" fill="currentColor"/><circle cx="16" cy="16" r="1.3" fill="currentColor"/></svg>`,
  infra: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="5" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="10.5" width="18" height="5" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="17" width="18" height="4" rx="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="6.5" r="1" fill="currentColor"/><circle cx="7" cy="13" r="1" fill="currentColor"/></svg>`,
  support: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 13a8 8 0 0 1 16 0" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="13" width="4.5" height="6" rx="1.6" stroke="currentColor" stroke-width="1.5"/><rect x="16.5" y="13" width="4.5" height="6" rx="1.6" stroke="currentColor" stroke-width="1.5"/><path d="M18.5 19.2c0 1.8-2 2.8-4.5 2.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  project: `<svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="6" r="2.3" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="6" r="2.3" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="18" r="2.3" stroke="currentColor" stroke-width="1.5"/><path d="M7 7.3 10.3 16M17 7.3 13.7 16" stroke="currentColor" stroke-width="1.5"/></svg>`,
  device: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="11" rx="1.6" stroke="currentColor" stroke-width="1.5"/><path d="M2 19h20l-1.6-3H3.6Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  devsec: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2 19 5.2V11c0 5-3 8.5-7 10-4-1.5-7-5-7-10V5.2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><rect x="9.3" y="11" width="5.4" height="4.4" rx="1" stroke="currentColor" stroke-width="1.4"/><path d="M10.2 11V9.3a1.8 1.8 0 0 1 3.6 0V11" stroke="currentColor" stroke-width="1.4"/></svg>`,
  gauge: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 16a8 8 0 0 1 16 0" stroke="currentColor" stroke-width="1.5"/><path d="M12 16 16 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="16" r="1.4" fill="currentColor"/></svg>`,
  product: `<svg viewBox="0 0 24 24" fill="none"><path d="M9 4h4a1.5 1.5 0 0 1 1.5 1.5v1.7A1.8 1.8 0 1 0 16.3 9H20v6h-3.5a1.8 1.8 0 1 0-2 2.2V20H9v-3.5a1.8 1.8 0 1 0-2-2.2V10.3A1.8 1.8 0 1 0 4.5 8V6.5A1.5 1.5 0 0 1 6 5h3Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
  cloud: `<svg viewBox="0 0 24 24" fill="none"><path d="M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 10.1 4.5 4.5 0 0 0 7 18Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 12v5.5M9.7 15.3 12 17.5l2.3-2.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  audit: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="12" height="16" rx="1.6" stroke="currentColor" stroke-width="1.5"/><path d="M7 7.5h6M7 11h6M7 14.5h3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="16.5" cy="16.5" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M18.7 18.7 21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  network: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="2.2" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="18" r="2.2" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="18" r="2.2" stroke="currentColor" stroke-width="1.5"/><path d="M12 7.2 6.4 16.2M12 7.2l5.6 9M7.2 18h9.6" stroke="currentColor" stroke-width="1.4"/></svg>`,
  software: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4.5" width="18" height="15" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 8.2h18" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="6.3" r=".8" fill="currentColor"/><circle cx="8.4" cy="6.3" r=".8" fill="currentColor"/><path d="M8 14l2.5 2.2L8 18.4M13 18.4h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  vendor: `<svg viewBox="0 0 24 24" fill="none"><circle cx="8" cy="9" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="9" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 19c.7-2.8 2.5-4.3 4.5-4.3s3.8 1.5 4.5 4.3M11.5 19c.7-2.8 2.5-4.3 4.5-4.3s3.8 1.5 4.5 4.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  radar: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="5.2" stroke="currentColor" stroke-width="1.5" opacity=".55"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><path d="M12 12 19.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 5h16l-6.2 7.4V19l-3.6 1.8v-8.4L4 5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  monitor: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M9 20h6M12 16v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M7 10.5l2.5 2.5L14 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};
const CHECK_SVG = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5 9.5 17 19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ARROW_SVG = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CATEGORY_LABEL = { security: 'Security & Compliance', infra: 'Infrastructure & Cloud', strategy: 'Strategy & Support' };

/* ===================== Fetch helper ===================== */
async function fetchJSON(path){
  const res = await fetch(BASE + path);
  if (!res.ok) throw new Error('Failed to load ' + path);
  return res.json();
}

/* ===================== Shared nav (rendered on every page) ===================== */
function renderNav(){
  const nav = document.getElementById('nav');
  if (!nav) return;
  const path = location.pathname;
  const active =
    (/\/services\//.test(path) || /services\.html$/.test(path)) ? 'services' :
    /frameworks\.html$/.test(path) ? 'frameworks' :
    /partners\.html$/.test(path) ? 'partners' :
    /about\.html$/.test(path) ? 'about' : '';
  const links = [
    ['services', 'Services', BASE + 'services.html'],
    ['frameworks', 'Frameworks', BASE + 'frameworks.html'],
    ['partners', 'Partners', BASE + 'partners.html'],
    ['about', 'About', BASE + 'about.html']
  ];
  nav.innerHTML = `
    <div class="nav-inner">
      <a href="${BASE}index.html" class="nav-logo">
        <span class="logo-mark" aria-hidden="true"><img src="${BASE}assets/brand/logo.png" alt="" class="logo-img"></span>
        Zyberworks
      </a>
      <ul class="nav-links">
        ${links.map(([k, l, h]) => `<li><a href="${h}" class="${active === k ? 'active' : ''}">${l}</a></li>`).join('')}
        <li><a href="#" class="nav-cta" data-contact>Let's Talk</a></li>
      </ul>
      <button class="nav-burger" id="navBurger" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
    <div class="nav-mobile" id="navMobile">
      ${links.map(([k, l, h]) => `<a href="${h}">${l}</a>`).join('')}
      <a href="#" data-contact>Let's Talk</a>
    </div>
  `;
}

function initNav(){
  const nav = document.getElementById('nav');
  if (!nav) return;
  renderNav();
  const burger = document.getElementById('navBurger');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive:true });
  nav.classList.toggle('scrolled', window.scrollY > 12);
  if (burger){
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('.nav-mobile a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }
}

/* ===================== Scroll reveal (re-usable for dynamically injected content) ===================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold:0.15, rootMargin:'0px 0px -60px 0px' });

function observeReveal(root = document){
  root.querySelectorAll('.reveal, .reveal-lines, .reveal-left, .reveal-right, .reveal-scale, .reveal-up').forEach(el => revealObserver.observe(el));
}

/* ===================== Scroll progress bar (site-wide) ===================== */
function initScrollProgress(){
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  let raf = null;
  const update = () => {
    raf = null;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  };
  const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
  window.addEventListener('scroll', schedule, { passive:true });
  window.addEventListener('resize', schedule);
  update();
}

/* ===================== Count-up stats (site-wide) ===================== */
function initCountUp(){
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      io.unobserve(el);
      const raw = el.textContent.trim();
      if (!/^\d+$/.test(raw)) return; // leave values like "24/7" untouched
      const target = parseInt(raw, 10);
      if (reduced){ el.textContent = target; return; }
      const dur = 1400, start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(tick); else el.textContent = target;
      };
      requestAnimationFrame(tick);
    });
  }, { threshold:0.5 });
  nums.forEach(el => io.observe(el));
}

/* ===================== Cursor glow (site-wide) ===================== */
function initCursorGlow(){
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) return; // skip on touch devices
  let glow = document.getElementById('cursorGlow');
  if (!glow){
    glow = document.createElement('div');
    glow.id = 'cursorGlow';
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);
  }
  let raf = null;
  function move(x, y){
    if (raf) return;
    raf = requestAnimationFrame(() => { glow.style.left = x + 'px'; glow.style.top = y + 'px'; raf = null; });
  }
  window.addEventListener('mousemove', e => { glow.classList.add('active'); move(e.clientX, e.clientY); }, { passive:true });
  document.addEventListener('mouseleave', () => glow.classList.remove('active'));
}

/* ===================== Parallax blobs ===================== */
function initParallax(){
  const blobs = document.querySelectorAll('.blob');
  if (!blobs.length) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > window.innerHeight * 1.2) return;
    blobs.forEach((b, i) => { b.style.transform = `translateY(${y * (0.08 + i * 0.05)}px)`; });
  }, { passive:true });
}

/* ===================== Glass tiles: cursor-tracked sheen ===================== */
function initGlass(){
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
  const sel = '.card, .partner-card, .sp-process-step, .sp-faq, .sp-deliverable-box, .stat, .cta-card, .sp-partner, .why-card, .ind-card, .engage-step, .sc-pillar';
  document.addEventListener('mousemove', e => {
    const el = e.target.closest(sel);
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  }, { passive:true });
}

/* ===================== Booking =====================
   Paste your scheduling link below (e.g. a Calendly URL) to switch on
   the "Book a consultation" option site-wide. Leave it empty and those
   buttons quietly fall back to the contact form. A calendly.com link
   opens as an in-page popup; any other link opens in a new tab. */
const BOOKING_URL = '';

/* ===================== Contact modal (composes an email to Zyberworks) ===================== */
const CONTACT_EMAIL = 'enquiry@zyberworks.com.au';
const MAIL_ICON = `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.2" stroke="currentColor" stroke-width="1.6"/><path d="M4 7.5l8 5.5 8-5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

async function initContact(){
  if (document.getElementById('contactBackdrop')) return;

  document.body.insertAdjacentHTML('beforeend', `
    <div class="contact-backdrop" id="contactBackdrop">
      <div class="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contactTitle">
        <button class="contact-close" id="contactClose" aria-label="Close">&times;</button>
        <p class="contact-eyebrow">GET IN TOUCH</p>
        <h3 class="contact-title" id="contactTitle">Let's talk security.</h3>
        <p class="contact-sub">Tell us what you need and we will get back to you. Your enquiry goes to ${CONTACT_EMAIL}.</p>
        <form id="contactForm" novalidate>
          <div class="field"><label for="cf-name">Name</label><input id="cf-name" name="name" autocomplete="name" required></div>
          <div class="field"><label for="cf-email">Your email</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div>
          <div class="field"><label for="cf-company">Company <span style="opacity:.6">(optional)</span></label><input id="cf-company" name="company" autocomplete="organization"></div>
          <div class="field"><label for="cf-service">Service of interest</label><select id="cf-service" name="service"></select></div>
          <div class="cf-quote" id="cfQuote" hidden>
            <p class="cf-quote-plan" id="cfQuotePlan"></p>
            <div class="field"><label for="cf-endpoints">Number of endpoints</label><input id="cf-endpoints" name="endpoints" type="number" min="1" step="1" inputmode="numeric" value="50"></div>
            <div class="cf-estimate" id="cfEstimate"></div>
          </div>
          <div class="field"><label for="cf-message">Message</label><textarea id="cf-message" name="message" rows="4" required></textarea></div>
          <p class="contact-error" id="contactError" hidden></p>
          <p class="contact-send-label">Choose how to send your enquiry:</p>
          <div class="contact-actions">
            <button type="button" class="btn btn-primary" data-send="mail">${MAIL_ICON} Email app</button>
            <button type="button" class="btn btn-ghost" data-send="gmail">${MAIL_ICON} Gmail</button>
            <button type="button" class="btn btn-ghost" data-send="outlook">${MAIL_ICON} Outlook</button>
          </div>
          <p class="contact-book" id="contactBook" hidden>Prefer to pick a time? <a href="#" data-book>Book a 30-minute consultation &rarr;</a></p>
          <p class="contact-direct">Prefer to write directly? <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
        </form>
      </div>
    </div>
  `);

  const backdrop = document.getElementById('contactBackdrop');
  const form = document.getElementById('contactForm');
  const serviceSel = document.getElementById('cf-service');
  const errorEl = document.getElementById('contactError');
  const quoteBlock = document.getElementById('cfQuote');
  const quotePlanEl = document.getElementById('cfQuotePlan');
  const endpointsInput = document.getElementById('cf-endpoints');
  const estimateEl = document.getElementById('cfEstimate');
  const el = n => form.elements[n];

  let currentPlan = null;
  let lastFocused = null;
  const modalEl = backdrop.querySelector('.contact-modal');
  const money = x => '$' + Number(x).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function updateEstimate(){
    if (!currentPlan) return;
    const n = Math.max(0, parseInt(endpointsInput.value, 10) || 0);
    if (currentPlan.annual > 0){
      const annualTotal = n * currentPlan.annual;
      const monthlyTotal = currentPlan.monthly > 0 ? n * currentPlan.monthly : null;
      estimateEl.innerHTML =
        `<span class="cf-est-big">${money(annualTotal)}</span>` +
        `<span class="cf-est-unit">estimated per year</span>` +
        (monthlyTotal !== null ? `<span class="cf-est-sub">or about ${money(monthlyTotal)} per month</span>` : '') +
        `<span class="cf-est-fine">${n} endpoint${n === 1 ? '' : 's'} &times; $${currentPlan.annual} per device / year. Indicative only; we confirm the final figure in your quote.</span>`;
    } else {
      estimateEl.innerHTML = `<span class="cf-est-sub">This plan is quoted per fleet. Tell us your endpoint count and we will price it for you.</span>`;
    }
  }

  let services = [];
  try { services = await fetchJSON('data/services.json'); } catch (err){}
  serviceSel.innerHTML = `<option>General enquiry</option>` + services.map(s => `<option>${s.title}</option>`).join('');

  function open(service, plan, message){
    if (service){
      if (![...serviceSel.options].some(o => o.value === service)){
        serviceSel.insertAdjacentHTML('afterbegin', `<option>${service}</option>`);
      }
      serviceSel.value = service;
    } else {
      serviceSel.value = 'General enquiry';
    }
    currentPlan = (plan && plan.name) ? plan : null;
    if (currentPlan){
      quotePlanEl.textContent = `Selected plan: ${currentPlan.name}`;
      if (!endpointsInput.value) endpointsInput.value = 50;
      quoteBlock.hidden = false;
      updateEstimate();
    } else {
      quoteBlock.hidden = true;
    }
    if (message) el('message').value = message;
    errorEl.hidden = true;
    lastFocused = document.activeElement;
    backdrop.classList.add('open');
    document.body.classList.add('contact-lock');
    setTimeout(() => el('name').focus(), 80);
  }

  // programmatic API for other scripts (e.g. the Essential Eight assessment)
  window.ZW = window.ZW || {};
  window.ZW.openContact = (opts = {}) => open(opts.service || '', opts.plan || null, opts.message || '');
  function close(){
    backdrop.classList.remove('open');
    document.body.classList.remove('contact-lock');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  endpointsInput.addEventListener('input', updateEstimate);

  // focus trap while the modal is open
  modalEl.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const focusable = modalEl.querySelectorAll('button, [href], input, select, textarea');
    const list = [...focusable].filter(el => !el.disabled && el.offsetParent !== null);
    if (!list.length) return;
    const first = list[0], last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  });

  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-contact]');
    if (trigger){
      e.preventDefault();
      const plan = trigger.dataset.plan
        ? { name: trigger.dataset.plan, annual: parseFloat(trigger.dataset.annual) || 0, monthly: parseFloat(trigger.dataset.monthly) || 0 }
        : null;
      open(trigger.dataset.service || '', plan, trigger.dataset.message || '');
      return;
    }
    if (e.target === backdrop || e.target.closest('#contactClose')) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) close();
  });

  const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  form.querySelectorAll('[data-send]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = el('name').value.trim();
      const email = el('email').value.trim();
      const message = el('message').value.trim();
      if (!name || !validEmail(email) || !message){
        errorEl.textContent = 'Please add your name, a valid email, and a short message.';
        errorEl.hidden = false;
        return;
      }
      errorEl.hidden = true;
      const company = el('company').value.trim();
      const service = serviceSel.value;
      const subject = currentPlan
        ? `Quote request: ${currentPlan.name}`
        : ((service && service !== 'General enquiry') ? `Enquiry: ${service}` : 'General enquiry');
      const lines = [`Name: ${name}`, `Email: ${email}`];
      if (company) lines.push(`Company: ${company}`);
      lines.push(`Service of interest: ${service}`);
      if (currentPlan){
        const n = Math.max(0, parseInt(endpointsInput.value, 10) || 0);
        lines.push(`Plan: ${currentPlan.name}`, `Endpoints: ${n}`);
        if (currentPlan.annual > 0){
          lines.push(`Estimated annual: ${money(n * currentPlan.annual)} (indicative)`);
          if (currentPlan.monthly > 0) lines.push(`Estimated monthly: ${money(n * currentPlan.monthly)} (indicative)`);
        }
      }
      lines.push('', message);
      const body = lines.join('\r\n');
      const su = encodeURIComponent(subject);
      const bo = encodeURIComponent(body);
      const kind = btn.dataset.send;
      let url;
      if (kind === 'gmail'){
        url = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${su}&body=${bo}`;
      } else if (kind === 'outlook'){
        url = `https://outlook.office.com/mail/deeplink/compose?to=${CONTACT_EMAIL}&subject=${su}&body=${bo}`;
      } else {
        url = `mailto:${CONTACT_EMAIL}?subject=${su}&body=${bo}`;
      }
      if (kind === 'mail'){ window.location.href = url; }
      else { window.open(url, '_blank', 'noopener'); }
    });
  });
}

/* ===================== FAQ accordion ===================== */
function initFAQ(){
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(other => {
        other.classList.remove('open');
        const oq = other.querySelector('.faq-q');
        const oa = other.querySelector('.faq-a');
        if (oq) oq.setAttribute('aria-expanded', 'false');
        if (oa) oa.style.maxHeight = null;
      });
      if (!isOpen){
        item.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
}

/* ===================== Back to top ===================== */
function initBackToTop(){
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none"><path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  document.body.appendChild(btn);
  btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  let raf = null;
  const update = () => { raf = null; btn.classList.toggle('show', window.scrollY > 600); };
  window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive:true });
}

/* ===================== Scroll spy (active nav link) ===================== */
function initScrollSpy(){
  const map = [];
  document.querySelectorAll('.nav-links a[href*="#"]').forEach(a => {
    const hash = a.getAttribute('href').split('#')[1];
    if (!hash) return;
    const sec = document.getElementById(hash);
    if (sec) map.push({ a, sec });
  });
  if (!map.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        map.forEach(m => m.a.classList.toggle('active', m.sec === e.target));
      }
    });
  }, { rootMargin:'-45% 0px -50% 0px', threshold:0 });
  map.forEach(m => io.observe(m.sec));
}

/* ===================== Enterprise footer (shared) ===================== */
function renderFooter(){
  const existing = document.querySelector('footer.footer, footer.site-footer');
  const year = new Date().getFullYear();
  const html = `
    <div class="sf-inner">
      <div class="sf-brand">
        <a href="${BASE}index.html#home" class="nav-logo">
          <span class="logo-mark" aria-hidden="true"><img src="${BASE}assets/brand/logo.png" alt="" class="logo-img"></span>
          Zyberworks
        </a>
        <p>Secure by design. IT services and security consulting for organisations that cannot afford to get security wrong.</p>
        <div class="sf-contact">
          <a href="mailto:enquiry@zyberworks.com.au">enquiry@zyberworks.com.au</a><br>
          <a href="https://zyberworks.com.au" target="_blank" rel="noopener">zyberworks.com.au</a><br>
          Sydney, NSW &middot; Australia &amp; New Zealand<br>
          ABN 32 692 196 857
        </div>
      </div>
      <div class="sf-col">
        <h4>Services</h4>
        <ul>
          <li><a href="${BASE}services/pentest.html">Penetration Testing</a></li>
          <li><a href="${BASE}services/edr-mdr.html">EDR &amp; MDR</a></li>
          <li><a href="${BASE}services/filtering.html">Web Filtering</a></li>
          <li><a href="${BASE}services/cloud.html">Cloud &amp; Migration</a></li>
          <li><a href="${BASE}services.html">All services</a></li>
        </ul>
      </div>
      <div class="sf-col">
        <h4>Company</h4>
        <ul>
          <li><a href="${BASE}about.html">About us</a></li>
          <li><a href="${BASE}frameworks.html">Frameworks</a></li>
          <li><a href="${BASE}partners.html">Partners</a></li>
          <li><a href="${BASE}about.html#faq">FAQ</a></li>
        </ul>
      </div>
      <div class="sf-col">
        <h4>Get started</h4>
        <ul>
          <li><a href="#" data-contact>Contact us</a></li>
          <li><a href="${BASE}essential-eight-assessment.html">E8 self-assessment</a></li>
          <li><a href="${BASE}privacy.html">Privacy</a></li>
          <li><a href="${BASE}terms.html">Terms</a></li>
        </ul>
      </div>
    </div>
    <div class="sf-bottom">
      <div class="sf-bottom-inner">
        <p>© ${year} Zyberworks. All rights reserved.</p>
        <div class="sf-legal">
          <a href="${BASE}privacy.html">Privacy Policy</a>
          <a href="${BASE}terms.html">Terms of Use</a>
        </div>
      </div>
    </div>
  `;
  if (existing){
    existing.className = 'site-footer';
    existing.innerHTML = html;
  } else {
    const f = document.createElement('footer');
    f.className = 'site-footer';
    f.innerHTML = html;
    document.body.appendChild(f);
  }
}

/* ===================== Booking (config-driven; falls back to contact form) ===================== */
function initBooking(){
  const configured = !!BOOKING_URL;
  const isCalendly = configured && /calendly\.com/i.test(BOOKING_URL);

  // Reveal any booking-specific CTAs only when a link is configured.
  document.querySelectorAll('[data-book-cta]').forEach(el => { el.hidden = !configured; });
  const bookLine = document.getElementById('contactBook');
  if (bookLine) bookLine.hidden = !configured;

  if (isCalendly){
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(css);
    const js = document.createElement('script');
    js.src = 'https://assets.calendly.com/assets/external/widget.js';
    js.async = true;
    document.head.appendChild(js);
  }

  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-book]');
    if (!trigger) return;
    e.preventDefault();
    if (!configured){
      if (window.ZW && window.ZW.openContact) window.ZW.openContact({});
      return;
    }
    if (isCalendly && window.Calendly && typeof window.Calendly.initPopupWidget === 'function'){
      window.Calendly.initPopupWidget({ url: BOOKING_URL });
    } else {
      window.open(BOOKING_URL, '_blank', 'noopener');
    }
  });
}

/* ===================== Service worker (offline + fast repeat loads) ===================== */
function initServiceWorker(){
  if (!('serviceWorker' in navigator)) return;
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(BASE + 'sw.js').catch(() => {});
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCursorGlow();
  initParallax();
  initScrollProgress();
  initCountUp();
  initGlass();
  initContact();
  initFAQ();
  initBackToTop();
  initScrollSpy();
  renderFooter();
  initBooking();
  initServiceWorker();
  observeReveal();
});
