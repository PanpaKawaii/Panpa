import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './JapaneseKanji.css';

import { Kanji, KanjiExample } from './list_japanese';

import ConnectCard from './ConnectCard'

export default function JapaneseKanji({ ArrayProps }) {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('search') || '';
    const [searchQueryKanji, setSearchQueryKanji] = useState(query);

    const filteredKanji = (searchQueryKanji ? Kanji : ArrayProps).filter((kanji) =>
        Object.values(kanji).some(value => value.toLowerCase().includes(searchQueryKanji.toLowerCase()))
    );

    useEffect(() => {
        setSearchParams({ search: searchQueryKanji });
    }, [searchQueryKanji, setSearchParams]);

    const clearInput = () => {
        setSearchQueryKanji('');
        setSearchParams({ search: '' });
        document.getElementById('searchkanji').focus();
    }

    const handleEnterKanji = (e) => {
        e.preventDefault();
    }

    const [SelectedKanji, setSelectedKanji] = useState(null);

    return (
        <div className='japanesekanji-container'>
            <div className='heading'>
                <h2>Japanese Kanji</h2>
            </div>

            {SelectedKanji &&
                <div className='selected-kanji'>
                    <div className='kanji-id'>
                        <h1 className='japanese-font'>{SelectedKanji.Id}</h1>
                        <div className='sinovietnamese'>{SelectedKanji.SinoVietnamese}</div>
                        <div className='japanese-font'>On: {SelectedKanji.On}</div>
                        <div className='japanese-font'>Kun: {SelectedKanji.Kun}</div>
                    </div>
                    <div className='line'></div>
                    <div className='kanji-example'>
                        {KanjiExample.filter(kanji => kanji.Word.includes(SelectedKanji.Id)).map((example, slt) => (
                            <div key={slt} className='item'>
                                <div className='example-word'>{example.Word}</div>
                                <div className='example-hiragana'>{example.Hiragana}</div>
                                <div
                                    className='example-meaning'
                                    style={{
                                        color: (
                                            example.Word === 'NoKanjiExample' ||
                                            example.Hiragana === 'NoKanjiExample' ||
                                            example.Meaning === 'NoKanjiExample'
                                        ) && '#007bff'
                                    }}
                                >{example.Meaning}</div>
                            </div>
                        ))}
                    </div>
                </div>
            }

            <form onSubmit={handleEnterKanji}>
                <div id='searchkanji' className='form-group'>
                    <input
                        type='text'
                        placeholder='日、ニチ、ひ、nichi、NHẬT、...'
                        value={searchQueryKanji}
                        onChange={(e) => setSearchQueryKanji(e.target.value)}
                    ></input>
                </div>
                <button type='reset' className='btn btn-reset' onClick={clearInput}>CLEAR</button>
            </form>

            <div className='japanese-content'>
                <div className='japanese-row'>
                    {filteredKanji.filter(kanji => kanji.Id !== 'NoKanji').map((kanji, index) => (
                        <div key={kanji.Id}
                            className='japanese-col'
                            onClick={() => {
                                setSelectedKanji(kanji);
                                window.scrollTo(0, 500);
                            }}
                        >
                            <div
                                className='grid-card'
                                style={{
                                    color: (
                                        kanji.SinoVietnamese === 'NoKanji' ||
                                        kanji.On === 'NoKanji' ||
                                        kanji.Kun === 'NoKanji'
                                    ) ? 'red' : 'black'
                                }}
                            >
                                <h1 className='japanese-font'>{kanji.Id}</h1>
                                <div className='sinovietnamese'>{kanji.SinoVietnamese}</div>
                                <div className='japanese-font'>On: {kanji.On}</div>
                                <div className='japanese-font'>Kun: {kanji.Kun}</div>

                                {/* <div className='face back'>
                                    <h3>{kanji.SinoVietnamese}</h3>
                                    {KanjiExample.filter(include => include.Word.includes(kanji.Id)).map((example, index) => (
                                        <div key={index}>
                                            <span className='japanese-font'>{example.Hiragana}</span> - <span>{example.Meaning}</span>
                                        </div>
                                    ))}
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* <div>
                {Kanji.filter(kanji => kanji.Id !== 'NoKanji').map((kanji, index) => (
                    <div key={kanji.Id}>
                        <div
                            style={{
                                color: (
                                    kanji.SinoVietnamese === 'NoKanji' ||
                                    kanji.On === 'NoKanji' ||
                                    kanji.Kun === 'NoKanji'
                                ) ? 'red' : 'black'
                            }}
                        >
                            <div className='japanese-font'>{kanji.Id}</div>
                        </div>
                    </div>
                ))}
            </div> */}

            <div className='japanese-table-content'>
                <h2>Kanji Example</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Word</th>
                            <th>Hiragana</th>
                            <th>Meaning</th>
                        </tr>
                    </thead>
                    <tbody>
                        {KanjiExample.filter(kanji => kanji.Word !== 'NoKanjiExample').map((example, e) => (
                            <tr key={example.Word + example.Hiragana}>
                                <td>{example.Word}</td>
                                <td>{example.Hiragana}</td>
                                <td
                                    style={{
                                        color: (
                                            example.Word === 'NoKanjiExample' ||
                                            example.Hiragana === 'NoKanjiExample' ||
                                            example.Meaning === 'NoKanjiExample' ||
                                            example.Romaji === 'NoKanji' ||
                                            !example.Romaji
                                        ) ? 'red' : 'black'
                                    }}
                                >{example.Meaning}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
