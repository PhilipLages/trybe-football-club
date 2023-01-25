import * as express from 'express';
import LeaderboardController from '../modules/controllers/leaderboardController';

const leaderboardRouter = express.Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/home', leaderboardController.getHomeLeaderboard);

export default leaderboardRouter;
