import { useRef, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import { Link, NavLink, type LinkProps, type NavLinkProps } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

interface MagneticBaseProps {
  children: ReactNode;
  strength?: number;
  maxOffset?: number;
  wrapperClassName?: string;
}

type MagneticWrapperProps = MagneticBaseProps & {
  to?: undefined;
  href?: undefined;
  navLink?: false;
};

type MagneticRouterLinkProps = MagneticBaseProps &
  Omit<LinkProps, 'children'> & {
    href?: undefined;
    navLink?: false;
  };

type MagneticRouterNavLinkProps = Omit<MagneticBaseProps, 'children'> &
  NavLinkProps & {
    href?: undefined;
    navLink: true;
  };

type MagneticAnchorProps = MagneticBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    to?: undefined;
    href: string;
    navLink?: false;
  };

export type MagneticLinkProps =
  | MagneticWrapperProps
  | MagneticRouterLinkProps
  | MagneticRouterNavLinkProps
  | MagneticAnchorProps;

/**
 * Reusable Framer Motion spring-physics magnetic interaction component for
 * navigation links, studio triggers, and primary call-to-action buttons.
 * Smoothly pulls toward the pointer on hover and springs crisply back to rest.
 */
export function MagneticLink(props: MagneticLinkProps) {
  const strength = props.strength ?? 0.24;
  const maxOffset = props.maxOffset ?? 10;
  const wrapperClassName = props.wrapperClassName ?? '';

  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 320, damping: 20, mass: 0.45 });
  const y = useSpring(rawY, { stiffness: 320, damping: 20, mass: 0.45 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    rawX.set(Math.max(-maxOffset, Math.min(maxOffset, dx * strength)));
    rawY.set(Math.max(-maxOffset * 0.75, Math.min(maxOffset * 0.75, dy * strength)));
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const renderInner = () => {
    if ('navLink' in props && props.navLink) {
      const { navLink: _n, strength: _s, maxOffset: _m, wrapperClassName: _w, ...navProps } = props;
      return <NavLink {...navProps} />;
    }
    if ('to' in props && props.to !== undefined) {
      const { navLink: _n, strength: _s, maxOffset: _m, wrapperClassName: _w, ...linkProps } = props;
      return <Link {...linkProps} />;
    }
    if ('href' in props && props.href !== undefined) {
      const {
        navLink: _n,
        strength: _s,
        maxOffset: _m,
        wrapperClassName: _w,
        children: anchorChildren,
        ...anchorProps
      } = props;
      return <a {...anchorProps}>{anchorChildren}</a>;
    }
    return <>{props.children}</>;
  };

  const hasDisplayUtility =
    /\b(hidden|block|inline-block|inline|flex|inline-flex|grid|inline-grid|contents)\b/.test(
      wrapperClassName,
    );
  const resolvedWrapperClass = `${hasDisplayUtility ? '' : 'inline-flex '}${wrapperClassName}`.trim();

  if (prefersReduced) {
    return (
      <div data-testid="magnetic-link" className={resolvedWrapperClass}>
        {renderInner()}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      data-testid="magnetic-link"
      style={{ x, y }}
      whileTap={{ scale: 0.975 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`will-change-transform ${resolvedWrapperClass}`.trim()}
    >
      {renderInner()}
    </motion.div>
  );
}
