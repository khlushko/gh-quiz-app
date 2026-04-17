# Quiz App

Multi‑brand quiz built with Next.js (App Router), TypeScript and TailwindCSS.
Each brand (Msclr, HeyCys, FitMom, DiaBeat) has its own themed flow with
per‑question routing, conditional visibility and persisted answers.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run test       # unit tests (Vitest)
npm run test:watch # watch mode
npm run lint       # eslint
```

Node 20+ is recommended.

## Routes

- `/` — list of available quizzes.
- `/[quizId]` — brand landing page with hero and CTA (e.g. `/msclr`).
- `/[quizId]/[questionId]` — single question page (e.g. `/msclr/q1`).
- `/[quizId]/loading-result` — fake loading screen shown after submission.
- `/[quizId]/result` — final result with a downloadable JSON summary.

Back / Forward browser buttons navigate between questions because every step
is a real URL pushed via the App Router.

## What's implemented

**Must‑have**
- Multi‑brand support (4 quizzes in `src/mock-data/quizzes/*.json`) with
  per‑brand colors exposed as CSS variables (`--brand-primary`,
  `--brand-accent`) in `app/[quizId]/layout.tsx`.
- Per‑question URLs (`/[quizId]/[questionId]`) with working Back/Forward.
- Landing page (`/`) + brand landing (`/[quizId]`) with "Start the Quiz" CTA.
- Quiz data loaded from local JSON via server actions
  (`src/shared/api/quiz.actions.ts`).
- Conditional visibility through `visibleIf` — see
  `src/entities/quiz/lib/visibility.ts`.
- Flexible, extensible schema via Zod discriminated unions
  (`src/entities/quiz/schemas.ts`) — question types: `single_choice`,
  `multi_choice`, `number`, `info`.
- Client‑side answers store with Zustand + `persist` to `localStorage`
  (`src/shared/store/quiz-store.ts`); answers survive navigation and reloads.
- TailwindCSS v4 via `@tailwindcss/postcss`.

**Nice‑to‑have**
- Fake `loading-result` page (≈2.5 s) before redirecting to the result.
- Analytics events on `window.dataLayer` — `quiz_view`, `quiz_answer`,
  `quiz_submit` (`src/shared/lib/analytics.ts`).
- Unit tests for `visibleIf` and for the quiz fixtures
  (`src/entities/quiz/__tests__/`).

## Key technical decisions

- **Feature‑Sliced layout** (`app/`, `src/entities`, `src/features`,
  `src/widgets`, `src/shared`) — keeps domain logic (`entities/quiz`)
  separate from UI widgets and from the Next.js route layer.
- **Server actions for the mock API** instead of a route handler — the quiz
  JSON is read on the server, validated with Zod and only the needed fields
  are shipped to the client. `generateStaticParams` in
  `app/[quizId]/layout.tsx` pre‑renders brand shells.
- **Zod as the source of truth for the schema.** Types used across the app
  (`Quiz`, `Question`, `VisibleIfCondition`, …) are inferred from schemas in
  `src/entities/quiz/types.ts`, so adding a new question type means adding a
  schema variant to the discriminated union.
- **CSS variables for theming** — the layout sets `--brand-primary` /
  `--brand-accent` once; every component uses `bg-(--brand-primary)` /
  `text-(--brand-primary)`. No per‑brand class maps, no Tailwind config
  variants per brand.
- **Zustand with `skipHydration`** + a small `StoreHydration` client
  component to avoid SSR/CSR mismatch when reading `localStorage`.
- **Navigation driven by `visibleIf`** — `getNextQuestionId` computes the
  visible list from current answers, so conditional skipping works both when
  moving forward and when reading `/[quizId]/[questionId]` directly.

## Differences from the example in the assignment

- URL scheme is `/[quizId]/[questionId]` instead of `/quiz/[id]` to support
  multi‑brand out of the box (the brand is part of the URL).
- `visibleIf` is extended: each condition supports `equals` **or**
  `notEquals`, and each of them accepts a single string or an array of
  strings (matched against string or string[] answers). Multiple conditions
  in the array combine with AND.

## What I would add next

- Match the Figma mockups pixel‑closer: side "Please select answer" hint
  bar on required steps, linear progress loader on the loading page, card
  container with gray page background on desktop.
- Server‑side result generation (personalized plan) instead of a generic
  "Congratulations!" screen with a JSON download.
- More tests: persistence through Zustand, an integration test of the full
  flow with React Testing Library, and E2E (Playwright) covering
  Back/Forward and conditional skipping.
- `aria-live` announcements for progress changes, focus management on the
  question heading when the route changes.
- Error boundaries and a friendlier 404 for unknown quiz / question ids.
- Redirect `/[quizId]/result` back to the landing page if the store has no
  answers for that quiz (prevents deep‑linking to an empty result).
- Move images out of the repo into a CMS or an object storage bucket, with
  proper caching headers, on‑the‑fly resizing and WebP delivery.
- Introduce feature flags or per‑brand subdomains (depending on the goal)
  to roll out brands and experiments independently from deploys.
- Extract more logic from UI components into the Zustand store (selectors
  and actions) so widgets stay thin and the state layer is easier to test
  and reuse.

## Project layout

```
app/                       # App Router routes
  [quizId]/
    [questionId]/page.tsx  # question page
    loading-result/        # fake loading screen
    result/                # final result
    layout.tsx             # brand theming shell
    page.tsx               # brand landing
  page.tsx                 # quiz list
src/
  entities/quiz/           # schemas, types, visibility + navigation logic
  features/answer-question/# per‑question‑type UI (single, multi, number, info)
  widgets/                 # composed UI (question step, header, result, ...)
  shared/
    api/                   # server actions reading mock JSON
    lib/                   # analytics, cn helper
    store/                 # Zustand store + hydration helper
    ui/                    # base button, checkbox, progress
  mock-data/quizzes/*.json # one file per brand
```
