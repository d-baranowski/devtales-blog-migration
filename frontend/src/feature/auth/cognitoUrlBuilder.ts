const cognitoDomain = process.env.cognitoDomain;
const clientId = process.env.oauthClientId;
const redirectUri = process.env.redirectUri;

type authorizeType = (state: string) => string


export const cognitoAuthorizeUrl: authorizeType = (state) => {
    const result = new URL(`https://${cognitoDomain}/oauth2/authorize`);
    result.searchParams.append("response_type", "token");
    result.searchParams.append("client_id", clientId);
    result.searchParams.append("redirect_uri", redirectUri);
    result.searchParams.append("state", state);
    result.searchParams.append("scope", "email profile openid");
    result.searchParams.append("idp_identifier", "Google");
    result.searchParams.append("identity_provider", "Google");

    return result.href
};
