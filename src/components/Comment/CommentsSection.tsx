import { EntityId } from '@reduxjs/toolkit';
import { Box, Group, LoadingOverlay } from '@mantine/core';

import { useAppSelector } from '../../store/hooks';
import { selectPostById } from '../../store/slices/postSlice';
import { Comment } from './Comment';
import { CommentInput } from './CommentInput';

interface Props {
  postId: EntityId;
}

export const CommentsSection = ({ postId }: Props) => {
  const comments = useAppSelector(
    (state) => selectPostById(state, postId)?.commentsIds
  );

  const loading = useAppSelector((state) => state.comments.loading);

  return (
    <>
      <Group direction='column' grow py='lg' px='md'>
        <Box>
          <CommentInput postId={postId} />
        </Box>
        {Boolean(comments?.length) && (
          <Group
            direction='column'
            grow
            spacing='xs'
            sx={{ position: 'relative' }}
          >
            <LoadingOverlay visible={loading} />
            {comments?.map((comment) => (
              <Comment key={comment} commentId={comment} />
            ))}
          </Group>
        )}
      </Group>
    </>
  );
};
