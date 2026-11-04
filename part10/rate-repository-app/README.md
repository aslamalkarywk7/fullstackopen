# Full Stack Open — Part 10: React Native (10.1–10.27)

Separate submission repository for Part 10.

My other submissions (parts 0–5, 7) live in
https://github.com/aslamalkarywk7/fullstackopen,
part 6 in https://github.com/aslamalkarywk7/fullstackopen-part6,
part 8 in https://github.com/aslamalkarywk7/fullstackopen-part8,
part 9 in https://github.com/aslamalkarywk7/fullstackopen-part9.

## What is inside

`rate-repository-app` is an Expo (SDK 50) React Native application for the
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

The URI is read from `.env` through `app.config.js`:

```
ENV=development
APOLLO_URI=http://localhost:4000/graphql
```

GitHub OAuth credentials (`GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`) belong in
the **server's** `.env`, never in this repository — the client only needs the
GraphQL URI.

## Exercises

- 10.1–10.3: `Text`, `TextInput` and the `theme` object.
- 10.4–10.6: `RepositoryItem` with statistics and `formatCount`.
- 10.7: `RepositoryList` split into a stateless `RepositoryListContainer`
  (class component so the header stays stable) and the query hook
  `useRepositories`.
- 10.8: `AppBar` navigation tabs; the signed in state comes from `me`.
- 10.9–10.10: routes for the repository list, sign in, sign up, sign out,
  single repository, review form and my reviews.
- 10.11: `apolloClient` with an auth link reading the token from storage.
- 10.12: token persisted in `AsyncStorage` through `authStorage` + context.
- 10.13–10.16: `signIn`, `signOut`, `createUser` and the review mutations.
- 10.17–10.22: Jest tests for the repository list, sign in, sign up, the
  single repository review list, the review form and the review list.
- 10.23–10.24: sorting (`orderBy` / `orderDirection`) and debounced filtering
  (`useDebounce` + `searchKeyword`) straight through GraphQL variables.
- 10.25–10.26: my reviews with navigation to the repository and a delete
  action confirmed in an `Alert`.
- 10.27: infinite scrolling with `relayStylePagination` for repositories and
  for the reviews of a single repository.