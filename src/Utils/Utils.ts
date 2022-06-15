
export const makeNewGrid = (height: number, width: number, rand?: boolean) => {
    let grid = [];
    for (var i = 0; i < height; i++) {
        var row = [];
        for (var j = 0; j < width; j++) {
            if (rand) {
                //If rand is true, the grid is populated in a random way
                row.push(Math.random() < 0.5);
            } else {
                row.push(false);
            }
        }
        grid.push(row);
    }
    return grid;
}

export const countNeighbors = (grid: boolean[][], x: number, y: number) => {

    let height: number = grid.length;
    let width: number = grid[0].length;

    let aliveNeighbors = 0;
    //We care about the edges of the grid:
    let topRow = (x - 1 < 0 ? (height - 1) : x - 1);
    let bottomRow = (x + 1 === height) ? 0 : x + 1;
    let leftColumn = (y - 1 < 0 ? (width - 1) : y - 1);
    let rightColumn = ((y + 1 === width) ? 0 : y + 1);
    //We count all the true neighbors
    aliveNeighbors += (grid[topRow][leftColumn] ? 1 : 0);
    aliveNeighbors += (grid[topRow][y] ? 1 : 0);
    aliveNeighbors += (grid[topRow][rightColumn] ? 1 : 0);
    aliveNeighbors += (grid[x][leftColumn] ? 1 : 0);
    aliveNeighbors += (grid[x][rightColumn] ? 1 : 0);
    aliveNeighbors += (grid[bottomRow][leftColumn] ? 1 : 0);
    aliveNeighbors += (grid[bottomRow][y] ? 1 : 0);
    aliveNeighbors += (grid[bottomRow][rightColumn] ? 1 : 0);

    return aliveNeighbors;
}

export const executeGame = (grid: boolean[][]) => {

    //The size of the grid
    let height: number = grid.length;
    let width: number = grid[0].length;

    //newGrid will be the next state of the game
    var newGrid = makeNewGrid(height, width);


    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {

            //countNeighbors returns the number of the alive neighbors
            let aliveNeighbors = countNeighbors(grid, i, j);
            if (grid[i][j]) {
                //The cell is alive
                if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                    //There's overpopulation or underpopulation, so the cell die
                    newGrid[i][j] = false;
                } else {
                    if (aliveNeighbors === 2 || aliveNeighbors === 3) {
                        //the cell continues to live
                        newGrid[i][j] = true;
                    }
                }

            } else {
                //If the cell is dead
                if (aliveNeighbors === 3) {
                    // a new cell is born
                    newGrid[i][j] = true;
                }
            }
        }
    }
    return newGrid;
}