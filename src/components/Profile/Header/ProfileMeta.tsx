import { createStyles, Group, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  stats: {
    marginLeft: 'auto',
    height: '100%',
    [theme.fn.smallerThan('md')]: {
      marginLeft: 0,
    },
  },
}));

export const ProfileMeta = () => {
  const { classes } = useStyles();
  return (
    <Group position='center' className={classes.stats} spacing={22}>
      <div>
        <Text align='center' size='lg' weight={500}>
          0
        </Text>
        <Text align='center' size='sm' color='dimmed'>
          Followers
        </Text>
      </div>
      <div>
        <Text align='center' size='lg' weight={500}>
          0
        </Text>
        <Text align='center' size='sm' color='dimmed'>
          Follows
        </Text>
      </div>
    </Group>
  );
};
