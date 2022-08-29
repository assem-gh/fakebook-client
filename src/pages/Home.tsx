import { useState } from 'react';

import { Button, Group } from '@mantine/core';

import { CreatePostBox } from '../components/CreatePost/CreatePostBox';
import { Post } from '../components/Post/Post';
import { Main } from '../components/Layout/Main';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import postApi from '../api/http/postApi';
import { GetPostsArgs, PostGroup } from '../api/http/types';

interface Props {
  group: PostGroup;
}

const Posts = ({ group }: Props) => {
  const [loading, setLoading] = useState(false);

  const postsIds = useAppSelector((state) => state.posts[group]);
  let hasNext = useAppSelector((state) => state.posts.hasNext[group]);
  const next = useAppSelector((state) => state.posts.next[group]);

  const params: GetPostsArgs = {
    group,
    [group === 'feeds' ? 'before' : 'offset']: next,
  };

  const dispatch = useAppDispatch();

  const handleReload = async () => {
    try {
      setLoading(true);
      await dispatch(postApi.getPosts(params)).unwrap();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {postsIds?.map((id) => (
        <Post id={id} key={id} />
      ))}
      {hasNext && (
        <Button loading={loading} variant='light' onClick={handleReload}>
          Load more
        </Button>
      )}
    </>
  );
};

export const Home = ({ group }: Props) => {
  return (
    <Main>
      <Group direction='column' grow>
        {group === 'feeds' && <CreatePostBox />}
        <Posts group={group} />
      </Group>
    </Main>
  );
};
