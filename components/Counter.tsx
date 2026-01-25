"use client";

import { useEffect, useState } from "react";
import { useInView, animate } from "framer-motion";
import { useRef } from "react";

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
}

export default function Counter({ from, to, duration = 2, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: duration,
        onUpdate: (value) => setCount(Math.floor(value)),
      });
      return () => controls.stop();
    }
  }, [from, to, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}