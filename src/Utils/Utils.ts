import { TextFileParserType } from "../Types/Utils";

//Method for create a new grid with a specific height and width, populating cells randmoly or with leaving them blank
export const makeNewGrid = (height: number, width: number, rand?: boolean) => {
    let grid = [];
    for (var i = 0; i < height; i++) {
        var row = [];
        for (var j = 0; j < width; j++) {
            if (rand) {
                //If rand is true, the grid is populated in a randomic way
                row.push(Math.random() < 0.2);
            } else {
                row.push(false);
            }
        }
        grid.push(row);
    }
    return grid;
}


const countNeighbors = (grid: boolean[][], x: number, y: number) => {

    let height: number = grid.length;
    let width: number = grid[0].length;

    let aliveNeighbors = 0;
    //We care about the edges of the grid: since the grid is finite, 
    //for make the game mor dynamic we assume to be in a toroidal space
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


//This method execute the game algorithm, given an input grid it return a newGrid
export const executeGame = (grid: boolean[][]) => {

    //The size of the grid
    let height: number = grid.length;
    let width: number = grid[0].length;

    //newGrid will be the next state of the game, for firt we create it blank
    var newGrid = makeNewGrid(height, width);

    //We process every cell in every row with a nested for loop
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
                    // if there's 3 neighbors in the nearby, a new cell is going to born
                    newGrid[i][j] = true;
                }
            }
        }
    }
    return newGrid;
}


//textFileParsed parses data from the uploaded file
//this method return a Promise because FileReader.onload is async
export const textFileParser = (event: React.ChangeEvent<HTMLInputElement>): Promise<TextFileParserType | null> => {
    return new Promise((resolve, reject) => {
        var file = event.currentTarget.files![0];
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onload = (event) => {

            let fileContent: string | undefined = event.target!.result?.toString();

            //allLines is a array of strings, which have in every position a single line of text
            const allLines: string[] = fileContent!.split(/\r\n|\n/);

            //we extract stepNumber,rows and cols from the first and second lines:
            var stepNumber: number = +allLines[0].match(/\d+/)![0];
            var rows: number = +allLines[1].slice(0, 1);
            var cols: number = +allLines[1].slice(2);

            var newGrid = [];
            //Now we explore all the lines and we populate a new array of booleans
            // '*' -> true
            // '.' -> false
            for (let i = 2; i < allLines.length; i++) {
                var fileRow = allLines[i];
                var newRow = [];
                for (let j = 0; j < fileRow.length; j++) {
                    if (fileRow[j] === '*') {
                        newRow.push(true);
                    }
                    if (fileRow[j] === '.') {
                        newRow.push(false);
                    }
                }
                newGrid.push(newRow);
            }

            //We check if data is greater than 0
            if (rows > 0 && cols > 0 && stepNumber >= 0) {
                //In this case we resolve the promise and we return data
                resolve({
                    newGrid: newGrid,
                    cols: cols,
                    rows: rows,
                    step: stepNumber
                })
            } else {
                resolve(null);
            }
        }
    });
}