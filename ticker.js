(() => {
  "use strict";
  const ticker = document.querySelector(".ticker");
  const track = ticker?.querySelector(".ticker-track");
  const first = ticker?.querySelector(".ticker-group");
  const toggle = ticker?.querySelector(".ticker-motion-toggle");
  if (!ticker || !track || !first || !toggle) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let playing = !reduceMotion.matches;
  let manuallyChosen = false;
  let visible = true;
  let groupWidth = 0;
  let offset = 0;
  let lastTime = 0;
  let frameId = 0;
  const SPEED_PX_PER_SECOND = 43;

  const measure = () => {
    const width = first.getBoundingClientRect().width;
    if (width > 0 && Number.isFinite(width)) {
      groupWidth = width;
      offset %= groupWidth;
    }
  };

  const stop = () => {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
    lastTime = 0;
  };

  const canRun = () => playing && visible && !document.hidden && groupWidth > 0;
  const tick = (now) => {
    frameId = 0;
    if (!canRun()) return;
    if (lastTime) {
      const dt = Math.min(70, Math.max(0, now - lastTime));
      offset = (offset + dt * SPEED_PX_PER_SECOND / 1000) % groupWidth;
    }
    lastTime = now;
    track.style.transform = "translate3d(" + (-offset).toFixed(2) + "px,0,0)";
    frameId = requestAnimationFrame(tick);
  };
  const start = () => {
    if (!frameId && canRun()) {
      lastTime = 0;
      frameId = requestAnimationFrame(tick);
    }
  };

  const synchronize = () => {
    stop();
    ticker.dataset.motion = playing ? "running" : "paused";
    toggle.textContent = playing ? "Pause" : "Play";
    toggle.setAttribute("aria-label", playing ? "Pause moving content specialties" : "Play moving content specialties");
    toggle.setAttribute("title", playing ? "Pause moving text" : "Play moving text");
    if (!playing) {
      offset = 0;
      track.style.transform = "translate3d(0,0,0)";
    }
    requestAnimationFrame(() => {
      measure();
      start();
    });
  };

  ticker.classList.add("ticker--js");
  toggle.hidden = false;
  toggle.addEventListener("click", () => {
    manuallyChosen = true;
    playing = !playing;
    synchronize();
  });

  const onPreferenceChange = (event) => {
    if (!manuallyChosen) {
      playing = !event.matches;
      synchronize();
    }
  };
  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener("change", onPreferenceChange);
  } else if (reduceMotion.addListener) {
    reduceMotion.addListener(onPreferenceChange);
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible) start();
      else stop();
    }, { rootMargin: "100px 0px 100px 0px" });
    observer.observe(ticker);
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
  window.addEventListener("resize", () => { measure(); start(); }, { passive: true });
  window.addEventListener("pageshow", () => { measure(); start(); });
  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(() => { measure(); start(); });
    resizeObserver.observe(first);
  }
  if (document.fonts?.ready) document.fonts.ready.then(() => { measure(); start(); });
  synchronize();
})();