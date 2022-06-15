import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { executeGame, makeNewGrid } from '../../Utils/Utils';

export interface GameState {
  rows: number,
  cols: number,
  grid: boolean[][],
}

const initialState: GameState = {
  rows: 0,
  cols: 0,
  grid: []
}


export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {

    initializeGrid: (state, action: PayloadAction<{ rand: boolean }>) => {
      state.grid = makeNewGrid(state.rows, state.cols, action.payload.rand);
    },

    setRows: (state, action: PayloadAction<number>) => {
      state.rows = action.payload
    },

    setColumns: (state, action: PayloadAction<number>) => {
      state.cols = action.payload
    },

    nextGrid: (state) => {
      var newGrid = executeGame(state.grid.slice(0));
      state.grid = newGrid;
    },

    toggleCell: (state, action: PayloadAction<{ x: number, y: number }>) => {
      state.grid[action.payload.x][action.payload.y] = !state.grid[action.payload.x][action.payload.y];
    },

    setGrid: (state, action: PayloadAction<boolean[][]>) => {
      state.grid = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { initializeGrid, setColumns, setRows, nextGrid, toggleCell, setGrid } = gameSlice.actions

export default gameSlice.reducer