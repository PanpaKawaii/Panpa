import { Text } from '@react-three/drei';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import COUNTRY from '../../assets/Country.json';

function LinkDot({ position, onClick, country, isClicked, rotation }) {

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
                isClicked ? 'red' : 'yellow'
            } />
            <Text
                position={[0, 0, 0.2]}
                fontSize={hovered ? 0.1 : 0.08}
                color='white'
                fontWeight='bold'
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

export default function Links(props) {

    console.log('Links rerender');

    const navigate = useNavigate();
    const [clickedCountry, setClickedCountry] = useState(null);
    const list = COUNTRY.list;
    const radius = props.radius;

    const handleClickCountry = (name, lat, lon) => {
        setClickedCountry(prev => name)
        navigate(`/space?search=${name.replace(' ', '%20')}&lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}`)
    }

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
                        onClick={() => handleClickCountry(city.name, city.coord.lat, city.coord.lon)}
                        country={city.name}
                        isClicked={clickedCountry === city.name}
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