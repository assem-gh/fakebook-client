import { useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { Paper, Divider, createStyles } from '@mantine/core';

import { PostHeader } from './PostHeader';
import { useAppSelector } from '../../store/hooks';
import { selectById } from '../../store/postSlice';
import { PostBody } from './PostBody';
import { PostActions } from './PostActions';
import { CommentsSection } from '../Comment/CommentsSection';
import { getThemeColor } from '../../utils/fns';

const useStyles = createStyles((theme) => ({
  divider: {
    borderColor: getThemeColor(theme, 4, 2),
  },
}));

interface PostProps {
  id: EntityId;
}

export const Post = ({ id }: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  const post = useAppSelector((state) => selectById(state, id));
  const userId = useAppSelector((state) => state.user.id);

  const likedByUser = post?.likes?.some((u) => u.id === userId) || false;
  const hasComments = Boolean(post?.comments.length);

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
      <PostActions
        likedByUser={likedByUser}
        hasComments={hasComments}
        id={id}
        setShowComments={setShowComments}
      />
      {showComments && (
        <>
          <Divider className={classes.divider} />
          <CommentsSection id={id} />
        </>
      )}
    </Paper>
  );
};
