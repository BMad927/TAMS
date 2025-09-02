TASS Toledo - Static Website (demo)

Contents
- index.html, about.html, services.html, apply.html, contact.html
- assets/css/style.css
- assets/js/main.js

This is a static demo site intended for presentation use. It uses client-side JavaScript to "save" demo job applications in the browser (localStorage) for presentation purposes.

Quick local preview
1. Unzip tass-website.zip
2. Open index.html in a browser (double-click).

Deploying (recommended: Vercel or Netlify)
Option A - Vercel (one-click, connects to GitHub)
  1. Create a GitHub repository and push these files.
  2. Sign up at https://vercel.com and connect your GitHub account.
  3. Import repository -> Deploy (Vercel detects static site automatically).
  4. After deploy you'll get a live URL (you can set a custom domain later).

Option B - Netlify (drag & drop)
  1. Go to https://app.netlify.com/drop
  2. Drag the unzipped folder or the zip file into the page.
  3. Netlify will deploy and give you a live URL.

Notes & Next steps
- For live job application collection, integrate with a backend (Formspree, Netlify Forms, or a simple serverless function).
- To use a company email domain for contact forms, configure DNS and a mail provider (G Suite / Google Workspace or similar).
- Update the placeholders (phone, email, year) in the HTML files before going live.
