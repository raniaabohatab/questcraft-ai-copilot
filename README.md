# QuestCraft AI Copilot

A Game Master assistant for **Quest Craft** — a Greek mythology tabletop RPG aimed at kids aged 9–12. Teachers and educators describe what just happened in a session, and the co-pilot suggests warm, age-appropriate ways the story could continue.

## Features

- Describe an unexpected player choice or session moment
- Get **3 possible outcomes**, **read-aloud narration**, a **future consequence** seed, and a **safety note**
- Kid-friendly mythic UI (parchment, deep blues, gold accents)
- **Demo mode** when no API key is set — always runnable with the Stormbristle Boar example
- Error handling with a friendly retry path

## Tech stack

- React + Vite + TypeScript
- Tailwind CSS v4
- Lucide icons
- Anthropic Claude (`claude-sonnet-4-6`) via `POST /api/generate`

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. (Optional) Add an Anthropic API key

Copy the example env file and add your key:

```bash
cp .env.example .env
```

Then edit `.env`:

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

| Where | What to set |
| --- | --- |
| Local Vite dev | `ANTHROPIC_API_KEY` in a `.env` file at the project root |
| Vercel (or similar) | Project → Settings → Environment Variables → `ANTHROPIC_API_KEY` |

**Without a key**, the app still works: `/api/generate` returns a clearly labeled **demo** response for the Stormbristle Boar scenario.

> The API key stays on the server (Vite middleware locally, serverless function on Vercel). It is never exposed to the browser.

### 3. Run locally

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### 4. Build for production

```bash
npm run build
npm run preview
```

For production hosting on **Vercel**, deploy the repo as usual. The serverless handler lives at [`api/generate.ts`](api/generate.ts). Set `ANTHROPIC_API_KEY` in the Vercel project environment.

## How generation works

1. The UI posts `{ sessionEvent: string }` to **`/api/generate`**.
2. The server uses this system prompt:

> You are an AI assistant helping Game Masters run tabletop RPG sessions for children aged 9-12, set in a Greek mythology universe called Quest Craft. When a Game Master describes what just happened in their session, respond with:
> 1. Three distinct possible story outcomes that respect player agency and build on their actual choice (not override it)
> 2. A short narration paragraph (3-4 sentences) the GM could read aloud to the table
> 3. One future consequence — a seed the GM could use later in the campaign
> 4. A one-line safety confirmation that the content is age-appropriate for 9-12 year olds
> Keep everything concise, warm, age-appropriate, mythologically flavored, and free of anything frightening, violent, or inappropriate for children. Always respect that the players' choice already happened — don't suggest ideas that erase or punish their decision. Return your response as JSON with keys: outcomes (array of 3 objects with title and description), narration (string), consequence (string), safetyNote (string).

3. The JSON is parsed and rendered into the output panel.
4. If no key is configured (or the client cannot reach the API), the **Stormbristle Boar** demo payload is shown instead.

## Project structure

```
api/generate.ts              # Vercel serverless POST /api/generate
vite-plugin-generate-api.ts  # Same route for local `npm run dev`
src/
  components/                # Header, InputPanel, OutputPanel, OutcomeCard, …
  data/demoResponse.ts       # Stormbristle Boar demo fallback
  lib/                       # Anthropic client, parsing, system prompt
  types/generation.ts        # Response TypeScript types
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite with local `/api/generate` |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run oxlint |

## Reminder for Game Masters

These are just suggestions — you're always in control. Accept, revise, or ignore them.
