import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// ===== CLAY BASE COMPONENT =====
function ClayIcon({ size = 48, className, children, bg, innerShadow, highlight }: {
  size: number; className?: string; bg: string; innerShadow: string; highlight: string;
  children: React.ReactNode;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
      <defs>
        <filter id={`clay-${bg.replace('#','')}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor={bg} floodOpacity="0.4"/>
        </filter>
        <radialGradient id={`hi-${bg.replace('#','')}`} cx="35%" cy="30%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="18" fill={bg}
        filter={`url(#clay-${bg.replace('#','')})`}/>
      <rect x="8" y="6" width="48" height="48" rx="16" fill={bg}/>
      <rect x="8" y="6" width="48" height="48" rx="16" fill={innerShadow} opacity="0.3"/>
      <rect x="8" y="6" width="48" height="48" rx="16"
        fill={`url(#hi-${bg.replace('#','')})`}/>
      {children}
    </svg>
  );
}

// ===== CATEGORY ICONS =====
export function ClayGames({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#a78bfa"
      innerShadow="url(#inner-dark)" highlight="#c4b5fd">
      <defs>
        <linearGradient id="clay-games-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
      {/* Controller body */}
      <rect x="16" y="26" width="32" height="16" rx="8" fill="white" opacity="0.25"/>
      <rect x="18" y="28" width="28" height="12" rx="6" stroke="white" strokeWidth="2" fill="none" opacity="0.9"/>
      {/* D-pad */}
      <rect x="22" y="31" width="2" height="6" rx="1" fill="white" opacity="0.9"/>
      <rect x="20" y="33" width="6" height="2" rx="1" fill="white" opacity="0.9"/>
      {/* Buttons */}
      <circle cx="40" cy="32" r="1.5" fill="#c4b5fd"/>
      <circle cx="43" cy="34" r="1.5" fill="#c4b5fd"/>
      <circle cx="40" cy="36" r="1.5" fill="#c4b5fd"/>
      <circle cx="37" cy="34" r="1.5" fill="#c4b5fd"/>
      {/* Sticks */}
      <circle cx="27" cy="25" r="3" fill="white" opacity="0.2"/>
      <circle cx="27" cy="25" r="2" stroke="white" strokeWidth="1.5" fill="none" opacity="0.7"/>
    </ClayIcon>
  );
}

export function ClaySoftware({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#60a5fa"
      innerShadow="url(#inner-dark)" highlight="#93c5fd">
      {/* Screen */}
      <rect x="15" y="16" width="34" height="24" rx="4" fill="white" opacity="0.2"/>
      <rect x="17" y="18" width="30" height="20" rx="3" stroke="white" strokeWidth="2" fill="none" opacity="0.9"/>
      {/* Screen content */}
      <rect x="21" y="22" width="10" height="3" rx="1.5" fill="white" opacity="0.5"/>
      <rect x="21" y="27" width="16" height="2" rx="1" fill="white" opacity="0.3"/>
      <rect x="21" y="31" width="12" height="2" rx="1" fill="white" opacity="0.3"/>
      {/* Stand */}
      <rect x="26" y="40" width="12" height="2" rx="1" fill="white" opacity="0.5"/>
      <rect x="22" y="42" width="20" height="2" rx="1" fill="white" opacity="0.7"/>
    </ClayIcon>
  );
}

export function ClayOperatingSystem({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#38bdf8"
      innerShadow="url(#inner-dark)" highlight="#7dd3fc">
      {/* Monitor */}
      <rect x="14" y="12" width="36" height="28" rx="5" fill="white" opacity="0.2"/>
      <rect x="16" y="14" width="32" height="24" rx="4" stroke="white" strokeWidth="2" fill="none" opacity="0.9"/>
      {/* Screen glass */}
      <rect x="20" y="18" width="24" height="16" rx="2" fill="white" opacity="0.15"/>
      {/* Windows logo - 4 panes */}
      <rect x="25" y="21" width="6" height="6" rx="1" fill="white" opacity="0.8"/>
      <rect x="33" y="21" width="6" height="6" rx="1" fill="white" opacity="0.6"/>
      <rect x="25" y="29" width="6" height="3" rx="1" fill="white" opacity="0.6"/>
      <rect x="33" y="29" width="6" height="3" rx="1" fill="white" opacity="0.4"/>
      {/* Stand */}
      <rect x="26" y="40" width="12" height="3" rx="1.5" fill="white" opacity="0.5"/>
      <rect x="22" y="43" width="20" height="2.5" rx="1.2" fill="white" opacity="0.7"/>
      {/* Screen glow */}
      <ellipse cx="32" cy="28" rx="8" ry="6" fill="white" opacity="0.08"/>
    </ClayIcon>
  );
}

export function ClayWin11Pro({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#0ea5e9"
      innerShadow="url(#inner-dark)" highlight="#7dd3fc">
      {/* Monitor */}
      <rect x="12" y="10" width="40" height="30" rx="5" fill="white" opacity="0.2"/>
      <rect x="14" y="12" width="36" height="26" rx="4" stroke="white" strokeWidth="2" fill="none" opacity="0.9"/>
      {/* Screen glass */}
      <rect x="18" y="16" width="28" height="18" rx="2" fill="white" opacity="0.12"/>
      {/* Win11 style - 4 separate rounded panes */}
      <rect x="23" y="19" width="7" height="7" rx="1.5" fill="white" opacity="0.85"/>
      <rect x="34" y="19" width="7" height="7" rx="1.5" fill="white" opacity="0.65"/>
      <rect x="23" y="30" width="7" height="3" rx="1" fill="white" opacity="0.65"/>
      <rect x="34" y="30" width="7" height="3" rx="1" fill="white" opacity="0.45"/>
      {/* PRO badge */}
      <rect x="24" y="26" width="16" height="5" rx="2.5" fill="white" opacity="0.35"/>
      <text x="32" y="30.2" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold" opacity="0.9">PRO</text>
      {/* Stand */}
      <rect x="26" y="40" width="12" height="3" rx="1.5" fill="white" opacity="0.5"/>
      <rect x="22" y="43" width="20" height="2.5" rx="1.2" fill="white" opacity="0.7"/>
      {/* Screen glow */}
      <ellipse cx="32" cy="26" rx="10" ry="7" fill="white" opacity="0.06"/>
    </ClayIcon>
  );
}

export function ClayWin11Home({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#38bdf8"
      innerShadow="url(#inner-dark)" highlight="#bae6fd">
      {/* Monitor */}
      <rect x="12" y="10" width="40" height="30" rx="5" fill="white" opacity="0.2"/>
      <rect x="14" y="12" width="36" height="26" rx="4" stroke="white" strokeWidth="2" fill="none" opacity="0.9"/>
      {/* Screen */}
      <rect x="18" y="16" width="28" height="18" rx="2" fill="white" opacity="0.12"/>
      {/* Win11 logo - 4 separate panes */}
      <rect x="24" y="20" width="6" height="6" rx="1.5" fill="white" opacity="0.8"/>
      <rect x="34" y="20" width="6" height="6" rx="1.5" fill="white" opacity="0.6"/>
      <rect x="24" y="30" width="6" height="3" rx="1" fill="white" opacity="0.6"/>
      <rect x="34" y="30" width="6" height="3" rx="1" fill="white" opacity="0.4"/>
      {/* Home icon */}
      <path d="M22 34l10-7 10 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      <rect x="29" y="34" width="6" height="4" rx="0.5" fill="white" opacity="0.3"/>
      {/* HOME badge */}
      <rect x="22" y="27" width="20" height="5" rx="2.5" fill="white" opacity="0.3"/>
      <text x="32" y="31" textAnchor="middle" fill="white" fontSize="3.5" fontWeight="bold" opacity="0.85">HOME</text>
      {/* Stand */}
      <rect x="26" y="40" width="12" height="3" rx="1.5" fill="white" opacity="0.5"/>
      <rect x="22" y="43" width="20" height="2.5" rx="1.2" fill="white" opacity="0.7"/>
    </ClayIcon>
  );
}

export function ClayWin11LTSC({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#06b6d4"
      innerShadow="url(#inner-dark)" highlight="#67e8f9">
      {/* Monitor */}
      <rect x="12" y="10" width="40" height="30" rx="5" fill="white" opacity="0.2"/>
      <rect x="14" y="12" width="36" height="26" rx="4" stroke="white" strokeWidth="2" fill="none" opacity="0.9"/>
      {/* Screen */}
      <rect x="18" y="16" width="28" height="18" rx="2" fill="white" opacity="0.12"/>
      {/* Win11 logo */}
      <rect x="25" y="18" width="5.5" height="5.5" rx="1" fill="white" opacity="0.75"/>
      <rect x="33.5" y="18" width="5.5" height="5.5" rx="1" fill="white" opacity="0.6"/>
      <rect x="25" y="26.5" width="5.5" height="3" rx="1" fill="white" opacity="0.6"/>
      <rect x="33.5" y="26.5" width="5.5" height="3" rx="1" fill="white" opacity="0.45"/>
      {/* Shield */}
      <path d="M32 33l-5 2.5v3c0 3 2 5.5 5 6.5 3-1 5-3.5 5-6.5v-3L32 33z"
        stroke="white" strokeWidth="1.2" fill="white" fillOpacity="0.2" opacity="0.7"/>
      <path d="M30 38l2 2 3-3" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
      {/* LTSC badge */}
      <rect x="21" y="23" width="22" height="4.5" rx="2.2" fill="white" opacity="0.3"/>
      <text x="32" y="26.8" textAnchor="middle" fill="white" fontSize="3.5" fontWeight="bold" opacity="0.9">LTSC</text>
      {/* Stand */}
      <rect x="26" y="40" width="12" height="3" rx="1.5" fill="white" opacity="0.5"/>
      <rect x="22" y="43" width="20" height="2.5" rx="1.2" fill="white" opacity="0.7"/>
    </ClayIcon>
  );
}

export function ClayWin10Pro({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#2563eb"
      innerShadow="url(#inner-dark)" highlight="#60a5fa">
      {/* Monitor */}
      <rect x="12" y="10" width="40" height="30" rx="5" fill="white" opacity="0.2"/>
      <rect x="14" y="12" width="36" height="26" rx="4" stroke="white" strokeWidth="2" fill="none" opacity="0.9"/>
      {/* Screen */}
      <rect x="18" y="16" width="28" height="18" rx="2" fill="white" opacity="0.12"/>
      {/* Win10 classic logo - perspective 4 panes */}
      <path d="M22 19h10v10H22z" fill="white" opacity="0.7"/>
      <path d="M34 19h10v10H34z" fill="white" opacity="0.55"/>
      <path d="M22 31h10v4H22z" fill="white" opacity="0.55"/>
      <path d="M34 31h10v4H34z" fill="white" opacity="0.4"/>
      {/* PRO badge */}
      <rect x="24" y="27" width="16" height="5" rx="2.5" fill="white" opacity="0.35"/>
      <text x="32" y="31.2" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold" opacity="0.9">PRO</text>
      {/* Stand */}
      <rect x="26" y="40" width="12" height="3" rx="1.5" fill="white" opacity="0.5"/>
      <rect x="22" y="43" width="20" height="2.5" rx="1.2" fill="white" opacity="0.7"/>
      {/* Glow */}
      <ellipse cx="32" cy="25" rx="10" ry="7" fill="white" opacity="0.06"/>
    </ClayIcon>
  );
}

export function ClayWin10Home({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#3b82f6"
      innerShadow="url(#inner-dark)" highlight="#93c5fd">
      {/* Monitor */}
      <rect x="12" y="10" width="40" height="30" rx="5" fill="white" opacity="0.2"/>
      <rect x="14" y="12" width="36" height="26" rx="4" stroke="white" strokeWidth="2" fill="none" opacity="0.9"/>
      {/* Screen */}
      <rect x="18" y="16" width="28" height="18" rx="2" fill="white" opacity="0.12"/>
      {/* Win10 classic logo */}
      <path d="M23 20h9v9h-9z" fill="white" opacity="0.7"/>
      <path d="M34 20h9v9h-9z" fill="white" opacity="0.55"/>
      <path d="M23 31h9v3h-9z" fill="white" opacity="0.55"/>
      <path d="M34 31h9v3h-9z" fill="white" opacity="0.4"/>
      {/* House icon */}
      <path d="M22 35l10-7 10 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
      {/* HOME badge */}
      <rect x="22" y="27" width="20" height="5" rx="2.5" fill="white" opacity="0.3"/>
      <text x="32" y="31" textAnchor="middle" fill="white" fontSize="3.5" fontWeight="bold" opacity="0.85">HOME</text>
      {/* Stand */}
      <rect x="26" y="40" width="12" height="3" rx="1.5" fill="white" opacity="0.5"/>
      <rect x="22" y="43" width="20" height="2.5" rx="1.2" fill="white" opacity="0.7"/>
    </ClayIcon>
  );
}

export function ClayWin10LTSC({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#1d4ed8"
      innerShadow="url(#inner-dark)" highlight="#60a5fa">
      {/* Monitor */}
      <rect x="12" y="10" width="40" height="30" rx="5" fill="white" opacity="0.2"/>
      <rect x="14" y="12" width="36" height="26" rx="4" stroke="white" strokeWidth="2" fill="none" opacity="0.9"/>
      {/* Screen */}
      <rect x="18" y="16" width="28" height="18" rx="2" fill="white" opacity="0.12"/>
      {/* Win10 logo */}
      <path d="M23 19h8v8h-8z" fill="white" opacity="0.7"/>
      <path d="M35 19h8v8h-8z" fill="white" opacity="0.55"/>
      <path d="M23 29h8v3h-8z" fill="white" opacity="0.55"/>
      <path d="M35 29h8v3h-8z" fill="white" opacity="0.4"/>
      {/* Shield + Gear */}
      <path d="M32 34l-5 2.5v3c0 3 2 5.5 5 6.5 3-1 5-3.5 5-6.5v-3L32 34z"
        stroke="white" strokeWidth="1.2" fill="white" fillOpacity="0.2" opacity="0.65"/>
      <circle cx="32" cy="38.5" r="2" stroke="white" strokeWidth="0.8" fill="none" opacity="0.5"/>
      {/* LTSC badge */}
      <rect x="21" y="25.5" width="22" height="4.5" rx="2.2" fill="white" opacity="0.3"/>
      <text x="32" y="29.3" textAnchor="middle" fill="white" fontSize="3.5" fontWeight="bold" opacity="0.9">LTSC</text>
      {/* Stand */}
      <rect x="26" y="40" width="12" height="3" rx="1.5" fill="white" opacity="0.5"/>
      <rect x="22" y="43" width="20" height="2.5" rx="1.2" fill="white" opacity="0.7"/>
    </ClayIcon>
  );
}

export function ClayGiftCard({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#f472b6"
      innerShadow="url(#inner-dark)" highlight="#f9a8d4">
      {/* Card body */}
      <rect x="12" y="20" width="40" height="26" rx="5" fill="white" opacity="0.2"/>
      <rect x="14" y="22" width="36" height="22" rx="4" stroke="white" strokeWidth="2" fill="none" opacity="0.9"/>
      {/* Ribbon */}
      <rect x="28" y="16" width="8" height="34" rx="2" fill="white" opacity="0.15"/>
      {/* Bow */}
      <path d="M26 22c0-3 2-5 4-5" stroke="white" strokeWidth="1.5" fill="none" opacity="0.8"/>
      <path d="M34 22c0-3-2-5-4-5" stroke="white" strokeWidth="1.5" fill="none" opacity="0.8"/>
      <circle cx="30" cy="22" r="2" fill="white" opacity="0.6"/>
      {/* Shine */}
      <line x1="18" y1="30" x2="28" y2="30" stroke="white" strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
      <line x1="18" y1="34" x2="24" y2="34" stroke="white" strokeWidth="1" opacity="0.2" strokeLinecap="round"/>
    </ClayIcon>
  );
}

export function ClaySubscription({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#34d399"
      innerShadow="url(#inner-dark)" highlight="#6ee7b7">
      {/* Bell body */}
      <path d="M32 18c-8 0-14 5-14 14v6c0 1 0 2 1 3h26c1-1 1-2 1-3v-6c0-9-6-14-14-14z"
        fill="white" opacity="0.2" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      {/* Bell top */}
      <circle cx="32" cy="18" r="2.5" fill="white" opacity="0.7"/>
      {/* Clapper */}
      <ellipse cx="32" cy="42" rx="3" ry="2.5" fill="white" opacity="0.6"/>
      {/* Sound lines */}
      <path d="M46 26c2 1 3 3 3 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M49 24c3 2 4 5 4 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
      {/* Sparkle */}
      <circle cx="22" cy="24" r="1" fill="white" opacity="0.5"/>
    </ClayIcon>
  );
}

export function ClayCourse({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#fbbf24"
      innerShadow="url(#inner-dark)" highlight="#fcd34d">
      {/* Book pages */}
      <path d="M14 16h18c2 0 3 1 3 3v26c0-2-1-3-3-3H14V16z"
        fill="white" opacity="0.2" stroke="white" strokeWidth="2"/>
      <path d="M50 16H32c-2 0-3 1-3 3v26c0-2 1-3 3-3h18V16z"
        fill="white" opacity="0.15" stroke="white" strokeWidth="2"/>
      {/* Spine */}
      <path d="M32 16v32" stroke="white" strokeWidth="1" opacity="0.4"/>
      {/* Lines */}
      <line x1="18" y1="24" x2="28" y2="24" stroke="white" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
      <line x1="18" y1="28" x2="26" y2="28" stroke="white" strokeWidth="1.5" opacity="0.3" strokeLinecap="round"/>
      <line x1="36" y1="24" x2="46" y2="24" stroke="white" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
      {/* Graduation cap */}
      <path d="M32 10l8 4-8 4-8-4 8-4z" fill="white" opacity="0.6"/>
      <path d="M24 16v8c0 2 4 4 8 4s8-2 8-4v-8" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4"/>
    </ClayIcon>
  );
}

// ===== UI ICONS =====
export function ClayCart({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#c084fc"
      innerShadow="url(#inner-dark)" highlight="#d8b4fe">
      {/* Cart body */}
      <path d="M16 20h4l4 18h20l4-14H22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Wheels */}
      <circle cx="26" cy="44" r="3" fill="white" opacity="0.6"/>
      <circle cx="38" cy="44" r="3" fill="white" opacity="0.6"/>
      <circle cx="26" cy="44" r="1.5" fill="white" opacity="0.3"/>
      <circle cx="38" cy="44" r="1.5" fill="white" opacity="0.3"/>
      {/* Items */}
      <rect x="28" y="24" width="4" height="4" rx="1" fill="white" opacity="0.4"/>
      <rect x="34" y="26" width="3" height="3" rx="1" fill="white" opacity="0.3"/>
    </ClayIcon>
  );
}

export function ClaySearch({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#67e8f9"
      innerShadow="url(#inner-dark)" highlight="#a5f3fc">
      {/* Lens */}
      <circle cx="30" cy="28" r="12" stroke="white" strokeWidth="3" fill="white" opacity="0.15"/>
      <circle cx="30" cy="28" r="9" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4"/>
      {/* Handle */}
      <path d="M39 37l8 8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      {/* Shine */}
      <circle cx="26" cy="24" r="3" fill="white" opacity="0.3"/>
    </ClayIcon>
  );
}

export function ClayHeart({ size = 64, className, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <ClayIcon size={size} className={className} bg="#fb7185"
      innerShadow="url(#inner-dark)" highlight="#fda4af">
      <path d="M32 48S14 36 14 24a10 10 0 0118-6 10 10 0 0118 6c0 12-18 24-18 24z"
        fill={filled ? 'white' : 'white'} fillOpacity={filled ? 0.5 : 0.15}
        stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Shine */}
      <circle cx="24" cy="22" r="3" fill="white" opacity="0.3"/>
    </ClayIcon>
  );
}

export function ClayStar({ size = 64, className, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <ClayIcon size={size} className={className} bg="#fbbf24"
      innerShadow="url(#inner-dark)" highlight="#fde68a">
      <path d="M32 14l6 12.6 14 1.8-10 9.6L44 50 32 43.4 20 50l2-12-10-9.6 14-1.8L32 14z"
        fill={filled ? 'white' : 'white'} fillOpacity={filled ? 0.5 : 0.15}
        stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="28" cy="26" r="2" fill="white" opacity="0.3"/>
    </ClayIcon>
  );
}

export function ClayFilter({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#818cf8"
      innerShadow="url(#inner-dark)" highlight="#a5b4fc">
      <path d="M16 20h32M20 32h24M26 44h12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="24" cy="20" r="3.5" fill="white" opacity="0.5" stroke="white" strokeWidth="1.5"/>
      <circle cx="36" cy="32" r="3.5" fill="white" opacity="0.5" stroke="white" strokeWidth="1.5"/>
      <circle cx="30" cy="44" r="3.5" fill="white" opacity="0.5" stroke="white" strokeWidth="1.5"/>
    </ClayIcon>
  );
}

export function ClayDownload({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#34d399"
      innerShadow="url(#inner-dark)" highlight="#6ee7b7">
      <path d="M32 16v22" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      <path d="M24 30l8 8 8-8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 42h28" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </ClayIcon>
  );
}

export function ClayUpload({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#60a5fa"
      innerShadow="url(#inner-dark)" highlight="#93c5fd">
      <path d="M32 38V16" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      <path d="M24 24l8-8 8 8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 42h28" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </ClayIcon>
  );
}

export function ClayTrash({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#f87171"
      innerShadow="url(#inner-dark)" highlight="#fca5a5">
      <path d="M20 22h24" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M24 22V16a2 2 0 012-2h12a2 2 0 012 2v6" stroke="white" strokeWidth="2" fill="none"/>
      <path d="M22 22l2 26a2 2 0 002 2h12a2 2 0 002-2l2-26" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.15"/>
      <path d="M28 26v14M36 26v14" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </ClayIcon>
  );
}

export function ClayEdit({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#fbbf24"
      innerShadow="url(#inner-dark)" highlight="#fde68a">
      <path d="M40 16l8 8-24 24H16v-8L40 16z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="white" fillOpacity="0.15"/>
      <path d="M36 20l8 8" stroke="white" strokeWidth="2"/>
      <path d="M16 50h32" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    </ClayIcon>
  );
}

export function ClayPlus({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#34d399"
      innerShadow="url(#inner-dark)" highlight="#6ee7b7">
      <path d="M32 22v20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      <path d="M22 32h20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    </ClayIcon>
  );
}

export function ClayCheck({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#34d399"
      innerShadow="url(#inner-dark)" highlight="#6ee7b7">
      <path d="M22 32l7 7 13-13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    </ClayIcon>
  );
}

export function ClayClose({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#f87171"
      innerShadow="url(#inner-dark)" highlight="#fca5a5">
      <path d="M22 22l20 20M42 22L22 42" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    </ClayIcon>
  );
}

export function ClaySettings({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#94a3b8"
      innerShadow="url(#inner-dark)" highlight="#cbd5e1">
      <circle cx="32" cy="32" r="6" stroke="white" strokeWidth="2.5" fill="white" fillOpacity="0.15"/>
      <circle cx="32" cy="32" r="2.5" fill="white" opacity="0.6"/>
      {[0,45,90,135,180,225,270,315].map(angle => (
        <line key={angle}
          x1={32 + 10 * Math.cos(angle * Math.PI / 180)}
          y1={32 + 10 * Math.sin(angle * Math.PI / 180)}
          x2={32 + 14 * Math.cos(angle * Math.PI / 180)}
          y2={32 + 14 * Math.sin(angle * Math.PI / 180)}
          stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
      ))}
    </ClayIcon>
  );
}

// ===== PAYMENT ICONS =====
export function ClayCreditCard({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#818cf8"
      innerShadow="url(#inner-dark)" highlight="#a5b4fc">
      <rect x="14" y="20" width="36" height="24" rx="4" fill="white" opacity="0.15" stroke="white" strokeWidth="2"/>
      <rect x="14" y="28" width="36" height="4" fill="white" opacity="0.3"/>
      <rect x="18" y="36" width="12" height="3" rx="1.5" fill="white" opacity="0.4"/>
      <circle cx="42" cy="37" r="3" fill="white" opacity="0.3"/>
      <circle cx="40" cy="37" r="3" fill="white" opacity="0.2"/>
    </ClayIcon>
  );
}

export function ClayShield({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#2dd4bf"
      innerShadow="url(#inner-dark)" highlight="#5eead4">
      <path d="M32 14L16 22v10c0 9 7 17 16 20 9-3 16-11 16-20V22L32 14z"
        fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M24 32l5 5 10-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </ClayIcon>
  );
}

// ===== BRAND ICONS =====
export function ClaySteam({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#475569"
      innerShadow="url(#inner-dark)" highlight="#64748b">
      <circle cx="32" cy="32" r="12" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.1"/>
      <circle cx="32" cy="32" r="5" stroke="white" strokeWidth="1.5" fill="white" fillOpacity="0.2"/>
      <circle cx="32" cy="32" r="2" fill="white" opacity="0.7"/>
      <path d="M32 20v-4M32 48v-4M20 32h-4M48 32h-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </ClayIcon>
  );
}

export function ClayPlay({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#f472b6"
      innerShadow="url(#inner-dark)" highlight="#f9a8d4">
      <circle cx="32" cy="32" r="14" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.1"/>
      <path d="M27 22l14 10-14 10V22z" fill="white" opacity="0.6"/>
    </ClayIcon>
  );
}

export function ClayMusic({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#a78bfa"
      innerShadow="url(#inner-dark)" highlight="#c4b5fd">
      <circle cx="24" cy="42" r="5" fill="white" opacity="0.3" stroke="white" strokeWidth="1.5"/>
      <circle cx="40" cy="38" r="5" fill="white" opacity="0.3" stroke="white" strokeWidth="1.5"/>
      <path d="M29 42V22l16-4v22" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M29 28h16" stroke="white" strokeWidth="2"/>
    </ClayIcon>
  );
}

export function ClayCode({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#818cf8"
      innerShadow="url(#inner-dark)" highlight="#a5b4fc">
      <path d="M22 22l-10 10 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M42 22l10 10-10 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M38 16l-12 32" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    </ClayIcon>
  );
}

export function ClayAi({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#c084fc"
      innerShadow="url(#inner-dark)" highlight="#d8b4fe">
      <circle cx="32" cy="32" r="12" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.1"/>
      <circle cx="27" cy="28" r="3" fill="white" opacity="0.6"/>
      <circle cx="37" cy="28" r="3" fill="white" opacity="0.6"/>
      <path d="M26 38c3 3 9 3 12 0" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 20v-4M32 48v-4M20 32h-4M48 32h-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
    </ClayIcon>
  );
}

export function ClayChart({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#60a5fa"
      innerShadow="url(#inner-dark)" highlight="#93c5fd">
      <rect x="16" y="32" width="6" height="14" rx="2" fill="white" opacity="0.4"/>
      <rect x="26" y="24" width="6" height="22" rx="2" fill="white" opacity="0.55"/>
      <rect x="36" y="18" width="6" height="28" rx="2" fill="white" opacity="0.7"/>
      <path d="M16 40l10-10 10 4 12-16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </ClayIcon>
  );
}

export function ClayDesign({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#f472b6"
      innerShadow="url(#inner-dark)" highlight="#f9a8d4">
      <circle cx="32" cy="32" r="12" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.1"/>
      <circle cx="32" cy="32" r="4" fill="white" opacity="0.5"/>
      <path d="M32 20v-4M32 48v-4M20 32h-4M48 32h-4" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      <path d="M22 22l3 3M39 39l3 3M22 42l3-3M39 25l3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
    </ClayIcon>
  );
}

export function ClayBook({ size = 64, className }: IconProps) {
  return (
    <ClayIcon size={size} className={className} bg="#fbbf24"
      innerShadow="url(#inner-dark)" highlight="#fde68a">
      <path d="M16 16h14c2 0 3 1 3 3v24c-2-1-3-2-3-2H16V16z"
        fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2"/>
      <path d="M48 16H34c-2 0-3 1-3 3v24c2-1 3-2 3-2h14V16z"
        fill="white" fillOpacity="0.1" stroke="white" strokeWidth="2"/>
      <line x1="32" y1="16" x2="32" y2="46" stroke="white" strokeWidth="1" opacity="0.3"/>
      <line x1="20" y1="24" x2="28" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <line x1="36" y1="24" x2="44" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </ClayIcon>
  );
}
