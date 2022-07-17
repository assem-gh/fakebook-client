import {
  Avatar,
  createStyles,
  Group,
  Paper,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { CreatePostModal } from './CreatePostModal';

const useStyles = createStyles((theme) => ({
  createButton: {
    flexGrow: 1,
    borderRadius: theme.radius.xl,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[0],
    padding: theme.spacing.xs,
  },
}));

interface CreatePostProps {}

export const CreatePostBox = ({}: CreatePostProps) => {
  const [opened, setOpened] = useState(false);

  const profileImage = useAppSelector((state) => state.user.profileImage);

  const { classes } = useStyles();

  return (
    <Paper shadow='xs' withBorder p='md' radius='md'>
      <Group position='apart'>
        <Avatar src={profileImage} radius='xl' />
        <UnstyledButton
          className={classes.createButton}
          onClick={() => setOpened(true)}
        >
          <Text size='sm' ml='md' color='dimmed' align='left'>
            Add a post
          </Text>
        </UnstyledButton>
        <CreatePostModal opened={opened} setOpened={setOpened} />
      </Group>
    </Paper>
  );
};
