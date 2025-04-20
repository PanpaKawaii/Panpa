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

export default function Object() {

    const [Count, setCount] = useState(0);
    const List = [
        <Crown />,
        <Card />,
        <Cube />,
        <Pyramid />,
        <Octahedron />,
        <Dodecahedron />,
        <Icosahedron />,
        <Sphere />,
    ];

    return (
        <div className='object-container'>
            {/* <div>Count: {Count}</div> */}
            <button className='btn' onClick={() => setCount(p => p - 1)}>LEFT</button>
            {List[((Count % List.length) + List.length) % List.length]}
            <button className='btn' onClick={() => setCount(p => p + 1)}>RIGHT</button>
        </div>
    );
}
