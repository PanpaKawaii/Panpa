import { Link } from 'react-router-dom';
import './ListMouse.css';

export default function ListMouse() {

    const ListMouse = [
        { name: 'Mouse Tracker', src: null, link: '/mouse/mouse-tracker' },
        { name: 'Mouse Drag Tracker', src: null, link: '/mouse/mouse-drag-tracker' },
        { name: 'Mouse Drag Rotate', src: null, link: '/mouse/mouse-drag-rotate' }
    ];

    return (
        <div className='listmouse-container'>
            <div className='heading'>
                <h1>List Mouse</h1>
            </div>
            <div className='content'>
                <div className='mouse-row'>
                    {ListMouse.map((mouse, index) => (
                        <div key={index} className='mouse-col'>
                            <Link to={`${mouse.link}`}>
                                <div className='card'>
                                    <img src={mouse.src} alt={mouse.name} />
                                    <div className='mouse-name'>{mouse.name}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
