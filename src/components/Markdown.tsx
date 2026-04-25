import ReactMarkdown from "react-markdown";

export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none font-light">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <div className="mt-12 mb-6">
              <div className="hairline mb-4" />
              <h2 className="font-display text-3xl text-bone tracking-tight">
                {children}
              </h2>
            </div>
          ),
          h3: ({ children }) => (
            <h3 className="font-display text-xl text-gold mt-8 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-foreground/85 leading-relaxed mb-4">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-none space-y-2 my-4 pl-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-none space-y-3 my-4 pl-0 counter-reset-list">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="pl-6 relative text-foreground/85 leading-relaxed before:content-['—'] before:absolute before:left-0 before:text-gold">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="text-bone font-medium">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-gold/90 not-italic font-display text-lg">{children}</em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
