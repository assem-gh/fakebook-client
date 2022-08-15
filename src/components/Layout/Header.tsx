import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Image,
  Anchor,
  MediaQuery,
  Center,
  ActionIcon,
} from '@mantine/core';
import { TbSearch, TbLayoutGrid, TbMessageCircle } from 'react-icons/tb';

import logo from '../../assets/images/logo-i.svg';
import logoMobile from '../../assets/images/logo-mobile-i.svg';
import { UserMenu } from '../Menu/UserMenu';
import { NotificationsMenu } from '../Menu/NotificationMenu';
import { getThemeColor } from '../../utils/fns';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.lg,
    position: 'sticky',
    top: 0,
    left: 0,
    border: 'none',
    boxShadow: theme.shadows.sm,
    [theme.fn.smallerThan('xs')]: {
      paddingLeft: theme.spacing.xs,
      paddingRight: theme.spacing.xs,
    },
  },
  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  search: {
    backgroundColor: getThemeColor(theme, 5, 0),
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
  logoMobile: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  logo: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
    [theme.fn.smallerThan('md')]: {
      marginRight: theme.spacing.sm,
    },
    marginRight: theme.spacing.lg,
  },
}));

interface AppHeaderProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const AppHeader = ({ open, setOpen }: AppHeaderProps) => {
  const { classes, theme } = useStyles();

  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group spacing={8}>
          <Anchor component={Link} to='/'>
            <Center>
              <Image src={logo} width='124px' className={classes.logo} />
              <Image
                src={logoMobile}
                width='36px'
                className={classes.logoMobile}
              />
            </Center>
          </Anchor>
          <MediaQuery largerThan='xs' styles={{ display: 'none' }}>
            <ActionIcon mx='xs' onClick={() => setOpen((pre) => !pre)}>
              <TbLayoutGrid size={48} />
            </ActionIcon>
          </MediaQuery>
          <Group>
            <Autocomplete
              // className={classes.search}
              classNames={{
                input: classes.search,
              }}
              radius='xl'
              placeholder='Search'
              icon={<TbSearch size={24} />}
              data={[]}
            />
          </Group>
        </Group>

        <Group position='apart'>
          <TbMessageCircle size={24} />
          <NotificationsMenu />
          <UserMenu />
        </Group>
      </div>
    </Header>
  );
};
