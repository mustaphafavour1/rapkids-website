"use client";

import { useEffect, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** shown inside the placeholder so you know exactly which file to upload */
  placeholderLabel?: string;
};

/**
 * Renders a transparent PNG asset (comic character, pattern, etc.) if it has
 * been uploaded, and a tasteful labelled placeholder if it hasn't — so the page
 * never looks broken before the real art is dropped in. See /public/ASSETS.md.
 *
 * The server-rendered <img> starts loading before React hydrates, so a fast
 * local 404 can fire its error event before our onError listener is attached.
 * We double-check on mount (img.complete + naturalWidth === 0) to catch that
 * race, in addition to the live onError handler for failures after hydration.
 */
export default function CharacterImage({
  src,
  alt,
  className = "",
  placeholderLabel,
}: Props) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) {
      setFailed(true);
    }
  }, []);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line/30 bg-cream/[0.02] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageIcon className="h-7 w-7 text-faint" aria-hidden />
        <span className="font-mono text-[0.68rem] leading-tight text-faint">
          {placeholderLabel ?? src.replace(/^\//, "")}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
