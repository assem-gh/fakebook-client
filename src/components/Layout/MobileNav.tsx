import { Dispatch, SetStateAction } from 'react';
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

import { getThemeColor } from '../../utils/fns';
import { useAppSelector } from '../../store/hooks';
import { navigationOptions } from './LeftSideBar';

interface Props {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

export const MobileNav = ({ opened, setOpened }: Props) => {
  const { pathname } = useLocation();
  const theme = useMantineTheme();

  const userName = useAppSelector((state) => state.user.userName);

  return (
    <Drawer
      opened={opened}
      position='bottom'
      onClose={() => setOpened(false)}
      size='full'
      overlayColor={getThemeColor(theme, 9, 2)}
      zIndex={1000}
      overlayOpacity={0.55}
      overlayBlur={3}
      padding='md'
    >
      <SimpleGrid cols={3} spacing={16}>
        {navigationOptions.map((item, i) => {
          const path = ['Photos', 'Profile'].includes(item.label)
            ? item.path(userName)
            : item.path();

          const isActive = pathname.includes(path);
          const Icon = item.icon;

          return (
            <Anchor
              component={Link}
              to={path}
              sx={{ '&:hover': { textDecoration: 'none' } }}
              onClick={() => setOpened(false)}
              key={path}
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
