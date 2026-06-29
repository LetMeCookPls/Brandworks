'use client';

/**
 * HeroGrid
 * --------
 * 3 rows × 7 cols (½·1·1·1·1·1·½) dark grid cells.
 *
 * Logo cell positions (letter = col, number = row, 1-indexed):
 *   E1 → col 4, row 0 → Red        #FF011F
 *   E2 → col 4, row 1 → Blue       #0336B5
 *   E3 → col 4, row 2 → Yellow     #FFDD00
 *   D2 → col 3, row 1 → Light Blue #0882D9
 *   C3 → col 2, row 2 → Green      #03C366
 *
 * Effects (from reference):
 *   1. Logo-cell reveals — rAF distance-based opacity falloff
 *   2. Glow blob — 400px radial-gradient circle, blur 70px,
 *      follows cursor with lerp 0.1 for smooth lag, GPU-composited
 *      via translate3d on a positioned overlay div.
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── Constants ────────────────────────────────────────────────────────────────

const ROWS = 3;
const COLS = 7;

const RADIUS      = 350;
const MAX_OPACITY = 0.75;
const FALLOFF_EXP = 1.5;

const LERP        = 0.1;   // glow smoothing factor (matches reference)
const LERP_CELL   = 0.06;  // cell opacity lerp — slower = silkier reveal/fade
const GLOW_SIZE   = 400;   // px — diameter of glow circle
const GLOW_COLOR  = 'rgba(200, 200, 200, 0.18)'; // subtle neutral highlight

/** Logo positions as (row, col 0-indexed) + color */
const LOGO_POSITIONS: { row: number; col: number; color: string }[] = [
  { row: 0, col: 4, color: '#FF011F' }, // E1 — Red
  { row: 1, col: 4, color: '#0336B5' }, // E2 — Blue
  { row: 2, col: 4, color: '#FFDD00' }, // E3 — Yellow
  { row: 1, col: 3, color: '#0882D9' }, // D2 — Light Blue
  { row: 2, col: 2, color: '#03C366' }, // C3 — Green
];

/** Build logo-cell flat-index descriptors for a given column count, row offset, and col offset */
function buildLogoCells(cols: number, rowOffset: number = 0, colOffset: number = 0) {
  return LOGO_POSITIONS.map(({ row, col, color }) => ({
    color,
    index: (row + rowOffset) * cols + (col + colOffset),
  }));
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroGrid() {
  const [cols, setCols] = useState(COLS);
  const [rows, setRows] = useState(ROWS);
  const [rowOffset, setRowOffset] = useState(0);
  const [colOffset, setColOffset] = useState(0);
  
  const total = rows * cols;
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(800);

  useEffect(() => {
    const handleResize = () => {
      setVh(window.innerHeight);
      const isMobile = window.innerWidth < 768;
      
      // Desktop: 7 cols (half 1 1 1 1 1 half). Mobile: 5 cols (half 1 1 1 half)
      const currentCols = isMobile ? 5 : COLS;
      setCols(currentCols);
      setColOffset(Math.floor((currentCols - COLS) / 2));

      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
        // Calculate enough rows to cover height with roughly square cells.
        // Total fr width = currentCols - 1 (because outer cols are 0.5fr each)
        const totalFr = currentCols - 1;
        const frWidth = window.innerWidth / totalFr;
        const reqRows = Math.ceil(window.innerHeight / frWidth);
        const actualRows = Math.max(ROWS, reqRows);
        setRows(actualRows);
        setRowOffset(Math.floor((actualRows - ROWS) / 2));
      } else {
        setRows(ROWS);
        setRowOffset(0);
      }
    };
    handleResize(); // Set immediately on mount
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fade out starting at 80% of hero height, fully transparent at 150% (mid GlobalPartners)
  const opacity = useTransform(scrollY, [vh * 0.8, vh * 1.5], [1, 0]);

  const logoCells = buildLogoCells(cols, rowOffset, colOffset);

  const containerRef    = useRef<HTMLDivElement>(null);
  const glowRef         = useRef<HTMLDivElement>(null);
  const cellRefs        = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs        = useRef<(HTMLDivElement | null)[]>([]);
  // Tracks the current (lerped) opacity for each logo cell
  const currentOpacities = useRef<number[]>(Array(LOGO_POSITIONS.length).fill(0));

  // Raw cursor target (set instantly on mousemove)
  const targetRef  = useRef<{ x: number; y: number }>({ x: -999, y: -999 });
  // Lerped cursor position (updated each rAF frame)
  const lerpRef    = useRef<{ x: number; y: number }>({ x: -999, y: -999 });

  const rafRef = useRef<number>(0);

  cellRefs.current = Array(total).fill(null);
  fillRefs.current = Array(LOGO_POSITIONS.length).fill(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow      = glowRef.current;
    if (!container) return;

    // ── Cursor tracking ──────────────────────────────────────────────────────
    function onMouseMove(e: MouseEvent) {
      targetRef.current = { x: e.clientX, y: e.clientY };
      // Snap lerp to cursor on first entry — prevents glow from
      // travelling through the top-left corner on its way to the cursor.
      if (lerpRef.current.x < 0) {
        lerpRef.current = { x: e.clientX, y: e.clientY };
      }
    }
    function onMouseLeave() {
      targetRef.current = { x: -999, y: -999 };
      lerpRef.current   = { x: -999, y: -999 }; // snap off-screen immediately
    }

    window.addEventListener('pointermove', onMouseMove, { capture: true, passive: true });
    document.addEventListener('pointerleave', onMouseLeave, { passive: true });

    // ── rAF loop ─────────────────────────────────────────────────────────────
    function tick() {
      const tx = targetRef.current.x;
      const ty = targetRef.current.y;

      // ── 1. Glow — pinned exactly to cursor (no lerp) ──────────────────────
      if (glow) {
        glow.style.transform = `translate3d(${tx - GLOW_SIZE / 2}px, ${ty - GLOW_SIZE / 2}px, 0)`;
        glow.style.opacity   = tx < 0 ? '0' : '1';
      }

      // ── 2. Logo-cell distance reveal (lerped opacity) ────────────────────
      // Lerp a separate tracking point for smooth cell fade-in/out
      lerpRef.current.x += (tx - lerpRef.current.x) * LERP;
      lerpRef.current.y += (ty - lerpRef.current.y) * LERP;
      const lcx = lerpRef.current.x;
      const lcy = lerpRef.current.y;

      logoCells.forEach(({ index }, i) => {
        const cell = cellRefs.current[index];
        const fill = fillRefs.current[i];
        if (!cell || !fill) return;

        const rect    = cell.getBoundingClientRect();
        const centerX = rect.left + rect.width  / 2;
        const centerY = rect.top  + rect.height / 2;
        const dist    = Math.hypot(lcx - centerX, lcy - centerY);

        const target = dist < RADIUS
          ? Math.pow(1 - dist / RADIUS, FALLOFF_EXP) * MAX_OPACITY
          : 0;

        // Lerp current opacity toward target for silky reveal / fade
        currentOpacities.current[i] += (target - currentOpacities.current[i]) * LERP_CELL;
        fill.style.opacity = String(currentOpacities.current[i]);
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMouseMove, { capture: true });
      document.removeEventListener('pointerleave', onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <motion.div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position     : 'fixed',
        inset        : 0,
        zIndex       : 0,
        overflow     : 'hidden',
        pointerEvents: 'none',
        opacity,
      }}
    >
      {/* ── Glow blob (shines from behind the grid) ── */}
      <div
        ref={glowRef}
        style={{
          position    : 'absolute',
          top         : 0,
          left        : 0,
          width       : GLOW_SIZE,
          height      : GLOW_SIZE,
          borderRadius: '50%',
          background  : `radial-gradient(
            circle farthest-corner at 50% 50%,
            rgba(255, 255, 255, 0.85) 0%,
            rgba(255, 255, 255, 0.4) 30%,
            transparent 70%
          )`,
          filter      : 'blur(70px)',
          opacity     : 0,
          willChange  : 'transform, opacity',
          pointerEvents: 'none',
          transition  : 'opacity 0.3s ease',
        }}
      />

      {/* ── Cell grid ── */}
      <div
        style={{
          position           : 'absolute',
          inset              : 0,
          display            : 'grid',
          gridTemplateRows   : `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `0.5fr repeat(${cols - 2}, 1fr) 0.5fr`,
          gap                : '0px', // borders touch to form the glass lines
          pointerEvents      : 'auto',
        }}
      >
        {Array.from({ length: total }, (_, i) => {
          const logoIdx = logoCells.findIndex((c) => c.index === i);
          const isLogo  = logoIdx !== -1;

          return (
            <div
              key={i}
              ref={(el) => { cellRefs.current[i] = el; }}
              style={{
                position       : 'relative',
                backgroundColor: '#0D0D0F', // solid dark cell
                backgroundClip : 'padding-box', // lets the glow shine through the transparent borders
                border         : '4px solid rgba(255, 255, 255, 0.08)', // flat crystal line
              }}
            >
              {isLogo && (
                <div
                  ref={(el) => { fillRefs.current[logoIdx] = el; }}
                  style={{
                    position       : 'absolute',
                    inset          : 0,
                    backgroundColor: logoCells[logoIdx].color,
                    opacity        : 0,
                    willChange     : 'opacity',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
