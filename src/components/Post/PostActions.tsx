import { EntityId } from '@reduxjs/toolkit';
import { Button, createStyles, Divider, Group, Text } from '@mantine/core';
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';
import { BiComment, BiCommentDots } from 'react-icons/bi';

import postApi from '../../api/postApi';
import { useAppDispatch } from '../../store/hooks';
import { Dispatch, SetStateAction } from 'react';

const useStyles = createStyles((theme) => ({
  postAction: {
    display: 'flex',
    height: '48px',
    borderRadius: 0,
    width: `calc(50% - 1px)`,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px 0px',
  },
  vertical: {
    height: '48px',
    padding: 0,
  },
}));

interface Props {
  id: EntityId;
  likedByUser: boolean;
  hasComments: boolean;
  setShowComments: Dispatch<SetStateAction<boolean>>;
}

export const PostActions = ({
  likedByUser,
  hasComments,
  id,
  setShowComments,
}: Props) => {
  const dispatch = useAppDispatch();
  const { classes, theme } = useStyles();

  const handleLike = () => {
    dispatch(postApi.likePost(id as string));
  };

  return (
    <Group spacing={0} position='center'>
      <Button
        variant='subtle'
        color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
        leftIcon={
          likedByUser ? (
            <AiTwotoneLike color={theme.colors.blue[7]} size={22} />
          ) : (
            <AiOutlineLike color='gray' size={22} />
          )
        }
        className={classes.postAction}
        onClick={handleLike}
      >
        <Text
          weight='normal'
          color={likedByUser ? theme.colors.blue[7] : 'inherit'}
        >
          Like
        </Text>
      </Button>
      <Divider orientation='vertical' className={classes.vertical} />
      <Button
        color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
        variant='subtle'
        leftIcon={
          hasComments ? (
            <BiCommentDots color='gray' size={22} />
          ) : (
            <BiComment color='gray' size={22} />
          )
        }
        className={classes.postAction}
        onClick={() => setShowComments((pre) => !pre)}
      >
        <Text weight='normal'>Comment</Text>
      </Button>
    </Group>
  );
};
