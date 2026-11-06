/* =====================================================
   PROJECT DATA
   Edit this array to add/change your projects.
   - previewSrc: local video file used for the homepage loop
   - embedUrl: YouTube/Vimeo embed link used on the project page
   - credits: the small line under the title (director, dept, year...)
   - longDescription: a longer paragraph, shown between the screenshots
     and the video, under the "About the project" label
   - screenshotsFolder: a folder under /images/ containing 1.jpg, 2.jpg,
     3.jpg... in order, no gaps. The code figures out how many exist
     automatically — you don't list filenames here.
===================================================== */
const projects = [
  {
    id: 1,
    title: "A Rolling Hitch",
    longDescription:
      "A longer paragraph about the project — process, concept, or context. Replace this with your real text; it sits next to the video once you scroll past the screenshots. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    previewSrc: "videos/A_rolling_hitch_preview.mp4",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    screenshots: ["images/rolling_hitch_still_0.jpg", "images/rolling_hitch_still_1.jpg", "images/rolling_hitch_still_2.jpg", "images/rolling_hitch_still_3.jpg", "images/rolling_hitch_still_4.jpg", "images/rolling_hitch_still_5.jpg", "images/rolling_hitch_still_6.jpg", "images/rolling_hitch_still_7.jpg"]
  },
  {
    id: 2,
    title: "Opera for Service Dogs",
    longDescription:
      "A longer paragraph about the project — process, concept, or context. Replace this with your real text; it sits next to the video once you scroll past the screenshots. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    previewSrc: "videos/Opera_for_service_Dogs_preview.mp4",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    screenshots: ["images/Opera_for_service_Dogs_still_1.jpg", "images/Opera_for_service_Dogs_still_2.jpg", "images/Opera_for_service_Dogs_still_3.jpg", "images/Opera_for_service_Dogs_still_4.jpg", "images/Opera_for_service_Dogs_still_5.jpg", "images/Opera_for_service_Dogs_still_6.jpg", "images/Opera_for_service_Dogs_still_7.jpg"]
  },
  {
    id: 3,
    title: "Hause Project",
    longDescription:
    "A longer paragraph about the project — process, concept, or context. Replace this with your real text; it sits next to the video once you scroll past the screenshots. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    previewSrc: "videos/Hause_project_preview.mp4",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    screenshots: ["images/Haus_still_1.jpg", "images/Haus_still_2.jpg", "images/Haus_still_3.jpg", "images/Haus_still_4.jpg", "images/Haus_still_5.jpg", "images/Haus_still_6.jpg", "images/Haus_still_7.jpg", "images/Haus_still_8.jpg", "images/Haus_still_9.jpg"]
  },
  {
    id: 4,
    title: "Pocker on Dactyl",
    longDescription:
    "A longer paragraph about the project — process, concept, or context. Replace this with your real text; it sits next to the video once you scroll past the screenshots. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    previewSrc: "videos/Pocker_on_Dactyl_preview.mp4",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    screenshots: ["images/Pocker_still_1.jpg", "images/Pocker_still_2.jpg", "images/Pocker_still_3.jpg"]
  }
];
 
 
/* Tries loading folder/1.*, folder/2.*, folder/3.*... (checking jpg, png,
   jpeg, webp for each number) and stops at the first number where none
   of those extensions load. That "failure" is expected — it's just how
   the code finds the end of the folder, not a bug. */
function detectScreenshots(folder, max = 30, exts = ["jpg", "png", "jpeg", "webp"]) {
  return new Promise((resolve) => {
    const found = [];
 
    function tryNumber(i, extIndex) {
      if (i > max) return resolve(found);
      if (extIndex >= exts.length) return resolve(found); // no extension matched — folder ends here
 
      const img = new Image();
      img.onload = () => {
        found.push(`${folder}/${i}.${exts[extIndex]}`);
        tryNumber(i + 1, 0); // found this one, move on to the next number
      };
      img.onerror = () => tryNumber(i, extIndex + 1); // try the next extension for this same number
      img.src = `${folder}/${i}.${exts[extIndex]}`;
    }
 
    tryNumber(1, 0);
  });
}
 
/* =====================================================
   STATE
===================================================== */
let mode = "line";        // "line" | "grid"
let isPaused = false;     // is the line frozen (hover or overlay open)
let overlayOpen = false;  // is project or contact overlay open
let posX = 0;             // current horizontal offset of the line
let setWidth = 0;         // width of ONE full set of videos (for looping)
const SPEED = 36;         // line speed in pixels per SECOND (time-based, so 60Hz and 120Hz screens move the same)
let activeScreen = 0;     // index of the currently-focused screenshot in the trail
let returnFocus = null;   // keyboard users: what gets focus back when a page closes
 
const SLIDE_MS = 500;     // how long a page takes to slide — must match --move in style.css
const FADE_MS = 300;      // must match --fade in style.css
 
/* =====================================================
   ELEMENTS
===================================================== */
const lineEl = document.getElementById("video-line");
const lineWrapper = document.getElementById("line-wrapper");
const gridView = document.getElementById("grid-view");
const gridToggle = document.getElementById("grid-toggle");
 
const projectOverlay = document.getElementById("project-overlay");
const projectPlayer = document.getElementById("project-player");
const contactOverlay = document.getElementById("contact-overlay");
 
/* ---- keyboard help: pages take focus when they open and give it back
        when they close (only if the visitor opened them with the keyboard) ---- */
function rememberFocus() {
  const el = document.activeElement;
  returnFocus = el && el !== document.body && el.matches(":focus-visible") ? el : null;
}
function focusInto(overlay) {
  if (returnFocus) overlay.querySelector(".close-btn").focus({ preventScroll: true });
}
function restoreFocus() {
  if (returnFocus) returnFocus.focus({ preventScroll: true });
  returnFocus = null;
}
 
/* Escape closes whatever page is open; ← → move through screenshots */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (projectOverlay.classList.contains("open")) closeProject();
    else if (contactOverlay.classList.contains("open")) closeContact();
    else if (bioOverlay.classList.contains("open")) closeBio();
  }
  if (projectOverlay.classList.contains("open")) {
    if (e.key === "ArrowRight") goToScreen(activeScreen + 1);
    if (e.key === "ArrowLeft") goToScreen(activeScreen - 1);
  }
});
 
/* =====================================================
   BUILD THE VIDEO LINE (duplicated once for a seamless loop)
===================================================== */
/* The still shown while a preview loads (and used to size its slot): a
   screenshot of the project. By default the first one in `screenshots`;
   add  poster: "images/whatever.jpg"  to a project to pick another. */
function posterAttr(p) {
  const src = p.poster || (p.screenshots && p.screenshots[0]);
  return src ? ` poster="${src}"` : "";
}
 
function buildLine() {
  const doubled = [...projects, ...projects];
  lineEl.innerHTML = doubled
    .map((p, i) => {
      // only the first set is reachable with Tab; the second set is just
      // the copy that makes the loop seamless
      const a11y = i < projects.length
        ? `tabindex="0" role="button" aria-label="${p.title}"`
        : `aria-hidden="true"`;
      return `
      <div class="video-item" data-project="${p.id}" ${a11y}>
        <video src="${p.previewSrc}"${posterAttr(p)} muted autoplay loop playsinline></video>
      </div>`;
    })
    .join("");
}
buildLine();
 
/* Work out how wide ONE set of videos is, so we can loop seamlessly.
   Each video now has its own natural width, so we add up the real
   widths of the first half of the items rather than assuming they match. */
function computeSetWidth() {
  const items = lineEl.querySelectorAll(".video-item");
  if (!items.length) return;
  const n = items.length / 2; // one "set" = half of the duplicated list
  let total = 0;
  for (let i = 0; i < n; i++) {
    total += items[i].getBoundingClientRect().width;
  }
  if (total > 0) setWidth = total; // 0 means the line is hidden right now — keep the old value
}
window.addEventListener("load", computeSetWidth);
window.addEventListener("resize", computeSetWidth);
 
// each video reports its real size once its metadata loads — recompute then too
lineEl.querySelectorAll("video").forEach((v) => {
  v.addEventListener("loadedmetadata", computeSetWidth);
});
 
/* =====================================================
   THE INFINITE SCROLL LOOP
===================================================== */
let lastTime = performance.now();
function tick(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.05); // seconds since last frame (capped after tab switches)
  lastTime = now;
  if (!isPaused && mode === "line" && setWidth > 0) {
    posX -= SPEED * dt;
    if (Math.abs(posX) >= setWidth) {
      posX += setWidth; // snap back seamlessly once one full set has scrolled by
    }
    lineEl.style.transform = `translateX(${posX}px)`;
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
 
/* =====================================================
   HOVER: pause the line + dim every video except the hovered one
===================================================== */
function lineEnter(e) {
  if (overlayOpen || mode !== "line") return;
  const item = e.target.closest(".video-item");
  if (!item) return;
 
  isPaused = true;
  document.querySelectorAll(".video-item").forEach((v) => {
    const vid = v.querySelector("video");
    if (v === item) {
      // the hovered one is always sharp and playing — this also fixes the
      // case of sliding straight from one video onto its neighbor
      v.classList.remove("dimmed");
      if (vid) vid.play().catch(() => {});
    } else {
      v.classList.add("dimmed");
      if (vid) vid.pause();
    }
  });
}
 
function lineLeave(e) {
  if (overlayOpen || mode !== "line") return;
  const item = e.target.closest(".video-item");
  if (!item) return;
 
  // if the mouse just moved onto ANOTHER video item, do nothing
  // (that item's own mouseover will keep things paused/dimmed correctly)
  const related = e.relatedTarget;
  if (related && related.closest && related.closest(".video-item")) return;
 
  resumeLine();
}
 
lineEl.addEventListener("mouseover", lineEnter);
lineEl.addEventListener("mouseout", lineLeave);
// Tab to a video = hover it
lineEl.addEventListener("focusin", (e) => {
  lineWrapper.scrollLeft = 0; // focusing must never nudge the line sideways
  lineEnter(e);
});
lineEl.addEventListener("focusout", lineLeave);
 
// un-blur everything, restart every video, let the line move again
function resumeLine() {
  isPaused = false;
  document.querySelectorAll(".video-item").forEach((v) => {
    v.classList.remove("dimmed");
    const vid = v.querySelector("video");
    if (vid && mode === "line") vid.play().catch(() => {});
  });
}
 
/* Enter / Space on a focused video, grid row = same as clicking it */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const item = e.target.closest && e.target.closest(".video-item, .grid-item");
  if (!item || overlayOpen) return;
  e.preventDefault();
  openProject(item.dataset.project);
});
 
/* Click a video in the line -> open its project page */
lineEl.addEventListener("click", (e) => {
  const item = e.target.closest(".video-item");
  if (!item) return;
  openProject(item.dataset.project);
});
 
/* =====================================================
   PROJECT OVERLAY (slides up from bottom)
===================================================== */
async function openProject(id) {
  const p = projects.find((pr) => pr.id == id);
  if (!p) return;
 
  rememberFocus();
  overlayOpen = true;
  isPaused = true; // freeze the line behind the overlay
 
  document.getElementById("project-title").textContent = p.title;
  document.getElementById("project-credits").textContent = p.credits;
  document.getElementById("project-long-description").textContent = p.longDescription;
  projectPlayer.src = p.embedUrl;
 
  // Screenshots can be listed two ways:
  // 1) a manual list:      screenshots: ["images/foo.jpg", "images/bar.jpg"]
  // 2) an auto-detected folder: screenshotsFolder: "images/project1" (needs 1.jpg, 2.jpg... inside)
  let screenshots;
  if (p.screenshots) {
    screenshots = p.screenshots;
  } else if (p.screenshotsFolder) {
    screenshots = await detectScreenshots(p.screenshotsFolder);
  } else {
    screenshots = [];
  }
  buildScreenTrail({ title: p.title, screenshots });
 
  projectOverlay.scrollTop = 0; // start scrolled to the top every time
  projectScroll.reset();
 
  projectOverlay.classList.add("open");
  focusInto(projectOverlay);
}
 
/* Screenshot trail: the active screenshot is centered — clicking
   the peeking neighbor on the right slides into focus and reveals the
   next one; clicking the peeking neighbor on the left goes back the
   same way. It loops both directions: a copy of the last screenshot
   sits before the real first one, and a copy of the first sits after
   the real last one — landing on either clone silently snaps to the
   matching real screenshot right after (identical image, invisible
   swap), same trick as the homepage's infinite video line. */
const SCREEN_ITEM_WIDTH = 84; // must match .screen-item's flex-basis in style.css
const SCREEN_SIDE_PEEK = (100 - SCREEN_ITEM_WIDTH) / 2;
 
function buildScreenTrail(project) {
  const track = document.getElementById("project-screens");
  const real = project.screenshots;
 
  // start clean, then handle the odd cases: none / exactly one screenshot
  track.classList.remove("single");
  track.parentElement.classList.toggle("empty", !real.length);
 
  if (!real.length) {
    activeScreen = 0;
    track.innerHTML = "";
    return;
  }
 
  if (real.length === 1) {
    // nothing to click through: one full-width image, no clones, no peek
    activeScreen = 0;
    track.classList.add("single");
    track.style.transition = "none";
    track.innerHTML = `<div class="screen-item active" data-index="0"><img src="${real[0]}" alt="${project.title} screenshot" /></div>`;
    track.style.transform = "none";
    const one = new Image();
    one.onload = () => track.style.setProperty("--screen-ratio", `${one.naturalWidth} / ${one.naturalHeight}`);
    one.src = real[0];
    return;
  }
 
  // all screenshots in a project share the same proportions — measure
  // the first one and use it to set the box's aspect ratio, so nothing
  // gets cropped regardless of whether this project's shots are wide or tall
  const probe = new Image();
  probe.onload = () => {
    track.style.setProperty("--screen-ratio", `${probe.naturalWidth} / ${probe.naturalHeight}`);
  };
  probe.src = real[0];
 
  // clone of the last screenshot before the real set, clone of the
  // first after it — lets both directions loop seamlessly
  const items = real.length > 1 ? [real[real.length - 1], ...real, real[0]] : [...real, real[0]];
  activeScreen = 1; // index of the real first screenshot within `items`
 
  track.style.transition = "none";
  track.innerHTML = items
    .map(
      (src, i) => `
      <div class="screen-item" data-index="${i}">
        <img src="${src}" alt="${project.title} screenshot" />
      </div>`
    )
    .join("");
  updateTrailPosition(track, false);
  void track.offsetWidth; // force layout before re-enabling the transition
  track.style.transition = "";
}
 
// updates which item is .active / .peek-prev / .peek-next, and slides
// the track so the active one is centered
function updateTrailPosition(track, animate) {
  if (!animate) track.style.transition = "none";
  track.querySelectorAll(".screen-item").forEach((el, i) => {
    el.classList.toggle("active", i === activeScreen);
    el.classList.toggle("peek-prev", i === activeScreen - 1);
    el.classList.toggle("peek-next", i === activeScreen + 1);
  });
  track.style.transform = `translateX(calc(-${activeScreen * SCREEN_ITEM_WIDTH}% + ${SCREEN_SIDE_PEEK}%))`;
  if (!animate) {
    void track.offsetWidth;
    track.style.transition = "";
  }
}
 
const screensTrack = document.getElementById("project-screens");
 
// moves one step to a neighbouring screenshot (index = the one to land on)
function goToScreen(index) {
  const lastIndex = screensTrack.querySelectorAll(".screen-item").length - 1;
  if (lastIndex < 1 || index < 0 || index > lastIndex) return;
  if (Math.abs(index - activeScreen) !== 1) return; // only the two peeking neighbors
 
  activeScreen = index;
  updateTrailPosition(screensTrack, true);
 
  // landed on a cloned edge — once the slide finishes, silently snap
  // to the matching real screenshot so the trail keeps looping
  if (activeScreen === lastIndex || activeScreen === 0) {
    screensTrack.addEventListener("transitionend", function onDone(ev) {
      if (ev.propertyName !== "transform") return;
      screensTrack.removeEventListener("transitionend", onDone);
      activeScreen = activeScreen === lastIndex ? 1 : lastIndex - 1;
      updateTrailPosition(screensTrack, false);
    });
  }
}
 
// click / tap a peeking neighbor
screensTrack.addEventListener("click", (e) => {
  const item = e.target.closest(".screen-item");
  if (item) goToScreen(Number(item.dataset.index));
});
 
// swipe on touch screens: swipe left = next, swipe right = previous
let swipeX = 0;
let swipeY = 0;
screensTrack.addEventListener("touchstart", (e) => {
  swipeX = e.touches[0].clientX;
  swipeY = e.touches[0].clientY;
}, { passive: true });
screensTrack.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - swipeX;
  const dy = e.changedTouches[0].clientY - swipeY;
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) goToScreen(activeScreen + (dx < 0 ? 1 : -1));
}, { passive: true });
 
function closeProject() {
  restoreFocus();
  projectOverlay.classList.remove("open");
  projectPlayer.src = ""; // stop playback
 
  // wait for the slide-down transition to finish
  setTimeout(() => {
    overlayOpen = false;
 
    // give it a (shorter) beat on the frozen home screen before things light back up
    setTimeout(() => {
      resumeLine();
    }, 350);
  }, SLIDE_MS);
}
 
document.getElementById("project-close").addEventListener("click", closeProject);
 
// Scroll-to-close, used by the project and contact pages.
// Reaching the bottom and closing are two separate actions: reaching the
// bottom only "arms" the close once that gesture has been still for 300ms
// (so one continuous swipe can't do both). Only a LATER mouse-wheel tick
// down, or a LATER swipe up on a touch screen, closes the page.
function scrollToClose(overlay, close) {
  let atBottom = false;
  let armed = false;
  let timer = null;
  let touchY = 0;
 
  overlay.addEventListener("scroll", () => {
    atBottom = overlay.scrollTop + overlay.clientHeight >= overlay.scrollHeight - 5;
    clearTimeout(timer);
    armed = false;
    if (atBottom) timer = setTimeout(() => { armed = true; }, 300);
  });
 
  function tryClose() {
    if (!atBottom || !armed) return;
    armed = false;
    close();
  }
 
  overlay.addEventListener("wheel", (e) => { if (e.deltaY > 0) tryClose(); }, { passive: true });
  overlay.addEventListener("touchstart", (e) => { touchY = e.touches[0].clientY; }, { passive: true });
  overlay.addEventListener("touchmove", (e) => { if (touchY - e.touches[0].clientY > 30) tryClose(); }, { passive: true });
 
  return { reset() { atBottom = false; armed = false; clearTimeout(timer); } };
}
 
const projectScroll = scrollToClose(projectOverlay, closeProject);
 
/* =====================================================
   CONTACT OVERLAY (same slide-up behaviour, simpler content)
===================================================== */
document.getElementById("contact-btn").addEventListener("click", () => {
  rememberFocus();
  overlayOpen = true;
  isPaused = true;
  contactOverlay.classList.add("open");
  contactScroll.reset();
  focusInto(contactOverlay);
});
 
function closeContact() {
  restoreFocus();
  contactOverlay.classList.remove("open");
  setTimeout(() => {
    overlayOpen = false;
    isPaused = false;
  }, SLIDE_MS);
}
 
document.getElementById("contact-close").addEventListener("click", closeContact);
 
const contactScroll = scrollToClose(contactOverlay, closeContact);
 
/* =====================================================
   GRID MODE
===================================================== */
function buildGrid() {
  gridView.innerHTML = projects
    .map(
      (p) => `
      <div class="grid-item" data-project="${p.id}" tabindex="0" role="button" aria-label="${p.title}">
        <video src="${p.previewSrc}"${posterAttr(p)} muted autoplay loop playsinline></video>
        <div class="dim-overlay"></div>
        <span class="grid-label">${p.title}</span>
        <span class="tap-hint">Tap to open</span>
      </div>`
    )
    .join("");
}
buildGrid();
 
/* Phones / touch screens (no hover) get no line and no toggle: always the
   list. This media query must match the one at the bottom of style.css. */
const stackMq = window.matchMedia("(max-width: 700px), (hover: none)");
// what the visitor picked with the Grid / Line button. People whose device
// asks for reduced motion start in Grid (no moving line).
let userMode = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "grid" : "line";
 
function applyMode() {
  mode = stackMq.matches ? "grid" : userMode;
  gridToggle.textContent = mode === "line" ? "Grid" : "Line";
  lineWrapper.classList.toggle("hidden", mode === "grid");
  gridView.classList.toggle("hidden", mode === "line");
  document.body.classList.toggle("grid-mode", mode === "grid");
 
  // only the visible set of previews plays (saves battery on phones)
  lineEl.querySelectorAll("video").forEach((v) => (mode === "line" ? v.play().catch(() => {}) : v.pause()));
  // (on a phone the list stays paused until a name is tapped open)
  const playGrid = mode === "grid" && !stackMq.matches;
  gridView.querySelectorAll("video").forEach((v) => (playGrid ? v.play().catch(() => {}) : v.pause()));
  if (!stackMq.matches) foldStackItem();
 
  computeSetWidth(); // the line has real widths again once it's visible
}
 
// the screen blurs away, swaps, and blurs back in (see main.switching in style.css)
const mainEl = document.querySelector("main");
let switching = false;
gridToggle.addEventListener("click", () => {
  if (switching) return;
  switching = true;
  mainEl.classList.add("switching");
  setTimeout(() => {
    userMode = userMode === "line" ? "grid" : "line";
    applyMode();
    window.scrollTo(0, 0);
    mainEl.classList.remove("switching");
    setTimeout(() => (switching = false), FADE_MS);
  }, FADE_MS);
});
stackMq.addEventListener("change", applyMode);
applyMode();
 
gridView.addEventListener("click", (e) => {
  if (stackMq.matches) return; // phones use the tap logic below
  const item = e.target.closest(".grid-item");
  if (!item) return;
  openProject(item.dataset.project);
});
 
/* ---- phones: tap a name -> it opens into a playing video;
        tap that video -> project page; tap anywhere else -> folds back ---- */
const stackMain = document.querySelector("main");
let spacerTimer = null;
 
function foldStackItem() {
  const open = gridView.querySelector(".grid-item.open");
  if (!open) return;
 
  // where the page ends once this row has shrunk back (no spacer, closed row)
  const spacer = parseFloat(stackMain.style.paddingBottom) || 0;
  const closed = gridView.querySelector(".grid-item:not(.open)");
  const shrink = closed ? open.offsetHeight - closed.offsetHeight : 0;
  const maxScroll = stackMain.offsetHeight - spacer - shrink - window.innerHeight;
 
  open.classList.remove("open");
  gridView.classList.remove("has-open");
  open.querySelector("video").pause();
 
  // glide back instead of letting the browser snap the scroll position,
  // then drop the extra empty space once everything has settled
  if (stackMq.matches) glideTo(Math.max(0, Math.min(window.scrollY, maxScroll)), SLIDE_MS);
  clearTimeout(spacerTimer);
  spacerTimer = setTimeout(() => (stackMain.style.paddingBottom = ""), SLIDE_MS + 50);
}
 
function unfoldStackItem(item) {
  item.classList.add("open");
  gridView.classList.add("has-open");
  item.querySelector("video").play().catch(() => {});
 
  // Glide the page so the growing video sits right under the header, with
  // everything else below it. It moves together with the growth (same
  // soft ease-out), not after it.
  const finalH = Math.min(window.innerWidth * 1.25, window.innerHeight * 0.78);
  const headerH = document.querySelector(".site-header").offsetHeight;
  const rect = item.getBoundingClientRect();
  const itemTop = rect.top + window.scrollY;               // its top never moves while it grows
  const target = Math.max(0, itemTop - headerH);
 
  // a last project is too near the end of the page to reach the top, so
  // add just enough empty space below the copyright to allow it
  clearTimeout(spacerTimer);
  const spacer = parseFloat(stackMain.style.paddingBottom) || 0;
  const pageEnd = stackMain.offsetHeight - spacer + (finalH - rect.height); // content height (scrollHeight is never less than the screen)
  const extra = Math.max(0, target + window.innerHeight - pageEnd);
  stackMain.style.paddingBottom = extra ? extra + "px" : "";
 
  glideTo(target, SLIDE_MS);
}
 
// the same cubic-bezier(0.4, 0, 0.2, 1) the CSS uses, so scrolling and growing stay in step
function softEase(t) {
  const [x1, y1, x2, y2] = [0.4, 0, 0.2, 1];
  const bez = (a, b, u) => 3 * a * u * (1 - u) * (1 - u) + 3 * b * u * u * (1 - u) + u * u * u;
  let u = t;
  for (let i = 0; i < 8; i++) { // find u where the curve's x equals t
    const dx = bez(x1, x2, u) - t;
    const slope = (bez(x1, x2, u + 1e-4) - bez(x1, x2, u - 1e-4)) / 2e-4;
    if (Math.abs(dx) < 1e-5 || !slope) break;
    u -= dx / slope;
  }
  return bez(y1, y2, u);
}
 
let glideId = 0;
function glideTo(targetY, ms) {
  const startY = window.scrollY;
  const dist = targetY - startY;
  if (Math.abs(dist) < 2) return;
  const id = ++glideId;
  const t0 = performance.now();
  requestAnimationFrame(function step(now) {
    if (id !== glideId) return; // cancelled (the visitor took over)
    const t = Math.min((now - t0) / ms, 1);
    window.scrollTo(0, startY + dist * softEase(t));
    if (t < 1) requestAnimationFrame(step);
  });
}
// any touch or wheel from the visitor cancels the glide immediately
window.addEventListener("touchstart", () => glideId++, { passive: true });
window.addEventListener("wheel", () => glideId++, { passive: true });
 
document.addEventListener("click", (e) => {
  if (!stackMq.matches || mode !== "grid" || overlayOpen) return;
  const item = e.target.closest(".grid-item");
  const open = gridView.querySelector(".grid-item.open");
 
  if (open && item === open) openProject(open.dataset.project); // second tap on the video
  else if (open) foldStackItem();                                // tapped outside it
  else if (item) unfoldStackItem(item);                          // first tap on a name
});
 
/* =====================================================
   BIO PAGE — opened by clicking the logo
===================================================== */
const bioOverlay = document.getElementById("bio-overlay");
 
document.getElementById("home-logo").addEventListener("click", () => {
  rememberFocus();
  overlayOpen = true;
  isPaused = true;
  bioOverlay.classList.add("open");
  bioOverlay.scrollTop = 0;
  bioScroll.reset();
  focusInto(bioOverlay);
});
 
function closeBio() {
  restoreFocus();
  bioOverlay.classList.remove("open");
  setTimeout(() => {
    overlayOpen = false;
    isPaused = false;
  }, SLIDE_MS);
}
 
document.getElementById("bio-close").addEventListener("click", closeBio);
 
// on a phone the bio page scrolls, so it closes like the project page
// (on desktop it never scrolls, so this never fires)
const bioScroll = scrollToClose(bioOverlay, closeBio);
 