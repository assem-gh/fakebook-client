import { useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Avatar, createStyles, Group, Paper, Text } from '@mantine/core';

import { selectCommentById } from '../../store/slices/commentSlice';
import { useAppSelector } from '../../store/hooks';

import { getThemeColor } from '../../utils/fns';
import { CommentMenu } from '../Menu/CommentMenu';
import { CommentInput } from './CommentInput';

dayjs.extend(relativeTime);

const useStyles = createStyles((theme) => ({
  paper: {
    width: '100%',
    backgroundColor: getThemeColor(theme, 8, 0),
  },
}));

interface Props {
  commentId: EntityId;
}

export const Comment = ({ commentId }: Props) => {
  const [edit, setEdit] = useState(false);

  const comment = useAppSelector((state) =>
    selectCommentById(state, commentId)
  );

  const userId = useAppSelector((state) => state.user.id);
  const isOwner = comment?.owner.id === userId;

  const { classes } = useStyles();

  if (!comment) return null;

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
            {isOwner && (
              <CommentMenu
                commentId={comment.id}
                postId={comment.postId}
                setEdit={setEdit}
              />
            )}
          </Group>
          <Group direction='column' grow py='xs' sx={{ width: '100%' }}>
            {edit ? (
              <CommentInput
                commentId={comment.id}
                commentContent={comment.content}
                setEdit={setEdit}
              />
            ) : (
              <Text>{comment.content}</Text>
            )}
          </Group>
        </Group>
      </Group>
    </Paper>
  );
};
