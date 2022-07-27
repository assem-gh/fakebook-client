import {
  Group,
  Text,
  Paper,
  AvatarsGroup,
  Avatar,
  Divider,
  createStyles,
  Button,
} from '@mantine/core';
import { PostHeader } from './PostHeader';

import { AiTwotoneLike, AiOutlineLike } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { useAppSelector } from '../../store/hooks';
import { selectById } from '../../store/postSlice';
import { EntityId } from '@reduxjs/toolkit';

const useStyles = createStyles((theme) => ({
  postAction: {
    display: 'flex',
    height: '48px',
    borderRadius: 0,
    width: `calc(50% - ${theme.spacing.md / 2}px)`,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px 0px',
    gap: theme.spacing.md,
  },
  divider: {
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],
  },

  vertical: {
    height: '48px',
    padding: 0,
  },
}));

interface PostProps {
  id: EntityId;
}

export const Post = ({ id }: PostProps) => {
  const post = useAppSelector((state) => selectById(state, id));

  const { classes, theme } = useStyles();
  return (
    <Paper shadow='xs' withBorder pt='md' px={0} radius='md'>
      <PostHeader
        userName={post?.owner.userName!}
        profileImage={post?.owner.profileImage!}
        createdAt={post?.createdAt!}
      />
      <Divider my='sm' className={classes.divider} />

      <Group direction='column' my='lg'>
        <Text px='lg'> {post?.content}</Text>
        <Group direction='column' position='apart' spacing={2} noWrap>
          {post?.images.map((img, i) => (
            <img
              style={{
                width: '100%',
                alignSelf: 'flex-start',
              }}
              src={img}
              key={img + i}
            />
          ))}
        </Group>
      </Group>

      <Group position='apart' px='lg'>
        <Group position='left' spacing={8}>
          <AvatarsGroup size={32} limit={3} total={7}>
            <Avatar />
            <Avatar />
            <Avatar />
          </AvatarsGroup>
        </Group>
        <Text>0 comments</Text>
      </Group>
      <Divider mt='sm' className={classes.divider} />
      <Group spacing={0}>
        <Button
          variant='subtle'
          color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
          leftIcon={<AiOutlineLike color='gray' size={22} />}
          className={classes.postAction}
        >
          Like
        </Button>
        <Divider orientation='vertical' className={classes.vertical} />
        <Button
          color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
          variant='subtle'
          leftIcon={<BiComment color='gray' size={22} />}
          className={classes.postAction}
        >
          Comment
        </Button>
      </Group>
    </Paper>
  );
};
