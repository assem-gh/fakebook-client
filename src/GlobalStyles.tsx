import { Global } from '@mantine/core';
import { getThemeColor } from './utils/fns';

export const GlobalStyles = () => {
  return (
    <Global
      styles={(theme) => ({
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },

        body: {
          ...theme.fn.fontStyles(),

          backgroundColor: getThemeColor(theme, 4, 1),
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          lineHeight: theme.lineHeight,
        },
      })}
    />
  );
};
