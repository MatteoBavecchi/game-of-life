import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface GameState {
  step: number,
  rows: number,
  cols: number,
  grid: boolean[][],
}

const initialState: GameState = {
  step: 0,
  rows: 0,
  cols: 0,
  grid: []
}


export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initializeGrid: (state, action: PayloadAction<{ rand: boolean }>) => {
      state.grid = [];
      for (var i = 0; i < state.rows; i++) {
        var row = [];
        for (var j = 0; j < state.cols; j++) {
          if (action.payload.rand) {
            row.push(Math.random() < 0.5);
          } else {
            row.push(false);
          }

        }
        state.grid.push(row);
      }
    },
    setRows: (state, action: PayloadAction<number>) => {
      state.rows = action.payload
    },
    setColumns: (state, action: PayloadAction<number>) => {
      state.cols = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { initializeGrid, setColumns, setRows } = gameSlice.actions

export default gameSlice.reducer