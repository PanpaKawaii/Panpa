import { useEffect, useState } from 'react';
import CardBorder from './CardBorder';
import FlickerDots from './FlickerDots';
import SwipeLaser from './SwipeLaser';
import TypingText from './TypingText';

import './InterestingComponent.css';

export default function InterestingComponent() {

    const [Time, setTime] = useState(() => {
        const now = new Date().toLocaleTimeString().split(':');
        console.log('now', now);
        const hours = parseInt(now[0]);
        const minutes = parseInt(now[1]);
        const seconds = parseInt(now[2]);
        const sum = (hours * 3600 + minutes * 60 + seconds) * 6;
        console.log('sum', sum);
        return sum;
    });

    useEffect(() => {
        let Interval;
        Interval = setInterval(() => {
            setTime(Time + 6);
        }, 1000);
        return () => clearInterval(Interval);
    }, [Time]);
    console.log((new Date()).toLocaleTimeString());

    return (
        <div className='interestingcomponent-container'>
            <CardBorder />
            <FlickerDots />
            <SwipeLaser />
            <TypingText />

            <div className='container'>
                <div className='time'>{Time}</div>
                <div className='time'>{(Time % 518400 - (Time % 21600)) / 21600}:{(Time % 21600 - (Time % 360)) / 360}:{Time % 360 / 6}</div>
                <div className='clock'>
                    {[...Array(12)].map((_, i) => (
                        <label key={i} style={{ '--i': i + 1 }}><span>{i + 1}</span></label>
                    ))}
                    <div className='indicator'>
                        <div id='hand-hour' className='hand hour'
                            style={{ transform: `rotateZ(${Time / 720 - 90}deg) translateX(46.5px)` }}
                        ></div>
                        <div id='hand-minute' className='hand minute'
                            style={{ transform: `rotateZ(${Time / 60 - 90}deg) translateX(57.5px)` }}
                        ></div>
                        <div id='hand-second' className='hand second'
                            style={{ transform: `rotateZ(${Time - 90}deg) translateX(68.5px)` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
