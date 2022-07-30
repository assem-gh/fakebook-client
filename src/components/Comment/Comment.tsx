import { Avatar, createStyles, Group, Paper, Text } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { CommentType } from '../../store/types';
import { getThemeColor } from '../../utils/fns';
import { CommentMenu } from '../Menu/CommentMenu';

dayjs.extend(relativeTime);

const useStyles = createStyles((theme) => ({
  paper: {
    width: '100%',
    backgroundColor: getThemeColor(theme, 8, 0),
  },
}));

interface Props {
  comment: CommentType;
}

export const Comment = ({ comment }: Props) => {
  const { classes } = useStyles();
  return (
    <Paper className={classes.paper} px='md' py='sm'>
      <Group spacing={16} sx={{ alignItems: 'flex-start' }}>
        <Avatar
          radius='xl'
          size={32}
          src={comment.owner.profileImage}
          mt='xs'
        />
        <Group spacing={8} direction='column' sx={{ flexGrow: 1 }}>
          <Group pt={4} position='apart' sx={{ width: '100%' }}>
            <Group>
              <Text size='sm'>user name</Text>
              <Text size='xs' color='dimmed'>
                {dayjs(comment.createdAt).fromNow()}
              </Text>
            </Group>
            <CommentMenu
              ownerId={comment.owner.id}
              commentId={comment.id}
              postId={comment.post.id}
            />
          </Group>
          <Group>
            <Text>{comment.content}</Text>
          </Group>
        </Group>
      </Group>
    </Paper>
  );
};
