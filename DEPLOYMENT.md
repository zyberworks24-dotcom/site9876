# Deployment

This one working copy publishes to **two** GitHub Pages sites:

| Repo | Branch | Serves at | Purpose |
|------|--------|-----------|---------|
| `zyberworks24-dotcom/zyberworks` | `main` | **https://zyberworks.com.au** (custom domain, HTTPS) | **Production** |
| `zyberworks24-dotcom/site9876` | `master` | https://zyberworks24-dotcom.github.io/site9876/ | Staging / mirror |

Git remotes: `origin` → site9876, `prod` → zyberworks.

## The old site is backed up

Production used to be a **Vite** app. Before it was replaced, that whole site was
preserved on the branch **`vite-site-backup`** in the `zyberworks` repo
(`gh api repos/zyberworks24-dotcom/zyberworks/branches/vite-site-backup`).
To roll back: force-push that branch to `main` and set Pages source back to a
workflow build, or ask Claude to "roll production back to the Vite site".

## How to publish an update

```bash
# 1. commit your changes on master, then:
git push origin master                      # updates staging (site9876)

# 2. production (zyberworks.com.au):
git -c http.version=HTTP/1.1 push prod master:main --force

# 3. IMPORTANT: step 2 deletes the CNAME file GitHub keeps on main, which would
#    drop the custom domain. Immediately re-bind it (GitHub re-adds the file):
gh api -X PUT repos/zyberworks24-dotcom/zyberworks/pages \
  --input - <<< '{"cname":"zyberworks.com.au"}'
```

Notes
- Use `http.version=HTTP/1.1` on the prod push — the default HTTP/2 push returns a
  spurious `HTTP 400` on this repo.
- Do **not** add a `CNAME` file to `master`. site9876 has no custom domain, and a
  CNAME file there would collide with the production domain claim.
- Pages on `zyberworks` is **legacy** build (branch `main`, path `/`), not a workflow.
