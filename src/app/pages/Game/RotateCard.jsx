import React from 'react';
import './RotateCard.css';

import { Kanji } from '../Japanese/list_japanese';

export default function RotateCard() {

    const rotateCard = (index) => {
        const card = document.getElementById(`poker-card-${index}`);
        card.classList.toggle('rotate');
    }

    const openAll = () => {
        const cards = document.getElementsByClassName('grid-card');
        Array.from(cards).forEach(card => card.classList.remove('rotate'));
    }

    const closeAll = () => {
        const cards = document.getElementsByClassName('grid-card');
        Array.from(cards).forEach(card => card.classList.add('rotate'));
    }

    return (
        <div className='rotatecard-container'>
            <div className='heading'>
                <h2>Rotate Card</h2>
            </div>

            <div className='active-button'>
                <button className='btn' onClick={openAll}>FACE ALL</button>
                <button className='btn' onClick={closeAll}>BACK ALL</button>
            </div>

            <div className='rotatecard-content'>
                <div className='rotatecard-row'>
                    {Kanji.filter(kanji => kanji.Id !== 'NoKanji').map((kanji, index) => (
                        <div key={kanji.Id}
                            className='rotatecard-col'>
                            <div id={`poker-card-${index}`}
                                onClick={() => rotateCard(index)}
                                className='grid-card'
                                style={{
                                    color: (
                                        kanji.SinoVietnamese === 'NoKanji' ||
                                        kanji.On === 'NoKanji' ||
                                        kanji.Kun === 'NoKanji'
                                    ) ? 'red' : 'black'
                                }}
                            >
                                <div className='face front japanese-font'>
                                    <div className='content front-content'>{kanji.Id}</div>
                                </div>

                                <div className='face back'>
                                    <div className='content back-content'>{kanji.SinoVietnamese}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
