import { useMemo } from 'react';

import {
  ActionIcon,
  Avatar,
  AvatarsGroup,
  Group,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { BiComment } from 'react-icons/bi';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';
import postApi from '../../api/http/postApi';
import { useNavigate } from 'react-router-dom';
import commentApi from '../../api/http/commentApi';

interface Props {
  postId: string;
}

export const PostMeta = ({ postId }: Props) => {
  const userId = useAppSelector((state) => state.user.id);
  const postLikes = useAppSelector(
    (state) => state.posts.entities[postId].likes
  );
  const postCommentsIds = useAppSelector(
      (state) => state.posts.entities[postId].commentsIds
  );


  const likedByUser = useMemo(
    () => postLikes?.some((user) => user.id === userId),
    [postLikes, userId]
  );

  const commentsCount = postCommentsIds.length

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const handleLike = () => {
    const action = likedByUser ? 'unlike' : 'like';
    dispatch(postApi.likePost({ postId, action }));
  };

  const handleOpenComments = () => {
    navigate('/posts/' + postId);
    dispatch(commentApi.getPostComments(postId));
  };

  return (
    <Group position='apart' px='lg' sx={{ minHeight: '32px', width: '100%' }}>
      <Group position='left' spacing={8}>
        <AvatarsGroup size={28} limit={3} total={postLikes?.length}>
          {postLikes?.map((u) => (
            <Avatar key={u.id} src={u.profile.profileImage} />
          ))}
        </AvatarsGroup>
      </Group>
      <Group>
        <Group spacing={6} position='center'>
          <Text
            size='md'
            color={likedByUser ? theme.colors.indigo[5] : 'inherit'}
          >
            {postLikes?.length}
          </Text>
          <ActionIcon variant='transparent' onClick={handleLike}>
            {likedByUser ? (
              <AiTwotoneLike color={theme.colors.indigo[5]} size={22} />
            ) : (
              <AiOutlineLike size={22} />
            )}
          </ActionIcon>
        </Group>
        <Group spacing={6} position='center' onClick={handleOpenComments}>
          <Text size='md'>{commentsCount} </Text>
          <ActionIcon variant='transparent'>
            <BiComment size={22} />
          </ActionIcon>
        </Group>
      </Group>
    </Group>
  );
};
