import React from 'react';
import './JapaneseGrammar.css';

export default function JapaneseGrammar() {

    const Grammar = [{
        title: 'とか',
        formula: [
            '[N1]  + とか + [N2] + とか…',
            '[Vる]  + とか + [Vる] + とか…',
        ],
        example: [{
            japanese: 'やさいとかくだものとかをたくさんたべます。',
            vietnamese: '(Tôi ăn nhiều thứ như rau, trái cây...)',
        },
        {
            japanese: '旅行で、スキーをするとか、美味しいものを食べるとかしたいです。',
            vietnamese: '(Trong chuyến du lịch, tôi muốn làm những việc như trượt tuyết, ăn đồ ngon…)',
        }]
    }]

    return (
        <div className='japanesegrammar-container'>
            <div className='heading'>
                <h2>Japanese Grammar</h2>
            </div>

            <div className='japanese-content'>
                <div className='japanese-row'>
                    {Grammar.map((grammar, index) => (
                        <div key={grammar.title}
                            className='japanese-col'>
                            <div className='grid-card'>
                                <div className='face front'>
                                    <h1 className='japanese-font'>{grammar.title}</h1>
                                    <p className='japanese-font'>On: {grammar.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
