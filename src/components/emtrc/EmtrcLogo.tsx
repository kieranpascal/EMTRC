import logoGraphic from '../../assets/logo.svg';

interface EmtrcLogoProps {
  variant?: 'default' | 'light';
  inverted?: boolean;
  showWordmark?: boolean;
  showSublabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_MAP = {
  sm: { icon: 'h-8 w-8', text: 'text-[1.22rem]', dot: 'h-1.5 w-1.5', sub: 'text-[9px]' },
  md: { icon: 'h-9 w-9 sm:h-10 sm:w-10', text: 'text-[1.4rem] sm:text-[1.46rem]', dot: 'h-1.5 w-1.5', sub: 'text-[9.5px]' },
  lg: { icon: 'h-11 w-11 sm:h-12 sm:w-12', text: 'text-[1.78rem]', dot: 'h-2 w-2', sub: 'text-[10.5px]' },
};

interface EmtrcMarkProps {
  variant?: 'default' | 'light';
  inverted?: boolean;
  className?: string;
}

/**
 * Standalone modernist London architectural emblem sourced from src/assets/logo.svg.
 * Scales losslessly across mobile, tablet, desktop headers, and in-app UI frames.
 */
export function EmtrcMark({
  variant = 'default',
  inverted = false,
  className = 'h-9 w-9',
}: EmtrcMarkProps) {
  const isLight = variant === 'light' || inverted;

  return (
    <img
      src={logoGraphic}
      alt=""
      aria-hidden="true"
      width={48}
      height={48}
      decoding="async"
      className={`block aspect-square shrink-0 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.22)] ${
        isLight ? 'brightness-105' : ''
      } ${className}`}
    />
  );
}

/**
 * emtrc London studio identity lockup:
 * Modernist London architectural emblem (src/assets/logo.svg) paired with a crisp
 * geometric wordmark lockup and vermilion signal period. Locked LTR for RTL safety.
 */
export function EmtrcLogo({
  variant = 'default',
  inverted = false,
  showWordmark = true,
  showSublabel = false,
  size = 'md',
  className = '',
}: EmtrcLogoProps) {
  const s = SIZE_MAP[size];
  const isLight = variant === 'light' || inverted;

  return (
    <span
      dir="ltr"
      data-testid="emtrc-logo"
      className={`group/logo inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}
    >
      <EmtrcMark
        variant={variant}
        inverted={inverted}
        className={`${s.icon} transition-transform duration-300 ease-out group-hover/logo:scale-[1.04]`}
      />

      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={`inline-flex items-baseline font-sans font-extrabold tracking-[-0.045em] ${s.text} ${
              isLight ? 'text-white' : 'text-[var(--emtrc-ink)]'
            }`}
          >
            <span>emtrc</span>
            <span
              className={`ml-0.5 inline-block rounded-[1.5px] bg-[var(--emtrc-accent)] ${s.dot}`}
              aria-hidden="true"
            />
          </span>
          {showSublabel && (
            <span
              className={`mt-1 font-mono-data font-medium uppercase tracking-[0.22em] ${s.sub} ${
                isLight ? 'text-[#9BA6BC]' : 'text-[var(--emtrc-muted)]'
              }`}
            >
              LONDON STUDIO
            </span>
          )}
        </span>
      )}
    </span>
  );
}
