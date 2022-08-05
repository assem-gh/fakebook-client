import { Avatar, Group, Text } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { PostMenu } from '../Menu/PostMenu';
import { selectPostById } from '../../store/slices/postSlice';
import { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from '../../store/hooks';

dayjs.extend(relativeTime);

interface PostHeaderProps {
  postId: EntityId;
}

export const PostHeader = ({ postId }: PostHeaderProps) => {
  const owner = useAppSelector((state) => selectPostById(state, postId)?.owner);

  const createdAt = useAppSelector(
    (state) => selectPostById(state, postId)?.createdAt
  );

  return (
    <Group position='apart' px='md'>
      <Group spacing={12}>
        <Avatar size={32} radius='xl' src={owner?.profileImage} />
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
