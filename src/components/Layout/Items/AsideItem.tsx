import {
  Group,
  UnstyledButton,
  Text,
  createStyles,
  Avatar,
  Indicator,
} from '@mantine/core';
import { getThemeColor } from '../../../utils/fns';

const useStyles = createStyles((theme) => ({
  item: {
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor: getThemeColor(theme, 6, 0),
    },
  },
  group: {
    [theme.fn.smallerThan('md')]: {
      justifyContent: 'center',
    },
    justifyContent: 'space-between',
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
      <Group className={classes.group}>
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
