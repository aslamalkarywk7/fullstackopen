# Full Stack Open — Part 6: State management (Zustand, TanStack Query, Context)

Part 6 submissions — previously the separate `fullstackopen-part6` repository,
now merged into [`fullstackopen/part6`](../).

## Apps

| Directory | Exercises | Stack |
|---|---|---|
| `unicafe/` | 6.1 | Zustand feedback app |
| `anecdotes/` | 6.2–6.15 | Zustand + json-server + Vitest unit tests |
| `query-anecdotes/` | 6.16–6.22 | TanStack Query + Context notifications + custom `server.js` |

Each `*-tests` directory holds the course-provided Playwright suites:

```bash
cd unicafe           && npm install && npm run dev
cd anecdotes          && npm install && npm run server & npm run dev
cd query-anecdotes    && npm install && npm run server & npm run dev
```
