import React, { useEffect, useState } from 'react'
import { Kanji, Sino } from './sample_kanji';
import './ConnectCard.css';

export default function ConnectCard() {

    const [Mix, setMix] = useState([]);
    const [Pick, setPick] = useState('');
    const [Index, setIndex] = useState(null);

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        setMix([...Kanji, ...Sino].sort(() => Math.random() - 0.5));
    }, [])

    const pickcard = async (Chosen, index) => {
        const card = document.getElementById(`poker-card-${index}`);
        card.classList.add('picked');

        if (Pick == '') {
            setPick(Chosen);
            setIndex(index);
        }

        await sleep(300);
        if (Chosen.Id === Pick.SinoVietnamese || Chosen.SinoVietnamese === Pick.Id) setcolor(index);
        else console.log("False");

        if (Pick !== '') {
            const cards = document.getElementsByClassName('grid-card');
            Array.from(cards).forEach(card => card.classList.remove('picked'));
            setPick(p => '');
        }
    }

    const setcolor = (index) => {
        const card1 = document.getElementById(`poker-card-${index}`);
        card1.classList.add('correct');
        const card2 = document.getElementById(`poker-card-${Index}`);
        card2.classList.add('correct');
    }


    return (
        <div className='connectcard-container'>
            <div className='heading'>
                <h3>Connect Kanji</h3>
            </div>

            <div className='japanese-content'>
                <div className='japanese-row'>
                    {Mix.filter(kanji => kanji.Id !== 'NoKanji').map((kanji, index) => (
                        <div key={kanji.Id}
                            className='japanese-col'>
                            <div id={`poker-card-${index}`}
                                onClick={() => pickcard(kanji, index)}
                                className='grid-card'
                            >
                                {Kanji.some(k => k.Id === kanji.Id) ?
                                    <>
                                        <h1 className='japanese-font'>{kanji.Id}</h1>
                                        {/* <h2 className='romaji-font'>{kanji.SinoVietnamese}</h2> */}
                                    </>
                                    :
                                    <>
                                        <h2 className='romaji-font'>{kanji.Id}</h2>
                                        {/* <h2 className='romaji-font'>{kanji.SinoVietnamese}</h2> */}
                                    </>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
