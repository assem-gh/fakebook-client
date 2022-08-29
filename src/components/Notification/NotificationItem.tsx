import { EntityId } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import {
  Anchor,
  Avatar,
  Group,
  Indicator,
  MenuItem,
  Text,
} from '@mantine/core';

import NotificationApi from '../../api/http/NotificationApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectNotificationById } from '../../store/slices/notificationSlice';
import { formatMessage, getThemeColor } from '../../utils/fns';

interface Props {
  id: EntityId;
}

export const NotificationItem = ({ id }: Props) => {
  const notification = useAppSelector((state) =>
    selectNotificationById(state, id)
  );

  if (!notification) return null;

  const { relatedEntityId, count, sender } = notification.data;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(NotificationApi.updateStatus(notification.id));
  };

  return (
    <MenuItem
      icon={
        <Avatar
          onClick={() => {
            navigate('/p/' + sender.userName);
          }}
          src={sender.profileImage}
          radius='xl'
          sx={{ cursor: 'pointer' }}
        />
      }
      rightSection={
        !notification.isRead && (
          <Indicator color='red'>
            <div></div>
          </Indicator>
        )
      }
      sx={(theme) => ({
        '&:hover': {
          cursor: 'auto',
          backgroundColor: 'inherit',
        },
      })}
      onClick={handleClick}
    >
      <Group spacing={2} ml='sm' direction='column'>
        <Text size='xs' color='dimmed'>
          {dayjs(notification.createdAt).fromNow()}
        </Text>
        <Anchor
          component={Link}
          to={'/posts/' + relatedEntityId}
          sx={(theme) => ({
            '&:hover': { textDecoration: 'none' },
            color: getThemeColor(theme, 1, 8),
          })}
        >
          {`${sender.firstName} ${sender.lastName}` +
            formatMessage(notification.label, count)}
        </Anchor>
      </Group>
    </MenuItem>
  );
};
