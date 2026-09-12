# Partners page: hidden (how to show it again)

The Partners page (`partners.html`) still exists and works if you open its URL directly, but it is **hidden**: it is not linked in the navigation or footer, is marked `noindex` so search engines skip it, and is left out of the sitemap. In its place, the top navigation now shows **Free tools** (linking to the tools & assessments hub).

The "Happy clients" schools carousel is currently **hidden everywhere** (removed from both the Partners page and the home page) at your request. The client list itself is untouched in [`data/clients.json`](data/clients.json), and the carousel markup/code still exists, so it can be brought back on either page at any time — just ask.

## To make the Partners page visible again

Four small changes, then commit and push:

1. **Nav** — in [`common.js`](common.js), in `renderNav()`, change the `links` array back to include Partners (and remove or keep Free tools as you prefer):

   ```js
   const links = [
     ['services', 'Services', BASE + 'services.html'],
     ['frameworks', 'Frameworks', BASE + 'frameworks.html'],
     ['partners', 'Partners', BASE + 'partners.html'],
     ['tools', 'Free tools', BASE + 'assessments.html'],
     ['about', 'About', BASE + 'about.html']
   ];
   ```

   And add `partners` back to the `active` detection just above it:
   `/partners\.html$/.test(path) ? 'partners' :`

2. **Footer** — in `renderFooter()` in the same file, add a Partners link back to the Company column:
   `<li><a href="${BASE}partners.html">Partners</a></li>`

3. **De-index** — in [`partners.html`](partners.html), remove the line
   `<meta name="robots" content="noindex,nofollow">`

4. **Sitemap** — add `partners.html` back to the list in the sitemap generator (or just add a `<url>` entry for it to [`sitemap.xml`](sitemap.xml)).

Optional: the homepage badges "CrowdStrike Partner" and "Official Blocksi Partner" currently link to the EDR/MDR and Web Filtering service pages. If you want them to point back to the Partners page, change their `href` in [`index.html`](index.html) to `partners.html`.

That's it. If you'd rather I do it, just say "show the partners page again" and I'll make these changes for you.
