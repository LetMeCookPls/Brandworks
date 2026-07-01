'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * CanvasBackground (VideoBackground replacement)
 * ---------------
 * A fixed, full-viewport HTML5 Canvas particle simulation that replaces
 * the previous video background. Provides parallax particles, soft glowing
 * atmospheric orbs, and rare shooting stars.
 *
 * z-index strategy
 *   -20  canvas element   ← lowest, never interacts
 *   -10  dark overlay    ← dims the background so text stays legible
 *    0+  page content    ← normal flow
 */

export default function VideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(800);

  useEffect(() => {
    setVh(window.innerHeight);
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fade IN the canvas starting at 80% of hero height, fully visible at 150% (mid GlobalPartners)
  // This perfectly crossfades with the HeroGrid fading out!
  const videoOpacity = useTransform(scrollY, [vh * 0.8, vh * 1.5], [0, 0.7]);
  const overlayOpacity = useTransform(scrollY, [vh * 0.8, vh * 1.5], [0, 1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // false for performance, solid bg
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    
    // --- Canvas sizing ---
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();

    // --- Mouse Parallax ---
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    
    // Check if device supports hover (desktop vs mobile)
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDesktop) return;
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- Visibility / Intersection Observer ---
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // --- Particle System ---
    // Scale count by screen size, cap at 400 for more intensity
    const PARTICLE_COUNT = Math.min(400, Math.floor((width * height) / 7000));
    
    class Particle {
      x: number;
      y: number;
      z: number;
      radius: number;
      baseOpacity: number;
      speedX: number;
      speedY: number;
      twinkleSpeed: number;
      twinkleOffset: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 0.8 + 0.2; // Depth factor (0.2 to 1)
        this.radius = Math.random() * 1.5 * this.z + 0.5; // Slightly larger
        this.baseOpacity = Math.random() * 0.5 + 0.3; // Brighter particles
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.speedY = -Math.random() * 0.5 - 0.15; // Faster drift upwards
        this.twinkleSpeed = Math.random() * 0.002 + 0.0005;
        this.twinkleOffset = Math.random() * Math.PI * 2;
        
        // 90% white, 5% purple tint, 5% cyan tint
        const r = Math.random();
        if (r > 0.95) this.color = '255, 255, 255';
        else if (r > 0.9) this.color = '124, 58, 237';
        else if (r > 0.85) this.color = '6, 182, 212';
        else this.color = '200, 220, 255'; // slight cold-white
      }

      update(time: number, mouseDeltaX: number, mouseDeltaY: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (isDesktop) {
          this.x += mouseDeltaX * this.z * -0.015;
          this.y += mouseDeltaY * this.z * -0.015;
        }

        // Wrap around screen bounds
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const opacity = this.baseOpacity + Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.25;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${Math.max(0, opacity)})`;
        ctx.fill();
      }
    }

    class ShootingStar {
      x: number = 0;
      y: number = 0;
      length: number = 0;
      speed: number = 0;
      angle: number = 0;
      opacity: number = 0;
      active: boolean = false;

      spawn() {
        this.active = true;
        this.x = Math.random() * width;
        this.y = -50; // spawn above screen
        this.length = Math.random() * 80 + 40;
        this.speed = Math.random() * 10 + 15;
        this.angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1); // Diagonal
        this.opacity = 1;
      }

      update() {
        if (!this.active) return;
        this.x -= Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.01;
        if (this.opacity <= 0 || this.x < -this.length || this.y > height + this.length) {
          this.active = false;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.active) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        const gradient = ctx.createLinearGradient(0, 0, -this.length, 0);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-this.length, 0);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }
    }

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    const shootingStar = new ShootingStar();
    let lastShootingStarTime = Date.now();
    const shootingStarInterval = 8000 + Math.random() * 4000; // More frequent

    // --- Background Glows ---
    // Create static radial gradients that pulse, to save on recreation cost every frame
    const drawGlows = (ctx: CanvasRenderingContext2D, time: number) => {
      // Very slow drift
      const g1x = width * 0.2 + Math.sin(time * 0.0003) * 100;
      const g1y = height * 0.3 + Math.cos(time * 0.0002) * 100;
      const g2x = width * 0.8 + Math.cos(time * 0.0004) * 150;
      const g2y = height * 0.7 + Math.sin(time * 0.0003) * 150;
      const g3x = width * 0.5 + Math.sin(time * 0.0002) * 200;
      const g3y = height * 0.9 + Math.cos(time * 0.0005) * 50;

      const drawRadial = (x: number, y: number, r: number, colorStart: string, colorEnd: string) => {
        // Prevent negative radii issues
        if (r <= 0) return;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, colorStart);
        grad.addColorStop(1, colorEnd);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      };

      ctx.globalCompositeOperation = 'screen';
      // Purple: #7C3AED (124, 58, 237)
      drawRadial(g1x, g1y, width * 0.6, 'rgba(124, 58, 237, 0.12)', 'rgba(124, 58, 237, 0)');
      // Blue: #3B82F6 (59, 130, 246)
      drawRadial(g2x, g2y, width * 0.7, 'rgba(59, 130, 246, 0.10)', 'rgba(59, 130, 246, 0)');
      // Cyan: #06B6D4 (6, 182, 212)
      drawRadial(g3x, g3y, width * 0.5, 'rgba(6, 182, 212, 0.10)', 'rgba(6, 182, 212, 0)');
      ctx.globalCompositeOperation = 'source-over';
    };

    // --- Render Loop ---
    let lastTime = performance.now();
    
    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return; // Pause if tab inactive

      const deltaTime = time - lastTime;
      lastTime = time;
      
      // Cap extremely high deltas when returning to tab
      if (deltaTime > 100) return;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      const mouseDeltaX = targetMouseX - width / 2;
      const mouseDeltaY = targetMouseY - height / 2;

      // Base solid background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      drawGlows(ctx, time);

      particles.forEach(p => {
        p.update(time, mouseDeltaX, mouseDeltaY);
        p.draw(ctx, time);
      });

      // Shooting star logic (every 15-20s)
      if (Date.now() - lastShootingStarTime > shootingStarInterval) {
        if (!shootingStar.active && Math.random() < 0.02) {
          shootingStar.spawn();
          lastShootingStarTime = Date.now();
        }
      }
      shootingStar.update();
      shootingStar.draw(ctx);
    };

    animationFrameId = requestAnimationFrame(render);

    // Event listeners
    const handleResizeEvent = () => setCanvasSize();
    window.addEventListener('resize', handleResizeEvent, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResizeEvent);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <motion.canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: -20, opacity: videoOpacity }}
        aria-hidden="true"
      />
      {/* ── Dark tint overlay so body text stays readable ── */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -10,
          opacity: overlayOpacity,
          background:
            'linear-gradient(to bottom, rgba(13,13,15,0.45) 0%, rgba(13,13,15,0.35) 100%)',
        }}
        aria-hidden="true"
      />
    </>
  );
}
