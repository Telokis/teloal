"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { ReactNode, useState } from "react";

export default function EmotionRootStyleRegistry({ children }: { children: ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cached = createCache({ key: "emotion-cache" });
    cached.compat = true;
    const prevInsert = cached.insert;
    let inserted: Array<string> = [];

    cached.insert = (...args) => {
      const serialized = args[1];

      if (cached.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }

      return prevInsert(...args);
    };

    const flusher = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache: cached, flush: flusher };
  });

  useServerInsertedHTML(() => {
    const names = flush();

    if (names.length === 0) {
      return null;
    }

    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }

    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
