
import { Paper, Divider, createStyles } from '@mantine/core';

import { PostHeader } from './PostHeader';
import { PostBody } from './PostBody';
import { CommentsSection } from '../Comment/CommentsSection';
import { getThemeColor } from '../../utils/fns';

const useStyles = createStyles((theme) => ({
  divider: {
    borderColor: getThemeColor(theme, 4, 2),
  },
}));

interface PostProps {
  id: string;
  postPage?: boolean;
}

export const Post = ({ id, postPage  }: PostProps) => {
    const { classes } = useStyles();

  return (
    <Paper shadow='xs' withBorder pt='md' px={0} radius='md'>
      <PostHeader postId={id} />
      <Divider my='sm' className={classes.divider} />
      <PostBody postId={id} postPage={Boolean(postPage)} />
      <Divider mt={8} className={classes.divider} />
      {postPage && <CommentsSection postId={id} />}
    </Paper>
  );
};
