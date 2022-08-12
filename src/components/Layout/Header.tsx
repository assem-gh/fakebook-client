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
  Burger,
  Center,
} from '@mantine/core';
import { TbSearch } from 'react-icons/tb';

import logo from '../../assets/images/logo.svg';
import logoMobile from '../../assets/images/logo-mobile.svg';
import { UserMenu } from '../Menu/UserMenu';
import { NotificationsMenu } from '../Menu/NotificationMenu';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.lg,
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
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
  logoMobile: {
    marginRight: theme.spacing.lg,
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
          <MediaQuery largerThan='xs' styles={{ display: 'none' }}>
            <Burger
              opened={open}
              onClick={() => setOpen((pre) => !pre)}
              size='sm'
              color={theme.colors.gray[6]}
            />
          </MediaQuery>
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

          <Group>
            <Autocomplete
              className={classes.search}
              radius='xl'
              placeholder='Search'
              icon={<TbSearch size={16} />}
              data={[]}
            />
          </Group>
        </Group>

        <Group position='apart'>
          <NotificationsMenu />
          <UserMenu />
        </Group>
      </div>
    </Header>
  );
};
