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
  imageLinks: string[];
}

interface Image {
  type: 'file' | 'link';
  url: string;
  name: string;
}

export const ImagesPreview = ({
  imageLinks,
  imageFiles,
  dispatch,
}: ImagesPreviewProps) => {
  const { classes } = useStyles();

  const deleteFile = (img: Image) => () => {
    const dispatchType =
      img.type === 'file'
        ? ActionType.RemoveImageFile
        : ActionType.RemoveImageLink;
    dispatch({ type: dispatchType, payload: img.name });
  };

  const imageFilesUrls: Image[] = imageFiles.map((file) => ({
    type: 'file',
    url: URL.createObjectURL(file),
    name: file.name,
  }));
  const imageLinksUrls: Image[] = imageLinks.map((link) => ({
    type: 'link',
    url: link,
    name: link,
  }));

  const allImages = [...imageLinksUrls, ...imageFilesUrls];
  const images = allImages.map((img, i) => {
    return (
      <Grid.Col key={img.name + i} span={4} sx={{ position: 'relative' }}>
        <CloseButton
          onClick={deleteFile(img)}
          className={classes.previewCloseBtn}
          size={18}
          variant='filled'
          color='gray'
        />

        <Image
          radius='sm'
          key={i}
          src={img.url}
          height='148px'
          width='100%'
          imageProps={{ onLoad: () => URL.revokeObjectURL(img.url) }}
        />
      </Grid.Col>
    );
  });

  return useMemo(
    () => <Grid columns={12}>{images}</Grid>,
    [imageFiles, imageLinks]
  );
};
