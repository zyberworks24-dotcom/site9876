/* Renders the team grid on the About page from data/team.json.
   Empty by default; shows a friendly placeholder until real people are added. */
async function initTeam(){
  const grid = document.getElementById('teamGrid');
  if (!grid) return;
  let team = [];
  try { team = await fetchJSON('data/team.json'); } catch (err){ team = []; }

  if (!team.length){
    grid.innerHTML = `
      <div class="team-empty">
        <p>Team profiles appear here once they are added.</p>
        <p class="team-empty-sub">See <code>data/team.json</code> in the repo to add the first one.</p>
      </div>`;
    grid.classList.add('team-grid-empty');
    return;
  }

  grid.innerHTML = team.map((m, i) => {
    const initials = (m.name || '?').split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
    const avatar = m.photo
      ? `<img src="${BASE}assets/team/${m.photo}" alt="${m.name}" loading="lazy">`
      : `<span class="team-initials">${initials}</span>`;
    const links = (m.linkedin || m.email) ? `
      <div class="team-links">
        ${m.linkedin ? `<a href="${m.linkedin}" target="_blank" rel="noopener" aria-label="${m.name} on LinkedIn">in</a>` : ''}
        ${m.email ? `<a href="mailto:${m.email}" aria-label="Email ${m.name}">@</a>` : ''}
      </div>` : '';
    return `
      <div class="team-card ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}">
        <div class="team-avatar">${avatar}</div>
        <h3>${m.name || ''}</h3>
        <p class="team-role">${m.role || ''}</p>
        ${m.bio ? `<p class="team-bio">${m.bio}</p>` : ''}
        ${links}
      </div>`;
  }).join('');
  observeReveal(grid);
}

document.addEventListener('DOMContentLoaded', initTeam);
