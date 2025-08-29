import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './Go.css';

export default function Go() {

    const GameMode = {
        RowCount: 19,
        ColCount: 19
    };

    const [Player, setPlayer] = useState(1);
    const [HasWon, setHasWon] = useState(0);
    const [Refresh, setRefresh] = useState(0);
    const [Path, setPath] = useState([]);
    const [LastStep, setLastStep] = useState({
        row: null,
        col: null
    });

    const [PlayTable, setPlayTable] = useState(Array(GameMode.RowCount).fill(0).map(() =>
        Array(GameMode.ColCount).fill(0).map(() => ({ value: 0 }))
    ));

    const Map = [
        [{ value: 0 }, { value: 0 }, { value: 2 }, { value: 2 }, { value: 2 }],
        [{ value: 0 }, { value: 0 }, { value: 2 }, { value: 2 }, { value: 2 }],
        [{ value: 0 }, { value: 2 }, { value: 1 }, { value: 2 }, { value: 2 }],
        [{ value: 0 }, { value: 0 }, { value: 2 }, { value: 0 }, { value: 2 }],
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 2 }, { value: 2 }],
    ];

    useEffect(() => {
        const NewPlayTable = Array(GameMode.RowCount).fill(0).map(() =>
            Array(GameMode.ColCount).fill(0).map(() => ({ value: 0 }))
        );
        setPlayTable(NewPlayTable);
        // setPlayTable(Map);

        setPlayer(1);
        setPath([]);
        setLastStep({ row: null, col: null });
        setHasWon(0);
    }, [Refresh]);

    const MarkCell = (row, col) => {
        console.log('Mark: ', row, col);
        if (PlayTable[row][col].value !== 0 || HasWon !== 0) return;

        const NewPlayTable = [...PlayTable];
        NewPlayTable[row][col].value = Player;
        setPlayTable(NewPlayTable);

        const NewPath = [...Path, [row, col]];
        setPath(NewPath);
        setLastStep({ row, col });
        console.log('Path:', NewPath);

        const OppositePlayer = Player === 1 ? 2 : 1;

        const { TopArea, RightArea, BottomArea, LeftArea } = getAreas(PlayTable, row, col, Player, OppositePlayer);
        console.log("TopArea:", TopArea);
        console.log("RightArea:", RightArea);
        console.log("BottomArea:", BottomArea);
        console.log("LeftArea:", LeftArea);
        const TopAreaAround = getAreaAround(PlayTable, TopArea);
        const RightAreaAround = getAreaAround(PlayTable, RightArea);
        const BottomAreaAround = getAreaAround(PlayTable, BottomArea);
        const LeftAreaAround = getAreaAround(PlayTable, LeftArea);

        console.log("TopAreaAround:", TopAreaAround);
        console.log("RightAreaAround:", RightAreaAround);
        console.log("BottomAreaAround:", BottomAreaAround);
        console.log("LeftAreaAround:", LeftAreaAround);

        // Kiểm tra và xoá TopArea nếu bị bao vây
        clearAreaIfSurrounded(PlayTable, TopArea);
        clearAreaIfSurrounded(PlayTable, RightArea);
        clearAreaIfSurrounded(PlayTable, BottomArea);
        clearAreaIfSurrounded(PlayTable, LeftArea);

        const CenterArea = getPlayerRegion(PlayTable, row, col, Player);
        console.log("CenterArea:", CenterArea);
        const CenterAreaAround = getAreaAround(PlayTable, CenterArea);
        console.log("CenterAreaAround:", CenterAreaAround);
        clearAreaIfSurrounded(PlayTable, CenterArea);

        setPlayer(Player === 1 ? 2 : 1);
        console.log('End Change Player!');
    }

    // 
    // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    // await sleep(100);

    function getAreas(playTable, row, col, player, oppositePlayer) {
        const numRows = playTable.length;
        const numCols = playTable[0].length;

        if (playTable[row][col].value !== player) {
            return {
                TopArea: [],
                RightArea: [],
                BottomArea: [],
                LeftArea: [],
            };
        }

        const visited = Array.from({ length: numRows }, () =>
            Array(numCols).fill(false)
        );

        const directions = [
            [-1, 0], // trên
            [1, 0],  // dưới
            [0, -1], // trái
            [0, 1],  // phải
        ];

        function dfs(r, c, area) {
            if (
                r < 0 || r >= numRows ||
                c < 0 || c >= numCols ||
                visited[r][c] ||
                playTable[r][c].value !== oppositePlayer
            ) {
                return;
            }
            visited[r][c] = true;
            area.push([r, c]);

            for (let [dr, dc] of directions) {
                dfs(r + dr, c + dc, area);
            }
        }

        // Kết quả tách riêng từng hướng
        const TopArea = [];
        const RightArea = [];
        const BottomArea = [];
        const LeftArea = [];

        // 4 hướng chính
        const neighbors = {
            TopArea: [row - 1, col],
            RightArea: [row, col + 1],
            BottomArea: [row + 1, col],
            LeftArea: [row, col - 1],
        };

        for (let key of Object.keys(neighbors)) {
            const [nr, nc] = neighbors[key];
            if (
                nr >= 0 && nr < numRows &&
                nc >= 0 && nc < numCols &&
                playTable[nr][nc].value === oppositePlayer &&
                !visited[nr][nc]
            ) {
                dfs(nr, nc, eval(key)); // gọi dfs và đổ vào đúng mảng
            }
        }

        return { TopArea, RightArea, BottomArea, LeftArea };
    }

    function getAreaAround(playTable, area) {
        const numRows = playTable.length;
        const numCols = playTable[0].length;

        const directions = [
            [-1, 0], // trên
            [1, 0],  // dưới
            [0, -1], // trái
            [0, 1],  // phải
        ];

        const AreaAround = [];
        const visited = new Set(); // để tránh thêm trùng

        for (let [r, c] of area) {
            for (let [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;

                if (
                    nr >= 0 && nr < numRows &&
                    nc >= 0 && nc < numCols &&
                    playTable[nr][nc].value === 0
                ) {
                    const key = `${nr},${nc}`;
                    if (!visited.has(key)) {
                        visited.add(key);
                        AreaAround.push([nr, nc]);
                    }
                }
            }
        }

        return AreaAround;
    }

    function clearAreaIfSurrounded(playTable, area) {
        const around = getAreaAround(playTable, area);

        if (around.length === 0) {
            for (let [r, c] of area) {
                playTable[r][c].value = 0;
            }
        }
    }

    function getPlayerRegion(playTable, row, col, player) {
        const numRows = playTable.length;
        const numCols = playTable[0].length;

        if (playTable[row][col].value !== player) {
            return [];
        }

        const directions = [
            [-1, 0], // trên
            [1, 0],  // dưới
            [0, -1], // trái
            [0, 1],  // phải
        ];

        const visited = Array.from({ length: numRows }, () =>
            Array(numCols).fill(false)
        );
        const region = [];

        function dfs(r, c) {
            if (
                r < 0 || r >= numRows ||
                c < 0 || c >= numCols ||
                visited[r][c] ||
                playTable[r][c].value !== player
            ) {
                return;
            }

            visited[r][c] = true;
            region.push([r, c]);

            for (let [dr, dc] of directions) {
                dfs(r + dr, c + dc);
            }
        }

        dfs(row, col);

        return region;
    }



    const remarkCell = () => {
        if (Path.length <= 0) {
            console.log('Path.length <= 0');
            return;
        }

        setHasWon(0);
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
