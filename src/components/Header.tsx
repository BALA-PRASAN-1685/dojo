import { Link, useRouterState } from "@tanstack/react-router";
import logo from "@/assets/samurai-logo.png";

const links = [
  { to: "/walk", label: "Walk" },
  { to: "/haircut", label: "Haircut" },
  { to: "/clothing", label: "Clothing" },
  { to: "/skincare", label: "Skincare" },
  { to: "/diet", label: "Diet" },
] as const;

export function Header() {
  const { location } = useRouterState();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Samurai"
            width={36}
            height={36}
            className="opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <span className="font-display text-2xl tracking-wide text-bone">
            SAMURAI
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-xs tracking-luxe transition-colors ${
                  active ? "text-gold" : "text-muted-foreground hover:text-bone"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
