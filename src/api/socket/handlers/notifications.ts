import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

import { addNotification } from '../../../store/slices/notificationSlice';
import { NotificationType } from '../../../store/types';

const onReceive = (socket: Socket, dispatch: Dispatch<AnyAction>) => {
  socket.on('notification/receive', (data: NotificationType) => {
    console.log('[Socket]: new Notification =>', data);

    dispatch(addNotification(data));
  });
};

export default { onReceive };
