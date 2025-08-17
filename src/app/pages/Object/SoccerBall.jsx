import { useState } from 'react';
import './SoccerBall.css';

export default function SoccerBall() {
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
    const handleChangeRotation = (axis, value) => {
        setRotation(prev => ({ ...prev, [axis]: parseInt(value) }));
    };

    const Distance = 143.4;
    const SubDistance = -5.02;
    const Angle = -116.565;

    const DistanceWhite = 139.2;
    const AngleWhite1 = 37.5;
    const AngleWhite2 = 42;

    return (
        <>
            <div className='scene-ball'>
                <div className='ball'
                    style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)` }}>
                    {[...Array(12)].map((_, index) => (
                        <div
                            key={index}
                            className={`face f${index + 1}`}
                            style={{
                                background: `#333333`,
                                transform: `
                                rotateZ(${index === 6 ? 180 : index * 72}deg)
                                rotateX(${(index !== 0 && index !== 6) ? (index < 6 ? Angle : 180 + Angle) : 0}deg)
                                rotateY(${index === 0 ? 0 : 180}deg)
                                translateY(${SubDistance}px)
                                translateZ(${Distance}px)
                                `,
                            }}
                        >
                            {/* Face{index + 1} */}
                            {[...Array(5)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`tri f${index + 1}`}
                                    style={{
                                        background: `#28a74540`,
                                        transform: `
                                        translateY(${5}px)
                                        rotateZ(${index % 5 * 72}deg)
                                        rotateX(${-20}deg)
                                        translateZ(${20}px)
                                        `,
                                    }}
                                >
                                    Face{index + 1}
                                </div>
                            ))}
                        </div>
                    ))}
                    {[...Array(20)].map((_, index) => (
                        <div
                            key={index}
                            className={`face face-white f${index + 13}`}
                            style={{
                                background: `#aaa`,
                                transform: `
                                rotateZ(${(index % 5) * 72 + 36}deg)
                                rotateX(${index < 10 ? (index < 5 ? AngleWhite1 : AngleWhite1 + 180) : (index < 15 ? AngleWhite1 + AngleWhite2 : AngleWhite1 + AngleWhite2 + 180)}deg)
                                rotateY(${index < 10 ? 0 : 180}deg)
                                translateZ(${DistanceWhite}px)
                                `,
                            }}
                        >
                            Face{index + 13}
                        </div>
                    ))}

                    <div className='line line-x'>X</div>
                    <div className='line line-x x-2'>X</div>
                    <div className='line line-y'>Y</div>
                    <div className='line line-y y-2'>Y</div>
                    <div className='line line-z'>Z</div>
                    <div className='line line-z z-2'>Z</div>
                </div>
            </div>

            <form className='rotation-form'>
                {['x', 'y', 'z'].map(axis => (
                    <div key={axis} className='slider-group'>
                        <label htmlFor={axis}>{axis.toUpperCase()}: {rotation[axis]}°</label>
                        <input
                            type='range'
                            id={axis}
                            name={axis}
                            min='0'
                            max='360'
                            value={rotation[axis]}
                            onChange={(e) => handleChangeRotation(axis, e.target.value)}
                        />
                    </div>
                ))}
            </form>
        </>
    )
}
