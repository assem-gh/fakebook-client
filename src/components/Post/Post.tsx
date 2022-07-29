import { EntityId } from '@reduxjs/toolkit';
import { Paper, Divider, createStyles } from '@mantine/core';

import { PostHeader } from './PostHeader';
import { useAppSelector } from '../../store/hooks';
import { selectById } from '../../store/postSlice';
import { PostBody } from './PostBody';
import { PostActions } from './PostActions';

const useStyles = createStyles((theme) => ({
  divider: {
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],
  },
}));

interface PostProps {
  id: EntityId;
}

export const Post = ({ id }: PostProps) => {
  const post = useAppSelector((state) => selectById(state, id));
  const userId = useAppSelector((state) => state.user.id);

  const likedByUser = post?.likes?.some((u) => u.id === userId) || false;

  const { classes } = useStyles();
  return (
    <Paper shadow='xs' withBorder pt='md' px={0} radius='md'>
      <PostHeader
        owner={post?.owner!}
        createdAt={post?.createdAt!}
        postId={id}
      />
      <Divider my='sm' className={classes.divider} />
      <PostBody id={id} />
      <Divider mt='sm' className={classes.divider} />
      <PostActions likedByUser={likedByUser} id={id} />
    </Paper>
  );
};
