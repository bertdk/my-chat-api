import * as express from "express";
import { createServer, Server } from "http";
import * as path from "path";
import * as socket from "socket.io";

export class App {
  public host: express.Application;
  public server: Server;
  public io: socket.Server;
  public count = 0;

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
    const publicDirectoryPath = path.join(__dirname, "../public");

    this.host.use(express.static(publicDirectoryPath));
  }

  private initializeSocket() {
    this.io.on("connection", (socket) => {
      console.log("new web connected");

      socket.emit("countUpdated", this.count);

      socket.on("increment", () => {
        this.count++;
        socket.emit("countUpdated", this.count);
      });
    });
  }
}
