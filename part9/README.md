# Full Stack Open — Part 9: TypeScript (9.1–9.30)

Part 9 submissions — previously the separate `fullstackopen-part9` repository,
now merged into [`fullstackopen/part9`](../).

## first-steps (9.1–9.7)

Node + Express + TypeScript: BMI/exercise calculators (CLI + HTTP),
strict tsconfig, ESLint with `@typescript-eslint` + `@stylistic`.

```bash
cd first-steps && npm install
npm run calculateBmi 180 72
npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
npm start   # :3003  |  npm run dev  |  npm run lint
```

## patientor-backend (9.8–9.14, 9.21, 9.23, 9.27)

```bash
cd patientor-backend && npm install && npm run dev  # :3001
```

- `/api/ping`, `/api/diagnoses`, `/api/patients` (non-sensitive list),
  `/api/patients/:id` (full), `POST /api/patients` (Zod-validated,
  Gender enum), `POST /api/patients/:id/entries` (per-type validation).

## patientor-frontend

```bash
cd patientor-frontend && npm install && npm run dev
```

MUI frontend — patient list, add patient, add entry, diagnosis search.

## flight-diary-backend / flight-diary-frontend (9.15–9.20, 9.24–9.26)

```bash
cd flight-diary-backend  && npm install && npm run dev   # :3000
cd flight-diary-frontend && npm install && npm run dev
```

## courseinfo (9.30)

```bash
cd courseinfo && npm install && npm run dev
```

React + TypeScript + Vite rewrite of the Part 1 course-info app.
