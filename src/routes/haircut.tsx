import { createFileRoute } from "@tanstack/react-router";
import { AnalyzerPage } from "@/components/AnalyzerPage";

export const Route = createFileRoute("/haircut")({
  head: () => ({
    meta: [
      { title: "Haircut Consultation — SAMURAI" },
      {
        name: "description",
        content:
          "Show your face and a reference haircut. Discover whether it suits you and receive a tailored prescription plus a brief for your barber.",
      },
      { property: "og:title", content: "Haircut Consultation — SAMURAI" },
      {
        property: "og:description",
        content: "AI hair stylist. Find the cut that frames your face.",
      },
    ],
  }),
  component: HaircutPage,
});

function HaircutPage() {
  return (
    <AnalyzerPage
      mode="haircut"
      kicker="II · Crown"
      title="Cut what frames you."
      intro="A haircut is architecture for the face. Show the master your features and the cut you admire. You will leave with a verdict, a prescription, and a brief your barber will respect."
      needsModelImage
      userImageHint="Clear front-on portrait, hair visible"
      modelImageHint="A photo of the haircut you want"
      promptPlaceholder="Tell us about your hair — texture, what you want, what you've struggled with."
      ctaLabel="Read My Hair"
      examplePrompts={[
        "Will this fade work with my receding hairline?",
        "I want low maintenance but still sharp",
        "Recommend a cut for my face shape",
      ]}
    />
  );
}
