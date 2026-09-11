/* Renders the tools and assessments grids on the hub page. */
const HUB_ARROW = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const GAUGE_ICON = `<svg viewBox="0 0 24 24" fill="none"><path d="M4 16a8 8 0 0 1 16 0" stroke="currentColor" stroke-width="1.5"/><path d="M12 16 16 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="16" r="1.4" fill="currentColor"/></svg>`;

async function renderInto(gridId, path, mapCard){
  const grid = document.getElementById(gridId);
  if (!grid) return;
  let list = [];
  try { list = await fetchJSON(path); } catch (err){
    grid.innerHTML = `<p class="section-sub">Couldn't load this list right now. Please refresh the page.</p>`;
    return;
  }
  grid.innerHTML = list.map(mapCard).join('');
}

async function initHub(){
  await renderInto('toolsGrid', 'data/tools.json', (t, i) => `
    <a class="card shown" href="${t.url}" style="transition-delay:${i * 40}ms">
      <div class="card-icon">${ICONS[t.icon] || GAUGE_ICON}</div>
      <h3>${t.title}</h3>
      <p>${t.blurb}</p>
      <div class="card-arrow">${t.tag || 'Open'} ${HUB_ARROW}</div>
    </a>
  `);
  await renderInto('assessmentsGrid', 'data/assessments.json', (a, i) => `
    <a class="card shown" href="${a.url}" style="transition-delay:${i * 40}ms">
      <div class="card-icon">${GAUGE_ICON}</div>
      <h3>${a.title}</h3>
      <p>${a.blurb}</p>
      <div class="card-arrow">${a.count} questions · start ${HUB_ARROW}</div>
    </a>
  `);
}

document.addEventListener('DOMContentLoaded', initHub);
