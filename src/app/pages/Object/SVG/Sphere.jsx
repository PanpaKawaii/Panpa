import React, { useState } from 'react';
import './Sphere.css';

export default function Sphere() {

    const [maxRow, setMaxRow] = useState(6);
    const [maxCol, setMaxCol] = useState(8);
    const Distance = 200;
    const ContainerFaceWidth = 100;
    const ContainerFaceHeight = 100 * 4 * Math.tan((90 / (maxRow)) * (Math.PI / 180));

    return (
        <>
            <div className='scene-sphere-svg'>
                <div className='sphere-svg'>
                    {[...Array(maxRow)].map((_, row) => (
                        [...Array(maxCol)].map((_, col) => (
                            <React.Fragment key={`${row}-${col}`}>
                                <svg width={ContainerFaceWidth * 2} height={ContainerFaceHeight} viewBox='0 0 100 100'
                                    className='face'
                                    style={{
                                        transform: `rotateZ(${360 / maxCol * (col + 1)}deg) rotateX(${-90 / maxRow + (row + 1) * 180 / maxRow}deg) translateZ(${Distance}px)`,
                                    }}
                                >
                                    <polygon
                                        fill='#cccccc'
                                        points={`${(50 - 2 * Distance * (Math.tan(180 / maxCol * Math.PI / 180)) / (Math.cos(90 / maxRow * Math.PI / 180)) * (Math.sin(180 / maxRow * (row + 1) * Math.PI / 180)) / ContainerFaceWidth * 50)}, 0
                                            ${(50 + 2 * Distance * (Math.tan(180 / maxCol * Math.PI / 180)) / (Math.cos(90 / maxRow * Math.PI / 180)) * (Math.sin(180 / maxRow * (row + 1) * Math.PI / 180)) / ContainerFaceWidth * 50)}, 0
                                            ${(50 + 2 * Distance * (Math.tan(180 / maxCol * Math.PI / 180)) / (Math.cos(90 / maxRow * Math.PI / 180)) * (Math.sin(180 / maxRow * (row) * Math.PI / 180)) / ContainerFaceWidth * 50)}, 100
                                            ${(50 - 2 * Distance * (Math.tan(180 / maxCol * Math.PI / 180)) / (Math.cos(90 / maxRow * Math.PI / 180)) * (Math.sin(180 / maxRow * (row) * Math.PI / 180)) / ContainerFaceWidth * 50)}, 100`}
                                    />
                                </svg>
                            </React.Fragment>
                        ))
                    ))}
                </div>
            </div >
            <div className='button-box'>
                <div className='item'>
                    <button className='btn' onClick={() => setMaxRow(p => p + 1)}>UP ROW {maxRow}</button>
                    <button className='btn' onClick={() => { if (maxRow > 2) setMaxRow(p => p - 1) }}>DOWN ROW {maxRow}</button>
                </div>
                <div className='item'>
                    <button className='btn' onClick={() => setMaxCol(p => p + 1)}>UP COL {maxCol}</button>
                    <button className='btn' onClick={() => { if (maxCol > 3) setMaxCol(p => p - 1) }}>DOWN COL {maxCol}</button>
                </div>
            </div>
        </>
    )
}
