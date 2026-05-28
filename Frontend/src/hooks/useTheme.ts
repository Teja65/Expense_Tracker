import { useContext } from 'react';

import { ThemeContext } from '../types/themeContextValue';

export function useTheme() {
  return useContext(ThemeContext);
}
