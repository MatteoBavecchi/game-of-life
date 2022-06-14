export const countNeighbors = (grid: boolean[][], x: number, y: number) => {
    let height: number = grid.length;
    let width: number = grid[0].length;
    let aliveNeighbors = 0;
    for (let i = x - 1; i < x + 2; i++) {
        for (let j = y - 1; j < y + 2; j++) {
            if (i !== 0 && j !== 0) {
                aliveNeighbors += grid[(i + width) % width][(j + height) % height] ? 1 : 0;
            }
        }
    }
    return aliveNeighbors;
}

export const executeGame = (grid: boolean[][]) => {
    let height: number = grid.length;
    let width: number = grid[0].length;
    let newGrid = grid.slice(0);
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {

            let aliveNeighbors = countNeighbors(grid, i, j);//it return the number of the alive neighbors

            if (grid[i][j]) {
                //The cell is alive
                if (aliveNeighbors < 2 || aliveNeighbors > 3) { //There's overpopulation or underpopulation, so the cell die
                    newGrid[i][j] = false;
                }
                if (aliveNeighbors === 2 || aliveNeighbors === 3) { //the cell continues to live
                    newGrid[i][j] = true;
                }
            } else {
                //The cell is dead
                if (aliveNeighbors == 3) { // a new cell born
                    newGrid[i][j] = true;
                }
            }
        }
    }

    return grid.slice(0);
}