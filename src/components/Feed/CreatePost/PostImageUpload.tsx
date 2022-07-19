import { Dispatch, SetStateAction } from 'react';
import {
  Group,
  Text,
  CloseButton,
  Image,
  Grid,
  createStyles,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import { TbPhoto } from 'react-icons/tb';

const useStyles = createStyles((theme) => ({
  dropZone: {
    border:
      theme.colorScheme === 'dark'
        ? `1px solid ${theme.colors.dark[4]}`
        : `1px solid ${theme.colors.gray[4]}`,
  },
  image: { height: '100%' },
  wrapper: {
    minHeight: 220,
    width: '100%',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2],
    },
  },
}));

export const dropzoneChildren = (setShow: (v: boolean) => void) => {
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
          setShow(false);
        }}
        className={classes.closeButton}
      />
      <TbPhoto
        size={80}
        color={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[0]
            : theme.colors.gray[7]
        }
      />
      <Text size='md'>Drag images here or click to select files</Text>
    </Group>
  );
};

const Preview = ({ images }: { images: File[] }) => {
  const { classes } = useStyles();
  return (
    <Grid columns={12} sx={{ marginTop: '12px' }} gutter='xs'>
      {images.map((file, i) => {
        const imageUrl = URL.createObjectURL(file);
        return (
          <Grid.Col span={Math.floor(12 / Math.min(images.length, 3))}>
            <Image
              radius='sm'
              key={i}
              src={imageUrl}
              classNames={{
                root: classes.image,
                imageWrapper: classes.image,
                figure: classes.image,
              }}
              height='100%'
              imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
            />
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

interface PostImageUploadProps {
  setShow: Dispatch<SetStateAction<boolean>>;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}
export const PostImageUpload = ({
  setShow,
  images,
  setImages,
}: PostImageUploadProps) => {
  const { classes } = useStyles();

  const onDrop = (files: File[]) => {
    const uniqueFiles = files.reduce<File[]>((acc, current) => {
      const exist = images.find((image) => image.name === current.name);
      if (exist) return acc;
      return [...acc, current];
    }, []);
    setImages((pre) => [...pre, ...uniqueFiles]);
  };

  return (
    <>
      <Dropzone
        onDrop={onDrop}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        classNames={{
          root: classes.dropZone,
        }}
      >
        {() => dropzoneChildren(setShow)}
      </Dropzone>
      <Preview images={images} />
    </>
  );
};
