import { useLoader } from '@react-three/fiber';
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader } from 'three';
import { Sphere, MeshWobbleMaterial } from "@react-three/drei";
import DayTime from '../../assets/2k_earth_daymap.jpg';
import NightTime from '../../assets/2k_earth_nightmap.jpg';
import Cloud from '../../assets/200-2001465_earth-clouds-2048-earth-clouds-texture-png.png';

export default function Earth() {

    const sphereRef = useRef();
    useFrame(() => {
        if (sphereRef.current) {
            sphereRef.current.rotation.y += 0.001;
        }
    });

    const dayTexture = useLoader(TextureLoader, DayTime);
    const nightTexture = useLoader(TextureLoader, NightTime);
    const cloudTexture = useLoader(TextureLoader, Cloud);

    return (
        <>
            <Sphere args={[5, 64, 64]}>
                <meshStandardMaterial
                    attach='material'
                    map={dayTexture}
                    transparent={true}
                    opacity={1}
                    speed={0.5}
                />
            </Sphere>

            <Sphere position={[0, 0, 0]} args={[5, 64, 64]}>
                <meshStandardMaterial
                    attach='material'
                    map={nightTexture}
                    transparent={true}
                    opacity={0.3}
                    speed={0.5}
                />
            </Sphere>

            <Sphere ref={sphereRef} args={[5.1, 64, 64]}>
                <meshStandardMaterial
                    attach='material'
                    map={cloudTexture}
                    transparent={true}
                    opacity={0.5}
                    speed={0.5}
                />
            </Sphere>

            {/* <mesh receiveShadow>
                <sphereGeometry args={[5, 64, 64]} />
                <meshStandardMaterial
                    attach='material'
                    map={dayTexture}
                    // alphaMap={nightTexture}
                    // envMapIntensity={1}
                    // envMap={nightTexture}
                    transparent={true}
                    opacity={1}
                    speed={0.5}
                />
            </mesh> */}
        </>
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
