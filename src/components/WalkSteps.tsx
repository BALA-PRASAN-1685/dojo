import { useEffect, useState } from "react";
import { Markdown } from "./Markdown";

interface Step {
  number: number;
  title: string;
  body: string;
}

function parseSteps(content: string): { intro: string; steps: Step[]; outro: string } {
  // Find the "## 8-Step Walk Program" section
  const programIdx = content.search(/##\s+\d?-?Step/i);
  const programIdx2 = content.search(/##\s+8-Step Walk Program/i);
  const startIdx = programIdx2 >= 0 ? programIdx2 : programIdx;

  if (startIdx < 0) return { intro: content, steps: [], outro: "" };

  const intro = content.slice(0, startIdx);

  // Find next ## heading after the program
  const remaining = content.slice(startIdx);
  const headerEnd = remaining.indexOf("\n");
  const afterHeader = remaining.slice(headerEnd + 1);
  const nextHeadingIdx = afterHeader.search(/\n##\s+/);
  const programBody = nextHeadingIdx >= 0 ? afterHeader.slice(0, nextHeadingIdx) : afterHeader;
  const outro = nextHeadingIdx >= 0 ? afterHeader.slice(nextHeadingIdx + 1) : "";

  // Parse "### Step N — Title"
  const stepRegex = /###\s+Step\s+(\d+)\s*[—\-–:]\s*(.+?)\n([\s\S]*?)(?=###\s+Step\s+\d+|$)/g;
  const steps: Step[] = [];
  let match;
  while ((match = stepRegex.exec(programBody)) !== null) {
    steps.push({
      number: parseInt(match[1], 10),
      title: match[2].trim(),
      body: match[3].trim(),
    });
  }
  return { intro, steps, outro };
}

export function WalkSteps({ content }: { content: string }) {
  const { intro, steps, outro } = parseSteps(content);
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay || steps.length === 0) return;
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % steps.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [autoPlay, steps.length]);

  if (steps.length === 0) {
    return <Markdown content={content} />;
  }

  return (
    <div className="space-y-12">
      {intro && <Markdown content={intro} />}

      <div className="luxe-card p-8 md:p-12 relative overflow-hidden grain">
        <div className="hairline mb-6" />
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs tracking-luxe text-gold mb-2">Animated Sequence</p>
            <h2 className="font-display text-3xl md:text-4xl text-bone">
              The {steps.length}-Step Walk
            </h2>
          </div>
          <button
            onClick={() => setAutoPlay((a) => !a)}
            className="text-xs tracking-luxe text-muted-foreground hover:text-gold transition-colors px-4 py-2 border border-border/50 rounded-full"
          >
            {autoPlay ? "❚❚ Pause" : "▶ Play"}
          </button>
        </div>

        {/* Animated step strip */}
        <div className="relative mb-10">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border" />
          <div
            className="absolute top-1/2 left-0 h-px bg-gold transition-all duration-700 ease-out"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />
          <div className="relative flex justify-between">
            {steps.map((s, i) => {
              const isActive = i === activeStep;
              const isPast = i < activeStep;
              return (
                <button
                  key={s.number}
                  onClick={() => {
                    setAutoPlay(false);
                    setActiveStep(i);
                  }}
                  className="relative group"
                  aria-label={`Step ${s.number}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full font-display text-sm flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? "bg-gold text-gold-foreground scale-125 shadow-[0_0_30px_-5px_oklch(0.75_0.13_80/0.8)]"
                        : isPast
                          ? "bg-gold/40 text-bone"
                          : "bg-secondary text-muted-foreground border border-border"
                    }`}
                  >
                    {s.number}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step card with animated transition */}
        <div className="min-h-[260px] relative">
          {steps.map((s, i) => {
            const isActive = i === activeStep;
            return (
              <div
                key={s.number}
                className={`absolute inset-0 transition-all duration-700 ${
                  isActive
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <div className="grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-2">
                    <div className="font-display text-7xl md:text-8xl gradient-gold-text leading-none">
                      0{s.number}
                    </div>
                  </div>
                  <div className="md:col-span-10">
                    <p className="text-xs tracking-luxe text-gold mb-3">
                      Step {s.number} of {steps.length}
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl text-bone mb-5 leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-foreground/85 font-light leading-relaxed text-lg">
                      {s.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {outro && <Markdown content={"## " + outro} />}
    </div>
  );
}
