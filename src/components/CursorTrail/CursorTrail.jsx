import React, { useRef, useEffect } from "react";

const CursorTrail = ({ colors = ['#ff8c42', '#ff6a88', '#8245ec', '#a855f7'], maxParticles = 20 }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnParticles = (x, y) => {
      // spawn a few small particles per move
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          r: Math.random() * 3 + 1,
          life: 1,
          decay: 0.02 + Math.random() * 0.03,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      if (particlesRef.current.length > maxParticles) {
        particlesRef.current.splice(0, particlesRef.current.length - maxParticles);
      }
    };

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      spawnParticles(x, y);
    };

    const onTouch = (e) => {
      const touch = e.touches[0];
      if (touch) {
        const x = touch.clientX;
        const y = touch.clientY;
        spawnParticles(x, y);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        const alpha = Math.max(p.life, 0);
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r * (1 + (1 - alpha) * 0.3), 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      });

      ctx.globalAlpha = 1;
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [colors, maxParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    />
  );
};

export default CursorTrail;