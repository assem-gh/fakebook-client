import { Dispatch, SetStateAction, useRef } from 'react';
import { createStyles, Textarea } from '@mantine/core';

import { useAppSelector } from '../../../store/hooks';
import { EmojiPicker } from './EmojiPicker';

const useStyles = createStyles((theme) => ({
  rightSection: {
    alignItems: 'flex-start',
    padding: `8px ${theme.spacing.sm}px`,
  },
}));

interface CreatePostInputProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  showDropzone: boolean;
}
export const CreatePostInput = ({
  content,
  setContent,
  showDropzone,
}: CreatePostInputProps) => {
  const firstName = useAppSelector((state) => state.user.firstName);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { classes } = useStyles();

  return (
    <Textarea
      value={content}
      ref={inputRef}
      autosize
      onChange={(e) => setContent(e.currentTarget.value)}
      placeholder={`What's in your mind, ${firstName} ?`}
      minRows={showDropzone ? 1 : 3}
      maxRows={6}
      rightSection={
        <EmojiPicker
          content={content}
          setContent={setContent}
          inputRef={inputRef}
        />
      }
      classNames={{ rightSection: classes.rightSection }}
    />
  );
};
