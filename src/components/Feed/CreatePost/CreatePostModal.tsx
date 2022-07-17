import { Dispatch, SetStateAction, useState } from 'react';
import {
  Avatar,
  Group,
  Modal,
  Text,
  Textarea,
  ActionIcon,
  Button,
  createStyles,
  Tooltip,
  Divider,
} from '@mantine/core';

import { TbMoodSmile } from 'react-icons/tb';
import { MdVideoLibrary, MdPhotoLibrary } from 'react-icons/md';

import { useAppSelector } from '../../../store/hooks';

const useStyles = createStyles((theme) => ({
  inner: {
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    [theme.fn.largerThan('sm')]: {
      paddingLeft: theme.spacing.sm,
      paddingRight: theme.spacing.sm,
    },
  },
  emojisButton: {
    color: theme.colors.gray[5],
  },
}));

interface CreatePostModalProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

export const CreatePostModal = ({
  opened,
  setOpened,
}: CreatePostModalProps) => {
  const [content, setContent] = useState('');

  const profileImage = useAppSelector((state) => state.user.profileImage);
  const firstName = useAppSelector((state) => state.user.firstName);
  const lastName = useAppSelector((state) => state.user.lastName);

  const { classes } = useStyles();

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title='Create New Post'
      size='lg'
      classNames={{
        inner: classes.inner,
      }}
    >
      <Group direction='column' grow>
        <Group spacing={8}>
          <Avatar radius='xl' src={profileImage} />
          <Text size='xs'>{`${firstName} ${lastName}`}</Text>
        </Group>
        <Group grow direction='column' spacing={4}>
          <Textarea
            value={content}
            autosize
            onChange={(e) => setContent(e.currentTarget.value)}
            placeholder={`What's in your mind, ${firstName}`}
            minRows={3}
            maxRows={6}
          />
        </Group>
        <Group position='apart'>
          <Group position='right' sx={{ flexGrow: 1 }}>
            <Tooltip label='emojis'>
              <ActionIcon
                radius='md'
                variant='transparent'
                className={classes.emojisButton}
                p={0}
              >
                <TbMoodSmile size={24} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label='Photos'>
              <ActionIcon radius='md' color='green' p={2}>
                <MdPhotoLibrary size={24} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label='Videos'>
              <ActionIcon radius='md' color='red' p={2}>
                <MdVideoLibrary size={24} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Divider orientation='vertical' sx={{ height: '36px' }} />
          <Button size='sm'>Post</Button>
        </Group>
      </Group>
    </Modal>
  );
};
