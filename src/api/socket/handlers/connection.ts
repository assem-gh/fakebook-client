import { Socket } from 'socket.io-client';

const onConnect = (socket: Socket) => {
  socket.on('connect', () => {
    console.log('[Socket]: Server Connected');
  });
};

const onDisconnect = (socket: Socket) => {
  socket.on('disconnect', (reason: any) => {
    console.log('[Socket]: disconnect => ', reason);
  });
};

const onConnectionError = (socket: Socket) => {
  return socket.on('connect_error', (err) => {
    console.log('[Socket]: Error => ', err.message);
  });
};
export default { onConnect, onDisconnect, onConnectionError };
