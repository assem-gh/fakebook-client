import { EntityId } from '@reduxjs/toolkit';
import { Group } from '@mantine/core';

import { useAppSelector } from '../../store/hooks';
import { selectById } from '../../store/postSlice';
import { Comment } from './Comment';

import { CommentInput } from './CommentInput';

interface Props {
  id: EntityId;
}

export const CommentsSection = ({ id }: Props) => {
  const post = useAppSelector((state) => selectById(state, id));
  return (
    <Group direction='column' grow py='lg' px='md'>
      <CommentInput postId={id} />

      <Group direction='column' grow spacing={2}>
        {post?.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </Group>
    </Group>
  );
};
