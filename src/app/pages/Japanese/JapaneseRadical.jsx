import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './JapaneseRadical.css';

import { Radical } from './list_japanese';

export default function JapaneseRadical({ ArrayProps }) {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('search') || '';
    const [searchQueryRadical, setSearchQueryRadical] = useState(query);

    const filteredRadical = (searchQueryRadical ? Radical : ArrayProps).filter((radical) =>
        Object.values(radical).some(value =>
            value.toLowerCase().includes(searchQueryRadical.toLowerCase())
        )
    );

    useEffect(() => {
        setSearchParams({ search: searchQueryRadical });
    }, [searchQueryRadical, setSearchParams]);

    const clearInput = () => {
        setSearchQueryRadical('');
        setSearchParams({ search: '' });
        document.getElementById('searchradical').focus();
    }

    const handleEnterRadical = (e) => {
        e.preventDefault();
    }

    return (
        <div className='japaneseradical-container'>
            <div className='heading'>
                <h2>Japanese Radical</h2>
            </div>

            <form onSubmit={handleEnterRadical}>
                <div id='searchradical' className='form-group'>
                    <input
                        type='text'
                        placeholder='日、ニチ、ひ、nichi、NHẬT、...'
                        value={searchQueryRadical}
                        onChange={(e) => setSearchQueryRadical(e.target.value)}
                    ></input>
                </div>
                <button type='reset' className='btn btn-reset' onClick={clearInput}>CLEAR</button>
            </form>

            <div className='japanese-content'>
                <div className='japanese-row'>
                    {filteredRadical.filter(radical => radical.Radical !== 'NoRadical').map((radical) => (
                        <div key={radical.Radical}
                            className='japanese-col'
                        >
                            <div
                                className='grid-card'
                                style={{
                                    color: (
                                        radical.SinoVietnamese === 'NoRadical' ||
                                        radical.On === 'NoRadical' ||
                                        radical.Kun === 'NoRadical'
                                    ) ? 'red' : 'black'
                                }}
                            >
                                <h1 className='japanese-font'>{radical.Radical}</h1>
                                <div className='sinovietnamese'>{radical.SinoVietnamese}</div>
                                <div>{radical.Meaning}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
