from pathlib import Path

from PIL import Image


SOURCE_ROOT = Path(r"F:\神社\优化\打光")
OUTPUT_ROOT = Path(__file__).resolve().parents[1] / "public" / "portfolio" / "shrine"

IMAGES = {
    "01_Camera 1.png": "shrine-main.webp",
    "01_Camera 3.png": "shrine-detail-shimenawa.webp",
    "02_Camera 3.png": "shrine-detail-lanterns.webp",
    "03_Camera 3.png": "shrine-detail-ema.webp",
}


def main() -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    for source_name, output_name in IMAGES.items():
        with Image.open(SOURCE_ROOT / source_name) as image:
            image = image.convert("RGB")
            image.thumbnail((2048, 2048), Image.Resampling.LANCZOS)
            image.save(OUTPUT_ROOT / output_name, "WEBP", quality=90, method=6)


if __name__ == "__main__":
    main()
