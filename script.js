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
};

/* ===================== Service data ===================== */
const SERVICES = [
  {
    id:'pentest', cat:'security', icon:'pentest',
    title:'Penetration Testing',
    tagline:'Comprehensive testing across web apps, APIs, cloud environments, and internal networks.',
    blurb:'We test the way an actual attacker would — chaining small weaknesses into real impact, not just running a scanner and handing you the output.',
    points:[
      {h:'Web application & API testing', t:'OWASP-aligned methodology covering authentication, session management, business logic abuse, and injection classes.'},
      {h:'Internal & external network assessments', t:'Simulated attack paths from perimeter access through to domain compromise, scoped to your environment.'},
      {h:'Cloud configuration review', t:'Azure, AWS, and Microsoft 365 identity, storage, and access-control misconfigurations that scanners miss.'},
      {h:'Social engineering', t:'Phishing simulations and physical access testing to validate your human and facility controls.'},
    ],
    deliverable:'A report an engineer can action and an executive can read — CVSS-rated findings, proof of exploitation, and prioritised remediation.'
  },
  {
    id:'iso-nist', cat:'security', icon:'iso',
    title:'ISO 27001 & NIST CSF 2.0',
    tagline:'Mapping ISO 27001 Annex A controls to NIST CSF functions.',
    blurb:'One control, assessed once, reported against every framework you need to satisfy — board, insurer, regulator, and customer due-diligence questionnaires.',
    points:[
      {h:'Gap analysis', t:'Current-state assessment against every Annex A control, scored and prioritised by risk.'},
      {h:'Cross-framework mapping', t:'Your controls translated across Identify, Protect, Detect, Respond, Recover, and Govern.'},
      {h:'ISMS documentation', t:'Policies, procedures, and risk registers built to survive a real audit — not shelfware.'},
      {h:'Certification readiness', t:'Internal audit runs and stage 1/2 preparation ahead of your certification body visit.'},
    ],
    deliverable:'A live control matrix mapping ISO 27001 to NIST CSF 2.0, plus an ISMS ready for external audit.'
  },
  {
    id:'e8', cat:'security', icon:'e8',
    title:'ASD Essential Eight',
    tagline:'Mitigation strategies to strengthen your cyber posture.',
    blurb:'The Australian Signals Directorate baseline, implemented properly — not just scored on a spreadsheet once a year.',
    points:[
      {h:'Maturity assessment', t:'Scored against all eight strategies — application control, patching, macro settings, MFA, admin privilege restriction, and more.'},
      {h:'Uplift roadmap', t:'A sequenced plan from your current maturity level to the target level your risk appetite requires.'},
      {h:'Implementation support', t:'Hands-on delivery of patch management, application allow-listing, and privileged access controls.'},
      {h:'Ongoing reporting', t:'Maturity trend reporting formatted for leadership, audit, and government reporting obligations.'},
    ],
    deliverable:'A maturity scorecard against all eight strategies and a funded, sequenced uplift plan.'
  },
  {
    id:'infra-mgmt', cat:'infra', icon:'infra',
    title:'IT Infrastructure Management',
    tagline:'End-to-end management of on-prem and cloud infrastructure.',
    blurb:'One team accountable for servers, storage, and virtualisation — wherever they physically live.',
    points:[
      {h:'Servers, storage & virtualisation', t:'Day-to-day operation and lifecycle management of your compute and storage estate.'},
      {h:'Hybrid integration', t:'Consistent identity, backup, and monitoring across on-prem and cloud, not two separate worlds.'},
      {h:'Capacity planning', t:'Performance tuning and forward capacity planning so growth doesn’t become an outage.'},
      {h:'Patch, backup & DR', t:'Scheduled patching, verified backups, and disaster recovery runbooks that are actually tested.'},
    ],
    deliverable:'A managed infrastructure environment with documented runbooks, backup verification, and DR test results.'
  },
  {
    id:'managed-support', cat:'strategy', icon:'support',
    title:'Managed IT Support',
    tagline:'Proactive monitoring and support for servers, users, and applications.',
    blurb:'Support that catches the problem before your staff notice it, backed by response times you can hold us to.',
    points:[
      {h:'24/7 monitoring & alerting', t:'Continuous visibility across servers, endpoints, and critical applications.'},
      {h:'Help desk & end-user support', t:'Responsive, friendly support for the people actually using the systems.'},
      {h:'SLA-backed response', t:'Defined priority tiers and response times, reported against every month.'},
      {h:'Asset & license management', t:'A single source of truth for what you own, what’s deployed, and what’s about to expire.'},
    ],
    deliverable:'A monitored environment with a documented SLA and monthly service reporting.'
  },
  {
    id:'project-consulting', cat:'strategy', icon:'project',
    title:'IT Project Consulting',
    tagline:'Designing and executing IT transformation projects.',
    blurb:'Vendor-neutral advice from scoping through to go-live — we design the outcome you need, not the product we’d like to sell you.',
    points:[
      {h:'Scoping & business case', t:'Clear roadmaps and business cases that survive budget scrutiny.'},
      {h:'Vendor-neutral design', t:'Technical architecture built around your requirements, not a reseller margin.'},
      {h:'Delivery management', t:'Structured change control and milestone tracking through to completion.'},
      {h:'Post-implementation review', t:'A formal handover and lessons-learned review, not a project that just fades out.'},
    ],
    deliverable:'A signed-off project plan, delivery tracking, and a documented handover pack.'
  },
  {
    id:'device-mgmt', cat:'infra', icon:'device',
    title:'Device Management',
    tagline:'Lifecycle management for corporate and BYOD devices.',
    blurb:'Every device provisioned, patched, and retired the same way, whether it’s corporate-owned or BYOD.',
    points:[
      {h:'MDM/UEM deployment', t:'Platforms like Intune or Jamf, configured to your policy — not left on defaults.'},
      {h:'Provisioning & enrolment', t:'Zero-touch imaging and enrolment so new starters are productive on day one.'},
      {h:'Compliance & patching', t:'Continuous configuration and patch compliance across the fleet.'},
      {h:'Secure decommissioning', t:'Certified data wipe and asset disposal at end-of-life.'},
    ],
    deliverable:'A managed device fleet with enforced compliance policy and an auditable decommissioning trail.'
  },
  {
    id:'device-security', cat:'security', icon:'devsec',
    title:'Managed Security on Devices',
    tagline:'Protection for PCs, mobile devices, and EFTPOS terminals.',
    blurb:'Endpoint protection that covers the whole fleet — including the payment terminals most IT teams forget about.',
    points:[
      {h:'Endpoint detection & response', t:'EDR tuned to your environment, not left on noisy factory defaults.'},
      {h:'Mobile threat defense', t:'Protection and policy enforcement for the phones and tablets in the field.'},
      {h:'EFTPOS terminal hardening', t:'PCI-aligned configuration and monitoring for point-of-sale hardware.'},
      {h:'Centralised policy & reporting', t:'One console, one policy set, one report — across every device type.'},
    ],
    deliverable:'A single-pane endpoint security posture across PCs, mobile, and payment terminals.'
  },
  {
    id:'infra-consulting', cat:'infra', icon:'gauge',
    title:'Infrastructure Consulting',
    tagline:'Modernize and optimize IT infrastructure for performance and resilience.',
    blurb:'An honest read on where your infrastructure is holding you back, and a roadmap that doesn’t assume an unlimited budget.',
    points:[
      {h:'Architecture review', t:'A modernisation roadmap grounded in your actual growth and risk profile.'},
      {h:'Resilience design', t:'Redundancy planning that matches recovery objectives to what the business actually needs.'},
      {h:'Cost & performance optimisation', t:'Right-sizing infrastructure spend against real utilisation, not sticker price.'},
      {h:'Technology refresh planning', t:'A staged refresh plan that avoids a cliff-edge of simultaneous end-of-life hardware.'},
    ],
    deliverable:'An infrastructure roadmap with a prioritised, costed sequence of initiatives.'
  },
  {
    id:'product-consulting', cat:'strategy', icon:'product',
    title:'Product Consulting',
    tagline:'Advice on IT product selection and implementation.',
    blurb:'Independent evaluation before you sign a contract you’ll be living with for years.',
    points:[
      {h:'Vendor & product evaluation', t:'Structured comparison against your actual requirements, not vendor marketing.'},
      {h:'Proof-of-concept design', t:'A test plan that surfaces real limitations before purchase, not after.'},
      {h:'Licensing & cost modelling', t:'True total cost of ownership, including the renewal terms nobody reads.'},
      {h:'Implementation oversight', t:'Hands-on oversight through rollout so the selected product actually lands as promised.'},
    ],
    deliverable:'An evaluation matrix, a costed recommendation, and implementation oversight through go-live.'
  },
  {
    id:'cloud', cat:'infra', icon:'cloud',
    title:'Cloud Strategy & Migration',
    tagline:'Plan and execute cloud migration while optimizing costs and security.',
    blurb:'Migration planned around your workloads and risk tolerance — lift-and-shift where it’s right, re-architected where it isn’t.',
    points:[
      {h:'Cloud readiness assessment', t:'Workload-by-workload analysis of what’s ready to move and what needs remediation first.'},
      {h:'Migration planning', t:'Lift-and-shift, replatform, or refactor — matched to each workload, not a one-size approach.'},
      {h:'Cloud security & identity', t:'Identity architecture and security baselines built in from the first workload, not bolted on after.'},
      {h:'Post-migration cost optimisation', t:'FinOps discipline that keeps your cloud bill matched to actual usage.'},
    ],
    deliverable:'A migration plan by workload, a secure landing zone, and ongoing cost governance.'
  },
  {
    id:'audits', cat:'security', icon:'audit',
    title:'Cybersecurity Audits',
    tagline:'Identify vulnerabilities and ensure compliance.',
    blurb:'A structured, evidence-based view of where you actually stand — separate from whoever built the environment.',
    points:[
      {h:'Technical control audits', t:'Independent verification that your controls work the way you think they do.'},
      {h:'Policy & process review', t:'Assessment of whether documented process matches what actually happens.'},
      {h:'Compliance gap reporting', t:'Findings mapped against the specific standards and obligations that apply to you.'},
      {h:'Risk register development', t:'A living risk register your leadership team can actually use to prioritise investment.'},
    ],
    deliverable:'An evidence-based audit report with a prioritised risk register and remediation timeline.'
  },
  {
    id:'network', cat:'infra', icon:'network',
    title:'Network Design & Monitoring',
    tagline:'Secure, high-performance networks with 24/7 monitoring.',
    blurb:'Networks designed for segmentation and visibility first, throughput second — you need both, in that order.',
    points:[
      {h:'Architecture & segmentation', t:'Zone-based design that contains an incident instead of letting it spread.'},
      {h:'Firewall & zero-trust', t:'Policy-based access control built around identity, not just IP address.'},
      {h:'24/7 monitoring', t:'Continuous anomaly detection with alerting that reaches a human, fast.'},
      {h:'Performance optimisation', t:'Bandwidth planning and tuning so security controls don’t become the bottleneck.'},
    ],
    deliverable:'A segmented network design, deployed monitoring, and documented incident escalation paths.'
  },
  {
    id:'software-deploy', cat:'strategy', icon:'software',
    title:'Software Deployment',
    tagline:'ERP, CRM, and internal tool rollouts.',
    blurb:'Rollouts planned around adoption, not just installation — the software only pays off if people actually use it.',
    points:[
      {h:'Requirements & solution design', t:'Configuration mapped to how your teams actually work, not the vendor’s default workflow.'},
      {h:'Deployment & integration', t:'Managed rollout with integration into your existing systems, not an isolated silo.'},
      {h:'Data migration & testing', t:'Verified data migration with structured user-acceptance testing before cutover.'},
      {h:'Training & adoption', t:'Hands-on training so the new system is actually used the way it was designed.'},
    ],
    deliverable:'A deployed, integrated system with verified data migration and a trained user base.'
  },
  {
    id:'vendor', cat:'strategy', icon:'vendor',
    title:'Vendor Management',
    tagline:'Manage third-party IT vendors and contracts.',
    blurb:'One accountable point of contact across every vendor in your stack, so nothing falls between contracts.',
    points:[
      {h:'Performance & SLA tracking', t:'Vendors held to the commitments in their contract, tracked and reported.'},
      {h:'Contract negotiation support', t:'Commercial and technical input at renewal, before you’re locked in again.'},
      {h:'Consolidation & cost review', t:'Overlap and redundant spend identified across your vendor portfolio.'},
      {h:'Third-party risk assessment', t:'Security and continuity risk assessed for every vendor with access to your environment.'},
    ],
    deliverable:'A vendor scorecard, consolidated contract calendar, and third-party risk register.'
  },
];

const CATEGORY_LABEL = { security:'Security & Compliance', infra:'Infrastructure & Cloud', strategy:'Strategy & Support' };
const CHECK_SVG = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5 9.5 17 19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ARROW_SVG = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* ===================== Render grid ===================== */
const grid = document.getElementById('serviceGrid');
SERVICES.forEach((s, i) => {
  const card = document.createElement('button');
  card.className = 'card';
  card.type = 'button';
  card.dataset.cat = s.cat;
  card.dataset.id = s.id;
  card.style.transitionDelay = (i % 8) * 35 + 'ms';
  card.innerHTML = `
    <div class="card-icon">${ICONS[s.icon]}</div>
    <h3>${s.title}</h3>
    <p>${s.tagline}</p>
    <div class="card-arrow">Learn more ${ARROW_SVG}</div>
  `;
  card.addEventListener('click', () => openModal(s));
  grid.appendChild(card);
});

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.querySelectorAll('.card').forEach(c => c.classList.add('shown'));
  });
});

/* ===================== Tabs / filter ===================== */
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    document.querySelectorAll('.card').forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('filtered-out', !match);
    });
  });
});

/* ===================== Modal ===================== */
const backdrop = document.getElementById('modalBackdrop');
const modalIcon = document.getElementById('modalIcon');
const modalCategory = document.getElementById('modalCategory');
const modalTitle = document.getElementById('modalTitle');
const modalTagline = document.getElementById('modalTagline');
const modalBlurb = document.getElementById('modalBlurb');
const modalPoints = document.getElementById('modalPoints');
const modalDeliverable = document.getElementById('modalDeliverable');
let lastFocused = null;

function openModal(s){
  lastFocused = document.activeElement;
  modalIcon.innerHTML = ICONS[s.icon];
  modalCategory.textContent = CATEGORY_LABEL[s.cat].toUpperCase();
  modalTitle.textContent = s.title;
  modalTagline.textContent = s.tagline;
  modalBlurb.textContent = s.blurb;
  modalPoints.innerHTML = s.points.map(p => `
    <div class="modal-point">
      <span class="modal-point-icon">${CHECK_SVG}</span>
      <div><h4>${p.h}</h4><p>${p.t}</p></div>
    </div>
  `).join('');
  modalDeliverable.innerHTML = `<strong>What you receive: </strong>${s.deliverable}`;
  backdrop.classList.add('open');
  document.body.classList.add('modal-lock');
  backdrop.scrollTop = 0;
}
function closeModal(){
  backdrop.classList.remove('open');
  document.body.classList.remove('modal-lock');
  if (lastFocused) lastFocused.focus();
}
document.getElementById('modalClose').addEventListener('click', closeModal);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && backdrop.classList.contains('open')) closeModal(); });

/* ===================== Venn / frameworks ===================== */
const vennCircles = document.querySelectorAll('.venn-circle');
const fwDetails = document.querySelectorAll('.fw-detail');
vennCircles.forEach(c => {
  c.addEventListener('click', () => {
    vennCircles.forEach(v => v.classList.remove('active'));
    fwDetails.forEach(d => d.classList.remove('active'));
    c.classList.add('active');
    document.querySelector(`.fw-detail[data-fw="${c.dataset.fw}"]`).classList.add('active');
  });
});

/* ===================== Nav scroll & mobile ===================== */
const nav = document.getElementById('nav');
const burger = document.getElementById('navBurger');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 12);
}, { passive:true });
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav-mobile a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

/* ===================== Hero word reveal ===================== */
requestAnimationFrame(() => {
  document.querySelector('.hero-title').classList.add('animate');
});

/* ===================== Cursor glow (hero only) ===================== */
const glow = document.getElementById('cursorGlow');
const heroEl = document.querySelector('.hero');
let glowRAF = null;
function moveGlow(x, y){
  if (glowRAF) return;
  glowRAF = requestAnimationFrame(() => {
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';
    glowRAF = null;
  });
}
heroEl.addEventListener('mousemove', e => { glow.classList.add('active'); moveGlow(e.clientX, e.clientY); });
heroEl.addEventListener('mouseleave', () => glow.classList.remove('active'));

/* ===================== Parallax blobs ===================== */
const blobs = document.querySelectorAll('.blob');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > window.innerHeight * 1.2) return;
  blobs.forEach((b, i) => {
    b.style.transform = `translateY(${y * (0.08 + i * 0.05)}px)`;
  });
}, { passive:true });

/* ===================== Scroll reveal ===================== */
const revealEls = document.querySelectorAll('.reveal, .reveal-lines');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold:0.15, rootMargin:'0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));
