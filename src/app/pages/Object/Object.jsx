import React from 'react';
import './Object.css';
import Card from './Card.jsx';
import Cube from './Cube.jsx';
import Pyramid from './Pyramid.jsx';
import Octahedron from './Octahedron.jsx';
import Dodecahedron from './Dodecahedron.jsx';
import Icosahedron from './Icosahedron.jsx';
import Sphere from './Sphere.jsx';

export default function Object() {

    return (
        <div className='object-container'>

            <Card />

            <Cube />

            <Pyramid />

            <Octahedron />

            <Dodecahedron />

            <Icosahedron />

            <Sphere />

        </div>
    )
}
