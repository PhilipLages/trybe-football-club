import * as express from 'express';

import TeamController from '../modules/controllers/teamController';

const teamRouter = express.Router();

const teamController = new TeamController();

teamRouter.get('/', teamController.getAll);

export default teamRouter;
