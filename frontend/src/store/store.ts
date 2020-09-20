import {Action, configureStore} from '@reduxjs/toolkit'
import {ThunkAction} from 'redux-thunk'

import rootReducer, {RootState} from './rootReducer'
import {MakeStore} from "next-redux-wrapper";

export const makeStore: MakeStore = (initialState) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState
    });
};

const store = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store
