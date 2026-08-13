// One stroked 24×24 icon set, drawn inline so the app ships with no icon
// dependency and every glyph inherits currentColor.

const paths = {
  pool: (
    <>
      <path d="M2 16c1.6-1.6 3.4-1.6 5 0s3.4 1.6 5 0 3.4-1.6 5 0 3.4 1.6 5 0" />
      <path d="M2 20.5c1.6-1.6 3.4-1.6 5 0s3.4 1.6 5 0 3.4-1.6 5 0 3.4 1.6 5 0" />
      <path d="M8 15V5a2 2 0 0 1 4 0M16 15V5a2 2 0 0 0-4 0" />
      <path d="M8 9h4" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="8" r="4" />
      <path d="M10.8 10.8 21 21M17.5 17.5l2-2M14.5 14.5l2-2" />
    </>
  ),
  star: <path d="m12 3 2.7 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17.3 6.4 20.3l1.2-6.3L3 9.6l6.3-.8L12 3Z" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  wifi: (
    <>
      <path d="M2.5 9a15 15 0 0 1 19 0M5.5 12.5a10.5 10.5 0 0 1 13 0M8.5 16a6 6 0 0 1 7 0" />
      <circle cx="12" cy="19.5" r="1" fill="currentColor" />
    </>
  ),
  kitchen: (
    <>
      <path d="M6 3v7a2 2 0 0 0 4 0V3M8 12v9" />
      <path d="M17 3c-1.5 1.5-2 3-2 5.5 0 1.5.7 2.5 2 2.5M17 3c1.5 1.5 2 3 2 5.5 0 1.5-.7 2.5-2 2.5m0 0v10" />
    </>
  ),
  bbq: (
    <>
      <path d="M4 7h16a8 8 0 0 1-8 8 8 8 0 0 1-8-8Z" />
      <path d="M9 15l-2 6M15 15l2 6M7.5 18h9M12 3v2" />
    </>
  ),
  ac: (
    <>
      <rect x="2" y="4" width="20" height="9" rx="2" />
      <path d="M6 9h12M7 17c0 1.5 1 2 1 3M12 17c0 1.5 1 2 1 3M17 17c0 1.5 1 2 1 3" />
    </>
  ),
  parking: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M10 17V8h3a2.5 2.5 0 0 1 0 5h-3" />
    </>
  ),
  tv: (
    <>
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  washer: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <circle cx="12" cy="14" r="4" />
      <path d="M8 6h.01M11 6h.01" />
    </>
  ),
  workspace: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M2 20h20" />
    </>
  ),
  fire: <path d="M12 3c.5 3-2 4-3.5 6.5A6 6 0 0 0 12 21a6 6 0 0 0 6-6c0-3.5-3-5-4-8-1.2 1.6-1.2 3-2 4 0-2.5-1-6 0-8Z" />,
  crib: (
    <>
      <path d="M3 7v13M21 7v13M8 9v9M13 9v9M18 9v9M3 9h18M2 20h20" />
    </>
  ),
  pet: (
    <>
      <circle cx="6" cy="10" r="2" />
      <circle cx="10" cy="6" r="2" />
      <circle cx="15" cy="6.5" r="2" />
      <circle cx="19" cy="11" r="2" />
      <path d="M12.5 12c-2 0-4 1.6-4.6 3.6-.5 1.7.5 3.4 2.3 3.4h4.6c1.8 0 2.8-1.7 2.3-3.4-.6-2-2.6-3.6-4.6-3.6Z" />
    </>
  ),
  guests: (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21a7 7 0 0 1 14 0M17.5 4.5a4 4 0 0 1 0 7M18 14a7 7 0 0 1 4 7" />
    </>
  ),
  bed: (
    <>
      <path d="M3 19V6M3 12h18v7M21 19v-3" />
      <circle cx="8" cy="9.5" r="2" />
      <path d="M12 12V9a1 1 0 0 1 1-1h6a2 2 0 0 1 2 2v2" />
    </>
  ),
  bath: (
    <>
      <path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-3Z" />
      <path d="M6 12V5a2 2 0 0 1 4 0M6.5 20l-1 2M17.5 20l1 2" />
    </>
  ),
  door: (
    <>
      <path d="M4 21V4a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v17M2 21h20" />
      <circle cx="13.5" cy="12" r="1" fill="currentColor" />
    </>
  ),
  map: (
    <>
      <path d="M9 3 3 5.5v16L9 19l6 2.5 6-2.5v-16L15 5.5 9 3Z" />
      <path d="M9 3v16M15 5.5v16" />
    </>
  ),
  phone: (
    <path d="M7 3h3l1.5 4.5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2L21 14v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.2 2 2 0 0 1 6 3h1Z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4.5 4.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
    </>
  ),
  menu: <path d="M3 7h18M3 12h18M3 17h18" />,
  heart: <path d="M12 20.5 4.2 13a4.9 4.9 0 0 1 0-7 4.9 4.9 0 0 1 7 0l.8.8.8-.8a4.9 4.9 0 0 1 7 0 4.9 4.9 0 0 1 0 7L12 20.5Z" />,
  share: (
    <>
      <path d="M12 15V3M8.5 6.5 12 3l3.5 3.5" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevronLeft: <path d="m15 4-8 8 8 8" />,
  chevronRight: <path d="m9 4 8 8-8 8" />,
  chevronDown: <path d="m5 9 7 7 7-7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m4 12.5 5 5L20 6.5" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7.5h.01" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 4.4 3.2 8.2 8 9 4.8-.8 8-4.6 8-9V6l-8-3Z" />
      <path d="m8.5 12 2.5 2.5 4.5-4.5" />
    </>
  ),
  verified: (
    <>
      <path d="m12 2 2.4 2.1 3.2-.3.6 3.1 2.8 1.6-1.4 2.9 1.4 2.9-2.8 1.6-.6 3.1-3.2-.3L12 22l-2.4-2.1-3.2.3-.6-3.1-2.8-1.6L4.4 12 3 9.1l2.8-1.6.6-3.1 3.2.3L12 2Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </>
  ),
}

export default function Icon({ name, size = 24, filled = false, className = '', ...rest }) {
  const glyph = paths[name]
  if (!glyph) return null
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph}
    </svg>
  )
}
