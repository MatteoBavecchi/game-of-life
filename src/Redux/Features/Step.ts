import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface StepState {
    step: number;
    isRunning: boolean;
}

const initialState: StepState = {
    step: 0,
    isRunning: false
}


export const stepSlice = createSlice({
    name: 'stepCounter',
    initialState,
    reducers: {
        play: (state) => {
            state.isRunning = true;
        },
        pause: (state) => {
            state.isRunning = false;
        },
        increment: (state) => {
            if (state.isRunning) {
                state.step++;
            }
        },

        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setStep, play, pause, increment } = stepSlice.actions

export default stepSlice.reducer