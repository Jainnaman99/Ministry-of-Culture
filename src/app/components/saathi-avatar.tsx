// Inline SVG avatar of an Indian character — used for "Sanskriti Saathi" persona.
// Reads as Indian: brown skin, dark hair with fringe, tilak (red dot), saffron kurta with gold collar.
// Stays consistent across light/dark backgrounds and never depends on an external URL.
// useId() makes gradient/clipPath IDs unique per instance so multiple avatars on the same page don't conflict.

import { useId } from "react";

export function SaathiAvatar({ size = 64, className = "" }: { size?: number; className?: string }) {
  const uid = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Sanskriti Saathi avatar"
    >
      <defs>
        <linearGradient id={"saathiBg" + uid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE0B3" />
          <stop offset="100%" stopColor="#FFB870" />
        </linearGradient>
        <linearGradient id={"saathiKurta" + uid} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E87722" />
          <stop offset="100%" stopColor="#B84A00" />
        </linearGradient>
        <clipPath id={"saathiClip" + uid}>
          <circle cx="100" cy="100" r="100" />
        </clipPath>
      </defs>

      {/* Background circle */}
      <circle cx="100" cy="100" r="100" fill={"url(#saathiBg" + uid + ")"} />

      <g clipPath={"url(#saathiClip" + uid + ")"}>
        {/* Hair back layer */}
        <ellipse cx="100" cy="78" rx="46" ry="42" fill="#2a1810" />

        {/* Face */}
        <ellipse cx="100" cy="100" rx="36" ry="40" fill="#C68B5F" />

        {/* Ears */}
        <ellipse cx="64" cy="102" rx="6" ry="9" fill="#B07A50" />
        <ellipse cx="136" cy="102" rx="6" ry="9" fill="#B07A50" />

        {/* Hair front fringe */}
        <path
          d="M64 80 Q72 52 100 50 Q128 52 136 80 Q132 72 118 70 Q108 64 100 64 Q92 64 82 70 Q68 72 64 80 Z"
          fill="#2a1810"
        />

        {/* Eyebrows */}
        <path d="M78 88 Q86 84 94 87" stroke="#1a1208" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M106 87 Q114 84 122 88" stroke="#1a1208" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Eyes */}
        <ellipse cx="86" cy="98" rx="3.2" ry="4" fill="#1a1208" />
        <ellipse cx="114" cy="98" rx="3.2" ry="4" fill="#1a1208" />
        <circle cx="87" cy="97" r="1" fill="#fff" />
        <circle cx="115" cy="97" r="1" fill="#fff" />

        {/* Tilak — small red dot on forehead, classic Indian marker */}
        <circle cx="100" cy="76" r="3.5" fill="#C8102E" />

        {/* Nose */}
        <path d="M100 105 Q97 115 100 118 Q103 115 100 105" fill="#A87151" opacity="0.5" />

        {/* Smile */}
        <path d="M86 122 Q100 132 114 122" stroke="#5C2A0E" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Neck */}
        <rect x="90" y="138" width="20" height="14" fill="#B07A50" />

        {/* Kurta (saffron traditional shirt) */}
        <path d="M48 200 Q48 162 86 150 L114 150 Q152 162 152 200 Z" fill={"url(#saathiKurta" + uid + ")"} />

        {/* Kurta gold collar / V-neck */}
        <path d="M86 150 L100 168 L114 150 L108 150 L100 158 L92 150 Z" fill="#FFD23F" />
        <path d="M100 168 L100 180" stroke="#FFD23F" strokeWidth="2" />
      </g>
    </svg>
  );
}

// Data-URI version for use in <img src=...> where an SVG component cannot be inlined
export const SAATHI_AVATAR_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="b" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFE0B3"/><stop offset="100%" stop-color="#FFB870"/></linearGradient><linearGradient id="k" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#E87722"/><stop offset="100%" stop-color="#B84A00"/></linearGradient><clipPath id="c"><circle cx="100" cy="100" r="100"/></clipPath></defs><circle cx="100" cy="100" r="100" fill="url(#b)"/><g clip-path="url(#c)"><ellipse cx="100" cy="78" rx="46" ry="42" fill="#2a1810"/><ellipse cx="100" cy="100" rx="36" ry="40" fill="#C68B5F"/><ellipse cx="64" cy="102" rx="6" ry="9" fill="#B07A50"/><ellipse cx="136" cy="102" rx="6" ry="9" fill="#B07A50"/><path d="M64 80 Q72 52 100 50 Q128 52 136 80 Q132 72 118 70 Q108 64 100 64 Q92 64 82 70 Q68 72 64 80 Z" fill="#2a1810"/><path d="M78 88 Q86 84 94 87" stroke="#1a1208" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M106 87 Q114 84 122 88" stroke="#1a1208" stroke-width="3" stroke-linecap="round" fill="none"/><ellipse cx="86" cy="98" rx="3.2" ry="4" fill="#1a1208"/><ellipse cx="114" cy="98" rx="3.2" ry="4" fill="#1a1208"/><circle cx="87" cy="97" r="1" fill="#fff"/><circle cx="115" cy="97" r="1" fill="#fff"/><circle cx="100" cy="76" r="3.5" fill="#C8102E"/><path d="M100 105 Q97 115 100 118 Q103 115 100 105" fill="#A87151" opacity="0.5"/><path d="M86 122 Q100 132 114 122" stroke="#5C2A0E" stroke-width="2.5" stroke-linecap="round" fill="none"/><rect x="90" y="138" width="20" height="14" fill="#B07A50"/><path d="M48 200 Q48 162 86 150 L114 150 Q152 162 152 200 Z" fill="url(#k)"/><path d="M86 150 L100 168 L114 150 L108 150 L100 158 L92 150 Z" fill="#FFD23F"/></g></svg>`
  );
