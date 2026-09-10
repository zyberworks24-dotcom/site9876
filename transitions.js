/* Soft fade-out before same-site page navigations, for an app-like feel across the multi-page site. */
(function(){
  // Always clear a leftover fade state on show — including bfcache restores (e.g. the
  // browser Back button), where the page reappears with its old DOM/class state intact
  // instead of reloading. Without this, going back can land on a page still faded to
  // opacity:0 from when it was left, which looks like a blank page.
  window.addEventListener('pageshow', function(){
    document.body.classList.remove('page-exit');
  });

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
