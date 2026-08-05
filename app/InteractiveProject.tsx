"use client";

import { useRef, useState } from "react";

type ProjectDetail = {
  image: string;
  title: string;
  note: string;
  fit?: "cover" | "contain";
  hotspot: {
    x: number;
    y: number;
    side: "left" | "right";
  };
};

export type InteractiveProjectData = {
  index: string;
  title: string;
  titleEn: string;
  year: string;
  subtitle: string;
  image: string;
  imageFit?: "cover" | "contain";
  details: ProjectDetail[];
  meta: string[];
};

type Props = {
  project: InteractiveProjectData;
};

export default function InteractiveProject({ project }: Props) {
  const [activeDetail, setActiveDetail] = useState(0);
  const detailViewerRef = useRef<HTMLDivElement>(null);
  const active = project.details[activeDetail];

  const openDetail = (detailIndex: number) => {
    setActiveDetail(detailIndex);
    window.requestAnimationFrame(() => {
      detailViewerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      detailViewerRef.current?.focus({ preventScroll: true });
    });
  };

  return (
    <article className="case-study" id={`project-${project.index}`}>
      <div className="case-cover" style={{ backgroundImage: `url(${project.image})` }}>
        <div className="case-cover-shade" />
        <div className="case-title">
          <span>{project.year} / SELECTED WORK</span>
          <h3>{project.titleEn}</h3>
          <strong>{project.title}</strong>
          <p>{project.subtitle}</p>
        </div>
        <div className="case-mark">
          <b>{project.index}</b>
          <span>YLY / ASSET LAB</span>
        </div>

        <div className="case-main-frame">
          <div className="case-frame-head">
            <span>PROJECT — {project.index}</span>
            <span>HOVER THE HOTSPOTS / 点击查看细节</span>
          </div>
          <div className="model-stage">
            <img
              className="model-image"
              src={project.image}
              alt={`${project.title}完整模型`}
              style={{ objectFit: project.imageFit }}
            />
            <span className="model-stage-grid" aria-hidden="true" />
            <span className="model-interaction-hint">INTERACTIVE MODEL · 交互模型</span>
            {project.details.map((detail, detailIndex) => (
              <button
                className="model-hotspot"
                data-side={detail.hotspot.side}
                key={detail.image}
                onClick={() => openDetail(detailIndex)}
                style={{ left: `${detail.hotspot.x}%`, top: `${detail.hotspot.y}%` }}
                type="button"
                aria-label={`查看${project.title}的${detail.title}`}
              >
                <span className="hotspot-ring" aria-hidden="true" />
                <span className="hotspot-number">0{detailIndex + 1}</span>
                <span className="hotspot-preview">
                  <img src={detail.image} alt="" style={{ objectFit: detail.fit ?? "cover" }} />
                  <span className="hotspot-preview-copy">
                    <b>{detail.title}</b>
                    <small>{detail.note}</small>
                  </span>
                  <span className="hotspot-preview-action">CLICK TO EXPLORE →</span>
                </span>
              </button>
            ))}
          </div>
          <div className="case-frame-foot">
            <span>YAN LI YANG / PORTFOLIO</span>
            <span>{project.year}</span>
          </div>
        </div>
      </div>

      <div
        className="case-details interactive-detail-panel"
        id={`project-${project.index}-details`}
        ref={detailViewerRef}
        tabIndex={-1}
      >
        <div className="case-section-title">
          <span>Detail Explorer</span>
          <small>选择热点或缩略图 / 01—0{project.details.length}</small>
        </div>
        <div className="detail-explorer">
          <div className="detail-explorer-stage">
            <img
              src={active.image}
              alt={`${project.title} — ${active.title}`}
              style={{ objectFit: active.fit ?? "cover" }}
            />
            <div className="detail-explorer-index">
              <span>DETAIL / 0{activeDetail + 1}</span>
              <strong>{active.title}</strong>
              <small>{active.note}</small>
            </div>
          </div>
          <div className="detail-explorer-nav" aria-label={`${project.title}细节选择`}>
            {project.details.map((detail, detailIndex) => (
              <button
                className={detailIndex === activeDetail ? "is-active" : ""}
                key={detail.image}
                onClick={() => setActiveDetail(detailIndex)}
                type="button"
                aria-pressed={detailIndex === activeDetail}
              >
                <img src={detail.image} alt="" style={{ objectFit: detail.fit ?? "cover" }} />
                <span>
                  <small>0{detailIndex + 1}</small>
                  <b>{detail.title}</b>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </article>
  );
}
