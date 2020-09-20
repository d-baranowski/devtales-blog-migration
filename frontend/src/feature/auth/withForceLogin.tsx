import * as React from "react";
import {connect} from 'react-redux'
import {authorizeThunk, selectAuthIsLoggedIn} from "./authSlice";
import Logger from "src/feature/log/Logger";
import CenterIn from "../../components/CenterIn";
import Spinner from "../loading/Spinner";

type Props = {
    isLoggedIn: boolean;
    triggerAuth: () => void;
}

const mapStateToProps = (state) => ({
    isLoggedIn: selectAuthIsLoggedIn(state)
});

const mapDispatchToProps = (dispatch) => ({
    triggerAuth: () => dispatch(authorizeThunk())
});

const withForceLogin = <P extends object>(Component: React.ComponentType<P>) =>
    connect(mapStateToProps, mapDispatchToProps)(
        class WithForceLogin extends React.Component<Props> {
            componentDidMount(): void {
                const {isLoggedIn, triggerAuth} = this.props;
                if (!isLoggedIn) {
                    Logger.getInstance().log("debug", "21XmwN", `triggering auth ${JSON.stringify(this.props)}`);
                    triggerAuth();
                }
            }

            render() {
                Logger.getInstance().log("debug", "ZSD4m1", `withForceLogin ${JSON.stringify(this.props)}`);
                const {isLoggedIn, ...rest} = this.props;
                delete rest.triggerAuth;
                return isLoggedIn ? <Component {...rest as P} /> : <CenterIn><Spinner/></CenterIn>;
            }
        });


export default withForceLogin;
