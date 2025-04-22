import React from 'react';
import './Icosahedron.css';

export default function Icosahedron() {

    const Distance = 75.577;
    const Angle = -37.377;
    const SubAngle = [0, 41.81, -138.19, 180];

    return (
        <>
            <div className='scene-icosahedron'>
                <div className='icosahedron'>
                    {[...Array(20)].map((_, index) => (
                        <div
                            key={index}
                            className={`face f${index + 1}`}
                            style={{
                                background: `hsl(${Math.round(index * (360 / 20))}, 70%, 50%, 0.5)`,
                                transform: `
                                rotateZ(${(index <= 4 || index >= 15) ? (index % 5) * 72 : ((index >= 5 || index <= 14) ? (index % 5) * 72 + 36 : 0)}deg)
                                rotateX(${(Math.floor(index / 5) === 0 || Math.floor(index / 5) === 3) ? SubAngle[Math.floor(index / 5)] + Angle : SubAngle[Math.floor(index / 5)] - Angle}deg)
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
