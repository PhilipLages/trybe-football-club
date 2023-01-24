import httpStatus from '../../utils/httpStatus';
import Match from '../../database/models/Match';
import Team from '../../database/models/Team';
import { AllMatches, IFInishMatch, IMatch, INewMatch } from '../interfaces/matchProps';

const { ok, created, unproc, notFound } = httpStatus;

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
    const homeTeam = await this._model.findByPk(newMatch.homeTeamId);
    const awayTeam = await this._model.findByPk(newMatch.awayTeamId);

    if (!homeTeam || !awayTeam) {
      return {
        status: notFound,
        data: { message: 'There is no team with such id!' },
      };
    }

    if (newMatch.homeTeamId === newMatch.awayTeamId) {
      return {
        status: unproc,
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    const data = await this._model.create({ ...newMatch, inProgress: true });

    return { status: created, data };
  };

  public finishMatch = async (id: number): Promise<IFInishMatch> => {
    await this._model.update(
      {
        inProgress: false,
      },
      {
        where: { id },
      },
    );

    return { status: ok, data: { message: 'Finished' } };
  };
}
