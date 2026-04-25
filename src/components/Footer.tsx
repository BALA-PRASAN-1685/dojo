import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-display text-xl text-bone">
          SAMURAI <span className="text-gold">×</span> The Way of the Modern Man
        </p>
        <div className="flex gap-8 text-xs tracking-luxe text-muted-foreground">
          <Link to="/walk" className="hover:text-gold transition-colors">Walk</Link>
          <Link to="/haircut" className="hover:text-gold transition-colors">Haircut</Link>
          <Link to="/clothing" className="hover:text-gold transition-colors">Clothing</Link>
          <Link to="/skincare" className="hover:text-gold transition-colors">Skincare</Link>
          <Link to="/diet" className="hover:text-gold transition-colors">Diet</Link>
        </div>
      </div>
    </footer>
  );
}
