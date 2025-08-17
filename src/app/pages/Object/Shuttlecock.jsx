import React, { useState } from 'react';
import './Shuttlecock.css';

export default function Shuttlecock() {
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
    const handleChangeRotation = (axis, value) => {
        setRotation(prev => ({ ...prev, [axis]: parseInt(value) }));
    };
    const visibleRow = 4;
    const realRow = 6;
    const realCol = 16;
    const Distance = 68;
    const ContainerFaceWidth = 150;
    const ContainerFaceHeight = 2 * Distance * Math.tan((90 / (realRow)) * (Math.PI / 180));
    return (
        <>
            <div className='scene-shuttlecock'>
                <div className='shuttlecock'
                    style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)` }}>

                    {[...Array(visibleRow)].map((_, row) => (
                        [...Array(realCol)].map((_, col) => (
                            <React.Fragment key={`${row}-${col}`}>
                                <div
                                    className='head'
                                    style={{
                                        transform: `translateZ(-180px) rotateY(180deg) rotateZ(${360 / realCol * (col + 1)}deg) rotateX(${-90 / realRow + (row + 1) * 180 / realRow}deg) translateZ(${Distance}px)`,
                                        width: `${ContainerFaceWidth}px`,
                                        height: `${ContainerFaceHeight}px`,
                                        clipPath: `polygon(
                                            ${(50 - 2 * Distance * (Math.tan(180 / realCol * Math.PI / 180)) / (Math.cos(90 / realRow * Math.PI / 180)) * (Math.sin(180 / realRow * (row + 1) * Math.PI / 180)) / ContainerFaceWidth * 50)}% 0%,
                                            ${(50 + 2 * Distance * (Math.tan(180 / realCol * Math.PI / 180)) / (Math.cos(90 / realRow * Math.PI / 180)) * (Math.sin(180 / realRow * (row + 1) * Math.PI / 180)) / ContainerFaceWidth * 50)}% 0%,
                                            ${(50 + 2 * Distance * (Math.tan(180 / realCol * Math.PI / 180)) / (Math.cos(90 / realRow * Math.PI / 180)) * (Math.sin(180 / realRow * (row) * Math.PI / 180)) / ContainerFaceWidth * 50)}% 100%,
                                            ${(50 - 2 * Distance * (Math.tan(180 / realCol * Math.PI / 180)) / (Math.cos(90 / realRow * Math.PI / 180)) * (Math.sin(180 / realRow * (row) * Math.PI / 180)) / ContainerFaceWidth * 50)}% 100%
                                        )`,
                                    }}
                                ></div>
                                {row == 0 && <div
                                    className='neck'
                                    style={{
                                        transform: `rotateZ(${col * 360 / realCol}deg) translateZ(-140px) rotateX(90deg) translateZ(63px)`
                                    }}
                                ></div>}
                                {row == 0 && <div
                                    className='hide'
                                    style={{
                                        transform: `translateZ(-200px) rotateZ(${col * 360 / realCol}deg) rotateX(${-90 / realRow + (row + 1) * 180 / realRow}deg) translateZ(${Distance}px)`,
                                        width: `${ContainerFaceWidth}px`,
                                        height: `${ContainerFaceHeight * 2.4}px`,
                                        clipPath: `polygon(
                                            ${(50 - 2 * Distance * (Math.tan(180 / realCol * Math.PI / 180)) / (Math.cos(90 / realRow * Math.PI / 180)) * (Math.sin(180 / realRow * (row + 1) * Math.PI / 180)) / ContainerFaceWidth * 2.4 * 50)}% 0%,
                                            ${(50 + 2 * Distance * (Math.tan(180 / realCol * Math.PI / 180)) / (Math.cos(90 / realRow * Math.PI / 180)) * (Math.sin(180 / realRow * (row + 1) * Math.PI / 180)) / ContainerFaceWidth * 2.4 * 50)}% 0%,
                                            ${(50 + 2 * Distance * (Math.tan(180 / realCol * Math.PI / 180)) / (Math.cos(90 / realRow * Math.PI / 180)) * (Math.sin(180 / realRow * (row) * Math.PI / 180)) / ContainerFaceWidth * 2.4 * 50)}% 100%,
                                            ${(50 - 2 * Distance * (Math.tan(180 / realCol * Math.PI / 180)) / (Math.cos(90 / realRow * Math.PI / 180)) * (Math.sin(180 / realRow * (row) * Math.PI / 180)) / ContainerFaceWidth * 2.4 * 50)}% 100%
                                        )`,
                                    }}
                                ></div>}
                            </React.Fragment>
                        ))
                    ))}

                    {[...Array(realCol)].map((_, i) => (
                        <React.Fragment key={i}>
                            <div
                                className='wing'
                                style={{
                                    transform: `rotateZ(${i * 360 / realCol}deg) rotateX(-70deg) translateZ(-100px) translateY(-140px) rotateY(6deg)`
                                }}
                            ></div>
                            <div
                                className='stick long-stick'
                                style={{
                                    transform: `rotateZ(${i * 360 / realCol}deg) rotateX(-70deg) translateZ(-100px) translateY(-40px) rotateY(6deg)`
                                }}
                            ></div>
                            <div
                                className='stick short-stick-1'
                                style={{
                                    transform: `rotateZ(${(i * 2 + 1) / 2 * 360 / realCol}deg) rotateX(-70deg) translateY(-30px) translateZ(-100px)`
                                }}
                            ></div>
                            <div
                                className='stick short-stick-2'
                                style={{
                                    transform: `rotateZ(${(i * 2 + 1) / 2 * 360 / realCol}deg) rotateX(-70deg) translateY(30px) translateZ(-100px)`
                                }}
                            ></div>
                        </React.Fragment>
                    ))}

                    {/* <div className='line line-x'>X</div>
                    <div className='line line-x x-2'>X</div>
                    <div className='line line-y'>Y</div>
                    <div className='line line-y y-2'>Y</div>
                    <div className='line line-z'>Z</div>
                    <div className='line line-z z-2'>Z</div> */}
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
