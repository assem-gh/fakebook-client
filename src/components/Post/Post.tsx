import { useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { Paper, Divider, createStyles } from '@mantine/core';

import { PostHeader } from './PostHeader';
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

  const { classes } = useStyles();
  return (
    <Paper shadow='xs' withBorder pt='md' px={0} radius='md'>
      <PostHeader postId={id} />
      <Divider my='sm' className={classes.divider} />
      <PostBody id={id} />
      <Divider mt='sm' className={classes.divider} />
      <PostActions postId={id} setShowComments={setShowComments} />
      {showComments && (
        <>
          <Divider className={classes.divider} />
          <CommentsSection postId={id} />
        </>
      )}
    </Paper>
  );
};
