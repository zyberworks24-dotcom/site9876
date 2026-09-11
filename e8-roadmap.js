/* Essential Eight roadmap: an interactive view of the maturity model, Level 0
   to Level 3. Frontend only, driven by data/e8-roadmap.json. */
(function(){
  const app = document.getElementById('e8rApp');
  if (!app) return;
  let DATA = null;
  let cur = 1;

  function render(){
    const lv = DATA.levels[cur];
    app.innerHTML = `
      <div class="e8r-levels reveal">
        ${DATA.levels.map(l => `
          <button class="e8r-level ${l.n === cur ? 'active' : ''} ${l.n < cur ? 'done' : ''}" data-n="${l.n}">
            <span class="e8r-level-n">${l.n}</span>
            <span class="e8r-level-name">${l.name}</span>
            <span class="e8r-level-sub">${l.sub}</span>
          </button>
        `).join('')}
      </div>

      <div class="e8r-leveldesc reveal">
        <h2>${lv.name} · ${lv.sub}</h2>
        <p>${lv.desc}</p>
      </div>

      <div class="e8r-grid">
        ${DATA.strategies.map((s, i) => `
          <div class="e8r-card ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}">
            <div class="e8r-card-head">
              <h3>${s.name}</h3>
              <div class="e8r-pips">${[0,1,2,3].map(n => `<span class="${n <= cur ? 'on' : ''}"></span>`).join('')}</div>
            </div>
            <p>${s.levels[cur]}</p>
          </div>
        `).join('')}
      </div>

      <div class="cta cta-inline">
        <div class="cta-card reveal-scale">
          <h2>Not sure what level you are at?</h2>
          <p>Take the two-minute Essential Eight self-assessment, or let us map your current maturity and a funded path to your target.</p>
          <div class="cta-actions">
            <a href="essential-eight-assessment.html" class="btn btn-primary btn-lg">Take the assessment</a>
            <button type="button" class="btn btn-ghost btn-lg" data-contact data-service="ASD Essential Eight">Plan our uplift</button>
          </div>
        </div>
      </div>
    `;
    app.querySelectorAll('.e8r-level').forEach(b => b.addEventListener('click', () => { cur = parseInt(b.dataset.n, 10); render(); }));
    observeReveal(app);
  }

  async function init(){
    try { DATA = await fetchJSON('data/e8-roadmap.json'); }
    catch (err){ app.innerHTML = `<p class="page-hero-sub" style="text-align:center">Couldn't load the roadmap. <a href="frameworks.html" style="color:var(--blue)">See our frameworks</a>.</p>`; return; }
    render();
  }
  init();
})();
