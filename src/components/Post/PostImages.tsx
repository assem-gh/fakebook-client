import { Box, createStyles, Overlay } from '@mantine/core';
import { EntityId } from '@reduxjs/toolkit';

import { TbPlus } from 'react-icons/tb';
import { useAppSelector } from '../../store/hooks';
import { selectPostById } from '../../store/slices/postSlice';

const useStyles = createStyles((theme) => ({
  wrapper: {
    maxHeight: '700px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    gap: '4px',
  },
  rest: {
    display: 'flex',
    gap: '4px',
    maxHeight: '350px',
    width: '100%',
  },
  last: {
    position: 'relative',

    hight: '100%',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    color: 'white',
  },
}));

interface Props {
  postId: EntityId;
}

export const PostImages = ({ postId }: Props) => {
  const images = useAppSelector(
    (state) => selectPostById(state, postId)?.images
  );
  const { classes, theme } = useStyles();

  if (!images || images.length === 0) return null;

  const firstImage = images[0];
  const rest = images.slice(1, 4);

  return (
    <Box className={classes.wrapper}>
      <Box>
        <img style={{ width: '100%' }} src={firstImage} />
      </Box>
      <Box className={classes.rest}>
        {rest.map((img, i) =>
          images.length > 4 && i === 2 ? (
            <Box
              className={classes.last}
              sx={{ backgroundImage: `url(${img})`, width: `${100 / 3}%` }}
              key={img + i}
            >
              <Overlay
                opacity={0.2}
                color={theme.colors.indigo[6]}
                blur={2}
                zIndex={1}
              />
              <TbPlus style={{ zIndex: 2 }} size={28} strokeWidth={3} />
              <Box
                sx={{
                  zIndex: 2,
                  fontSize: '28px',
                  fontWeight: 'bold',
                }}
                mb={2}
              >
                {images.length - 4}
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                width: `${rest.length > 3 ? 100 / 3 : 100 / rest.length}%`,
              }}
            >
              <img
                style={{ width: '100%', height: '100%' }}
                src={img}
                key={img + i}
              />
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};
