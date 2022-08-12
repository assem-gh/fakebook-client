import { Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';

import connectionHandler from '../../api/socket/handlers/connection';
import userApi from '../../api/http/userApi';
import notifications from '../../api/socket/handlers/notifications';
import postApi from '../../api/http/postApi';
import commentApi from '../../api/http/commentApi';
import { NotificationLabel } from '../types';

let socket: Socket;

export const socketMiddleware: Middleware = (store) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_BASE_URL, {
      auth: {
        token: store.getState().user.jwtToken,
      },
    });
  }
  return (next) => (action) => {
    if (userApi.authenticateUser.fulfilled.match(action)) {
      connectionHandler.onConnect(socket);
      notifications.onReceive(socket, store.dispatch);
      connectionHandler.onConnectionError(socket);
      connectionHandler.onDisconnect(socket);
    }
    if (postApi.likePost.fulfilled.match(action)) {
      const { postId, action: likeAction } = action.meta.arg;

      if (likeAction === 'like') {
        const data = {
          label: NotificationLabel.Like,
          relatedEntityId: postId,
        };
        socket.emit('notification/publish', data);
      }
    }
    if (commentApi.createComment.fulfilled.match(action)) {
      const data = {
        label: NotificationLabel.Comment,
        relatedEntityId: action.meta.arg.postId,
      };
      socket.emit('notification/publish', data);
    }

    next(action);
  };
};
