# Licenses page

The licenses page (`portal.html`) shows the records in [`data/licenses.json`](data/licenses.json). Edit that file, commit, and push — the page updates automatically. There is no build step and no backend.

## Important: this is public

`data/licenses.json` lives in the public repo and is served on a public URL. **Anyone with the link can read it, and anyone can browse the repo.** There is no sign-in. Only put information here that you are comfortable being publicly visible. In particular, be careful about listing a customer's name alongside their contract details, since that is their confidential information as well as yours.

## Editing the data

```json
{
  "updated": "11 Sep 2026",
  "note": "Optional banner shown at the top of the page.",
  "groups": [
    {
      "label": "Organisation or section heading (optional)",
      "licenses": [
        {
          "product": "CrowdStrike Falcon",
          "tier": "Falcon Enterprise",
          "status": "Active",
          "seats": 120,
          "expiry": "30 Jun 2027",
          "reference": "ZW-CS-1042",
          "notes": "Managed detection and response included."
        }
      ]
    }
  ]
}
```

- `status` accepts `Active`, `Expiring`, or `Expired` (these colour the badge). Anything else shows a neutral badge.
- Every field except the group `licenses` array is optional. Drop a field to hide that line.
- Use multiple `groups` to separate records under headings; use one group for a single flat list.
- If the file is empty (`"groups": []`), the page shows a friendly "nothing here yet" state.

## If you later want it private

A login in front of a public file only looks secure; it does not restrict anything. To genuinely limit access — for example, only staff signed in with your organisation's Google domain — the page needs a small backend gatekeeper (a Cloudflare Worker that verifies a Google domain sign-in and serves the file, which then lives with the Worker instead of in the public repo). Ask and we can add that.
