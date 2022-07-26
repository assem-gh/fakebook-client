import { useState } from 'react';

import {
  Group,
  Menu,
  Avatar,
  UnstyledButton,
  Divider,
  createStyles,
  Switch,
  useMantineColorScheme,
} from '@mantine/core';
import { TbLogout, TbMoonStars, TbSettings, TbTrash } from 'react-icons/tb';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Storage } from '../../utils/localStorage';
import { logout } from '../../store/userSlice';

const useStyles = createStyles((theme) => ({
  userMenuBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const UserMenu = () => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const userImage = useAppSelector((state) => state.user.profileImage);

  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem(Storage.User);
    localStorage.removeItem(Storage.Jwt);
  };

  return (
    <Menu
      size={260}
      placement='end'
      transition='pop-top-right'
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      closeOnItemClick={false}
      control={
        <UnstyledButton className={classes.userMenuBtn}>
          <Group align='center' spacing={4}>
            <Avatar src={userImage} alt='user Avatar' radius='xl' size={24} />
          </Group>
        </UnstyledButton>
      }
    >
      <Menu.Item icon={<TbSettings size={14} />}>Account settings</Menu.Item>
      <Menu.Item
        icon={<TbMoonStars size={14} />}
        rightSection={
          <Switch
            checked={colorScheme === 'dark'}
            onChange={() => toggleColorScheme()}
            size='md'
          />
        }
      >
        Dark Theme
      </Menu.Item>

      <Menu.Item onClick={onLogout} icon={<TbLogout size={14} />}>
        Logout
      </Menu.Item>

      <Divider />

      <Menu.Item color='red' icon={<TbTrash size={14} />}>
        Delete account
      </Menu.Item>
    </Menu>
  );
};
