// File: MouseTracker.jsx
import React, { useRef, useEffect, useState } from 'react';
import './MouseTracker.css';

export default function MouseTracker() {
    const containerRef = useRef(null);
    const xRef = useRef(null);
    const yRef = useRef(null);
    const coords = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    const [effect, setEffect] = useState('dot');

    /** -----------------------------
     *  HIỆU ỨNG BURST TỐI ƯU
     --------------------------------*/
    const burstIcons = ['🌸', '⭐', '💗', '🍬', '🌞', '🌜'];

    // Throttle 120ms/lần
    let lastBurst = 0;

    const burstIndex = useRef(0);
    const spawnBurst = (x, y) => {
        // lấy icon theo thứ tự xoay vòng
        const iconChar = burstIcons[burstIndex.current];
        burstIndex.current = (burstIndex.current + 1) % burstIcons.length;

        const icon = document.createElement('div');
        icon.className = 'burst';
        icon.textContent = iconChar;

        // đặt icon đúng vị trí chuột bằng transform
        icon.style.transform = `translate(${x}px, ${y}px)`;

        containerRef.current.appendChild(icon);

        // random hướng bắn
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 3;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        let life = 0;
        const maxLife = 55;

        const animate = () => {
            life++;

            const nx = x + vx * life;
            const ny = y + vy * life;

            const scale = 1 - life * 0.015;
            const opacity = 1 - life * 0.018;

            icon.style.transform = `translate(${nx}px, ${ny}px) scale(${scale})`;
            icon.style.opacity = opacity;

            if (life < maxLife) {
                requestAnimationFrame(animate);
            } else {
                icon.remove();
            }
        };

        requestAnimationFrame(animate);
    };


    /** -----------------------------
     *  TRACKING CHUỘT
     --------------------------------*/
    useEffect(() => {
        const handleMove = (e) => {
            coords.current.x = e.clientX;
            coords.current.y = e.clientY;

            if (effect === 'trail') {
                const el = document.createElement('div');
                el.className = 'trail';
                el.style.left = `${e.clientX}px`;
                el.style.top = `${e.clientY}px`;
                containerRef.current.appendChild(el);

                setTimeout(() => {
                    el.style.opacity = '0';
                    setTimeout(() => el.remove(), 300);
                }, 10);
            }

            if (effect === 'burst') {
                const now = Date.now();
                if (now - lastBurst > 60) { // đổi số này để chỉnh tần suất
                    spawnBurst(e.clientX, e.clientY);
                    lastBurst = now;
                }
            }
        };

        const update = () => {
            if (xRef.current && yRef.current) {
                xRef.current.textContent = coords.current.x;
                yRef.current.textContent = coords.current.y;
            }

            const dot = containerRef.current?.querySelector('.dot');
            if (dot && effect === 'dot') {
                dot.style.transform = `translate(${coords.current.x - 6}px, ${coords.current.y - 6}px)`;
            }

            const glow = containerRef.current?.querySelector('.glow');
            if (glow && effect === 'glow') {
                glow.style.transform = `translate(${coords.current.x - 40}px, ${coords.current.y - 40}px)`;
            }

            rafRef.current = requestAnimationFrame(update);
        };

        window.addEventListener('mousemove', handleMove, { passive: true });
        rafRef.current = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, [effect]);

    return (
        <div className="wrapper" ref={containerRef}>
            <div className="panel">
                <div className="row">
                    <span className="label">X</span>
                    <span className="value" ref={xRef}>0</span>
                </div>
                <div className="row">
                    <span className="label">Y</span>
                    <span className="value" ref={yRef}>0</span>
                </div>

                <div className="buttons">
                    <button onClick={() => setEffect('dot')}>Dot</button>
                    <button onClick={() => setEffect('glow')}>Glow</button>
                    <button onClick={() => setEffect('trail')}>Trail</button>
                    <button onClick={() => setEffect('burst')}>Burst</button>
                </div>
            </div>

            {effect === 'dot' && <div className="dot" />}
            {effect === 'glow' && <div className="glow" />}
        </div>
    );
}
