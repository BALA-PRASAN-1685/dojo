## Add Fitness — your personal trainer

A sixth discipline at `/fitness` that reads the user's current physique (optional photo) and optional reference physique, then prescribes an elite training program with a photorealistic "target physique" visual — same luxury editorial flow as Walk, Haircut, Clothing, Skincare, Diet.

### What the user gets

- **The Read** — honest assessment of current build, posture, symmetry, weak points
- **Goal & Timeline** — interpreted from their prompt (cut, recomp, build, athletic)
- **The Split** — exact weekly training split (Push/Pull/Legs, Upper/Lower, Bro split, etc.) chosen for their goal & schedule
- **The Program** — each training day with exercises, sets × reps, rest, RPE, and tempo
- **Cardio & Conditioning** — frequency, modality, duration
- **Recovery Protocol** — sleep, mobility, deload cadence
- **Progression Rules** — how to add weight / reps week to week
- **Target Physique image** — AI-generated editorial photo of the prescribed look

### Files to add / change

1. **`src/server/advise.functions.ts`**
   - Extend `Mode` union with `"fitness"`
   - Add `SYSTEM_PROMPTS.fitness` (master trainer voice, structured Markdown matching the format above)
   - Add `buildImagePrompt` case for fitness — editorial gym/studio portrait of the target physique, ink-black & bone palette, no text/logos
   - Update validator's `validModes` array

2. **`src/routes/fitness.tsx`** (new)
   - Mirrors `diet.tsx` structure
   - `kicker: "VI · The Body"`, `title: "Train like it matters."`
   - `needsModelImage: true` (optional reference physique)
   - Example prompts: "Lean recomp, 4 days/week", "Build mass, beginner", "Athletic & functional"

3. **`src/components/Header.tsx`** — add Fitness nav link

4. **`src/routes/index.tsx`** — add Fitness as the sixth discipline card on the landing page

5. **Memory update** — `mem://index.md` Core: change "Five disciplines" → "Six disciplines" and add `/fitness` to the route list

### Technical notes

- Reuses existing `AnalyzerPage` component — zero new UI primitives needed
- Uses the same Lovable AI Gateway call (`google/gemini-2.5-flash` for text + `google/gemini-2.5-flash-image` for the visual) already wired in `advise.functions.ts`
- No DB / auth changes — fully stateless like the other disciplines
- TanStack route plugin auto-regenerates `routeTree.gen.ts` from the new file

Approve and I'll implement.