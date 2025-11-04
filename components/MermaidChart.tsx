"use client";

import mermaid from "mermaid";
import { useEffect, useMemo, useRef, useState } from "react";

mermaid.initialize({ startOnLoad: false, securityLevel: "loose", theme: "default" });

export default function MermaidChart({ chart }: { chart: string }) {
  const id = useMemo(() => `mmd-${Math.random().toString(36).slice(2)}`, []);
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setError(null);
        const { svg } = await mermaid.render(id, chart);
        if (ref.current && !cancelled) {
          ref.current.innerHTML = svg;
        }
      } catch (e: any) {
        setError(e?.message || String(e));
      }
    })();
    return () => { cancelled = true; };
  }, [chart, id]);

  if (error) {
    return <div className="note">?????? ?????????? ?????????: {error}</div>;
  }

  return <div ref={ref} />;
}
