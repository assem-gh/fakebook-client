import { Group} from '@mantine/core';
import { useAppSelector } from '../../store/hooks';
import { CreatePostBox } from '../CreatePost/CreatePostBox';
import { Post } from '../Post/Post';

export const TimeLineSection = () => {
  const postsIds = useAppSelector((state) => state.posts.owned);

  return (
    <Group direction='column' spacing={12} grow>
      <CreatePostBox />
      {postsIds.map((id) => (
        <Post key={id} id={id} postPage={false} />
      ))}
    </Group>
  );
};
