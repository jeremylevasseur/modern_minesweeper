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
        const minesGrid = [];  // Will be used for efficiency reasons
        for (let i = 0; i < rows; i++) {

            for (let j = 0; j < columns; j++) {

                let tempElement = {
                    'row': i + 1,
                    'column': j + 1,
                    'clicked': false,
                    'isMine': false,
                    'isMineClicked': false,
                    'cellNumber': 0,
                    'cellNumberZero': false,
                    'cellNumberOne': false,
                    'cellNumberTwo': false,
                    'cellNumberThree': false,
                    'cellNumberFour': false,
                    'cellNumberFive': false,
                    'cellNumberSix': false,
                    'cellNumberSeven': false,
                    'cellNumberEight': false,
                }

                placeholderGrid.push(tempElement);
                
            }

            minesGrid.push(new Array(columns).fill(0));

        }


        // ------------ Adding Mines To Grid ------------- //
        let numberOfMinesSet = 0;
        while (numberOfMinesSet < numberOfMines) {

            let randomRow = Math.floor(Math.random() * rows);
            let randomColumn = Math.floor(Math.random() * columns);

            for (let i = 0; i < placeholderGrid.length; i++) {

                if ( (placeholderGrid[i]['row'] == randomRow + 1) && (placeholderGrid[i]['column'] == randomColumn + 1) ) {

                    // Making sure there is not already a mine here
                    if (placeholderGrid[i]['isMine']) {
                        break;
                    } else {
                        placeholderGrid[i]['isMine'] = true;
                        minesGrid[randomRow][randomColumn] = 1;
                        numberOfMinesSet += 1;
                    }

                }

            }

        }

        // ------------ Now Setting The Cell Number For Each Cell ------------- //

        for (let i = 0; i < placeholderGrid.length; i++) {

            let currentRow = placeholderGrid[i]['row'];
            let currentColumn = placeholderGrid[i]['column'];

            // Need to count the number of mines in it's surrounding 8 cells
            let numberOfSurroundingMines = 0;

            for (let j = -1; j < 2; j++) {

                for (let k = -1; k < 2; k++) {

                    // Avoiding index out of bounds error
                    if ( ( (currentRow + j) in minesGrid ) && ( (currentColumn + k) in minesGrid[currentRow + j] ) ) {
                        
                        if (minesGrid[currentRow + j][currentColumn + k]) {

                            numberOfSurroundingMines += 1;

                        } else {

                            continue;

                        }

                    }

                }

            }

            placeholderGrid[i]['cellNumber'] = numberOfSurroundingMines;

        }

        setGrid(placeholderGrid);

    }, []);

    const newGame = () => {
        console.log("New Game");
    }

    const handleCellClick = (e) => {

        if (e.type === 'click') {
            const clickedRow = parseInt(e.split('-')[0]);
            const clickedColumn = parseInt(e.split('-')[1]);

            var tempGrid = grid;

            for (let i = 0; i < tempGrid.length; i++) {
                if ( (tempGrid[i]['row'] == clickedRow) && (tempGrid[i]['column'] == clickedColumn) ) {
                    let cellNumber = tempGrid[i]['cellNumber'];
                    tempGrid[i]['clicked'] = true;

                    if (cellNumber === 0) {
                        tempGrid[i]['cellNumberZero'] = true;
                    } else if (cellNumber === 1) {
                        tempGrid[i]['cellNumberOne'] = true;
                    } else if (cellNumber === 2) {
                        tempGrid[i]['cellNumberTwo'] = true;
                    } else if (cellNumber === 3) {
                        tempGrid[i]['cellNumberThree'] = true;
                    } else if (cellNumber === 4) {
                        tempGrid[i]['cellNumberFour'] = true;
                    } else if (cellNumber === 5) {
                        tempGrid[i]['cellNumberFive'] = true;
                    } else if (cellNumber === 6) {
                        tempGrid[i]['cellNumberSix'] = true;
                    } else if (cellNumber === 7) {
                        tempGrid[i]['cellNumberSeven'] = true;
                    } else if (cellNumber === 8) {
                        tempGrid[i]['cellNumberEight'] = true;
                    }

                    break;
                }
            }

            setGrid(tempGrid);
        } else if (e.type === 'contextmenu') {
            console.log("Right click");
        }
        forceUpdate();
        
    }

    const gridItems = grid.map((grid) => {
        return <div
                key={grid.row.toString() + '-' + grid.column.toString()}
                className={
                    grid.isMineClicked ? 'gridItem isMineClicked'
                    : grid.cellNumberZero ? 'gridItem zero'
                    : grid.cellNumberOne ? 'gridItem one'
                    : grid.cellNumberTwo ? 'gridItem two'
                    : grid.cellNumberThree ? 'gridItem three'
                    : grid.cellNumberFour ? 'gridItem four'
                    : grid.cellNumberFive ? 'gridItem five'
                    : grid.cellNumberSix ? 'gridItem six'
                    : grid.cellNumberSeven ? 'gridItem seven'
                    : grid.cellNumberEight ? 'gridItem eight'
                    : 'gridItem'
                }
                onClick={() => handleCellClick(grid.row.toString() + '-' + grid.column.toString())}
                onContextMenu={() => handleCellClick(grid.row.toString() + '-' + grid.column.toString())}
            ></div>
    });

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
                        <div className="grid">{gridItems}</div>
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
