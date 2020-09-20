import * as React from "react";
import Head from 'next/head';
import ArticleList from "../src/feature/articles/ArticleList";


function Home() {
    return (
        <div className="container">
            <Head>
                <title>Devtales Games</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
                    <ArticleList/>

        </div>
    );
}

export default Home;
