import type { Metadata } from "next";
import "./portfolio.css";
import InteractiveProject, { type InteractiveProjectData } from "./InteractiveProject";
import StrengthsSection, { type StrengthData } from "./StrengthsSection";
import FloatingHeader from "./FloatingHeader";
import HeroVideo from "./HeroVideo";
import SpecularFrames from "./SpecularFrames";
import PortfolioMotion from "./PortfolioMotion";
import UeScenesGallery from "./UeScenesGallery";
import VideoShowcase from "./VideoShowcase";
import LearningShowcase from "./LearningShowcase";
import LiquidBackground from "./LiquidBackground";

export const metadata: Metadata = {
  title: "闫醴炀 | 3D 场景模型制作师",
  description:
    "闫醴炀的 3D 场景作品集，聚焦游戏场景、PBR 资产与 UE 场景搭建。",
};

const projects: InteractiveProjectData[] = [
  {
    index: "01",
    title: "废土卫星资产",
    titleEn: "ORBITAL RELIC",
    year: "2026",
    subtitle: "废土科幻卫星 · 硬表面建模与 PBR 材质",
    image: "/portfolio/optimized/satellite-angle-01.webp",
    details: [
      {
        image: "/portfolio/optimized/satellite-detail-body.webp",
        title: "中央舱体",
        note: "装甲层次 / 表面磨损",
        hotspot: { x: 64, y: 50, side: "left" },
      },
      {
        image: "/portfolio/optimized/satellite-detail-tank.webp",
        title: "动力组件",
        note: "管线结构 / 金属材质",
        hotspot: { x: 43, y: 58, side: "right" },
      },
      {
        image: "/portfolio/optimized/satellite-detail-tail.webp",
        title: "尾部结构",
        note: "网格护罩 / 管线连接",
        hotspot: { x: 82, y: 53, side: "left" },
      },
    ],
    meta: ["HARD SURFACE", "PBR MATERIAL", "PROP DESIGN"],
  },
  {
    index: "02",
    title: "梵音断魂",
    titleEn: "ECHO CLEAVER",
    year: "2024",
    subtitle: "风格化武器资产 · 造型、雕刻与材质表现",
    image: "/portfolio/optimized/weapon-main.webp",
    details: [
      {
        image: "/portfolio/optimized/weapon-detail-guard.webp",
        title: "护手与刃根",
        note: "宝石嵌件 / 做旧细节",
        hotspot: { x: 57, y: 59, side: "right" },
      },
      {
        image: "/portfolio/optimized/weapon-detail-pommel.webp",
        title: "月牙尾饰",
        note: "雕花层次 / 绳结材质",
        fit: "contain",
        hotspot: { x: 91, y: 48, side: "left" },
      },
      {
        image: "/portfolio/optimized/weapon-detail-grip.webp",
        title: "皮革握把",
        note: "缠绕结构 / 铆钉磨损",
        hotspot: { x: 76, y: 59, side: "left" },
      },
      {
        image: "/portfolio/optimized/weapon-detail-blade.webp",
        title: "刀刃纹饰",
        note: "金属边缘 / 浮雕花纹",
        hotspot: { x: 30, y: 57, side: "right" },
      },
    ],
    meta: ["3DS MAX", "PAINTER", "ZBRUSH"],
  },
  {
    index: "03",
    title: "风化神社门廊",
    titleEn: "SHRINE GATE",
    year: "2026",
    subtitle: "日式神社场景资产 · 木材、石材与灯笼 PBR 材质",
    image: "/portfolio/shrine/shrine-main.webp",
    imageFit: "contain",
    details: [
      {
        image: "/portfolio/shrine/shrine-detail-shimenawa.webp",
        title: "注连绳与木构",
        note: "木纹层次 / 风化与苔藓",
        hotspot: { x: 50, y: 71, side: "right" },
      },
      {
        image: "/portfolio/shrine/shrine-detail-lanterns.webp",
        title: "纸灯笼群",
        note: "透光材质 / 文字与花纹",
        hotspot: { x: 50, y: 46, side: "left" },
      },
      {
        image: "/portfolio/shrine/shrine-detail-ema.webp",
        title: "绘马与格栅",
        note: "木质磨损 / 小型挂饰",
        hotspot: { x: 22, y: 80, side: "right" },
      },
    ],
    meta: ["3DS MAX", "PBR", "ENVIRONMENT PROP"],
  },
];

const strengths: StrengthData[] = [
  {
    index: "01",
    title: "PBR 全流程",
    text: "掌握从高低模制作、拓扑与 UV，到烘焙、材质和最终输出的完整资产流程。",
  },
  {
    index: "02",
    title: "UE 场景搭建",
    text: "使用 UE 进行模块化场景搭建、灯光氛围塑造与叙事化构图，持续提升空间组织和游戏场景表现能力。",
  },
  {
    index: "03",
    title: "游戏制作",
    text: "拥有两次 Game Jam 项目经验，能够理解玩法、文案与策划需求，并与团队协作快速推进游戏原型。",
  },
  {
    index: "04",
    title: "快速学习",
    text: "持续学习 Blender、3ds Max 与 UE，并尝试 AI 辅助高模、手工低模的新工作流。",
  },
];

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  return (
    <main>
      <LiquidBackground />
      <FloatingHeader />
      <SpecularFrames />
      <PortfolioMotion />

      <section className="hero" id="top" aria-label="首页">
        <div className="hero-media">
          <HeroVideo />
        </div>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content shell">
          <div className="hero-kicker">
            <span className="status-dot" />
            3D 场景模型制作师 · 中国
          </div>
          <h1 className="hero-title">
            <span className="hero-title-line hero-title-line--solid"><span>ENVIRONMENT</span></span>
            <span className="hero-title-line hero-title-line--outline"><span>ARTIST</span></span>
          </h1>
          <div className="hero-bottom">
            <p>
              通过建模、材质与光影，
              <br />
              把一个场景变成可以被相信的世界。
            </p>
            <a className="round-link" href="#work" aria-label="浏览精选项目">
              <span>VIEW</span>
              <Arrow />
            </a>
          </div>
        </div>
        <div className="hero-index">
          <span>PORTFOLIO / 2026</span>
          <span>SCROLL TO EXPLORE</span>
        </div>
      </section>

      <section className="about section shell" id="about">
        <div className="section-label">
          <span>01</span>
          <p>PROFILE / 个人经历</p>
        </div>
        <div className="about-layout">
          <div className="portrait-wrap">
            <img src="/portfolio/optimized/portrait.webp" alt="闫醴炀个人照" loading="lazy" decoding="async" />
            <span className="portrait-caption">YAN LI YANG — 3D ENVIRONMENT</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">PROFILE / PERSONAL</p>
            <h2>ABOUT ME</h2>
            <div className="lead about-long-copy">
              <p>
                为人随和，责任心强，有一定的项目经验，具有组织能力和团队合作精神。曾参加过两次
                Game Jam，对文案及策划有较强的理解力，设计作品简洁有力、富有创意。
              </p>
              <p>
                有学习精神，喜欢学习和体验视频剪辑、音频制作、滑雪等不同领域。平时喜欢游戏，最近沉迷于
                《怪物猎人》《死亡搁浅》和《艾尔登法环》。法环破败又庄严的场景质感与怪物造型的想象力，
                常常让我停下来反复截图研究。
              </p>
              <p>
                我也很喜欢《空洞骑士》的手绘画面和孤独细腻的氛围，并从宫崎骏到《罗小黑战记》的动画中分析
                色彩设计与镜头语言。平时会浏览画师社区，收集素材并做视觉笔记。
              </p>
              <p>
                自学 Blender，之后系统学习 3ds Max 并掌握 PBR 全流程，最近在使用 UE 制作游戏。
                目前也在学习 AI 辅助高模、手动制作低模的新工作流程，并会持续吸收新的知识。
              </p>
            </div>
            <div className="experience-line">
              <span>2024 — 2028</span>
              <div>
                <strong>中央美术学院</strong>
                <p>艺术设计学 · 本科</p>
              </div>
            </div>
            <div className="experience-line">
              <span>ONGOING</span>
              <div>
                <strong>3D 环境艺术与游戏场景</strong>
                <p>Blender · 3ds Max · PBR · Unreal Engine</p>
              </div>
            </div>
            <div className="contact-row">
              <a href="tel:18239182752">182 3918 2752 <Arrow /></a>
              <a href="mailto:3272152869@qq.com">3272152869@qq.com <Arrow /></a>
            </div>
          </div>
        </div>
        <div className="metrics">
          <article>
            <strong>02</strong>
            <span>GAME JAM 经历</span>
          </article>
          <article>
            <strong>PBR</strong>
            <span>资产制作全流程</span>
          </article>
          <article>
            <strong>UE</strong>
            <span>场景搭建 / 游戏引擎</span>
          </article>
          <article>
            <strong>2028</strong>
            <span>EXPECTED GRADUATION</span>
          </article>
        </div>
      </section>

      <StrengthsSection strengths={strengths} />

      <section className="work section" id="work">
        <div className="shell">
          <div className="section-label">
            <span>03.A</span>
            <p>PBR WORKFLOW / PBR 全流程展示</p>
          </div>
          <div className="work-heading">
            <h2>SCENES WITH<br />A SENSE OF PLACE.</h2>
            <p>从单体资产到整体场景，建立统一、可读、有氛围的视觉世界。</p>
          </div>
        </div>
        <div className="project-cases shell">
          {projects.map((project) => (
            <InteractiveProject key={project.index} project={project} />
          ))}
        </div>
      </section>

      <UeScenesGallery />

      <VideoShowcase />

      <LearningShowcase />

      <section className="contact" id="contact">
        <div className="contact-orbit" aria-hidden="true" />
        <div className="contact-inner shell">
          <div className="section-label section-label--light">
            <span>04</span>
            <p>CONTACT / 联系方式</p>
          </div>
          <div className="contact-main">
            <p>HAVE A WORLD TO BUILD?</p>
            <h2>LET&apos;S MAKE IT<br /><span>BELIEVABLE.</span></h2>
            <div className="contact-direct">
              <a href="mailto:3272152869@qq.com">
                <small>EMAIL / 邮箱</small>
                <strong>3272152869@qq.com</strong>
                <Arrow />
              </a>
              <a href="tel:18239182752">
                <small>PHONE / 电话</small>
                <strong>+86 182 3918 2752</strong>
                <Arrow />
              </a>
            </div>
          </div>
          <footer>
            <span>AVAILABLE FOR INTERNSHIP / COLLABORATION</span>
            <p>闫醴炀 · 3D ENVIRONMENT ARTIST</p>
            <a href="#top">BACK TO TOP ↑</a>
          </footer>
        </div>
      </section>
    </main>
  );
}
