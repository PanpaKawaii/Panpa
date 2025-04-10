import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import './JapaneseKanji.css';

import { Kanji, KanjiExample } from './list_japanese';

import ConnectCard from './ConnectCard'

export default function JapaneseKanji() {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('search') || '';
    const [searchQueryKanji, setSearchQueryKanji] = useState(query);

    const filteredKanji = Kanji.filter((kanji) =>
        // kanji.Id.toLowerCase().includes(searchQueryKanji.toLowerCase())
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



    const rotateCard = (index) => {
        const card = document.getElementById(`poker-card-${index}`);
        card.classList.toggle('rotate');
    }

    const closeAll = () => {
        const cards = document.getElementsByClassName('grid-card');
        Array.from(cards).forEach(card => card.classList.add('rotate'));
    }

    const openAll = () => {
        const cards = document.getElementsByClassName('grid-card');
        Array.from(cards).forEach(card => card.classList.remove('rotate'));
    }

    const handleEnterKanji = (e) => {
        e.preventDefault();
    }

    return (
        <div className='japanesekanji-container'>
            <div className='heading'>
                <h2>Japanese Kanji</h2>
            </div>

            <ConnectCard />

            <Form onSubmit={handleEnterKanji}>
                <Form.Group controlId='searchkanji' className='form-group'>
                    <Form.Control
                        type='text'
                        placeholder='日、ニチ、ひ、nichi、NHẬT、...'
                        value={searchQueryKanji}
                        onChange={(e) => setSearchQueryKanji(e.target.value)}
                    />
                </Form.Group>

                <div className='active-button'>
                    <Button type='reset' className='btn btn-reset' onClick={clearInput}>CLEAR</Button>
                    <Button className='btn' onClick={closeAll}>CLOSE ALL</Button>
                    <Button className='btn' onClick={openAll}>OPEN ALL</Button>
                </div>
            </Form>

            <div className='japanese-content'>
                <div className='japanese-row'>
                    {filteredKanji.filter(kanji => kanji.Id !== 'NoKanji').map((kanji, index) => (
                        <div key={kanji.Id}
                            className='japanese-col'>
                            <div id={`poker-card-${index}`}
                                onClick={() => rotateCard(index)}
                                className='grid-card'
                                style={{
                                    color: (
                                        kanji.SinoVietnamese === 'NoKanji' ||
                                        kanji.On === 'NoKanji' ||
                                        kanji.Kun === 'NoKanji' ||
                                        kanji.Romaji === 'NoKanji' ||
                                        !kanji.Romaji
                                    ) ? 'red' : 'black'
                                }}
                            >
                                <div className='face front'>
                                    <h1 className='japanese-font'><>{kanji.Id}</></h1>
                                    <h4>{kanji.SinoVietnamese}</h4>
                                    <p className='japanese-font'>On: {kanji.On}</p>
                                    <p className='japanese-font'>Kun: {kanji.Kun}</p>
                                    {/* <p className='japanese-font'>Romaji: {kanji.Romaji}</p> */}
                                </div>

                                <div className='face back'>
                                    <h3>{kanji.SinoVietnamese}</h3>
                                    {KanjiExample.filter(include => include.Word.includes(kanji.Id)).map((example, index) => (
                                        <div key={index}>
                                            <span className='japanese-font'>{example.Hiragana}</span> - <span>{example.Meaning}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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
                            <tr key={e}>
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
