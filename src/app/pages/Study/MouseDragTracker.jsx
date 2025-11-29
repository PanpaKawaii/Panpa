import React, { useRef, useEffect } from 'react';
import './MouseDragTracker.css';

export default function MouseDragTracker() {
    const containerRef = useRef(null);
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const dragActiveRef = useRef(false);

    const deltaXRef = useRef(null);
    const deltaYRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const handleMouseDown = (e) => {
            dragActiveRef.current = true;
            startXRef.current = e.clientX;
            startYRef.current = e.clientY;

            // Tạo line nếu chưa có
            if (!lineRef.current) {
                const line = document.createElement('div');
                line.className = 'drag-line';
                containerRef.current.appendChild(line);
                lineRef.current = line;
            }

            lineRef.current.style.display = 'block';
        };

        const handleMouseMove = (e) => {
            if (!dragActiveRef.current) return;

            const dx = e.clientX - startXRef.current;
            const dy = e.clientY - startYRef.current;

            // Cập nhật ΔX, ΔY
            if (deltaXRef.current && deltaYRef.current) {
                deltaXRef.current.textContent = `${dx} px`;
                deltaYRef.current.textContent = `${dy} px`;
            }

            // Cập nhật line vector
            const line = lineRef.current;
            if (line) {
                const length = Math.hypot(dx, dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;

                line.style.width = `${length}px`;
                line.style.transform = `translate(${startXRef.current}px, ${startYRef.current}px) rotate(${angle}deg)`;
            }
        };

        const handleMouseUp = () => {
            dragActiveRef.current = false;
            if (lineRef.current) {
                lineRef.current.style.display = 'none';
            }
        };

        const container = containerRef.current;
        container.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div className="drag-wrapper" ref={containerRef}>
            <div className="info-panel">
                <div className="row">
                    <span className="label">ΔX:</span>
                    <span className="value" ref={deltaXRef}>0 px</span>
                </div>
                <div className="row">
                    <span className="label">ΔY:</span>
                    <span className="value" ref={deltaYRef}>0 px</span>
                </div>
                <div className="note">
                    Nhấn giữ chuột và kéo để xem vector
                </div>
            </div>
        </div>
    );
}
