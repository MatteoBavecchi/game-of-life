import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface StepState {
    step: number;
    isRunning: boolean;
    timerId: NodeJS.Timer | number;
}

const initialState: StepState = {
    step: 0,
    isRunning: false,
    timerId: 0
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
        setTimerId: (state, action: PayloadAction<NodeJS.Timer | number>) => {
            state.timerId = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setStep, play, pause, increment, setTimerId } = stepSlice.actions

export default stepSlice.reducer