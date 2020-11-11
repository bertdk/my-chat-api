import { NextFunction, Request, Response } from 'express';

export class UserController {
  public static async getById(request: Request, response: Response, next: NextFunction) {
    response.status(200).send({ name: 'ServerName', room: 'ServerRoom' });
  }
}
