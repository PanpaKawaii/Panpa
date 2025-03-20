import React from 'react';
import { useNavigate } from 'react-router-dom';

function LinkDot({ position, onClick }) {
    return (
        <mesh position={position} onClick={onClick}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color='red' />
        </mesh>
    )
}

export default function Links() {
    const navigate = useNavigate();
    const radius = 5;
    const links = [
        { theta: Math.PI / 4, phi: Math.PI / 3, url: '/game' },
        { theta: Math.PI / 2, phi: Math.PI / 2, url: '/game' },
        { theta: (3 * Math.PI) / 4, phi: Math.PI, url: '/game' },
    ];

    return (
        <>
            {links.map((link, index) => {
                const x = radius * Math.sin(link.theta) * Math.cos(link.phi);
                const y = radius * Math.sin(link.theta) * Math.sin(link.phi);
                const z = radius * Math.cos(link.theta);

                return (
                    <LinkDot
                        key={index}
                        position={[x, y, z]}
                        onClick={() => navigate(link.url)}
                    />
                );
            })}
        </>
    );
}