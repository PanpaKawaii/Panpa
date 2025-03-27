import React from 'react';
import './Pyramid.css';

export default function Pyramid() {
    return (
        <>
            <div className='scene-pyramid'>
                <div className='pyramid'>
                    <div className='face bottom'>Yellow</div>
                    <div className='face front'>Red</div>
                    <div className='face left'>Green</div>
                    <div className='face right'>Blue</div>
                </div>
            </div>
        </>
    )
}
