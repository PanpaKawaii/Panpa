import React from 'react';
import './JapaneseForm.css';

export default function JapaneseForm() {

    const Listing = [
        {
            title: 'COMMAND FORM',
            groups: [
                {
                    group: 'I',
                    formula: [
                        '_「い」ます => _「え」',
                    ],
                    example: [
                        'いきます => いけ',
                        'のみます => のめ',
                        'かいます => かえ',
                    ],
                },
                {
                    group: 'II',
                    formula: [
                        '_ます => _ろ',
                    ],
                    example: [
                        'たべます => たべろ',
                        'おきます => おきろ',
                    ],
                },
                {
                    group: 'III',
                    formula: [
                        'します => しろ',
                        'きます => こい',
                    ],
                    example: [
                        'します => しろ',
                        'もってきます => もってこい',
                    ],
                },
            ],
        },
    ];

    return (
        <div className='japaneseform-container'>
            <div className='heading'>
                <h2>Japanese Form</h2>
            </div>
            <div className='japanese-content'>
                <div className='japanese-row'>
                    {Listing.map((form) => (
                        <div key={form.title}
                            className='japanese-col'>
                            <div className='grid-card'>

                                <h4 className='japanese-font'>{form.title}</h4>
                                <table>
                                    <tbody>
                                        {form.groups.map((group, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className='group'>{group.group}</div>
                                                </td>
                                                <td>
                                                    {group.formula.map((formula, index) => (
                                                        <div key={index} className='formula'>{formula}</div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {group.example.map((example, index) => (
                                                        <div key={index} className='example'>{example}</div>
                                                    ))}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
