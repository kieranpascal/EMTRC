interface EmtrcLogoProps {
  inverted?: boolean;
  size?: 'sm' | 'md' | 'lg';
  markOnly?: boolean;
}

/**
 * Precision Swiss-London architectural emblem for emtrc (zero letters).
 * Three interlocked structural aperture planes (Build · Answer · Care) anchored by a Studio Vermilion keystone.
 */
export function EmtrcMark({
  inverted = false,
  className = 'h-9 w-9',
}: {
  inverted?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="emtrc emblem"
      className={`${className} shrink-0 transition-transform duration-300 ease-out group-hover:scale-[1.04]`}
    >
      {/* Monolith tile */}
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="9"
        fill={inverted ? '#151821' : '#0A0B0E'}
        stroke={inverted ? 'rgba(255,255,255,0.18)' : 'rgba(10,11,14,0.12)'}
        strokeWidth="1.25"
      />
      {/* Upper cantilevered architectural beam */}
      <path d="M10 12.5H27.5L24.5 16.5H10V12.5Z" fill="#FFFFFF" />
      {/* Mid precision aperture beam */}
      <path d="M10 19.25H21.5L18.75 23.25H10V19.25Z" fill="#FFFFFF" fillOpacity="0.82" />
      {/* Lower structural foundation slab */}
      <path d="M10 26H30V29.75H10V26Z" fill="#FFFFFF" />
      {/* Studio Vermilion precision keystone signal */}
      <rect x="24.5" y="19.25" width="5.5" height="4" rx="1" fill="#E03528" />
    </svg>
  );
}

export function EmtrcLogo({ inverted = false, size = 'md', markOnly = false }: EmtrcLogoProps) {
  const boxSize = size === 'sm' ? 'h-7 w-7' : size === 'lg' ? 'h-10 w-10' : 'h-8 w-8';
  const textSize = size === 'sm' ? 'text-[18px]' : size === 'lg' ? 'text-[23px]' : 'text-[20px]';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      <EmtrcMark inverted={inverted} className={boxSize} />
      {!markOnly && (
        <span
          className={`font-editorial font-extrabold tracking-[-0.045em] leading-none ${textSize} ${
            inverted ? 'text-white' : 'text-[var(--emtrc-ink)]'
          }`}
        >
          emtrc
        </span>
      )}
    </span>
  );
}
