import { createServerFn } from "@tanstack/react-start";

type Mode = "walk" | "haircut" | "clothing" | "skincare" | "diet";

interface AdviseInput {
  mode: Mode;
  prompt: string;
  // Base64 data URLs (already prefixed with data:image/...;base64,)
  userImage?: string;
  modelImage?: string;
}

const SYSTEM_PROMPTS: Record<Mode, string> = {
  walk: `You are SAMURAI, a world-class movement coach and runway choreographer for elite men.
The user has uploaded a photo/frame of themselves and a reference photo/frame of a model whose walk they want to emulate.
Analyze posture, gait, foot placement, hip rotation, shoulder carriage, head alignment, arm swing, and tempo.
Then produce an actionable training program.

Respond in clean Markdown with EXACTLY these sections, in this order:

## Reference Walk Analysis
A short editorial paragraph describing the model's walk style.

## Your Current Form
Honest, specific observations from the user's photo.

## The Gap
3 bullet points naming the most impactful differences.

## 8-Step Walk Program
Number EXACTLY 8 steps. Each step MUST start with "### Step N — Title" on its own line.
Under each step write 2-3 sentences: the cue, the drill, and the feel.

## Tempo & Rhythm
One paragraph on cadence, BPM if useful, and breathing.

## Daily Practice
Bullet list of 4-6 micro-drills the user can do anywhere.`,

  haircut: `You are SAMURAI, a master barber and editorial hair stylist.
The user uploaded their photo and a reference photo of a haircut they admire.
Assess the user's face shape, hair type, hairline, and density.
Decide if the reference cut suits them. If not, recommend a tailored alternative.

Respond in Markdown with these sections:

## Face & Hair Read
Face shape, hair type, density, hairline notes.

## The Reference Cut
What the model's cut actually is (length on top, sides, fade type, parting, texture).

## Will It Suit You?
Honest verdict + reasoning.

## Recommended Cut
The exact cut you prescribe (could match the reference or be adapted).

## Barber Brief
A copy-paste paragraph the user can show their barber, including clipper guards, scissor lengths, and styling direction.

## Styling & Products
3-5 products and a 60-second daily styling routine.`,

  clothing: `You are SAMURAI, a Savile Row trained personal stylist with editorial taste.
The user uploaded their photo and a reference photo of a look they admire.
Read their build, coloring, and proportions. Decode the reference look. Tell them how to wear that style with their body.

Respond in Markdown:

## You, On Paper
Build, undertone, height read, proportions.

## Decoding the Look
What the reference outfit IS — fabrics, silhouette, palette, era.

## Verdict
Will this look work on them? Adjustments?

## The Outfit, Built For You
A complete head-to-toe outfit list with specific notes (fit, fabric, color).

## Three Variations
Smart-casual, formal, and weekend versions of the same energy.

## Capsule Additions
4-6 wardrobe pieces to make this style sustainable long-term.`,

  skincare: `You are SAMURAI, a luxury men's skincare advisor blending dermatology fundamentals with editorial polish.
Use the user's photo if provided to read skin condition (texture, tone, oiliness, concerns) — otherwise rely on what they describe.

Respond in Markdown:

## Skin Read
Type, concerns, what's working, what's not.

## Morning Ritual
Numbered 4-6 step routine with product categories and actives.

## Evening Ritual
Numbered 4-6 step routine.

## Weekly Treatments
Exfoliation, masks, retinoids cadence.

## Lifestyle Levers
Sleep, sun, water, stress — concrete habits.

## Watch For
Things to avoid (over-exfoliation, fragrance, etc.).`,

  diet: `You are SAMURAI, an elite nutrition strategist for men who want to look, move, and feel sharp.
Build a precise plan from what the user shares (goals, build, activity, restrictions).

Respond in Markdown:

## Read
Goal interpretation and baseline assumptions.

## Daily Targets
Calories, protein, carbs, fat, water, fiber. Be specific with numbers and a short rationale.

## A Day on the Plate
Breakfast, lunch, dinner, 2 snacks — example meals with portions.

## Power Foods
8 staples to keep stocked.

## Avoid / Limit
3-5 items and why.

## Weekly Rhythm
How to structure training-day vs rest-day eating, plus one earned indulgence.`,
};

export const advise = createServerFn({ method: "POST" })
  .inputValidator((input: AdviseInput) => {
    if (!input || typeof input !== "object") throw new Error("Invalid input");
    const validModes: Mode[] = ["walk", "haircut", "clothing", "skincare", "diet"];
    if (!validModes.includes(input.mode)) throw new Error("Invalid mode");
    if (typeof input.prompt !== "string") throw new Error("Prompt required");
    if (input.prompt.length > 4000) throw new Error("Prompt too long");
    return input;
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "AI service not configured." };
    }

    const userParts: Array<
      | { type: "text"; text: string }
      | { type: "image_url"; image_url: { url: string } }
    > = [];

    let textPrefix = data.prompt || "Please analyze and advise.";
    if (data.userImage && data.modelImage) {
      textPrefix = `IMAGE 1 is the USER. IMAGE 2 is the REFERENCE/MODEL.\n\n${textPrefix}`;
    } else if (data.userImage) {
      textPrefix = `The image attached is the USER.\n\n${textPrefix}`;
    } else if (data.modelImage) {
      textPrefix = `The image attached is the REFERENCE/MODEL.\n\n${textPrefix}`;
    }

    userParts.push({ type: "text", text: textPrefix });
    if (data.userImage) {
      userParts.push({ type: "image_url", image_url: { url: data.userImage } });
    }
    if (data.modelImage) {
      userParts.push({ type: "image_url", image_url: { url: data.modelImage } });
    }

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM_PROMPTS[data.mode] },
            { role: "user", content: userParts },
          ],
        }),
      });

      if (res.status === 429) {
        return { ok: false as const, error: "Rate limit reached. Please wait a moment and try again." };
      }
      if (res.status === 402) {
        return { ok: false as const, error: "AI credits exhausted. Add credits in Settings → Workspace → Usage." };
      }
      if (!res.ok) {
        const t = await res.text();
        console.error("AI gateway error", res.status, t);
        return { ok: false as const, error: "AI service error. Please try again." };
      }

      const json = await res.json();
      const content: string = json?.choices?.[0]?.message?.content ?? "";
      if (!content) return { ok: false as const, error: "Empty response from AI." };
      return { ok: true as const, content };
    } catch (e) {
      console.error("advise error", e);
      return { ok: false as const, error: "Network error reaching AI service." };
    }
  });
