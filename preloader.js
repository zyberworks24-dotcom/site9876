/* Runs synchronously as the first thing in <body> so it paints before any content flashes. */
(function(){
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var word = 'Zyberworks';
  var letterDelay = 55; // ms between each letter starting

  var letters = word.split('').map(function(ch, i){
    return '<span style="animation-delay:' + (0.05 + i * letterDelay / 1000).toFixed(3) + 's">' + ch + '</span>';
  }).join('');
  var caretDelay = (0.05 + word.length * letterDelay / 1000).toFixed(3);

  var html = ''
    + '<div id="preloader" class="preloader' + (reduced ? ' no-anim' : '') + '">'
    + '  <div class="pl-word">' + letters + '<span class="pl-caret" style="animation-delay:' + caretDelay + 's"></span></div>'
    + '</div>';

  document.body.insertAdjacentHTML('afterbegin', html);
  document.body.classList.add('preload-lock');

  var MIN_MS = reduced ? 0 : 950;
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
