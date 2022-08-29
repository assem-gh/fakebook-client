import { useEffect, useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';

import { Paper, Divider, createStyles } from '@mantine/core';

import { PostHeader } from './PostHeader';
import { PostBody } from './PostBody';
import { CommentsSection } from '../Comment/CommentsSection';
import { getThemeColor } from '../../utils/fns';
import commentApi from '../../api/http/commentApi';
import { useAppDispatch } from '../../store/hooks';

const useStyles = createStyles((theme) => ({
  divider: {
    borderColor: getThemeColor(theme, 4, 2),
  },
}));

interface PostProps {
  id: string;
  postPage?: boolean;
}

export const Post = ({ id, postPage = false }: PostProps) => {
  const { classes } = useStyles();
  return (
    <Paper shadow='xs' withBorder pt='md' px={0} radius='md'>
      <PostHeader postId={id} />
      <Divider my='sm' className={classes.divider} />
      <PostBody postId={id} postPage={postPage} />
      <Divider mt={8} className={classes.divider} />
      {postPage && <CommentsSection postId={id} />}
    </Paper>
  );
};
