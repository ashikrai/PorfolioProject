import { useReveal } from '../hooks/useReveal.js';

/**
 * Wraps any element in scroll-triggered reveal animation.
 * Usage: <Reveal as="div" className="service-card"> ... </Reveal>
 */
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
