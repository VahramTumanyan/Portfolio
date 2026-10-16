HOW TO TEST THE SPINE FLY ON GITHUB PAGES

Upload ALL files and folders from this package to the repository root.

Important:
index.html
style.css
script.js
projects.js
assets/
  spine/
    jeko_spine_final.json
    jeko_spine_final.atlas
    jeko_spine_final.png
    jeko_spine_final_2.png
    jeko_spine_final_3.png
    jeko_spine_final_4.png
    jeko_spine_final_5.png

GitHub Pages:
Settings -> Pages
Source: Deploy from a branch
Branch: main
Folder: /(root)
Save

Then open the GitHub Pages URL.

Why local double-click may fail:
Browsers can block JSON/atlas/file loading from file:// URLs.
GitHub Pages serves the files over HTTPS, which is the correct way to test Spine Web Player.

Interactive behavior:
idle = normal
run = cursor near
fire = cursor very close or click
A blue projectile flies toward the cursor when fire triggers.
