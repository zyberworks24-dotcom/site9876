/* Password generator. Uses the browser's cryptographic RNG. Everything happens
   locally; nothing is generated on or sent to a server. */
(function(){
  const app = document.getElementById('pgApp');
  if (!app) return;

  // A curated list of short, common, easy-to-type words for passphrases.
  const WORDS = "able acid aged also arch army atom aunt auto away baby back bake ball band bank barn base bath beam bean bear beat bell belt bird blue boat body bold bolt bone book boot born boss both bowl brew bulk bush busy cake calm camp cane card care cart cash cave cell chef chip city clay clip club coal coat code coin cold cook cool cord core corn cost cove crew crop cube curl dawn deal deck deer desk dial dime dish dock does dome door dose dove draw drum dual duck dune dusk dust duty each earn east easy edge exit face fact fade fair fall farm fast fern figs film fine fire fish five flag flat flax flew flip flow foam fold folk font food foot fork fort four free frog fuel full fund gain game gate gear gift girl give glad glow goal goat gold golf gone good gray grew grid grim grip grow gulf hail hair half hall hand hard hare harp haul have hawk head heat herb hero hill hint hive hold hole holy home hood hoof hook hope horn host hour huge hull hunt icon idea inch iron item jade jazz join joke july jump keen keep kelp kept kick kind king kite knee knot lace lake lamb lamp land lane lava lawn lead leaf leak lean leap left lend lens life lift lily lime line link lion list load loaf loan lock loft logo long look loop lord loss loud love luck lump lung lynx mail main mane many maps mark mars mask mast math maze meal mesa mild mile milk mill mind mine mint mist moat mode mold mole monk moon moss most moth move much muse nail name navy near neat neck nest news next nice nine node none noon nose note oath oats odds okay once open oval oven owns pace pack page pair palm park part path peak pear peer pine pink plan play plot plum plus poem poet pond pony pool port post prep prey prow pull pump pure push quay quiz race rain ramp rank rare rate read reef reel rely rest rich ride ring ripe rise road robe rock role roof room root rope rose ruby rule rush safe sage sail salt sand save scan seal seat seed self send shed ship shoe shop shot show side silk sing sink site size skin sled slot slow snap snow soap sock soft soil sole song sort soul soup sour span spin spot star stay stem step stir stop stow such suit sung sure surf swan swap tail take tale tall tank tape task teak team tent tide tidy tile time tiny toad toe tofu tone tool torn tour town trap tray tree trim trip tuba tube tune turf twin type undo unit vale vane vase vast veil vent verb very vest vibe view vine visa void volt vote wade wage walk wall wand want ward warm wash wave wavy weak wear weed week weld well went were west what when whip wide wild will wind wine wing wire wise wolf wood wool word wore work worm wrap yard yarn yawn year yoga zero zest zinc zone zoom".split(" ");

  const state = { mode: 'random', length: 18, lower: true, upper: true, digits: true, symbols: true, noAmbig: false, words: 4, sep: '-', capWords: true, addNum: true, pin: 6 };
  const SYMBOLS = "!@#$%^&*-_=+?";
  const AMBIG = /[0O1lI|`']/g;

  function rand(max){
    const a = new Uint32Array(1), limit = Math.floor(4294967296 / max) * max;
    let x; do { crypto.getRandomValues(a); x = a[0]; } while (x >= limit);
    return x % max;
  }
  const pick = arr => arr[rand(arr.length)];

  function makeRandom(){
    let sets = [];
    if (state.lower) sets.push("abcdefghijklmnopqrstuvwxyz");
    if (state.upper) sets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if (state.digits) sets.push("0123456789");
    if (state.symbols) sets.push(SYMBOLS);
    if (!sets.length) sets.push("abcdefghijklmnopqrstuvwxyz");
    if (state.noAmbig) sets = sets.map(s => s.replace(AMBIG, "")).filter(Boolean);
    const all = sets.join("");
    const out = [];
    sets.forEach(s => out.push(s[rand(s.length)])); // at least one of each class
    while (out.length < state.length) out.push(all[rand(all.length)]);
    // shuffle
    for (let i = out.length - 1; i > 0; i--){ const j = rand(i + 1); [out[i], out[j]] = [out[j], out[i]]; }
    return out.slice(0, state.length).join("");
  }

  function makePassphrase(){
    const parts = [];
    for (let i = 0; i < state.words; i++){
      let w = pick(WORDS);
      if (state.capWords) w = w.charAt(0).toUpperCase() + w.slice(1);
      parts.push(w);
    }
    let s = parts.join(state.sep);
    if (state.addNum) s += (state.sep || '') + rand(100);
    return s;
  }

  function makePin(){
    let s = "";
    for (let i = 0; i < state.pin; i++) s += rand(10);
    return s;
  }

  function generate(){
    let pw = state.mode === 'passphrase' ? makePassphrase() : state.mode === 'pin' ? makePin() : makeRandom();
    const out = document.getElementById('pgOut');
    if (out) out.textContent = pw;
    // strength
    const meter = document.getElementById('pgMeterFill');
    const lbl = document.getElementById('pgStrength');
    if (meter && lbl){
      let score = 4;
      if (typeof window.zxcvbn === 'function'){ score = window.zxcvbn(pw.slice(0,100)).score; }
      else { score = pw.length >= 20 ? 4 : pw.length >= 14 ? 3 : pw.length >= 10 ? 2 : 1; }
      const WORDS2 = ['Very weak','Weak','Fair','Good','Strong'];
      const COLORS = ['#f87171','#fb923c','#fbbf24','#38bdf8','#4ade80'];
      meter.style.width = ((score+1)/5*100)+'%';
      meter.style.background = COLORS[score];
      lbl.textContent = WORDS2[score];
      lbl.style.color = COLORS[score];
    }
  }

  function optionsMarkup(){
    if (state.mode === 'passphrase'){
      return `
        <label class="pg-row"><span>Words</span><input type="range" min="3" max="8" value="${state.words}" data-opt="words"><b id="pgWordsVal">${state.words}</b></label>
        <label class="pg-row"><span>Separator</span>
          <select data-opt="sep">
            <option value="-" ${state.sep==='-'?'selected':''}>hyphen -</option>
            <option value="." ${state.sep==='.'?'selected':''}>dot .</option>
            <option value="_" ${state.sep==='_'?'selected':''}>underscore _</option>
            <option value=" " ${state.sep===' '?'selected':''}>space</option>
            <option value="" ${state.sep===''?'selected':''}>none</option>
          </select></label>
        <label class="pg-check"><input type="checkbox" data-opt="capWords" ${state.capWords?'checked':''}> Capitalise words</label>
        <label class="pg-check"><input type="checkbox" data-opt="addNum" ${state.addNum?'checked':''}> Add a number</label>`;
    }
    if (state.mode === 'pin'){
      return `<label class="pg-row"><span>Digits</span><input type="range" min="4" max="12" value="${state.pin}" data-opt="pin"><b id="pgPinVal">${state.pin}</b></label>`;
    }
    return `
      <label class="pg-row"><span>Length</span><input type="range" min="8" max="40" value="${state.length}" data-opt="length"><b id="pgLenVal">${state.length}</b></label>
      <label class="pg-check"><input type="checkbox" data-opt="lower" ${state.lower?'checked':''}> Lowercase (a-z)</label>
      <label class="pg-check"><input type="checkbox" data-opt="upper" ${state.upper?'checked':''}> Uppercase (A-Z)</label>
      <label class="pg-check"><input type="checkbox" data-opt="digits" ${state.digits?'checked':''}> Numbers (0-9)</label>
      <label class="pg-check"><input type="checkbox" data-opt="symbols" ${state.symbols?'checked':''}> Symbols (!@#$)</label>
      <label class="pg-check"><input type="checkbox" data-opt="noAmbig" ${state.noAmbig?'checked':''}> Avoid look-alikes (0 O 1 l I)</label>`;
  }

  function render(){
    app.innerHTML = `
      <div class="tabs reveal" id="pgTabs" style="margin-bottom:20px">
        <button class="tab ${state.mode==='random'?'active':''}" data-mode="random">Random</button>
        <button class="tab ${state.mode==='passphrase'?'active':''}" data-mode="passphrase">Passphrase</button>
        <button class="tab ${state.mode==='pin'?'active':''}" data-mode="pin">PIN</button>
      </div>
      <div class="pw-card reveal">
        <div class="pg-output"><code id="pgOut"></code>
          <div class="pg-out-actions">
            <button class="pg-icon-btn" id="pgCopy" aria-label="Copy">Copy</button>
            <button class="pg-icon-btn" id="pgRegen" aria-label="Regenerate">↻</button>
          </div>
        </div>
        <div class="pw-meter"><span id="pgMeterFill"></span></div>
        <div class="pw-readout"><span class="pw-label" id="pgStrength">—</span><span class="pw-crack">Generated in your browser</span></div>
        <div class="pg-options">${optionsMarkup()}</div>
        <button class="btn btn-primary btn-lg" id="pgGen" style="width:100%;margin-top:8px">Generate</button>
      </div>
      <div class="pw-tips reveal">
        <h2>Using it well</h2>
        <ul>
          <li><strong>Store it in a password manager.</strong> Do not reuse it, and do not try to remember every one, let the manager do it.</li>
          <li><strong>Passphrases are great for the few you must recall,</strong> like your device or manager master password.</li>
          <li><strong>Turn on MFA</strong> wherever you can, so a stolen password is not enough on its own.</li>
        </ul>
        <div class="cta-actions" style="margin-top:22px">
          <a href="password-check.html" class="btn btn-ghost">Check a password's strength</a>
          <button type="button" class="btn btn-primary" data-contact data-service="Managed Security on Devices">Roll this out across your team</button>
        </div>
      </div>`;

    document.querySelectorAll('#pgTabs .tab').forEach(t => t.addEventListener('click', () => { state.mode = t.dataset.mode; render(); }));
    document.getElementById('pgGen').addEventListener('click', generate);
    document.getElementById('pgRegen').addEventListener('click', generate);
    document.getElementById('pgCopy').addEventListener('click', copyOut);
    app.querySelectorAll('[data-opt]').forEach(el => {
      el.addEventListener('input', () => {
        const k = el.dataset.opt;
        if (el.type === 'checkbox') state[k] = el.checked;
        else if (el.type === 'range') state[k] = parseInt(el.value, 10);
        else state[k] = el.value;
        const v = document.getElementById('pgLenVal'); if (v && k==='length') v.textContent = state.length;
        const w = document.getElementById('pgWordsVal'); if (w && k==='words') w.textContent = state.words;
        const p = document.getElementById('pgPinVal'); if (p && k==='pin') p.textContent = state.pin;
        generate();
      });
    });
    generate();
    observeReveal(app);
  }

  function copyOut(){
    const txt = document.getElementById('pgOut').textContent;
    const btn = document.getElementById('pgCopy');
    const done = () => { btn.textContent = 'Copied'; setTimeout(() => btn.textContent = 'Copy', 1400); };
    if (navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(done).catch(fallbackCopy); }
    else fallbackCopy();
    function fallbackCopy(){
      const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch(e){}
      ta.remove();
    }
  }

  render();
})();
