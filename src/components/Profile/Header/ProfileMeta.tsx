import { createStyles, Group, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  stats: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export const ProfileMeta = () => {
  const { classes } = useStyles();
  return (
    <Group position='center' className={classes.stats} spacing={36}>
      <div>
        <Text align='center' size='md' weight={400} mb={-4}>
          124
        </Text>
        <Text align='center' size='sm' color='dimmed'>
          Followers
        </Text>
      </div>
      <div>
        <Text align='center' size='md' weight={400} mb={-4}>
          18
        </Text>
        <Text align='center' size='sm' color='dimmed'>
          Follows
        </Text>
      </div>
    </Group>
  );
};
