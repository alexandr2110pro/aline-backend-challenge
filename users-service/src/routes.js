import { Router } from 'express';
import { UsersController } from './controllers/usersController';

const usersCtrl = new UsersController();
export const UsersRouter = Router();

UsersRouter.route('/users')
    .post(usersCtrl.authenticate);