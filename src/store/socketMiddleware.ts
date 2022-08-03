import { Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';

import connectionHandler from '../api/socket/handlers/connection';
import userApi from '../api/userApi';

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
      connectionHandler.onConnectionError(socket);
      connectionHandler.onDisconnect(socket);
    }

    next(action);
  };
};
