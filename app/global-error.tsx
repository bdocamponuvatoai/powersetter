"use client";

import { site } from "@/lib/site";

// Replaces the root layout when it fails, so it cannot rely on globals.css or fonts.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-US">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f6f4ee",
          color: "#0a2238",
          fontFamily: "system-ui, sans-serif",
          padding: "1rem",
        }}
      >
        <main style={{ maxWidth: "32rem" }}>
          <h1 style={{ fontSize: "2.25rem", lineHeight: 1.1 }}>{site.name} is having trouble loading.</h1>
          <p style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
            Please try again, or call <a href={site.phoneHref}>{site.phone}</a>.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              minHeight: 48,
              padding: "0 1.5rem",
              borderRadius: 999,
              border: 0,
              background: "#1668e8",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
