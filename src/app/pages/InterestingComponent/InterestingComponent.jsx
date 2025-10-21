import CardBorder from './CardBorder';
import FlickerDots from './FlickerDots';
import SwipeLaser from './SwipeLaser';
import TypingText from './TypingText';

import './InterestingComponent.css';

export default function InterestingComponent() {
    return (
        <div className='interestingcomponent-container'>
            <CardBorder />
            <FlickerDots />
            <SwipeLaser />
            <TypingText />
        </div>
    )
}
