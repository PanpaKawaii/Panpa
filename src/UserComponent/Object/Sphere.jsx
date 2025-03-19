import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import './Sphere.css';
import TestSphere1 from './TestSphere1';

export default function Sphere() {
    return (
        <div className='sphere-container'>
            <Canvas
                style={{
                    margin: '0 auto',
                    width: '80%',
                    height: '100vh',
                }}>

                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5 * Math.tan(-23.44 * Math.PI / 180), 0]} intensity={3} color={'#ffffff'} />

                <TestSphere1 />

                <OrbitControls minDistance={10} maxDistance={10} />
            </Canvas>
        </div>
    )
}
