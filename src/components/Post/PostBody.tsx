import { EntityId } from '@reduxjs/toolkit';
import { Avatar, AvatarsGroup, Group, Text } from '@mantine/core';

import { selectPostById } from '../../store/slices/postSlice';
import { useAppSelector } from '../../store/hooks';

interface Props {
  postId: EntityId;
}

export const PostBody = ({ postId }: Props) => {
  const post = useAppSelector((state) => selectPostById(state, postId));

  return (
    <>
      <Group direction='column' my='lg'>
        <Text px='lg'> {post?.content}</Text>
        <Group direction='column' position='apart' spacing={2} noWrap>
          {post?.images.map((img, i) => (
            <img
              style={{
                width: '100%',
                alignSelf: 'flex-start',
              }}
              src={img}
              key={img + i}
            />
          ))}
        </Group>
      </Group>
      <Group position='apart' px='lg' sx={{ minHeight: '32px' }}>
        <Group position='left' spacing={8}>
          <AvatarsGroup size={28} limit={3} total={post?.likes?.length}>
            {post?.likes?.map((u) => (
              <Avatar key={u.id} src={u.profileImage} />
            ))}
          </AvatarsGroup>
        </Group>
        <Text>{post?.commentsIds.length} comments</Text>
      </Group>
    </>
  );
};
