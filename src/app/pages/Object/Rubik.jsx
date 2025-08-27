import React, { useState } from 'react';
import './Rubik.css';

export default function Rubik() {
    console.log('Rubik Rerender');

    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
    const handleChangeRotation = (axis, value) => {
        setRotation(prev => ({ ...prev, [axis]: parseInt(value) }));
    };

    const [cubeIndex, setCubeIndex] = useState(0);

    const [faceRed, setFaceRed] = useState(0);
    const [faceOrange, setFaceOrange] = useState(0);
    const [faceGreen, setFaceGreen] = useState(0);
    const [faceBlue, setFaceBlue] = useState(0);
    const [faceWhite, setFaceWhite] = useState(0);
    const [faceYellow, setFaceYellow] = useState(0);

    // const [cubePosition, setCubePosition] = useState([
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 1],
    //     [0, 0, 0, 2],
    //     [0, 0, 0, 3],
    //     [0, 2, 0, 4],
    //     [0, 2, 0, 5],
    //     [0, 2, 0, 6],
    //     [0, 2, 0, 7],
    //     [0, 3, 0, 8],
    //     [0, 3, 0, 9],
    //     [0, 1, 0, 10],
    //     [0, 1, 0, 11],
    // ]);

    // const [cubePosition, setCubePosition] = useState([
    //     [0, 0, 0, 0],
    //     [0, 1, 0, 1],
    //     [0, 2, 0, 2],
    //     [0, 3, 0, 3],
    //     [0, 0, 0, 4],
    //     [1, 0, 0, 5],
    //     [2, 0, 0, 6],
    //     [3, 0, 0, 7],
    //     [0, 1, 0, 8],
    //     [0, 3, 0, 9],
    //     [2, 1, 0, 10],
    //     [2, 3, 0, 11],
    // ]);

    const [cubePosition, setCubePosition] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 2],
        [0, 0, 0, 3],
        [0, 0, 0, 4],
        [0, 0, 0, 5],
        [0, 0, 0, 6],
        [0, 0, 0, 7],
        [0, 0, 0, 8],
        [0, 0, 0, 9],
        [0, 0, 0, 10],
        [0, 0, 0, 11],
    ]);

    const reset = () => {
        setFaceRed(0);
        setFaceOrange(0);
        setFaceGreen(0);
        setFaceBlue(0);
        setFaceWhite(0);
        setFaceYellow(0);
        setCubePosition([
            [0, 0, 0, 0],
            [0, 0, 0, 1],
            [0, 0, 0, 2],
            [0, 0, 0, 3],
            [0, 0, 0, 4],
            [0, 0, 0, 5],
            [0, 0, 0, 6],
            [0, 0, 0, 7],
            [0, 0, 0, 8],
            [0, 0, 0, 9],
            [0, 0, 0, 10],
            [0, 0, 0, 11],
        ])
    }

    const rotateFaceRed = (degree) => {
        // setFaceRed(p => p + degree);
        // setCubePosition((prev) => {
        //     const newArr = [...prev];
        //     const inner = [...newArr[0]];
        //     inner[2] = Number(degree > 0 ? inner[2] + 1 : inner[2] - 1);
        //     newArr[0] = inner;
        //     return newArr;
        // })

        // setFaceRed((p) => p + degree);
        // setCubePosition((prev) =>
        //     prev.map((coords) => {
        //         // Kiểm tra nếu tất cả phần tử đều chia hết cho 4
        //         if (coords.every((v) => v % 4 === 0)) {
        //             const newCoords = [...coords];
        //             newCoords[2] = degree > 0 ? newCoords[2] + 1 : newCoords[2] - 1;
        //             return newCoords;
        //         }
        //         return coords;
        //     })
        // );
        setFaceRed((p) => p + degree);
        const listIndices = [6, 10, 4, 8];
        // setCubePosition((prev) => {
        //     // lấy ra các phần tử thuộc group cần xoay
        //     const face = listIndices.map((i) => prev.find((c) => c[3] === i));

        //     // copy lại để xoay
        //     const newFace = [...face];

        //     if (degree < 0) {
        //         // xoay thuận (kim đồng hồ): dịch phải 1 bước
        //         for (let i = 0; i < face.length; i++) {
        //             newFace[(i + 1) % face.length] = [...face[i]];
        //         }
        //     } else {
        //         // xoay ngược (ngược kim đồng hồ): dịch trái 1 bước
        //         for (let i = 0; i < face.length; i++) {
        //             newFace[i] = [...face[(i + 1) % face.length]];
        //         }
        //     }

        //     // cập nhật thêm trục z (coords[2])
        //     newFace.forEach((c) => {
        //         c[2] = degree > 0 ? c[2] + 1 : c[2] - 1;
        //     });

        //     // gắn trở lại vào mảng chính
        //     return prev.map((coords) => {
        //         const idx = listIndices.indexOf(coords[3]);
        //         if (idx !== -1) {
        //             return newFace[idx];
        //         }
        //         return coords;
        //     });
        // });
        setCubePosition((prev) => {
            // lấy ra nhóm phần tử cần xoay, giữ đúng thứ tự listIndices
            const face = listIndices.map((i) => prev.find((c) => c[3] === i));

            // copy lại để xoay
            const newFace = [...face];

            if (degree < 0) {
                // xoay thuận (dịch phải)
                for (let i = 0; i < face.length; i++) {
                    newFace[(i + 1) % face.length] = [...face[i]];
                }
            } else {
                // xoay ngược (dịch trái)
                for (let i = 0; i < face.length; i++) {
                    newFace[i] = [...face[(i + 1) % face.length]];
                }
            }

            // cập nhật thêm trục z cho từng toạ độ
            newFace.forEach((c, idx) => {
                c[2] = degree > 0 ? c[2] + 1 : c[2] - 1;
            });

            // gắn trở lại vào cubePosition gốc
            return prev.map((coords) => {
                const idx = listIndices.indexOf(coords[3]);
                if (idx !== -1) {
                    return newFace[idx];
                }
                return coords;
            });
        });
    }

    const rotateFaceOrange = (degree) => {
        setFaceOrange((p) => p + degree);
        const listIndices = [5, 11, 7, 9];
        // setCubePosition((prev) => {
        //     // lấy ra thứ tự mới của coords[3]
        //     let rotated;
        //     if (degree < 0) {
        //         // xoay thuận (dịch phải)
        //         rotated = listIndices.map((_, i) => listIndices[(i - 1 + listIndices.length) % listIndices.length]);
        //     } else {
        //         // xoay ngược (dịch trái)
        //         rotated = listIndices.map((_, i) => listIndices[(i + 1) % listIndices.length]);
        //     }

        //     // cập nhật lại cubePosition
        //     return prev.map((coords) => {
        //         const idx = listIndices.indexOf(coords[3]);
        //         if (idx !== -1) {
        //             const updated = [...coords];
        //             updated[3] = rotated[idx]; // thay đổi index (coords[3])
        //             updated[2] = degree < 0 ? updated[2] + 1 : updated[2] - 1; // cập nhật trục z
        //             return updated;
        //         }
        //         return coords; // giữ nguyên các ô khác
        //     });
        // });
        setCubePosition((prev) => {
            // lấy ra nhóm phần tử cần xoay, giữ đúng thứ tự listIndices
            const face = listIndices.map((i) => prev.find((c) => c[3] === i));

            // copy lại để xoay
            const newFace = [...face];

            if (degree < 0) {
                // xoay thuận (dịch phải)
                for (let i = 0; i < face.length; i++) {
                    newFace[(i + 1) % face.length] = [...face[i]];
                }
            } else {
                // xoay ngược (dịch trái)
                for (let i = 0; i < face.length; i++) {
                    newFace[i] = [...face[(i + 1) % face.length]];
                }
            }

            // cập nhật thêm trục z cho từng toạ độ
            newFace.forEach((c, idx) => {
                c[2] = degree < 0 ? c[2] + 1 : c[2] - 1;
            });

            // gắn trở lại vào cubePosition gốc
            return prev.map((coords) => {
                const idx = listIndices.indexOf(coords[3]);
                if (idx !== -1) {
                    return newFace[idx];
                }
                return coords;
            });
        });
    }

    const rotateFaceGreen = (degree) => {
        setFaceGreen((p) => p + degree);
        const listIndices = [7, 3, 6, 2];
        // setCubePosition((prev) => {
        //     // lấy ra thứ tự mới của coords[3]
        //     let rotated;
        //     if (degree < 0) {
        //         // xoay thuận (dịch phải)
        //         rotated = listIndices.map((_, i) => listIndices[(i - 1 + listIndices.length) % listIndices.length]);
        //     } else {
        //         // xoay ngược (dịch trái)
        //         rotated = listIndices.map((_, i) => listIndices[(i + 1) % listIndices.length]);
        //     }

        //     // cập nhật lại cubePosition
        //     return prev.map((coords) => {
        //         const idx = listIndices.indexOf(coords[3]);
        //         if (idx !== -1) {
        //             const updated = [...coords];
        //             updated[3] = rotated[idx]; // thay đổi index (coords[3])
        //             updated[0] = degree < 0 ? updated[0] + 1 : updated[0] - 1; // cập nhật trục z
        //             return updated;
        //         }
        //         return coords; // giữ nguyên các ô khác
        //     });
        // });
        setCubePosition((prev) => {
            // lấy ra nhóm phần tử cần xoay, giữ đúng thứ tự listIndices
            const face = listIndices.map((i) => prev.find((c) => c[3] === i));

            // copy lại để xoay
            const newFace = [...face];

            if (degree < 0) {
                // xoay thuận (dịch phải)
                for (let i = 0; i < face.length; i++) {
                    newFace[(i + 1) % face.length] = [...face[i]];
                }
            } else {
                // xoay ngược (dịch trái)
                for (let i = 0; i < face.length; i++) {
                    newFace[i] = [...face[(i + 1) % face.length]];
                }
            }

            // cập nhật thêm trục z cho từng toạ độ
            newFace.forEach((c, idx) => {
                c[0] = degree < 0 ? c[0] + 1 : c[0] - 1;
            });

            // gắn trở lại vào cubePosition gốc
            return prev.map((coords) => {
                const idx = listIndices.indexOf(coords[3]);
                if (idx !== -1) {
                    return newFace[idx];
                }
                return coords;
            });
        });
    }

    return (
        <>
            <div className='scene-rubik'>
                <div className='rubik'
                    style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)` }}>

                    <div
                        className='cube center'
                        style={{ transform: `translateZ(100px) rotateZ(${faceRed}deg)` }}
                    >
                        <div className='face front red'
                            onClick={() => rotateFaceRed(90)}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                rotateFaceRed(-90);
                            }}
                        >Front</div>
                        <div className='face back'>Back</div>
                        <div className='face left'>Left</div>
                        <div className='face right'>Right</div>
                        <div className='face top'>Top</div>
                        <div className='face bottom'>Bottom</div>
                    </div>
                    <div
                        className='cube center'
                        style={{ transform: `rotateY(180deg) translateZ(100px) rotateZ(${faceOrange}deg)` }}
                    >
                        <div className='face front orange'
                            onClick={() => rotateFaceOrange(90)}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                rotateFaceOrange(-90);
                            }}
                        >Front</div>
                        <div className='face back'>Back</div>
                        <div className='face left'>Left</div>
                        <div className='face right'>Right</div>
                        <div className='face top'>Top</div>
                        <div className='face bottom'>Bottom</div>
                    </div>
                    <div
                        className='cube center'
                        style={{ transform: `rotateY(-90deg) translateZ(100px) rotateZ(${faceGreen}deg)` }}
                    >
                        <div className='face front green'
                            onClick={() => rotateFaceGreen(90)}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                rotateFaceGreen(-90);
                            }}
                        >Front</div>
                        <div className='face back'>Back</div>
                        <div className='face left'>Left</div>
                        <div className='face right'>Right</div>
                        <div className='face top'>Top</div>
                        <div className='face bottom'>Bottom</div>
                    </div>
                    <div
                        className='cube center'
                        style={{ transform: `rotateY(90deg) translateZ(100px) rotateZ(${faceBlue}deg)` }}
                    >
                        <div className='face front blue'
                            onClick={() => setFaceBlue(p => p + 90)}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                setFaceBlue(p => p - 90);
                            }}
                        >Front</div>
                        <div className='face back'>Back</div>
                        <div className='face left'>Left</div>
                        <div className='face right'>Right</div>
                        <div className='face top'>Top</div>
                        <div className='face bottom'>Bottom</div>
                    </div>
                    <div
                        className='cube center'
                        style={{ transform: `rotateX(90deg) translateZ(100px) rotateZ(${faceWhite}deg)` }}
                    >
                        <div className='face front white'
                            onClick={() => setFaceWhite(p => p + 90)}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                setFaceWhite(p => p - 90);
                            }}
                        >Front</div>
                        <div className='face back'>Back</div>
                        <div className='face left'>Left</div>
                        <div className='face right'>Right</div>
                        <div className='face top'>Top</div>
                        <div className='face bottom'>Bottom</div>
                    </div>
                    <div
                        className='cube center'
                        style={{ transform: `rotateX(-90deg) translateZ(100px) rotateZ(${faceYellow}deg)` }}
                    >
                        <div className='face front yellow'
                            onClick={() => setFaceYellow(p => p + 90)}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                setFaceYellow(p => p - 90);
                            }}
                        >Front</div>
                        <div className='face back'>Back</div>
                        <div className='face left'>Left</div>
                        <div className='face right'>Right</div>
                        <div className='face top'>Top</div>
                        <div className='face bottom'>Bottom</div>
                    </div>



                    {/* <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[0][0] * 90}deg)
                            rotateY(${cubePosition[0][1] * 90}deg)
                            rotateZ(${cubePosition[0][2] * 90}deg)
                            translateZ(100px) translateX(-100px)
                            `
                        }}
                    >
                        <div className='face front red'>Front {cubePosition[0][3]}</div>
                        <div className='face left green'>Left {cubePosition[0][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[1][0] * 90}deg)
                            rotateY(${cubePosition[1][1] * 90}deg)
                            rotateZ(${cubePosition[1][2] * 90}deg)
                            translateZ(100px) translateX(100px)
                            `
                        }}
                    >
                        <div className='face front red'>Front {cubePosition[1][3]}</div>
                        <div className='face right blue'>Right {cubePosition[1][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[2][0] * 90}deg)
                            rotateY(${cubePosition[2][1] * 90}deg)
                            rotateZ(${cubePosition[2][2] * 90}deg)
                            translateZ(100px) translateY(-100px)
                            `
                        }}
                    >
                        <div className='face front red'>Front {cubePosition[2][3]}</div>
                        <div className='face top white'>Top {cubePosition[2][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[3][0] * 90}deg)
                            rotateY(${cubePosition[3][1] * 90}deg)
                            rotateZ(${cubePosition[3][2] * 90}deg)
                            translateZ(100px) translateY(100px)
                            `
                        }}
                    >
                        <div className='face front red'>Front {cubePosition[3][3]}</div>
                        <div className='face bottom yellow'>Bottom {cubePosition[3][3]}</div>
                    </div>



                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[4][0] * 90}deg)
                            rotateY(${cubePosition[4][1] * 90}deg)
                            rotateZ(${cubePosition[4][2] * 90}deg)
                            translateZ(100px) translateX(-100px)
                            `
                        }}
                    >
                        <div className='face front orange'>Front {cubePosition[4][3]}</div>
                        <div className='face left blue'>Left {cubePosition[4][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[5][0] * 90}deg)
                            rotateY(${cubePosition[5][1] * 90}deg)
                            rotateZ(${cubePosition[5][2] * 90}deg)
                            translateZ(100px) translateX(100px)
                            `
                        }}
                    >
                        <div className='face front orange'>Front {cubePosition[5][3]}</div>
                        <div className='face right green'>Right {cubePosition[5][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[6][0] * 90}deg)
                            rotateY(${cubePosition[6][1] * 90}deg)
                            rotateZ(${cubePosition[6][2] * 90}deg)
                            translateZ(100px) translateY(-100px)
                            `
                        }}
                    >
                        <div className='face front orange'>Front {cubePosition[6][3]}</div>
                        <div className='face top white'>Top {cubePosition[6][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[7][0] * 90}deg)
                            rotateY(${cubePosition[7][1] * 90}deg)
                            rotateZ(${cubePosition[7][2] * 90}deg)
                            translateZ(100px) translateY(100px)
                            `
                        }}
                    >
                        <div className='face front orange'>Front {cubePosition[7][3]}</div>
                        <div className='face bottom yellow'>Bottom {cubePosition[7][3]}</div>
                    </div>



                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[8][0] * 90}deg)
                            rotateY(${cubePosition[8][1] * 90}deg)
                            rotateZ(${cubePosition[8][2] * 90}deg)
                            translateZ(100px) translateY(-100px)
                            `
                        }}
                    >
                        <div className='face front green'>Front {cubePosition[8][3]}</div>
                        <div className='face top white'>Top {cubePosition[8][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[9][0] * 90}deg)
                            rotateY(${cubePosition[9][1] * 90}deg)
                            rotateZ(${cubePosition[9][2] * 90}deg)
                            translateZ(100px) translateY(100px)
                            `
                        }}
                    >
                        <div className='face front green'>Front {cubePosition[9][3]}</div>
                        <div className='face bottom yellow'>Bottom {cubePosition[9][3]}</div>
                    </div>



                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[10][0] * 90}deg)
                            rotateY(${cubePosition[10][1] * 90}deg)
                            rotateZ(${cubePosition[10][2] * 90}deg)
                            translateZ(100px) translateY(-100px)
                            `
                        }}
                    >
                        <div className='face front blue'>Front {cubePosition[10][3]}</div>
                        <div className='face top white'>Top {cubePosition[10][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[11][0] * 90}deg)
                            rotateY(${cubePosition[11][1] * 90}deg)
                            rotateZ(${cubePosition[11][2] * 90}deg)
                            translateZ(100px) translateY(100px)
                            `
                        }}
                    >
                        <div className='face front blue'>Front {cubePosition[11][3]}</div>
                        <div className='face bottom yellow'>Bottom {cubePosition[11][3]}</div>
                    </div> */}



                    {/* <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[0][0] * 90}deg)
                            rotateY(${cubePosition[0][1] * 90}deg)
                            rotateZ(${cubePosition[0][2] * 90}deg)
                            translateZ(100px) translateX(-100px)
                            `
                        }}
                    >
                        <div className='face front red'>Front {cubePosition[0][3]}</div>
                        <div className='face left green'>Left {cubePosition[0][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[1][0] * 90}deg)
                            rotateY(${cubePosition[1][1] * 90}deg)
                            rotateZ(${cubePosition[1][2] * 90}deg)
                            translateZ(100px) translateX(-100px)
                            `
                        }}
                    >
                        <div className='face front blue'>Front {cubePosition[1][3]}</div>
                        <div className='face left red'>Left {cubePosition[1][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[2][0] * 90}deg)
                            rotateY(${cubePosition[2][1] * 90}deg)
                            rotateZ(${cubePosition[2][2] * 90}deg)
                            translateZ(100px) translateX(-100px)
                            `
                        }}
                    >
                        <div className='face front orange'>Front {cubePosition[2][3]}</div>
                        <div className='face left blue'>Left {cubePosition[2][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[3][0] * 90}deg)
                            rotateY(${cubePosition[3][1] * 90}deg)
                            rotateZ(${cubePosition[3][2] * 90}deg)
                            translateZ(100px) translateX(-100px)
                            `
                        }}
                    >
                        <div className='face front green'>Front {cubePosition[3][3]}</div>
                        <div className='face left orange'>Left {cubePosition[3][3]}</div>
                    </div>


                    
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[4][0] * 90}deg)
                            rotateY(${cubePosition[4][1] * 90}deg)
                            rotateZ(${cubePosition[4][2] * 90}deg)
                            translateZ(100px) translateY(-100px)
                            `
                        }}
                    >
                        <div className='face front red'>Front {cubePosition[4][3]}</div>
                        <div className='face top white'>Top {cubePosition[4][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[5][0] * 90}deg)
                            rotateY(${cubePosition[5][1] * 90}deg)
                            rotateZ(${cubePosition[5][2] * 90}deg)
                            translateZ(100px) translateY(-100px)
                            `
                        }}
                    >
                        <div className='face front white'>Front {cubePosition[5][3]}</div>
                        <div className='face top orange'>Top {cubePosition[5][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[6][0] * 90}deg)
                            rotateY(${cubePosition[6][1] * 90}deg)
                            rotateZ(${cubePosition[6][2] * 90}deg)
                            translateZ(100px) translateY(-100px)
                            `
                        }}
                    >
                        <div className='face front orange'>Front {cubePosition[6][3]}</div>
                        <div className='face top yellow'>Top {cubePosition[6][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[7][0] * 90}deg)
                            rotateY(${cubePosition[7][1] * 90}deg)
                            rotateZ(${cubePosition[7][2] * 90}deg)
                            translateZ(100px) translateY(-100px)
                            `
                        }}
                    >
                        <div className='face front yellow'>Front {cubePosition[7][3]}</div>
                        <div className='face top red'>Top {cubePosition[7][3]}</div>
                    </div>



                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[8][0] * 90}deg)
                            rotateY(${cubePosition[8][1] * 90}deg)
                            rotateZ(${cubePosition[8][2] * 90}deg)
                            translateZ(100px) translateY(-100px)
                            `
                        }}
                    >
                        <div className='face front blue'>Front {cubePosition[8][3]}</div>
                        <div className='face top white'>Top {cubePosition[8][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[9][0] * 90}deg)
                            rotateY(${cubePosition[9][1] * 90}deg)
                            rotateZ(${cubePosition[9][2] * 90}deg)
                            translateZ(100px) translateY(-100px)
                            `
                        }}
                    >
                        <div className='face front green'>Front {cubePosition[9][3]}</div>
                        <div className='face top white'>Top {cubePosition[9][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[10][0] * 90}deg)
                            rotateY(${cubePosition[10][1] * 90}deg)
                            rotateZ(${cubePosition[10][2] * 90}deg)
                            translateZ(100px) translateY(-100px)
                            `
                        }}
                    >
                        <div className='face front blue'>Front {cubePosition[10][3]}</div>
                        <div className='face top yellow'>Top {cubePosition[10][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[11][0] * 90}deg)
                            rotateY(${cubePosition[11][1] * 90}deg)
                            rotateZ(${cubePosition[11][2] * 90}deg)
                            translateZ(100px) translateY(-100px)
                            `
                        }}
                    >
                        <div className='face front green'>Front {cubePosition[11][3]}</div>
                        <div className='face top yellow'>Top {cubePosition[11][3]}</div>
                    </div> */}



                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[0][0] * 90}deg)
                            rotateY(${cubePosition[0][1] * 90}deg)
                            rotateZ(${cubePosition[0][2] * 90}deg)
                            translateX(100px) translateY(100px)
                            `
                        }}
                    >
                        <div className='face front '>Front {cubePosition[0][3]}</div>
                        <div className='face back '>Back {cubePosition[0][3]}</div>
                        <div className='face left '>Left {cubePosition[0][3]}</div>
                        <div className='face right blue'>Right {cubePosition[0][3]}</div>
                        <div className='face top '>Top {cubePosition[0][3]}</div>
                        <div className='face bottom yellow'>Bottom {cubePosition[0][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[1][0] * 90}deg)
                            rotateY(${cubePosition[1][1] * 90}deg)
                            rotateZ(${cubePosition[1][2] * 90}deg)
                            translateX(100px) translateY(-100px)
                            `
                        }}
                    >
                        <div className='face front '>Front {cubePosition[1][3]}</div>
                        <div className='face back '>Back {cubePosition[1][3]}</div>
                        <div className='face left '>Left {cubePosition[1][3]}</div>
                        <div className='face right blue'>Right {cubePosition[1][3]}</div>
                        <div className='face top white'>Top {cubePosition[1][3]}</div>
                        <div className='face bottom '>Bottom {cubePosition[1][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[2][0] * 90}deg)
                            rotateY(${cubePosition[2][1] * 90}deg)
                            rotateZ(${cubePosition[2][2] * 90}deg)
                            translateX(-100px) translateY(100px)
                            `
                        }}
                    >
                        <div className='face front '>Front {cubePosition[2][3]}</div>
                        <div className='face back '>Back {cubePosition[2][3]}</div>
                        <div className='face left green'>Left {cubePosition[2][3]}</div>
                        <div className='face right '>Right {cubePosition[2][3]}</div>
                        <div className='face top '>Top {cubePosition[2][3]}</div>
                        <div className='face bottom yellow'>Bottom {cubePosition[2][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[3][0] * 90}deg)
                            rotateY(${cubePosition[3][1] * 90}deg)
                            rotateZ(${cubePosition[3][2] * 90}deg)
                            translateX(-100px) translateY(-100px)
                            `
                        }}
                    >
                        <div className='face front '>Front {cubePosition[3][3]}</div>
                        <div className='face back '>Back {cubePosition[3][3]}</div>
                        <div className='face left green'>Left {cubePosition[3][3]}</div>
                        <div className='face right '>Right {cubePosition[3][3]}</div>
                        <div className='face top white'>Top {cubePosition[3][3]}</div>
                        <div className='face bottom '>Bottom {cubePosition[3][3]}</div>
                    </div>



                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[4][0] * 90}deg)
                            rotateY(${cubePosition[4][1] * 90}deg)
                            rotateZ(${cubePosition[4][2] * 90}deg)
                            translateX(100px) translateZ(100px)
                            `
                        }}
                    >
                        <div className='face front red'>Front {cubePosition[4][3]}</div>
                        <div className='face back '>Back {cubePosition[4][3]}</div>
                        <div className='face left '>Left {cubePosition[4][3]}</div>
                        <div className='face right blue'>Right {cubePosition[4][3]}</div>
                        <div className='face top '>Top {cubePosition[4][3]}</div>
                        <div className='face bottom '>Bottom {cubePosition[4][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[5][0] * 90}deg)
                            rotateY(${cubePosition[5][1] * 90}deg)
                            rotateZ(${cubePosition[5][2] * 90}deg)
                            translateX(100px) translateZ(-100px)
                            `
                        }}
                    >
                        <div className='face front '>Front {cubePosition[5][3]}</div>
                        <div className='face back orange'>Back {cubePosition[5][3]}</div>
                        <div className='face left '>Left {cubePosition[5][3]}</div>
                        <div className='face right blue'>Right {cubePosition[5][3]}</div>
                        <div className='face top '>Top {cubePosition[5][3]}</div>
                        <div className='face bottom '>Bottom {cubePosition[5][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[6][0] * 90}deg)
                            rotateY(${cubePosition[6][1] * 90}deg)
                            rotateZ(${cubePosition[6][2] * 90}deg)
                            translateX(-100px) translateZ(100px)
                            `
                        }}
                    >
                        <div className='face front red'>Front {cubePosition[6][3]}</div>
                        <div className='face back '>Back {cubePosition[6][3]}</div>
                        <div className='face left green'>Left {cubePosition[6][3]}</div>
                        <div className='face right '>Right {cubePosition[6][3]}</div>
                        <div className='face top '>Top {cubePosition[6][3]}</div>
                        <div className='face bottom '>Bottom {cubePosition[6][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[7][0] * 90}deg)
                            rotateY(${cubePosition[7][1] * 90}deg)
                            rotateZ(${cubePosition[7][2] * 90}deg)
                            translateX(-100px) translateZ(-100px)
                            `
                        }}
                    >
                        <div className='face front '>Front {cubePosition[7][3]}</div>
                        <div className='face back orange'>Back {cubePosition[7][3]}</div>
                        <div className='face left green'>Left {cubePosition[7][3]}</div>
                        <div className='face right '>Right {cubePosition[7][3]}</div>
                        <div className='face top '>Top {cubePosition[7][3]}</div>
                        <div className='face bottom '>Bottom {cubePosition[7][3]}</div>
                    </div>



                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[8][0] * 90}deg)
                            rotateY(${cubePosition[8][1] * 90}deg)
                            rotateZ(${cubePosition[8][2] * 90}deg)
                            translateY(100px) translateZ(100px)
                            `
                        }}
                    >
                        <div className='face front red'>Front {cubePosition[8][3]}</div>
                        <div className='face back '>Back {cubePosition[8][3]}</div>
                        <div className='face left '>Left {cubePosition[8][3]}</div>
                        <div className='face right '>Right {cubePosition[8][3]}</div>
                        <div className='face top '>Top {cubePosition[8][3]}</div>
                        <div className='face bottom yellow'>Bottom {cubePosition[8][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[9][0] * 90}deg)
                            rotateY(${cubePosition[9][1] * 90}deg)
                            rotateZ(${cubePosition[9][2] * 90}deg)
                            translateY(100px) translateZ(-100px)
                            `
                        }}
                    >
                        <div className='face front '>Front {cubePosition[9][3]}</div>
                        <div className='face back orange'>Back {cubePosition[9][3]}</div>
                        <div className='face left '>Left {cubePosition[9][3]}</div>
                        <div className='face right '>Right {cubePosition[9][3]}</div>
                        <div className='face top '>Top {cubePosition[9][3]}</div>
                        <div className='face bottom yellow'>Bottom {cubePosition[9][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[10][0] * 90}deg)
                            rotateY(${cubePosition[10][1] * 90}deg)
                            rotateZ(${cubePosition[10][2] * 90}deg)
                            translateY(-100px) translateZ(100px)
                            `
                        }}
                    >
                        <div className='face front red'>Front {cubePosition[10][3]}</div>
                        <div className='face back '>Back {cubePosition[10][3]}</div>
                        <div className='face left '>Left {cubePosition[10][3]}</div>
                        <div className='face right '>Right {cubePosition[10][3]}</div>
                        <div className='face top white'>Top {cubePosition[10][3]}</div>
                        <div className='face bottom '>Bottom {cubePosition[10][3]}</div>
                    </div>
                    <div
                        className='cube side'
                        style={{
                            transform: `
                            rotateX(${cubePosition[11][0] * 90}deg)
                            rotateY(${cubePosition[11][1] * 90}deg)
                            rotateZ(${cubePosition[11][2] * 90}deg)
                            translateY(-100px) translateZ(-100px)
                            `
                        }}
                    >
                        <div className='face front '>Front {cubePosition[11][3]}</div>
                        <div className='face back orange'>Back {cubePosition[11][3]}</div>
                        <div className='face left '>Left {cubePosition[11][3]}</div>
                        <div className='face right '>Right {cubePosition[11][3]}</div>
                        <div className='face top white'>Top {cubePosition[11][3]}</div>
                        <div className='face bottom '>Bottom {cubePosition[11][3]}</div>
                    </div>



                    <div className='line line-x'>X</div>
                    <div className='line line-x x-2'>X</div>
                    <div className='line line-y'>Y</div>
                    <div className='line line-y y-2'>Y</div>
                    <div className='line line-z'>Z</div>
                    <div className='line line-z z-2'>Z</div>
                </div>
            </div>


            <form className='rotation-form'>
                <div>{cubePosition[0][0]} - {cubePosition[0][1]} - {cubePosition[0][2]}</div>
                {['x', 'y', 'z'].map(axis => (
                    <div key={axis} className='slider-group'>
                        <label htmlFor={axis}>{axis.toUpperCase()}: {rotation[axis]}°</label>
                        <input
                            type='range'
                            id={axis}
                            name={axis}
                            min='-180'
                            max='180'
                            value={rotation[axis]}
                            onChange={(e) => handleChangeRotation(axis, e.target.value)}
                        />
                    </div>
                ))}

                {[...Array(3)].map((_, i) => {
                    const position = cubeIndex;
                    return (
                        <input
                            key={i}
                            type='number'
                            value={cubePosition[position][i]}
                            onChange={(e) =>
                                setCubePosition((prev) => {
                                    const newArr = [...prev]; // clone mảng ngoài
                                    const inner = [...newArr[position]]; // clone mảng con
                                    inner[i] = Number(e.target.value); // cập nhật phần tử cần thay đổi
                                    newArr[position] = inner; // gán lại
                                    return newArr;
                                })
                            }
                        />)
                })}
                <input
                    type='number'
                    value={cubeIndex}
                    onChange={(e) =>
                        setCubeIndex((prev) => e.target.value)
                    }
                />
                <button type='button' onClick={reset}>RESET</button>
            </form>
        </>
    )
}
