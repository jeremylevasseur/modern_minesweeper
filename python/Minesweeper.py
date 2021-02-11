import numpy as np
from random import randrange
from pprint import pprint


rows = 16
columns = 30
numberOfMines = 90
numberOfMinesSet = 0

# Setting up grid
grid = []
minesGrid = [] # Used for efficiency reasons
for i in range(rows):

    for j in range(columns):
    
        tempCell = {
                'row': i + 1,
                'column': j + 1,
                'isMine': False,
                'cellNumber': 0
        }

        grid.append(tempCell)
    
    minesGrid.append(np.zeros(columns))


# Setting the mines
while numberOfMinesSet < numberOfMines:

    randomRow = randrange(rows)
    randomColumn = randrange(columns)

    for i in range(len(grid)):

        if (grid[i]['row'] == randomRow + 1) and (grid[i]['column'] == randomColumn + 1):

            # Making sure there is not already a mine here
            if grid[i]['isMine']:
                break
            else:
                grid[i]['isMine'] = True
                minesGrid[randomRow][randomColumn] = 1
                numberOfMinesSet += 1


# Now setting the cell number for each cell
for i in range(len(grid)):

    currentRow = grid[i]['row']
    currentColumn = grid[i]['column']

    # Need to count the number of mines in it's surrounding 8 cells
    numberOfSurroundingMines = 0
    
    for j in range(-1, 2):

        for k in range(-1, 2):

            try:
                if minesGrid[currentRow - j][currentColumn - k] == 1:
                
                    numberOfSurroundingMines += 1

            except IndexError as error:

                continue
    
    grid[i]['cellNumber'] = numberOfSurroundingMines


# Grid data is ready
pprint(grid)
                



        
