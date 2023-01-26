import * as express from 'express';
import LeaderboardController from '../modules/controllers/leaderboardController';

const leaderboardRouter = express.Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/home', leaderboardController.getHomeLeaderboard);
leaderboardRouter.get('/away', leaderboardController.getAwayLeaderboard);

export default leaderboardRouter;
