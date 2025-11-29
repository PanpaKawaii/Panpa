import { useEffect, useRef } from 'react';
import './GenerateObject.css';

export default function GenerateObject({ faces }) {
    const containerRef = useRef(null);
    const objectRef = useRef(null);
    const animRef = useRef(null);
    const dragging = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });
    const rotation = useRef({ x: 0, y: 0 });

    const applyRotation = () => {
        if (objectRef.current) {
            const { x, y } = rotation.current;
            objectRef.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
        }
    };

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
            container.setPointerCapture(e.pointerId);
        };

        const onPointerMove = (e) => {
            if (!dragging.current) return;
            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;
            lastPos.current = { x: e.clientX, y: e.clientY };
            rotation.current.y += dx * 0.5;
            rotation.current.x -= dy * 0.5;
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

    return (
        <div className='generateobject-container'>
            <div
                ref={containerRef}
                className='scene-object'
            >
                <div
                    ref={objectRef}
                    className='object'
                >
                    {/* {[...Array(faces >= 0 ? Math.floor(faces) : 0)].map((_, index) => ( */}
                    {/* {[...Array(faces?.length)].map((_, index) => (
                        <div
                            key={index}
                            className={`face f${index + 1}`}
                            style={{}}
                        >
                            {faces?.[index]?.name}
                        </div>
                    ))} */}
                    {faces.map(face => {
                        // Tạo style động từ face.steps
                        const styleObj = {};
                        face.steps.forEach(step => {
                            if (step.type == 'translateX') {
                                styleObj.transform = (styleObj.transform || '') + ` translateX(${step.value}px)`;
                            }
                            if (step.type == 'translateY') {
                                styleObj.transform = (styleObj.transform || '') + ` translateY(${step.value}px)`;
                            }
                            if (step.type == 'translateZ') {
                                styleObj.transform = (styleObj.transform || '') + ` translateZ(${step.value}px)`;
                            }
                            if (step.type == 'rotateX') {
                                styleObj.transform = (styleObj.transform || '') + ` rotateX(${step.value}deg)`;
                            }
                            if (step.type == 'rotateY') {
                                styleObj.transform = (styleObj.transform || '') + ` rotateY(${step.value}deg)`;
                            }
                            if (step.type == 'rotateZ') {
                                styleObj.transform = (styleObj.transform || '') + ` rotateZ(${step.value}deg)`;
                            }
                            if (step.type == 'scale') {
                                styleObj.transform = (styleObj.transform || '') + ` scale(${step.value})`;
                            }
                            if (step.type == 'clip') {
                                styleObj.clipPath = `polygon(${step.value})`;
                            }
                        });
                        return (
                            <div
                                key={face.id}
                                className='face face-box'
                                style={styleObj}
                            >
                                {face.name}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
