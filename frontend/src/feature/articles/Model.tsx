
export interface ArticleSummarised {
    slug: string;
    summary: string;
    title: string;
    updatedOn: string;
}

export type LoadingType = "Loading" | "Loaded" | "Will-Load";

export interface Article {
    id: string;
    title: string;
    slug: string;
    summary: string;
    date: string;
    tags: string[];
    text: string;
    isLoading: LoadingType;
}

export const LoadingTypeEnum = {
    LOADING: 'Loading',
    LOADED: 'Loaded',
    WILL_LOAD: 'Will-Load'
};
