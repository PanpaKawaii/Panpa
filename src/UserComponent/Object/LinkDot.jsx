import React from 'react';
import { useNavigate } from 'react-router-dom';

import CITY from '../../assets/City.json';

function LinkDot({ position, onClick, country }) {
    return (
        <mesh position={position} onClick={onClick}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color={
                country === 'Socialist Republic of Vietnam' ?
                    'red'
                    :
                    (country === 'orange' ?
                        'red'
                        :
                        (country === 'white' ?
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

    const listcities = CITY.list;

    const navigate = useNavigate();
    const radius = 5;

    return (
        <>
            {listcities.map((city, index) => {
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