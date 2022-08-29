import { Group, Text } from '@mantine/core';

import { useAppSelector } from '../../store/hooks';
import { PostMeta } from './PostMeta';
import { PostImages } from './PostImages';
import { ImagesSlider } from './ImagesSlider';

interface Props {
  postId: string;
  postPage: boolean;
}

export const PostBody = ({ postId, postPage }: Props) => {
  const content = useAppSelector(
    (state) => state.posts.entities[postId].content
  );

  return (
    <Group direction='column' spacing={16}>
      <Text px='lg'>{content}</Text>
      {postPage ? (
        <ImagesSlider postId={postId} />
      ) : (
        <PostImages postId={postId} />
      )}
      <PostMeta postId={postId} />
    </Group>
  );
};
