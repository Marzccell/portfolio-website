import { useMagnetic } from '../hooks/useMagnetic.js';

export default function MagneticButton({ as: Component = 'a', className = '', children, ...props }) {
  const magnetic = useMagnetic(0.18);
  return (
    <Component
      ref={magnetic.ref}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition duration-300 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
