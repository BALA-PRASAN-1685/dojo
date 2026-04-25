import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-xs tracking-luxe text-gold mb-4">404 — Lost Path</p>
        <h1 className="font-display text-5xl text-bone mb-6">
          This way leads nowhere
        </h1>
        <div className="hairline w-24 mx-auto mb-6" />
        <p className="text-muted-foreground mb-8 font-light">
          The page you seek does not exist in our dojo.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-8 py-3 bg-gold text-gold-foreground tracking-luxe text-xs hover:shadow-[0_0_30px_-5px_oklch(0.75_0.13_80/0.6)] transition-all"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DOJO — The Way of the Modern Man" },
      {
        name: "description",
        content:
          "AI personal style master. Walk like a model, cut your hair to suit you, dress with intention, refine your skin, command your diet.",
      },
      { name: "author", content: "Dojo" },
      { property: "og:title", content: "DOJO — The Way of the Modern Man" },
      {
        property: "og:description",
        content: "AI walk coach, hair, style, skincare and diet advisor for the modern man.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DOJO — The Way of the Modern Man" },
      { name: "description", content: "MODREN AND FITNESS GUIDER WHICH GIVES STEP BY STEP GUIDE" },
      { property: "og:description", content: "MODREN AND FITNESS GUIDER WHICH GIVES STEP BY STEP GUIDE" },
      { name: "twitter:description", content: "MODREN AND FITNESS GUIDER WHICH GIVES STEP BY STEP GUIDE" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/debc0c2b-601c-49fd-9975-00a3ed8c64b2" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/debc0c2b-601c-49fd-9975-00a3ed8c64b2" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
