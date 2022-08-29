import { Box, Group, LoadingOverlay } from '@mantine/core';

import { useAppSelector } from '../../store/hooks';
import { Comment } from './Comment';
import { CommentInput } from './CommentInput';

interface Props {
  postId: string;
}

export const CommentsSection = ({ postId }: Props) => {
  const commentsIds = useAppSelector(
    (state) => state.posts.entities[postId].commentsIds
  );

  const loading = useAppSelector((state) => state.comments.loading);

  return (
    <>
      <Group direction='column' grow py='lg' px='md'>
        <Box>
          <CommentInput postId={postId} />
        </Box>
        {Boolean(commentsIds?.length) && (
          <Group
            direction='column'
            grow
            spacing='xs'
            sx={{ position: 'relative' }}
          >
            <LoadingOverlay visible={loading} />
            {commentsIds?.map((comment) => (
              <Comment key={comment} commentId={comment} />
            ))}
          </Group>
        )}
      </Group>
    </>
  );
};
