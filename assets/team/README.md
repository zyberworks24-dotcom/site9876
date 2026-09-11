# Team photos

Drop team member photos here (square JPG or PNG, ideally 400x400 or larger). Then reference the filename in [`data/team.json`](../../data/team.json).

## Adding a team member

Add an entry to `data/team.json`:

```json
{
  "name": "Alex Taylor",
  "role": "Principal Security Consultant",
  "bio": "Leads penetration testing and Essential Eight uplift engagements.",
  "photo": "alex-taylor.jpg",
  "linkedin": "https://www.linkedin.com/in/alextaylor",
  "email": "alex@zyberworks.com.au"
}
```

Every field except `name` is optional. Without a `photo`, the card shows the person's initials. Without `linkedin`/`email`, the social links are simply omitted. The About page hides the team section's placeholder automatically once at least one person is added.
