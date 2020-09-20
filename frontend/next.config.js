const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require('next/constants');


module.exports = phase => {
    // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;

    // when `next build` or `npm run build` is used
    const isProd = phase === PHASE_PRODUCTION_BUILD;

    return {
        exportTrailingSlash: true,
        env: {
            logLevel: "debug",
            cognitoDomain: 'login.devtales.net',
            oauthClientId: '59495hp415vmc6ttjm7c1761rn',
            redirectUri: isProd ? 'https://games.devtales.net/oauth/login' : 'http://localhost:3000/oauth/login',
        },
    };
};
