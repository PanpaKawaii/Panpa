import React from 'react';
import { useNavigate } from 'react-router-dom';

import COUNTRY from '../../assets/Country.json';

function LinkDot({ position, onClick, name }) {
    return (
        <mesh position={position} onClick={onClick}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color={
                name === 'Socialist Republic of Vietnam' ?
                    'red'
                    :
                    (name === 'orange' ?
                        'red'
                        :
                        (name === 'white' ?
                            'red'
                            :
                            'red'
                        )
                    )
            } />
        </mesh>
    )
}

export default function Links() {

    const list = COUNTRY.list;

    const navigate = useNavigate();
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
                    />
                );
            })}
        </>
    );
}