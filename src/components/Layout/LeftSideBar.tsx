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

export const items = [
  { path: '/feeds', icon: TbNews, label: 'Newsfeed' },
  { path: '/profile', icon: TbUser, label: 'Profile' },
  { path: '/chat', icon: TbMessage, label: 'Chat' },
  { path: '/notifications', icon: TbBell, label: 'Notifications' },
  { path: '/favorite-posts', icon: TbStar, label: 'Favorites Post' },
  { path: '/saved-posts', icon: TbBookmark, label: 'Saved Posts' },
  { path: '/photos', icon: TbPhoto, label: 'Photos' },
];

export const LeftSideBar = () => {
  const { classes, theme, cx } = useStyles();
  const { pathname } = useLocation();

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

      {items.map((item, i) => {
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
              to={item.path}
              className={cx(classes.item, {
                [classes.active]: pathname.includes(item.path),
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
