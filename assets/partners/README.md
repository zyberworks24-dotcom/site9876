# Partner logos

The "Technology Partners" section on the homepage reads from [`data/partners.json`](../../data/partners.json) and renders automatically.

## To add or change a partner logo

1. Drop the partner's logo image into this folder (PNG or SVG). A logo with its own background colour is fine, since each logo sits on its own chip.
2. In `data/partners.json`, set the partner's `logo` field to the filename, for example `"logo": "crowdstrike.png"`.

If a partner has no `logo` set, the site shows its name as clean text instead, so the section always looks complete. `blocksi.png` is already in place. To show the real CrowdStrike logo, save a clean version here as `crowdstrike.png` and add `"logo": "crowdstrike.png"` to its entry.

Only use official logos of organisations you genuinely partner with.
