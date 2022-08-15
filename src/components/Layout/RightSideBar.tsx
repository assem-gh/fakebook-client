import { Link } from 'react-router-dom';

import {
  ActionIcon,
  Avatar,
  Box,
  createStyles,
  Divider,
  Indicator,
  Tooltip,
} from '@mantine/core';
import { TbSearch } from 'react-icons/tb';

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
  },
  search: {
    width: '100%',
    height: '64px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: getThemeColor(theme, 0, 8),
  },
}));

const connectedList = [
  {
    firstName: 'John',
    lastName: 'Doe',
    profileImage:
      'https://cdn.pixabay.com/photo/2016/02/11/16/59/dog-1194083_960_720.jpg',
  },
  {
    firstName: 'also',
    lastName: 'john',
    profileImage:
      'https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295391_960_720.png',
  },
  {
    firstName: 'also',
    lastName: 'john',
    profileImage:
      'https://images.unsplash.com/photo-1606062663931-277af9e93298?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
];

export const RightSideBar = () => {
  const { classes, theme } = useStyles();

  return (
    <SideBar position='right'>
      <Box className={classes.search}>
        <TbSearch size={28} strokeWidth={1} />
      </Box>
      <Divider
        color={getThemeColor(theme, 3, 3)}
        sx={{ width: '80%' }}
        mb='lg'
      />
      {connectedList.map((item, i) => {
        return (
          <Tooltip
            key={item.profileImage + i}
            label={item.firstName + ' ' + item.lastName}
            position='right'
            className={classes.tooltip}
          >
            <Indicator color='green'>
              <ActionIcon
                component={Link}
                to=''
                className={classes.item}
                mb='lg'
              >
                <Avatar src={item.profileImage} radius='lg' />
              </ActionIcon>
            </Indicator>
          </Tooltip>
        );
      })}
    </SideBar>
  );
};
