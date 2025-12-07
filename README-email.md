Email forwarding setup

1. Install dependencies

```powershell
cd "d:\WEBSITE\My Portfolio"
npm install
```

2. Create `.env` from the example and fill values

- Copy `.env.example` to `.env`
- Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
- Set `RECIPIENT` to the email address that should receive messages (your email)

3. Run the server

```powershell
npm start
```

4. Open your site

- Visit `http://localhost:3000` in your browser and test the contact form.

Notes
- This server serves the static files in the project directory and handles POST `/send` to forward email.
- For production, run behind HTTPS and use a secure SMTP provider. Keep `.env` out of source control.
- If you prefer not to run a server, consider a managed service (Formspree, Netlify Forms, EmailJS) instead.
