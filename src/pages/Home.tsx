import { Group } from '@mantine/core';

import { CreatePostBox } from '../components/Feed/CreatePost/CreatePostBox';
import { Main } from '../components/Layout/Main';

export const Home = () => {
  return (
    <Main>
      <Group direction='column' grow>
        <CreatePostBox />
      </Group>
    </Main>
  );
};
