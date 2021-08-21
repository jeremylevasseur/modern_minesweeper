import React, { useState, useEffect, useReducer } from 'react';
import './main.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    GameSection,
    GameWrapper,
    MinesweeperBoard,
    NewGameButton,
    ArrowForward,
    ArrowRight
} from './PlayElements';

const Play = () => {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [rows, setRows] = useState(16);
    const [columns, setColumns] = useState(30);
    const [numberOfMines, setNumberOfMines] = useState(90);
    const [grid, setGrid] = useState([]);

    useEffect(() => {

        // ------------ Setting Up Empty Grid ------------- //

        const placeholderGrid = [];  // Will be used to change state variable
        for (let i = 0; i < rows; i++) {

            placeholderGrid[i] = [];

            for (let j = 0; j < columns; j++) {

                placeholderGrid[i][j] = {
                    'row': i,
                    'column': j,
                    'clicked': false,
                    'isMine': false,
                    'isMineClicked': false,
                    'isFlagged': false,
                    'cellNumber': 0
                }

            }

        }

        // ------------ Adding Mines To Grid ------------- //
        let numberOfMinesSet = 0;
        while (numberOfMinesSet < numberOfMines) {

            let randomRow = Math.floor(Math.random() * rows);
            let randomColumn = Math.floor(Math.random() * columns);

            let randomCell = placeholderGrid[randomRow][randomColumn];

            if (randomCell['isMine'] === false) {
                placeholderGrid[randomRow][randomColumn]['isMine'] = true;
                numberOfMinesSet += 1;
            }

        }


        // ------------ Now Setting The Cell Number For Each Cell ------------- //
        for (var i = 0; i < placeholderGrid.length; i++) {

            for (var j = 0; j < placeholderGrid[i].length; j++) {

                var numberOfSurroundingMines = 0;
                var isMine = placeholderGrid[i][j]['isMine'];

                if (!isMine) {

                    // Must check all cells surrounding this cell to count mines

                    var searchingIndices = [
                        [i - 1, j - 1],
                        [i - 1, j],
                        [i - 1, j + 1],
                        [i, j - 1],
                        [i, j + 1],
                        [i + 1, j - 1],
                        [i + 1, j],
                        [i + 1, j + 1]
                    ];

                    for (var k = 0; k < searchingIndices.length; k++) {
                        try {
                            if (placeholderGrid[searchingIndices[k][0]][searchingIndices[k][1]]['isMine'] === true) {
                                numberOfSurroundingMines += 1;
                            }
                        } catch(err) {
                            continue;
                        }
                    }

                    placeholderGrid[i][j]['cellNumber'] = numberOfSurroundingMines;

                }


            }

        }

        setGrid(placeholderGrid);

    }, []);

    const newGame = () => {
        console.log("New Game");
    }

    const handleCellClick = (e) => {
        const clickedRow = parseInt(e.split('-')[0]);
        const clickedColumn = parseInt(e.split('-')[1]);

        var tempGrid = grid;

        var isMine = tempGrid[clickedRow][clickedColumn]['isMine'];

        if (isMine) {
            tempGrid[clickedRow][clickedColumn]['clicked'] = true;
            tempGrid[clickedRow][clickedColumn]['isMineClicked'] = true;
        } else {
            tempGrid[clickedRow][clickedColumn]['clicked'] = true;
        }

        setGrid(tempGrid);
        forceUpdate();
        
    }

    const handleRightClick = (e) => {
        // e.preventDefault();
        const clickedRow = parseInt(e.split('-')[0]);
        const clickedColumn = parseInt(e.split('-')[1]);

        var tempGrid = grid;

        var oldIsFlagged = grid[clickedRow][clickedColumn]['isFlagged'];

        if (oldIsFlagged) {
            tempGrid[clickedRow][clickedColumn]['isFlagged'] = false;
        } else {
            tempGrid[clickedRow][clickedColumn]['isFlagged'] = true;
        }

        setGrid(tempGrid);
        forceUpdate();
    }

    const gridItems = grid.map((rowCells, rowIndex) => {
        grid[index].map((cell, columnIndex) => {
            
        });
    });

    // const gridItems = grid.map((grid) => {
    //     return <div
    //             key={grid.row.toString() + '-' + grid.column.toString()}
    //             className={
    //                 grid.isMineClicked ? 'gridItem isMineClicked'
    //                 : grid.isFlagged ? 'gridItem isFlagged hover'
    //                 : grid.cellNumber === 0 ? 'gridItem zero'
    //                 : grid.cellNumber === 1 ? 'gridItem one'
    //                 : grid.cellNumber === 2 ? 'gridItem two'
    //                 : grid.cellNumber === 3 ? 'gridItem three'
    //                 : grid.cellNumber === 4 ? 'gridItem four'
    //                 : grid.cellNumber === 5 ? 'gridItem five'
    //                 : grid.cellNumber === 6 ? 'gridItem six'
    //                 : grid.cellNumber === 7 ? 'gridItem seven'
    //                 : grid.cellNumber === 8 ? 'gridItem eight'
    //                 : 'gridItem hover'
    //             }
    //             onClick={() => handleCellClick(grid.row.toString() + '-' + grid.column.toString())}
    //             onContextMenu={(e) => {
    //                 e.preventDefault();
    //                 handleRightClick(grid.row.toString() + '-' + grid.column.toString())
    //             }}
    //         ></div>
    // });

    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    }

    return (
        <>
            <Navbar />
            <GameSection>
                <GameWrapper>
                    <MinesweeperBoard>
                        {/* <div className="grid">{gridItems}</div> */}
                    </MinesweeperBoard>
                </GameWrapper>
                <NewGameButton
                    to="newgame"
                    onMouseEnter={onHover}
                    onMouseLeave={onHover}
                    onClick={newGame}
                    primary="true"
                    dark="true"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact='true'
                    offset={-80}
                >
                    New Game {hover ? <ArrowForward /> : <ArrowRight />}   
                </NewGameButton>
            </GameSection>
            <Footer />
        </>
    )
}

export default Play
