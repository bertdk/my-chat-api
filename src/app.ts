import * as express from 'express';
import { createServer, Server } from 'http';
import * as path from 'path';
import * as socket from 'socket.io';
import { generateLocationMessage, generateMessage } from './utils/messages';
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
        this.io.to('Pn').emit('message', generateMessage(message));
        ack('Delivered');
      });

      socket.on('disconnect', () => {
        this.io.to('Pn').emit('message', generateMessage('A user has left!'));
      });

      socket.on('sendLocation', ({ latitude, longitude }, ack) => {
        this.io.to('Pn').emit('locationMessage', generateLocationMessage(latitude, longitude));
        ack();
      });

      socket.on('join', ({ username, room }) => {
        socket.join(room);

        socket.emit('message', generateMessage('Welcome!'));
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined`));
      });
    });
  }
}
