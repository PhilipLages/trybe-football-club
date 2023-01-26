import { RequestHandler } from 'express';

import IQuery from '../interfaces/query';
import MatchService from '../services/matchService';

export default class MatchController {
  private _service;

  constructor() {
    this._service = new MatchService();
  }

  public getAll: RequestHandler = async (req, res) => {
    const { inProgress } = req.query as unknown as IQuery;

    const { status, data } = await this._service.getAll(inProgress);

    return res.status(status).json(data);
  };

  public create: RequestHandler = async (req, res) => {
    const newMatch = req.body;

    const { status, data } = await this._service.create(newMatch);

    return res.status(status).json(data);
  };

  public finishMatch: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const { status, data } = await this._service.finishMatch(Number(id));

    return res.status(status).json(data);
  };

  public updateMatch: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const updateMatch = req.body;

    const { status, data } = await this._service.updateMatch(Number(id), updateMatch);

    return res.status(status).json(data);
  };
}
