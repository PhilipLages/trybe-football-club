import * as express from 'express';
import MatchController from '../modules/controllers/matchController';

const matchRouter = express.Router();

const matchController = new MatchController();

matchRouter.get('/', matchController.getAll);

export default matchRouter;
