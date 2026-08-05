"use client";

import { lazy, Suspense, useEffect, useState } from "react";

const LiquidEther = lazy(() => import("./LiquidEther"));
const LIQUID_COLORS = ["#b8dc46", "#6f8f38", "#d8f5a0"];

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export default function LiquidBackground() {
  const [shouldRender, setShouldRender] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const compact = window.matchMedia("(max-width: 760px)");
    setIsCompact(compact.matches);

    const idleWindow = window as IdleWindow;
    let timeout = 0;
    let idleHandle = 0;

    if (idleWindow.requestIdleCallback) {
      idleHandle = idleWindow.requestIdleCallback(() => setShouldRender(true), { timeout: 2200 });
    } else {
      timeout = window.setTimeout(() => setShouldRender(true), 1000);
    }

    return () => {
      window.clearTimeout(timeout);
      if (idleHandle) idleWindow.cancelIdleCallback?.(idleHandle);
    };
  }, []);

  return (
    <div className="liquid-background" aria-hidden="true">
      {shouldRender ? (
        <Suspense fallback={null}>
          <LiquidEther
            colors={LIQUID_COLORS}
            mouseForce={12}
            cursorSize={isCompact ? 58 : 76}
            resolution={isCompact ? 0.2 : 0.26}
            BFECC={false}
            iterationsViscous={12}
            iterationsPoisson={14}
            autoSpeed={0.25}
            autoIntensity={1.15}
            autoResumeDelay={2600}
            autoRampDuration={1}
          />
        </Suspense>
      ) : null}
    </div>
  );
}
