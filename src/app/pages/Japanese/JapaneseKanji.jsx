import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './JapaneseKanji.css';

import { Kanji, KanjiExample } from './list_japanese';

export default function JapaneseKanji({ ArrayProps }) {

    const Hiragana = [
        'あ', 'い', 'う', 'え', 'お',   // a, i, u, e, o
        'か', 'き', 'く', 'け', 'こ',   // ka, ki, ku, ke, ko
        'さ', 'し', 'す', 'せ', 'そ',   // sa, shi, su, se, so
        'た', 'ち', 'つ', 'て', 'と',   // ta, chi, tsu, te, to
        'な', 'に', 'ぬ', 'ね', 'の',   // na, ni, nu, ne, no
        'は', 'ひ', 'ふ', 'へ', 'ほ',   // ha, hi, fu, he, ho
        'ま', 'み', 'む', 'め', 'も',   // ma, mi, mu, me, mo
        'や', 'ゆ', 'よ',               // ya, yu, yo
        'ら', 'り', 'る', 'れ', 'ろ',   // ra, ri, ru, re, ro
        'わ', 'を',                     // wa, (w)o
        'ん'                            // n
    ];

    const HiraganaAndKatakanaToRomaji = (input) => {
        const map = {
            'キャ': 'kya', 'キュ': 'kyu', 'キョ': 'kyo',
            'ギャ': 'gya', 'ギュ': 'gyu', 'ギョ': 'gyo',
            'シャ': 'sha', 'シュ': 'shu', 'ショ': 'sho',
            'ジャ': 'ja', 'ジュ': 'ju', 'ジョ': 'jo',
            'チャ': 'cha', 'チュ': 'chu', 'チョ': 'cho',
            'ヂャ': 'ja', 'ヂュ': 'ju', 'ヂョ': 'jo',
            'ニャ': 'nya', 'ニュ': 'nyu', 'ニョ': 'nyo',
            'ヒャ': 'hya', 'ヒュ': 'hyu', 'ヒョ': 'hyo',
            'ビャ': 'bya', 'ビュ': 'byu', 'ビョ': 'byo',
            'ピャ': 'pya', 'ピュ': 'pyu', 'ピョ': 'pyo',
            'ミャ': 'mya', 'ミュ': 'myu', 'ミョ': 'myo',
            'リャ': 'rya', 'リュ': 'ryu', 'リョ': 'ryo',

            'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
            'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
            'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
            'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
            'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
            'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
            'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
            'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
            'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
            'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n',
            'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
            'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
            'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
            'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
            'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
            'ー': '-',

            'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
            'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
            'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
            'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
            'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
            'ぢゃ': 'ja', 'ぢゅ': 'ju', 'ぢょ': 'jo',
            'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
            'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
            'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
            'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
            'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
            'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',

            'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
            'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
            'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
            'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
            'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
            'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
            'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
            'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
            'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
            'わ': 'wa', 'を': 'wo', 'ん': 'n',
            'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
            'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
            'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
            'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
            'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',

            '、': ', ',
        };
        let romaji = '';
        let i = 0;
        while (i < input.length) {
            const twoChar = input.slice(i, i + 2);
            if (map[twoChar]) {
                romaji += map[twoChar];
                i += 2;
            } else if (input[i] === 'ッ' || input[i] === 'っ') {
                const nextChar = input.slice(i + 1, i + 3);
                let nextRomaji = map[nextChar] || map[input[i + 1]] || '';
                if (nextRomaji.length > 0) {
                    romaji += nextRomaji[0];
                } else {
                    romaji += 'tsu';
                }
                i++;
            } else {
                romaji += map[input[i]] || input[i];
                i++;
            }
        }
        return romaji;
    }

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('search') || '';
    const [searchQueryKanji, setSearchQueryKanji] = useState(query);

    const filteredKanji = (searchQueryKanji ? Kanji : ArrayProps).filter((kanji) =>
        Object.values(kanji).some(value =>
            value.toLowerCase().includes(searchQueryKanji.toLowerCase()) ||
            HiraganaAndKatakanaToRomaji(value).toLowerCase().includes(searchQueryKanji.toLowerCase())
        )
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
                                <div className='example-word japanese-font'>{example.Word}</div>
                                <div className='example-hiragana japanese-font'>{example.Hiragana}</div>
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
                    {filteredKanji.filter(kanji => kanji.Id !== 'NoKanji').map((kanji) => (
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
                                {/* <div className='japanese-font'>On: {HiraganaAndKatakanaToRomaji(kanji.On)}</div> */}
                                <div className='japanese-font'>On: {kanji.On}</div>
                                {/* <div className='japanese-font'>Kun: {HiraganaAndKatakanaToRomaji(kanji.Kun)}</div> */}
                                <div className='japanese-font'>Kun: {kanji.Kun}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}
            >
                {Kanji.filter(kanji => kanji.Id !== 'NoKanji').map((kanji) => (
                    <div
                        key={kanji.Id}
                        className='japanese-font'
                        style={{
                            color: (
                                kanji.SinoVietnamese === 'NoKanji' ||
                                kanji.On === 'NoKanji' ||
                                kanji.Kun === 'NoKanji'
                            ) ? 'red' : 'black'
                        }}
                    >
                        {kanji.Id}
                    </div>
                ))}
            </div>

            <div>
                <h3>Wrong Katakana</h3>

            </div>

            {/* <div className='japanese-table-content'>
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
                        {KanjiExample.filter(kanji => kanji.Word !== 'NoKanjiExample').map((example) => (
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
            </div> */}
        </div>
    )
}
