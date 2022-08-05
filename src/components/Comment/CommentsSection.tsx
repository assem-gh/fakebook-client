import { useEffect } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { Group, LoadingOverlay } from '@mantine/core';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectPostById } from '../../store/slices/postSlice';
import { Comment } from './Comment';

import { CommentInput } from './CommentInput';
import commentApi from '../../api/http/commentApi';

interface Props {
  postId: EntityId;
}

export const CommentsSection = ({ postId }: Props) => {
  const comments = useAppSelector(
    (state) => selectPostById(state, postId)?.commentsIds
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(commentApi.getPostComments(postId));
  }, []);

  const loading = useAppSelector((state) => state.comments.loading);

  return (
    <>
      <Group direction='column' grow py='lg' px='md'>
        <CommentInput postId={postId} />

        {Boolean(comments?.length) && (
          <Group
            direction='column'
            grow
            spacing={2}
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
