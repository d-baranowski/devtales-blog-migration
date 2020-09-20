import React, {Component} from "react";
import {connect} from 'react-redux'
import {ArticleSummarised} from "./Model";
import ArticlePreviewComponent from "./ArticlePreview";
import {actions, selectArticles, selectSeen} from "./articlesSlice";

interface Props {
    articles: ArticleSummarised[];
    seen: boolean;
    getAllArticles: () => void;
    setSeen: () => void;
}

class ArticleList extends Component<Props> {
    componentDidMount() {
        this.props.getAllArticles();
    }

    shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
        return this.props.articles != nextProps.articles
    };

    render() {
        const { articles, seen, setSeen } = this.props;

        const result = [];
        Object.keys(articles).forEach((element, i) => {
            const article = articles[element];
            result.push(
                <ArticlePreviewComponent
                    className={!seen &&  "fly-in"}
                    style={{animationDelay: `${i * 25}ms`}}
                    key={'article-' + article.slug}
                    article={article}
                />
            );
        });

        if (articles.length > 0) {
            setSeen()
        }

        return result.length > 0 ? <div className="articles-container">{result}</div> : <div/>;
    }
}

const mapStateToProps = (reduxState) => {
    return {
        seen: selectSeen(reduxState),
        articles: selectArticles(reduxState)
    }
};

const mapDispatchToPros = (dispatch) => {
    return {
        setSeen: () => dispatch(actions.setSeen(true)),
        getAllArticles: () => dispatch(actions.getAllArticlesThunk())
    }
};

export default connect(mapStateToProps, mapDispatchToPros)(ArticleList)
