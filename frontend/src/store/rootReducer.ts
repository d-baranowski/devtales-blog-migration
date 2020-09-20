import { combineReducers } from '@reduxjs/toolkit'
import auth from "src/feature/auth/authSlice"
import articles from "src/feature/articles/articlesSlice"

const rootReducer = combineReducers({
    auth,
    articles
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
