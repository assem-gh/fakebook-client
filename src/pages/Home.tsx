import { useEffect } from 'react';

import { Button, Group } from '@mantine/core';

import { CreatePostBox } from '../components/CreatePost/CreatePostBox';
import { Post } from '../components/Post/Post';
import { Main } from '../components/Layout/Main';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import postApi from '../api/postApi';
import { selectIds } from '../store/postSlice';

export const Home = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => selectIds(state));
  const { before, end, loading } = useAppSelector((state) => state.posts);

  const handleReload = () => {
    dispatch(postApi.getAllPosts({ before }));
  };

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
        {posts?.map((id) => (
          <Post id={id} key={id} />
        ))}
        {!end && (
          <Button loading={loading} variant='outline' onClick={handleReload}>
            Load more
          </Button>
        )}
      </Group>
    </Main>
  );
};
