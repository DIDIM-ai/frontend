'use client';

import { motion, useMotionValue, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  targetNumber: number;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({ targetNumber, className = '', duration = 0.5 }: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const animation = animate(count, targetNumber, {
      duration,
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest).toLocaleString());
      },
    });

    return () => animation.stop();
  }, [targetNumber, duration]);

  return <motion.span className={className}>{displayValue}</motion.span>;
}
