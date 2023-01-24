import httpStatus from '../../utils/httpStatus';
import Match from '../../database/models/Match';
import Team from '../../database/models/Team';
import { AllMatches, IMatch, INewMatch } from '../interfaces/matchProps';

const { ok, created } = httpStatus;

export default class MatchService {
  private _model;

  constructor() {
    this._model = Match;
  }

  public getAll = async (query: string): Promise<AllMatches> => {
    const where = query ? { inProgress: query === 'true' } : undefined;

    const data = await this._model.findAll({
      where,
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });

    return { status: ok, data };
  };

  public create = async (newMatch: INewMatch): Promise<IMatch> => {
    const data = await this._model.create({ ...newMatch, inProgress: true });

    return { status: created, data };
  };
}
