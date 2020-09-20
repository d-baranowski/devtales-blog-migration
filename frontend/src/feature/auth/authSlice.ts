import {createAsyncThunk, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {cognitoAuthorizeUrl} from "./cognitoUrlBuilder";
import { nanoid } from '@reduxjs/toolkit'
import {RootState} from "../../store/rootReducer";
import {OauthCallbackResponse} from "./parseOauthResponse";
import {setPredirectState} from "./predirectState";
import decodeIdToken, {EMPTY_USER_INFO, IdTokenDecoded} from "./decodeIdToken";

export const authorizeThunk = createAsyncThunk(
    'auth/authorizeRedirect',
    () => {
        if (typeof window !== 'undefined') {
            const randomState = nanoid();
            setPredirectState({
                oauthState: randomState,
                returnTo: window.location.pathname
            });
            window.location.href = cognitoAuthorizeUrl(randomState)
        }
    }
);

type stateShape = {
    isLoggedIn: boolean;
    accessToken: string;
    userInfo: IdTokenDecoded;
}

const initialState: stateShape = {
    isLoggedIn: false,
    accessToken: "",
    userInfo: EMPTY_USER_INFO
};

export const selectAuthIsLoggedIn = createSelector(
    (state: RootState) => state.auth.isLoggedIn,
    (isLoggedIn) => isLoggedIn
);

export const selectAuthProfilePicture = createSelector(
    (state: RootState) => state.auth.userInfo.picture,
    (picture) => picture
);

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<OauthCallbackResponse>): void {
            state.isLoggedIn = true;
            state.accessToken = action.payload.accessToken;
            state.userInfo = decodeIdToken(action.payload.idToken)
        },
    }
});

export const {
    loginSuccess
} = auth.actions;

export default auth.reducer
