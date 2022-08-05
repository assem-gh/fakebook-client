import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { Box, Button, Group, Textarea } from '@mantine/core';

import { EmojiPicker } from '../CreatePost/CreatePostModal/EmojiPicker';
import { useAppDispatch } from '../../store/hooks';
import commentApi from '../../api/http/commentApi';

interface Props {
  postId?: EntityId;
  commentId?: EntityId;
  commentContent?: string;
  setEdit?: Dispatch<SetStateAction<boolean>>;
}

export const CommentInput = ({
  postId,
  commentContent,
  commentId,
  setEdit,
}: Props) => {
  const [content, setContent] = useState('');
  const inputRef = useRef(null);

  const dispatch = useAppDispatch();
  const editMode = Boolean(commentId);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onCancel = () => {
    if (setEdit) setEdit(false);
  };

  const onComment = async () => {
    try {
      if (editMode && setEdit) {
        dispatch(commentApi.updateComment({ commentId: commentId!, content }));
        setEdit(false);
      } else {
        dispatch(
          commentApi.createComment({ content, postId: postId as string })
        );
      }
      setContent('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (commentContent) setContent(commentContent);
  }, []);

  return (
    <>
      <Textarea
        ref={inputRef}
        autosize
        placeholder='Write your comment ...'
        value={content}
        onChange={onChange}
        minRows={editMode ? 1 : 2}
        maxRows={4}
        radius='sm'
        rightSection={
          editMode && (
            <Box sx={{ position: 'relative' }}>
              <EmojiPicker
                inputRef={inputRef}
                content={content}
                setContent={setContent}
              />
            </Box>
          )
        }
      />
      <Group position='right'>
        {!editMode && (
          <Box sx={{ position: 'relative' }}>
            <EmojiPicker
              inputRef={inputRef}
              content={content}
              setContent={setContent}
            />
          </Box>
        )}
        {editMode && (
          <Button
            variant='outline'
            color='gray'
            sx={{ width: '92px' }}
            onClick={onCancel}
          >
            cancel
          </Button>
        )}
        <Button sx={{ width: '92px' }} onClick={onComment}>
          {editMode ? 'Edit' : 'Send'}
        </Button>
      </Group>
    </>
  );
};
