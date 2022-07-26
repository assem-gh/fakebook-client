import { ChangeEvent, Dispatch, useRef } from 'react';
import { createStyles, Textarea } from '@mantine/core';

import { useAppSelector } from '../../../store/hooks';
import { EmojiPicker } from './EmojiPicker';
import { ActionType, CreatePostAction } from '../createPostReducer';

const useStyles = createStyles((theme) => ({
  rightSection: {
    alignItems: 'flex-start',
    padding: `8px ${theme.spacing.sm}px`,
  },
}));

interface CreatePostInputProps {
  dispatch: Dispatch<CreatePostAction>;
  showDropzone: boolean;
  content: string;
}
export const CreatePostInput = ({
  showDropzone,
  content,
  dispatch,
}: CreatePostInputProps) => {
  const firstName = useAppSelector((state) => state.user.firstName);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { classes } = useStyles();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: ActionType.UpdateContent, payload: e.target.value });
  };

  return (
    <Textarea
      value={content}
      ref={inputRef}
      autosize
      onChange={onChange}
      placeholder={`What's in your mind, ${firstName} ?`}
      minRows={showDropzone ? 1 : 3}
      maxRows={6}
      rightSection={
        <EmojiPicker
          dispatch={dispatch}
          content={content}
          inputRef={inputRef}
        />
      }
      classNames={{ rightSection: classes.rightSection }}
    />
  );
};
