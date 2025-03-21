import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from "react";
import Earth from './Earth';
import Links from './LinkDot';

export default function Space() {
    return (
        <div className='sphere-container'
            style={{
                backgroundColor: '#333',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                padding: '0 auto',
            }}
        >

            <Canvas camera={{ position: [5, 5, 5] }}
                style={{
                    width: '800px',
                    height: '100vh',
                }}
            >

                <ambientLight intensity={0.9} />
                <directionalLight
                    position={[-5, 5 * Math.tan(-23.44 * Math.PI / 180), -5]}
                    intensity={3}
                    color={'#fff'}
                    castShadow
                />

                <Earth
                    style={{
                        boxShadow: '0 0 10px 10px #ffffff80'
                    }} />
                <Links />

                <OrbitControls minDistance={10} maxDistance={10} />
            </Canvas>
        </div>
    )
}
