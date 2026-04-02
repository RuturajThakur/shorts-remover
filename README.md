# Shorts Remover

A lightweight Chrome extension that hides YouTube Shorts from:

- the home feed
- shelf/section recommendations
- Shorts video cards
- the Shorts navigation entry
- direct `/shorts/...` pages by redirecting back to the YouTube home page

## Why this exists

YouTube keeps surfacing Shorts across the homepage and sidebar, even if you
mainly want regular videos. This extension removes the most common Shorts entry
points to make the browsing experience calmer and less distracting.

## Install locally

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select `D:\extenstions\shorts-remover`.

## Files

- `manifest.json`: Chrome extension manifest (MV3)
- `content.js`: hides Shorts-related UI on YouTube
- `icons/`: extension icons used by Chrome
- `LICENSE`: MIT license

## License

MIT
