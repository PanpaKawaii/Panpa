import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import './JapaneseVerb.css';

import { Verb } from './list_japanese';

export default function JapaneseVerb() {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('search') || '';
    const group = searchParams.get('group') || '';
    const special = searchParams.get('special') || '';
    const [searchQueryVerb, setSearchQueryVerb] = useState(query);

    let filteredVerb = Verb.filter((verb) =>
        // verb.Hiragana.toLowerCase().includes(searchQueryVerb.toLowerCase())
        Object.values(verb).some(value => value.toLowerCase().includes(searchQueryVerb.toLowerCase()))
    );

    if (group) {
        filteredVerb = filteredVerb.filter((verb) => verb.Group === group);
    }

    if (special) {
        filteredVerb = filteredVerb.filter((verb) => verb.Special === special);
    }

    useEffect(() => {
        setSearchParams({ search: searchQueryVerb, group, special });
    }, [searchQueryVerb, group, special, setSearchParams]);

    const clearInput = () => {
        setSearchQueryVerb('');
        setSearchParams({ search: '', group: '', special: '' });
        document.getElementById('searchverb').focus();
    }

    const handleEnterVerb = (e) => {
        e.preventDefault();
    }

    const shuffleVerb = () => {
        const shuffledVerb = [...filteredVerb];
        for (let i = shuffledVerb.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledVerb[i], shuffledVerb[j]] = [shuffledVerb[j], shuffledVerb[i]];
        }
        return shuffledVerb;
    }
    const shuffledVerb = shuffleVerb();

    return (
        <div className='japaneseverb-container'>
            <div className='heading'>
                <h2>Japanese Verb</h2>
            </div>

            <Form onSubmit={handleEnterVerb}>
                <Form.Group controlId='searchverb' className='searchverb'>
                    <Form.Control
                        type='text'
                        placeholder='行きます、いきます、III、Đi、...'
                        value={searchQueryVerb}
                        onChange={(e) => setSearchQueryVerb(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='groupverb' className='groupverb'>
                    <Form.Control
                        as='select'
                        value={group}
                        onChange={(e) => setSearchParams({ search: searchQueryVerb, group: e.target.value, special: special })}
                    >
                        <option value=''>Select Group</option>
                        <option value='I'>Group I</option>
                        <option value='II'>Group II</option>
                        <option value='III'>Group III</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='specialverb' className='specialverb'>
                    <Form.Check
                        type='checkbox'
                        label='Special'
                        checked={special === 'true'}
                        onChange={(e) => setSearchParams({ search: searchQueryVerb, group: group, special: e.target.checked ? 'true' : '' })}
                    />
                </Form.Group>

                <div className='active-button'>
                    <Button type='reset' className='btn btn-reset' onClick={clearInput}>CLEAR</Button>
                </div>
            </Form>

            {/* <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 40px' }}>
                <div style={{ backgroundColor: '#28a74580', padding: '0 40px' }}>
                    {shuffledVerb.filter(verb => verb.Hiragana !== 'NoVerb').map((verb, index) => (
                        <div key={index}>
                            {verb.Hiragana}
                        </div>
                    ))}
                </div>
                <div style={{ backgroundColor: '#ffc10780', padding: '0 40px' }}>
                    {shuffledVerb.filter(verb => verb.Hiragana !== 'NoVerb').map((verb, index) => (
                        <div key={index}>
                            {verb.Kanji}
                        </div>
                    ))}
                </div>
                <div style={{ backgroundColor: '#dc354580', padding: '0 40px' }}>
                    {shuffledVerb.filter(verb => verb.Hiragana !== 'NoVerb').map((verb, index) => (
                        <div key={index}>
                            {verb.Meaning}
                        </div>
                    ))}
                </div>
                <div style={{ backgroundColor: '#007bff80', padding: '0 40px' }}>
                    {shuffledVerb.filter(verb => verb.Hiragana !== 'NoVerb').map((verb, index) => (
                        <div key={index}>
                            {verb.Group}
                        </div>
                    ))}
                </div>
            </div> */}

            <div className='japanese-content'>
                <div className='japanese-row'>
                    {filteredVerb.filter(verb => verb.Hiragana !== 'NoVerb').map((verb, index) => (
                        <div key={index} className='japanese-col'>
                            <div
                                className={`grid-card
                                    ${verb.Group === 'I' ? 'groupI' :
                                        verb.Group === 'II' ? 'groupII' :
                                            verb.Group === 'III' ? 'groupIII' : 'groupNONE'}`}
                            >
                                <div className='card-body'>
                                    <h3 className='japanese-font' style={{ backgroundColor: verb.Kanji === 'NoVerb' ? '#dc3545' : '' }}>
                                        {verb.Kanji.replace('ます', '')}<span className='masu'>ます</span><span className='_masu'>..</span>
                                    </h3>
                                    <h4 className='japanese-font'>
                                        {verb.Hiragana.replace('ます', '')}<span className='masu'>ます</span><span className='_masu'>..</span>
                                    </h4>
                                    <p>
                                        {verb.Special == 'true' && <i className='fa-solid fa-star'></i>}
                                        <span>
                                            <span style={{ fontFamily: 'none' }}>{verb.Group}</span> : {verb.Meaning}
                                        </span>
                                    </p>
                                    {/* <p>Romaji: {verb.Romaji}</p> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
