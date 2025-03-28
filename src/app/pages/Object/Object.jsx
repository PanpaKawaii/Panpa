import React, { useState } from 'react';
import './Object.css';
import Card from './Card.jsx';
import Cube from './Cube.jsx';
import Pyramid from './Pyramid.jsx';
import Octahedron from './Octahedron.jsx';
import Dodecahedron from './Dodecahedron.jsx';
import Icosahedron from './Icosahedron.jsx';
import Sphere from './Sphere.jsx';

export default function Object() {

    const [Count, setCount] = useState(0);

    return (
        <div className='object-container'>

            <button onClick={() => setCount(p => p + 1)}>LEFT</button>
            {
                Count % 7 === 0 ? <Card /> :
                    Count % 7 === 1 ? <Cube /> :
                        Count % 7 === 2 ? <Pyramid /> :
                            Count % 7 === 3 ? <Octahedron /> :
                                Count % 7 === 4 ? <Dodecahedron /> :
                                    Count % 7 === 5 ? <Icosahedron /> :
                                        Count % 7 === 6 ? <Sphere /> : <></>
            }
            <button onClick={() => setCount(p => p + 6)}>RIGHT</button>

        </div>
    )
}
