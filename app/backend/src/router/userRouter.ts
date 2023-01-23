import * as express from 'express';

import loginSchema from '../modules/middlewares/joi';
import UserMiddleware from '../modules/middlewares/userMiddlewares';
import UserController from '../modules/controllers/userController';

const userRouter = express.Router();

const userController = new UserController();
const userMiddleware = new UserMiddleware(loginSchema);

userRouter.post('/', userMiddleware.validateLogin, userController.logIn);

export default userRouter;
