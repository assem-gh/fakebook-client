import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Image,
  Anchor,
} from '@mantine/core';
import { TbSearch } from 'react-icons/tb';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import { UserMenu } from './UserMenu';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
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

export const Navbar = () => {
  const { classes } = useStyles();

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
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
          <UserMenu />
        </Group>
      </div>
    </Header>
  );
};
