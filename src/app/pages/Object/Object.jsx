import React, { useState } from 'react';
import './Object.css';
import Card from './Card.jsx';
import Cube from './Cube.jsx';
import Pyramid from './Pyramid.jsx';
import Octahedron from './Octahedron.jsx';
import Dodecahedron from './Dodecahedron.jsx';
import Icosahedron from './Icosahedron.jsx';
import Sphere from './Sphere.jsx';
import Crown from './Crown.jsx';
import Space from './Space.jsx';

export default function Object() {

    const [Count, setCount] = useState(0);
    const [Position, setPosition] = useState([0, 0, 0]);
    const List = [
        <Card />,
        <Cube />,
        <Pyramid />,
        <Octahedron />,
        <Dodecahedron />,
        <Icosahedron />,
        <Sphere />,
        <Crown x={Position[0] * 10} y={Position[1] * 10} z={Position[2] * 10} />,
        <Space />,
    ];

    return (
        <div className='object-container'>
            <div
                className='content'
            // style={{
            //     transform: `rotateX(${Position[0] * 10}deg) rotateY(${Position[1] * 10}deg) rotateZ(${Position[2] * 10}deg)`,
            // }}
            >
                {List[((Count % List.length) + List.length) % List.length]}
            </div>

            <div className='slider-form'>
                <div className='button-box'>
                    <button className='btn' onClick={() => setCount(p => p - 1)}>LEFT</button>
                    <button className='btn' onClick={() => setCount(p => p + 1)}>RIGHT</button>
                </div>

                <label>
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
                </label>
            </div>
        </div>
    );
}
