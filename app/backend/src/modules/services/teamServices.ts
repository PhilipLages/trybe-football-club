import httpStatus from '../../utils/httpStatus';
import Team from '../../database/models/Team';
import GetTeamsProps from '../interfaces/teamProps';

const { ok } = httpStatus;

export default class TeamService {
  private _model;

  constructor() {
    this._model = Team;
  }

  public getAll = async (): Promise<GetTeamsProps> => {
    const data = await this._model.findAll();

    return { status: ok, data };
  };
}
