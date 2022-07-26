import { Avatar, Group, Text } from '@mantine/core';

import { PostMenu } from '../Menu/PostMenu';

interface PostHeaderProps {
  userName: string;
  profileImage: string;
}

export const PostHeader = ({}: PostHeaderProps) => {
  return (
    <Group position='apart' px='md'>
      <Group spacing={6}>
        <Avatar size={48} radius='xl' />
        <Group direction='column' spacing={0}>
          <Text size='sm'> user name</Text>
          <Text size='xs' color='dimmed' mt={-6}>
            month ago
          </Text>
        </Group>
      </Group>
      <PostMenu />
    </Group>
  );
};
