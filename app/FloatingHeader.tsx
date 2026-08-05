"use client";

import { useEffect, useState } from "react";
import SpecularButton from "./SpecularButton";

export default function FloatingHeader() {
  const [isFloating, setIsFloating] = useState(false);
  const [isCapabilitiesOpen, setIsCapabilitiesOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateHeader = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setIsFloating(window.scrollY > 24);
      });
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  return (
    <header className={`topbar${isFloating ? " is-floating" : ""}`}>
      <a className="brand" href="#top" aria-label="返回首页">
        <span>闫醴炀</span>
        <small>ENV / 3D</small>
      </a>
      <nav aria-label="主导航">
        <a href="#about">关于</a>
        <div className={`nav-capabilities${isCapabilitiesOpen ? " is-open" : ""}`}>
          <button
            className="nav-capabilities-trigger"
            type="button"
            aria-haspopup="true"
            aria-expanded={isCapabilitiesOpen}
            aria-controls="nav-capabilities-menu"
            onClick={() => setIsCapabilitiesOpen((open) => !open)}
          >
            能力 <span aria-hidden="true">⌄</span>
          </button>
          <div id="nav-capabilities-menu" className="nav-capabilities-menu" aria-label="能力模块导航">
            <a href="#work" onClick={() => setIsCapabilitiesOpen(false)}>
              <small>01</small>
              <span>PBR 全流程</span>
            </a>
            <a href="#ue-scenes" onClick={() => setIsCapabilitiesOpen(false)}>
              <small>02</small>
              <span>UE 场景搭建</span>
            </a>
            <a href="#video-showcase" onClick={() => setIsCapabilitiesOpen(false)}>
              <small>03</small>
              <span>游戏制作</span>
            </a>
            <a href="#learning-showcase" onClick={() => setIsCapabilitiesOpen(false)}>
              <small>04</small>
              <span>快速学习</span>
            </a>
          </div>
        </div>
        <a href="#work">作品</a>
      </nav>
      <SpecularButton
        className="topbar-contact-button"
        size="sm"
        radius={999}
        tint="#b8dc46"
        tintOpacity={0.035}
        blur={14}
        textColor="#eef2ed"
        lineColor="#b8dc46"
        baseColor="#405028"
        intensity={1.25}
        shineSize={13}
        shineFade={42}
        thickness={1}
        speed={0.3}
        proximity={300}
        onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
      >
        联系我 <span aria-hidden="true">↗</span>
      </SpecularButton>
    </header>
  );
}
