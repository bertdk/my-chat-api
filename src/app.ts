import * as express from "express";
import * as path from "path";

export class App {
  public host: express.Application;

  constructor() {
    this.host = express();
  }

  public init() {
    this.initializeMiddleware();
  }

  public listen() {
    const port = process.env.PORT || 3000;
    this.host.listen(port, () => {
      console.log(`Chat app is running on port ${port}`);
    });
  }

  private initializeMiddleware() {
    const publicDirectoryPath = path.join(__dirname, "../public");

    this.host.use(express.static(publicDirectoryPath));
  }
}
