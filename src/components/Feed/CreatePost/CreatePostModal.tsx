import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Avatar,
  Group,
  Modal,
  Text,
  ActionIcon,
  Button,
  createStyles,
  Tooltip,
  Divider,
  LoadingOverlay,
} from '@mantine/core';

import { MdVideoLibrary, MdPhotoLibrary } from 'react-icons/md';

import { CreatePostInput } from './CreatePostInput';
import { PostImageUpload } from './PostImageUpload';
import postApi from '../../../api/postApi';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

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
  const [showDropzone, setShowDropzone] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const profileImage = useAppSelector((state) => state.user.profileImage);
  const firstName = useAppSelector((state) => state.user.firstName);
  const lastName = useAppSelector((state) => state.user.lastName);

  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  const handleSendPost = async () => {
    try {
      setLoading(true);
      await dispatch(postApi.createPost({ images, content })).unwrap();
      setLoading(false);
      setOpened(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!opened) {
      setContent('');
      setShowDropzone(false);
      setImages([]);
    }
  }, [opened]);

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
        <LoadingOverlay visible={loading} />
        <Group grow direction='column' spacing={16}>
          <CreatePostInput
            content={content}
            setContent={setContent}
            showDropzone={showDropzone}
          />
          {showDropzone && (
            <PostImageUpload
              setShow={setShowDropzone}
              images={images}
              setImages={setImages}
            />
          )}
        </Group>

        <Group position='apart'>
          <Group position='right' sx={{ flexGrow: 1 }}>
            <Tooltip label='Photos'>
              <ActionIcon
                onClick={() => setShowDropzone((pre) => !pre)}
                radius='md'
                color='green'
                p={2}
              >
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

          <Button onClick={handleSendPost} size='sm'>
            Post
          </Button>
        </Group>
      </Group>
    </Modal>
  );
};
