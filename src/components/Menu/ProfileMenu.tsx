import { useState } from 'react';

import { Menu, createStyles, ActionIcon } from '@mantine/core';

import { TbDots } from 'react-icons/tb';
import { BsPersonCheckFill, BsPersonPlusFill } from 'react-icons/bs';
import { MdLibraryAdd, MdLibraryAddCheck } from 'react-icons/md';
import { RiImageEditFill } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';

import { getThemeColor } from '../../utils/fns';

const useStyles = createStyles((theme) => ({
  menuBtn: {
    backgroundColor: getThemeColor(theme, 4, 2),
    height: '36px',
    color: getThemeColor(theme, 0, 8),
    '&:hover': {
      backgroundColor: getThemeColor(theme, 6, 3),
    },
  },
}));

export const ProfileMenu = () => {
  const [, setMenuOpened] = useState(false);

  const isOwner = true;
  const isFollow = true;
  const isFriend = true;

  const { classes } = useStyles();

  return (
    <Menu
      size={200}
      placement='end'
      transition='pop-top-right'
      onClose={() => setMenuOpened(false)}
      onOpen={() => setMenuOpened(true)}
      closeOnItemClick={true}
      control={
        <ActionIcon size='lg' variant='filled' className={classes.menuBtn}>
          <TbDots size={16} />
        </ActionIcon>
      }
    >
      {isOwner ? (
        <>
          <Menu.Item icon={<RiImageEditFill size={14} />}>
            Edit cover image
          </Menu.Item>
          <Menu.Item icon={<CgProfile size={14} />}>
            Edit Profile image
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item
            icon={
              isFriend ? (
                <BsPersonCheckFill size={14} />
              ) : (
                <BsPersonPlusFill size={14} />
              )
            }
          >
            {isFriend ? 'cancel' : 'add'} Friend
          </Menu.Item>

          <Menu.Item
            icon={
              isFollow ? (
                <MdLibraryAddCheck size={14} />
              ) : (
                <MdLibraryAdd size={14} />
              )
            }
          >
            {isFollow ? 'unfollow' : 'Follow'}
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};
