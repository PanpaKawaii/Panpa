import React from 'react';
import './Object.css';
import Cube from './Cube.jsx'
import Dodecahedron from './Dodecahedron.jsx'
import Icosahedron from './Icosahedron.jsx'
import Sphere from './Sphere.jsx'

export default function Object() {

    return (
        <div className='object-container'>
            <div className='scene-card'>
                <div className='card'>
                    <div className='face front'>Mặt Trước</div>
                    <div className='face back'>Mặt Sau</div>
                </div>
            </div>

            <Cube />

            <div className='scene-pyramid'>
                <div className='pyramid'>
                    <div className='face bottom'>Yellow</div>
                    <div className='face front'>Red</div>
                    <div className='face left'>Green</div>
                    <div className='face right'>Blue</div>
                </div>
            </div>

            <div className='scene-octahedron'>
                <div className='octahedron'>
                    <div className='face f1'>Face1</div>
                    <div className='face f2'>Face2</div>
                    <div className='face f3'>Face3</div>
                    <div className='face f4'>Face4</div>
                    <div className='face f5'>Face5</div>
                    <div className='face f6'>Face6</div>
                    <div className='face f7'>Face7</div>
                    <div className='face f8'>Face8</div>
                    <div className='floor fl1'>Root1</div>
                    <div className='floor fl2'>Root2</div>
                    <div className='floor fl3'>Root3</div>
                </div>
            </div>

            {/* <Dodecahedron /> */}

            {/* <Icosahedron /> */}

            {/* <Sphere /> */}
        </div>
    )
}
