import { ChangeEvent, useRef, useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { Box, Button, Group, Textarea } from '@mantine/core';

import { EmojiPicker } from '../CreatePost/CreatePostModal/EmojiPicker';
import { useAppDispatch } from '../../store/hooks';
import commentApi from '../../api/commentApi';

interface Props {
  postId?: EntityId;
}

export const CommentInput = ({ postId }: Props) => {
  const [content, setContent] = useState('');
  const inputRef = useRef(null);

  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onComment = () => {
    try {
      dispatch(commentApi.createComment({ content, postId: postId as string }));
      setContent('');
    } catch (error) {}
  };

  return (
    <>
      <Textarea
        ref={inputRef}
        autosize
        placeholder='Write your comment ...'
        value={content}
        onChange={onChange}
        minRows={2}
        maxRows={4}
        radius='sm'
      />
      <Group position='right'>
        <Box sx={{ position: 'relative' }}>
          <EmojiPicker
            inputRef={inputRef}
            content={content}
            setContent={setContent}
          />
        </Box>
        <Button onClick={onComment}>Send</Button>
      </Group>
    </>
  );
};
