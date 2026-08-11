"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The footer's centered brand lockup: the logo mark, a vertical divider, then
 * the "RapKids" wordmark (Nunito). Uses the dedicated, higher-res footer logo
 * (public/brand/rapkids-footer.png); the nav + favicon use the smaller
 * brand/logo.png. If the footer file isn't present yet, the logo and its
 * divider drop out so the wordmark simply centers on its own, rather than
 * leaving a divider floating next to nothing.
 */
export default function BrandLockup() {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div className="flex items-center justify-center gap-4">
      {!failed ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={ref}
            src="/brand/rapkids-footer.png"
            alt="RapKids logo"
            className="h-12 w-auto object-contain"
            onError={() => setFailed(true)}
          />
          <span className="h-8 w-px bg-line/25" aria-hidden />
        </>
      ) : null}
      <span className="font-sans text-3xl font-extrabold tracking-tight">
        Rap<span className="text-punch">Kids</span>
      </span>
    </div>
  );
}
