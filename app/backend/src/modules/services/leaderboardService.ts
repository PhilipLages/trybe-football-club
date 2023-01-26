import Leaderboard from '../../utils/Leaderboard';
import Match from '../../database/models/Match';
import Team from '../../database/models/Team';
import httpStatus from '../../utils/httpStatus';
import { IMatchesByTeam } from '../interfaces/matchProps';

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
}
