/* Soft fade-out before same-site page navigations, for an app-like feel across the multi-page site. */
(function(){
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  document.addEventListener('click', function(e){
    var a = e.target.closest('a');
    if (!a || !a.href) return;
    if (a.target === '_blank' || a.hasAttribute('download') || e.metaKey || e.ctrlKey || e.shiftKey) return;

    var url;
    try { url = new URL(a.href, location.href); } catch(err){ return; }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.hash) return; // same-page anchor

    e.preventDefault();
    document.body.classList.add('page-exit');
    setTimeout(function(){ location.href = a.href; }, 240);
  });
})();
