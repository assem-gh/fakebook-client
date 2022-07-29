import { Avatar, Group, Text } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { PostMenu } from '../Menu/PostMenu';
import { UserShort } from '../../store/types';
import { EntityId } from '@reduxjs/toolkit';

dayjs.extend(relativeTime);

interface PostHeaderProps {
  owner: UserShort;
  createdAt: string;
  postId: EntityId;
}

export const PostHeader = ({ owner, createdAt, postId }: PostHeaderProps) => {
  return (
    <Group position='apart' px='md'>
      <Group spacing={12}>
        <Avatar size={32} radius='xl' src={owner.profileImage} />
        <Group direction='column' spacing={4}>
          <Text size='sm'> {owner.userName}</Text>
          <Text size='xs' color='dimmed' mt={-6}>
            {dayjs(createdAt).fromNow()}
          </Text>
        </Group>
      </Group>
      <PostMenu ownerId={owner.id} postId={postId} />
    </Group>
  );
};
