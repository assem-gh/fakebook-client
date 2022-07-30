import { Dispatch, memo } from 'react';
import { Group, Text, CloseButton, createStyles } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import { TbPhoto } from 'react-icons/tb';
import { ActionType, CreatePostAction } from '../createPostReducer';
import { getThemeColor } from '../../../utils/fns';

const useStyles = createStyles((theme) => ({
  dropZone: {
    border: getThemeColor(theme, 4, 4),
    backgroundColor: getThemeColor(theme, 6),
  },
  wrapper: {
    minHeight: 220,
    width: '100%',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    zIndex: 10,
    '&:hover': {
      backgroundColor: getThemeColor(theme, 4, 2),
    },
  },
  previewCloseBtn: {
    position: 'absolute',
    top: '14px',
    right: '14px',
    zIndex: 10,
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'light'
          ? theme.fn.rgba(theme.colors.gray[6], 0.7)
          : theme.fn.rgba(theme.colors.dark[6], 0.4),
    },
  },
}));

export const dropzoneChildren = (dispatch: Dispatch<CreatePostAction>) => {
  const { classes, theme } = useStyles();

  return (
    <Group
      position='center'
      direction='column'
      spacing='xs'
      className={classes.wrapper}
    >
      <CloseButton
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: ActionType.ShowDropzone, payload: false });
        }}
        className={classes.closeButton}
      />
      <TbPhoto size={80} color={getThemeColor(theme, 0, 7)} />
      <Text size='md'>Drag images here or click to select files</Text>
    </Group>
  );
};

interface AppDropzoneProps {
  dispatch: Dispatch<CreatePostAction>;
  imageFiles: File[];
}

export const AppDropzone = memo(
  ({ dispatch, imageFiles }: AppDropzoneProps) => {
    const { classes } = useStyles();

    const onDrop = (files: File[]) => {
      const uniqueFiles = files.reduce<File[]>((acc, current) => {
        const exist = imageFiles.find((image) => image.name === current.name);
        if (exist) return acc;
        return [...acc, current];
      }, []);
      dispatch({ type: ActionType.AddImageFiles, payload: uniqueFiles });
    };

    return (
      <Dropzone
        onDrop={onDrop}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        classNames={{
          root: classes.dropZone,
        }}
      >
        {() => dropzoneChildren(dispatch)}
      </Dropzone>
    );
  }
);
