// Cube3D.jsx
import { useEffect, useRef, useState } from 'react';
import './Cube3D.css';

export default function Cube3D({ size = 200, autoplay = true, colors } = {}) {
    const containerRef = useRef(null);
    const cubeRef = useRef(null);
    const animRef = useRef(null);
    const dragging = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });
    const rotation = useRef({ x: -20, y: -30 });
    const [isAutoplay, setIsAutoplay] = useState(autoplay);

    const faceColors = colors || [
        'rgba(99,102,241,0.95)',
        'rgba(16,185,129,0.95)',
        'rgba(239,68,68,0.95)',
        'rgba(234,179,8,0.95)',
        'rgba(99,102,241,0.85)',
        'rgba(59,130,246,0.85)'
    ];

    const s = typeof size === 'number' ? size : parseInt(size, 10) || 200;
    const half = s / 2;

    const applyRotation = () => {
        if (cubeRef.current) {
            const { x, y } = rotation.current;
            cubeRef.current.style.transform = `translateZ(-${half}px) rotateX(${x}deg) rotateY(${y}deg)`;
        }
    };

    useEffect(() => {
        let lastTime = 0;
        const tick = (time) => {
            if (!isAutoplay) return;
            const dt = (time - lastTime) / 1000 || 0;
            lastTime = time;
            rotation.current.y += 20 * dt;
            applyRotation();
            animRef.current = requestAnimationFrame(tick);
        };
        if (isAutoplay) animRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animRef.current);
    }, [isAutoplay, half]);

    useEffect(() => {
        applyRotation();
        return () => cancelAnimationFrame(animRef.current);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onPointerDown = (e) => {
            dragging.current = true;
            lastPos.current = { x: e.clientX, y: e.clientY };
            setIsAutoplay(false);
            container.setPointerCapture(e.pointerId);
        };

        const onPointerMove = (e) => {
            if (!dragging.current) return;
            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;
            lastPos.current = { x: e.clientX, y: e.clientY };
            rotation.current.y += dx * 0.3;
            rotation.current.x -= dy * 0.3;
            rotation.current.x = Math.max(-90, Math.min(90, rotation.current.x));
            applyRotation();
        };

        const onPointerUp = (e) => {
            dragging.current = false;
            try { container.releasePointerCapture(e.pointerId); } catch { }
        };

        container.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);

        return () => {
            container.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };
    }, []);

    const faceStyle = {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        color: 'white',
        backfaceVisibility: 'hidden',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 6px 18px rgba(2,6,23,0.35)'
    };

    return (
        <div className="cube-wrapper">
            <div
                ref={containerRef}
                className="cube-container"
                style={{ width: s, height: s, perspective: s * 4 }}
            >
                <div
                    ref={cubeRef}
                    className="cube"
                    style={{ width: s, height: s }}
                >
                    <div className="face" style={{ ...faceStyle, width: s, height: s, transform: `rotateY(0deg) translateZ(${half}px)`, background: faceColors[0] }}>Front</div>
                    <div className="face" style={{ ...faceStyle, width: s, height: s, transform: `rotateY(180deg) translateZ(${half}px)`, background: faceColors[1] }}>Back</div>
                    <div className="face" style={{ ...faceStyle, width: s, height: s, transform: `rotateY(90deg) translateZ(${half}px)`, background: faceColors[2] }}>Right</div>
                    <div className="face" style={{ ...faceStyle, width: s, height: s, transform: `rotateY(-90deg) translateZ(${half}px)`, background: faceColors[3] }}>Left</div>
                    <div className="face" style={{ ...faceStyle, width: s, height: s, transform: `rotateX(90deg) translateZ(${half}px)`, background: faceColors[4] }}>Top</div>
                    <div className="face" style={{ ...faceStyle, width: s, height: s, transform: `rotateX(-90deg) translateZ(${half}px)`, background: faceColors[5] }}>Bottom</div>
                </div>

                <div className="cube-controls">
                    <button onClick={() => setIsAutoplay(!isAutoplay)}>
                        {isAutoplay ? 'Pause' : 'Play'}
                    </button>
                    <button
                        onClick={() => {
                            rotation.current = { x: -20, y: -30 };
                            applyRotation();
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
