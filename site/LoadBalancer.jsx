import React from 'react';

const LOOP = 13000;
const TRANSIT = 2200;
const MONO = "'JetBrains Mono', monospace";

const smooth = (a, b, x) => { const u = Math.max(0, Math.min(1, (x - a) / (b - a))); return u * u * (3 - 2 * u); };
const lerp = (a, b, u) => a + (b - a) * u;

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Colours come off the root at paint time, so the canvas follows the theme switch. */
function readColours() {
  const cs = getComputedStyle(document.documentElement);
  const g = (n) => cs.getPropertyValue(n).trim();
  return { ink: g('--ink'), faint: g('--faint'), rule: g('--rule'), muted: g('--muted'), signal: g('--signal'), bg: g('--bg') };
}

/**
 * One node overflows and drops requests, then a balancer splits the load
 * across two. A 13s loop in the page palette, drawn only while on screen,
 * and a single static frame under reduced motion.
 */
export function LoadBalancer() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const cv = ref.current;
    let parts = [];
    let spawn = 0;
    let dropped = 0;

    const draw = (t, dt) => {
      const ctx = cv.getContext('2d');
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = cv.clientWidth, h = cv.clientHeight;
      if (!w || !h) return;
      if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) {
        cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const C = readColours();

      const bal = smooth(6000, 7400, t);
      const ovr = smooth(1400, 4400, t) * (1 - bal);
      const qA = lerp(0.14 + ovr * 1.16, 0.42, bal);
      const qB = bal * 0.42;
      const over = qA > 1;

      const k = Math.max(0.85, Math.min(1.5, h / 240));
      const sx = w * 0.09, sy = h * 0.5;
      const bx = w * 0.41;
      const nx = w * 0.75, nw = Math.min(104 * k, w * 0.18), nh = 46 * k;
      const ayA = lerp(h * 0.5, h * 0.3, bal), ayB = h * 0.72;

      // paths
      ctx.strokeStyle = C.rule; ctx.lineWidth = 1;
      const path = (ty, a) => {
        ctx.globalAlpha = a; ctx.beginPath(); ctx.moveTo(sx + 9, sy);
        ctx.quadraticCurveTo(bx, sy, nx - nw / 2, ty); ctx.stroke(); ctx.globalAlpha = 1;
      };
      path(ayA, 1); path(ayB, bal);

      // balancer
      if (bal > 0.01) {
        ctx.globalAlpha = bal;
        ctx.fillStyle = C.bg; ctx.strokeStyle = C.ink;
        roundRect(ctx, bx - 17 * k, sy - 17 * k, 34 * k, 34 * k, 5); ctx.fill(); ctx.stroke();
        ctx.fillStyle = C.ink; ctx.font = `600 11px ${MONO}`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('lb', bx, sy + 1);
        ctx.globalAlpha = 1;
      }

      // source
      ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(sx, sy, 5, 0, 2 * Math.PI); ctx.fill();
      ctx.fillStyle = C.faint; ctx.font = `400 10px ${MONO}`;
      ctx.save(); ctx.translate(sx - 9, sy); ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('REQUESTS', 0, -4); ctx.restore();

      // particles
      spawn -= dt;
      if (spawn <= 0) {
        spawn = 105;
        const toB = bal > 0.5 ? Math.random() < bal * 0.52 : false;
        parts.push({ u: 0, b: toB, drop: !toB && over, a: 1 });
      }
      for (const p of parts) {
        p.u += dt / TRANSIT;
        const ty = p.b ? ayB : ayA;
        const cut = p.drop ? 0.9 : 1;
        const u = Math.min(p.u, cut);
        const iv = 1 - u;
        const px = iv * iv * (sx + 9) + 2 * iv * u * bx + u * u * (nx - nw / 2);
        const py = iv * iv * sy + 2 * iv * u * sy + u * u * ty;
        if (p.drop && p.u > cut) p.a -= dt / 520;
        const fall = p.drop && p.u > cut ? (p.u - cut) * TRANSIT * 0.16 : 0;
        if (p.a <= 0) continue;
        ctx.globalAlpha = Math.max(0, p.a);
        ctx.fillStyle = p.drop ? C.signal : C.ink;
        ctx.beginPath(); ctx.arc(px, py + fall, 2.4, 0, 2 * Math.PI); ctx.fill();
        ctx.globalAlpha = 1;
      }
      parts = parts.filter((p) => p.a > 0 && (p.drop || p.u < 1));

      // nodes
      const node = (y, q, label, alpha, hot) => {
        if (alpha <= 0.01) return;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = C.bg; ctx.strokeStyle = hot ? C.signal : C.faint;
        roundRect(ctx, nx - nw / 2, y - nh / 2, nw, nh, 5); ctx.fill(); ctx.stroke();
        ctx.fillStyle = hot ? C.signal : C.muted;
        ctx.font = `400 10px ${MONO}`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
        ctx.fillText(label, nx, y - 7);
        const bw = nw - 22 * k, bx0 = nx - bw / 2, by0 = y + 6 * k;
        ctx.fillStyle = C.rule; roundRect(ctx, bx0, by0, bw, 5 * k, 2.5); ctx.fill();
        ctx.fillStyle = hot ? C.signal : C.ink;
        roundRect(ctx, bx0, by0, bw * Math.max(0, Math.min(1, q)), 5 * k, 2.5); ctx.fill();
        ctx.fillStyle = hot ? C.signal : C.faint;
        ctx.fillText(Math.round(Math.min(q, 1) * 100) + '%', nx, y + nh / 2 + 15);
        ctx.globalAlpha = 1;
      };
      node(ayA, qA, 'web-01', 1, over);
      node(ayB, qB, 'web-02', bal, false);

      // phase label and drop counter
      if (over) dropped += (dt / 105) * 0.5;
      if (t < 400) dropped = 0;
      ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      ctx.font = `400 10px ${MONO}`;
      ctx.fillStyle = C.faint;
      ctx.globalAlpha = 1 - bal; ctx.fillText('ONE NODE', 14, 22);
      ctx.globalAlpha = bal; ctx.fillText('BALANCED ACROSS TWO', 14, 22);
      ctx.globalAlpha = 1;
      if (over) { ctx.fillStyle = C.signal; ctx.fillText('DROPPING · ' + Math.floor(dropped), 14, 38); }
    };

    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) {
      // One balanced frame, redrawn when the theme or the size changes.
      const still = () => draw(9000, 16);
      still();
      const mo = new MutationObserver(still);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      const ro = new ResizeObserver(still);
      ro.observe(cv);
      return () => { mo.disconnect(); ro.disconnect(); };
    }

    let raf = 0, t0 = 0, last = 0, frame = 0, visible = true;
    const tick = (now) => {
      if (!t0) { t0 = now; last = now; }
      const dt = Math.min(now - last, 48); last = now;
      if (frame++ % 6 === 0) {
        const r = cv.getBoundingClientRect();
        visible = r.bottom > 0 && r.top < window.innerHeight;
      }
      if (visible) draw((now - t0) % LOOP, dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} role="img" aria-label="Requests overflow one web node, then a load balancer splits them across two nodes and both queues settle below capacity." />;
}
