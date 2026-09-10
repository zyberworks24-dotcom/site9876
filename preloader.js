/* Runs synchronously as the first thing in <body> so it paints before any content flashes. */
(function(){
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var html = ''
    + '<div id="preloader" class="preloader' + (reduced ? ' no-anim' : '') + '">'
    + '  <svg viewBox="0 0 200 200" aria-hidden="true">'
    + '    <defs>'
    + '      <linearGradient id="preGrad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">'
    + '        <stop offset="0%" stop-color="#2997ff"/>'
    + '        <stop offset="50%" stop-color="#64d2ff"/>'
    + '        <stop offset="100%" stop-color="#bf5af2"/>'
    + '      </linearGradient>'
    + '    </defs>'
    + '    <circle class="pl-ring" cx="100" cy="100" r="55"/>'
    + '    <g class="pl-spokes">'
    + '      <line class="pl-line" x1="100" y1="100" x2="185" y2="100" style="animation-delay:.05s"/>'
    + '      <line class="pl-line" x1="100" y1="100" x2="142.5" y2="26.4" style="animation-delay:.12s"/>'
    + '      <line class="pl-line" x1="100" y1="100" x2="57.5" y2="26.4" style="animation-delay:.19s"/>'
    + '      <line class="pl-line" x1="100" y1="100" x2="15" y2="100" style="animation-delay:.26s"/>'
    + '      <line class="pl-line" x1="100" y1="100" x2="57.5" y2="173.6" style="animation-delay:.33s"/>'
    + '      <line class="pl-line" x1="100" y1="100" x2="142.5" y2="173.6" style="animation-delay:.4s"/>'
    + '      <circle class="pl-node" cx="185" cy="100" r="3.4" style="animation-delay:.55s"/>'
    + '      <circle class="pl-node" cx="142.5" cy="26.4" r="3.4" style="animation-delay:.62s"/>'
    + '      <circle class="pl-node" cx="57.5" cy="26.4" r="3.4" style="animation-delay:.69s"/>'
    + '      <circle class="pl-node" cx="15" cy="100" r="3.4" style="animation-delay:.76s"/>'
    + '      <circle class="pl-node" cx="57.5" cy="173.6" r="3.4" style="animation-delay:.83s"/>'
    + '      <circle class="pl-node" cx="142.5" cy="173.6" r="3.4" style="animation-delay:.9s"/>'
    + '    </g>'
    + '    <g class="pl-core">'
    + '      <path d="M100 62 L128 74 V100 C128 122 116 138.5 100 145 C84 138.5 72 122 72 100 V74 Z" fill="none" stroke="url(#preGrad)" stroke-width="2.6"/>'
    + '      <path d="M89 100 L97 108 L112 89" fill="none" stroke="url(#preGrad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
    + '    </g>'
    + '  </svg>'
    + '</div>';

  document.body.insertAdjacentHTML('afterbegin', html);
  document.body.classList.add('preload-lock');

  var MIN_MS = reduced ? 0 : 1000;
  var start = Date.now();

  function reveal(){
    var el = document.getElementById('preloader');
    var wait = Math.max(0, MIN_MS - (Date.now() - start));
    setTimeout(function(){
      if (el) el.classList.add('hide');
      document.body.classList.remove('preload-lock');
      setTimeout(function(){ if (el && el.parentNode) el.parentNode.removeChild(el); }, 700);
    }, wait);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive'){
    reveal();
  } else {
    document.addEventListener('DOMContentLoaded', reveal);
  }
})();
