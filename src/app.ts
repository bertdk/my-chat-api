import { ClassType } from 'class-transformer/ClassTransformer';
import express from 'express';
import { createServer, Server } from 'http';
import * as path from 'path';
import { UserRouter } from './routers/user.route';
import { IRouter } from './utils/interfaces/router.interface';
import cors from 'cors';
import { initSocketIo } from './utils/socket/socket';
export class App {
  public host: express.Application;
  public server: Server;

  public routers: Array<ClassType<IRouter>> = [UserRouter];

  constructor() {
    this.host = express();
    this.server = createServer(this.host);
    initSocketIo(this.server);
  }

  public init() {
    this.initializeMiddleware();
    this.initializeRouters(this.routers);
  }

  public listen() {
    const port = process.env.PORT;
    this.server.listen(port, () => {
      console.log(`Chat app is running on port ${port}`);
    });
  }

  private initializeMiddleware() {
    const publicDirectoryPath = path.join(__dirname, '../public');

    this.host.use(
      cors({
        exposedHeaders: ['x-auth', 'x-refresh-token'],
      })
    );

    this.host.use(express.static(publicDirectoryPath));
  }

  private initializeRouters(routers: Array<ClassType<IRouter>>) {
    routers.forEach((router) => {
      const activated = new router();
      this.host.use(`/api/${activated.path}`, activated.router);
    });
  }
}
