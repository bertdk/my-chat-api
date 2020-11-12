import { Server } from 'http';
import socket from 'socket.io';
import { generateMessage, generateLocationMessage } from '../messages';
import { getUser, removeUser, getUsersInRoom, addUser, users } from '../users';

export let io: socket.Server;

export const initSocketIo = (server: Server) => {
  io = new socket.Server(server);
  io.on('connection', onConnection);
};

const onConnection = (socket: socket.Socket) => {
  console.log('new web connected');

  socket.on('messageSend', (message: string, ack) => {
    const user = getUser(socket.id);

    if (!(user && user.room && user.username)) {
      return ack('Not valid');
    }

    io.to(user.room).emit('message', generateMessage(user.username, message));
    ack('Delivered');
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`));
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });

  socket.on('sendLocation', ({ latitude, longitude }, ack) => {
    const user = getUser(socket.id);
    if (!(user && user.room && user.username)) {
      return ack('Not valid');
    }
    io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, latitude, longitude));
    ack();
  });

  socket.on('join', ({ username, room }, callback) => {
    const result = addUser(socket.id, username, room);

    if (result.error) {
      return callback(result.error);
    }

    socket.join(result.room);

    socket.emit('message', generateMessage('Admin', 'Welcome!'));
    socket.broadcast.to(result.room).emit('message', generateMessage('Admin', `${result.username} has joined`));
    io.to(result.room).emit('roomData', {
      room: result.room,
      users: getUsersInRoom(result.room),
    });

    callback();
  });
};
