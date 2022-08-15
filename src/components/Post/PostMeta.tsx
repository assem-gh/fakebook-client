import { EntityId } from '@reduxjs/toolkit';

import { Avatar, AvatarsGroup, Group, Text } from '@mantine/core';
import { BiComment } from 'react-icons/bi';

import { selectPostById } from '../../store/slices/postSlice';
import { useAppSelector } from '../../store/hooks';

interface Props {
  postId: EntityId;
}

export const PostMeta = ({ postId }: Props) => {
  const postLikes = useAppSelector(
    (state) => selectPostById(state, postId)?.likes
  );

  const commentsCount = useAppSelector(
    (state) => selectPostById(state, postId)?.commentsIds
  )?.length;

  return (
    <Group position='apart' px='lg' sx={{ minHeight: '32px', width: '100%' }}>
      <Group position='left' spacing={8}>
        <AvatarsGroup size={28} limit={3} total={postLikes?.length}>
          {postLikes?.map((u) => (
            <Avatar key={u.id} src={u.profileImage} />
          ))}
        </AvatarsGroup>
      </Group>
      <Group>
        <Group spacing={6} position='center'>
          <Text size='sm'>{commentsCount} </Text>
          <BiComment size={18} />
        </Group>
      </Group>
    </Group>
  );
};
