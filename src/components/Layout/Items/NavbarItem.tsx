import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Group, UnstyledButton, Text, createStyles } from '@mantine/core';
import { getThemeColor } from '../../../utils/fns';

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor: getThemeColor(theme, 6, 0),
    },
  },
  itemText: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
    [theme.fn.smallerThan('xs')]: {
      display: 'block',
      fontSize: theme.fontSizes.md,
    },
    fontSize: theme.fontSizes.sm,
  },

  active: {
    backgroundColor: theme.fn.rgba(theme.colors.blue[4], 0.25),
    '&:hover': {
      backgroundColor: theme.fn.rgba(theme.colors.blue[6], 0.3),
    },
  },
}));

interface NavbarItemProps {
  text: string;
  icon: ReactNode;
  path: string;
}

export const NavbarItem = ({ text, icon, path }: NavbarItemProps) => {
  const { classes, cx } = useStyles();
  return (
    <UnstyledButton
      className={cx(classes.item, { [classes.active]: text === 'Home' })}
      component={Link}
      to={path}
    >
      <Group>
        {icon}
        <Text className={classes.itemText}>{text}</Text>
      </Group>
    </UnstyledButton>
  );
};
