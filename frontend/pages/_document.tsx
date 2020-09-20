import * as React from "react";
import Document, {Head, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';
import theme from "src/style/theme";
import globalStyle from "src/style/globalStyle";

type Props = {
    styleTags: any;
};

export default class MyDocument extends Document<Props> {
    static getInitialProps({renderPage}) {
        // Step 1: Create an instance of ServerStyleSheet
        const sheet = new ServerStyleSheet();

        // Step 2: Retrieve styles from components in the page
        const page = renderPage((App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        );

        // Step 3: Extract the styles as <style> tags
        const styleTags = sheet.getStyleElement();

        // Step 4: Pass styleTags as a prop
        return {...page, styleTags};
    }

    render() {
        return (
            <html>
            <Head>
                {/* Step 5: Output the styles in the head  */}
                {this.props.styleTags}
                <style dangerouslySetInnerHTML={{__html: globalStyle(theme)}} />
            </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </html>
        );
    }
}
