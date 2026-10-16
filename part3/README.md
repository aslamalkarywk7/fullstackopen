# Part 3 — Programming a server with NodeJS and Express

Source: https://fullstackopen.com/en/part3

## phonebook backend (3.1–3.22)

Express + Mongoose backend in `phonebook/` (`npm init` project, not Vite).

Run locally:

```bash
cd phonebook
npm install
cp .env.example .env   # then fill in MONGODB_URI (Atlas, never commit .env)
npm run dev            # node --watch index.js
```

Seed/list via CLI (3.12): `node mongo.js <password> [name] [number]`
(`MONGODB_CLUSTER` / `MONGODB_USER` come from `.env`, see `.env.example`).

Lint (3.22): `npm run lint` — clean, ESLint flat config with course style
rules (2-space, single quotes, no semicolons, unix linebreaks).

### What is implemented

- 3.1–3.6: `GET /api/persons`, `GET /info`, `GET /api/persons/:id` (404),
  `DELETE` (204), `POST` with generated ids (in-memory phase covered by the
  same routes backed by MongoDB in the final state).
- 3.7–3.8: `morgan` tiny + custom `:body` token logging POST bodies.
- 3.9/3.11: serves the phonebook frontend production build from `dist/`
  (`express.static`), frontend uses relative `/api/persons` + Vite proxy
  for dev. Rebuild with `npm run build:ui`.
- 3.12–3.18: full MongoDB CRUD (`models/person.js`), error middleware
  (`CastError` → 400 malformatted id), `PUT` with `runValidators`,
  `GET /:id` + `/info` from the database, unknown-endpoint handler.
- 3.19–3.20: validation — name min 3, number min 8 + custom
  `/^\d{2,3}-\d+$/` validator; frontend shows `error.response.data.error`.
- 3.22: ESLint, zero warnings.

### What YOU must do (needs your accounts)

1. **MongoDB Atlas**: create a free cluster, a database user, allow your IP
   (or 0.0.0.0 for hosting), put the URI in `.env` as `MONGODB_URI`.
2. **Deploy** (3.10/3.21, Fly.io or Render): set `MONGODB_URI` as a secret/
   env var on the host, deploy, verify `/api/persons` in browser.
3. **README link**: add your deployed URL to the root README (3.10 requires it).
