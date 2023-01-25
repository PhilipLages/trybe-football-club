import { RequestHandler } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  private _service;

  constructor() {
    this._service = new LeaderboardService();
  }

  public getHomeLeaderboard: RequestHandler = async (_req, res) => {
    const { status, data } = await this._service.getHomeLeaderboard();

    return res.status(status).json(data);
  };
}
