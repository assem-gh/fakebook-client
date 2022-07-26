import { Group } from '@mantine/core';

import { CreatePostBox } from '../components/CreatePost/CreatePostBox';
import { Post } from '../components/Post/Post';
import { Main } from '../components/Layout/Main';

export const Home = () => {
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
        <Post id='' />
      </Group>
    </Main>
  );
};
