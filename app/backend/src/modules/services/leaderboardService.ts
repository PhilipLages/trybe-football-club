import Match from '../../database/models/Match';
import Team from '../../database/models/Team';
import httpStatus from '../../utils/httpStatus';

const { ok } = httpStatus;

export default class LeaderboardService {
  private _modelTeam;
  private _modelMatch;

  constructor() {
    this._modelTeam = Team;
    this._modelMatch = Match;
  }

  public getHomeLeaderboard = async () => {
    const data = await this._modelTeam.findAll({
      include: [
        {
          model: this._modelMatch,
          as: 'homeTeam',
          attributes: ['Match'],
        },
      ],
      where: { inProgress: true },
    });

    return { status: ok, data };
  };
}
