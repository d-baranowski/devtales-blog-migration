
export type PredirectState = {
    oauthState: string;
    returnTo: string;
}

export const setPredirectState = (s: PredirectState): void => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.setItem("OUATH_STATE", s.oauthState);
    window.localStorage.setItem("OAUTH_RETURN_TO", s.returnTo);
};

export const getPredicrectState: () => PredirectState = () => {
    if (typeof window === 'undefined') {
        return {
            oauthState: "",
            returnTo: ""
        }
    }

    return {
        oauthState: window.localStorage.getItem("OUATH_STATE"),
        returnTo: window.localStorage.getItem("OAUTH_RETURN_TO")
    }
};
