import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { Button, Group, Textarea } from '@mantine/core';

import { EmojiPicker } from '../CreatePost/CreatePostModal/EmojiPicker';
import { useAppDispatch } from '../../store/hooks';
import commentApi from '../../api/http/commentApi';
import { getThemeColor } from '../../utils/fns';

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
        minRows={1}
        maxRows={4}
        radius='sm'
        rightSection={
          <>
            <EmojiPicker
              inputRef={inputRef}
              content={content}
              setContent={setContent}
            />
            {!editMode && (
              <Button size='xs' onClick={onComment}>
                Send
              </Button>
            )}
          </>
        }
        styles={(theme) => ({
          input: {
            backgroundColor: getThemeColor(theme, 4, 0),
            paddingRight: !editMode ? '106px' : '36px',
          },
          rightSection: {
            width: !editMode ? '112px' : '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: !editMode ? '8px' : 0,
          },
        })}
      />

      {editMode && (
        <Group position='right'>
          <Button
            variant='outline'
            color='gray'
            sx={{ width: '92px' }}
            onClick={onCancel}
          >
            cancel
          </Button>
          <Button sx={{ width: '92px' }} onClick={onComment}>
            {editMode ? 'Edit' : 'Send'}
          </Button>{' '}
        </Group>
      )}
    </>
  );
};
