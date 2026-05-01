import { createFileRoute } from "@tanstack/react-router";
import { AnalyzerPage } from "@/components/AnalyzerPage";

export const Route = createFileRoute("/fitness")({
  head: () => ({
    meta: [
      { title: "Fitness Program — DOJO" },
      {
        name: "description",
        content:
          "Your private trainer. A precise weekly split, exercises with sets and reps, cardio, recovery, and progression rules — built for the body you want.",
      },
      { property: "og:title", content: "Fitness Program — DOJO" },
      {
        property: "og:description",
        content: "AI personal trainer for the modern man.",
      },
    ],
  }),
  component: FitnessPage,
});

function FitnessPage() {
  return (
    <AnalyzerPage
      mode="fitness"
      kicker="VI · The Body"
      title="Train like it matters."
      intro="Strength is earned in silence. Show the master your current form, the physique you study, and your situation — receive a precise weekly split, every set and rep, the cardio, the recovery, and the rules to progress."
      needsModelImage
      userImageHint="Optional: current physique photo"
      modelImageHint="Optional: physique you admire"
      promptPlaceholder="Goal (cut, recomp, build), height, weight, training age, days/week available, equipment (full gym, home, dumbbells), injuries, and any preferences."
      ctaLabel="Build My Program"
      examplePrompts={[
        "Lean recomp, 4 days/week, full gym",
        "Build mass, beginner, 5 days",
        "Athletic & functional, 3 days",
      ]}
    />
  );
}
