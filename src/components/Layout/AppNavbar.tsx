import { Navbar } from '@mantine/core';

import { TbHome, TbHeart } from 'react-icons/tb';
import { BsChatRightDots, BsBookmarkStar } from 'react-icons/bs';

import { NavbarItem } from './NavbarItem';

interface AppNavbarProps {
  opened: boolean;
}

export const AppNavbar = ({ opened }: AppNavbarProps) => {
  return (
    <Navbar
      py='md'
      hiddenBreakpoint='xs'
      hidden={!opened}
      width={{ xs: 64, md: 200 }}
    >
      <Navbar.Section>
        <NavbarItem text='Home' icon={<TbHome size={22} />} />
        <NavbarItem text='Chat' icon={<BsChatRightDots size={22} />} />
        <NavbarItem text='Liked Posts' icon={<TbHeart size={22} />} />
        <NavbarItem text='Saved Posts' icon={<BsBookmarkStar size={22} />} />
      </Navbar.Section>
    </Navbar>
  );
};
