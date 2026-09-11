/* Renders the assessments hub from data/assessments.json. */
async function initAssessmentsHub(){
  const grid = document.getElementById('assessmentsGrid');
  if (!grid) return;
  let list = [];
  try { list = await fetchJSON('data/assessments.json'); } catch (err){
    grid.innerHTML = `<p class="section-sub">Couldn't load the assessments right now. Please refresh the page.</p>`;
    return;
  }

  const arrow = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  grid.innerHTML = list.map((a, i) => `
    <a class="card shown" href="${a.url}" style="transition-delay:${i * 40}ms">
      <div class="card-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M4 16a8 8 0 0 1 16 0" stroke="currentColor" stroke-width="1.5"/><path d="M12 16 16 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="16" r="1.4" fill="currentColor"/></svg></div>
      <h3>${a.title}</h3>
      <p>${a.blurb}</p>
      <div class="card-arrow">${a.count} questions · start ${arrow}</div>
    </a>
  `).join('');
}

document.addEventListener('DOMContentLoaded', initAssessmentsHub);
