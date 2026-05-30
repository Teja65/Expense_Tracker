import { Moon, Sun } from 'lucide-react';

import { useTheme } from '../../hooks/useTheme';
import Button from './Button';
import en from '../../en.json';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      type='button'
      onClick={toggleTheme}
      aria-label={
        theme === 'dark' ? en.theme.switchToLight : en.theme.switchToDark
      }
      className='cursor-pointer rounded-full border border-zinc-300 p-3 dark:border-zinc-700'
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}
