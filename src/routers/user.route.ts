import { UserController } from '../controllers/user.controller';
import { Router } from 'express';
import { IRouter } from '../utils/interfaces/router.interface';

export class UserRouter implements IRouter {
  public router: Router = Router();
  public path: string = 'users';

  constructor() {
    this.router.get('/', UserController.getById);
  }
}
