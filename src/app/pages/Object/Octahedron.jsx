import React from 'react';
import './Octahedron.css';

export default function Octahedron() {

    const Distance = 40.823;
    const SubDistance = -7.735;
    const Angle = -54.736;

    return (
        <>
            <div className='scene-octahedron'>
                <div className='octahedron'>
                    {[...Array(8)].map((_, index) => (
                        <div
                            key={index}
                            className={`face f${index + 1}`}
                            style={{
                                background: `hsl(${Math.round(index * (360 / 8))}, 70%, 50%, 0.5)`,
                                transform: `
                                translateY(${SubDistance}px)
                                rotateZ(${index % 4 * 90 + 45}deg)
                                rotateX(${index < 4 ? Angle : -Angle}deg)
                                translateZ(${index < 4 ? Distance : -Distance}px)
                                `,
                            }}
                        >
                            Face{index + 1}
                        </div>
                    ))}
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className={`floor fl${index + 1}`}
                        >
                            Root{index + 1}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
