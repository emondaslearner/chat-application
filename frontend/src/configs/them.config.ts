interface ThemeConfigState {
    themeColor: string;
    mode: 'light' | 'dark';
    locale: string,
    root: string
}

const themeConfig: ThemeConfigState = {
    themeColor: 'primary',
    mode: 'dark',
    locale: 'en',
    root: '/'
}

export default themeConfig;