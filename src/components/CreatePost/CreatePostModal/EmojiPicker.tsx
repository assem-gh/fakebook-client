import { RefObject, useEffect, useState, MouseEvent, Dispatch } from 'react';

import { ActionIcon, createStyles } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

import Picker, { IEmojiData } from 'emoji-picker-react';

import { TbMoodSmile } from 'react-icons/tb';
import { ActionType, CreatePostAction } from '../createPostReducer';

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  emojisButton: {
    color: theme.colors.gray[5],
  },
  pickerWrapper: {
    '& aside.emoji-picker-react': {
      background:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      boxShadow: 'none',
      border:
        theme.colorScheme === 'dark'
          ? '2px solid' + theme.colors.gray[8]
          : '2px solid' + theme.colors.gray[2],
      '& .emoji-group:before': {
        background:
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      },
      '& .emoji-categories': {
        filter: theme.colorScheme === 'dark' ? 'invert(0.8)' : 'none',
      },
      '& .active-category-indicator': {
        backgroundColor: theme.colors.blue[7],
      },
      '& .emoji-search': {
        background:
          theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        border:
          theme.colorScheme === 'dark'
            ? '1px solid' + theme.colors.gray[7]
            : '1px solid' + theme.colors.gray[4],
      },
      '& .emoji-search:focus': {
        borderColor: theme.colors.blue[7],
      },
    },
  },
}));

const pickerStyle = {
  position: 'absolute ',
  top: '42px',
  right: '6px',
};

interface EmojiPickerProps {
  inputRef: RefObject<HTMLTextAreaElement>;
  content: string;
  dispatch: Dispatch<CreatePostAction>;
}

export const EmojiPicker = ({
  inputRef,
  dispatch,
  content,
}: EmojiPickerProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const [cursorPos, setCursorPos] = useState(0);

  const pickerRef = useClickOutside(() => setShowPicker(false));

  const { classes } = useStyles();

  const handleEmojiClick = (e: MouseEvent, data: IEmojiData) => {
    if (inputRef.current) {
      inputRef.current.focus();

      const cursorPos = inputRef.current.selectionStart;
      const contentBefore = content.substring(0, cursorPos);
      const contentAfter = content.substring(cursorPos);

      dispatch({
        type: ActionType.UpdateContent,
        payload: contentBefore + data.emoji + contentAfter,
      });
      setCursorPos(cursorPos + data.emoji.length);
    }
  };

  useEffect(() => {
    if (inputRef.current && cursorPos)
      inputRef.current.selectionEnd = cursorPos;
  }, [cursorPos]);

  return (
    <div className={classes.container} ref={pickerRef}>
      <ActionIcon
        radius='md'
        variant='transparent'
        className={classes.emojisButton}
        onClick={() => setShowPicker((pre) => !pre)}
        p={0}
      >
        <TbMoodSmile size={24} />
      </ActionIcon>

      {showPicker && (
        <div className={classes.pickerWrapper}>
          <Picker
            native
            onEmojiClick={handleEmojiClick}
            pickerStyle={pickerStyle}
          />
        </div>
      )}
    </div>
  );
};
