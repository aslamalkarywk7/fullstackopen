# Full Stack Open — Part 10: React Native (10.1–10.27)

Part 10 submissions — previously the separate `fullstackopen-part10` repository,
now merged into [`fullstackopen/part10`](../).

## What is inside

`rate-repository-app/` is an Expo (SDK 50) React Native application for the
reviewed repositories of the course.

```bash
cd rate-repository-app
npm install
npm start          # then press a / i / w, or: npm run web
npm test           # jest + jest-expo + @testing-library/react-native
npm run lint
```

### Backend

The app talks to the course server
[`fullstack-hy2020/rate-repository-api`](https://github.com/fullstack-hy2020/rate-repository-api)
(clone it separately, `npm install`, `cp .env.template .env`, `npm run build`,
`npm run seed:run`, `npm start`). It provides the GraphQL API on
`http://localhost:4000/graphql` and the REST endpoint on `:5000`.
