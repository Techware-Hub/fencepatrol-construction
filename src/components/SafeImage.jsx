"use client";
import { useState } from "react";
import Image from "next/image";

export default function SafeImage({ src, alt, fill, width, height, className = "", sizes, priority }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        aria-label={alt}
        className={`bg-gradient-to-br from-brand-panel to-brand-dark ${className}`}
        style={fill ? undefined : { width, height }}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
