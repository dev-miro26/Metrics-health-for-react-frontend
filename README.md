# Smart Metrics Logbook — Frontend

React + Redux Toolkit + MUI dashboard for tracking personal health metrics, paired with the [Node backend](https://github.com/dev-miro26/Metrics-for-health-Node-backend).

## Prerequisites

- Node.js 16+
- The backend running locally (default `http://localhost:8000`)

## Setup

```bash
npm install
cp .env.example .env   # set REACT_APP_API_URL if needed
npm start              # runs on http://localhost:3040
```

## Scripts

- `npm start` — start the dev server (port 3040)
- `npm run build` — production build
- `npm test` — run tests

## Environment variables

See `.env.example`. `REACT_APP_API_URL` overrides the API base URL.

## Architecture

- `src/store` — Redux Toolkit slices (`auth`, `metrics`, `group`)
- `src/actions` — async thunks calling the API
- `src/pages` — route-level screens (Dashboard, Metrics, Group, Track, auth)
- `src/components/routing` — `MainRoutes` and `PrivateRoute`
- `src/utils` — axios instance, auth-token helpers, toast wrapper
