import { ReactNode } from 'react';
import { Box, createStyles, Stack } from '@mantine/core';

import { getThemeColor } from '../../utils/fns';

const useStyles = createStyles((theme, right: boolean) => ({
  container: {
    width: '70px',
    border: 'none',
    backgroundColor: getThemeColor(theme, 6),
    height: 'calc(100vh - 112px)',
    position: 'fixed',
    boxShadow: theme.shadows.lg,
    overflow: 'auto',
    top: 84,
    borderRadius: theme.radius.md,
    zIndex: 99,
    scrollbarColor: getThemeColor(theme),
    '&::-webkit-scrollbar': {
      width: '3px',
    },
    '&:hover': {
      '&::-webkit-scrollbar-thumb ': {
        backgroundColor: getThemeColor(theme, 3, 5),
        borderRadius: theme.radius.md,
      },
    },
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
    [theme.fn.smallerThan('md')]: {
      display: right ? 'none' : '',
    },
  },
  left: { left: 16 },
  right: { right: 16 },
}));

interface Props {
  children: ReactNode;
  position: 'left' | 'right';
}

export const SideBar = ({ children, position }: Props) => {
  const { classes, cx } = useStyles(position === 'right');

  return (
    <Box className={cx(classes.container, classes[position])} py={16}>
      <Stack align='center' justify='center'>
        {children}
      </Stack>
    </Box>
  );
};
