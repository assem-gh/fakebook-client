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
  ActionIcon,
  Indicator,
} from '@mantine/core';
import { TbSearch, TbBell } from 'react-icons/tb';

import logo from '../../assets/images/logo.svg';
import { UserMenu } from './UserMenu';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.lg,
    [theme.fn.smallerThan('xs')]: {
      paddingLeft: theme.spacing.sm,
      paddingRight: theme.spacing.sm,
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
            <Image src={logo} width='124px' />
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
          <Indicator inline label='4' offset={2} color='red' size={18}>
            <ActionIcon variant='transparent'>
              <TbBell size={24} />
            </ActionIcon>
          </Indicator>
          <UserMenu />
        </Group>
      </div>
    </Header>
  );
};
