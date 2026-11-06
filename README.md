# SHMELZFILM

Portfolio website of Fedor Shmelkin. Design: ©2026 SHMEL.DESIGN

## Files

- `index.html` — page structure
- `style.css` — all styling
- `script.js` — behaviour, and the list of projects at the top
- `videos/` — the short looping preview clips
- `images/` — screenshots and the portrait on the bio page

## Adding or changing a project

Open `script.js` and edit the `projects` list at the top. Each project has:

- `title`
- `longDescription` — the "About the project" text
- `previewSrc` — the preview clip in `videos/`
- `embedUrl` — the YouTube or Vimeo _embed_ link
- `screenshots` — the images in `images/`, in the order they should appear

Rules for file names: no spaces (use `_`), and exact capital letters. Websites are
case-sensitive, so `Photo.JPG` and `photo.jpg` are different files.
Keep each preview clip to a few MB (about 720p, 5–10 seconds).
