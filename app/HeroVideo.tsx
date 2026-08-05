"use client";

import { useEffect, useRef } from "react";

const PLAYBACK_RATE = 1.25;

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const applyPlaybackRate = () => {
    if (!videoRef.current) return;
    videoRef.current.defaultPlaybackRate = PLAYBACK_RATE;
    videoRef.current.playbackRate = PLAYBACK_RATE;
  };

  useEffect(() => {
    applyPlaybackRate();
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster="/portfolio/hero-shot-poster.jpg"
      aria-hidden="true"
      onLoadedMetadata={applyPlaybackRate}
      onPlay={applyPlaybackRate}
    >
      <source src="/portfolio/hero-shot.mp4" type="video/mp4" />
    </video>
  );
}
