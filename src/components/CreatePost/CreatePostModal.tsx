import { Dispatch, memo, SetStateAction, useEffect, useReducer } from 'react';
import { EntityId } from '@reduxjs/toolkit';

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
import postApi from '../../api/http/postApi';
import { selectPostById } from '../../store/slices/postSlice';

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
  id?: EntityId;
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
  id,
}: CreatePostModalProps) => {
  const [state, dispatch] = useReducer(createPostReducer, initialState);

  let postImages: string[] | undefined;
  let postContent: string | undefined;
  if (id) {
    postImages = useAppSelector((state) => selectPostById(state, id)?.images);
    postContent = useAppSelector((state) => selectPostById(state, id)?.content);
  }

  const reduxDispatch = useAppDispatch();
  const { classes } = useStyles();

  const handleSendPost = async () => {
    try {
      const data = { content: state.content, images: state.imageFiles };
      dispatch({ type: ActionType.Loading, payload: true });
      if (id) {
        await reduxDispatch(
          postApi.updatePost({
            id,
            links: state.imageLinks,
            ...data,
          })
        );
      } else await reduxDispatch(postApi.createPost(data)).unwrap();
      dispatch({ type: ActionType.Reset });
      dispatch({ type: ActionType.Loading, payload: false });
      setOpened(false);
    } catch (err: any) {
      dispatch({ type: ActionType.Loading, payload: false });
    }
  };

  useEffect(() => {
    if (id) {
      dispatch({ type: ActionType.AddImageLinks, payload: postImages });
      dispatch({ type: ActionType.UpdateContent, payload: postContent });
      dispatch({ type: ActionType.ShowDropzone, payload: true });
    }
  }, [id, opened]);

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
            <ImagesPreview
              dispatch={dispatch}
              imageFiles={state.imageFiles}
              imageLinks={state.imageLinks}
            />
          </>
        )}
        <ModalFooter
          dispatch={dispatch}
          handleSendPost={handleSendPost}
          edit={Boolean(id)}
        />
      </Group>
    </Modal>
  );
};
