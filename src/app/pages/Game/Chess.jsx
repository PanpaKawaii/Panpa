import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Chess.css';

export default function Chess() {
    console.log('Chess rerender');

    const [PlayTable, setPlayTable] = useState([]);

    const InitialPlayTable = [
        [-5, -4, -3, -2, -1, -3, -4, -5],
        [-6, -6, -6, -6, -6, -6, -6, -6],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [6, 6, 6, 6, 6, 6, 6, 6],
        [5, 4, 3, 2, 1, 3, 4, 5]
    ]

    const TestRandomPlayTable = [
        [-5, -4, -3, -2, -1, 6, -4, -5],
        [-6, -6, -6, -6, -6, -6, -6, -6],
        [0, -6, -6, 3, 0, 0, 0, 0],
        [0, 0, 2, 0, 0, -3, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [-2, 6, -1, 0, 1, -3, 5, 0],
        [6, 6, 6, 6, 6, 6, 6, 6],
        [5, 4, 3, 2, 1, 3, 4, 5]
    ]

    const TestNothingBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, -5, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ]

    const TestCastling = [
        [-5, 0, 0, 0, -1, 0, 0, -5],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, -1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [5, 0, 0, 0, 1, 0, 0, 5]
    ]

    const TestOnlyKingVsAll = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, -1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 0, 0, 0],
        [1, 2, 3, 4, 5, 0, 0, 0]
    ]

    const [Player, setPlayer] = useState(1);//-1 is Black //1 is White
    const [Pick, setPick] = useState([0, 0, 0]);//[cell, row, col]
    const [AvailablePath, setAvailablePath] = useState([]);//[...newAvailablePath, [row, col]]
    const [Move, setMove] = useState(false);//Is picked to move
    const [Castling, setCastling] = useState([true, true, true, true]);//[LeftBlack, RightBlack, LeftWhite, RightWhite]
    const [EnPassant, setEnPassant] = useState([0, 0, 0]);//[Pick[0], row, col]
    const [Promotion, setPromotion] = useState([0, 0, 0, false]);//[Pick[0], row, col, Is available for promotion]
    const [Rotate, setRotate] = useState(false);

    const [Refresh, setRefresh] = useState(0);

    useEffect(() => {
        setPlayTable(InitialPlayTable);
        // setPlayTable(TestOnlyKingVsAll);

        setPlayer(1);
        setPick([0, 0, 0]);
        setAvailablePath([]);
        setMove(false);
        setCastling([true, true, true, true]);
        setEnPassant([0, 0, 0]);
        setPromotion([0, 0, 0, false]);//==================================================================================================Change to false
        setRotate(false);

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                let redcell = document.getElementById(`cell-${row}-${col}`);
                redcell?.classList.remove('moveablecell');
                let pickcell = document.getElementById(`cell-${row}-${col}`);
                pickcell?.classList.remove('pickedcell');
            }
        }

        // setPath([]);
        // setLastStep({ row: null, col: null });
        // setHasWon(0);
        // setConstantCell([]);
    }, [Refresh]);

    const handlePickAndShowPath = (cell, row, col) => {
        if (cell * Player <= 0) {//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////OPEN IT
            if (Player === 1) console.log(`It is White's turn`);
            else if (Player === -1) console.log(`It is Black's turn`);
            return;
        }
        console.log('handleShowPath');

        setPick(p => [cell, row, col]);
        setMove(p => !p);
        let newAvailablePath = [];
        if (cell === 1 || cell === -1) {//////////////////////////////////////////////////////////////////////////////////////////////////// King
            console.log('1: King');
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newRow = row + i;
                    const newCol = col + j;
                    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                        if (PlayTable[newRow][newCol] * cell <= 0) {
                            let redcell = document.getElementById(`cell-${newRow}-${newCol}`);
                            redcell.classList.add('moveablecell');
                            newAvailablePath = [...newAvailablePath, [newRow, newCol]];
                        }
                    }
                }
            };
            if (//Nhập thành King đen cánh trái
                cell === -1 &&
                PlayTable[row][col - 1] === 0 && checkIsHavingEnemies(row, col - 1, PlayTable) === false &&
                PlayTable[row][col - 2] === 0 && checkIsHavingEnemies(row, col - 2, PlayTable) === false &&
                PlayTable[row][col - 3] === 0 && checkIsHavingEnemies(row, col - 3, PlayTable) === false &&
                Castling[0] === true
            ) {
                let redcell = document.getElementById(`cell-${row}-${col - 2}`);
                redcell.classList.add('moveablecell');
                newAvailablePath = [...newAvailablePath, [row, col - 2]];
            }
            if (//Nhập thành King đen cánh phải
                cell === -1 &&
                PlayTable[row][col + 1] === 0 && checkIsHavingEnemies(row, col + 1, PlayTable) === false &&
                PlayTable[row][col + 2] === 0 && checkIsHavingEnemies(row, col + 2, PlayTable) === false &&
                Castling[1] === true
            ) {
                let redcell = document.getElementById(`cell-${row}-${col + 2}`);
                redcell.classList.add('moveablecell');
                newAvailablePath = [...newAvailablePath, [row, col + 2]];
            }
            if (//Nhập thành King trắng cánh trái
                cell === 1 &&
                PlayTable[row][col - 1] === 0 && checkIsHavingEnemies(row, col - 1, PlayTable) === false &&
                PlayTable[row][col - 2] === 0 && checkIsHavingEnemies(row, col - 2, PlayTable) === false &&
                PlayTable[row][col - 3] === 0 && checkIsHavingEnemies(row, col - 3, PlayTable) === false &&
                Castling[2] === true
            ) {
                let redcell = document.getElementById(`cell-${row}-${col - 2}`);
                redcell.classList.add('moveablecell');
                newAvailablePath = [...newAvailablePath, [row, col - 2]];
            }
            if (//Nhập thành King trắng cánh phải
                cell === 1 &&
                PlayTable[row][col + 1] === 0 && checkIsHavingEnemies(row, col + 1, PlayTable) === false &&
                PlayTable[row][col + 2] === 0 && checkIsHavingEnemies(row, col + 2, PlayTable) === false &&
                Castling[3] === true
            ) {
                let redcell = document.getElementById(`cell-${row}-${col + 2}`);
                redcell.classList.add('moveablecell');
                newAvailablePath = [...newAvailablePath, [row, col + 2]];
            }
            console.log('Before', newAvailablePath);
            newAvailablePath = eliminateUnavailablePath(newAvailablePath, row, col);
            console.log('After', newAvailablePath);
            setAvailablePath(p => newAvailablePath);
        } else if (cell === 2 || cell === -2) {//////////////////////////////////////////////////////////////////////////////////////////////////// Queen
            console.log('2: Queen');
            for (let i = 1; i < 8; i++) {
                if (row - i >= 0 && col + i < 8) {// Up-right diagonal
                    if (PlayTable[row - i][col + i] * cell === 0) {
                        let redcell = document.getElementById(`cell-${row - i}-${col + i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row - i, col + i]];
                    } else if (PlayTable[row - i][col + i] * cell < 0) {
                        let redcell = document.getElementById(`cell-${row - i}-${col + i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row - i, col + i]];
                        break;
                    } else break;
                }
            }
            for (let i = 1; i < 8; i++) {
                if (row - i >= 0 && col - i >= 0) {// Up-left diagonal
                    if (PlayTable[row - i][col - i] * cell === 0) {
                        let redcell = document.getElementById(`cell-${row - i}-${col - i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row - i, col - i]];
                    } else if (PlayTable[row - i][col - i] * cell < 0) {
                        let redcell = document.getElementById(`cell-${row - i}-${col - i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row - i, col - i]];
                        break;
                    } else break;
                }
            }
            for (let i = 1; i < 8; i++) {
                if (row + i < 8 && col + i < 8) {// Down-right diagonal
                    if (PlayTable[row + i][col + i] * cell === 0) {
                        let redcell = document.getElementById(`cell-${row + i}-${col + i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row + i, col + i]];
                    } else if (PlayTable[row + i][col + i] * cell < 0) {
                        let redcell = document.getElementById(`cell-${row + i}-${col + i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row + i, col + i]];
                        break;
                    } else break;
                }
            }
            for (let i = 1; i < 8; i++) {
                if (row + i < 8 && col - i >= 0) {// Down-left diagonal
                    if (PlayTable[row + i][col - i] * cell === 0) {
                        let redcell = document.getElementById(`cell-${row + i}-${col - i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row + i, col - i]];
                    } else if (PlayTable[row + i][col - i] * cell < 0) {
                        let redcell = document.getElementById(`cell-${row + i}-${col - i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row + i, col - i]];
                        break;
                    } else break;
                }
            }
            for (let i = 1; i < 8; i++) {
                if (row - i >= 0) {// Up line
                    if (PlayTable[row - i][col] * cell === 0) {
                        let redcell = document.getElementById(`cell-${row - i}-${col}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row - i, col]];
                    } else if (PlayTable[row - i][col] * cell < 0) {
                        let redcell = document.getElementById(`cell-${row - i}-${col}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row - i, col]];
                        break;
                    } else break;
                }
            }
            for (let i = 1; i < 8; i++) {
                if (row + i < 8) {// Down line
                    if (PlayTable[row + i][col] * cell === 0) {
                        let redcell = document.getElementById(`cell-${row + i}-${col}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row + i, col]];
                    } else if (PlayTable[row + i][col] * cell < 0) {
                        let redcell = document.getElementById(`cell-${row + i}-${col}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row + i, col]];
                        break;
                    } else break;
                }
            }
            for (let i = 1; i < 8; i++) {
                if (col - i >= 0) {// Left line
                    if (PlayTable[row][col - i] * cell === 0) {
                        let redcell = document.getElementById(`cell-${row}-${col - i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row, col - i]];
                    } else if (PlayTable[row][col - i] * cell < 0) {
                        let redcell = document.getElementById(`cell-${row}-${col - i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row, col - i]];
                        break;
                    } else break;
                }
            }
            for (let i = 1; i < 8; i++) {
                if (col + i < 8) {// Right line
                    if (PlayTable[row][col + i] * cell === 0) {
                        let redcell = document.getElementById(`cell-${row}-${col + i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row, col + i]];
                    } else if (PlayTable[row][col + i] * cell < 0) {
                        let redcell = document.getElementById(`cell-${row}-${col + i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row, col + i]];
                        break;
                    } else break;
                }
            }
            setAvailablePath(p => newAvailablePath);
        } else if (cell === 3 || cell === -3) {//////////////////////////////////////////////////////////////////////////////////////////////////// Bishop
            console.log('3: Bishop');
            for (let i = 1; i < 8; i++) {
                if (row - i >= 0 && col + i < 8) {// Up-right diagonal
                    if (PlayTable[row - i][col + i] * cell === 0) {
                        let redcell = document.getElementById(`cell-${row - i}-${col + i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row - i, col + i]];
                    } else if (PlayTable[row - i][col + i] * cell < 0) {
                        let redcell = document.getElementById(`cell-${row - i}-${col + i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row - i, col + i]];
                        break;
                    } else break;
                }
            }
            for (let i = 1; i < 8; i++) {
                if (row - i >= 0 && col - i >= 0) {// Up-left diagonal
                    if (PlayTable[row - i][col - i] * cell === 0) {
                        let redcell = document.getElementById(`cell-${row - i}-${col - i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row - i, col - i]];
                    } else if (PlayTable[row - i][col - i] * cell < 0) {
                        let redcell = document.getElementById(`cell-${row - i}-${col - i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row - i, col - i]];
                        break;
                    } else break;
                }
            }
            for (let i = 1; i < 8; i++) {
                if (row + i < 8 && col + i < 8) {// Down-right diagonal
                    if (PlayTable[row + i][col + i] * cell === 0) {
                        let redcell = document.getElementById(`cell-${row + i}-${col + i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row + i, col + i]];
                    } else if (PlayTable[row + i][col + i] * cell < 0) {
                        let redcell = document.getElementById(`cell-${row + i}-${col + i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row + i, col + i]];
                        break;
                    } else break;
                }
            }
            for (let i = 1; i < 8; i++) {
                if (row + i < 8 && col - i >= 0) {// Down-left diagonal
                    if (PlayTable[row + i][col - i] * cell === 0) {
                        let redcell = document.getElementById(`cell-${row + i}-${col - i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row + i, col - i]];
                    } else if (PlayTable[row + i][col - i] * cell < 0) {
                        let redcell = document.getElementById(`cell-${row + i}-${col - i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row + i, col - i]];
                        break;
                    } else break;
                }
            }
            setAvailablePath(p => newAvailablePath);
        } else if (cell === 4 || cell === -4) {//////////////////////////////////////////////////////////////////////////////////////////////////// Knight
            console.log('4: Knight');
            const KnightPath = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]]
            for (const path of KnightPath) {
                const newRow = row + path[0];
                const newCol = col + path[1];
                if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                    if (PlayTable[newRow][newCol] * cell <= 0) {
                        let redcell = document.getElementById(`cell-${newRow}-${newCol}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [newRow, newCol]];
                    }
                }
            }
            setAvailablePath(p => newAvailablePath);
        } else if (cell === 5 || cell === -5) {//////////////////////////////////////////////////////////////////////////////////////////////////// Rook
            console.log('5: Rook');
            for (let i = 1; i < 8; i++) {
                if (row - i >= 0) {// Up line
                    if (PlayTable[row - i][col] * cell === 0) {
                        let redcell = document.getElementById(`cell-${row - i}-${col}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row - i, col]];
                    } else if (PlayTable[row - i][col] * cell < 0) {
                        let redcell = document.getElementById(`cell-${row - i}-${col}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row - i, col]];
                        break;
                    } else break;
                }
            }
            for (let i = 1; i < 8; i++) {
                if (row + i < 8) {// Down line
                    if (PlayTable[row + i][col] * cell === 0) {
                        let redcell = document.getElementById(`cell-${row + i}-${col}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row + i, col]];
                    } else if (PlayTable[row + i][col] * cell < 0) {
                        let redcell = document.getElementById(`cell-${row + i}-${col}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row + i, col]];
                        break;
                    } else break;
                }
            }
            for (let i = 1; i < 8; i++) {
                if (col - i >= 0) {// Left line
                    if (PlayTable[row][col - i] * cell === 0) {
                        let redcell = document.getElementById(`cell-${row}-${col - i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row, col - i]];
                    } else if (PlayTable[row][col - i] * cell < 0) {
                        let redcell = document.getElementById(`cell-${row}-${col - i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row, col - i]];
                        break;
                    } else break;
                }
            }
            for (let i = 1; i < 8; i++) {
                if (col + i < 8) {// Right line
                    if (PlayTable[row][col + i] * cell === 0) {
                        let redcell = document.getElementById(`cell-${row}-${col + i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row, col + i]];
                    } else if (PlayTable[row][col + i] * cell < 0) {
                        let redcell = document.getElementById(`cell-${row}-${col + i}`);
                        redcell.classList.add('moveablecell');
                        newAvailablePath = [...newAvailablePath, [row, col + i]];
                        break;
                    } else break;
                }
            }
            setAvailablePath(p => newAvailablePath);
        } else if (cell === 6) {//////////////////////////////////////////////////////////////////////////////////////////////////// Pawn White
            console.log('6: Pawn');
            if (PlayTable[row - 1][col] * cell === 0) {
                let redcellup1 = document.getElementById(`cell-${row - 1}-${col}`);
                redcellup1.classList.add('moveablecell');
                newAvailablePath = [...newAvailablePath, [row - 1, col]];

                if (row === 6 && PlayTable[row - 2][col] * cell === 0) {
                    let redcellup2 = document.getElementById(`cell-${row - 2}-${col}`);
                    redcellup2.classList.add('moveablecell');
                    newAvailablePath = [...newAvailablePath, [row - 2, col]];
                }
            }
            if (col > 0 && PlayTable[row - 1][col - 1] * cell < 0) {
                let redcellleft = document.getElementById(`cell-${row - 1}-${col - 1}`);
                redcellleft.classList.add('moveablecell');
                newAvailablePath = [...newAvailablePath, [row - 1, col - 1]];
            }
            if (col < 7 && PlayTable[row - 1][col + 1] * cell < 0) {
                let redcellright = document.getElementById(`cell-${row - 1}-${col + 1}`);
                redcellright.classList.add('moveablecell');
                newAvailablePath = [...newAvailablePath, [row - 1, col + 1]];
            }
            if (EnPassant[0] === -6 && row === EnPassant[1] && (col === EnPassant[2] - 1 || col === EnPassant[2] + 1)) {
                let redcellenpassant = document.getElementById(`cell-${EnPassant[1] - 1}-${EnPassant[2]}`);
                redcellenpassant.classList.add('moveablecell');
                newAvailablePath = [...newAvailablePath, [EnPassant[1] - 1, EnPassant[2]]];
            }
            setAvailablePath(p => newAvailablePath);
        } else if (cell === -6) {//////////////////////////////////////////////////////////////////////////////////////////////////// Pawn Black
            console.log('6: Pawn');
            if (PlayTable[row + 1][col] * cell === 0) {
                let redcelldown1 = document.getElementById(`cell-${row + 1}-${col}`);
                redcelldown1.classList.add('moveablecell');
                newAvailablePath = [...newAvailablePath, [row + 1, col]];

                if (row === 1 && PlayTable[row + 2][col] * cell === 0) {
                    let redcelldown2 = document.getElementById(`cell-${row + 2}-${col}`);
                    redcelldown2.classList.add('moveablecell');
                    newAvailablePath = [...newAvailablePath, [row + 2, col]];
                }
            }
            if (col > 0 && PlayTable[row + 1][col - 1] * cell < 0) {
                let redcellleft = document.getElementById(`cell-${row + 1}-${col - 1}`);
                redcellleft.classList.add('moveablecell');
                newAvailablePath = [...newAvailablePath, [row + 1, col - 1]];
            }
            if (col < 7 && PlayTable[row + 1][col + 1] * cell < 0) {
                let redcellright = document.getElementById(`cell-${row + 1}-${col + 1}`);
                redcellright.classList.add('moveablecell');
                newAvailablePath = [...newAvailablePath, [row + 1, col + 1]];
            }
            if (EnPassant[0] === 6 && row === EnPassant[1] && (col === EnPassant[2] - 1 || col === EnPassant[2] + 1)) {
                let redcellenpassant = document.getElementById(`cell-${EnPassant[1] + 1}-${EnPassant[2]}`);
                redcellenpassant.classList.add('moveablecell');
                newAvailablePath = [...newAvailablePath, [EnPassant[1] + 1, EnPassant[2]]];
            }
            setAvailablePath(p => newAvailablePath);
        }

        let pickcell = document.getElementById(`cell-${row}-${col}`);
        pickcell.classList.add('pickedcell');
    }


    const eliminateUnavailablePath = (AvailablePath, itsrow, itscol) => {
        let NeedEliminating = [];
        let newPlayTable = PlayTable.map(row => [...row]);
        newPlayTable[itsrow][itscol] = 0;
        console.log('itsrow', itsrow);
        console.log('itscol', itscol);
        console.log('PlayTable', PlayTable);
        console.log('newPlayTable', newPlayTable);

        for (const path of AvailablePath) {
            if (checkIsHavingEnemies(path[0], path[1], newPlayTable)) {
                NeedEliminating = [...NeedEliminating, [path[0], path[1]]];
                let redcell = document.getElementById(`cell-${path[0]}-${path[1]}`);
                redcell.classList.remove('moveablecell');
            }
        }
        console.log('NeedEliminating', NeedEliminating);
        let DoneAvailablePath = AvailablePath.filter(path => !NeedEliminating.some(needPath => needPath[0] === path[0] && needPath[1] === path[1]));
        return DoneAvailablePath;
    }

    const checkIsHavingEnemies = (row, col, PlayTable) => {
        // console.log('checkIsHavingEnemies');
        if (row - Player >= 0 && row - Player <= 7 && col - Player >= 0 && col - Player <= 7) {
            if (PlayTable[row - Player][col - Player] === Player * (-6)) {
                console.log('Pawn 1', row, col);
                return true;
            }
        }
        if (row - Player >= 0 && row - Player <= 7 && col + Player >= 0 && col + Player <= 7) {
            if (PlayTable[row - Player][col + Player] === Player * (-6)) {
                console.log('Pawn 2', row, col);
                return true;
            }
        }
        console.log('Start Up-right', row, col);
        for (let i = 1; i < 8; i++) {// Up-right diagonal
            const newRow = row - i;
            const newCol = col + i;
            if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
                if (PlayTable[newRow][newCol] === Player * (-2) || PlayTable[newRow][newCol] === Player * (-3)) {
                    console.log('Up-right', row, col);
                    return true;
                } else if (PlayTable[newRow][newCol] !== Player * (-2) && PlayTable[newRow][newCol] !== Player * (-3) && PlayTable[newRow][newCol] !== 0) {
                    break;
                }
            } else break;
        }
        console.log('Start Up-left', row, col);
        for (let i = 1; i < 8; i++) {// Up-left diagonal
            const newRow = row - i;
            const newCol = col - i;
            if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
                if (PlayTable[newRow][newCol] === Player * (-2) || PlayTable[newRow][newCol] === Player * (-3)) {
                    console.log('Up-left', row, col);
                    return true;
                } else if (PlayTable[newRow][newCol] !== Player * (-2) && PlayTable[newRow][newCol] !== Player * (-3) && PlayTable[newRow][newCol] !== 0) {
                    break;
                }
            } else break;
        }
        // console.log('Start Down-right', row, col);
        for (let i = 1; i < 8; i++) {// Down-right diagonal
            const newRow = row + i;
            const newCol = col + i;
            if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
                if (PlayTable[newRow][newCol] === Player * (-2) || PlayTable[newRow][newCol] === Player * (-3)) {
                    console.log('Down-right', row, col);
                    return true;
                } else if (PlayTable[newRow][newCol] !== Player * (-2) && PlayTable[newRow][newCol] !== Player * (-3) && PlayTable[newRow][newCol] !== 0) {
                    break;
                }
            } else break;
        }
        // console.log('Start Down-left', row, col);
        for (let i = 1; i < 8; i++) {// Down-left diagonal
            const newRow = row + i;
            const newCol = col - i;
            if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
                if (PlayTable[newRow][newCol] === Player * (-2) || PlayTable[newRow][newCol] === Player * (-3)) {
                    console.log('Down-left', row, col);
                    return true;
                } else if (PlayTable[newRow][newCol] !== Player * (-2) && PlayTable[newRow][newCol] !== Player * (-3) && PlayTable[newRow][newCol] !== 0) {
                    break;
                }
            } else break;
        }

        // console.log('Start Up', row, col);
        for (let i = 1; i < 8; i++) {// Up line
            const newRow = row - i;
            const newCol = col;
            if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
                if (PlayTable[newRow][newCol] === Player * (-2) || PlayTable[newRow][newCol] === Player * (-5)) {
                    console.log('Up line', row, col);
                    return true;
                } else if (PlayTable[newRow][newCol] !== Player * (-2) && PlayTable[newRow][newCol] !== Player * (-5) && PlayTable[newRow][newCol] !== 0) {
                    break;
                }
            } else break;
        }
        // console.log('Start Down', row, col);
        for (let i = 1; i < 8; i++) {// Down line
            const newRow = row + i;
            const newCol = col;
            if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
                if (PlayTable[newRow][newCol] === Player * (-2) || PlayTable[newRow][newCol] === Player * (-5)) {
                    console.log('Down line', row, col);
                    return true;
                } else if (PlayTable[newRow][newCol] !== Player * (-2) && PlayTable[newRow][newCol] !== Player * (-5) && PlayTable[newRow][newCol] !== 0) {
                    break;
                }
            } else break;
        }
        // console.log('Start Left', row, col);
        for (let i = 1; i < 8; i++) {// Left line
            const newRow = row;
            const newCol = col - i;
            if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
                if (PlayTable[newRow][newCol] === Player * (-2) || PlayTable[newRow][newCol] === Player * (-5)) {
                    console.log('Left line', row, col);
                    return true;
                } else if (PlayTable[newRow][newCol] !== Player * (-2) && PlayTable[newRow][newCol] !== Player * (-5) && PlayTable[newRow][newCol] !== 0) {
                    break;
                }
            } else break;
        }
        // console.log('Start Right', row, col);
        for (let i = 1; i < 8; i++) {// Right line
            const newRow = row;
            const newCol = col + i;
            if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
                if (PlayTable[newRow][newCol] === Player * (-2) || PlayTable[newRow][newCol] === Player * (-5)) {
                    console.log('Right line', row, col);
                    return true;
                } else if (PlayTable[newRow][newCol] !== Player * (-2) && PlayTable[newRow][newCol] !== Player * (-5) && PlayTable[newRow][newCol] !== 0) {
                    break;
                }
            } else break;
        }

        console.log('Start Knight', row, col);
        const KnightPath = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]]
        for (const path of KnightPath) {
            const newRow = row + path[0];
            const newCol = col + path[1];
            if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
                if (PlayTable[newRow][newCol] === Player * (-4)) {
                    console.log('Have Knight', row, col);
                    return true;
                }
            }
        }
        return false;
    }

    {/*
        Vua không được đi vào ô bị chiếu
        Vua bị chiếu thì không được nhập thành!!!
        Quân mình sau khi đi thì Vua mình không được bị chiếu
    */ }






    const handleMoveTo = (row, col) => {
        console.log('handleMoveTo');

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                let redcell = document.getElementById(`cell-${row}-${col}`);
                redcell.classList.remove('moveablecell');
                let pickcell = document.getElementById(`cell-${row}-${col}`);
                pickcell.classList.remove('pickedcell');
            }
        }

        if (AvailablePath.some(path => path[0] === row && path[1] === col)) {
            let newPlayTable = [...PlayTable];
            newPlayTable[row][col] = Pick[0];
            newPlayTable[Pick[1]][Pick[2]] = 0;
            // Nếu vừa thực hiện nước đi của King
            if (// Nếu King đen hoặc trắng còn cơ hội nhập thành và thực hiện nước đi nhập thành
                (Pick[0] === -1 && Castling[0] === true && Pick[2] - 2 === col) ||
                (Pick[0] === -1 && Castling[1] === true && Pick[2] + 2 === col) ||
                (Pick[0] === 1 && Castling[2] === true && Pick[2] - 2 === col) ||
                (Pick[0] === 1 && Castling[3] === true && Pick[2] + 2 === col)

            ) {
                newPlayTable[row][(col + Pick[2]) / 2] = Pick[0] * 5;// Xuất hiện Rook ở giữa 2 ô của King
                newPlayTable[row][col > Pick[2] ? 7 : 0] = 0;// Nếu nhập thành bên phải thì Rook phải đi qua, nhập thành bên trái thì Rook trái đi qua
            }
            // Bất cứ khi nào King di chuyển đều sẽ mất cơ hội nhập thành
            let newCastling = [...Castling];
            newCastling[Pick[0] === -1 && 0] = false;
            newCastling[Pick[0] === -1 && 1] = false;
            newCastling[Pick[0] === 1 && 2] = false;
            newCastling[Pick[0] === 1 && 3] = false;
            // Bất cứ khi nào Rook di chuyển đều sẽ mất cơ hội nhập thành cánh Rook đó
            newCastling[Pick[0] === -5 && Pick[1] === 0 && Pick[2] === 0 && 0] = false;
            newCastling[Pick[0] === -5 && Pick[1] === 0 && Pick[2] === 7 && 1] = false;
            newCastling[Pick[0] === 5 && Pick[1] === 7 && Pick[2] === 0 && 2] = false;
            newCastling[Pick[0] === 5 && Pick[1] === 7 && Pick[2] === 7 && 3] = false;
            setCastling(newCastling);

            // Pawn thực hiện nước đi
            if (Pick[0] === 6 || Pick[0] === -6) {// Nếu đó là Pawn trắng hoặc đen
                // Nếu thực hiện nước đi En Passant
                if (((row === EnPassant[1] - 1 && Pick[0] === 6) || (row === EnPassant[1] + 1 && Pick[0] === -6)) && col === EnPassant[2]) {
                    newPlayTable[EnPassant[1]][EnPassant[2]] = 0;
                }
                // Nếu thực hiện nước đi Promotion
                if ((Pick[0] === 6 && row === 0) || (Pick[0] === -6 && row === 7)) {
                    setPromotion([Pick[0], row, col, true]);
                }
            }

            // Bất kỳ nước đi nào được thực hiện đều sẽ xóa khả năng En Passant
            if (EnPassant[0] !== 0) setEnPassant([0, 0, 0]);

            // Pawn thực hiện nước đi 2 bước
            if (Pick[0] === 6 || Pick[0] === -6) {// Nếu đó là Pawn trắng hoặc đen
                // Nếu thực hiện nước đi 2 bước
                if (Pick[1] + 2 === row || Pick[1] - 2 === row) {
                    setEnPassant(p => [Pick[0], row, col]);
                }
            }

            setPlayTable(p => newPlayTable);
            setPlayer(p => -p);//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////OPEN IT
        }

        setPick(p => [0, 0, 0]);
        setAvailablePath([]);
        setMove(p => !p);

    }

    const handlePromote = (value) => {
        let newPlayTable = [...PlayTable];
        newPlayTable[Promotion[1]][Promotion[2]] = value;
        setPlayTable(p => newPlayTable);
        setPromotion(p => [0, 0, 0, !p[3]])
    }










    const [GameMode, setGameMode] = useState({
        RowCount: 8,
        ColCount: 8,
        ConstantToWin: 5
    });
    const [SelectedGameMode, setSelectedGameMode] = useState('LargeMap');

    const changeGameMode = (Mode) => {
        const NewGameMode = { ...GameMode };
        if (Mode === 'LargeMap') {
            NewGameMode.RowCount = 24;
            NewGameMode.ColCount = 20;
            NewGameMode.ConstantToWin = 5;
        } else if (Mode === 'TicTacToe') {
            NewGameMode.RowCount = 3;
            NewGameMode.ColCount = 3;
            NewGameMode.ConstantToWin = 3;
        } else {
            NewGameMode.RowCount = 10;
            NewGameMode.ColCount = 10;
            NewGameMode.ConstantToWin = 4;
        }
        console.log('Set Game Mode', Mode);
        const NewPlayTable = Array(NewGameMode.RowCount).fill(0).map(() =>
            Array(NewGameMode.ColCount).fill(0).map(() => ({ value: 0 }))
        );
        setPlayTable(NewPlayTable);
        setGameMode(NewGameMode);
    }



    const [HasWon, setHasWon] = useState(0);
    const [ConstantCell, setConstantCell] = useState([]);
    const [Path, setPath] = useState([]);
    const [LastStep, setLastStep] = useState({
        row: null,
        col: null
    });

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
        <div className='chess-container'>
            <div className='heading'>
                <h1>CHESS</h1>
                {/* <h2 style={{ color: 'red', border: '5px solid red' }}><b>Nhớ đổi lượt chơi trước khi up github</b></h2> */}
            </div>

            <div className='detail'>
                <div>
                    <div className='support'>
                        <Button className='btn' style={{ backgroundColor: Player === 1 ? '#fd4755' : (Player === 2 ? '#01d0fd' : '') }} onClick={() => remarkCell()}>
                            <i className='fa-solid fa-reply'></i>
                        </Button>
                        <Button className='btn' onClick={() => setRefresh(Refresh + 1)}>RESTART</Button>
                        <Button className='btn' onClick={() => setPlayer(PLAYER => -PLAYER)}>SET PLAYER {Player}</Button>
                        <Button className='btn' style={{ backgroundColor: Rotate ? '#ccc' : '#999' }} onClick={() => setRotate(p => !p)} >
                            <i className='fa-regular fa-chess-king black-side' style={{ transform: Rotate && 'rotateZ(180deg)' }}></i>
                            <span> ROTATE </span>
                            <i className='fa-regular fa-chess-king white-side'></i>
                        </Button>
                    </div>
                    <Form.Group controlId='gamemode' className='form-group'>
                        <Form.Control
                            as='select'
                            value={SelectedGameMode}
                            onChange={(e) => { changeGameMode(e.target.value), setSelectedGameMode(e.target.value) }}
                            className={
                                SelectedGameMode === 'LargeMap' ?
                                    'gamemode-option largemap-mode'
                                    :
                                    (SelectedGameMode === 'TicTacToe' ?
                                        'gamemode-option tictactoe-mode'
                                        :
                                        'gamemode-option test-mode'
                                    )
                            }
                        >
                            <option className='gamemode-option' value='LargeMap'>Large Map</option>
                            <option className='gamemode-option' value='TicTacToe'>Tic Tac Toe</option>
                        </Form.Control>
                    </Form.Group>
                    <div>Pick: {Pick[0]} - PickRow: {Pick[1]} - PickCell: {Pick[2]}</div>
                    <div>Move: {Move ? 'True' : 'False'}</div>
                    {/* <p>AvailablePath: {JSON.stringify(AvailablePath)}</p> */}
                    <div>Castle Black: {Castling[0] ? 'True' : 'False'} and {Castling[1] ? 'True' : 'False'}</div>
                    <div>Castle White: {Castling[2] ? 'True' : 'False'} and {Castling[3] ? 'True' : 'False'}</div>
                    <div>EnPassant: {EnPassant[0]} - EnPassantRow: {EnPassant[1]} - EnPassantCell: {EnPassant[2]}</div>
                    <div>Promotion: {Promotion[3] ? 'True' : 'False'} - PromotionPick: {Promotion[0]}</div>
                </div>

                <div className='result'
                    style={{
                        border:
                            HasWon === 1 ?
                                '4px solid #fd4755'
                                :
                                (HasWon === 2 ?
                                    '4px solid #01d0fd'
                                    :
                                    'none'
                                )
                    }}
                >
                    {HasWon === 1 && <h2><b>WON!</b></h2>}
                    {HasWon === 2 && <h2><b>WON!</b></h2>}
                </div>
            </div>

            {/* Main Content =================================================================================================================================================================== */}
            <div className='content'>
                <table
                    className='no-wrap align-middle table'
                    style={{
                        // '--table-width': 8,
                        // '--table-height': 8
                    }}
                >
                    <tbody>
                        {PlayTable.map((row, index_row) => (
                            <tr key={index_row}>
                                {row.map((cell, index_col) => (
                                    <td
                                        key={index_col}
                                        id={`cell-${index_row}-${index_col}`}
                                        className={`${(index_row + index_col) % 2 === 0 ? 'lightcell' : 'darkcell'}`}
                                        style={{
                                            cursor: cell * Player > 0 && 'pointer',
                                        }}
                                        onClick={() => { Move === false ? handlePickAndShowPath(cell, index_row, index_col) : handleMoveTo(index_row, index_col) }}
                                    >
                                        {cell === -1 && <i className='fa-regular fa-chess-king black-side' style={{ transform: Rotate && 'rotateZ(180deg)' }}></i>}
                                        {cell === -2 && <i className='fa-regular fa-chess-queen black-side' style={{ transform: Rotate && 'rotateZ(180deg)' }}></i>}
                                        {cell === -3 && <i className='fa-regular fa-chess-bishop black-side' style={{ transform: Rotate && 'rotateZ(180deg)' }}></i>}
                                        {cell === -4 && <i className='fa-regular fa-chess-knight black-side' style={{ transform: Rotate && 'rotateZ(180deg)' }}></i>}
                                        {cell === -5 && <i className='fa-regular fa-chess-rook black-side' style={{ transform: Rotate && 'rotateZ(180deg)' }}></i>}
                                        {cell === -6 && <i className='fa-regular fa-chess-pawn black-side' style={{ transform: Rotate && 'rotateZ(180deg)' }}></i>}

                                        {cell === 1 && <i className='fa-regular fa-chess-king white-side'></i>}
                                        {cell === 2 && <i className='fa-regular fa-chess-queen white-side'></i>}
                                        {cell === 3 && <i className='fa-regular fa-chess-bishop white-side'></i>}
                                        {cell === 4 && <i className='fa-regular fa-chess-knight white-side'></i>}
                                        {cell === 5 && <i className='fa-regular fa-chess-rook white-side'></i>}
                                        {cell === 6 && <i className='fa-regular fa-chess-pawn white-side'></i>}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>

                    {Promotion[3] &&
                        <tbody className='need-to-be-hidden'>
                            <tr>
                                <td>
                                    <div className='promotion'>
                                        {Promotion[0] === -6 &&
                                            <div className='group-icon black'>
                                                <i className='fa-regular fa-chess-queen black-side' style={{ transform: Rotate && 'rotateZ(180deg)' }} onClick={() => handlePromote(-2)}></i>
                                                <i className='fa-regular fa-chess-bishop black-side' style={{ transform: Rotate && 'rotateZ(180deg)' }} onClick={() => handlePromote(-3)}></i>
                                                <i className='fa-regular fa-chess-knight black-side' style={{ transform: Rotate && 'rotateZ(180deg)' }} onClick={() => handlePromote(-4)}></i>
                                                <i className='fa-regular fa-chess-rook black-side' style={{ transform: Rotate && 'rotateZ(180deg)' }} onClick={() => handlePromote(-5)}></i>
                                            </div>
                                        }
                                        {Promotion[0] === 6 &&
                                            <div className='group-icon white'>
                                                <i className='fa-regular fa-chess-queen white-side' onClick={() => handlePromote(2)}></i>
                                                <i className='fa-regular fa-chess-bishop white-side' onClick={() => handlePromote(3)}></i>
                                                <i className='fa-regular fa-chess-knight white-side' onClick={() => handlePromote(4)}></i>
                                                <i className='fa-regular fa-chess-rook white-side' onClick={() => handlePromote(5)}></i>
                                            </div>
                                        }
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>

                {/* <Table
                    className='no-wrap align-middle table'
                    style={{
                        // '--table-width': 8,
                        // '--table-height': 8
                    }}
                >
                    <tbody>
                        {PlayTable.map((row, index_row) => (
                            <tr key={index_row}>
                                {row.map((cell, index_col) => (
                                    <td
                                        key={index_col}
                                        className={`${(index_row + index_col) % 2 === 0 ? 'lightcell' : 'darkcell'}`}
                                        style={{ backgroundColor: AvailablePath.some(path => path[0] === index_row && path[1] === index_col) ? 'red' : '' }}
                                    >
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table> */}
            </div>
        </div>
    )
}
