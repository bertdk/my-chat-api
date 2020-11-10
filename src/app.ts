import * as express from 'express';
import { createServer, Server } from 'http';
import * as path from 'path';
import * as socket from 'socket.io';
import { generateLocationMessage, generateMessage } from './utils/messages';
import { addUser, getUser, getUsersInRoom, removeUser } from './utils/users';
export class App {
  public host: express.Application;
  public server: Server;
  public io: socket.Server;

  constructor() {
    this.host = express();
    this.server = createServer(this.host);
    this.io = socket(this.server);
  }

  public init() {
    this.initializeMiddleware();
    this.initializeSocket();
  }

  public listen() {
    const port = process.env.PORT || 3000;
    this.server.listen(port, () => {
      console.log(`Chat app is running on port ${port}`);
    });
  }

  private initializeMiddleware() {
    const publicDirectoryPath = path.join(__dirname, '../public');

    this.host.use(express.static(publicDirectoryPath));
  }

  private initializeSocket() {
    const Filter = require('bad-words');
    const filter = new Filter();
    this.io.on('connection', (socket) => {
      console.log('new web connected');

      socket.on('messageSend', (message, ack) => {
        if (filter.isProfane(message)) {
          return ack('Profanity is not allowed');
        }

        const user = getUser(socket.id);

        this.io.to(user.room).emit('message', generateMessage(user.username, message));
        ack('Delivered');
      });

      socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
          this.io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`));
          this.io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room),
          });
        }
      });

      socket.on('sendLocation', ({ latitude, longitude }, ack) => {
        const user = getUser(socket.id);
        this.io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, latitude, longitude));
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
        this.io.to(result.room).emit('roomData', {
          room: result.room,
          users: getUsersInRoom(result.room),
        });

        callback();
      });
    });
  }
}
