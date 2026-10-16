# AccessWay

An accessibility-first campus route planner built with Vue, Tailwind CSS, Leaflet, and OpenStreetMap. The prototype includes seeded GeoJSON route segments, live route status changes, community reports with optional photos, and alternate-route suggestions.

## Run locally

```sh
npm install
npm run dev
```

Routes, reports, and segment statuses work without a backend and are saved in this browser's local storage.

## Enable Supabase realtime

1. Create a Supabase project and run [`supabase/schema.sql`](./supabase/schema.sql) in its SQL editor.
2. Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` using the project's public URL and anon key.
3. Restart the Vite dev server.

With both values configured, route status changes and new reports are read and broadcast through Supabase Realtime; local storage remains available as a cache and offline fallback. The schema grants public, anonymous read access and permits anonymous community status/report submissions for this prototype. For a production deployment, add user authentication, rate limits, moderation, and Supabase Storage for photo files instead of storing compressed photo data in the report table.

## Prototype data

The demo includes Central Library, Garden Café, Lecture Hall, and an inaccessible Administration Block route. Coordinates are seeded as GeoJSON in [`src/data/routes.js`](./src/data/routes.js); replace them with surveyed campus paths before real-world use. OpenStreetMap map tiles require an internet connection.
