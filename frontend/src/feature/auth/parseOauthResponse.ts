export type OauthCallbackResponse = {
    accessToken: string;
    idToken: string;
    state: string;
    tokenType: string;
    expiresIn: number;
}

type parseOauthResponseType = (path: string) => OauthCallbackResponse

const parseOauthResponse: parseOauthResponseType = path => {
    if (!path) {
        return {
            accessToken: "",
            state: "",
            tokenType: "",
            idToken: "",
            expiresIn: -1
        }
    }

    const params = path.split("#")[1];
    const searchParams = new URLSearchParams(params);
    return {
        accessToken: searchParams.get("access_token"),
        idToken: searchParams.get('id_token'),
        state: searchParams.get("state"),
        tokenType: searchParams.get("token_type"),
        expiresIn: parseInt(searchParams.get("expires_in"))
    }
};


export default parseOauthResponse
