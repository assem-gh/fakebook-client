import { ActionIcon, Affix, Transition } from '@mantine/core';
import { useMediaQuery, useWindowScroll } from '@mantine/hooks';
import { TbArrowUp } from 'react-icons/tb';

export const BackToTop = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const matchesMdScreen = useMediaQuery('(max-width: 	992px)');

  return (
    <Affix
      position={{
        bottom: matchesMdScreen ? 24 : 56,
        right: matchesMdScreen ? 16 : 28,
      }}
      zIndex={99}
    >
      <Transition transition='slide-up' mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <ActionIcon
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
            variant='filled'
            color='indigo'
            size={36}
          >
            <TbArrowUp size={24} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
};
