"use client";

import { useEffect, useRef, useState } from "react";

const videos = [
  {
    src: "/portfolio/videos/rpg-maker-gameplay.mp4",
    title: "RPG Maker 游戏制作",
    titleEn: "RPG MAKER GAMEPLAY",
    note: "关卡设计 / 事件逻辑 / 游戏原型",
  },
  {
    src: "/portfolio/videos/ue-gameplay.mp4",
    title: "UE 游戏制作",
    titleEn: "UNREAL ENGINE GAMEPLAY",
    note: "场景交互 / 引擎演示 / 游戏流程",
  },
];

export default function VideoShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeVideo) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeVideo]);

  const scrollToVideo = (index: number) => {
    const target = trackRef.current?.children[index] as HTMLElement | undefined;
    target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  const updateActiveVideo = () => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const nearestIndex = cards.reduce((nearest, card, index) => {
      const nearestDistance = Math.abs(cards[nearest].offsetLeft - track.scrollLeft);
      const cardDistance = Math.abs(card.offsetLeft - track.scrollLeft);
      return cardDistance < nearestDistance ? index : nearest;
    }, 0);

    setActiveVideo(nearestIndex);
  };

  return (
    <section className="ue-scenes video-showcase" id="video-showcase" aria-labelledby="video-showcase-title">
      <div className="ue-scenes-heading shell">
        <div className="section-label">
          <span>03.C</span>
          <p>GAME DEVELOPMENT / 游戏制作</p>
        </div>
        <div className="ue-scenes-heading-row">
          <div>
            <p className="eyebrow">PLAYABLE STUDIES / VIDEO</p>
            <h2 id="video-showcase-title">IDEAS MADE<br /><span>PLAYABLE.</span></h2>
          </div>
          <div className="ue-scenes-intro">
            <p>从事件逻辑与游戏原型，到 UE 中的场景表现和交互，把设计推进到可体验的状态。</p>
            <span>横向滑动播放 / {String(activeVideo + 1).padStart(2, "0")}—0{videos.length}</span>
          </div>
        </div>
        <div className="ue-scenes-controls" aria-label="视频切换">
          <button
            type="button"
            onClick={() => scrollToVideo(Math.max(0, activeVideo - 1))}
            disabled={activeVideo === 0}
            aria-label="播放上一段视频"
          >
            ←
          </button>
          <div className="ue-scenes-dots" aria-label="选择视频">
            {videos.map((video, index) => (
              <button
                type="button"
                key={video.src}
                className={activeVideo === index ? "is-active" : ""}
                onClick={() => scrollToVideo(index)}
                aria-label={`播放${video.title}`}
                aria-current={activeVideo === index ? "true" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollToVideo(Math.min(videos.length - 1, activeVideo + 1))}
            disabled={activeVideo === videos.length - 1}
            aria-label="播放下一段视频"
          >
            →
          </button>
        </div>
      </div>

      <div
        className="ue-scenes-track video-showcase-track"
        ref={trackRef}
        onScroll={updateActiveVideo}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollToVideo(Math.max(0, activeVideo - 1));
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollToVideo(Math.min(videos.length - 1, activeVideo + 1));
          }
        }}
        tabIndex={0}
        aria-label="游戏制作横向视频展示，使用左右方向键切换"
      >
        {videos.map((video, index) => (
          <figure
            className="ue-scenes-card video-showcase-card"
            id={`game-video-${String(index + 1).padStart(2, "0")}`}
            key={video.src}
            aria-label={`${video.title}，第 ${index + 1} 段，共 ${videos.length} 段`}
          >
            <video
              ref={(node) => {
                videoRefs.current[index] = node;
              }}
              src={video.src}
              autoPlay={index === 0}
              muted
              loop
              playsInline
              controls
              preload={index === 0 ? "auto" : "metadata"}
              aria-label={`${video.title}演示视频`}
            />
            <figcaption>
              <span>VIDEO / {String(index + 1).padStart(2, "0")}</span>
              <div>
                <small>{video.titleEn}</small>
                <strong>{video.title}</strong>
              </div>
              <p>{video.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
