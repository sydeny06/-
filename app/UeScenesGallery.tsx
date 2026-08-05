"use client";

import { useRef, useState } from "react";

const scenes = [
  {
    image: "/portfolio/ue-scenes/ruins-settlement.png",
    title: "废墟聚落",
    titleEn: "RUINED SETTLEMENT",
    note: "废墟建筑群 / 阴天雾效 / 叙事化构图",
  },
  {
    image: "/portfolio/ue-scenes/forest-shrine.png",
    title: "林间神社",
    titleEn: "FOREST SHRINE",
    note: "日式木构 / 暖冷光影 / 雨林氛围",
  },
];

export default function UeScenesGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);

  const scrollToScene = (index: number) => {
    const target = trackRef.current?.children[index] as HTMLElement | undefined;
    target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  const updateActiveScene = () => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const nearestIndex = cards.reduce((nearest, card, index) => {
      const nearestDistance = Math.abs(cards[nearest].offsetLeft - track.scrollLeft);
      const cardDistance = Math.abs(card.offsetLeft - track.scrollLeft);
      return cardDistance < nearestDistance ? index : nearest;
    }, 0);

    setActiveScene(nearestIndex);
  };

  return (
    <section className="ue-scenes" id="ue-scenes" aria-labelledby="ue-scenes-title">
      <div className="ue-scenes-heading shell">
        <div className="section-label">
          <span>02.5</span>
          <p>UNREAL ENGINE / 场景搭建</p>
        </div>
        <div className="ue-scenes-heading-row">
          <div>
            <p className="eyebrow">ENVIRONMENT STUDIES / UE</p>
            <h2 id="ue-scenes-title">WORLDS BUILT<br /><span>IN ENGINE.</span></h2>
          </div>
          <div className="ue-scenes-intro">
            <p>通过模块化资产、灯光与环境氛围，在引擎中建立可被感知的空间叙事。</p>
            <span>横向滑动浏览 / {String(activeScene + 1).padStart(2, "0")}—0{scenes.length}</span>
          </div>
        </div>
        <div className="ue-scenes-controls" aria-label="场景切换">
          <button
            type="button"
            onClick={() => scrollToScene(Math.max(0, activeScene - 1))}
            disabled={activeScene === 0}
            aria-label="查看上一张 UE 场景"
          >
            ←
          </button>
          <div className="ue-scenes-dots" aria-label="选择场景">
            {scenes.map((scene, index) => (
              <button
                type="button"
                key={scene.image}
                className={activeScene === index ? "is-active" : ""}
                onClick={() => scrollToScene(index)}
                aria-label={`查看${scene.title}`}
                aria-current={activeScene === index ? "true" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollToScene(Math.min(scenes.length - 1, activeScene + 1))}
            disabled={activeScene === scenes.length - 1}
            aria-label="查看下一张 UE 场景"
          >
            →
          </button>
        </div>
      </div>

      <div
        className="ue-scenes-track"
        ref={trackRef}
        onScroll={updateActiveScene}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollToScene(Math.max(0, activeScene - 1));
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollToScene(Math.min(scenes.length - 1, activeScene + 1));
          }
        }}
        tabIndex={0}
        aria-label="UE 场景横向作品展示，使用左右方向键切换"
      >
        {scenes.map((scene, index) => (
          <figure className="ue-scenes-card" key={scene.image} aria-label={`${scene.title}，第 ${index + 1} 张，共 ${scenes.length} 张`}>
            <img src={scene.image} alt={`${scene.title} Unreal Engine 场景`} />
            <figcaption>
              <span>SCENE / {String(index + 1).padStart(2, "0")}</span>
              <div>
                <small>{scene.titleEn}</small>
                <strong>{scene.title}</strong>
              </div>
              <p>{scene.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
