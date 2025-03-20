import { useLoader } from '@react-three/fiber';
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader } from 'three';
import { Sphere, MeshWobbleMaterial } from "@react-three/drei";
import DayTime from '../../assets/2k_earth_daymap.jpg';
import NightTime from '../../assets/2k_earth_nightmap.jpg';

export default function Earth() {

    const dayTexture = useLoader(TextureLoader, DayTime);
    const nightTexture = useLoader(TextureLoader, NightTime);

    return (
        <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial
                map={dayTexture}
                // alphaMap={nightTexture}
                bumpMap={nightTexture}
                bumpScale={0.05}
                transparent={true}
                opacity={20}
                speed={0.5}
            />
        </mesh>
    );
}

// export function RotatingSphere() {

//     const sphereRef = useRef();

//     const dayTexture = useLoader(TextureLoader, DayTime);
//     const nightTexture = useLoader(TextureLoader, NightTime);

//     useFrame(() => {
//         if (sphereRef.current) {
//             sphereRef.current.rotation.y += 0.01;
//         }
//     });

//     return (
//         <Sphere ref={sphereRef} args={[2, 64, 64]}>
//             <MeshWobbleMaterial attach="material" map={dayTexture} speed={0.5} />
//         </Sphere>
//     );
// }
