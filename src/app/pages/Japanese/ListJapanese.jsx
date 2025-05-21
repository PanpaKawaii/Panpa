import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './ListJapanese.css';

import Kanji from '../../assets/imageJAPANESE/Kanji.png';
import Verb from '../../assets/imageJAPANESE/Verb.png';

export default function ListJapanese() {

    const ListJapanese = [
        { name: 'Kanji', src: Kanji, link: '/japanese/kanji' },
        { name: 'Verb', src: Verb, link: '/japanese/verb' },
        { name: 'Radical', src: null, link: '/japanese/radical' },
        { name: 'Grammar', src: null, link: '/japanese/grammar' },
        { name: 'Form', src: null, link: '/japanese/form' },
        { name: 'Rotate Card', src: null, link: '/japanese/rotatecard' },
        { name: 'Connect Card', src: null, link: '/japanese/connectcard' },
    ];

    return (
        <div className='listjapanese-container'>
            <div className='heading'>
                <h1>List Japanese</h1>
            </div>
            <div className='content'>
                <div className='japanese-row'>
                    {ListJapanese.map((japanese, index) => (
                        <div key={index} className='japanese-col'>
                            <Link to={`${japanese.link}`}>
                                <div className='card'>
                                    <img src={japanese.src} alt={japanese.name} />
                                    <div className='japanese-name'>{japanese.name}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <hr />
            <Outlet />
        </div>
    )
}
