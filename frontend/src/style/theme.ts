const theme = {
    backgroundColor: '#131825',
    primaryColor: '#09090D',
    primaryAlternateColor: '#333333',
    secondaryColor: '#37ebae',
    secondaryAlternateColor: '#494e56',
};

export type Theme = {
    theme: typeof theme;
};

export type ThemeUnwrapped = typeof theme;

export default theme;
