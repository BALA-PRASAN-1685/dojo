import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { advise } from "@/server/advise.functions";
import { MediaDrop } from "./MediaDrop";
import { Markdown } from "./Markdown";
import { WalkSteps } from "./WalkSteps";
import { Loader2, Sparkles } from "lucide-react";

interface Props {
  mode: "walk" | "haircut" | "clothing" | "skincare" | "diet";
  title: string;
  kicker: string;
  intro: string;
  needsModelImage?: boolean;
  userImageHint?: string;
  modelImageHint?: string;
  promptPlaceholder: string;
  ctaLabel?: string;
  examplePrompts?: string[];
}

export function AnalyzerPage({
  mode,
  title,
  kicker,
  intro,
  needsModelImage = false,
  userImageHint,
  modelImageHint,
  promptPlaceholder,
  ctaLabel = "Begin Analysis",
  examplePrompts = [],
}: Props) {
  const adviseFn = useServerFn(advise);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await adviseFn({
        data: {
          mode,
          prompt: prompt.trim() || "Please analyze and advise.",
          userImage: userImage ?? undefined,
          modelImage: modelImage ?? undefined,
        },
      });
      if (res.ok) setResult(res.content);
      else setError(res.error);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
      {/* Editorial header */}
      <div className="max-w-3xl mb-16 animate-fade-up">
        <p className="text-xs tracking-luxe text-gold mb-6">{kicker}</p>
        <h1 className="font-display text-5xl md:text-7xl text-bone leading-[0.95] mb-6">
          {title}
        </h1>
        <div className="hairline w-32 mb-6" />
        <p className="text-lg text-muted-foreground font-light leading-relaxed">
          {intro}
        </p>
      </div>

      {/* Inputs */}
      <div className="grid lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <MediaDrop
            label="You"
            hint={userImageHint || "Full-body works best"}
            value={userImage}
            onChange={setUserImage}
          />
          {needsModelImage && (
            <MediaDrop
              label="Reference"
              hint={modelImageHint || "Who you want to study"}
              value={modelImage}
              onChange={setModelImage}
            />
          )}
        </div>

        <div className="lg:col-span-7 space-y-4">
          <label className="text-xs tracking-luxe text-muted-foreground block">
            Your Question
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={promptPlaceholder}
            rows={6}
            className="w-full luxe-card p-5 text-foreground placeholder:text-muted-foreground/60 font-light leading-relaxed focus:outline-none focus:border-gold/60 transition-colors resize-none"
          />
          {examplePrompts.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPrompt(p)}
                  className="text-xs px-3 py-1.5 border border-border/50 rounded-full text-muted-foreground hover:border-gold/50 hover:text-gold transition-all"
                >
                  {p}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={submit}
            disabled={loading}
            className="group relative w-full md:w-auto px-10 py-4 bg-gold text-gold-foreground font-medium tracking-luxe text-sm overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_40px_-5px_oklch(0.75_0.13_80/0.6)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Consulting…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {ctaLabel}
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Result */}
      {error && (
        <div className="luxe-card border-ember/40 p-6 text-ember animate-fade-up">
          {error}
        </div>
      )}

      {loading && (
        <div className="luxe-card p-12 text-center animate-fade-in">
          <div className="font-display text-2xl text-gold mb-4">
            The dojo is preparing your reading…
          </div>
          <div className="h-1 w-full max-w-md mx-auto bg-secondary rounded-full overflow-hidden">
            <div className="h-full w-1/3 shimmer rounded-full" />
          </div>
        </div>
      )}

      {result && (
        <div className="animate-fade-up">
          {mode === "walk" ? <WalkSteps content={result} /> : <Markdown content={result} />}
        </div>
      )}
    </div>
  );
}
