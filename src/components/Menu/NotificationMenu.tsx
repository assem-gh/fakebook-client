import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  ActionIcon,
  Divider,
  Group,
  Indicator,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { TbBell } from 'react-icons/tb';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUnreadNotificationsIds } from '../../store/slices/notificationSlice';
import { NotificationItem } from '../Notification/NotificationItem';
import NotificationApi from '../../api/http/NotificationApi';
import { getThemeColor } from '../../utils/fns';

interface Props {}
export const NotificationsMenu = ({}: Props) => {
  const [opened, setOpened] = useState(false);

  const unreadNotificationsIds = useAppSelector(selectUnreadNotificationsIds);

  const dispatch = useAppDispatch();

  const handleMarkAll = () => {
    for (const id of unreadNotificationsIds) {
      dispatch(NotificationApi.updateStatus(id));
    }
  };

  return (
    <Indicator
      inline
      label={unreadNotificationsIds.length}
      offset={2}
      color='red'
      size={18}
      disabled={unreadNotificationsIds.length < 1}
    >
      <Menu
        size={360}
        placement='end'
        transition='pop-top-right'
        onClose={() => setOpened(false)}
        onOpen={() => setOpened(true)}
        closeOnItemClick={false}
        control={
          <ActionIcon variant='transparent'>
            <TbBell size={24} />
          </ActionIcon>
        }
      >
        <Menu.Label variant='text'>
          <Group position='apart' spacing={0} ml='sm' align='center'>
            <Text
              sx={(theme) => ({ color: getThemeColor(theme, 0, 8) })}
              size='lg'
              weight='bold'
            >
              Notifications
            </Text>
            <UnstyledButton
              sx={(theme) => ({
                color: theme.colors.blue[7],
                fontSize: '14px',
              })}
              onClick={handleMarkAll}
            >
              Mark all as read
            </UnstyledButton>
          </Group>
        </Menu.Label>
        <Divider />
        {unreadNotificationsIds.length > 0 ? (
          unreadNotificationsIds.map((id) => (
            <NotificationItem key={id} id={id} />
          ))
        ) : (
          <Menu.Label py='xl'>
            <Text size='md' align='center'>
              No New Notifications{' '}
            </Text>
          </Menu.Label>
        )}
        <Divider />
        <Menu.Item
          sx={(theme) => ({
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            color: theme.colors.blue[6],
          })}
          component={Link}
          to='/notifications'
        >
          See all
        </Menu.Item>
      </Menu>
    </Indicator>
  );
};
