import { Dispatch, memo, SetStateAction, useEffect, useReducer } from 'react';
import {
  Avatar,
  Group,
  Modal,
  Text,
  createStyles,
  LoadingOverlay,
} from '@mantine/core';

import { CreatePostInput } from './CreatePostModal/CreatePostInput';
import { AppDropzone } from './CreatePostModal/AppDropzone';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  ActionType,
  createPostReducer,
  initialState,
} from './createPostReducer';
import { ModalFooter } from './CreatePostModal/ModalFooter';
import { ImagesPreview } from './CreatePostModal/ImagesPreview';
import postApi from '../../api/postApi';

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

const UserAvatar = memo(() => {
  const profileImage = useAppSelector((state) => state.user.profileImage);
  const firstName = useAppSelector((state) => state.user.firstName);
  const lastName = useAppSelector((state) => state.user.lastName);

  return (
    <Group spacing={8}>
      <Avatar radius='xl' src={profileImage} />
      <Text size='xs'>{`${firstName} ${lastName}`}</Text>
    </Group>
  );
});

export const CreatePostModal = ({
  opened,
  setOpened,
}: CreatePostModalProps) => {
  const [state, dispatch] = useReducer(createPostReducer, initialState);

  const reduxDispatch = useAppDispatch();
  const { classes } = useStyles();

  const handleSendPost = async () => {
    try {
      dispatch({ type: ActionType.StartLoading });
      await reduxDispatch(
        postApi.createPost({ content: state.content, images: state.imageFiles })
      ).unwrap();
      dispatch({ type: ActionType.Reset });
      dispatch({ type: ActionType.StopLoading });
      setOpened(false);
    } catch (err: any) {
      dispatch({ type: ActionType.StopLoading });
    }
  };

  useEffect(() => {
    if (!opened) {
      dispatch({ type: ActionType.Reset });
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
        <UserAvatar />
        <LoadingOverlay visible={state.loading} />
        <CreatePostInput
          dispatch={dispatch}
          showDropzone={state.showDropzone}
          content={state.content}
        />
        {state.showDropzone && (
          <>
            <AppDropzone dispatch={dispatch} imageFiles={state.imageFiles} />
            <ImagesPreview dispatch={dispatch} imageFiles={state.imageFiles} />
          </>
        )}
        <ModalFooter dispatch={dispatch} handleSendPost={handleSendPost} />
      </Group>
    </Modal>
  );
};
