import { Link } from 'react-router-dom';
import './ListGame.css';

import CaroSRC from '../../assets/imageGAMEs/Caro.png';
import GenerateMazeSRC from '../../assets/imageGAMEs/GenerateMaze.png';
import LuckyDiceSRC from '../../assets/imageGAMEs/LuckyDice.png';
import MinesweeperSRC from '../../assets/imageGAMEs/Minesweeper.png';
import RandomCardSRC from '../../assets/imageGAMEs/RandomCard.png';
import SolveTheMazeSRC from '../../assets/imageGAMEs/SolveTheMaze.png';
import TetrisSRC from '../../assets/imageGAMEs/Tetris.png';
import ToDoListSRC from '../../assets/imageGAMEs/ToDoList.png';
import TypePiSRC from '../../assets/imageGAMEs/TypePi.png';
import WhatIsThePasswordSRC from '../../assets/imageGAMEs/WhatIsThePassword.png';

export default function ListGame() {

    const ListGame = [
        { name: 'Minesweeper', src: MinesweeperSRC, link: '/game/minesweeper' },
        { name: 'What Is The Password?', src: WhatIsThePasswordSRC, link: '/game/whatisthepassword' },
        { name: 'Caro', src: CaroSRC, link: '/game/caro' },
        { name: 'Chess', src: null, link: '/game/chess' },
        { name: 'Lucky Dice', src: LuckyDiceSRC, link: '/game/luckydice' },
        { name: 'Go', src: null, link: '/game/go' },
        { name: 'Tetris', src: TetrisSRC, link: '/game/tetris' },
        { name: 'Solve The Maze', src: SolveTheMazeSRC, link: '/game/solvethemaze' },
        { name: 'Generate Maze', src: GenerateMazeSRC, link: '/game/generatemaze' },
        { name: 'Type Pi', src: TypePiSRC, link: '/game/typepi' },
        { name: 'Random Card (VW > 1227px)', src: RandomCardSRC, link: '/game/randomcard' },
        { name: 'To Do List', src: ToDoListSRC, link: '/game/todolist' },
    ];

    return (
        <div className='listgame-container'>
            <div className='heading'>
                <h1>List Game</h1>
            </div>
            <div className='content'>
                <div className='game-row'>
                    {ListGame.map((game, index) => (
                        <div key={index} className='game-col'>
                            <Link to={`${game.link}`}>
                                <div className='card'>
                                    <img src={game.src} alt={game.name} />
                                    <div className='game-name'>{game.name}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
