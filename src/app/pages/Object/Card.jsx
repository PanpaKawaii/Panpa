import React from 'react';
import './Card.css';

export default function Card() {
    return (
        <>
            <div className='scene-card'>
                <div className='card'>
                    <div className='face front'>Front</div>
                    <div className='face back'>Back</div>
                </div>
            </div>
        </>
    )
}
