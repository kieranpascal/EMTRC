interface EmtrcLogoProps {
  inverted?: boolean;
  size?: 'sm' | 'md';
}

export function EmtrcLogo({ inverted = false, size = 'md' }: EmtrcLogoProps) {
  const boxSize = size === 'sm' ? 'h-8 w-8' : 'h-9 w-9';
  const textSize = size === 'sm' ? 'text-xl' : 'text-[22px]';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      <svg
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className={`${boxSize} shrink-0 transition-transform duration-200 group-hover:scale-[1.03]`}
      >
        <rect
          width="64"
          height="64"
          rx="14"
          fill={inverted ? '#F5F3EE' : '#0B132B'}
          className={inverted ? '' : 'dark:fill-[#F5F3EE]'}
        />
        <path
          d="M18 33.5C18 24.94 24.42 18.5 32.8 18.5C40.9 18.5 46.5 24.1 46.5 32.1V35.2H25.2C26.1 39.2 29.1 41.4 33.6 41.4C37.1 41.4 39.7 40.1 41.7 38.2L45.4 42.1C42.5 45.2 38.3 47 33.2 47C24.3 47 18 41.4 18 33.5ZM25.3 30.2H39.5C39.1 26.2 36.5 23.9 32.7 23.9C28.8 23.9 26.1 26.2 25.3 30.2Z"
          fill={inverted ? '#0B132B' : '#F5F3EE'}
          className={inverted ? '' : 'dark:fill-[#0B132B]'}
        />
        <circle cx="46.5" cy="18.5" r="4.8" fill="#2347FF" />
      </svg>
      <span
        className={`font-editorial font-extrabold tracking-[-0.04em] leading-none ${textSize} ${
          inverted ? 'text-[#F5F3EE]' : 'text-[var(--emtrc-ink)]'
        }`}
      >
        emtrc
      </span>
    </span>
  );
}
