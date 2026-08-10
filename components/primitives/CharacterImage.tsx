"use client";

import { useState } from "react";
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
 */
export default function CharacterImage({
  src,
  alt,
  className = "",
  placeholderLabel,
}: Props) {
  const [failed, setFailed] = useState(false);

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
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
