import React from 'react';
import { getBottlePalette } from '@/data/catalog';

interface PerfumeBottleArtProps {
  id: string;
  name: string;
  brand: string;
  sizeLabel?: string;
}

export function PerfumeBottleArt({ id, name, brand, sizeLabel }: PerfumeBottleArtProps) {
  const pal = getBottlePalette(brand, id);
  const isSample =
    name.toLowerCase().includes('ml') ||
    sizeLabel?.toLowerCase() === 'sample';

  // Short monogram / house initials
  const shortName = name
    .replace(new RegExp(`^${brand}\\s*`, 'i'), '')
    .replace(/\b(\d+(\.\d+)?\s*ML|Travel Size|Sample)\b/gi, '')
    .trim() || name;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle at 50% 35%, ${pal.bgTop} 0%, ${pal.bgBottom} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Subtle pedestal shadow */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          width: '54%',
          height: '14px',
          borderRadius: '50%',
          background: 'rgba(20, 20, 20, 0.10)',
          filter: 'blur(4px)',
        }}
      />

      <svg
        viewBox="0 0 200 220"
        width="82%"
        height="82%"
        aria-label={name}
        role="img"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <defs>
          <linearGradient id={`juice-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={pal.juiceTop} stopOpacity="0.88" />
            <stop offset="100%" stopColor={pal.juiceBottom} stopOpacity="0.96" />
          </linearGradient>
          <linearGradient id={`cap-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={pal.capColor} />
            <stop offset="45%" stopColor={pal.accent} />
            <stop offset="100%" stopColor={pal.capColor} />
          </linearGradient>
        </defs>

        {isSample ? (
          /* Sleek Vial / Travel Atomizer Silhouette */
          <g>
            {/* Cap */}
            <rect
              x="82"
              y="26"
              width="36"
              height="38"
              rx="4"
              fill={`url(#cap-${id})`}
            />
            {/* Gold collar ring */}
            <rect
              x="80"
              y="62"
              width="40"
              height="6"
              rx="2"
              fill="#B08D57"
            />
            {/* Glass cylinder */}
            <rect
              x="76"
              y="68"
              width="48"
              height="122"
              rx="8"
              fill={pal.glassTint}
              stroke="#D8D0C5"
              strokeWidth="1.5"
            />
            {/* Perfume liquid inside */}
            <rect
              x="80"
              y="88"
              width="40"
              height="96"
              rx="5"
              fill={`url(#juice-${id})`}
            />
            {/* Dip tube */}
            <line
              x1="100"
              y1="68"
              x2="100"
              y2="180"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.5"
            />
            {/* Label */}
            <rect
              x="80"
              y="104"
              width="40"
              height="52"
              rx="2"
              fill={pal.labelBg}
              stroke={pal.accent}
              strokeWidth="0.8"
            />
            <text
              x="100"
              y="122"
              textAnchor="middle"
              fill="#9A948C"
              fontSize="5.5"
              fontWeight="700"
              letterSpacing="0.8"
            >
              {brand.slice(0, 12).toUpperCase()}
            </text>
            <text
              x="100"
              y="134"
              textAnchor="middle"
              fill={pal.labelText}
              fontSize="6.5"
              fontFamily="Georgia, serif"
              fontWeight="700"
            >
              {shortName.slice(0, 11)}
            </text>
            <text
              x="100"
              y="147"
              textAnchor="middle"
              fill="#B08D57"
              fontSize="5"
              fontWeight="600"
              letterSpacing="0.6"
            >
              EXTRAIT · EGYPT
            </text>
          </g>
        ) : (
          /* Luxury Architectural Flacon + Decant Atomizer Side-by-Side */
          <g>
            {/* Cap */}
            <rect
              x="76"
              y="22"
              width="48"
              height="32"
              rx="5"
              fill={`url(#cap-${id})`}
            />
            {/* Atomizer Neck */}
            <rect
              x="86"
              y="54"
              width="28"
              height="10"
              rx="2"
              fill="#B08D57"
            />
            {/* Outer Heavy Glass Flacon */}
            <rect
              x="54"
              y="64"
              width="92"
              height="124"
              rx="14"
              fill={pal.glassTint}
              stroke="#D5CCC0"
              strokeWidth="1.5"
            />
            {/* Inner Juice Chamber */}
            <rect
              x="62"
              y="82"
              width="76"
              height="96"
              rx="9"
              fill={`url(#juice-${id})`}
            />
            {/* Glass Highlight */}
            <rect
              x="60"
              y="70"
              width="6"
              height="108"
              rx="3"
              fill="rgba(255,255,255,0.42)"
            />
            {/* Framed Couture Plaque Label */}
            <rect
              x="68"
              y="96"
              width="64"
              height="62"
              rx="4"
              fill={pal.labelBg}
              stroke={pal.accent}
              strokeWidth="1"
            />
            <rect
              x="71"
              y="99"
              width="58"
              height="56"
              rx="2"
              fill="none"
              stroke="rgba(176,141,87,0.35)"
              strokeWidth="0.6"
            />
            <text
              x="100"
              y="114"
              textAnchor="middle"
              fill="#9A948C"
              fontSize="6"
              fontWeight="700"
              letterSpacing="0.9"
            >
              {brand.slice(0, 14).toUpperCase()}
            </text>
            <text
              x="100"
              y="129"
              textAnchor="middle"
              fill={pal.labelText}
              fontSize="7.5"
              fontFamily="Georgia, serif"
              fontWeight="700"
            >
              {shortName.slice(0, 14)}
            </text>
            <line
              x1="84"
              y1="137"
              x2="116"
              y2="137"
              stroke="#B08D57"
              strokeWidth="0.7"
            />
            <text
              x="100"
              y="147"
              textAnchor="middle"
              fill="#6E6A63"
              fontSize="5.2"
              fontWeight="600"
              letterSpacing="0.7"
            >
              4 · 6 · 10 ML DECANT
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
