import os
import json
from pathlib import Path
from PIL import Image


SRC_DIR = Path(__file__).resolve().parents[3] / "görseller"
UPLOADS_DIR = Path(__file__).resolve().parents[1] / "uploads"
SEEDS_DIR = UPLOADS_DIR / "seeds"


def ensure_dirs():
    UPLOADS_DIR.mkdir(exist_ok=True)
    SEEDS_DIR.mkdir(parents=True, exist_ok=True)


def slugify(name: str) -> str:
    s = name.lower()
    for ch, repl in {
        "ş": "s", "ı": "i", "ö": "o", "ç": "c", "ğ": "g", "ü": "u",
        " ": "-", "/": "-", "\\": "-"
    }.items():
        s = s.replace(ch, repl)
    return "".join(c for c in s if c.isalnum() or c in "-_")


def convert_to_jpg(src_path: Path, dst_path: Path):
    dst_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        with Image.open(src_path) as im:
            # Convert to RGB if needed
            if im.mode in ("RGBA", "P", "LA"):
                im = im.convert("RGB")
            elif im.mode not in ("RGB", "L"):
                im = im.convert("RGB")
            # Save JPEG with reasonable quality
            im.save(dst_path, format="JPEG", quality=85)
        return True
    except Exception as e:
        print(f"Failed to convert {src_path}: {e}")
        return False


def scan_categories():
    # Heuristic: use named folders as categories
    category_names = [
        "Hermetik Klasik Tip",
        "Tam Yoğuşmalı Premix Tip",
        "İlk tasarım",
    ]

    found = {}
    # Search for those names anywhere under SRC_DIR
    for root, dirs, files in os.walk(SRC_DIR):
        for cname in category_names:
            if cname.lower() in root.lower():
                found.setdefault(cname, []).extend(
                    [Path(root) / f for f in files if f.lower().endswith((".tif", ".tiff", ".jpg", ".jpeg", ".png"))]
                )

    # Also add numeric folders as generic combi items
    for num in map(str, range(1, 51)):
        p = SRC_DIR / num
        if p.exists() and p.is_dir():
            found.setdefault("Kombi Genel", []).extend(
                [p / f for f in os.listdir(p) if f.lower().endswith((".tif", ".tiff", ".jpg", ".jpeg", ".png"))]
            )

    return found


def build_seeds(found):
    categories_seed = []
    hero_seed = []

    for cname, files in found.items():
        cat_slug = slugify(cname)
        # Pick first image as category cover
        cover_url = None
        for idx, f in enumerate(files):
            # Convert to jpg into uploads/kombi/<slug>/img-<n>.jpg
            dst = UPLOADS_DIR / "kombi" / cat_slug / f"img-{idx+1}.jpg"
            ok = convert_to_jpg(Path(f), dst)
            if not ok:
                continue
            url = f"/uploads/kombi/{cat_slug}/img-{idx+1}.jpg"
            if cover_url is None:
                cover_url = url
            # For hero slides, pick up to 3 good images per category
            if idx < 3:
                hero_seed.append({
                    "title": {
                        "tr": cname,
                        "en": cname,
                        "ru": cname,
                        "it": cname,
                    },
                    "subtitle": {
                        "tr": "Kaliteli ısıtma çözümleri",
                        "en": "Quality heating solutions",
                        "ru": "Качественные отопительные решения",
                        "it": "Soluzioni di riscaldamento di qualità",
                    },
                    "image": url,
                    "link": "/products",
                    "order": len(hero_seed) + 1,
                })

        if cover_url:
            categories_seed.append({
                "id": cat_slug,
                "name": cname,
                "nameEn": cname,
                "nameIt": cname,
                "nameTr": cname,
                "icon": "flame",
                "image": cover_url,
            })

    # Save seeds
    SEEDS_DIR.mkdir(parents=True, exist_ok=True)
    with open(SEEDS_DIR / "categories.json", "w", encoding="utf-8") as f:
        json.dump(categories_seed, f, ensure_ascii=False, indent=2)
    with open(SEEDS_DIR / "hero_slides.json", "w", encoding="utf-8") as f:
        json.dump(hero_seed, f, ensure_ascii=False, indent=2)

    print(f"Wrote {len(categories_seed)} categories and {len(hero_seed)} hero slides seeds.")


def main():
    ensure_dirs()
    if not SRC_DIR.exists():
        print(f"Source directory not found: {SRC_DIR}")
        return
    found = scan_categories()
    if not found:
        print("No images found under source directory.")
        return
    build_seeds(found)


if __name__ == "__main__":
    main()