import { Text } from '@react-three/drei';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import COUNTRY from '../../assets/Country.json';

function LinkDot({ position, onClick, country, rotation }) {

    const [hovered, setHovered] = useState(false);

    return (
        <mesh
            position={position}
            onClick={onClick}
            rotation={rotation}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            cursor='pointer'
        >
            <sphereGeometry args={[hovered ? 0.05 : 0.03, 16, 16]} />
            <meshStandardMaterial color={
                country === 'Vietnam' ? 'red' :
                    (country === 'orange' ? 'red' :
                        (country === 'white' ? 'red' : 'yellow'))
            } />
            <Text
                position={[0, 0, 0.3]}
                fontSize={hovered ? 0.15 : 0.1}
                color='white'
                anchorX='center'
                anchorY='middle'
            >
                {/* FFFFFFFFFF */}
                {country}
                {/* FFFFFFFFFF */}
            </Text>
        </mesh>
    )
}

export default function Links() {

    const navigate = useNavigate();

    const list = COUNTRY.list;
    const radius = 5;

    return (
        <>
            {list.map((city, index) => {
                const x = radius * Math.cos(city.coord.lat * Math.PI / 180) * Math.sin((city.coord.lon + 90) * Math.PI / 180);
                const z = radius * Math.sin(city.coord.lat * Math.PI / 180);
                const y = radius * Math.cos(city.coord.lat * Math.PI / 180) * Math.cos((city.coord.lon + 90) * Math.PI / 180);

                return (
                    <LinkDot
                        key={index}
                        position={[x, z, y]}
                        onClick={() => navigate(city.url ? city.url : `/${city.name}`)}
                        country={city.name}
                        rotation={[
                            (0) * Math.PI / 180,
                            (city.coord.lon + 90) * Math.PI / 180,
                            (0) * Math.PI / 180,
                        ]}
                    />
                );
            })}
        </>
    );
}