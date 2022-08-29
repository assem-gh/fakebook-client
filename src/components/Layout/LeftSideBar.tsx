import { Link, useLocation } from 'react-router-dom';
import { Anchor, Box, createStyles, Divider, Tooltip } from '@mantine/core';
import {
  TbNews,
  TbStar,
  TbMessage,
  TbUser,
  TbBookmark,
  TbLayoutGrid,
  TbBell,
  TbPhoto,
} from 'react-icons/tb';

import { getThemeColor } from '../../utils/fns';
import { SideBar } from './SideBar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import postApi from '../../api/http/postApi';

const useStyles = createStyles((theme) => ({
  tooltip: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  item: {
    color: getThemeColor(theme, 1, 8),
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: theme.colors.indigo[7],
    color: 'white',
  },
  grid: {
    width: '100%',
    height: '64px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: getThemeColor(theme, 0, 8),
  },
  divider: {
    backgroundColor: getThemeColor(theme, 8, 1),
    width: '80%',
  },
}));

export const navigationOptions = [
  { path: () => '/posts/newsfeed', icon: TbNews, label: 'Newsfeed' },
  {
    path: (userName?: string) => `/${userName}/profile`,
    icon: TbUser,
    label: 'Profile',
  },
  { path: () => '/chat', icon: TbMessage, label: 'Chat' },
  { path: () => '/notifications', icon: TbBell, label: 'Notifications' },
  {
    path: () => '/posts/favorites',
    icon: TbStar,
    label: 'Favorites Post',
  },
  {
    path: () => '/posts/saved',
    icon: TbBookmark,
    label: 'Saved Posts',
  },
  {
    path: (userName?: string) => `/${userName}/photos/`,
    icon: TbPhoto,
    label: 'Photos',
  },
];

export const LeftSideBar = () => {
  const { pathname } = useLocation();

  const userName = useAppSelector((state) => state.user.userName);
  const likedPostsOffset = useAppSelector((state) => state.posts.next.liked);

  const dispatch = useAppDispatch();
  const { classes, theme, cx } = useStyles();

  const handleClick = (label: string) => () => {
    if (label === 'Favorites Post' && likedPostsOffset === 0) {
      dispatch(postApi.getPosts({ group: 'liked' }));
    }
  };

  return (
    <SideBar position='left'>
      <Box className={classes.grid}>
        <TbLayoutGrid size={28} strokeWidth={1} />
      </Box>

      <Divider
        color={getThemeColor(theme, 3, 3)}
        sx={{ width: '80%' }}
        mb='lg'
      />

      {navigationOptions.map((item, i) => {
        const path = ['Photos', 'Profile'].includes(item.label)
          ? item.path(userName)
          : item.path();

        const Icon = item.icon;
        return (
          <Tooltip
            key={item.label + i}
            label={item.label}
            position='right'
            className={classes.tooltip}
          >
            <Anchor
              component={Link}
              onClick={handleClick(item.label)}
              to={path}
              className={cx(classes.item, {
                [classes.active]: pathname.includes(path),
              })}
            >
              <Icon size={28} strokeWidth={1} />
            </Anchor>
          </Tooltip>
        );
      })}
    </SideBar>
  );
};
