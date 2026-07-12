import { useEffect, useRef } from 'react';

interface ConfettiParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  wobble: number;
  wobbleSpeed: number;
  opacity: number;
}

interface FireworkParticle {
  x: number;
  y: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  size: number;
  trail: boolean;
}

interface FireworkRocket {
  x: number;
  y: number;
  tx: number; // Target x
  ty: number; // Target y
  vx: number;
  vy: number;
  color: string;
  alpha: number;
}

export default function ConfettiAndFireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const confettiList: ConfettiParticle[] = [];
    const rockets: FireworkRocket[] = [];
    const fireworkParticles: FireworkParticle[] = [];

    // Pastel-friendly color schemes
    const pastelColors = [
      '#FFB7B2', // blush pink
      '#FFDAC1', // soft peach
      '#E2F0CB', // mint green
      '#B5EAD7', // pastel teal
      '#C7CEEA', // soft lavender
      '#FFFDF9', // cream
      '#A0C4FF', // baby blue
      '#FFC6FF', // pink purple
    ];

    const spawnConfettiBurst = (sourceX: number, sourceY: number, count = 100) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 8 + 4;
        confettiList.push({
          x: sourceX,
          y: sourceY,
          size: Math.random() * 8 + 6,
          color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - Math.random() * 5, // Upwards boost
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: Math.random() * 0.2 - 0.1,
          wobble: Math.random() * Math.PI,
          wobbleSpeed: Math.random() * 0.15 + 0.05,
          opacity: 1,
        });
      }
    };

    const spawnFireworkRocket = (startX: number, targetX: number, targetY: number) => {
      // Pick a random vibrant pastel color
      const color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
      const dx = targetX - startX;
      const dy = targetY - height;
      const distance = Math.hypot(dx, dy);
      const speed = Math.random() * 4 + 10;
      const angle = Math.atan2(dy, dx);

      rockets.push({
        x: startX,
        y: height,
        tx: targetX,
        ty: targetY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        alpha: 1,
      });
    };

    const explodeFirework = (x: number, y: number, color: string) => {
      const particleCount = 60 + Math.floor(Math.random() * 40);
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        fireworkParticles.push({
          x,
          y,
          color,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.01,
          size: Math.random() * 2 + 1,
          trail: Math.random() > 0.4,
        });
      }
    };

    // Listeners for triggers
    const handleTriggerConfetti = (e: Event) => {
      const customEvent = e as CustomEvent;
      const x = customEvent.detail?.x ?? width / 2;
      const y = customEvent.detail?.y ?? height / 3;
      spawnConfettiBurst(x, y, 120);
    };

    const handleTriggerFireworks = () => {
      // Trigger a glorious sequence of fireworks across the screen
      const delay = (ms: number, f: () => void) => setTimeout(f, ms);
      
      // Launch 4 rockets
      spawnFireworkRocket(width * 0.2, width * 0.3, height * 0.25 + Math.random() * 100);
      
      delay(300, () => {
        spawnFireworkRocket(width * 0.8, width * 0.7, height * 0.2 + Math.random() * 100);
      });

      delay(600, () => {
        spawnFireworkRocket(width * 0.5, width * 0.5 + (Math.random() * 200 - 100), height * 0.15 + Math.random() * 100);
      });

      delay(900, () => {
        spawnFireworkRocket(width * 0.4, width * 0.25, height * 0.3);
        spawnFireworkRocket(width * 0.6, width * 0.75, height * 0.3);
      });
    };

    window.addEventListener('trigger-confetti', handleTriggerConfetti);
    window.addEventListener('trigger-fireworks', handleTriggerFireworks);

    // Auto-spawn initial burst on page load with slight delay for perfect effect
    const initialTimer = setTimeout(() => {
      spawnConfettiBurst(width / 4, height / 2, 80);
      spawnConfettiBurst((3 * width) / 4, height / 2, 80);
    }, 1000);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const animate = () => {
      // Clear with very light trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      // 1. Render Confetti
      for (let i = confettiList.length - 1; i >= 0; i--) {
        const c = confettiList[i];
        
        // Physics
        c.vy += 0.15; // Gravity
        c.vx *= 0.99; // Drag
        c.x += c.vx;
        c.y += c.vy;
        c.rotation += c.rotationSpeed;
        c.wobble += c.wobbleSpeed;

        // Fade near the bottom
        if (c.y > height - 100) {
          c.opacity -= 0.02;
        }

        if (c.y > height || c.opacity <= 0) {
          confettiList.splice(i, 1);
          continue;
        }

        // Draw ribbon confetti
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation);
        
        const ribbonWidth = c.size * Math.sin(c.wobble);
        ctx.fillStyle = c.color;
        ctx.globalAlpha = c.opacity;
        ctx.fillRect(-ribbonWidth / 2, -c.size / 2, ribbonWidth, c.size);
        
        ctx.restore();
      }

      // 2. Render Firework Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;

        // Draw trail of rocket rising
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.fill();

        // Check if rocket reached destination
        const distToTarget = Math.hypot(r.x - r.tx, r.y - r.ty);
        if (distToTarget < 20 || r.vy >= 0 || r.y <= r.ty) {
          explodeFirework(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // 3. Render Firework Particles
      for (let i = fireworkParticles.length - 1; i >= 0; i--) {
        const p = fireworkParticles[i];
        
        // Physics
        p.vy += 0.08; // Slight gravity
        p.vx *= 0.98; // Air drag
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          fireworkParticles.splice(i, 1);
          continue;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        // Sparkle glow
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();

        // Draw tiny sparks trail
        if (p.trail && Math.random() > 0.4) {
          ctx.beginPath();
          ctx.arc(p.x - p.vx * 1.5, p.y - p.vy * 1.5, p.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(initialTimer);
      window.removeEventListener('trigger-confetti', handleTriggerConfetti);
      window.removeEventListener('trigger-fireworks', handleTriggerFireworks);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
    />
  );
}
