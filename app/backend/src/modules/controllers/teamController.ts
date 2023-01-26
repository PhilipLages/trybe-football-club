import { RequestHandler } from 'express';

import TeamService from '../services/teamServices';

export default class TeamController {
  private _service;

  constructor() {
    this._service = new TeamService();
  }

  public getAll: RequestHandler = async (_req, res) => {
    const { status, data } = await this._service.getAll();

    return res.status(status).json(data);
  };

  public getById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await this._service.getById(Number(id));

    return res.status(status).json(data);
  };
}
