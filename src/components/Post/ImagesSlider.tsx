import { Dispatch, SetStateAction, useState } from 'react';

import { Box, createStyles, Group, UnstyledButton } from '@mantine/core';
import { TbCaretLeft, TbCaretRight } from 'react-icons/tb';

import { useAppSelector } from '../../store/hooks';
import { getThemeColor } from '../../utils/fns';

const useStyles = createStyles((theme) => ({
  controlBtn: {
    backgroundColor: theme.colors.gray[7],
    height: '56px',
    width: '56px',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    transform: 'translateY(-50%)',

    zIndex: 1,
    '&:hover': {
      backgroundColor: theme.colors.dark[3],
    },
  },
  left: { left: 4, paddingRight: '6px' },
  right: { right: 4, paddingLeft: '6px' },

  indicatorContainer: {
    position: 'absolute',
    bottom: 12,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
  },
  indicator: {
    width: '24px',
    height: '6px',
    cursor: 'pointer',
    backgroundColor: getThemeColor(theme, 0, 5),
    opacity: 0.5,
  },
  active: {
    backgroundColor: getThemeColor(theme, 0, 5),
    opacity: 1,
  },
}));

interface SliderProps {
  postId: string;
}

export const ImagesSlider = ({ postId }: SliderProps) => {
  const [index, setIndex] = useState(0);
  const images = useAppSelector((state) => state.posts.entities[postId].images);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        maxHeight: '800px',
        position: 'relative',
      }}
    >
      <SliderControl
        position='left'
        setIndex={setIndex}
        imagesLength={images.length}
      />
      <SliderControl
        position='right'
        setIndex={setIndex}
        imagesLength={images.length}
      />

      <Box
        sx={{
          width: '100%',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          '& img': { width: '100%', maxHeight: '400px' },
        }}
      >
        <img src={images[index]} alt="post-image" />
        <Indicator num={images.length} setIndex={setIndex} index={index} />
      </Box>
    </Box>
  );
};

interface IndicatorProps {
  num: number;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

const Indicator = ({ num, setIndex, index }: IndicatorProps) => {
  const { classes, cx } = useStyles();
  return (
    <Group position='center' className={classes.indicatorContainer}>
      {[...Array(num)].map((item, i) => (
        <Box
          key={i}
          className={cx(classes.indicator, { [classes.active]: index === i })}
          onClick={() => setIndex(() => i)}
        />
      ))}
    </Group>
  );
};

interface SliderControlProps {
  position: 'left' | 'right';
  setIndex: Dispatch<SetStateAction<number>>;
  imagesLength: number;
}

const SliderControl = ({
  position,
  setIndex,
  imagesLength,
}: SliderControlProps) => {
  const { classes, cx } = useStyles();
  return (
    <UnstyledButton
      className={cx(classes.controlBtn, classes[position])}
      onClick={() =>
        position === 'left'
          ? setIndex((pre) => (pre === 0 ? imagesLength - 1 : pre - 1))
          : setIndex((pre) => (pre === imagesLength - 1 ? 0 : pre + 1))
      }
    >
      {position === 'left' ? (
        <TbCaretLeft strokeWidth={1} size={36} color='white' />
      ) : (
        <TbCaretRight strokeWidth={1} size={36} color='white' />
      )}
    </UnstyledButton>
  );
};
