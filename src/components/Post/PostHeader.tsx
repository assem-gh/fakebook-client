import { Avatar, Group, Text } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { PostMenu } from '../Menu/PostMenu';
import { useAppSelector } from '../../store/hooks';

dayjs.extend(relativeTime);

interface PostHeaderProps {
  postId: string;
}

export const PostHeader = ({ postId }: PostHeaderProps) => {
  const owner = useAppSelector(
    (state) => state.posts.entities[postId].owner,
    (a, b) => a?.id === b?.id
  );

  const createdAt = useAppSelector(
    (state) => state.posts.entities[postId].createdAt
  );

  return (
    <Group position='apart' px='md'>
      <Group spacing={12}>
        <Avatar size={32} radius='xl' src={owner.profile.profileImage} />
        <Group direction='column' spacing={4}>
          <Text size='sm'> {owner?.userName}</Text>
          <Text size='xs' color='dimmed' mt={-6}>
            {dayjs(createdAt).fromNow()}
          </Text>
        </Group>
      </Group>
      <PostMenu postId={postId} />
    </Group>
  );
};
