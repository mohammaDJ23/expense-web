import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/app/providers/ThemeProvider';
import Icon from '@/features/shared/components/atoms/Icon';

import type { ReactElement } from 'react';

function ThemeIcon(): ReactElement {
    const theme = useTheme();

    return (
        <Icon
            icon={theme.activeTheme === 'dark' ? Sun : Moon}
            className="cursor-pointer"
            onClick={theme.toggleTheme}
        />
    );
}

export default ThemeIcon;
