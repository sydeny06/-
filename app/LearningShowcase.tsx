"use client";

import { useRef, useState } from "react";

const notes = [
  {
    image: "/portfolio/learning-notes/satellite-material-analysis-01.png",
    title: "卫星材质分析 I",
    titleEn: "SATELLITE MATERIAL STUDY",
    note: "结构拆分 / 材质观察 / 磨损逻辑",
  },
  {
    image: "/portfolio/learning-notes/satellite-material-analysis-02.png",
    title: "卫星材质分析 II",
    titleEn: "SURFACE BREAKDOWN",
    note: "零件材质 / 接缝关系 / 表面细节",
  },
  {
    image: "/portfolio/learning-notes/project-design-map.png",
    title: "项目设计知识图谱",
    titleEn: "PROJECT KNOWLEDGE MAP",
    note: "设计研究 / 制作规划 / 视觉参考",
  },
  {
    image: "/portfolio/learning-notes/substance-wood-material.png",
    title: "SP 木头材质",
    titleEn: "SUBSTANCE WOOD STUDY",
    note: "木纹结构 / 粗糙度 / 老化细节",
  },
  {
    image: "/portfolio/learning-notes/ue5-learning-map.png",
    title: "UE5 学习导图",
    titleEn: "UNREAL ENGINE 5 MAP",
    note: "基础操作 / 灯光系统 / 渲染设置",
  },
  {
    image: "/portfolio/learning-notes/ue-blueprint-notes.png",
    title: "UE 蓝图与交互笔记",
    titleEn: "BLUEPRINT & INTERACTION",
    note: "角色控制 / 蓝图节点 / 交互逻辑",
  },
  {
    image: "/portfolio/learning-notes/material-rendering-notes.png",
    title: "材质与渲染笔记",
    titleEn: "MATERIAL & RENDERING",
    note: "PBR 概念 / 光照关系 / 材质输出",
  },
];

export default function LearningShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeNote, setActiveNote] = useState(0);

  const scrollToNote = (index: number) => {
    const target = trackRef.current?.children[index] as HTMLElement | undefined;
    target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  const updateActiveNote = () => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const nearestIndex = cards.reduce((nearest, card, index) => {
      const nearestDistance = Math.abs(cards[nearest].offsetLeft - track.scrollLeft);
      const cardDistance = Math.abs(card.offsetLeft - track.scrollLeft);
      return cardDistance < nearestDistance ? index : nearest;
    }, 0);

    setActiveNote(nearestIndex);
  };

  return (
    <section
      className="ue-scenes learning-showcase"
      id="learning-showcase"
      aria-labelledby="learning-showcase-title"
    >
      <div className="ue-scenes-heading shell">
        <div className="section-label">
          <span>03.D</span>
          <p>LEARNING ARCHIVE / 快速学习</p>
        </div>
        <div className="ue-scenes-heading-row">
          <div>
            <p className="eyebrow">NOTES / RESEARCH / PRACTICE</p>
            <h2 id="learning-showcase-title">LEARN.<br /><span>MAP. APPLY.</span></h2>
          </div>
          <div className="ue-scenes-intro">
            <p>把材质观察、软件知识与项目研究整理成可回看的视觉笔记，让每次学习都进入下一次制作。</p>
            <span>横向滑动浏览 / {String(activeNote + 1).padStart(2, "0")}—0{notes.length}</span>
          </div>
        </div>
        <div className="ue-scenes-controls" aria-label="学习笔记切换">
          <button
            type="button"
            onClick={() => scrollToNote(Math.max(0, activeNote - 1))}
            disabled={activeNote === 0}
            aria-label="查看上一张学习笔记"
          >
            ←
          </button>
          <div className="ue-scenes-dots learning-showcase-dots" aria-label="选择学习笔记">
            {notes.map((note, index) => (
              <button
                type="button"
                key={note.image}
                className={activeNote === index ? "is-active" : ""}
                onClick={() => scrollToNote(index)}
                aria-label={`查看${note.title}`}
                aria-current={activeNote === index ? "true" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollToNote(Math.min(notes.length - 1, activeNote + 1))}
            disabled={activeNote === notes.length - 1}
            aria-label="查看下一张学习笔记"
          >
            →
          </button>
        </div>
      </div>

      <div
        className="ue-scenes-track learning-showcase-track"
        ref={trackRef}
        onScroll={updateActiveNote}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollToNote(Math.max(0, activeNote - 1));
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollToNote(Math.min(notes.length - 1, activeNote + 1));
          }
        }}
        tabIndex={0}
        aria-label="快速学习横向笔记展示，使用左右方向键切换"
      >
        {notes.map((note, index) => (
          <figure
            className="ue-scenes-card learning-showcase-card"
            id={`learning-note-${String(index + 1).padStart(2, "0")}`}
            key={note.image}
            aria-label={`${note.title}，第 ${index + 1} 张，共 ${notes.length} 张`}
          >
            <a
              className="learning-image-link"
              href={note.image}
              target="_blank"
              rel="noreferrer"
              aria-label={`打开${note.title}原图`}
            >
              <img src={note.image} alt={`${note.title}学习笔记`} />
            </a>
            <figcaption>
              <span>NOTE / {String(index + 1).padStart(2, "0")}</span>
              <div>
                <small>{note.titleEn}</small>
                <strong>{note.title}</strong>
              </div>
              <p>{note.note}<br />点击图片查看原图 ↗</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
