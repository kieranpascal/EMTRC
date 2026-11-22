import emtrcLogoMark from '../../assets/images/emtrc_logo_emblem_1795377025072.jpg';

interface EmtrcLogoProps {
  inverted?: boolean;
  size?: 'sm' | 'md';
}

export function EmtrcLogo({ inverted = false, size = 'md' }: EmtrcLogoProps) {
  const boxSize = size === 'sm' ? 'h-8 w-8' : 'h-9 w-9';
  const textSize = size === 'sm' ? 'text-xl' : 'text-[23px]';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      <img
        src={emtrcLogoMark}
        alt="emtrc emblem"
        width={72}
        height={72}
        decoding="async"
        referrerPolicy="no-referrer"
        className={`${boxSize} shrink-0 rounded-[9px] object-cover transition-transform duration-200 group-hover:scale-[1.03] ${
          inverted
            ? 'ring-1 ring-[#E2A94C]/40'
            : 'ring-1 ring-[#0B132B]/15 dark:ring-[#E2A94C]/35'
        }`}
      />
      <span
        className={`font-editorial font-bold tracking-[-0.03em] leading-none ${textSize} ${
          inverted ? 'text-[#F5F3EE]' : 'text-[var(--emtrc-ink)]'
        }`}
      >
        emtrc
        <span className="text-[var(--emtrc-brass)] dark:text-[var(--emtrc-brass-light)]">.</span>
      </span>
    </span>
  );
}
