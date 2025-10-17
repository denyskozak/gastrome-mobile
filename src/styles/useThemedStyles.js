import { useMemo } from 'react';
import { useTheme } from '../hooks/useTheme';

export const createThemedStyles = (stylesFactory) => () => {
  const { theme } = useTheme();

  return useMemo(() => stylesFactory(theme), [stylesFactory, theme]);
};
