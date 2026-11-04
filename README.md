# Full Stack Open — aslamalkarywk7

My submissions for the [Full Stack Open](https://fullstackopen.com/en/) course (University of Helsinki).

## Structure

```text
part0/
  0.4-new-note-diagram.md       Exercise 0.4 — New note diagram (traditional web app)
  0.5-spa-diagram.md            Exercise 0.5 — Single page app diagram
  0.6-spa-new-note-diagram.md   Exercise 0.6 — New note in Single page app diagram
part1/
  courseinfo/                   Exercises 1.1-1.5 (Vite + React)
  unicafe/                      Exercises 1.6-1.11 (Vite + React)
  anecdotes/                    Exercises 1.12-1.14 (Vite + React)
part2/
  courseinfo/                   Exercises 2.1-2.5 (Vite + React)
  phonebook/                    Exercises 2.6-2.17 (Vite + React + json-server)
  countries/                    Exercises 2.18-2.20 (Vite + React + REST APIs)
part3/
  phonebook/                    Exercises 3.1-3.22 (Express + Mongoose backend)
part4/
  bloglist/                     Exercises 4.1-4.23 (Express + tests + auth)
part5/
  bloglist-frontend/            Exercises 5.1-5.16, 5.24-5.31 (React + Router + MUI)
  bloglist-e2e/                 Exercises 5.17-5.23, 5.28 (Playwright E2E)
part6/
  unicafe/                      Exercises 6.1 (Zustand)
  anecdotes/                    Exercises 6.2-6.15 (Zustand + Vitest)
  query-anecdotes/              Exercises 6.16-6.22 (TanStack Query + Context)
  unicafe-tests/ anecdotes-tests/ query-anecdotes-tests/  Playwright suites
part7/
  routed-anecdotes/             Exercises 7.1-7.6 (custom hooks + Router)
  bloglist/                     Exercises 7.7-7.20 (monorepo: server + client)
  bloglist-tests/ routed-anecdotes-tests/  Playwright suites
part8/
  library-backend/              Exercises 8.1-8.26 (Apollo Server + Mongoose)
  library-frontend/             Exercises 8.8-8.26 (Apollo Client)
part9/
  first-steps/                  Exercises 9.1-9.7 (Express + TypeScript)
  patientor-backend/            Exercises 9.8-9.14, 9.21, 9.23, 9.27 (Express + Zod)
  patientor-frontend/           Exercises 9.16-9.19 (MUI frontend)
  flight-diary-backend/         Exercises 9.15-9.20 (Express + TypeScript)
  flight-diary-frontend/        Exercises 9.24-9.26 (axios frontend)
  courseinfo/                   Exercises 9.30 (React + TypeScript + Vite)
part10/
  rate-repository-app/          Exercises 10.1-10.27 (Expo SDK 50 React Native)
```

Parts 6–10 were previously separate repositories
(`fullstackopen-part6` … `fullstackopen-part10`) and are now merged here
as `part6/` … `part10/`. Each part keeps its own `package.json` and
install/build commands — `cd` into the app directory you want to run,
then `npm install` and `npm run dev` (or `npm test` / `npm run build`).

Exercises 0.1 (HTML), 0.2 (CSS) and 0.3 (HTML forms) are reading-only
tutorials from MDN — no code to submit, as stated in the course material.

## How to view the diagrams

Each `0.x` file contains a [Mermaid](https://mermaid.js.org/) `sequenceDiagram`
block. GitHub renders Mermaid natively in Markdown preview — just open the file
on github.com.

## Submission mapping (Part 0)

| Submission checkbox | Exercise | File |
|---|---|---|
| 1 | 0.1 HTML (read tutorial) | — (no file) |
| 2 | 0.2 CSS (read tutorial) | — (no file) |
| 3 | 0.3 HTML forms (read tutorial) | — (no file) |
| 4 | 0.4 New note diagram | `part0/0.4-new-note-diagram.md` |
| 5 | 0.5 Single page app diagram | `part0/0.5-spa-diagram.md` |
| 6 | 0.6 New note in SPA diagram | `part0/0.6-spa-new-note-diagram.md` |

## Sources

- Course page: https://fullstackopen.com/en/part0/fundamentals_of_web_apps
- Example app: https://studies.cs.helsinki.fi/exampleapp
- SPA version: https://studies.cs.helsinki.fi/exampleapp/spa
