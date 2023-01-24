import httpStatus from '../../utils/httpStatus';
import Match from '../../database/models/Match';
import Team from '../../database/models/Team';
import { AllMatches } from '../interfaces/matchProps';

const { ok } = httpStatus;

export default class MatchService {
  private _model;

  constructor() {
    this._model = Match;
  }

  public getAll = async (): Promise<AllMatches> => {
    const data = await this._model.findAll({
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
}
