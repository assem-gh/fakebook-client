import { Avatar, Group, Text } from '@mantine/core';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { PostMenu } from '../Menu/PostMenu';

dayjs.extend(relativeTime);

interface PostHeaderProps {
  userName: string;
  profileImage: string;
  createdAt: string;
}

export const PostHeader = ({
  userName,
  profileImage,
  createdAt,
}: PostHeaderProps) => {
  return (
    <Group position='apart' px='md'>
      <Group spacing={12}>
        <Avatar size={32} radius='xl' src={profileImage} />
        <Group direction='column' spacing={4}>
          <Text size='sm'> {userName}</Text>
          <Text size='xs' color='dimmed' mt={-6}>
            {dayjs(createdAt).fromNow()}
          </Text>
        </Group>
      </Group>
      <PostMenu />
    </Group>
  );
};
