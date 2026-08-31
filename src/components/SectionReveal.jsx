import { motion } from 'framer-motion';

/**
 * Envoltorio de scroll-reveal compartido: fade-in + slide-up sutil,
 * disparado al 20% de visibilidad, una sola vez (no se repite al volver a
 * hacer scroll).
 */
export default function SectionReveal({
  as: Tag = motion.div,
  className = '',
  delay = 0,
  y = 24,
  children,
  ...props
}) {
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      {...props}
    >
      {children}
    </Tag>
  );
}
