import { EntityId } from '@reduxjs/toolkit';
import { Avatar, AvatarsGroup, Group, Text } from '@mantine/core';

import { selectById } from '../../store/postSlice';
import { useAppSelector } from '../../store/hooks';

interface Props {
  id: EntityId;
}

export const PostBody = ({ id }: Props) => {
  const post = useAppSelector((state) => selectById(state, id));
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
      <Group position='apart' px='lg'>
        <Group position='left' spacing={8}>
          <AvatarsGroup size={32} limit={3} total={post?.likes?.length}>
            {post?.likes?.map((u) => (
              <Avatar key={u.id} src={u.profileImage} />
            ))}
          </AvatarsGroup>
        </Group>
        <Text>0 comments</Text>
      </Group>
    </>
  );
};
