import React, { useRef, useEffect } from 'react';
import './MouseDragRotate.css';

export default function MouseDragRotate() {
    const containerRef = useRef(null);
    const rotatableRef = useRef(null);

    const vectorXRef = useRef(null);
    const vectorYRef = useRef(null);

    const dragActiveRef = useRef(false);
    const startXRef = useRef(0);
    const startYRef = useRef(0);

    // Góc tích lũy
    const angleXRef = useRef(0);
    const angleYRef = useRef(0);

    // Vector tích lũy
    const vectorXAccRef = useRef(0);
    const vectorYAccRef = useRef(0);

    useEffect(() => {
        const handleMouseDown = (e) => {
            dragActiveRef.current = true;
            startXRef.current = e.clientX;
            startYRef.current = e.clientY;
        };

        const handleMouseMove = (e) => {
            if (!dragActiveRef.current) return;

            const dx = e.clientX - startXRef.current;
            const dy = e.clientY - startYRef.current;

            // Cộng dồn góc 3D
            angleYRef.current += dx; // ΔX → rotateY
            angleXRef.current -= dy; // ΔY → rotateX

            if (rotatableRef.current) {
                rotatableRef.current.style.transform =
                    `rotateX(${angleXRef.current}deg) rotateY(${angleYRef.current}deg)`;
            }

            // Cộng dồn vector trực quan
            vectorXAccRef.current += dx;
            vectorYAccRef.current += dy;

            if (vectorXRef.current) {
                vectorXRef.current.style.width = `${Math.abs(vectorXAccRef.current)}px`;
                vectorXRef.current.style.transform = vectorXAccRef.current >= 0 ? 'rotate(0deg)' : 'rotate(180deg)';
            }
            if (vectorYRef.current) {
                vectorYRef.current.style.height = `${Math.abs(vectorYAccRef.current)}px`;
                vectorYRef.current.style.transform = vectorYAccRef.current >= 0 ? 'rotate(0deg)' : 'rotate(180deg)';
            }

            // Cập nhật startX/Y cho lần move tiếp theo
            startXRef.current = e.clientX;
            startYRef.current = e.clientY;
        };

        const handleMouseUp = () => {
            dragActiveRef.current = false;
            // Vector vẫn giữ giá trị tích lũy, không reset
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
        <div className="rotate3d-wrapper" ref={containerRef}>
            <div className="rotatable-3d" ref={rotatableRef}>
                🎯
            </div>

            {/* Vector trực quan */}
            <div className="vector delta-x" ref={vectorXRef} />
            <div className="vector delta-y" ref={vectorYRef} />
        </div>
    );
}
