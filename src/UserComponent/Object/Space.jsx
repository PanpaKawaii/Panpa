import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import Links from './LinkDot';
import Earth from './Earth';

export default function Space() {
    return (
        <div
            className='sphere-container'
            style={{
                backgroundColor: '#333',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                padding: '0 auto',
            }}>
            <Canvas
                style={{
                    width: '800px',
                    height: '100vh',
                }}>

                <ambientLight intensity={0.9} />
                <directionalLight
                    position={[5, 5 * Math.tan(0 * Math.PI / 180), 0]}
                    intensity={3}
                    color={'#fff'} />

                <Earth />

                <Links />

                <OrbitControls minDistance={10} maxDistance={10} />
            </Canvas>
        </div>
    )
}
