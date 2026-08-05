"use client";

import { useEffect } from "react";

const FRAME_SELECTOR = [
  ".topbar",
  ".portrait-wrap",
  ".experience-line",
  ".contact-row",
  ".metrics article",
  ".strength-grid article",
  ".model-chooser",
  ".model-choice-list a",
  ".case-study",
  ".case-main-frame",
  ".detail-explorer-stage",
  ".detail-explorer-nav button",
  ".contact-direct",
  ".contact-direct a",
].join(",");

export default function SpecularFrames() {
  useEffect(() => {
    let frames: HTMLElement[] = [];
    let animationFrame = 0;
    let pointerX = -1000;
    let pointerY = -1000;

    const refresh = () => {
      frames = Array.from(document.querySelectorAll<HTMLElement>(FRAME_SELECTOR));
      frames.forEach((frame) => frame.classList.add("specular-frame"));
    };

    const paint = () => {
      frames.forEach((frame) => {
        const rect = frame.getBoundingClientRect();
        if (rect.bottom < -360 || rect.top > window.innerHeight + 360) return;
        const dx = Math.max(rect.left - pointerX, 0, pointerX - rect.right);
        const dy = Math.max(rect.top - pointerY, 0, pointerY - rect.bottom);
        const distance = Math.hypot(dx, dy);
        const proximity = Math.max(0, 1 - distance / 340);
        frame.style.setProperty("--specular-frame-x", `${pointerX - rect.left}px`);
        frame.style.setProperty("--specular-frame-y", `${pointerY - rect.top}px`);
        frame.style.setProperty("--specular-frame-opacity", `${proximity * proximity}`);
      });
      animationFrame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!animationFrame) animationFrame = window.requestAnimationFrame(paint);
    };

    refresh();
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", onPointerMove);
      frames.forEach((frame) => frame.classList.remove("specular-frame"));
    };
  }, []);

  return null;
}
