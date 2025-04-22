import React from 'react';
import './Pyramid.css';

export default function Pyramid() {

    const Distance = 40.824;
    const Angle = -70.529;

    return (
        <>
            <div className='scene-pyramid'>
                <div className='pyramid'>
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className={`face f${index + 1}`}
                            style={{
                                background: `hsl(${Math.round(index * (360 / 4))}, 70%, 50%, 0.5)`,
                                transform: `
                                rotateZ(${index !== 0 ? index * 120 : 0}deg)
                                rotateX(${index !== 0 ? Angle : 0}deg)
                                rotateY(${index === 0 ? 180 : 0}deg)
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
