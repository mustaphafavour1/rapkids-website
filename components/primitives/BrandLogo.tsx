"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The RapKids logo mark (public/brand/logo.png). Rendered as a plain <img> that
 * simply hides itself if the file isn't present yet, so the brand lockups fall
 * back to just the "RapKids" wordmark rather than a broken image or a bulky
 * placeholder box. Same hydration-race guard as CharacterImage: a fast local
 * 404 can fire before React attaches onError, so we re-check on mount.
 */
export default function BrandLogo({
  className = "",
  alt = "RapKids logo",
}: {
  className?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src="/brand/logo.png"
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
