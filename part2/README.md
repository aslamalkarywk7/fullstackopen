# Part 2 — Communicating with server

Source: https://fullstackopen.com/en/part2

Each exercise set is a separate Vite + React application.
Run any app with:

```bash
cd <app>
npm install
npm run dev
```

## Exercises

- **courseinfo (2.1–2.5)** — Final state: `Course` as a separate module
  (`src/components/Course.jsx`) with `Header`/`Content`/`Part` inside,
  parts rendered with `map` + `key={part.id}`, total with `reduce`, and an
  arbitrary `courses` array rendered in `App`.
- **phonebook (2.6–2.17)** — Full CRUD against `json-server`:
  - Start the backend: `npm run server` (port 3001, data in `db.json`),
    then `npm run dev` in another terminal.
  - Add names/numbers, duplicate handling with `alert` replaced by
    confirm-to-update via `PUT`, delete with `window.confirm` + `DELETE`,
    case-insensitive filter, `Filter`/`PersonForm`/`Persons` components,
    `services/persons.js` module, success (green) and error (red)
    notifications shown for 5 seconds, stale-server error handled by
    removing the person from state.
- **countries (2.18–2.20)** — Data from
  `https://studies.cs.helsinki.fi/restcountries/api/all`:
  search with "Too many matches" over 10, list with `show` buttons,
  single-country details (capital, area, languages, flag) plus capital
  weather. Weather needs an OpenWeatherMap key via env var
  (`VITE_SOME_KEY`, see `.env.example`, never committed); without a key
  the app shows a notice instead of weather.
