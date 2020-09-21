import axios from "axios";
import {Article, ArticleSummarised} from "./Model";
import {createAsyncThunk, createSelector, createSlice, SerializedError} from "@reduxjs/toolkit";
import {RootState} from "src/store/rootReducer";

interface ArticlesSliceShape {
    articles: ArticleSummarised[];
    seen: boolean;
    loading: boolean;
    error: SerializedError;
}

const initialState: ArticlesSliceShape = {
    articles: [],
    loading: false,
    error: null,
    seen: false,
};

const getAllArticlesThunk = createAsyncThunk(
    'articles/getAll',
    () => {
        return axios.get<ArticleSummarised[]>('articles.json').then(response => response.data)
    }
);

const getSpecificArticleThunk = createAsyncThunk(
    'article/getSpecific',
    (slug: string) => {
        return axios.get<Article>(`/article/${slug}.md`)
    }
);

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setSeen: (state: ArticlesSliceShape, action): ArticlesSliceShape => {
            state.seen = action.payload;
            return state;
        }
    },
    extraReducers: builder => {
        // TODO add cases for get specific thunk
        builder.addCase(getAllArticlesThunk.pending, (state) => {
            state.loading = true;
            state.error = initialState.error;
        });

        builder.addCase(getAllArticlesThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.articles = action.payload
        });

        builder.addCase(getAllArticlesThunk.rejected, (state, action) => {
            state.error = action.error;
            state.loading = false;
        })
    }
});

export const selectSeen = createSelector(
    (state: RootState) => state.articles.seen,
    (todo) => todo
);

export const selectArticles = createSelector(
    (state: RootState) => state.articles.articles,
    (todo) => todo
);

export const actions = {...articlesSlice.actions, getAllArticlesThunk, getSpecificArticleThunk};

export default articlesSlice.reducer;
