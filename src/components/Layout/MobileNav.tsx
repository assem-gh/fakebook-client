import { Link, useLocation } from 'react-router-dom';

import {
  ActionIcon,
  Anchor,
  Drawer,
  Group,
  SimpleGrid,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import {
  TbStar,
  TbMessage,
  TbUser,
  TbBookmark,
  TbNews,
  TbBell,
  TbPhoto,
} from 'react-icons/tb';

import { getThemeColor } from '../../utils/fns';

const items = [
  { path: '/feeds', icon: TbNews, label: 'Newsfeed' },
  { path: '/profile', icon: TbUser, label: 'Profile' },
  { path: '/chat', icon: TbMessage, label: 'Chat' },
  { path: '/notifications', icon: TbBell, label: 'Notifications' },
  { path: '/favorite-posts', icon: TbStar, label: 'Favorite Posts' },
  { path: '/saved-posts', icon: TbBookmark, label: 'Saved Posts' },
  { path: '/photos', icon: TbPhoto, label: 'Photos' },
];

interface Props {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

export const MobileNav = ({ opened, setOpened }: Props) => {
  const { pathname } = useLocation();

  const theme = useMantineTheme();
  return (
    <Drawer
      opened={opened}
      position='bottom'
      onClose={() => setOpened(false)}
      size='full'
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      zIndex={1000}
      overlayOpacity={0.55}
      overlayBlur={3}
      padding='md'
    >
      <SimpleGrid cols={3} spacing={16}>
        {items.map((item, i) => {
          const isActive = pathname.includes(item.path);
          const Icon = item.icon;

          return (
            <Anchor
              component={Link}
              to={item.path}
              sx={{ '&:hover': { textDecoration: 'none' } }}
              onClick={() => setOpened(false)}
              key={item.path + i}
            >
              <Group
                direction='column'
                position='center'
                sx={{ alignItems: 'center', justifyContent: 'center' }}
                spacing={12}
              >
                <ActionIcon
                  variant={isActive ? 'filled' : 'light'}
                  color='indigo'
                  p='xs'
                  sx={{ width: '64px', height: '64px' }}
                >
                  <Icon
                    size={28}
                    color={isActive ? 'white' : getThemeColor(theme, 0, 7)}
                  />
                </ActionIcon>
                <Text
                  align='center'
                  size='xs'
                  color={getThemeColor(theme, 0, 9)}
                >
                  {item.label}
                </Text>
              </Group>
            </Anchor>
          );
        })}
      </SimpleGrid>
    </Drawer>
  );
};
