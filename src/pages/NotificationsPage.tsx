import dayjs from 'dayjs';
import {
  Avatar,
  Box,
  Button,
  Group,
  Indicator,
  Paper,
  Text,
} from '@mantine/core';

import { Main } from '../components/Layout/Main';
import { useAppSelector } from '../store/hooks';
import { selectAll } from '../store/slices/notificationSlice';
import { formatMessage, getThemeColor } from '../utils/fns';

export const NotificationsPage = () => {
  const notifications = useAppSelector(selectAll);

  return (
    <Main>
      <Paper px='sm' py='md' shadow='xs'>
        <Group direction='column' grow>
          {notifications.map((notification, i) => {
            const { sender, count } = notification.data;
            return (
              <Group
                spacing='md'
                position='apart'
                pb='md'
                align='center'
                sx={(theme) => ({
                  borderBottom: '1px solid' + getThemeColor(theme, 4, 3),
                })}
              >
                <Box>
                  <Indicator
                    color='red'
                    sx={{ display: notification.isRead ? 'none' : 'block' }}
                  >
                    <Box />
                  </Indicator>
                </Box>

                <Avatar radius='xl' size={42} src={sender.profileImage} />
                <Group direction='column' sx={{ flexGrow: 1 }} spacing={0}>
                  <Text>
                    {`${sender.firstName} ${sender.lastName}`}
                    {formatMessage(notification.label, count)}
                  </Text>
                  <Text size='xs' color='dimmed'>
                    {dayjs(notification.createdAt).fromNow()}
                  </Text>
                </Group>

                <Box>
                  <Button>delete</Button>
                </Box>
              </Group>
            );
          })}
          <Button variant='subtle'>
            <Text align='center'>Show more</Text>
          </Button>
        </Group>
      </Paper>
    </Main>
  );
};
