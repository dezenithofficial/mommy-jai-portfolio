(() => {
  "use strict";
  const ticker = document.querySelector(".ticker");
  const track = ticker?.querySelector(".ticker-track");
  const first = ticker?.querySelector(".ticker-group");
  if (!ticker || !track || !first) return;

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
  const canRun = () => visible && !document.hidden && groupWidth > 0;
  const tick = (now) => {
    frameId = 0;
    if (!canRun()) return;
    if (lastTime) {
      const elapsed = Math.min(70, Math.max(0, now - lastTime));
      offset = (offset + elapsed * SPEED_PX_PER_SECOND / 1000) % groupWidth;
    }
    lastTime = now;
    // Inline important overrides legacy reduced-motion CSS that otherwise freezes iOS.
    track.style.setProperty("transform", "translate3d(" + (-offset).toFixed(2) + "px,0,0)", "important");
    frameId = requestAnimationFrame(tick);
  };
  const start = () => {
    measure();
    if (!frameId && canRun()) {
      lastTime = 0;
      frameId = requestAnimationFrame(tick);
    }
  };

  ticker.classList.add("ticker--js");
  ticker.dataset.motion = "running";
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
  window.addEventListener("resize", start, { passive:true });
  window.addEventListener("pageshow", start);
  if ("ResizeObserver" in window) {
    new ResizeObserver(start).observe(first);
  }
  document.fonts?.ready?.then(start);
  start();
})();
