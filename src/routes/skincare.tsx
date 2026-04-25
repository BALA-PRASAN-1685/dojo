import { createFileRoute } from "@tanstack/react-router";
import { AnalyzerPage } from "@/components/AnalyzerPage";

export const Route = createFileRoute("/skincare")({
  head: () => ({
    meta: [
      { title: "Skincare Ritual — SAMURAI" },
      {
        name: "description",
        content:
          "A morning and evening ritual built around your skin. Active ingredients, products, lifestyle levers.",
      },
      { property: "og:title", content: "Skincare Ritual — SAMURAI" },
      {
        property: "og:description",
        content: "AI skincare advisor. Look like you sleep eight hours and drink water.",
      },
    ],
  }),
  component: SkincarePage,
});

function SkincarePage() {
  return (
    <AnalyzerPage
      mode="skincare"
      kicker="IV · Skin"
      title="Stillness of skin."
      intro="A man's face tells the truth before he speaks. Upload a clear photo, describe your concerns, and receive a complete morning and evening ritual — with the right actives, the right cadence, and the lifestyle levers that matter most."
      userImageHint="A clear, well-lit selfie, no filter"
      promptPlaceholder="Skin type, concerns (acne, dark circles, oily T-zone…), and your current routine."
      ctaLabel="Read My Skin"
      examplePrompts={[
        "Build a beginner routine, oily skin",
        "I want to fix dark circles and dullness",
        "Anti-aging plan, mid-thirties",
      ]}
    />
  );
}
