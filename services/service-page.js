const PROCESS_BY_CATEGORY = {
  security: [
    { h:'Scope & threat model', t:'Define target systems, rules of engagement, and what "success" looks like from an attacker’s perspective.' },
    { h:'Assess', t:'Hands-on testing, control review, or audit work carried out against the agreed scope.' },
    { h:'Validate & prioritise', t:'Findings confirmed, false positives removed, and risk ranked by real-world impact.' },
    { h:'Report & remediate', t:'A clear report plus support closing the highest-priority gaps first.' },
  ],
  infra: [
    { h:'Discover', t:'Audit the current environment, dependencies, and constraints.' },
    { h:'Design', t:'Target architecture matched to your risk appetite and budget.' },
    { h:'Implement', t:'Staged delivery with rollback points, not a big-bang cutover.' },
    { h:'Operate & optimise', t:'Ongoing monitoring, tuning, and a documented runbook.' },
  ],
  strategy: [
    { h:'Understand', t:'Stakeholder interviews and current-state mapping.' },
    { h:'Plan', t:'A scoped roadmap with milestones and a business case.' },
    { h:'Deliver', t:'Managed execution with regular checkpoints.' },
    { h:'Handover', t:'Documentation, training, and a clean transition to business-as-usual.' },
  ],
};

async function renderServicePage(){
  const root = document.getElementById('servicePageRoot');
  const id = document.body.dataset.service;
  let services;
  try {
    services = await fetchJSON('data/services.json');
  } catch (err){
    root.innerHTML = `<div class="sp-error"><p>Couldn't load this page's content. <a href="../index.html">Return home</a>.</p></div>`;
    return;
  }
  const svc = services.find(s => s.id === id);
  if (!svc){
    root.innerHTML = `<div class="sp-error"><p>Service not found. <a href="../index.html">Return home</a>.</p></div>`;
    return;
  }

  document.title = `${svc.title} — Zyberworks`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', svc.tagline);

  const process = PROCESS_BY_CATEGORY[svc.cat] || PROCESS_BY_CATEGORY.strategy;
  const related = services.filter(s => s.cat === svc.cat && s.id !== svc.id).slice(0, 3);

  root.innerHTML = `
    <section class="sp-hero">
      <div class="sp-hero-mesh" aria-hidden="true"><div class="blob blob-a"></div><div class="blob blob-b"></div></div>
      <nav class="sp-breadcrumb reveal" aria-label="Breadcrumb">
        <a href="../index.html">Home</a>
        <span>/</span>
        <a href="../index.html#services">Services</a>
        <span>/</span>
        <span aria-current="page">${svc.title}</span>
      </nav>
      <div class="sp-hero-content reveal">
        <div class="sp-icon">${ICONS[svc.icon] || ''}</div>
        <p class="sp-category">${CATEGORY_LABEL[svc.cat].toUpperCase()}</p>
        <h1>${svc.title}</h1>
        <p class="sp-tagline">${svc.tagline}</p>
      </div>
    </section>

    <section class="sp-section reveal">
      <p class="sp-intro">${svc.blurb}</p>
    </section>

    <section class="sp-section">
      <h2 class="sp-h2 reveal">How it works</h2>
      <div class="sp-process">
        ${process.map((p, i) => `
          <div class="sp-process-step reveal" style="transition-delay:${i * 80}ms">
            <span class="sp-process-num">0${i + 1}</span>
            <h3>${p.h}</h3>
            <p>${p.t}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="sp-section">
      <h2 class="sp-h2 reveal">What's included</h2>
      <div class="sp-points">
        ${svc.points.map((p, i) => `
          <div class="sp-point reveal" style="transition-delay:${i * 70}ms">
            <span class="sp-point-icon">${CHECK_SVG}</span>
            <div><h3>${p.h}</h3><p>${p.t}</p></div>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="sp-section sp-split">
      <div class="reveal">
        <h2 class="sp-h2">Ideal for</h2>
        <div class="sp-tags">
          ${svc.idealFor.map(tag => `<span class="sp-tag">${tag}</span>`).join('')}
        </div>
      </div>
      <div class="sp-deliverable-box reveal">
        <p class="sp-deliverable-label">What you receive</p>
        <p>${svc.deliverable}</p>
      </div>
    </section>

    ${related.length ? `
    <section class="sp-section">
      <h2 class="sp-h2 reveal">Related services</h2>
      <div class="grid">
        ${related.map(r => `
          <a class="card reveal" href="${r.id}.html">
            <div class="card-icon">${ICONS[r.icon] || ''}</div>
            <h3>${r.title}</h3>
            <p>${r.tagline}</p>
            <div class="card-arrow">Learn more ${ARROW_SVG}</div>
          </a>
        `).join('')}
      </div>
    </section>` : ''}

    <section class="cta reveal">
      <div class="cta-card">
        <h2>Let's talk ${svc.title.toLowerCase()}.</h2>
        <p>Tell us where you're starting from — we'll bring a tailored approach, not a template.</p>
        <a href="https://zyberworks.com.au/#services" target="_blank" rel="noopener" class="btn btn-primary btn-lg">Visit zyberworks.com.au</a>
      </div>
    </section>
  `;

  observeReveal(root);
}

document.addEventListener('DOMContentLoaded', renderServicePage);
