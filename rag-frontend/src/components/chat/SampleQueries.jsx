"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { SAMPLE_QUERIES_PER_CATEGORY } from "@/data/assets";
import { useChats } from "@/context/ChatsProvider";

// Simple marquee-like horizontal scrolling badges of sample queries.
export function SampleQueries({ speed = 25, selectQuery }) {
  const { activeCategoryId } = useChats()
  const [sampleQueries, setSampleQueries] = useState()

  useEffect(() => {
    const queries = SAMPLE_QUERIES_PER_CATEGORY.find(q => q.id === activeCategoryId)
    setSampleQueries([...queries.questions, ...queries.questions])
  }, [activeCategoryId])

  const [x, setX] = React.useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = React.useRef(null);
  const contentRef = React.useRef(null);

  useAnimationFrame((t, delta) => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;
    const width = content.scrollWidth / 2;
    if (!paused) {
      setX(prev => {
        const next = prev - (speed * (delta / 1000));
        return next <= -width ? 0 : next;
      });
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-md bg-neutral-50 dark:bg-neutral-900 h-9 select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        ref={contentRef}
        style={{ x }}
        className="absolute top-0 left-0 flex h-9 items-center"
      >
        {sampleQueries?.map((q, i) => (
          <button
            key={i}
            type="button"
            onClick={() => selectQuery?.(q)}
            className="mx-2 inline-flex items-center gap-1 whitespace-nowrap text-[11px] px-3 py-1.5 rounded-full bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border border-emerald-600/30 font-medium shadow-sm hover:bg-emerald-600/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            {q}
          </button>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-neutral-50 dark:from-neutral-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-neutral-50 dark:from-neutral-900 to-transparent" />
    </div>
  );
}

export default SampleQueries;
