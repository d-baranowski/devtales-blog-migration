import * as React from "react";
import LoginCallbackHandler from "src/feature/auth/LoginCallbackHandler";
import Spinner from "src/feature/loading/Spinner";
import CenterIn from "src/components/CenterIn";

const login = (props) => <LoginCallbackHandler {...props} >
    <CenterIn>
        <Spinner/>
    </CenterIn>
</LoginCallbackHandler>;

export default login;
