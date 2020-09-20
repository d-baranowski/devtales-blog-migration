import React, {CSSProperties, FC} from "react";
import {ArticleSummarised} from "./Model";
import Link from "next/link";

interface Props {
    style: CSSProperties;
    className: string;
    article: ArticleSummarised;
}

const ArticlePreviewComponent: FC<Props> = (props) => {
    return (
        <div style={props.style} className={"article-short card hover-move " + props.className}>
            <Link href={'/article/' + props.article.slug}>
                <div>
                    <h2>{props.article.title}</h2>
                    <div dangerouslySetInnerHTML={{__html: props.article.summary}}/>
                </div>
            </Link>
        </div>
    );
};

export default ArticlePreviewComponent;
