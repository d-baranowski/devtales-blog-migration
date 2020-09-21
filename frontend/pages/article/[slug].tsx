import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ArticleReader} from "../../src/feature/articles/ArticleReader";
import {actions} from "../../src/feature/articles/articlesSlice";
import {NextRouter} from "next/router";

type LoadingType = "Loading" | "Loaded" | "Will-Load";

interface ArticleType {
    id: string;
    title: string;
    slug: string;
    summary: string;
    date: string;
    tags: string[];
    text: string;

    isLoading: LoadingType;
}

interface Props {
    articles: ArticleType[];
    fetchArticle: (slug: string) => void;
    router: NextRouter;
}

const mapStateToProps = (state) => {
    return {
        articles: state.articles.articles || []
    };
};

const mapDispatchToProps = (dispatch) => {
    return({
        fetchArticle: (slug) =>{ dispatch(actions.getSpecificArticleThunk(slug)); }
    });
};

const ArticleReaderContainer = connect(mapStateToProps, mapDispatchToProps)(class ArticleReaderContainer extends Component<Props> {
    getArticle() {
        const slug: string = this.props.router.query.slug as string;

        if (typeof window === 'undefined') {
            return this.props.articles[slug]
        }

        const localStorageArticle = localStorage.getItem(slug);
        let article;

        if (localStorageArticle) {
            article = JSON.parse(localStorageArticle)
        } else {
            article = this.props.articles[slug]
        }

        return article;
    }

    componentDidMount() {
        if (!this.getArticle()) {
            const slug: string = this.props.router.query.slug as string;
            this.props.fetchArticle(slug);
        }
    }

    render() {
        const article: ArticleType = this.getArticle();

        return <ArticleReader
            article={article}/>;
    }
});

export default ArticleReaderContainer;
