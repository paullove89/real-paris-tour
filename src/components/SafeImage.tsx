"use client";

import { useState } from "react";
import { withBasePath } from "@/data/site";

type SafeImageProps = {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  loading?: "eager" | "lazy";
};

export function SafeImage({
  src,
  alt,
  className,
  fallbackSrc = "/images/placeholder-tour.svg",
  loading = "lazy",
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(withBasePath(src));
  const resolvedFallbackSrc = withBasePath(fallbackSrc);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => {
        if (currentSrc !== resolvedFallbackSrc) {
          setCurrentSrc(resolvedFallbackSrc);
        }
      }}
    />
  );
}
