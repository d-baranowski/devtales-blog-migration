import * as React from "react";
import {NextRouter, withRouter} from 'next/router'
import parseOauthResponse from "./parseOauthResponse";
import {getPredicrectState} from "./predirectState";
import {loginSuccess} from "./authSlice";
import {connect} from 'react-redux'
import Logger from "../log/Logger";

interface Props {
    router: NextRouter;
    loginSuccess: (string) => void;
}

const LoginCallbackHandler: React.ComponentType<Props> = ({router, loginSuccess, children}) => {
    const params = parseOauthResponse(router.asPath);
    const predirectState = getPredicrectState();

    Logger.getInstance().log("debug", "g2RNF7", `loginCallbackHandler ${JSON.stringify(params)}`);


    if (params.state === predirectState.oauthState) {
        Logger.getInstance().log("debug", "wWJCw0", `login success`);
        loginSuccess(params);
        router.replace(predirectState.returnTo).catch(console.log)
    } else {
        Logger.getInstance().log("info", "cIAT2v", `login failed`);
    }

    return <>{children}</>
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
    loginSuccess: (oauthResponse) => dispatch(loginSuccess(oauthResponse))
});

export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginCallbackHandler))
