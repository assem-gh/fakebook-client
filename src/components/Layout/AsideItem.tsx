import {
  Group,
  UnstyledButton,
  Text,
  createStyles,
  Avatar,
  Indicator,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  item: {
    display: 'block',
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
    fontSize: theme.fontSizes.sm,
  },
}));

interface AsideItemProps {
  name: string;
  image?: string;
}

export const AsideItem = ({ name, image }: AsideItemProps) => {
  const { classes } = useStyles();
  return (
    <UnstyledButton className={classes.item}>
      <Group>
        <Indicator
          color='green'
          offset={4}
          size={12}
          position='top-end'
          withBorder
        >
          <Avatar size={28} radius='xl' src={image} />
        </Indicator>
        <Text className={classes.itemText}>{name}</Text>
      </Group>
    </UnstyledButton>
  );
};
