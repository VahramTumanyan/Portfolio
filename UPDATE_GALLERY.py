from pathlib import Path
import json

ROOT = Path(__file__).resolve().parent
GALLERY = ROOT / "assets" / "gallery"
MANIFEST = GALLERY / "gallery.json"

EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}

files = sorted(
    p.name for p in GALLERY.iterdir()
    if p.is_file() and p.suffix.lower() in EXTS
)

items = [
    {
        "file": name,
        "title": Path(name).stem.replace("_", " ").replace("-", " ").strip()
    }
    for name in files
]

MANIFEST.write_text(
    json.dumps(items, ensure_ascii=False, indent=2),
    encoding="utf-8"
)

print(f"Gallery updated: {len(items)} image(s).")
print("Main viewer and thumbnails both use the SAME files from assets/gallery/.")
