import React, {Component} from 'react';

import LikesContainer from "../likes/LikesContainer";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import {Article, LoadingTypeEnum} from "./Model";

interface Props {
    article: Article;
}

export class ArticleReader extends Component<Props> {
    render() {
        const article = this.props.article;

        if (!article) {
            return (<div className="spinner"/>)
        }

        return (
            <div>
                <div className="article-container">
                    {article.isLoading === LoadingTypeEnum.LOADING && <div className="spinner"/>}
                    {article.text &&
                    <div>
                        <h1>{this.props.article.title}</h1>
                        <ReactMarkdown
                            source={article.text}
                            renderers={{code: CodeBlock}}
                        />
                    </div>}
                </div>

                <LikesContainer disliked={false} liked={true}/>
            </div>
        );
    }
}
