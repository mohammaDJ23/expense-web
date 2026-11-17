import {
    createContext,
    useContext,
    useEffect,
    useState,
    type PropsWithChildren,
    type ReactElement,
} from 'react';

type TDefaultTheme = 'light' | 'dark';
type TTheme = TDefaultTheme | 'system';

interface IThemeContext {
    theme: TTheme;
    activeTheme: TDefaultTheme;
    toggleTheme: () => void;
}

interface IProps extends PropsWithChildren {}

const ThemeContext = createContext<IThemeContext | null>(null);

function getTheme(): TTheme {
    const theme = localStorage.getItem('theme');

    if (theme === 'light' || theme === 'dark') {
        return theme;
    }

    return 'system';
}

function getMedia(): MediaQueryList {
    return window.matchMedia('(prefers-color-scheme: dark)');
}

function getMediaTheme(): TDefaultTheme {
    return getMedia().matches ? 'dark' : 'light';
}

function ThemeProvider({ children }: Readonly<IProps>): ReactElement {
    const [theme, setTheme] = useState<TTheme>(getTheme);
    const [systemTheme, setSystemTheme] = useState<TDefaultTheme>(getMediaTheme);

    const activeTheme = theme === 'system' ? systemTheme : theme;

    useEffect(() => {
        const media = getMedia();

        const update = () => setSystemTheme(media.matches ? 'dark' : 'light');

        media.addEventListener('change', update);

        return () => media.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', activeTheme === 'dark');
        document.documentElement.style.colorScheme = activeTheme;
        localStorage.setItem('theme', theme);
    }, [theme, activeTheme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                activeTheme,
                toggleTheme: () => setTheme(activeTheme === 'dark' ? 'light' : 'dark'),
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }

    return context;
}
