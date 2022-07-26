import { ReactNode } from 'react';

import { Group, UnstyledButton, Text, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
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
}

export const NavbarItem = ({ text, icon }: NavbarItemProps) => {
  const { classes, cx } = useStyles();
  return (
    <UnstyledButton
      className={cx(classes.item, { [classes.active]: text === 'Home' })}
    >
      <Group>
        {icon}
        <Text className={classes.itemText}>{text}</Text>
      </Group>
    </UnstyledButton>
  );
};
