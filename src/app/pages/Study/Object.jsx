import React from 'react';
import './Object.css';

export default function Object() {

    const maxRow = 10;
    const maxCol = 12;
    const Distance = 200;
    const ContainerFaceWidth = Distance;
    const ContainerFaceHeight = 2 * Distance * Math.tan((90 / (maxRow)) * (Math.PI / 180));


    return (
        <div className='object-container'>
            {/* <div className='scene-card'>
                <div className='card'>
                    <div className='face front'>Mặt Trước</div>
                    <div className='face back'>Mặt Sau</div>
                </div>
            </div> */}

            <div className='scene-cube'>
                <div className='cube'>
                    <div className='face front'>Front</div>
                    <div className='face back'>Back</div>
                    <div className='face left'>Left</div>
                    <div className='face right'>Right</div>
                    <div className='face top'>Top</div>
                    <div className='face bottom'>Bottom</div>
                </div>
            </div>

            <div className='scene-pyramid'>
                <div className='pyramid'>
                    <div className='face bottom'>Yellow</div>
                    <div className='face front'>Red</div>
                    <div className='face left'>Green</div>
                    <div className='face right'>Blue</div>
                </div>
            </div>

            <div className='scene-octahedron'>
                <div className='octahedron'>
                    <div className='face f1'>Face1</div>
                    <div className='face f2'>Face2</div>
                    <div className='face f3'>Face3</div>
                    <div className='face f4'>Face4</div>
                    <div className='face f5'>Face5</div>
                    <div className='face f6'>Face6</div>
                    <div className='face f7'>Face7</div>
                    <div className='face f8'>Face8</div>
                    <div className='floor fl1'>Root1</div>
                    <div className='floor fl2'>Root2</div>
                    <div className='floor fl3'>Root3</div>
                </div>
            </div>

            <div className='scene-dodecahedron'>
                <div className='dodecahedron'>
                    <div className='face f1'>Face1</div>
                    <div className='face f2'>Face2</div>
                    <div className='face f3'>Face3</div>
                    <div className='face f4'>Face4</div>
                    <div className='face f5'>Face5</div>
                    <div className='face f6'>Face6</div>
                    <div className='face f7'>Face7</div>
                    <div className='face f8'>Face8</div>
                    <div className='face f9'>Face9</div>
                    <div className='face f10'>Face10</div>
                    <div className='face f11'>Face11</div>
                    <div className='face f12'>Face12</div>
                </div>
            </div>

            <div className='scene-icosahedron'>
                <div className='icosahedron'>
                    <div className='face f1'>Face1</div>
                    <div className='face f2'>Face2</div>
                    <div className='face f3'>Face3</div>
                    <div className='face f4'>Face4</div>
                    <div className='face f5'>Face5</div>
                    <div className='face f6'>Face6</div>
                    <div className='face f7'>Face7</div>
                    <div className='face f8'>Face8</div>
                    <div className='face f9'>Face9</div>
                    <div className='face f10'>Face10</div>
                    <div className='face f11'>Face11</div>
                    <div className='face f12'>Face12</div>
                    <div className='face f13'>Face13</div>
                    <div className='face f14'>Face14</div>
                    <div className='face f15'>Face15</div>
                    <div className='face f16'>Face16</div>
                    <div className='face f17'>Face17</div>
                    <div className='face f18'>Face18</div>
                    <div className='face f19'>Face19</div>
                    <div className='face f20'>Face20</div>
                </div>
            </div>

            <div className='scene-earth'>
                <div className='earth'>
                    {[...Array(maxRow)].map((_, row) => (
                        [...Array(maxCol)].map((_, col) => (
                            <div
                                key={`${row}-${col}`}
                                className={`face row-${row + 1} col-${col + 1}`}
                                style={{
                                    background: '#ff000080',
                                    transform: `rotateZ(${360 / maxCol * (col + 1)}deg) rotateX(${-90 / maxRow + (row + 1) * 180 / maxRow}deg) translateZ(${Distance}px)`,
                                    width: `${ContainerFaceWidth}px`,
                                    height: `${ContainerFaceHeight}px`,
                                    clipPath: `polygon(
                                    ${(50 - 2 * Distance * (Math.tan(180 / maxCol * Math.PI / 180)) / (Math.cos(90 / maxRow * Math.PI / 180)) * (Math.sin(180 / maxRow * (row + 1) * Math.PI / 180)) / ContainerFaceWidth * 50)}% 0%,
                                    ${(50 + 2 * Distance * (Math.tan(180 / maxCol * Math.PI / 180)) / (Math.cos(90 / maxRow * Math.PI / 180)) * (Math.sin(180 / maxRow * (row + 1) * Math.PI / 180)) / ContainerFaceWidth * 50)}% 0%,
                                    ${(50 + 2 * Distance * (Math.tan(180 / maxCol * Math.PI / 180)) / (Math.cos(90 / maxRow * Math.PI / 180)) * (Math.sin(180 / maxRow * (row) * Math.PI / 180)) / ContainerFaceWidth * 50)}% 100%,
                                    ${(50 - 2 * Distance * (Math.tan(180 / maxCol * Math.PI / 180)) / (Math.cos(90 / maxRow * Math.PI / 180)) * (Math.sin(180 / maxRow * (row) * Math.PI / 180)) / ContainerFaceWidth * 50)}% 100%)`,
                                }}
                            >
                                {row + 1} - {col + 1}
                            </div>
                        ))
                    ))}
                    {/* <div style={{width: '100%', backgroundColor: '#dc3545', textAlign: 'center'}}>A</div> */}
                </div>
            </div>
        </div>
    )
}
