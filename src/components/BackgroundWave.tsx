import { useEffect, useRef } from 'react';
import { ThemeMode } from '../types';

interface BackgroundWaveProps {
  theme: ThemeMode;
}

export default function BackgroundWave({ theme }: BackgroundWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Star/particle generation
    const particlesCount = 80;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;
      pulseSpeed: number;
      pulseOffset: number;
      color: string;
    }> = [];

    // Pastel/sparkle colors for particles
    const particleColors = {
      light: ['rgba(244, 212, 212, 0.6)', 'rgba(212, 224, 244, 0.6)', 'rgba(235, 212, 244, 0.6)', 'rgba(255, 255, 255, 0.8)'],
      dark: ['rgba(147, 197, 253, 0.6)', 'rgba(216, 180, 254, 0.6)', 'rgba(253, 186, 116, 0.6)', 'rgba(255, 255, 255, 0.9)'],
    };

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.2 + 0.05,
        opacity: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
        color: '', // Will pick dynamically based on theme
      });
    }

    // Dreamy floating bubbles and hearts drifting slowly upwards behind content
    const dreamyCount = 20;
    const dreamyElements: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      type: 'bubble' | 'heart';
      wobbleSpeed: number;
      wobbleAmount: number;
      wobbleOffset: number;
    }> = [];

    for (let i = 0; i < dreamyCount; i++) {
      dreamyElements.push({
        x: Math.random() * width,
        y: Math.random() * (height + 150), // disperse across screen height initially
        size: Math.random() * 18 + 12, // size between 12 and 30 pixels
        speedY: Math.random() * 0.4 + 0.15, // extremely gentle rising speed
        opacity: Math.random() * 0.2 + 0.1, // very low opacity (10% to 30%) to remain subtle
        type: i % 2 === 0 ? 'bubble' : 'heart',
        wobbleSpeed: Math.random() * 0.01 + 0.005,
        wobbleAmount: Math.random() * 1.5 + 0.5,
        wobbleOffset: Math.random() * Math.PI * 2,
      });
    }

    // Seashells or static floating elements (beach aesthetic)
    const seashells: Array<{
      x: number;
      y: number;
      scale: number;
      angle: number;
      type: 'conch' | 'scallop';
    }> = [];

    for (let i = 0; i < 5; i++) {
      seashells.push({
        x: Math.random() * width,
        y: height - 100 - Math.random() * 100, // Near the bottom (shore)
        scale: Math.random() * 15 + 15,
        angle: Math.random() * Math.PI * 2,
        type: i % 2 === 0 ? 'conch' : 'scallop',
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Keep seashells near the new bottom
      seashells.forEach((shell) => {
        shell.y = height - 100 - Math.random() * 100;
        shell.x = Math.random() * width;
      });
    };

    window.addEventListener('resize', handleResize);

    // Wave parameters
    let tick = 0;

    const render = () => {
      tick += 0.005;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw gradient background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (theme === 'light') {
        // Soft pastel beige, blush pink, cream, lavender, and ocean blue
        bgGrad.addColorStop(0, '#FDFCF0'); // Natural Tones Cream Ivory
        bgGrad.addColorStop(0.5, '#E0F7FA'); // Natural Tones Soft Mint Cyan
        bgGrad.addColorStop(1, '#F8E1EE'); // Natural Tones Blush Pink
      } else {
        // Night starry beach
        bgGrad.addColorStop(0, '#0E1118'); // Midnight blue
        bgGrad.addColorStop(0.4, '#151B2E'); // Dark deep blue
        bgGrad.addColorStop(0.7, '#1B1429'); // Starry night purple hue
        bgGrad.addColorStop(1, '#0F1C3F'); // Ocean tide dark navy
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw animated background stars/particles (glowing dust)
      particles.forEach((p, idx) => {
        // Slowly float upward
        p.y -= p.speed;
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        // Twinkle effect
        const currentOpacity = Math.max(0.1, p.opacity + Math.sin(tick * 100 * p.pulseSpeed + p.pulseOffset) * 0.3);
        
        // Dynamic colors based on theme
        const colors = theme === 'light' ? particleColors.light : particleColors.dark;
        const color = colors[idx % colors.length];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${currentOpacity})`);
        ctx.shadowBlur = theme === 'dark' ? p.radius * 2 : 0;
        ctx.shadowColor = 'rgba(255,255,255,0.8)';
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      });

      // 2b. Draw animated dreamy background bubbles and hearts slowly drifting upward
      dreamyElements.forEach((el) => {
        // Slowly float upward
        el.y -= el.speedY;
        
        // Horizontal wobble oscillation
        el.wobbleOffset += el.wobbleSpeed;
        const currentX = el.x + Math.sin(el.wobbleOffset) * el.wobbleAmount;

        // Wrap around screen boundaries when drifting off the top or sides
        if (el.y < -50) {
          el.y = height + 50;
          el.x = Math.random() * width;
          el.size = Math.random() * 18 + 12;
          el.opacity = Math.random() * 0.2 + 0.1;
        }
        if (currentX > width + 50) {
          el.x = -30;
        } else if (currentX < -50) {
          el.x = width + 30;
        }

        if (el.type === 'bubble') {
          // Draw a soft soap bubble with iridescent cyan/pink hints
          ctx.save();
          ctx.translate(currentX, el.y);
          
          const radius = el.size / 2;
          const grad = ctx.createRadialGradient(-radius * 0.25, -radius * 0.25, radius * 0.1, 0, 0, radius);
          grad.addColorStop(0, `rgba(255, 255, 255, ${el.opacity * 0.15})`);
          grad.addColorStop(0.7, `rgba(244, 143, 177, ${el.opacity * 0.2})`); // Soft pink outline hint
          grad.addColorStop(0.9, `rgba(56, 189, 248, ${el.opacity * 0.25})`);  // Soft cyan reflection
          grad.addColorStop(1, `rgba(255, 255, 255, ${el.opacity * 0.45})`);   // White edge highlight

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.fill();

          // Sparkle glint on top-left of the bubble
          ctx.beginPath();
          ctx.ellipse(-radius * 0.35, -radius * 0.35, radius * 0.2, radius * 0.1, -Math.PI / 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${el.opacity * 0.7})`;
          ctx.fill();

          ctx.restore();
        } else {
          // Draw a soft background heart shape
          ctx.save();
          ctx.translate(currentX, el.y);
          
          const size = el.size * 0.8;
          ctx.beginPath();
          ctx.moveTo(0, -size / 4);
          ctx.bezierCurveTo(-size / 2, -size * 0.8, -size * 1.1, -size / 3, 0, size);
          ctx.bezierCurveTo(size * 1.1, -size / 3, size / 2, -size * 0.8, 0, -size / 4);
          ctx.closePath();

          // Soft rose gradient glow
          const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, size);
          grad.addColorStop(0, `rgba(244, 143, 177, ${el.opacity * 0.35})`); // Delicate pink
          grad.addColorStop(1, `rgba(244, 143, 177, 0)`);
          ctx.fillStyle = grad;
          ctx.fill();

          // Subtle white outline
          ctx.strokeStyle = `rgba(255, 255, 255, ${el.opacity * 0.15})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.restore();
        }
      });

      // 3. Draw minimalist moving ocean waves at the bottom
      // We will stack 4 layers of transparent waves
      const waveLayers = theme === 'light' 
        ? [
            { amplitude: 18, frequency: 0.005, speed: 0.8, color: 'rgba(220, 238, 243, 0.65)', baseOffset: 120 },
            { amplitude: 12, frequency: 0.008, speed: -0.6, color: 'rgba(202, 230, 238, 0.55)', baseOffset: 100 },
            { amplitude: 15, frequency: 0.004, speed: 0.4, color: 'rgba(182, 221, 233, 0.45)', baseOffset: 80 },
            { amplitude: 8, frequency: 0.012, speed: -0.3, color: 'rgba(164, 212, 226, 0.35)', baseOffset: 65 },
          ]
        : [
            { amplitude: 22, frequency: 0.004, speed: 0.5, color: 'rgba(21, 52, 107, 0.5)', baseOffset: 130 },
            { amplitude: 16, frequency: 0.006, speed: -0.4, color: 'rgba(27, 65, 128, 0.45)', baseOffset: 110 },
            { amplitude: 12, frequency: 0.003, speed: 0.3, color: 'rgba(34, 87, 158, 0.4)', baseOffset: 90 },
            { amplitude: 9, frequency: 0.009, speed: -0.2, color: 'rgba(40, 116, 201, 0.3)', baseOffset: 75 },
          ];

      waveLayers.forEach((layer) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 4) {
          // Combination of primary sine wave and slow secondary sine wave for organic feel
          const y =
            height -
            layer.baseOffset +
            Math.sin(x * layer.frequency + tick * layer.speed * 2) * layer.amplitude +
            Math.sin(x * (layer.frequency * 0.5) - tick * layer.speed) * (layer.amplitude * 0.4);

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = layer.color;
        ctx.fill();
      });

      // 4. Draw elegant decorative outlines of seashells in waves (minimalist, low opacity)
      seashells.forEach((shell) => {
        const shellColor = theme === 'light' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)';
        ctx.save();
        ctx.translate(shell.x, shell.y);
        ctx.rotate(shell.angle + tick * 0.02); // very slow roll in tide
        ctx.strokeStyle = shellColor;
        ctx.lineWidth = 1.5;

        if (shell.type === 'scallop') {
          // Draw scallop shell
          ctx.beginPath();
          ctx.moveTo(0, shell.scale / 2);
          for (let theta = -Math.PI / 4; theta <= Math.PI + Math.PI / 4; theta += 0.2) {
            const rx = Math.cos(theta) * (shell.scale / 2);
            const ry = Math.sin(theta) * (shell.scale * 0.7);
            ctx.lineTo(rx, ry);
          }
          ctx.closePath();
          ctx.stroke();

          // Draw internal ribs
          for (let angle = -Math.PI / 4; angle <= Math.PI + Math.PI / 4; angle += Math.PI / 8) {
            ctx.beginPath();
            ctx.moveTo(0, shell.scale / 2);
            ctx.lineTo(Math.cos(angle) * (shell.scale * 0.4), Math.sin(angle) * (shell.scale * 0.6));
            ctx.stroke();
          }
        } else {
          // Draw simple conch spiral
          ctx.beginPath();
          let r = 2;
          ctx.moveTo(0, 0);
          for (let a = 0; a < Math.PI * 3; a += 0.1) {
            r = (shell.scale / 10) * a;
            const sx = Math.cos(a) * r;
            const sy = Math.sin(a) * r;
            ctx.lineTo(sx, sy);
          }
          ctx.stroke();
        }
        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
