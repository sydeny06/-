"use client";

import { useLayoutEffect, useRef } from "react";

export default function PortfolioMotion() {
  const openingRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    let disposed = false;
    let disposeMotion: (() => void) | undefined;

    const setupMotion = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      const root = document.documentElement;
      const opening = openingRef.current;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        if (opening) opening.style.display = "none";
        root.classList.add("motion-complete");
        return;
      }

      root.classList.add("motion-active");

      const context = gsap.context(() => {
        const SCROLL_MOTION_SPEED = 1.5;
        const heroLines = gsap.utils.toArray<HTMLElement>(".hero-title-line > span");
        const heroSecondary = gsap.utils.toArray<HTMLElement>(
          ".hero-kicker, .hero-bottom, .hero-index",
        );
        const openingWords = gsap.utils.toArray<HTMLElement>(".opening-word > span");
        const counter = { value: 0 };

        gsap.set(heroLines, {
          yPercent: 125,
          scaleX: 0.68,
          skewX: -5,
          transformOrigin: "left center",
        });
        gsap.set(heroSecondary, { autoAlpha: 0, y: 52 });
        gsap.set(".topbar", { yPercent: -125, autoAlpha: 0 });
        gsap.set(".hero-media video", { scale: 1.14 });
        gsap.set(openingWords, { yPercent: 115, skewY: 4 });
        gsap.set(".opening-meta, .opening-progress, .opening-count", {
          autoAlpha: 0,
          y: 18,
        });
        gsap.set(".opening-progress > i", { scaleX: 0, transformOrigin: "left center" });

        const openingTimeline = gsap.timeline({
          defaults: { ease: "expo.out" },
          onComplete: () => {
            if (opening) opening.style.display = "none";
            root.classList.remove("motion-active");
            root.classList.add("motion-complete");
            ScrollTrigger.refresh();
          },
        });

        openingTimeline
          .to(".opening-meta", { autoAlpha: 1, y: 0, duration: 0.8 })
          .to(
            openingWords,
            { yPercent: 0, skewY: 0, duration: 1.15, stagger: 0.12 },
            0.12,
          )
          .to(
            ".opening-progress, .opening-count",
            { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08 },
            0.3,
          )
          .to(
            ".opening-progress > i",
            { scaleX: 1, duration: 1.45, ease: "power3.inOut" },
            0.42,
          )
          .to(
            counter,
            {
              value: 100,
              duration: 1.45,
              ease: "power3.inOut",
              onUpdate: () => {
                if (countRef.current) {
                  countRef.current.textContent = String(Math.round(counter.value)).padStart(2, "0");
                }
              },
            },
            0.42,
          )
          .to(
            ".opening-panel--left",
            { xPercent: -102, duration: 1.3, ease: "power4.inOut" },
            1.62,
          )
          .to(
            ".opening-panel--right",
            { xPercent: 102, duration: 1.3, ease: "power4.inOut" },
            1.62,
          )
          .to(
            ".opening-interface",
            { autoAlpha: 0, scale: 0.985, duration: 0.45, ease: "power2.in" },
            1.55,
          )
          .to(".hero-media video", { scale: 1, duration: 2.2 }, 1.45)
          .to(".topbar", { yPercent: 0, autoAlpha: 1, duration: 1.05 }, 1.82)
          .to(
            heroLines,
            {
              yPercent: 0,
              scaleX: 1,
              skewX: 0,
              duration: 1.48,
              stagger: 0.16,
            },
            1.78,
          )
          .to(
            heroSecondary,
            { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.12 },
            2.05,
          );

        const sectionSequences = [
          {
            section: ".about",
            title: ".about-copy > h2",
            support: ".about-copy > .eyebrow, .about-copy > .lead, .experience-line, .contact-row",
            cards: ".metrics > article",
            image: ".portrait-wrap img",
          },
          {
            section: ".strengths",
            title: ".strength-heading > h2",
            support: ".strength-heading > p",
            cards: ".strength-grid > article",
            image: "",
          },
          {
            section: ".work",
            title: ".work-heading > h2",
            support: ".work-heading > p",
            cards: "",
            image: "",
          },
          {
            section: ".ue-scenes",
            title: ".ue-scenes-heading-row h2",
            support: ".ue-scenes-heading-row .eyebrow, .ue-scenes-intro",
            cards: ".ue-scenes-card",
            image: "",
          },
          {
            section: ".video-showcase",
            title: ".ue-scenes-heading-row h2",
            support: ".ue-scenes-heading-row .eyebrow, .ue-scenes-intro",
            cards: ".video-showcase-card",
            image: "",
          },
          {
            section: ".learning-showcase",
            title: ".ue-scenes-heading-row h2",
            support: ".ue-scenes-heading-row .eyebrow, .ue-scenes-intro",
            cards: ".learning-showcase-card",
            image: "",
          },
          {
            section: ".contact",
            title: ".contact-main > h2",
            support: ".contact-main > p",
            cards: ".contact-direct > a",
            image: "",
          },
        ];

        sectionSequences.forEach(({ section, title, support, cards, image }) => {
          const sectionElement = document.querySelector<HTMLElement>(section);
          if (!sectionElement) return;

          const label = sectionElement.querySelector<HTMLElement>(".section-label");
          const titleElement = sectionElement.querySelector<HTMLElement>(title);
          const supportElements = sectionElement.querySelectorAll<HTMLElement>(support);
          const cardElements = cards
            ? sectionElement.querySelectorAll<HTMLElement>(cards)
            : [];
          const imageElement = image
            ? sectionElement.querySelector<HTMLImageElement>(image)
            : null;

          const sequence = gsap.timeline({
            scrollTrigger: {
              trigger: sectionElement,
              start: "top 72%",
              end: "bottom 28%",
              toggleActions: "restart none restart reset",
            },
          });

          sequence
            .fromTo(
              label,
              { clipPath: "inset(0 100% 0 0)", x: -84 },
              {
                clipPath: "inset(0 0% 0 0)",
                x: 0,
                duration: 1.05,
                ease: "power4.out",
              },
            )
            .fromTo(
              titleElement,
              {
                clipPath: "inset(100% 0 0 0)",
                yPercent: 108,
                scaleX: 0.62,
                skewX: -4,
                transformOrigin: "left bottom",
              },
              {
                clipPath: "inset(0% 0 0 0)",
                yPercent: 0,
                scaleX: 1,
                skewX: 0,
                duration: 1.72,
                ease: "expo.out",
              },
              "-=0.45",
            )
            .fromTo(
              supportElements,
              { autoAlpha: 0, y: 64, clipPath: "inset(18% 0 18% 0)" },
              {
                autoAlpha: 1,
                y: 0,
                clipPath: "inset(0% 0 0% 0)",
                duration: 1.05,
                stagger: 0.11,
                ease: "power4.out",
              },
              "-=0.68",
            );

          if (imageElement) {
            sequence.fromTo(
              imageElement,
              { clipPath: "inset(0 100% 0 0)", scale: 1.1 },
              {
                clipPath: "inset(0 0% 0 0)",
                scale: 1,
                duration: 1.45,
                ease: "power4.out",
              },
              "-=0.82",
            );
          }

          if (cardElements.length) {
            sequence.fromTo(
              cardElements,
              {
                autoAlpha: 0,
                y: 112,
                rotateX: 5,
                clipPath: "inset(18% 0 18% 0)",
                transformOrigin: "center top",
              },
              {
                autoAlpha: 1,
                y: 0,
                rotateX: 0,
                clipPath: "inset(0% 0 0% 0)",
                duration: 1.25,
                stagger: 0.16,
                ease: "power4.out",
              },
              "-=0.52",
            );
          }

          sequence.timeScale(SCROLL_MOTION_SPEED);
        });

        gsap.utils.toArray<HTMLElement>(".case-study").forEach((card) => {
          const cover = card.querySelector<HTMLElement>(".case-cover");
          const titleItems = card.querySelectorAll<HTMLElement>(".case-title > *");
          const frame = card.querySelector<HTMLElement>(".case-main-frame");

          const cardTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              end: "bottom 16%",
              toggleActions: "restart none restart reset",
            },
          });
          cardTimeline
            .fromTo(
              cover,
              { clipPath: "inset(14% 0 14% 0 round 30px)", y: 120, scale: 0.97 },
              {
                clipPath: "inset(0% 0 0% 0 round 20px)",
                y: 0,
                scale: 1,
                duration: 1.55,
                ease: "power4.out",
              },
            )
            .fromTo(
              titleItems,
              { autoAlpha: 0, y: 48 },
              { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" },
              "-=0.82",
            )
            .fromTo(
              frame,
              { autoAlpha: 0, y: 75, scale: 0.965 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 1.15, ease: "power4.out" },
              "-=0.62",
            );

          cardTimeline.timeScale(SCROLL_MOTION_SPEED);
        });

        const revealImages = gsap.utils.toArray<HTMLImageElement>(
          ".model-stage > .model-image, .detail-explorer-stage > img",
        );

        revealImages.forEach((image) => {
          const imageReveal = gsap.fromTo(
            image,
            { clipPath: "inset(0 0 100% 0)", scale: 1.08 },
            {
              clipPath: "inset(0 0 0% 0)",
              scale: 1,
              duration: 1.5,
              ease: "power4.out",
              scrollTrigger: {
                trigger: image,
                start: "top 88%",
                end: "bottom 12%",
                toggleActions: "restart none restart reset",
              },
            },
          );
          imageReveal.timeScale(SCROLL_MOTION_SPEED);
        });

        const media = gsap.matchMedia();
        media.add("(min-width: 761px)", () => {
          gsap.to(".hero-media", {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1.1,
            },
          });

          gsap.utils.toArray<HTMLElement>(".case-cover").forEach((cover) => {
            gsap.fromTo(
              cover,
              { backgroundPosition: "50% 43%" },
              {
                backgroundPosition: "50% 57%",
                ease: "none",
                scrollTrigger: {
                  trigger: cover,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.25,
                },
              },
            );
          });

          return () => undefined;
        });

        disposeMotion = () => {
          media.revert();
          context.revert();
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
          root.classList.remove("motion-active", "motion-complete");
        };

        window.setTimeout(() => ScrollTrigger.refresh(), 120);
      }, document.body);
    };

    setupMotion().catch(() => {
      if (openingRef.current) openingRef.current.style.display = "none";
    });

    return () => {
      disposed = true;
      disposeMotion?.();
    };
  }, []);

  return (
    <div className="opening-sequence" ref={openingRef} aria-hidden="true">
      <div className="opening-panel opening-panel--left" />
      <div className="opening-panel opening-panel--right" />
      <div className="opening-interface">
        <div className="opening-meta">
          <span>YLY / 3D ENVIRONMENT</span>
          <span>PORTFOLIO / 2026</span>
        </div>
        <div className="opening-word">
          <span>ENVIRONMENT</span>
          <span>ARCHIVE</span>
        </div>
        <div className="opening-loader">
          <div className="opening-progress"><i /></div>
          <span className="opening-count" ref={countRef}>00</span>
        </div>
      </div>
    </div>
  );
}
