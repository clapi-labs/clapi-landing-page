/*
  Set de iconos de línea, minimalista y consistente (24×24, stroke 1.75,
  currentColor) — se usan en morado sobre las cards de "dolor" y "servicios".
  Sin librería externa: son pocos y así no se paga el peso de un icon-pack
  completo por ocho glifos.
*/
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function ClipboardIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="4" width="10" height="15" rx="1.5" />
      <rect x="9" y="2.2" width="4" height="2.6" rx="0.8" />
      <path d="M9.5 10.5H12.5M9.5 13.5H12.5" />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 6.5L12 13L20.5 6.5" />
    </svg>
  );
}

export function ChartIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V10M12 20V4M20 20V14" />
      <path d="M3 20H21" />
    </svg>
  );
}

export function ChatIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5H20V16H10.5L6 19.5V16H4V5.5Z" strokeLinejoin="round" />
      <path d="M8 9.5H16M8 12.5H13" />
    </svg>
  );
}

export function FlowIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="18" cy="12" r="2.2" />
      <path d="M7 6.7L15.8 11M7 17.3L15.8 13" />
    </svg>
  );
}

export function BotIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="9" width="14" height="10" rx="2.5" />
      <path d="M12 5.5V9" />
      <circle cx="12" cy="4" r="1.2" />
      <path d="M9 14V15M15 14V15" strokeWidth="2" />
      <path d="M2.5 12.5V15M21.5 12.5V15" />
    </svg>
  );
}

export function LinkIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M10.5 13.5L13.5 10.5" />
      <path d="M12 6.5L14 4.5C15.5 3 18 3 19.5 4.5C21 6 21 8.5 19.5 10L17.5 12" />
      <path d="M12 17.5L10 19.5C8.5 21 6 21 4.5 19.5C3 18 3 15.5 4.5 14L6.5 12" />
    </svg>
  );
}

export function ClockReportIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12L15 14" />
    </svg>
  );
}
