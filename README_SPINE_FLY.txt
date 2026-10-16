SPINE FLY VERSION

What changed:
- The old CSS fly was replaced with the user's Spine 4.3 animation.
- Used files:
  assets/spine/jeko_spine_final.json
  assets/spine/jeko_spine_final.atlas
  assets/spine/jeko_spine_final.png
  assets/spine/jeko_spine_final_2.png
  assets/spine/jeko_spine_final_3.png
  assets/spine/jeko_spine_final_4.png
  assets/spine/jeko_spine_final_5.png
- Runtime loaded from UNPKG:
  @esotericsoftware/spine-player@4.3.13
- Behavior:
  idle = normal movement
  run = cursor near
  fire = cursor very close or click
- The fly never rotates upside down; it only flips left/right.

IMPORTANT
- The site needs internet access once published so the Spine player runtime can load from UNPKG.
- All Spine atlas pages are stored locally in assets/spine.
