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
          overflow: 'overlay',
          '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: theme.colorScheme === 'dark' ? 'transparent' : '',
          },
          '&:hover': {
            '&::-webkit-scrollbar-thumb ': {
              backgroundColor: theme.colors.indigo[5],
              borderRadius: theme.radius.md,
            },
          },
        },
      })}
    />
  );
};
