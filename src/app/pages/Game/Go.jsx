import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './Go.css';

export default function Go() {

    const [GameMode, setGameMode] = useState({
        RowCount: 19,
        ColCount: 19,
        ConstantToWin: 5
    });
    const [SelectedGameMode, setSelectedGameMode] = useState('LargeMap');

    const [Player, setPlayer] = useState(1);
    const [HasWon, setHasWon] = useState(0);
    const [ConstantCell, setConstantCell] = useState([]);
    const [Refresh, setRefresh] = useState(0);
    const [Path, setPath] = useState([]);
    const [LastStep, setLastStep] = useState({
        row: null,
        col: null
    });

    const [PlayTable, setPlayTable] = useState(Array(GameMode.RowCount).fill(0).map(() =>
        Array(GameMode.ColCount).fill(0).map(() => ({ value: 0 }))
    ));

    useEffect(() => {
        const NewPlayTable = Array(GameMode.RowCount).fill(0).map(() =>
            Array(GameMode.ColCount).fill(0).map(() => ({ value: 0 }))
        );
        setPlayTable(NewPlayTable);

        setPlayer(1);
        setPath([]);
        setLastStep({ row: null, col: null });
        setHasWon(0);
        setConstantCell([]);
    }, [GameMode, Refresh]);

    const MarkCell = (row, col) => {
        if (PlayTable[row][col].value !== 0 || HasWon !== 0) return;

        setPlayer(Player === 1 ? 2 : 1);
        const NewPlayTable = [...PlayTable];
        NewPlayTable[row][col].value = Player;
        setPlayTable(NewPlayTable);

        const NewPath = [...Path, [row, col]];
        setPath(NewPath);
        setLastStep({ row, col });
        console.log('Path:', NewPath);

        checkRow(row, col);
        checkCol(row, col);
        checkDiagonalDown(row, col);
        checkDiagonalUp(row, col);
        console.log('ConstantCell', ConstantCell);
        console.log('End Check!');
    }

    // 

    const remarkCell = () => {
        if (Path.length <= 0) {
            console.log('Path.length <= 0');
            return;
        }

        setHasWon(0);
        setConstantCell([]);
        setPlayer(Player === 1 ? 2 : 1);

        const LastPath = Path.pop();
        console.log(LastPath);
        const NewPlayTable = [...PlayTable];
        NewPlayTable[LastPath[0]][LastPath[1]].value = 0;
        setPlayTable(NewPlayTable);

        if (Path.length <= 0) {
            setLastStep({ row: null, col: null });
        } else {
            const NextLastPath = Path[Path.length - 1];
            setLastStep({ row: NextLastPath[0], col: NextLastPath[1] });
        }
    }

    return (
        <div className='go-container'>
            <div className='heading'>
                <h1>GO</h1>
            </div>

            <div className='detail'>
                <div>
                    <div className='support'>
                        <Button className='btn' style={{ backgroundColor: Player === 1 ? '#fd4755' : (Player === 2 ? '#01d0fd' : '') }} onClick={() => remarkCell()}><i className='fa-solid fa-reply'></i></Button>
                        <Button className='btn' onClick={() => setRefresh(Refresh + 1)}>RESTART</Button>
                    </div>
                </div>

                <div className='result'
                    style={{
                        border:
                            HasWon === 1 ?
                                '2px solid #fd4755'
                                :
                                (HasWon === 2 ?
                                    '2px solid #01d0fd'
                                    :
                                    'none'
                                )
                    }}
                >
                    {HasWon === 1 && <h2 style={{ color: '#fd4755' }}><b><i className='fa-solid fa-circle'></i> WON!</b></h2>}
                    {HasWon === 2 && <h2 style={{ color: '#01d0fd' }}><b><i className='fa-solid fa-circle'></i> WON!</b></h2>}
                </div>
            </div>

            <div className='content'>
                <table
                    style={{
                        '--table-width': GameMode.ColCount,
                        '--table-height': GameMode.RowCount,
                    }}
                >
                    <tbody>
                        {[...Array(GameMode.RowCount)].map((_, index_row) => (
                            <tr key={index_row}>
                                {[...Array(GameMode.ColCount)].map((_, index_col) => (
                                    <td
                                        key={index_col}
                                        className={
                                            (PlayTable[index_row][index_col].value === 0 && Player === 1) ?
                                                'put-black'
                                                :
                                                (PlayTable[index_row][index_col].value === 0 && Player === 2) ?
                                                    'put-white'
                                                    :
                                                    ''
                                        }
                                        onClick={() => { MarkCell(index_row, index_col) }}
                                    >
                                        <div className='stick'>
                                            {index_row !== 0 && <div className='top'></div>}
                                            {index_row !== GameMode.RowCount - 1 && <div className='bottom'></div>}
                                            {index_col !== GameMode.ColCount - 1 && <div className='right'></div>}
                                            {index_col !== 0 && <div className='left'></div>}
                                        </div>

                                        {PlayTable[index_row][index_col].value === 1 ?
                                            <div className={`dot black ${(index_row === LastStep.row && index_col === LastStep.col) && 'last-dot'}`}></div>
                                            :
                                            (
                                                PlayTable[index_row][index_col].value === 2 ?
                                                    <div className={`dot white ${(index_row === LastStep.row && index_col === LastStep.col) && 'last-dot'}`}></div>
                                                    :
                                                    ''
                                            )
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
