import {Provider} from 'react-redux'
import App from 'next/app'
import withRedux, {ReduxWrapperAppProps} from 'next-redux-wrapper';
import * as React from "react";
import {RootState} from "src/store/rootReducer";
import {makeStore} from "src/store/store";
import theme from "src/style/theme";
import {ThemeProvider} from "styled-components";
import 'src/style/main.scss';
import PageNavigation from "../src/feature/navigation/PageNavigation";

class AppOverride extends App<ReduxWrapperAppProps<RootState>> {

    componentDidMount(): void {
        const isProd = process.env.NODE_ENV === 'production';

        if (isProd) {
            return;
        }

        if (typeof window != "undefined") {
            // @ts-ignore
            window.DEV_ONLY_STORE = this.props.store;
        }
    }

    render() {
        const {Component, pageProps, router, store} = this.props;

        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <div className="page-content">
                        <PageNavigation toggleMenu={() => {
                        }} showMenu={false}/>
                        <main>
                            <div id="main-section">
                                <Component router={router} {...pageProps} />
                            </div>
                        </main>
                    </div>
                </ThemeProvider>
            </Provider>
        )
    }
}

export default withRedux(makeStore, {debug: true})(AppOverride)
