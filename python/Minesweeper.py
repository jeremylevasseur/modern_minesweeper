from random import randrange
from pprint import pprint

rows = 16
columns = 30
numberOfMines = 90
numberOfMinesSet = 0

# Setting up grid
grid = []
for i in range(rows):

    for j in range(columns):
    
        tempCell = {
                'row': i + 1,
                'column': j + 1,
                'isMine': False,
                'cellNumber': 0
        }

        grid.append(tempCell)


# Setting the mines
while numberOfMinesSet < numberOfMines:

    randomRow = randrange(rows)
    randomColumn = randrange(columns)

    for i in range(len(grid)):

        if (grid[i]['row'] == randomRow + 1) and (grid[i]['column'] == randomColumn + 1):

            # Making sure spot has not already been set
            if grid[i]['isMine']:
                break
            else:
                grid[i]['isMine'] = True
                numberOfMinesSet += 1

pprint(grid)

        
