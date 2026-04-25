import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-walk.jpg";
import logo from "@/assets/samurai-logo.png";
import { ArrowUpRight, Footprints, Scissors, Shirt, Droplets, Apple } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SAMURAI — The Way of the Modern Man" },
      {
        name: "description",
        content:
          "Walk like a model. Wear what suits you. Look, move, and live with intention. AI mastery for the modern man.",
      },
    ],
  }),
  component: Home,
});

const disciplines = [
  {
    to: "/walk",
    label: "Walk",
    title: "Movement & Presence",
    description:
      "Upload your walk and a model's walk. Receive an 8-step animated breakdown to refine cadence, posture, and silhouette.",
    icon: Footprints,
  },
  {
    to: "/haircut",
    label: "Haircut",
    title: "Crown & Frame",
    description:
      "Show your face and a reference cut. Discover whether it suits you, or get a tailored prescription with a brief for your barber.",
    icon: Scissors,
  },
  {
    to: "/clothing",
    label: "Clothing",
    title: "Silhouette & Cloth",
    description:
      "Decode any look — fabric, fit, palette — and rebuild it for your body. Smart-casual, formal, weekend.",
    icon: Shirt,
  },
  {
    to: "/skincare",
    label: "Skincare",
    title: "Stillness of Skin",
    description:
      "A morning and evening ritual built around your skin. Actives, products, lifestyle levers, what to avoid.",
    icon: Droplets,
  },
  {
    to: "/diet",
    label: "Diet",
    title: "The Earned Plate",
    description:
      "Targets, macros, a day on the plate, training-day vs rest-day rhythm. Eat to look, move, and feel sharp.",
    icon: Apple,
  },
] as const;

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden vignette grain">
        <div className="absolute inset-0">
          <img
            src={hero}
            alt="A man walking through a cinematic corridor"
            className="w-full h-full object-cover opacity-60"
            width={1600}
            height={1200}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-44">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-10 animate-fade-up">
              <img src={logo} alt="" width={28} height={28} className="opacity-90" />
              <p className="text-xs tracking-luxe text-gold">
                Volume I · The Way of the Modern Man
              </p>
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-bone leading-[0.9] mb-8 animate-fade-up delay-100">
              Walk in.<br />
              <span className="italic gradient-gold-text">Be remembered.</span>
            </h1>
            <div className="hairline w-40 mb-8 animate-fade-up delay-200" />
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed mb-12 animate-fade-up delay-300">
              An AI master tailored to one purpose — refining the way you move,
              cut your hair, wear cloth, treat your skin, and feed your body.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up delay-500">
              <Link
                to="/walk"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gold text-gold-foreground tracking-luxe text-xs hover:shadow-[0_0_50px_-10px_oklch(0.75_0.13_80/0.8)] transition-all"
              >
                Begin with the Walk
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/clothing"
                className="inline-flex items-center px-8 py-4 border border-border text-bone tracking-luxe text-xs hover:border-gold transition-all"
              >
                Style Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="max-w-3xl mb-20 animate-fade-up">
          <p className="text-xs tracking-luxe text-gold mb-6">Five Disciplines</p>
          <h2 className="font-display text-5xl md:text-6xl text-bone leading-tight mb-6">
            One master.<br />
            <em className="italic text-gold/90">Five edges.</em>
          </h2>
          <div className="hairline w-32 mb-6" />
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            Each discipline is a private consultation. Bring a photo of yourself,
            sometimes a reference, and your question. Receive a crafted reading.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplines.map((d, i) => {
            const Icon = d.icon;
            return (
              <Link
                key={d.to}
                to={d.to}
                className="group luxe-card p-8 relative overflow-hidden hover:border-gold/50 transition-all animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-8">
                  <Icon className="w-7 h-7 text-gold opacity-80 group-hover:opacity-100 transition-opacity" />
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-xs tracking-luxe text-gold mb-3">{d.label}</p>
                <h3 className="font-display text-2xl text-bone mb-4 leading-tight">
                  {d.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {d.description}
                </p>
                <div className="absolute -bottom-px left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-500" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="max-w-5xl mx-auto px-6 lg:px-12 py-24 text-center">
        <p className="text-xs tracking-luxe text-gold mb-8 animate-fade-up">— Code —</p>
        <blockquote className="font-display text-3xl md:text-5xl text-bone leading-relaxed italic animate-fade-up delay-100">
          "The way you walk into a room is the first sentence
          you ever speak.
          <br />
          <span className="text-gold/90">Make it your own.</span>"
        </blockquote>
        <div className="hairline w-32 mx-auto mt-12 animate-fade-up delay-200" />
      </section>
    </>
  );
}
