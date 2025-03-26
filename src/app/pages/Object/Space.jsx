import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import Earth from './Earth';
import Links from './LinkDot';

export default function Space() {

    const radius = 5;

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                padding: '0 auto',
                backgroundColor: '#333'
            }}
        >
            <div style={{
                position: 'absolute',
                width: '705px',
                height: '705px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                boxShadow: '0 0 80px 30px #007bff70',
            }}>
            </div>
            <div style={{
                position: 'absolute',
                width: '710px',
                height: '710px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                boxShadow: '0 0 30px 3px #ffffff',
            }}>
            </div>
            {/* Change to your location */}
            <Canvas
                camera={{
                    position: [
                        radius * Math.cos((107) * Math.PI / 180),
                        radius * Math.tan((17) * Math.PI / 180),
                        radius * Math.sin((107 + 180) * Math.PI / 180),
                    ]
                }}
                style={{
                    width: '800px',
                    height: '100vh',
                }}
            >

                <ambientLight intensity={0.9} />
                <directionalLight
                    position={[-radius, radius * Math.tan(-23.44 * Math.PI / 180), -radius]}
                    intensity={3}
                    color={'#fff'}
                    castShadow
                />

                <Earth radius={radius} />
                <Links radius={radius} />

                <OrbitControls
                    minDistance={10}
                    maxDistance={10}
                    enablePan={false}
                />
            </Canvas>
        </div>
    )
}
