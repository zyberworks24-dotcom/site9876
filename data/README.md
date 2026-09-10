# Adding a client to the homepage carousel

The "Happy Clients" section on the homepage reads from [`clients.json`](clients.json) in this folder and renders automatically — no code changes needed.

## Steps

1. Drop the client's logo image into [`assets/clients/`](../assets/clients/) (PNG, SVG, or JPG). Use a roughly square image with a transparent or white background if possible — it will be placed inside a circular frame.
2. Add an entry to `clients.json`:

```json
{
  "name": "Client Name",
  "logo": "client-name.png"
}
```

`logo` is just the filename of the file you dropped into `assets/clients/` — not a full path.

3. Optional: add `"url": "https://client-website.com"` to make the logo clickable.

## Example

```json
[
  { "name": "Acme Corp", "logo": "acme.png" },
  { "name": "Northwind Health", "logo": "northwind.svg", "url": "https://northwindhealth.example.com" }
]
```

Commit both the image and the JSON change and push — GitHub Pages will pick it up on the next deploy. The carousel hides itself gracefully with a placeholder note when this file is an empty array (`[]`), so it's safe to leave empty until you have real clients to add.
