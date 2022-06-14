import { configureStore } from "@reduxjs/toolkit";
import gameReducer from './../Features/Game';
import stepReducer from '../Features/Step';

export const store = configureStore({
    reducer: {
        game: gameReducer,
        step: stepReducer
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
