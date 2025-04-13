import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './ListJapanese.css';

import Kanji from '../../assets/imageJAPANESE/Kanji.png';
import Verb from '../../assets/imageJAPANESE/Verb.png';

export default function ListJapanese() {

    const ListJapanese = [
        { name: 'Kanji', src: Kanji, link: '/japanese/kanji' },
        { name: 'Verb', src: Verb, link: '/japanese/verb' },
        { name: 'NoName', src: null, link: '/japanese' },
        { name: 'NoName', src: null, link: '/japanese' },
        { name: 'NoName', src: null, link: '/japanese' },
        { name: 'NoName', src: null, link: '/japanese' },
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
