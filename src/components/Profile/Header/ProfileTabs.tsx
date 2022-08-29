import { Link, useLocation } from 'react-router-dom';

import { Anchor, Button, createStyles, Group, Paper } from '@mantine/core';

import postApi from '../../../api/http/postApi';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getThemeColor } from '../../../utils/fns';
import { ProfileMenu } from '../../Menu/ProfileMenu';

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '64px',
    padding: '0px 12px 0 0',
    marginTop: 'auto',
    borderTop: `2px solid ${getThemeColor(theme, 4, 1)}`,
  },
  tabs: {
    flexGrow: 1,
    height: '100%',
    gap: '0',
    [theme.fn.smallerThan('sm')]: {},
  },
  tab: {
    textTransform: 'capitalize',
    minWidth: '84px',
    borderRight: `1px solid ${getThemeColor(theme, 3, 3)}`,
    '&:hover': { textDecoration: 'none' },
    borderBottom: `2px solid transparent`,
    color: getThemeColor(theme, 0, 8),
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 600,
    paddingRight: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    [theme.fn.smallerThan('sm')]: {
      paddingRight: theme.spacing.sm,
      paddingLeft: theme.spacing.sm,
    },
  },
  activeTab: {
    color: theme.colors.indigo[6],
    borderBottomColor: theme.colors.indigo[6],
    borderBottomStyle: 'solid',
    borderBottomWidth: '2px',
  },
  messageBtn: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
}));

const tabs = ['about', 'timeline', 'friends'];

export const ProfileTabs = () => {
  const { pathname } = useLocation();

  const isOwner = true;
  const ownedPostsOffset = useAppSelector((state) => state.posts.next.owned);

  const dispatch = useAppDispatch();

  const { classes, cx } = useStyles();

  const handleClick = (tab: string) => () => {
    if (tab === 'timeline' && ownedPostsOffset === 0) {
      dispatch(postApi.getPosts({ group: 'owned', offset: 0 }));
    }
  };
  return (
    <Paper my='sm' shadow='xs' radius='md'>
      <div className={classes.container}>
        <Group className={classes.tabs} spacing={8}>
          {tabs.map((tab) => {
            const isActive = pathname.endsWith(tab);
            return (
              <Anchor
                component={Link}
                key={tab}
                to={tab}
                onClick={handleClick(tab)}
                className={cx(classes.tab, { [classes.activeTab]: isActive })}
              >
                {tab}
              </Anchor>
            );
          })}
        </Group>
        <Group spacing={12} px='sm'>
          {!isOwner && (
            <Button p='xs' size='sm' className={classes.messageBtn}>
              Message
            </Button>
          )}
        </Group>
        <ProfileMenu />
      </div>
    </Paper>
  );
};
