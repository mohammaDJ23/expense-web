import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type PropsWithChildren,
    type ReactElement,
} from 'react';

import { useMediaQuery } from '@/features/shared/hooks/useMediaQuery';

type TDefaultTheme = 'light' | 'dark';
type TTheme = TDefaultTheme | 'system';

interface IThemeContext {
    theme: TTheme;
    activeTheme: TDefaultTheme;
    isDark: boolean;
    isLight: boolean;
    toggleTheme: () => void;
}

interface IProps extends PropsWithChildren {}

const DARK_SYSTEM_THEME = '(prefers-color-scheme: dark)';

const ThemeContext = createContext<IThemeContext | null>(null);

function getTheme(): TTheme {
    const theme = localStorage.getItem('theme');

    if (theme === 'light' || theme === 'dark') {
        return theme;
    }

    return 'system';
}

function ThemeProvider({ children }: Readonly<IProps>): ReactElement {
    const [theme, setTheme] = useState<TTheme>(getTheme);
    const isSystemThemeMatches = useMediaQuery(DARK_SYSTEM_THEME);

    const systemTheme = isSystemThemeMatches ? 'dark' : 'light';
    const activeTheme = theme === 'system' ? systemTheme : theme;
    const isDark = activeTheme === 'dark';
    const isLight = activeTheme === 'light';

    useEffect(() => {
        document.documentElement.classList.toggle('dark', activeTheme === 'dark');
        document.documentElement.style.colorScheme = activeTheme;
        localStorage.setItem('theme', theme);
    }, [theme, activeTheme]);

    const toggleTheme = useCallback(() => {
        setTheme(activeTheme === 'dark' ? 'light' : 'dark');
    }, [activeTheme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                activeTheme,
                isDark,
                isLight,
                toggleTheme,
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
