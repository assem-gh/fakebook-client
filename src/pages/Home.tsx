import { useEffect } from 'react';

import { Button, Group } from '@mantine/core';

import { CreatePostBox } from '../components/CreatePost/CreatePostBox';
import { Post } from '../components/Post/Post';
import { Main } from '../components/Layout/Main';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import postApi from '../api/http/postApi';
import {
  selectIds,
  selectLikedPostsIds,
  selectSavedPostsIds,
} from '../store/slices/postSlice';

interface Props {
  type: 'feed' | 'saved' | 'liked';
}

const Posts = ({ type }: Props) => {
  const userId = useAppSelector((state) => state.user.id);

  const selector = {
    feed: selectIds,
    saved: selectSavedPostsIds(userId),
    liked: selectLikedPostsIds(userId),
  };

  const dispatch = useAppDispatch();
  const posts = useAppSelector(selector[type]);

  const before = useAppSelector((state) => state.posts.before);
  const hasNext = useAppSelector((state) => state.posts.hasNext);
  const loading = useAppSelector((state) => state.posts.loading);

  const handleReload = () => {
    dispatch(postApi.getAllPosts({ before }));
  };

  return (
    <>
      {posts?.map((id) => (
        <Post id={id} key={id} />
      ))}
      {hasNext && (
        <Button loading={loading} variant='outline' onClick={handleReload}>
          Load more
        </Button>
      )}
    </>
  );
};

export const Home = ({ type }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(postApi.getAllPosts({}));
  }, []);

  return (
    <Main>
      <Group
        direction='column'
        grow
        sx={(theme) => ({
          width: '100%',
          margin: 'auto',
          [theme.fn.largerThan('sm')]: {
            width: '90%',
          },
        })}
      >
        <CreatePostBox />
        <Posts type={type} />
      </Group>
    </Main>
  );
};
