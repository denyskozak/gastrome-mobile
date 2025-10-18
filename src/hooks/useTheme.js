import { useMemo, useCallback, useEffect } from 'react';
import { useSettings } from '../contexts/settings.context';
import { defaultThemeId, getThemeById, themes } from '../styles/themes';
import { setCommonStylesTheme } from '../styles/common.styles';

export const useTheme = () => {
  const [settings, setSetting] = useSettings();
  const themeId = settings?.theme ?? defaultThemeId;

  const theme = useMemo(() => getThemeById(themeId), [themeId]);

  useEffect(() => {
    setCommonStylesTheme(theme);
  }, [theme]);

  const setTheme = useCallback((nextThemeId) => {
    if (nextThemeId && nextThemeId !== themeId) {
      setSetting('theme', nextThemeId);
    }
  }, [setSetting, themeId]);

  const themeOptions = useMemo(() => Object.values(themes), []);

  return {
    themeId,
    theme,
    setTheme,
    availableThemes: themeOptions,
  };
};
