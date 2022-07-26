import { createStyles, Navbar } from '@mantine/core';

import { TbHome, TbHeart } from 'react-icons/tb';
import { BsChatRightDots, BsBookmarkStar } from 'react-icons/bs';
import { MdOutlineAddBox } from 'react-icons/md';

import { NavbarItem } from './Items/NavbarItem';

const useStyles = createStyles((theme) => ({
  root: {
    [theme.fn.smallerThan('xs')]: {
      position: 'fixed',
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
        <NavbarItem text='New Post' icon={<MdOutlineAddBox size={18} />} />
        <NavbarItem text='Home' icon={<TbHome size={18} />} />
        <NavbarItem text='Chat' icon={<BsChatRightDots size={18} />} />
        <NavbarItem text='Liked Posts' icon={<TbHeart size={18} />} />
        <NavbarItem text='Saved Posts' icon={<BsBookmarkStar size={18} />} />
      </Navbar.Section>
    </Navbar>
  );
};
