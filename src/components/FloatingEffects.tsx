import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angleSpeed: number;
  opacity: number;
  curve: number;
  curveSpeed: number;
}

interface Heart {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  scaleSpeed: number;
  scale: number;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  angleSpeed: number;
  opacity: number;
  decay: number;
  vx: number;
  vy: number;
}

export default function FloatingEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100, lastX: -100, lastY: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const petals: Petal[] = [];
    const hearts: Heart[] = [];
    const sparkles: Sparkle[] = [];

    // Initialize petals (rose / blossom theme)
    const maxPetals = 25;
    for (let i = 0; i < maxPetals; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * -height, // Start offscreen
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 0.8 + 0.4,
        speedX: Math.random() * 0.4 - 0.2,
        angle: Math.random() * Math.PI,
        angleSpeed: Math.random() * 0.02 - 0.01,
        opacity: Math.random() * 0.5 + 0.4,
        curve: Math.random() * Math.PI,
        curveSpeed: Math.random() * 0.01 + 0.005,
      });
    }

    // Initialize random floating hearts
    const maxHearts = 15;
    for (let i = 0; i < maxHearts; i++) {
      hearts.push({
        x: Math.random() * width,
        y: height + Math.random() * height, // Start below screen
        size: Math.random() * 10 + 8,
        speedY: -(Math.random() * 0.6 + 0.3),
        speedX: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.6 + 0.2,
        scale: 1,
        scaleSpeed: Math.random() * 0.01 + 0.005,
      });
    }

    // Sparkle colors
    const colors = ['#FFF9E6', '#FFE3E3', '#EBF4FF', '#FDF2F8', '#F5F3FF'];

    // Track mouse move to spawn sparkles
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Spawn multiple sparkles on movement
      const dist = Math.hypot(mouse.x - mouse.lastX, mouse.y - mouse.lastY);
      if (dist > 5) {
        const count = Math.min(3, Math.floor(dist / 5));
        for (let i = 0; i < count; i++) {
          // Interstitial sparkles
          const t = i / count;
          const sx = mouse.lastX + (mouse.x - mouse.lastX) * t;
          const sy = mouse.lastY + (mouse.y - mouse.lastY) * t;

          sparkles.push({
            x: sx + (Math.random() * 10 - 5),
            y: sy + (Math.random() * 10 - 5),
            size: Math.random() * 6 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            angle: Math.random() * Math.PI,
            angleSpeed: Math.random() * 0.1 - 0.05,
            opacity: 1,
            decay: Math.random() * 0.02 + 0.015,
            vx: (Math.random() * 0.6 - 0.3),
            vy: (Math.random() * 0.6 - 0.3),
          });
        }
      }

      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
    };

    // Spawn heart on mouse click
    const handleMouseClick = (e: MouseEvent) => {
      for (let i = 0; i < 5; i++) {
        hearts.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 12 + 10,
          speedY: -(Math.random() * 1.5 + 0.8),
          speedX: Math.random() * 2 - 1,
          opacity: 1,
          scale: 1,
          scaleSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    window.addEventListener('resize', handleResize);

    // Helpers to draw shapes on canvas
    const drawPetal = (x: number, y: number, size: number, angle: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      
      // Beautiful soft blush blossom petal
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(size * 1.2, -size * 1.5, size * 2, -size * 0.2);
      ctx.quadraticCurveTo(size * 1.5, size * 1.2, 0, 0);
      ctx.closePath();
      
      ctx.fillStyle = `rgba(255, 192, 203, ${opacity})`;
      ctx.shadowBlur = 2;
      ctx.shadowColor = 'rgba(255, 182, 193, 0.4)';
      ctx.fill();
      ctx.restore();
    };

    const drawHeart = (x: number, y: number, size: number, opacity: number, scale: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      
      ctx.beginPath();
      // Draw heart using simple bezier curves
      ctx.moveTo(0, -size / 4);
      ctx.bezierCurveTo(-size / 2, -size * 0.8, -size * 1.1, -size / 3, 0, size);
      ctx.bezierCurveTo(size * 1.1, -size / 3, size / 2, -size * 0.8, 0, -size / 4);
      ctx.closePath();

      // Gentle lavender pink gradient
      const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, size);
      grad.addColorStop(0, `rgba(255, 182, 193, ${opacity})`); // Blush pink
      grad.addColorStop(1, `rgba(230, 200, 250, ${opacity * 0.7})`); // Lavender overlay
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (x: number, y: number, size: number, color: string, angle: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;

      // Draw elegant 4-point star
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.quadraticCurveTo(0, 0, size, 0);
      ctx.quadraticCurveTo(0, 0, 0, size);
      ctx.quadraticCurveTo(0, 0, -size, 0);
      ctx.quadraticCurveTo(0, 0, 0, -size);
      ctx.closePath();
      ctx.fill();

      // Core glow
      ctx.beginPath();
      ctx.arc(0, 0, size / 3, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update and Draw Petals
      petals.forEach((p) => {
        p.curve += p.curveSpeed;
        p.x += p.speedX + Math.sin(p.curve) * 0.5;
        p.y += p.speedY;
        p.angle += p.angleSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
          p.opacity = Math.random() * 0.5 + 0.4;
        }
        if (p.x > width + 20) p.x = -20;
        else if (p.x < -20) p.x = width + 20;

        drawPetal(p.x, p.y, p.size, p.angle, p.opacity);
      });

      // 2. Update and Draw Hearts
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.y += h.speedY;
        h.x += h.speedX + Math.sin(h.y * 0.01) * 0.2;
        h.opacity -= 0.0015; // Slow fade
        h.scale = Math.max(0.5, h.scale - h.scaleSpeed * 0.1);

        // Recycle standard hearts that drift off top, keep clicks temporary
        if (h.y < -30 || h.opacity <= 0) {
          if (hearts.length > maxHearts) {
            // Remove click-spawned hearts
            hearts.splice(i, 1);
          } else {
            // Recycle basic hearts to bottom
            h.y = height + 30 + Math.random() * 50;
            h.x = Math.random() * width;
            h.opacity = Math.random() * 0.6 + 0.2;
            h.speedY = -(Math.random() * 0.6 + 0.3);
            h.scale = 1;
          }
          continue;
        }

        drawHeart(h.x, h.y, h.size, h.opacity, h.scale);
      }

      // 3. Update and Draw Sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.angle += s.angleSpeed;
        s.opacity -= s.decay;

        if (s.opacity <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        drawSparkle(s.x, s.y, s.size * s.opacity, s.color, s.angle, s.opacity);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-40"
    />
  );
}
