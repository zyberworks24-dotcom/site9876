/* ===================== Services grid ===================== */
async function initServices(){
  const grid = document.getElementById('serviceGrid');
  if (!grid) return;
  let services = [];
  try {
    services = await fetchJSON('data/services.json');
  } catch (err){
    grid.innerHTML = `<p class="section-sub">Couldn't load services right now. Please refresh the page.</p>`;
    return;
  }

  services.forEach((s, i) => {
    const card = document.createElement('a');
    card.className = 'card';
    card.href = `services/${s.id}`;
    card.dataset.cat = s.cat;
    card.dataset.id = s.id;
    card.style.transitionDelay = (i % 8) * 35 + 'ms';
    card.innerHTML = `
      <div class="card-icon">${ICONS[s.icon] || ''}</div>
      <h3>${s.title}</h3>
      <p>${s.tagline}</p>
      <div class="card-arrow">Learn more ${ARROW_SVG}</div>
    `;
    grid.appendChild(card);
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.card').forEach(c => c.classList.add('shown'));
    });
  });

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
}

/* ===================== Happy clients carousel ===================== */
async function initClients(){
  const section = document.getElementById('clients');
  const track = document.getElementById('clientsTrack');
  if (!section || !track) return;
  let clients = [];
  try {
    clients = await fetchJSON('data/clients.json');
  } catch (err){
    clients = [];
  }

  if (!clients.length){
    section.classList.add('clients-empty');
    track.innerHTML = `
      <div class="clients-placeholder">
        <p>Client logos land here as soon as they're added.</p>
        <p class="clients-placeholder-sub">See <code>data/clients.json</code> in the repo to add the first one.</p>
      </div>
    `;
    return;
  }

  const GENERIC = new Set(['catholic','primary','central','school','college','high','senior','academy','the','of','and','st','saint']);
  const initials = name => {
    const words = name.replace(/[()'’.]/g, '').split(/\s+/).filter(Boolean);
    const sig = words.filter(w => !GENERIC.has(w.toLowerCase()));
    const use = sig.length ? sig : words;
    const a = use[0] ? use[0][0] : '';
    const b = use.length > 1 ? use[use.length - 1][0] : '';
    return (a + b).toUpperCase() || '?';
  };
  const renderItem = c => {
    const inner = c.logo
      ? `<img src="${BASE}assets/clients/${c.logo}" alt="${c.name} logo" loading="lazy">`
      : `<span class="client-initial">${initials(c.name)}</span>`;
    const body = `<div class="client-logo-circle">${inner}</div><span class="client-name">${c.name}</span>`;
    return c.url
      ? `<a class="client-item" href="${c.url}" target="_blank" rel="noopener">${body}</a>`
      : `<div class="client-item">${body}</div>`;
  };

  // duplicate the list for a seamless marquee loop
  const items = clients.map(renderItem).join('');
  track.innerHTML = items + items;
}

/* ===================== Technology partners ===================== */
async function initPartners(){
  const grid = document.getElementById('partnersGrid');
  if (!grid) return;
  let partners = [];
  try {
    partners = await fetchJSON('data/partners.json');
  } catch (err){
    partners = [];
  }
  if (!partners.length){ grid.closest('.partners').hidden = true; return; }

  grid.innerHTML = partners.map((p, i) => {
    const logo = p.logo
      ? `<img src="${BASE}assets/partners/${p.logo}" alt="${p.name} logo" loading="lazy">`
      : `<span class="partner-wordmark">${p.name}</span>`;
    const link = p.service
      ? `<a class="partner-link" href="services/${p.service}">See the solution ${ARROW_SVG}</a>`
      : '';
    const visit = p.url
      ? `<a class="partner-visit" href="${p.url}" target="_blank" rel="noopener">Visit ${p.name} ${ARROW_SVG}</a>`
      : '';
    const dir = i % 2 === 0 ? 'reveal-left' : 'reveal-right';
    return `
      <div class="partner-card ${dir}" style="transition-delay:${i * 90}ms">
        <div class="partner-logo">${logo}</div>
        <p class="partner-tag">${p.tag || ''}</p>
        <p class="partner-blurb">${p.blurb || ''}</p>
        <div class="partner-actions">${link}${visit}</div>
      </div>
    `;
  }).join('');

  observeReveal(grid);
}

/* ===================== Venn / frameworks ===================== */
async function initVenn(){
  const nodes = document.querySelectorAll('.fw-core-node');
  const fwDetails = document.querySelectorAll('.fw-detail');
  nodes.forEach(c => {
    c.addEventListener('click', () => {
      nodes.forEach(v => v.classList.remove('active'));
      fwDetails.forEach(d => d.classList.remove('active'));
      c.classList.add('active');
      const match = document.querySelector(`.fw-detail[data-fw="${c.dataset.fw}"]`);
      if (match) match.classList.add('active');
    });
  });

  // Fill the surrounding cloud with every other framework we map across
  const cloud = document.getElementById('fwCloud');
  if (!cloud) return;
  try {
    const fw = await fetchJSON('data/frameworks.json');
    const core = new Set(['ISO/IEC 27001', 'NIST CSF 2.0', 'ASD Essential Eight']);
    const rest = fw.filter(f => !core.has(f.name));
    cloud.innerHTML = rest.map(f => `<span class="fw-chip">${f.name}</span>`).join('');
    const label = document.getElementById('fwCloudLabel');
    if (label) label.textContent = `and ${rest.length} more we map across`;
  } catch (e){ /* leave cloud empty on failure */ }
}

/* ===================== Frameworks library ===================== */
async function initFrameworksLibrary(){
  const grid = document.getElementById('fwLibraryGrid');
  if (!grid) return;
  let frameworks = [];
  try {
    frameworks = await fetchJSON('data/frameworks.json');
  } catch (err){
    grid.innerHTML = `<p class="section-sub">Couldn't load the frameworks list right now. Please refresh the page.</p>`;
    return;
  }

  grid.innerHTML = frameworks.map(f => `
    <div class="fw-item" data-group="${f.group}">
      <div class="fw-item-head">
        <h3>${f.name}${f.abbr ? ` <span class="fw-abbr">${f.abbr}</span>` : ''}</h3>
        <span class="fw-badge">${f.region}</span>
      </div>
      <p class="fw-sum">${f.summary}</p>
      ${f.applies ? `<p class="fw-applies"><span>Best for</span> ${f.applies}</p>` : ''}
    </div>
  `).join('');

  const tabs = document.querySelectorAll('#fwTabs .tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      grid.querySelectorAll('.fw-item').forEach(item => {
        item.classList.toggle('filtered-out', !(filter === 'all' || item.dataset.group === filter));
      });
    });
  });

  observeReveal(grid);
}

/* ===================== Homepage tools showcase ===================== */
async function initHomeTools(){
  const grid = document.getElementById('homeToolsGrid');
  if (!grid) return;
  let tools = [];
  try { tools = await fetchJSON('data/tools.json'); } catch (err){ grid.closest('#tools').hidden = true; return; }
  tools.slice(0, 4).forEach((t, i) => {
    const card = document.createElement('a');
    card.className = 'card shown';
    card.href = t.url;
    card.style.transitionDelay = (i * 40) + 'ms';
    card.innerHTML = `
      <div class="card-icon">${ICONS[t.icon] || ARROW_SVG}</div>
      <h3>${t.title}</h3>
      <p>${t.blurb}</p>
      <div class="card-arrow">${t.tag || 'Open'} ${ARROW_SVG}</div>
    `;
    grid.appendChild(card);
  });
}

/* ===================== Hero word reveal ===================== */
function initHero(){
  const title = document.querySelector('.hero-title');
  if (!title) return;
  requestAnimationFrame(() => title.classList.add('animate'));
}

document.addEventListener('DOMContentLoaded', () => {
  initServices();
  initClients();
  initPartners();
  initVenn();
  initFrameworksLibrary();
  initHomeTools();
  initHero();
});
