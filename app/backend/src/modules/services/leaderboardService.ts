import Leaderboard from '../../utils/Leaderboard';
import FullLeaderboard from '../../utils/fullLeaderboard';
import Match from '../../database/models/Match';
import Team from '../../database/models/Team';
import httpStatus from '../../utils/httpStatus';
import { IMatchesByTeam } from '../interfaces/matchProps';
import { LeaderboardReturn } from '../interfaces/leaderboard';

const { ok } = httpStatus;

export default class LeaderboardService {
  private _modelTeam;
  private _modelMatch;

  constructor() {
    this._modelTeam = Team;
    this._modelMatch = Match;
  }

  public getHomeLeaderboard = async (): Promise<LeaderboardReturn> => {
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

  public getAwayLeaderboard = async (): Promise<LeaderboardReturn> => {
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
    const { data: homeLeaderboard } = await this.getHomeLeaderboard();
    const { data: awayLeaderboard } = await this.getAwayLeaderboard();

    const leaderboard = new FullLeaderboard(homeLeaderboard, awayLeaderboard);

    const data = leaderboard.createFullLeaderboard();

    return { status: ok, data };
  };
}
