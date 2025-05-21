import React from 'react';
import './JapaneseGrammar.css';

export default function JapaneseGrammar() {

    const Grammar = [
        {
            //toka
            title: 'とか',
            formula: [
                '[N1] + とか + [N2] + とか...',
                '[Vる] + とか + [Vる] + とか...',
            ],
            example: [
                {
                    japanese: 'やさいとかくだものとかをたくさんたべます。',
                    vietnamese: '(Tôi ăn nhiều thứ như rau, trái cây...)',
                },
                {
                    japanese: '旅行で、スキーをするとか、美味しいものを食べるとかしたいです。',
                    vietnamese: '(Trong chuyến du lịch, tôi muốn làm những việc như trượt tuyết, ăn đồ ngon...)',
                },
            ],
        },
        {
            //shika, dake
            title: 'しか、だけ',
            formula: [
                '[N] + しか + (Vません)',
                '[N] + だけ',
            ],
            example: [
                {
                    japanese: '冷蔵庫にはビールが一本しかないです。',
                    vietnamese: '(Trong tủ lạnh chỉ có 1 lon bia.)',
                },
                {
                    japanese: '朝はコーヒーしか飲まなかった。',
                    vietnamese: '(Buổi sáng tôi chỉ uống cà phê thôi.)',
                },
                {
                    japanese: 'このクラスはベトナム人学生だけです。',
                    vietnamese: '(Lớp học này chỉ toàn học sinh Việt Nam.)',
                },
                {
                    japanese: '野菜だけ食べます。',
                    vietnamese: '(Tôi chỉ ăn rau thôi.)',
                },
            ],
        },
        // Tôn kính ngữ dùng với bị động
        // Tôn kính ngữ お V bỏ masu になり　ます。
        // Tôn kính ngữ お V bỏ masu ください。
    ];

    return (
        <div className='japanesegrammar-container'>
            <div className='heading'>
                <h2>Japanese Grammar</h2>
            </div>
            <div className='japanese-content'>
                <div className='japanese-row'>
                    {Grammar.map((grammar) => (
                        <div key={grammar.title}
                            className='japanese-col'>
                            <div className='grid-card'>

                                <h4 className='japanese-font'>{grammar.title}</h4>

                                {grammar.formula.map((formula, index) => (
                                    <div key={index} className='formula'>
                                        {formula}
                                    </div>
                                ))}

                                {grammar.example.map((example, index) => (
                                    <div key={index} className='example'>
                                        <div>{example.japanese}</div>
                                        <div>{example.vietnamese}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
