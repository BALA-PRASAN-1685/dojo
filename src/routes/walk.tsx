import { createFileRoute } from "@tanstack/react-router";
import { AnalyzerPage } from "@/components/AnalyzerPage";

export const Route = createFileRoute("/walk")({
  head: () => ({
    meta: [
      { title: "Walk Analysis — DOJO" },
      {
        name: "description",
        content:
          "Upload your walk and a model's walk. Get an AI 8-step animated breakdown to refine your gait, posture, and presence.",
      },
      { property: "og:title", content: "Walk Analysis — DOJO" },
      {
        property: "og:description",
        content: "AI walk coach. Compare your stride to any model's and receive an 8-step program.",
      },
    ],
  }),
  component: WalkPage,
});

function WalkPage() {
  return (
    <AnalyzerPage
      mode="walk"
      kicker="I · Movement"
      title="Walk like the room is yours."
      intro="Show us how you walk. Show us who you'd walk like. The master will read both, name the gap, and prescribe an eight-step program — animated, drilled, daily."
      needsModelImage
      userImageHint="A side or front clip of you walking"
      modelImageHint="A clip or photo of a model whose walk you study"
      promptPlaceholder="What about this walk speaks to you? What feels off about your own?"
      ctaLabel="Read My Walk"
      examplePrompts={[
        "I want a confident runway walk for daily life",
        "Make me look taller and more grounded",
        "Help me walk less rushed and more intentional",
      ]}
    />
  );
}
