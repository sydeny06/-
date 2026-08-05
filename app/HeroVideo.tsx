"use client";

import { useEffect, useRef, useState } from "react";

const PLAYBACK_RATE = 1.25;

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canLoadVideo, setCanLoadVideo] = useState(false);

  const applyPlaybackRate = () => {
    if (!videoRef.current) return;
    videoRef.current.defaultPlaybackRate = PLAYBACK_RATE;
    videoRef.current.playbackRate = PLAYBACK_RATE;
  };

  useEffect(() => {
    applyPlaybackRate();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    let timeout = 0;
    let idleHandle = 0;

    if (idleWindow.requestIdleCallback) {
      idleHandle = idleWindow.requestIdleCallback(() => setCanLoadVideo(true), { timeout: 1600 });
    } else {
      timeout = window.setTimeout(() => setCanLoadVideo(true), 700);
    }

    return () => {
      window.clearTimeout(timeout);
      if (idleHandle) idleWindow.cancelIdleCallback?.(idleHandle);
    };
  }, []);

  useEffect(() => {
    if (!canLoadVideo || !videoRef.current) return;
    videoRef.current.load();
    applyPlaybackRate();
    videoRef.current.play().catch(() => undefined);
  }, [canLoadVideo]);

  return (
    <video
      ref={videoRef}
      autoPlay={canLoadVideo}
      loop
      muted
      playsInline
      preload="none"
      poster="/portfolio/hero-shot-poster.jpg"
      aria-hidden="true"
      onLoadedMetadata={applyPlaybackRate}
      onPlay={applyPlaybackRate}
    >
      {canLoadVideo ? <source src="/portfolio/hero-shot.mp4" type="video/mp4" /> : null}
    </video>
  );
}
