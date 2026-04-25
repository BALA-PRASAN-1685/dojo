import { createFileRoute } from "@tanstack/react-router";
import { AnalyzerPage } from "@/components/AnalyzerPage";

export const Route = createFileRoute("/diet")({
  head: () => ({
    meta: [
      { title: "Diet Strategy — DOJO" },
      {
        name: "description",
        content:
          "Targets, macros, a day on the plate, training-day vs rest-day rhythm. Built for the look, energy, and edge you want.",
      },
      { property: "og:title", content: "Diet Strategy — DOJO" },
      {
        property: "og:description",
        content: "AI nutrition strategist for the modern man.",
      },
    ],
  }),
  component: DietPage,
});

function DietPage() {
  return (
    <AnalyzerPage
      mode="diet"
      kicker="V · The Plate"
      title="Eat to be sharp."
      intro="The body is shaped at the table. Tell the master your goals, your build, your training rhythm — receive precise targets, an example day, and a weekly cadence that earns the body you want."
      userImageHint="Optional: a current physique photo"
      promptPlaceholder="Goal (lean down, gain muscle, maintain), height, weight, activity, allergies, and what you actually like to eat."
      ctaLabel="Build My Plan"
      examplePrompts={[
        "Lean down 8kg over 12 weeks",
        "Gain lean muscle, vegetarian",
        "Maintain, busy desk job",
      ]}
    />
  );
}
