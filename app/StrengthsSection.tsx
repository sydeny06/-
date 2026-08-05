"use client";

export type StrengthData = {
  index: string;
  title: string;
  text: string;
};

type Props = {
  strengths: StrengthData[];
};

const modelChoices = [
  {
    href: "#project-01",
    image: "/portfolio/satellite-angle-01.jpg",
    index: "01",
    title: "废土卫星资产",
    meta: "HARD SURFACE / PBR",
  },
  {
    href: "#project-02",
    image: "/portfolio/weapon-main.jpg",
    index: "02",
    title: "梵音断魂",
    meta: "STYLIZED PROP / PBR",
  },
  {
    href: "#project-03",
    image: "/portfolio/shrine/shrine-main.webp",
    index: "03",
    title: "风化神社门廊",
    meta: "ENVIRONMENT ASSET / PBR",
  },
];

const ueSceneChoices = [
  {
    href: "#ue-scene-01",
    image: "/portfolio/ue-scenes/ruins-settlement.png",
    index: "01",
    title: "废墟聚落",
    meta: "RUINS / OVERCAST / FOG",
  },
  {
    href: "#ue-scene-02",
    image: "/portfolio/ue-scenes/forest-shrine.png",
    index: "02",
    title: "林间神社",
    meta: "SHRINE / LIGHTING / RAIN",
  },
];

export default function StrengthsSection({ strengths }: Props) {
  return (
    <section className="strengths section shell" id="strengths">
      <div className="section-label">
        <span>02</span>
        <p>CAPABILITIES / 个人优势</p>
      </div>
      <div className="strength-heading">
        <h2>CRAFT.<br />SYSTEM.<br /><span>CURIOSITY.</span></h2>
        <p>模型是基础，审美是方向，学习能力让两者不断向前。</p>
      </div>
      <div className="strength-grid">
        {strengths.map((strength) => {
          const isPbr = strength.index === "01";
          const isUe = strength.index === "02";
          const isInteractive = isPbr || isUe;
          const choices = isUe ? ueSceneChoices : modelChoices;

          return (
            <article
              className={isInteractive ? `strength-card--pbr${isUe ? " strength-card--ue" : ""}` : ""}
              key={strength.index}
            >
              {isInteractive ? (
                <>
                  <div
                    className="strength-card-trigger"
                    tabIndex={0}
                    aria-label={isUe ? "悬停或聚焦后选择 UE 场景" : "悬停或聚焦后选择 PBR 模型"}
                  >
                    <span className="strength-top">
                      <span>{strength.index}</span>
                      <span className="cross" aria-hidden="true">+</span>
                    </span>
                    <h3>{strength.title}</h3>
                    <p>{strength.text}</p>
                    <span className="strength-action">
                      {isUe ? "悬停选择 UE 场景 →" : "悬停选择 PBR 模型 →"}
                    </span>
                  </div>

                  <div
                    className="model-chooser"
                    id={isUe ? "ue-scene-chooser" : "pbr-model-chooser"}
                    role="group"
                    aria-label={isUe ? "选择 UE 场景" : "选择 PBR 模型"}
                  >
                    <div className="model-chooser-head">
                      <span>{isUe ? "SELECT A SCENE / 选择场景" : "SELECT A MODEL / 选择模型"}</span>
                    </div>
                    <div className={`model-choice-list${isUe ? " model-choice-list--ue" : ""}`}>
                      {choices.map((model) => (
                        <a href={model.href} key={model.index}>
                          <img src={model.image} alt={`${model.title}预览`} />
                          <span>
                            <small>{model.index} / {isUe ? "SCENE" : "MODEL"}</small>
                            <b>{model.title}</b>
                            <em>{model.meta}</em>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="strength-top">
                    <span>{strength.index}</span>
                    <span className="cross" aria-hidden="true">+</span>
                  </div>
                  <h3>{strength.title}</h3>
                  <p>{strength.text}</p>
                </>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
