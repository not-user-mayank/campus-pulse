# CampusPulse

Intelligent campus event and club management for a college hackathon.

This is **Phase 1 only**: a React website shell with Tailwind CSS and page routing. There is no login, no database, and no fake event data yet.

## How to run on your laptop

1. Install [Node.js](https://nodejs.org/) (LTS) if it is not already installed.
2. Open this folder in Cursor.
3. In the terminal, run:

```bash
npm install
npm run dev
```

4. Open the address shown, usually http://localhost:5173

## What you should see

- A home page that explains Phase 1
- Student, Organizer, and Admin layout previews
- Placeholder pages that clearly say which phase will build them

## What comes next

| Phase | What we will add |
| --- | --- |
| 2 | GitHub backup |
| 3 | Supabase database |
| 4 | Real signup and login |

Do not put the Supabase **service role** key in this frontend project. Only the public anon key belongs in `VITE_` environment variables.
