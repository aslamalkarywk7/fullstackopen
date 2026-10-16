# Part 4 — Testing Express servers, user administration

Source: https://fullstackopen.com/en/part4

## bloglist backend (4.1–4.23)

Express + Mongoose + `node:test` + Supertest in `bloglist/`
(`npm init` project, not Vite).

Run locally:

```bash
cd bloglist
npm install
cp .env.example .env   # MONGODB_URI, TEST_MONGODB_URI, SECRET, PORT (never commit .env)
npm run dev            # cross-env NODE_ENV=development node --watch index.js
npm test               # cross-env NODE_ENV=test node --test --test-concurrency=1
npm run lint
```

### What is implemented

- 4.1–4.2: refactored structure (`app.js`, `index.js`,
  `controllers/blogs.js`, `models/blog.js`, `utils/config.js`,
  `utils/logger.js`, `utils/middleware.js`), port 3003.
- 4.3–4.7: `utils/list_helper.js` (`dummy`, `totalLikes`, `favoriteBlog`,
  `mostBlogs`, `mostLikes`) with unit tests.
- 4.8–4.14: API tests — GET all as JSON, `id` field, POST creates (201),
  `likes` default 0, missing title/url → 400, DELETE (204), PUT likes.
  Async/await throughout, `tests/test_helper.js`, logger silent in test mode.
- 4.15–4.17: users (`POST /api/users` with bcrypt, `GET /api/users`),
  unique username (400), username/password min 3 validated in the
  controller, blogs linked to creators + `populate` both ways.
- 4.18–4.23: login (`POST /api/login`, JWT `SECRET`), token required for
  creating blogs (401 without token, 4.23 test), `tokenExtractor` +
  route-level `userExtractor` middleware (4.20/4.22), delete restricted to
  the creator (403 otherwise, 4.21).

### Test databases

`utils/config.js` picks `TEST_MONGODB_URI` when `NODE_ENV=test`.
For grading/CI use your own Atlas test database; locally any MongoDB works.
