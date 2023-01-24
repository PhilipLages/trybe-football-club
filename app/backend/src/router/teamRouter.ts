import * as express from 'express';

import TeamController from '../modules/controllers/teamController';

const teamRouter = express.Router();

const teamController = new TeamController();

teamRouter.get('/', teamController.getAll);

teamRouter.get('/:id', teamController.getById);

export default teamRouter;
