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
    card.href = `services/${s.id}.html`;
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

  const renderItem = c => {
    const inner = c.logo
      ? `<img src="${BASE}assets/clients/${c.logo}" alt="${c.name} logo" loading="lazy">`
      : `<span class="client-initial">${c.name.charAt(0)}</span>`;
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
      ? `<a class="partner-link" href="services/${p.service}.html">See the solution ${ARROW_SVG}</a>`
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
function initVenn(){
  const vennCircles = document.querySelectorAll('.venn-circle');
  const fwDetails = document.querySelectorAll('.fw-detail');
  vennCircles.forEach(c => {
    c.addEventListener('click', () => {
      vennCircles.forEach(v => v.classList.remove('active'));
      fwDetails.forEach(d => d.classList.remove('active'));
      c.classList.add('active');
      const match = document.querySelector(`.fw-detail[data-fw="${c.dataset.fw}"]`);
      if (match) match.classList.add('active');
    });
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
  initHero();
});
