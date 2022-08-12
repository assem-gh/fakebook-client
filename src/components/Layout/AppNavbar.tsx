import { createStyles, Navbar } from '@mantine/core';

import { TbHome, TbHeart } from 'react-icons/tb';
import { BsChatRightDots, BsBookmarkStar } from 'react-icons/bs';

import { NavbarItem } from './Items/NavbarItem';
import { getThemeColor } from '../../utils/fns';

const useStyles = createStyles((theme) => ({
  root: {
    width: '100%',
    border: 'none',
    [theme.fn.smallerThan('xs')]: {
      position: 'fixed',
      backgroundColor: getThemeColor(theme, 8),
    },
  },
}));

interface AppNavbarProps {
  opened: boolean;
}

export const AppNavbar = ({ opened }: AppNavbarProps) => {
  const { classes } = useStyles();
  return (
    <Navbar
      py='md'
      hiddenBreakpoint='xs'
      hidden={!opened}
      width={{ xs: 64, md: 200 }}
      classNames={{ root: classes.root }}
    >
      <Navbar.Section>
        <NavbarItem path='/feeds' text='Home' icon={<TbHome size={18} />} />
        <NavbarItem
          path='/chat'
          text='Chat'
          icon={<BsChatRightDots size={18} />}
        />
        <NavbarItem
          path='/favorite-posts'
          text='Favorite Posts'
          icon={<TbHeart size={18} />}
        />
        <NavbarItem
          path='/saved-posts'
          text='Saved Posts'
          icon={<BsBookmarkStar size={18} />}
        />
      </Navbar.Section>
    </Navbar>
  );
};
