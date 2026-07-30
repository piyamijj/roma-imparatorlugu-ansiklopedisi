"use client";

import React, { useId } from "react";

/**
 * RomanMotifs.tsx
 * 
 * This file houses hand-drawn, pure SVG Roman thematic motifs and icons.
 * By using custom SVG paths and shapes, we avoid relying on external icon libraries
 * (like lucide-react) for specialized historical iconography, eliminating the risk
 * of invalid icon name build failures while ensuring a highly polished, bespoke
 * Roman aesthetic (marble, gold, bronze, laurel, eagle, columns).
 */

interface MotifProps {
  className?: string;
  size?: number;
}

/**
 * AquilaIcon — Stylized Roman Legion Eagle (Aquila)
 * Majestic heraldic eagle with spread wings, standing on a pedestal.
 * Uses a gold-to-bronze linear gradient fill.
 */
export const AquilaIcon: React.FC<MotifProps> = ({ className = "", size = 64 }) => {
  const gradId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3e4b0" />
          <stop offset="40%" stopColor="#d9b84a" />
          <stop offset="70%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#8c6239" />
        </linearGradient>
      </defs>
      {/* Pedestal / Orb */}
      <path
        d="M35 85 C35 80, 65 80, 65 85 L68 90 L32 90 Z"
        fill={`url(#${gradId})`}
        stroke="#5e4a10"
        strokeWidth="1"
      />
      <circle cx="50" cy="78" r="6" fill={`url(#${gradId})`} stroke="#5e4a10" strokeWidth="1" />
      
      {/* Eagle Body & Tail */}
      <path
        d="M47 50 L53 50 L55 72 L50 76 L45 72 Z"
        fill={`url(#${gradId})`}
        stroke="#5e4a10"
        strokeWidth="1"
      />
      
      {/* Left Wing (Majestic, geometric feathers) */}
      <path
        d="M47 52 C35 48, 20 35, 12 20 C15 28, 22 42, 30 50 C22 50, 15 45, 10 38 C14 46, 22 55, 32 58 C24 60, 18 58, 14 54 C18 61, 26 66, 36 66 C28 68, 22 68, 18 66 C24 72, 34 72, 45 68 Z"
        fill={`url(#${gradId})`}
        stroke="#5e4a10"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Right Wing (Symmetric) */}
      <path
        d="M53 52 C65 48, 80 35, 88 20 C85 28, 78 42, 70 50 C78 50, 85 45, 90 38 C86 46, 78 55, 68 58 C76 60, 82 58, 86 54 C82 61, 74 66, 64 66 C72 68, 78 68, 82 66 C76 72, 66 72, 55 68 Z"
        fill={`url(#${gradId})`}
        stroke="#5e4a10"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Eagle Head & Beak */}
      <path
        d="M48 42 C48 36, 52 36, 52 42 L55 44 L50 48 L45 44 Z"
        fill={`url(#${gradId})`}
        stroke="#5e4a10"
        strokeWidth="1"
      />
      <path
        d="M46 43 C44 43, 43 45, 45 46 Z"
        fill="#3d2b17"
      />
    </svg>
  );
};

/**
 * LaurelWreathIcon — Classic Roman Victory Laurel Wreath
 * Circular wreath made of two symmetric branches of leaves.
 */
export interface LaurelWreathProps extends MotifProps {
  color?: string;
}

export const LaurelWreathIcon: React.FC<LaurelWreathProps> = ({
  className = "",
  size = 64,
  color = "currentColor",
}) => {
  // Generate leaf positions along a circular arc
  const leavesCount = 11;
  const leftLeaves: React.ReactNode[] = [];
  const rightLeaves: React.ReactNode[] = [];

  for (let i = 0; i < leavesCount; i++) {
    // Angle from bottom (approx 100 degrees) to top (approx 260 degrees)
    const progress = i / (leavesCount - 1);
    const angleRad = (100 + progress * 150) * (Math.PI / 180);
    
    // Radius of the wreath circle
    const r = 34;
    const cx = 50;
    const cy = 50;

    // Leaf center coordinates
    const lx = cx + r * Math.cos(angleRad);
    const ly = cy + r * Math.sin(angleRad);

    // Rotation angle of the leaf to align with the arc tangent
    const rotAngle = (angleRad * 180) / Math.PI + 90;

    // Left branch leaf
    leftLeaves.push(
      <path
        key={`l-${i}`}
        d="M-3 -6 C-6 -2, -4 4, 0 6 C4 4, 6 -2, 3 -6 C0 -9, -1 -9, -3 -6 Z"
        transform={`translate(${lx}, ${ly}) rotate(${rotAngle}) scale(0.85)`}
        fill={color}
      />
    );

    // Right branch leaf (mirrored across X=50)
    const rx = cx - r * Math.cos(angleRad);
    const rRotAngle = -rotAngle;
    rightLeaves.push(
      <path
        key={`r-${i}`}
        d="M-3 -6 C-6 -2, -4 4, 0 6 C4 4, 6 -2, 3 -6 C0 -9, -1 -9, -3 -6 Z"
        transform={`translate(${rx}, ${ly}) rotate(${rRotAngle}) scale(0.85)`}
        fill={color}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      {/* Central Ribbon Tie at the bottom */}
      <path
        d="M46 84 C48 81, 52 81, 54 84 C56 87, 52 92, 50 90 C48 92, 44 87, 46 84 Z"
        fill={color}
      />
      <path
        d="M48 87 L42 95 M52 87 L58 95"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Left and Right Branches */}
      <g>{leftLeaves}</g>
      <g>{rightLeaves}</g>
    </svg>
  );
};

/**
 * SPQRBanner — Decorative Banner containing "SPQR"
 * Senatus Populusque Romanus (The Senate and People of Rome)
 */
export const SPQRBanner: React.FC<MotifProps> = ({ className = "", size = 120 }) => {
  const gradId = useId();

  return (
    <svg
      width={size}
      height={size * 0.45}
      viewBox="0 0 120 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3e4b0" />
          <stop offset="50%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#8c6239" />
        </linearGradient>
      </defs>

      {/* Banner Ribbon Shadow */}
      <path
        d="M10 14 L110 14 L105 38 L15 38 Z"
        fill="#3d2b17"
        opacity="0.3"
      />

      {/* Banner Ribbon Body */}
      <path
        d="M12 10 L108 10 L104 34 L16 34 Z"
        fill={`url(#${gradId})`}
        stroke="#5e4a10"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Ribbon Notched Ends (Left) */}
      <path
        d="M16 16 L4 22 L16 28 Z"
        fill="#8c6239"
        stroke="#5e4a10"
        strokeWidth="1"
      />
      {/* Ribbon Notched Ends (Right) */}
      <path
        d="M104 16 L116 22 L104 28 Z"
        fill="#8c6239"
        stroke="#5e4a10"
        strokeWidth="1"
      />

      {/* SPQR Text */}
      <text
        x="60"
        y="26"
        textAnchor="middle"
        fill="#231f1a"
        fontWeight="bold"
        fontSize="13"
        fontFamily="Cinzel, Trajan Pro, Georgia, serif"
        letterSpacing="3"
      >
        S•P•Q•R
      </text>
    </svg>
  );
};

/**
 * ColumnIcon — Simplified Roman/Corinthian Column Silhouette
 * Tall aspect ratio, stroke-based, fluted shaft.
 */
export const ColumnIcon: React.FC<MotifProps & { height?: number }> = ({
  className = "",
  size = 40,
  height,
}) => {
  const w = size;
  const h = height || size * 3;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 60 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
      preserveAspectRatio="none"
    >
      {/* Capital (Top) */}
      <rect x="10" y="10" width="40" height="8" rx="2" fill="currentColor" opacity="0.9" />
      <path
        d="M12 18 C12 25, 20 25, 20 18 C20 25, 40 25, 40 18 C40 25, 48 25, 48 18 Z"
        fill="currentColor"
      />
      <rect x="14" y="22" width="32" height="6" fill="currentColor" />

      {/* Shaft (Middle) */}
      <rect x="18" y="28" width="24" height="144" fill="currentColor" opacity="0.15" />
      {/* Fluting Lines */}
      <line x1="21" y1="28" x2="21" y2="172" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <line x1="25" y1="28" x2="25" y2="172" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <line x1="30" y1="28" x2="30" y2="172" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <line x1="35" y1="28" x2="35" y2="172" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <line x1="39" y1="28" x2="39" y2="172" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />

      {/* Base (Bottom) */}
      <rect x="14" y="172" width="32" height="8" fill="currentColor" />
      <rect x="10" y="180" width="40" height="10" rx="1" fill="currentColor" />
    </svg>
  );
};

/**
 * MosaicTesseraPattern — SVG Mosaic Pattern Definition
 * Returns a defs block containing a repeatable mosaic tile pattern.
 */
export const MosaicTesseraPattern: React.FC<{ patternId: string }> = ({ patternId }) => {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none">
      <defs>
        <pattern id={patternId} width="24" height="24" patternUnits="userSpaceOnUse">
          {/* Grout lines background */}
          <rect width="24" height="24" fill="#d1c5a8" />
          
          {/* Tesserae (individual tiles) */}
          <rect x="1" y="1" width="10" height="10" fill="#f8f6f2" rx="1" />
          <rect x="13" y="1" width="10" height="10" fill="#ede7db" rx="1" />
          <rect x="1" y="13" width="10" height="10" fill="#e3dccb" rx="1" />
          <rect x="13" y="13" width="10" height="10" fill="#c9a227" opacity="0.85" rx="1" />
          
          {/* Subtle texture overlay on tiles */}
          <rect x="1" y="1" width="10" height="10" fill="rgba(42,38,32,0.03)" rx="1" />
          <rect x="13" y="1" width="10" height="10" fill="rgba(92,26,26,0.03)" rx="1" />
        </pattern>
      </defs>
    </svg>
  );
};

/**
 * LaurelDividerRow — Composed Laurel Wreath Section Break
 * Renders the '.laurel-divider' CSS class structure with leaf accents.
 */
export const LaurelDividerRow: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`laurel-divider ${className}`}>
      <span className="laurel-divider-leaf transform rotate-12" />
      <span className="laurel-divider-leaf transform -rotate-12 scale-x-[-1]" />
      <span className="mx-2 text-laurel text-xs tracking-widest font-inscription opacity-60">PAX ROMANA</span>
      <span className="laurel-divider-leaf transform rotate-12" />
      <span className="laurel-divider-leaf transform -rotate-12 scale-x-[-1]" />
    </div>
  );
};