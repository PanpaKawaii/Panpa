import { useState } from 'react';

import Card from './Card.jsx';
import Coin from './Coin.jsx';
import Crown from './Crown.jsx';
import Cube from './Cube.jsx';
import Dodecahedron from './Dodecahedron.jsx';
import Icosahedron from './Icosahedron.jsx';
import Octahedron from './Octahedron.jsx';
import Pyramid from './Pyramid.jsx';
import Shuttlecock from './Shuttlecock.jsx';
import Space from './Space.jsx';
import Sphere from './Sphere.jsx';
import TestObject from './TestObject.jsx';

import SphereSVG from './SVG/Sphere.jsx';
import SoccerBall from './SoccerBall.jsx';

import './Object.css';

export default function Object() {

    const [Count, setCount] = useState(0);
    const List = [
        <Shuttlecock />,
        <SphereSVG />,

        <SoccerBall />,
        <Coin />,
        <Card />,
        <Cube />,
        <Pyramid />,
        <Octahedron />,
        <Dodecahedron />,
        <Icosahedron />,
        <Sphere />,
        <Crown />,
        <Space />,
        <TestObject />,
    ];

    return (
        <div className='object-container'>
            <div className='content'>
                {List[((Count % List.length) + List.length) % List.length]}
            </div>

            <div className='slider-form'>
                <div className='button-box'>
                    <button className='btn' onClick={() => setCount(p => p - 1)}>LEFT</button>
                    <button className='btn' onClick={() => setCount(p => p + 1)}>RIGHT</button>
                </div>

                {/* <label>
                    <div>X-axis: {Position[0] * 10}°</div>
                    <input type='range' name='Xaxis' min='-36' max='36' value={Position[0]} onChange={(e) => { setPosition([e.target.value, Position[1], Position[2]]) }} />
                </label>

                <label>
                    <div>Y-axis: {Position[1] * 10}°</div>
                    <input type='range' name='Yaxis' min='-36' max='36' value={Position[1]} onChange={(e) => { setPosition([Position[0], e.target.value, Position[2]]) }} />
                </label>

                <label>
                    <div>Z-axis: {Position[2] * 10}°</div>
                    <input type='range' name='Zaxis' min='-36' max='36' value={Position[2]} onChange={(e) => { setPosition([Position[0], Position[1], e.target.value]) }} />
                </label> */}
            </div>
        </div>
    );
}
