import { EntityId } from '@reduxjs/toolkit';
import { Group, Text } from '@mantine/core';

import { selectPostById } from '../../store/slices/postSlice';
import { useAppSelector } from '../../store/hooks';
import { PostMeta } from './PostMeta';
import { PostImages } from './PostImages';

interface Props {
  postId: EntityId;
}

export const PostBody = ({ postId }: Props) => {
  const content = useAppSelector(
    (state) => selectPostById(state, postId)?.content
  );

  return (
    <Group direction='column' spacing={16}>
      <Text px='lg'>{content}</Text>
      <PostImages postId={postId} />
      <PostMeta postId={postId} />
    </Group>
  );
};
