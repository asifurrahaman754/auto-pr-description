# autopr backend

Basic express backend that keeps secrets server-side and exposes simple endpoints the frontend can call.

Available endpoints:

- `GET /api/pr/:prId/diff?repo=repoSlug` — returns raw diff text from Bitbucket
- `POST /api/pr/description` — accepts `{ structuredData }` or `{ prId, repo }`, returns `{ description }`
- `PUT /api/pr/:prId` — accepts `{ description, repo }` to update PR description in Bitbucket

Setup

1. Copy `.env.example` to `.env` and set your secrets.
2. Install deps and run:

```bash
cd backend
npm install
npm run dev # or npm start
```

Ensure `VITE_API_URL` in your frontend points to this backend (e.g. `http://localhost:4000`).
