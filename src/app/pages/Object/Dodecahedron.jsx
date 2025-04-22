import React from 'react';
import './Dodecahedron.css';

export default function Dodecahedron() {

    const Distance = 68.7;
    const SubDistance = -5.02;
    const Angle = -116.565;

    return (
        <>
            <div className='scene-dodecahedron'>
                <div className='dodecahedron'>
                    {[...Array(12)].map((_, index) => (
                        <div
                            key={index}
                            className={`face f${index + 1}`}
                            style={{
                                background: `hsl(${Math.round(index * (360 / 12))}, 70%, 50%, 0.5)`,
                                transform: `
                                rotateZ(${index === 6 ? 180 : index * 72}deg)
                                rotateX(${(index !== 0 && index !== 6) ? (index < 6 ? Angle : 180 + Angle) : 0}deg)
                                rotateY(${index === 0 ? 180 : 0}deg)
                                translateY(${SubDistance}px)
                                translateZ(${Distance}px)
                                `,
                            }}
                        >
                            Face{index + 1}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
