# Part 5 — Testing React apps, login, Router, styling

Source: https://fullstackopen.com/en/part5

## bloglist-frontend (5.1–5.16, 5.24–5.31)

Vite + React 19 frontend for the part4 bloglist backend (port 3003).

```bash
cd bloglist-frontend
npm install
npm run dev     # vite on :5173, /api proxied to :3003
npm test        # Vitest component tests
npm run lint
```

- 5.1–5.4: login (token in state), localStorage session + logout,
  blog creation, success/error notifications.
- 5.5–5.11: `Togglable` + `ref` create form, `BlogForm` component,
  expandable `Blog` with like (PUT) fixed to keep creator info (5.9),
  sorting by likes, delete with confirm shown only to the creator.
- 5.12: ESLint clean.
- 5.13–5.16: Vitest tests (`Blog` render/toggle/like×2/auth visibility,
  `BlogForm` submit details).
- 5.24–5.28: React Router (`/`, `/login`, `/blogs/:id`, `/create`),
  like restricted to logged-in users, redirects after create/delete,
  component + E2E tests updated for the routed views.
- 5.29–5.31: MaterialUI styling (AppBar nav, TextField forms, Alert
  notifications).

## bloglist-e2e (5.17–5.23, 5.28)

Playwright project (chromium). Needs the part4 backend in test mode and
the frontend dev server running:

```bash
# terminal 1 (backend test DB + SECRET)
cd ../../part4/bloglist && npm run start:test
# terminal 2
cd ../../part5/bloglist-frontend && npm run dev
# terminal 3
cd ../bloglist-e2e && npm install && npx playwright install chromium && npm test
```

Covers: login form shown, login success/fail, create, like, delete by
creator (confirm dialog), remove-button visibility per user, ordering by likes.
