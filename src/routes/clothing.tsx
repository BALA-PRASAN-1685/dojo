import { createFileRoute } from "@tanstack/react-router";
import { AnalyzerPage } from "@/components/AnalyzerPage";

export const Route = createFileRoute("/clothing")({
  head: () => ({
    meta: [
      { title: "Clothing & Style — SAMURAI" },
      {
        name: "description",
        content:
          "Decode any reference outfit and rebuild it for your body. Tailored, smart-casual, weekend variations.",
      },
      { property: "og:title", content: "Clothing & Style — SAMURAI" },
      {
        property: "og:description",
        content: "AI Savile Row stylist. Wear what suits you, with editorial taste.",
      },
    ],
  }),
  component: ClothingPage,
});

function ClothingPage() {
  return (
    <AnalyzerPage
      mode="clothing"
      kicker="III · Cloth"
      title="Wear cloth like you mean it."
      intro="Style is the conversation between body and fabric. Show the master your build and the look you covet — receive a complete outfit built for you, plus three variations and a long-term capsule."
      needsModelImage
      userImageHint="A full-body or half-body photo of you"
      modelImageHint="The look you want to study"
      promptPlaceholder="Where will you wear this? Office, dinner, casual? Any constraints?"
      ctaLabel="Build My Outfit"
      examplePrompts={[
        "Old money look for daily wear",
        "Quiet luxury, neutral palette",
        "Streetwear that still feels grown",
      ]}
    />
  );
}
