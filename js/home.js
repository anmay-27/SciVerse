/** Responsive ambient particle field for the SciVerse homepage. */
(function () {
  "use strict";

  const canvas = document.querySelector("[data-particle-canvas]");
  if (!(canvas instanceof HTMLCanvasElement)) return;

  const context = canvas.getContext("2d");
  if (!context) return;
  const interactionArea = canvas.closest(".hero") || document;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: 0, y: 0, active: false };
  let particles = [];
  let width = 0;
  let height = 0;
  let frameId = 0;
  let isVisible = !document.hidden;

  function color(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function createParticles() {
    const count = reducedMotion.matches ? 18 : Math.min(70, Math.max(28, Math.floor(width / 24)));
    particles = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      radius: 1 + Math.random() * 1.6,
      chemistry: index % 4 === 0
    }));
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    createParticles();
    draw();
  }

  function update() {
    particles.forEach((particle) => {
      if (pointer.active) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared > 1 && distanceSquared < 14000) {
          const influence = (1 - distanceSquared / 14000) * 0.035;
          particle.vx += dx * influence / Math.sqrt(distanceSquared);
          particle.vy += dy * influence / Math.sqrt(distanceSquared);
        }
      }
      particle.vx *= 0.992;
      particle.vy *= 0.992;
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < -5) particle.x = width + 5;
      if (particle.x > width + 5) particle.x = -5;
      if (particle.y < -5) particle.y = height + 5;
      if (particle.y > height + 5) particle.y = -5;
    });
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    const physics = color("--color-physics");
    const chemistry = color("--color-chemistry");
    const border = color("--color-border-strong");

    context.globalAlpha = 0.18;
    context.strokeStyle = border;
    context.lineWidth = 0.7;
    for (let first = 0; first < particles.length; first += 1) {
      for (let second = first + 1; second < particles.length; second += 1) {
        const dx = particles[first].x - particles[second].x;
        const dy = particles[first].y - particles[second].y;
        if (dx * dx + dy * dy < 9000) {
          context.beginPath();
          context.moveTo(particles[first].x, particles[first].y);
          context.lineTo(particles[second].x, particles[second].y);
          context.stroke();
        }
      }
    }
    context.globalAlpha = 0.55;
    particles.forEach((particle) => {
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = particle.chemistry ? chemistry : physics;
      context.fill();
    });
    context.globalAlpha = 1;
  }

  function animate() {
    if (!isVisible || reducedMotion.matches) return;
    update();
    draw();
    frameId = window.requestAnimationFrame(animate);
  }

  function start() {
    window.cancelAnimationFrame(frameId);
    if (isVisible && !reducedMotion.matches) frameId = window.requestAnimationFrame(animate);
    else draw();
  }

  interactionArea.addEventListener("pointermove", (event) => {
    const bounds = canvas.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
    pointer.active = true;
  });
  interactionArea.addEventListener("pointerleave", () => { pointer.active = false; });
  document.addEventListener("visibilitychange", () => { isVisible = !document.hidden; start(); });
  document.addEventListener("sciverse:themechange", draw);
  reducedMotion.addEventListener?.("change", start);

  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener("resize", resize);
  resize();
  start();
})();
