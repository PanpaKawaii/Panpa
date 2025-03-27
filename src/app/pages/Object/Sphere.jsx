import React from 'react';
import './Sphere.css';

export default function Sphere() {

    const maxRow = 10;
    const maxCol = 12;
    const Distance = 200;
    const ContainerFaceWidth = Distance;
    const ContainerFaceHeight = 2 * Distance * Math.tan((90 / (maxRow)) * (Math.PI / 180));

    return (
        <>
            <div className='scene-sphere'>
                <div className='sphere'>
                    {[...Array(maxRow)].map((_, row) => (
                        [...Array(maxCol)].map((_, col) => (
                            <div
                                key={`${row}-${col}`}
                                className={`face row-${row + 1} col-${col + 1}`}
                                style={{
                                    background: '#ff000080',
                                    transform: `rotateZ(${360 / maxCol * (col + 1)}deg) rotateX(${-90 / maxRow + (row + 1) * 180 / maxRow}deg) translateZ(${Distance}px)`,
                                    width: `${ContainerFaceWidth}px`,
                                    height: `${ContainerFaceHeight}px`,
                                    clipPath: `polygon(
                                ${(50 - 2 * Distance * (Math.tan(180 / maxCol * Math.PI / 180)) / (Math.cos(90 / maxRow * Math.PI / 180)) * (Math.sin(180 / maxRow * (row + 1) * Math.PI / 180)) / ContainerFaceWidth * 50)}% 0%,
                                ${(50 + 2 * Distance * (Math.tan(180 / maxCol * Math.PI / 180)) / (Math.cos(90 / maxRow * Math.PI / 180)) * (Math.sin(180 / maxRow * (row + 1) * Math.PI / 180)) / ContainerFaceWidth * 50)}% 0%,
                                ${(50 + 2 * Distance * (Math.tan(180 / maxCol * Math.PI / 180)) / (Math.cos(90 / maxRow * Math.PI / 180)) * (Math.sin(180 / maxRow * (row) * Math.PI / 180)) / ContainerFaceWidth * 50)}% 100%,
                                ${(50 - 2 * Distance * (Math.tan(180 / maxCol * Math.PI / 180)) / (Math.cos(90 / maxRow * Math.PI / 180)) * (Math.sin(180 / maxRow * (row) * Math.PI / 180)) / ContainerFaceWidth * 50)}% 100%)`,
                                }}
                            >
                                {row + 1} - {col + 1}
                            </div>
                        ))
                    ))}
                    {/* <div style={{width: '100%', backgroundColor: '#dc3545', textAlign: 'center'}}>A</div> */}
                </div>
            </div>
        </>
    )
}
