# Full Stack Open — Part 8: GraphQL library app (8.1–8.26)

Part 8 submissions — previously the separate `fullstackopen-part8` repository,
now merged into [`fullstackopen/part8`](../).

## library-backend

Apollo Server (Express middleware) + Mongoose + JWT + subscriptions.

```bash
cd library-backend
npm install
cp .env.example .env   # MONGODB_URI, JWT_SECRET (never commit .env)
npm run dev            # GraphQL on :4000
```

- 8.1–8.7: bookCount/authorCount, allBooks (+author/genre filters),
  allAuthors with bookCount, addBook (creates missing authors),
  editAuthor (null when missing).
- 8.13–8.15: MongoDB persistence, refactored files, validation errors
  as GraphQLError.
- 8.16: users (favoriteGenre), login (hardcoded password `secret`),
  auth-required addBook/editAuthor.
- 8.23: bookAdded subscription (WebSockets). 8.26: author bookCount
  computed from a single extra query (no n+1).

## library-frontend

Apollo Client + subscriptions + login.

```bash
cd library-frontend
npm install
npm run dev
```
