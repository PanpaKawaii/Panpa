import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import './JapaneseVerb.css';

import { Verb } from './list_japanese';

export default function JapaneseVerb() {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('search') || '';
    const group = searchParams.get('group') || '';
    const [searchQueryVerb, setSearchQueryVerb] = useState(query);

    let filteredVerb = Verb.filter((verb) =>
        // verb.Hiragana.toLowerCase().includes(searchQueryVerb.toLowerCase())
        Object.values(verb).some(value => value.toLowerCase().includes(searchQueryVerb.toLowerCase()))
    );

    if (group) {
        filteredVerb = filteredVerb.filter((verb) => verb.Group === group);
    }

    useEffect(() => {
        setSearchParams({ search: searchQueryVerb, group });
    }, [searchQueryVerb, group, setSearchParams]);

    const clearInput = () => {
        setSearchQueryVerb('');
        setSearchParams({ search: '', group: '' });
        document.getElementById('searchverb').focus();
    }

    const handleEnterVerb = (e) => {
        e.preventDefault();
    }

    return (
        <div className='japaneseverb-container'>
            <div className='header'>
                <h2>Japanese Verb</h2>
            </div>

            <Form onSubmit={handleEnterVerb}>
                <Form.Group controlId='searchverb' className='searchverb'>
                    <Form.Control
                        type='text'
                        placeholder='いきます、III、Đi、...'
                        value={searchQueryVerb}
                        onChange={(e) => setSearchQueryVerb(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='groupverb' className='groupverb'>
                    <Form.Control
                        as='select'
                        value={group}
                        onChange={(e) => setSearchParams({ search: searchQueryVerb, group: e.target.value })}
                    >
                        <option value=''>Select Group</option>
                        <option value='I'>Group I</option>
                        <option value='II'>Group II</option>
                        <option value='III'>Group III</option>
                    </Form.Control>
                </Form.Group>

                <div className='active-button'>
                    <Button type='reset' className='btn btn-reset' onClick={clearInput}>CLEAR</Button>
                </div>
            </Form>

            <div>
                {filteredVerb.filter(verb => verb.Hiragana !== 'NoVerb').map((verb, index) => (
                    <div key={index}>
                        {verb.Hiragana}
                        {verb.Kanji}
                        {verb.Meaning}
                        {verb.Group}
                    </div>
                ))}
            </div>

            <div className='japanese-content'>
                <Row className='japanese-row'>
                    {filteredVerb.filter(verb => verb.Hiragana !== 'NoVerb').map((verb, index) => (
                        <Col key={index} xs={6} sm={6} md={6} lg={4} xl={3} xxl={3} className='japanese-col'>
                            {/* <Col key={verb.Kanji} xs={6} sm={6} md={6} lg={4} xl={3} xxl={3} className='japanese-col'> */}
                            <div
                                className='grid-card'
                                style={{
                                    backgroundColor:
                                        verb.Group === 'I' ?
                                            '#fdd9e5'
                                            :
                                            (verb.Group === 'II' ?
                                                '#f99dbc'
                                                :
                                                '#f86aa1'
                                            )
                                }}
                            >
                                <div className='card-body'>
                                    <h3 className='japanese-font' style={{ backgroundColor: verb.Kanji === 'NoVerb' ? '#dc3545' : '' }}>{verb.Kanji}</h3>
                                    <h4 className='japanese-font'>{verb.Hiragana}</h4>
                                    <p>Group: {verb.Group}</p>
                                    <p>Meaning: {verb.Meaning}</p>
                                    <p className='japanese-font'>Romaji: {verb.Romaji}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}
