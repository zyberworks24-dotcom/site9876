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

/* ===================== Nav (scroll shrink + mobile burger) ===================== */
function initNav(){
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive:true });
  nav.classList.toggle('scrolled', window.scrollY > 12);
  if (burger){
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('.nav-mobile a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
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
  const sel = '.card, .partner-card, .sp-process-step, .sp-faq, .sp-deliverable-box, .stat, .cta-card, .sp-partner';
  document.addEventListener('mousemove', e => {
    const el = e.target.closest(sel);
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  }, { passive:true });
}

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
          <div class="field"><label for="cf-message">Message</label><textarea id="cf-message" name="message" rows="4" required></textarea></div>
          <p class="contact-error" id="contactError" hidden></p>
          <p class="contact-send-label">Choose how to send your enquiry:</p>
          <div class="contact-actions">
            <button type="button" class="btn btn-primary" data-send="mail">${MAIL_ICON} Email app</button>
            <button type="button" class="btn btn-ghost" data-send="gmail">${MAIL_ICON} Gmail</button>
            <button type="button" class="btn btn-ghost" data-send="outlook">${MAIL_ICON} Outlook</button>
          </div>
          <p class="contact-direct">Prefer to write directly? <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
        </form>
      </div>
    </div>
  `);

  const backdrop = document.getElementById('contactBackdrop');
  const form = document.getElementById('contactForm');
  const serviceSel = document.getElementById('cf-service');
  const errorEl = document.getElementById('contactError');
  const el = n => form.elements[n];

  let services = [];
  try { services = await fetchJSON('data/services.json'); } catch (err){}
  serviceSel.innerHTML = `<option>General enquiry</option>` + services.map(s => `<option>${s.title}</option>`).join('');

  function open(service){
    if (service){
      if (![...serviceSel.options].some(o => o.value === service)){
        serviceSel.insertAdjacentHTML('afterbegin', `<option>${service}</option>`);
      }
      serviceSel.value = service;
    } else {
      serviceSel.value = 'General enquiry';
    }
    errorEl.hidden = true;
    backdrop.classList.add('open');
    document.body.classList.add('contact-lock');
    setTimeout(() => el('name').focus(), 80);
  }
  function close(){
    backdrop.classList.remove('open');
    document.body.classList.remove('contact-lock');
  }

  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-contact]');
    if (trigger){ e.preventDefault(); open(trigger.dataset.service || ''); return; }
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
      const subject = (service && service !== 'General enquiry') ? `Enquiry: ${service}` : 'General enquiry';
      const lines = [`Name: ${name}`, `Email: ${email}`];
      if (company) lines.push(`Company: ${company}`);
      lines.push(`Service of interest: ${service}`, '', message);
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

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCursorGlow();
  initParallax();
  initScrollProgress();
  initCountUp();
  initGlass();
  initContact();
  observeReveal();
});
