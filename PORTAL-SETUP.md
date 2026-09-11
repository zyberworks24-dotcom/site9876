# Client portal setup

The client portal (`portal.html`) lets your customers sign in with Google and see the licenses you have on file for them. Until you connect a backend it runs in a clearly-labelled **preview** with sample data. This guide switches it to real sign-in and real per-customer data.

The frontend stays exactly as it is (static, on GitHub Pages). The backend is **Firebase** (Google's free-tier service): Firebase Authentication handles Google sign-in, and Firestore stores the license records. Firestore security rules make sure each customer can only ever read their own records.

## 1. Create a Firebase project

1. Go to <https://console.firebase.google.com> and create a project (the free "Spark" plan is enough).
2. In **Build → Authentication → Sign-in method**, enable **Google**.
3. In **Build → Firestore Database**, create a database (start in production mode).
4. In **Project settings → General → Your apps**, add a **Web app** and copy the `firebaseConfig` object.

## 2. Add your config to the site

Open [`portal.js`](portal.js) and replace the top line:

```js
const FIREBASE_CONFIG = null;
```

with your copied config, for example:

```js
const FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "0000000000",
  appId: "1:0000:web:abcdef"
};
```

Then, in the Firebase console under **Authentication → Settings → Authorized domains**, add `zyberworks24-dotcom.github.io` (and your custom domain if you add one). Commit and push. The portal will now show a real "Sign in with Google" button.

> The Firebase web `apiKey` is safe to include in public frontend code — it only identifies the project. Access is controlled by the security rules below, not by hiding the key.

## 3. Add license records

Each license is one document in a `licenses` collection. The important field is `email`, which must match the customer's Google sign-in email.

Collection: `licenses`, example document:

```json
{
  "email": "customer@theircompany.com",
  "product": "CrowdStrike Falcon",
  "tier": "Falcon Enterprise",
  "status": "Active",
  "seats": 120,
  "expiry": "30 Jun 2027",
  "reference": "ZW-CS-1042",
  "notes": "Managed detection and response included."
}
```

`status` accepts `Active`, `Expiring`, or `Expired` (these colour the badge). Every field except `email` is optional. Add one document per license; a customer with three products has three documents that share their `email`.

## 4. Lock it down with security rules

In **Firestore → Rules**, paste this so a signed-in user can only read documents that match their own email, and no one can write from the browser (you manage records in the console or from a server):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /licenses/{doc} {
      allow read: if request.auth != null
                  && request.auth.token.email == resource.data.email;
      allow write: if false;
    }
  }
}
```

That's it. Sign in on `portal.html` with a Google account whose email matches a record, and the licenses appear.

## Notes

- If you enable the portal, update [`privacy.html`](privacy.html): sign-in adds Google as a processor and stores license data. The current policy assumes no accounts, so it will need a short paragraph about the portal.
- To manage licenses at scale, you can import them into Firestore as a CSV/JSON batch, or write a small admin script — ask and we can add one.
