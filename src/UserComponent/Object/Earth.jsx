import { useLoader } from '@react-three/fiber';
import React from 'react';
import { TextureLoader } from 'three';
import DayTime from '../../assets/2k_earth_daymap.jpg';
import NightTime from '../../assets/2k_earth_nightmap.jpg';

export default function Earth() {

    const dayTexture = useLoader(TextureLoader, DayTime);
    const nightTexture = useLoader(TextureLoader, NightTime);

    return (
        <mesh>
            <sphereGeometry args={[5, 32, 32]} />
            <meshStandardMaterial
                map={dayTexture}
                // alphaMap={nightTexture}
                transparent={true}
                opacity={20}
            />
        </mesh>
    );
}
