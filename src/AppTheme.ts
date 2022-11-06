import { MantineThemeOverride, MantineTheme } from '@mantine/core';
import { getThemeColor } from './utils/fns';

export const AppTheme: MantineThemeOverride = {
  primaryShade: { dark: 7 },
  colors: {},
  primaryColor: 'indigo',
};

export const AppStyles = {
  Paper: (theme: MantineTheme) => ({
    root: {
      backgroundColor: getThemeColor(theme, 5),
    },
  }),
  Menu: (theme: MantineTheme) => ({
    body: {
      backgroundColor: getThemeColor(theme, 6),
    },
    itemHovered: {
      backgroundColor: getThemeColor(theme, 5, 0),
    },
  }),
  TextInput: (theme: MantineTheme) => ({
    input: {
      backgroundColor: getThemeColor(theme, 4),
    },
  }),
  Textarea: (theme: MantineTheme) => ({
    input: {
      backgroundColor: getThemeColor(theme, 4),
    },
  }),
  PasswordInput: (theme: MantineTheme) => ({
    input: {
      backgroundColor: getThemeColor(theme, 4),
    },
  }),
};
