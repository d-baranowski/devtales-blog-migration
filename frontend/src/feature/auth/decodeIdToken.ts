import jwt from "jsonwebtoken";

type Identity = {
    "userId": string;
    "providerName": string;
    "providerType": string;
    "issuer": any;
    "primary": string;
    "dateCreated": string;
}

export type IdTokenDecoded = {
    "at_hash": string;
    "sub": string;
    "cognito:groups": Array<string>;
    "iss": string;
    "cognito:username": string;
    "given_name": string;
    picture: string;
    "aud": string;
    "token_use": string;
    "auth_time": number;
    "name": string;
    "exp": number;
    "iat": number;
    "family_name": string;
    "email": string;
    "identities": Array<Identity>;
}

export const EMPTY_USER_INFO: IdTokenDecoded = {
    "at_hash": "",
    "sub": "",
    "cognito:groups": [],
    "iss": "",
    "cognito:username": "",
    "given_name": "",
    "picture": "",
    "aud": "",
    "token_use": "",
    "auth_time": 0,
    "name": "",
    "exp": 0,
    "iat": 0,
    "family_name": "",
    "email": "",
    "identities": []
};

const decodeIdToken: (token: string) => IdTokenDecoded = token => {
    if (!token) {
        return EMPTY_USER_INFO
    }

    return jwt.decode(token) as IdTokenDecoded;
};

export default decodeIdToken
