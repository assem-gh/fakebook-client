import {
  Group,
  Text,
  Image,
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

const useStyles = createStyles((theme) => ({
  postAction: {
    display: 'flex',
    height: '48px',
    borderRadius: 0,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px 0px',
    gap: theme.spacing.md,
  },
}));

interface PostProps {
  id: string;
}

export const Post = ({ id }: PostProps) => {
  const { classes, theme } = useStyles();
  return (
    <Paper shadow='xs' withBorder pt='md' px={0} radius='md'>
      <PostHeader userName='user name' profileImage='' />
      <Divider my='sm' />

      <Group direction='column' my='lg'>
        <Text px='lg'> Post content</Text>
        <Image src='' width='100%' />
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
      <Divider mt='sm' />
      <Group spacing={0}>
        <Button
          variant='subtle'
          color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
          leftIcon={<AiOutlineLike color='gray' size={22} />}
          className={classes.postAction}
        >
          Like
        </Button>
        <Divider orientation='vertical' sx={{ height: '48px' }} p={0} />
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
