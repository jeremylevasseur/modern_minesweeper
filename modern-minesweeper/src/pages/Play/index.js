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
    const [rows, setRows] = useState(24);
    const [columns, setColumns] = useState(30);
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        setGrid([]);
        const tempGrid = [];

        for (let i = 0; i < rows; i++) {

            for (let j = 0; j < columns; j++) {

                let newElement = {
                    'row': i,
                    'column': j,
                    'isMine': false
                }

                tempGrid.push(newElement);
                
            }

        }

        setGrid(tempGrid);

    }, []);

    const gridItems = grid.map((grid) => {
        return <div
                key={grid.row.toString() + '-' + grid.column.toString()}
                className={
                    grid.isMine ? 'gridItem isMine' : 'gridItem'
                }
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
