import httpStatus from '../../utils/httpStatus';
import Team from '../../database/models/Team';
import { GetTeamsProps, ITeam } from '../interfaces/teamProps';

const { ok, notFound } = httpStatus;

export default class TeamService {
  private _model;

  constructor() {
    this._model = Team;
  }

  public getAll = async (): Promise<GetTeamsProps> => {
    const data = await this._model.findAll();

    return { status: ok, data };
  };

  public getById = async (id: number): Promise<ITeam> => {
    const data = await this._model.findByPk(id);

    if (!data) {
      return { status: notFound, data: { message: 'Team not found' } };
    }

    return { status: ok, data };
  };
}
