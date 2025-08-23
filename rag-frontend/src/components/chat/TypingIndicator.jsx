"use client";
import React, { useEffect, useState, useRef } from "react";
import { Check, Loader2 } from "lucide-react";

// Steps config
const RAW_STEPS = [
  { label: "Thinking about your question", minMs: 3000, maxMs: 4000 }, // 3–4s
  { label: "Gathering relevant documents", minMs: 4000, maxMs: 5000 }, // 4–5s
  { label: "Formulating answer", minMs: null, maxMs: null } // stays active until hidden
];

// Utility to pick a randomized duration inside range
function pickDuration(step) {
  if (step.minMs == null || step.maxMs == null) return null; // for infinite step
  const { minMs, maxMs } = step;
  return Math.round(minMs + Math.random() * (maxMs - minMs));
}

export function TypingIndicator() {
  const [currentStep, setCurrentStep] = useState(0); // index of active step
  const [completed, setCompleted] = useState([]); // indices completed
  const [dots, setDots] = useState(0); // cycles ...
  const timerRef = useRef(null);
  const dotsRef = useRef(null);

  // Cycle animated trailing dots (0..3)
  useEffect(() => {
    dotsRef.current = setInterval(() => setDots(d => (d + 1) % 4), 450);
    return () => clearInterval(dotsRef.current);
  }, []);

  // Advance steps (except the last one, which stays indefinitely)
  useEffect(() => {
    if (currentStep >= RAW_STEPS.length) return;

    const duration = pickDuration(RAW_STEPS[currentStep]);
    if (duration === null) return; // last step = indefinite

    timerRef.current = setTimeout(() => {
      setCompleted(prev => [...prev, currentStep]);
      setCurrentStep(s => s + 1);
    }, duration);

    return () => clearTimeout(timerRef.current);
  }, [currentStep]);

  // Compose visible steps: completed + current
  const visibleSteps = RAW_STEPS.slice(0, currentStep + 1);

  return (
    <div className="flex w-full max-w-screen px-4 sm:px-8 md:px-16 justify-start select-none">
      <div className="relative text-[11px] sm:text-xs md:text-sm leading-relaxed rounded-xl shadow-sm border bg-neutral-100/85 dark:bg-neutral-800/70 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 max-w-[75%] p-3 backdrop-blur supports-[backdrop-filter]:bg-neutral-100/60 dark:supports-[backdrop-filter]:bg-neutral-800/50">
        <ul className="space-y-1" aria-live="polite" aria-label="Assistant is thinking">
          {visibleSteps.map((step, idx) => {
            const done = completed.includes(idx);
            const isActive = idx === currentStep && currentStep < RAW_STEPS.length;
            const label = step.label + (isActive ? (dots ? ".".repeat(dots) : "") : "");
            return (
              <li key={idx} className="flex items-center gap-2">
                {done ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : isActive ? (
                  <Loader2 className="w-3.5 h-3.5 text-emerald-500 animate-spin" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                )}
                <span
                  className={
                    done
                      ? "text-neutral-500 dark:text-neutral-500 line-through decoration-neutral-300/70 dark:decoration-neutral-600/70"
                      : ""
                  }
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
