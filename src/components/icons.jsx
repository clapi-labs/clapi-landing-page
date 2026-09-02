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

export function ReceiptIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3.5H18V20.5L15.75 19L13.5 20.5L11.25 19L9 20.5L6.75 19L6 20.5V3.5Z" strokeLinejoin="round" />
      <path d="M9 8H15M9 11.5H15M9 15H12.5" />
    </svg>
  );
}

export function BoxIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3L20.5 7.5V16.5L12 21L3.5 16.5V7.5L12 3Z" strokeLinejoin="round" />
      <path d="M3.5 7.5L12 12M12 12L20.5 7.5M12 12V21" />
    </svg>
  );
}

/* ── Públicos a los que hablamos (bloque "no necesitas ser gran empresa") ── */

export function BuildingIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20.5V5.5C4 4.4 4.9 3.5 6 3.5H13C14.1 3.5 15 4.4 15 5.5V20.5" />
      <path d="M15 10.5H19C19.8 10.5 20.5 11.2 20.5 12V20.5" />
      <path d="M2.5 20.5H21.5" />
      <path d="M7.5 7.5H11.5M7.5 11.5H11.5M7.5 15.5H11.5" />
    </svg>
  );
}

export function UserIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="3.75" />
      <path d="M4.5 20.5C4.5 16.9 7.9 14 12 14C16.1 14 19.5 16.9 19.5 20.5" />
    </svg>
  );
}

export function RocketIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5C15.3 5 17 8.6 17 12.5L14.5 15H9.5L7 12.5C7 8.6 8.7 5 12 2.5Z" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="1.8" />
      <path d="M9.5 15L8.5 21L12 18.5L15.5 21L14.5 15" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Pasos del proceso (versión compacta del bloque "a tu medida") ── */

export function ConversationIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 5.5H14V13H7L4 15.5V13H3V5.5Z" strokeLinejoin="round" />
      <path d="M17 9.5H21V17H20V19.5L17 17H11V13" strokeLinejoin="round" />
    </svg>
  );
}

export function BlueprintIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 3.5L20.5 9.5L9 21H3V15L14.5 3.5Z" strokeLinejoin="round" />
      <path d="M12.5 5.5L18.5 11.5" />
    </svg>
  );
}

export function CodeIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M8.5 8L4 12L8.5 16" />
      <path d="M15.5 8L20 12L15.5 16" />
      <path d="M13.5 5L10.5 19" />
    </svg>
  );
}

export function CheckCircleIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.25 12.25L11 15L15.75 9.5" />
    </svg>
  );
}

/* ── Plataformas (bloque "si necesita una app, la construimos") ── */

export function BrowserIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M2.5 9H21.5" />
      <path d="M5.75 6.75H6.25M8.25 6.75H8.75M10.75 6.75H11.25" strokeWidth="2" />
    </svg>
  );
}

export function DesktopIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
      <path d="M9 20.5H15" />
      <path d="M12 16.5V20.5" />
    </svg>
  );
}

export function MobileIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.75 5.5H13.25" />
      <path d="M10.5 18.5H13.5" />
    </svg>
  );
}

/* ── Infraestructura (bloque "tecnología de primer nivel") ── */

export function CloudIcon(props) {
  return (
    <svg {...base} {...props}>
      <path
        d="M7 18.5C4.5 18.5 2.5 16.6 2.5 14.2C2.5 12 4.2 10.2 6.4 10C7.1 7.1 9.8 5 12.9 5C16.5 5 19.4 7.8 19.4 11.2C19.4 11.4 19.4 11.6 19.4 11.8C20.9 12.2 21.5 13.4 21.5 14.7C21.5 16.8 20 18.5 17.6 18.5H7Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BrainIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5.5V19.5" />
      <path d="M12 7C12 5.3 10.7 4 9 4C7.5 4 6.3 5 6.1 6.4C4.6 6.8 3.5 8.1 3.5 9.8C3.5 11 4.1 12.1 5 12.7C4.6 13.3 4.4 14 4.4 14.8C4.4 16.9 6.1 18.6 8.2 18.6C8.6 19.7 9.7 20.5 11 20.5C11.6 20.5 12 20.1 12 19.5" strokeLinejoin="round" />
      <path d="M12 7C12 5.3 13.3 4 15 4C16.5 4 17.7 5 17.9 6.4C19.4 6.8 20.5 8.1 20.5 9.8C20.5 11 19.9 12.1 19 12.7C19.4 13.3 19.6 14 19.6 14.8C19.6 16.9 17.9 18.6 15.8 18.6C15.4 19.7 14.3 20.5 13 20.5C12.4 20.5 12 20.1 12 19.5" strokeLinejoin="round" />
    </svg>
  );
}
