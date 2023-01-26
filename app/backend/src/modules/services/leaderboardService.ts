import createFullLeaderboard from '../../utils/fullLeaderboard';
import Leaderboard from '../../utils/Leaderboard';
import Match from '../../database/models/Match';
import Team from '../../database/models/Team';
import httpStatus from '../../utils/httpStatus';
import { IMatchesByTeam } from '../interfaces/matchProps';
import ILeaderboard from '../interfaces/leaderboard';

const { ok } = httpStatus;

export default class LeaderboardService {
  private _modelTeam;
  private _modelMatch;

  constructor() {
    this._modelTeam = Team;
    this._modelMatch = Match;
  }

  public getHomeLeaderboard = async () => {
    const matches = await this._modelTeam.findAll({
      include: [
        {
          model: this._modelMatch,
          as: 'homeMatches',
          attributes: { exclude: ['id', 'inProgress'] },
          where: { inProgress: false },
        },
      ],
    }) as unknown as IMatchesByTeam[];

    const leaderboard = new Leaderboard(matches, 'home');

    const data = leaderboard.createLeaderboard();

    return { status: ok, data };
  };

  public getAwayLeaderboard = async () => {
    const matches = await this._modelTeam.findAll({
      include: [
        {
          model: this._modelMatch,
          as: 'awayMatches',
          attributes: { exclude: ['id', 'inProgress'] },
          where: { inProgress: false },
        },
      ],
    }) as unknown as IMatchesByTeam[];

    const leaderboard = new Leaderboard(matches, 'away');

    const data = leaderboard.createLeaderboard();

    return { status: ok, data };
  };

  public getFullLeaderboard = async () => {
    const homeLeaderboard = this.getHomeLeaderboard() as unknown as ILeaderboard[];
    const awayLeaderboard = this.getAwayLeaderboard() as unknown as ILeaderboard[];

    const data = createFullLeaderboard(homeLeaderboard, awayLeaderboard);

    return { status: ok, data };
  };
}
