import * as express from 'express';
import loginSchema from '../modules/middlewares/joi';
import UserMiddleware from '../modules/middlewares/userMiddlewares';
import MatchController from '../modules/controllers/matchController';

const matchRouter = express.Router();

const matchController = new MatchController();
const middleware = new UserMiddleware(loginSchema);

matchRouter.patch('/:id/finish', matchController.finishMatch);

matchRouter.patch('/:id', matchController.updateMatch);

matchRouter.get('/', matchController.getAll);

matchRouter.use(middleware.validateAuth);

matchRouter.post('/', matchController.create);

export default matchRouter;
