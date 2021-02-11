import React, { useState, useEffect } from 'react';
import './main.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    GameSection,
    GameWrapper,
    MinesweeperBoard
} from './PlayElements';

const Play = () => {
    const [rows, setRows] = useState(16);
    const [columns, setColumns] = useState(30);
    const [numberOfMines, setNumberOfMines] = useState(90);
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        setGrid([]);

        // ------------ Setting Up Empty Grid ------------- //

        const placeholderGrid = [];  // Will be used to change state variable
        const minesGrid = [];  // Will be used for efficiency reasons
        for (let i = 0; i < rows; i++) {

            for (let j = 0; j < columns; j++) {

                let tempElement = {
                    'row': i + 1,
                    'column': j + 1,
                    'isMine': false,
                    'cellNumber': 0
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
        // console.log(grid);

    }, []);

    const handleCellClick = (e) => {
        const clickedRow = parseInt(e.split('-')[0]);
        const clickedColumn = parseInt(e.split('-')[1]);
        
        for (let i = 0; i < grid.length; i++) {
            if ( (grid[i]['row'] == clickedRow) && (grid[i]['column'] == clickedColumn) ) {
                console.log(grid[i]);
            }
        }
        
    }

    const gridItems = grid.map((grid) => {
        return <div
                key={grid.row.toString() + '-' + grid.column.toString()}
                className={
                    grid.isMine ? 'gridItem isMine' : 'gridItem'
                }
                onClick={() => handleCellClick(grid.row.toString() + '-' + grid.column.toString())}
            ></div>
    });

    return (
        <>
            <Navbar />
            <GameSection>
                <GameWrapper>
                    <MinesweeperBoard>
                        <div className="grid">{gridItems}</div>
                    </MinesweeperBoard>
                </GameWrapper>
            </GameSection>
            <Footer />
        </>
    )
}

export default Play
