import { Dispatch, useMemo } from 'react';

import { CloseButton, Image, Grid, createStyles } from '@mantine/core';

import { ActionType, CreatePostAction } from '../createPostReducer';

const useStyles = createStyles((theme) => ({
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

interface ImagesPreviewProps {
  dispatch: Dispatch<CreatePostAction>;
  imageFiles: File[];
}

export const ImagesPreview = ({ imageFiles, dispatch }: ImagesPreviewProps) => {
  const { classes } = useStyles();

  const deleteFile = (name: string) => () => {
    dispatch({ type: ActionType.RemoveImageFile, payload: name });
  };

  const images = imageFiles.map((file, i) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Grid.Col key={file.name + i} span={4} sx={{ position: 'relative' }}>
        <CloseButton
          onClick={deleteFile(file.name)}
          className={classes.previewCloseBtn}
          size={18}
          variant='filled'
          color='gray'
        />

        <Image
          radius='sm'
          key={i}
          src={imageUrl}
          height='148px'
          width='100%'
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        />
      </Grid.Col>
    );
  });

  return useMemo(() => <Grid columns={12}>{images}</Grid>, [imageFiles]);
};
