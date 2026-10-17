LOCAL PREVIEW

1. Extract this ZIP to any folder on your Windows computer.
2. Double-click OPEN_SITE_LOCAL.bat.
3. Your browser opens http://localhost:8000.
4. Keep the black command window open while testing.
5. Close it or press Ctrl+C when finished.

Why this is needed:
Spine files are loaded through JavaScript/fetch, so opening index.html directly with file:// can fail.
A small local HTTP server makes the site behave much more like GitHub Pages without uploading anything.

Nothing is uploaded to the internet.
