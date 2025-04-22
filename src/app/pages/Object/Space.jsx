import React from 'react';
import './Space.css';

export default function Space() {

    const EarthDistance = 75.577;
    const EarthAngle = -37.377;
    const EarthSubAngle = [0, 41.81, -138.19, 180];

    const MoonDistance = 20.61;
    const MoonSubDistance = -1.506;
    const MoonAngle = -116.565;

    const EarthColor = () => {
        const t = Math.random();
        const g = Math.round((1 - t) * 128);
        const b = Math.round(t * 255);
        return `rgb(0, ${g}, ${b})`;
    }

    const MoonColor = () => {
        const min = 0x88, max = 0xaa;
        const val = Math.floor(Math.random() * (max - min + 1)) + min;
        return `rgb(${val}, ${val}, ${val})`;
    };

    return (
        <div className='object-space-container'>
            <div className='icosahedron'>
                {[...Array(20)].map((_, index) => (
                    <div
                        key={index}
                        className={`face f${index + 1}`}
                        style={{
                            background: EarthColor(),
                            transform: `
                                rotateZ(${(index <= 4 || index >= 15) ? (index % 5) * 72 : ((index >= 5 || index <= 14) ? (index % 5) * 72 + 36 : 0)}deg)
                                rotateX(${(Math.floor(index / 5) === 0 || Math.floor(index / 5) === 3) ? EarthSubAngle[Math.floor(index / 5)] + EarthAngle : EarthSubAngle[Math.floor(index / 5)] - EarthAngle}deg)
                                translateZ(${EarthDistance}px)
                                `,
                        }}
                    >
                    </div>
                ))}
            </div>
            <div className='dodecahedron'>
                {[...Array(12)].map((_, index) => (
                    <div
                        key={index}
                        className={`face f${index + 1}`}
                        style={{
                            background: MoonColor(),
                            transform: `
                                rotateZ(${index === 6 ? 180 : index * 72}deg)
                                rotateX(${(index !== 0 && index !== 6) ? (index < 6 ? MoonAngle : 180 + MoonAngle) : 0}deg)
                                rotateY(${index === 0 ? 180 : 0}deg)
                                translateY(${MoonSubDistance}px)
                                translateZ(${MoonDistance}px)
                                `,
                        }}
                    >
                    </div>
                ))}
            </div>
        </div>
    )
}
