import React, { useState } from 'react';
import './Shuttlecock.css';

export default function Shuttlecock() {

    const Pentagon = ({ fill }) => {
        const size = 40;
        const centerX = 50;
        const centerY = 50;

        const points = Array.from({ length: 5 }, (_, i) => {
            const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
            const x = centerX + size * Math.cos(angle);
            const y = centerY + size * Math.sin(angle);
            return `${x},${y}`;
        }).join(' ');

        return (
            <polygon points={points} fill={fill} stroke='#333' strokeWidth='1' />
        );
    };

    return (
        <>
            <div className='scene-shuttlecock'>
                <div className='shuttlecock'>
                    {[...Array(8)].map((_, i) => (
                        <React.Fragment key={i}>
                            <svg className='triangle' width='100' height='100'
                                style={{
                                    transform: `translateZ(-140px) rotateZ(${i * 360 / 8}deg) rotateX(30deg) translateZ(-80px)`
                                }}>
                                <polygon points='50,10 60,60 40,60' fill='#f39c12' stroke='#333' strokeWidth='2' />
                            </svg>
                            <svg className='triangle' width='100' height='100'
                                style={{
                                    transform: `translateZ(-120px) rotateZ(${i * 360 / 8}deg) rotateX(70deg) translateZ(-80px)`
                                }}>
                                <polygon points='40,0 60,0 80,50 20,50' fill='#f39c12' stroke='#333' strokeWidth='2' />
                            </svg>
                            <svg className='triangle' width='100' height='100'
                                style={{
                                    transform: `translateZ(-100px) rotateZ(${i * 360 / 8}deg) rotateX(90deg) translateZ(-60px)`
                                }}>
                                <polygon points='20,0 80,0 80,50 20,50' fill='#f39c12' stroke='#333' strokeWidth='2' />
                            </svg>
                        </React.Fragment>
                    ))}

                    {[...Array(16)].map((_, i) => (
                        <React.Fragment key={i}>
                            <svg className='sticks' width='10' height='300'
                                style={{
                                    // transform: `rotateZ(${i * 360 / 16}deg) translateX(80px) rotateY(${-70}deg)`
                                    transform: `rotateZ(${i * 360 / 16}deg) rotateX(-70deg) translateZ(-100px) translateY(-40px)`

                                }}>
                                <rect width='10' height='300' fill='#4caf50' stroke='#333' strokeWidth='2'
                                    className='stick'
                                />
                            </svg>
                            <svg className='sticks' width='40' height='10'
                                style={{
                                    transform: `rotateZ(${(i * 2 + 1) * 360 / 32}deg) rotateX(-70deg) translateY(-60px) translateZ(-100px)`
                                }}>
                                <rect width='40' height='10' fill='#4caf50' stroke='#333' strokeWidth='2'
                                    className='stick'
                                />
                            </svg>
                            <svg className='sticks' width='40' height='10'
                                style={{
                                    transform: `rotateZ(${(i * 2 + 1) * 360 / 32}deg) rotateX(-70deg) translateY(30px) translateZ(-100px)`
                                }}>
                                <rect width='40' height='10' fill='#4caf50' stroke='#333' strokeWidth='2'
                                    className='stick'
                                />
                            </svg>
                        </React.Fragment>
                    ))}

                    <div className='line line-x'>X</div>
                    <div className='line line-x x-2'>X</div>
                    <div className='line line-y'>Y</div>
                    <div className='line line-y y-2'>Y</div>
                    <div className='line line-z'>Z</div>
                    <div className='line line-z z-2'>Z</div>
                </div>
            </div>
        </>
    )
}
