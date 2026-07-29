import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// ===== CATEGORY ICONS =====
export function GamesIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="4" y="16" width="40" height="20" rx="4" fill={color} opacity="0.15"/>
      <rect x="6" y="18" width="36" height="16" rx="3" stroke={color} strokeWidth="2.5"/>
      <circle cx="16" cy="26" r="3" fill={color}/>
      <circle cx="32" cy="23" r="2" fill={color} opacity="0.6"/>
      <circle cx="35" cy="26" r="2" fill={color} opacity="0.6"/>
      <circle cx="32" cy="29" r="2" fill={color} opacity="0.6"/>
      <circle cx="29" cy="26" r="2" fill={color} opacity="0.6"/>
      <rect x="10" y="10" width="4" height="8" rx="2" fill={color} opacity="0.4"/>
      <rect x="34" y="10" width="4" height="8" rx="2" fill={color} opacity="0.4"/>
    </svg>
  );
}

export function SoftwareIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="6" y="8" width="36" height="26" rx="3" fill={color} opacity="0.15"/>
      <rect x="8" y="10" width="32" height="22" rx="2" stroke={color} strokeWidth="2.5"/>
      <rect x="14" y="36" width="20" height="3" rx="1.5" fill={color} opacity="0.5"/>
      <rect x="18" y="39" width="12" height="2" rx="1" fill={color} opacity="0.3"/>
      <circle cx="24" cy="21" r="6" stroke={color} strokeWidth="2" fill="none"/>
      <path d="M24 18v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function GiftCardIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="4" y="14" width="40" height="24" rx="4" fill={color} opacity="0.15"/>
      <rect x="6" y="16" width="36" height="20" rx="3" stroke={color} strokeWidth="2.5"/>
      <line x1="6" y1="24" x2="42" y2="24" stroke={color} strokeWidth="2" strokeDasharray="4 3"/>
      <rect x="20" y="12" width="8" height="24" rx="1" fill={color} opacity="0.2"/>
      <path d="M24 12v24" stroke={color} strokeWidth="2"/>
      <circle cx="24" cy="20" r="3" fill={color}/>
      <path d="M21 20c0-2 1.5-3 3-3s3 1 3 3" stroke={color} strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

export function SubscriptionIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="18" fill={color} opacity="0.1"/>
      <circle cx="24" cy="24" r="16" stroke={color} strokeWidth="2.5"/>
      <path d="M24 14v12l8 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M36 8l3-3M36 8h-3M36 8v3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="24" cy="24" r="2" fill={color}/>
    </svg>
  );
}

export function CourseIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M6 18L24 8l18 10-18 10L6 18z" fill={color} opacity="0.15"/>
      <path d="M8 20L24 10l16 10" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M10 22v10c0 2 6 5 14 5s14-3 14-5V22" stroke={color} strokeWidth="2.5"/>
      <path d="M40 20v12" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="42" cy="34" r="3" fill={color}/>
      <path d="M24 28v6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M21 31h6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function OperatingSystemIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="4" y="8" width="40" height="28" rx="4" fill={color} opacity="0.15"/>
      <rect x="6" y="10" width="36" height="24" rx="3" stroke={color} strokeWidth="2.5"/>
      <rect x="12" y="14" width="8" height="8" rx="1" fill={color} opacity="0.7"/>
      <rect x="22" y="14" width="8" height="8" rx="1" fill={color} opacity="0.5"/>
      <rect x="12" y="24" width="8" height="6" rx="1" fill={color} opacity="0.5"/>
      <rect x="22" y="24" width="8" height="6" rx="1" fill={color} opacity="0.3"/>
      <rect x="34" y="14" width="4" height="16" rx="1" fill={color} opacity="0.2"/>
      <rect x="14" y="38" width="20" height="3" rx="1.5" fill={color} opacity="0.5"/>
      <rect x="18" y="41" width="12" height="2" rx="1" fill={color} opacity="0.3"/>
    </svg>
  );
}

export function Win11ProIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="4" y="6" width="40" height="28" rx="4" fill={color} opacity="0.15"/>
      <rect x="6" y="8" width="36" height="24" rx="3" stroke={color} strokeWidth="2.5"/>
      <rect x="12" y="12" width="7" height="7" rx="1.5" fill={color} opacity="0.7"/>
      <rect x="21" y="12" width="7" height="7" rx="1.5" fill={color} opacity="0.5"/>
      <rect x="12" y="21" width="7" height="3" rx="1" fill={color} opacity="0.5"/>
      <rect x="21" y="21" width="7" height="3" rx="1" fill={color} opacity="0.35"/>
      <text x="35" y="16" fill={color} fontSize="6" fontWeight="bold" opacity="0.6">Pro</text>
      <rect x="14" y="36" width="20" height="3" rx="1.5" fill={color} opacity="0.4"/>
      <rect x="18" y="39" width="12" height="2" rx="1" fill={color} opacity="0.25"/>
    </svg>
  );
}

export function Win11HomeIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="4" y="6" width="40" height="28" rx="4" fill={color} opacity="0.15"/>
      <rect x="6" y="8" width="36" height="24" rx="3" stroke={color} strokeWidth="2.5"/>
      <rect x="12" y="12" width="7" height="7" rx="1.5" fill={color} opacity="0.7"/>
      <rect x="21" y="12" width="7" height="7" rx="1.5" fill={color} opacity="0.5"/>
      <rect x="12" y="21" width="7" height="3" rx="1" fill={color} opacity="0.5"/>
      <rect x="21" y="21" width="7" height="3" rx="1" fill={color} opacity="0.35"/>
      <text x="35" y="16" fill={color} fontSize="5" fontWeight="bold" opacity="0.6">Home</text>
      <rect x="14" y="36" width="20" height="3" rx="1.5" fill={color} opacity="0.4"/>
      <rect x="18" y="39" width="12" height="2" rx="1" fill={color} opacity="0.25"/>
    </svg>
  );
}

export function Win11LTSCIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="4" y="6" width="40" height="28" rx="4" fill={color} opacity="0.15"/>
      <rect x="6" y="8" width="36" height="24" rx="3" stroke={color} strokeWidth="2.5"/>
      <rect x="12" y="12" width="7" height="7" rx="1.5" fill={color} opacity="0.7"/>
      <rect x="21" y="12" width="7" height="7" rx="1.5" fill={color} opacity="0.5"/>
      <rect x="12" y="21" width="7" height="3" rx="1" fill={color} opacity="0.5"/>
      <rect x="21" y="21" width="7" height="3" rx="1" fill={color} opacity="0.35"/>
      <text x="35" y="16" fill={color} fontSize="5" fontWeight="bold" opacity="0.6">LTSC</text>
      <rect x="14" y="36" width="20" height="3" rx="1.5" fill={color} opacity="0.4"/>
      <rect x="18" y="39" width="12" height="2" rx="1" fill={color} opacity="0.25"/>
    </svg>
  );
}

export function Win10ProIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="4" y="6" width="40" height="28" rx="4" fill={color} opacity="0.15"/>
      <rect x="6" y="8" width="36" height="24" rx="3" stroke={color} strokeWidth="2.5"/>
      <path d="M12 14h10v10H12z" fill={color} opacity="0.6"/>
      <path d="M26 14h10v10H26z" fill={color} opacity="0.45"/>
      <path d="M12 26h10v4H12z" fill={color} opacity="0.45"/>
      <path d="M26 26h10v4H26z" fill={color} opacity="0.3"/>
      <text x="39" y="16" fill={color} fontSize="6" fontWeight="bold" opacity="0.5">Pro</text>
      <rect x="14" y="36" width="20" height="3" rx="1.5" fill={color} opacity="0.4"/>
      <rect x="18" y="39" width="12" height="2" rx="1" fill={color} opacity="0.25"/>
    </svg>
  );
}

export function Win10HomeIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="4" y="6" width="40" height="28" rx="4" fill={color} opacity="0.15"/>
      <rect x="6" y="8" width="36" height="24" rx="3" stroke={color} strokeWidth="2.5"/>
      <path d="M12 14h10v10H12z" fill={color} opacity="0.6"/>
      <path d="M26 14h10v10H26z" fill={color} opacity="0.45"/>
      <path d="M12 26h10v4H12z" fill={color} opacity="0.45"/>
      <path d="M26 26h10v4H26z" fill={color} opacity="0.3"/>
      <text x="39" y="16" fill={color} fontSize="5" fontWeight="bold" opacity="0.5">Home</text>
      <rect x="14" y="36" width="20" height="3" rx="1.5" fill={color} opacity="0.4"/>
      <rect x="18" y="39" width="12" height="2" rx="1" fill={color} opacity="0.25"/>
    </svg>
  );
}

export function Win10LTSCIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="4" y="6" width="40" height="28" rx="4" fill={color} opacity="0.15"/>
      <rect x="6" y="8" width="36" height="24" rx="3" stroke={color} strokeWidth="2.5"/>
      <path d="M12 14h10v10H12z" fill={color} opacity="0.6"/>
      <path d="M26 14h10v10H26z" fill={color} opacity="0.45"/>
      <path d="M12 26h10v4H12z" fill={color} opacity="0.45"/>
      <path d="M26 26h10v4H26z" fill={color} opacity="0.3"/>
      <text x="39" y="16" fill={color} fontSize="5" fontWeight="bold" opacity="0.5">LTSC</text>
      <rect x="14" y="36" width="20" height="3" rx="1.5" fill={color} opacity="0.4"/>
      <rect x="18" y="39" width="12" height="2" rx="1" fill={color} opacity="0.25"/>
    </svg>
  );
}

// ===== UI ICONS =====
export function CartIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M8 8h4l3 20h22l4-14H14" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="38" r="3" fill={color}/>
      <circle cx="34" cy="38" r="3" fill={color}/>
    </svg>
  );
}

export function SearchIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="22" cy="22" r="14" stroke={color} strokeWidth="2.5"/>
      <path d="M32 32l10 10" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

export function FilterIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M6 12h36M12 24h24M18 36h12" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="16" cy="12" r="3" fill={color}/>
      <circle cx="30" cy="24" r="3" fill={color}/>
      <circle cx="22" cy="36" r="3" fill={color}/>
    </svg>
  );
}

export function StarIcon({ size = 24, color = 'currentColor', className, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 4l6 12.6L44 18.4l-10 9.6L36.4 42 24 35.4 11.6 42 14 28l-10-9.6 14-1.8L24 4z"
        fill={filled ? color : 'none'} stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
    </svg>
  );
}

export function HeartIcon({ size = 24, color = 'currentColor', className, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 42S4 30 4 18a10 10 0 0118-6 10 10 0 0118 6c0 12-20 24-20 24z"
        fill={filled ? color : 'none'} stroke={color} strokeWidth="2.5"/>
    </svg>
  );
}

export function DownloadIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 6v28M14 24l10 10 10-10" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 38h32" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function UploadIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 34V6M14 16l10-10 10 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 38h32" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function TrashIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M10 14h28M18 14V10a2 2 0 012-2h8a2 2 0 012 2v4" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M12 14l2 26a2 2 0 002 2h16a2 2 0 002-2l2-26" stroke={color} strokeWidth="2.5"/>
      <path d="M20 20v14M28 20v14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function EditIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M34 6l8 8-28 28H6v-8L34 6z" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M28 12l8 8" stroke={color} strokeWidth="2.5"/>
      <path d="M6 42h36" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function PlusIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
      <path d="M24 16v16M16 24h16" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function CheckIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="18" fill={color} opacity="0.15"/>
      <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
      <path d="M14 24l7 7 13-13" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function CloseIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
      <path d="M16 16l16 16M32 16L16 32" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

// ===== PAYMENT ICONS =====
export function CreditCardIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="4" y="10" width="40" height="28" rx="4" fill={color} opacity="0.15"/>
      <rect x="6" y="12" width="36" height="24" rx="3" stroke={color} strokeWidth="2.5"/>
      <line x1="6" y1="22" x2="42" y2="22" stroke={color} strokeWidth="3"/>
      <rect x="10" y="30" width="12" height="3" rx="1" fill={color} opacity="0.5"/>
    </svg>
  );
}

export function WalletIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="4" y="12" width="36" height="26" rx="4" fill={color} opacity="0.15"/>
      <rect x="6" y="14" width="32" height="22" rx="3" stroke={color} strokeWidth="2.5"/>
      <path d="M32 20h6a2 2 0 012 2v4a2 2 0 01-2 2h-6" stroke={color} strokeWidth="2.5"/>
      <circle cx="37" cy="25" r="2" fill={color}/>
    </svg>
  );
}

export function ShieldIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 4L6 12v12c0 10.5 7.7 20.3 18 24 10.3-3.7 18-13.5 18-24V12L24 4z" fill={color} opacity="0.1"/>
      <path d="M24 4L6 12v12c0 10.5 7.7 20.3 18 24 10.3-3.7 18-13.5 18-24V12L24 4z" stroke={color} strokeWidth="2.5"/>
      <path d="M16 24l5 5 10-10" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ===== STATUS ICONS =====
export function DiscountIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="18" fill={color} opacity="0.1"/>
      <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
      <path d="M16 32l16-16" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="18" cy="18" r="3" fill={color}/>
      <circle cx="30" cy="30" r="3" fill={color}/>
    </svg>
  );
}

export function GlobalIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
      <ellipse cx="24" cy="24" rx="8" ry="18" stroke={color} strokeWidth="2"/>
      <path d="M6 24h36" stroke={color} strokeWidth="2"/>
      <path d="M10 14h28M10 34h28" stroke={color} strokeWidth="1.5" opacity="0.5"/>
    </svg>
  );
}

export function RegionalIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M8 16c4-8 12-8 16 0s12 8 16 0" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M8 32c4-8 12-8 16 0s12 8 16 0" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="24" cy="24" r="4" fill={color}/>
      <circle cx="24" cy="24" r="2" fill="white"/>
    </svg>
  );
}

// ===== BRAND ICONS =====
export function SteamIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
      <circle cx="24" cy="24" r="8" stroke={color} strokeWidth="2"/>
      <circle cx="24" cy="24" r="3" fill={color}/>
      <path d="M24 6v10M24 32v10M6 24h10M32 24h10" stroke={color} strokeWidth="1.5" opacity="0.4"/>
    </svg>
  );
}

export function PlayIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
      <path d="M20 16l12 8-12 8V16z" fill={color}/>
    </svg>
  );
}

export function MusicIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="14" cy="36" r="6" fill={color} opacity="0.3"/>
      <circle cx="34" cy="32" r="6" fill={color} opacity="0.3"/>
      <path d="M20 36V10l20-4v26" stroke={color} strokeWidth="2.5"/>
      <path d="M20 18h20" stroke={color} strokeWidth="2"/>
    </svg>
  );
}

export function BookIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M8 8h12a4 4 0 014 4v28a3 3 0 00-3-3H8V8z" fill={color} opacity="0.15"/>
      <path d="M40 8H28a4 4 0 00-4 4v28a3 3 0 013-3h13V8z" fill={color} opacity="0.15"/>
      <path d="M8 8h12a4 4 0 014 4v28a3 3 0 00-3-3H8V8z" stroke={color} strokeWidth="2.5"/>
      <path d="M40 8H28a4 4 0 00-4 4v28a3 3 0 013-3h13V8z" stroke={color} strokeWidth="2.5"/>
    </svg>
  );
}

export function CodeIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M16 14l-10 10 10 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 14l10 10-10 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28 6l-8 36" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function AiIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
      <circle cx="18" cy="20" r="3" fill={color}/>
      <circle cx="30" cy="20" r="3" fill={color}/>
      <path d="M16 32c3 4 9 4 16 0" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M24 6v4M24 38v4M6 24h4M38 24h4" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

export function ChartIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="6" y="28" width="8" height="14" rx="2" fill={color} opacity="0.3"/>
      <rect x="20" y="18" width="8" height="24" rx="2" fill={color} opacity="0.5"/>
      <rect x="34" y="8" width="8" height="34" rx="2" fill={color} opacity="0.7"/>
      <path d="M6 38l14-14 10 6 12-20" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function DesignIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5"/>
      <circle cx="24" cy="24" r="6" fill={color} opacity="0.3"/>
      <path d="M24 6v4M24 38v4M6 24h4M38 24h4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 12l3 3M33 33l3 3M12 36l3-3M33 15l3-3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
