import { RequestHandler } from 'express';
import httpStatus from '../../utils/httpStatus';

import ErrorProps from '../interfaces/errorProps';
import TeamService from '../services/teamServices';

const { serverError } = httpStatus;

export default class TeamController {
  private _service;

  constructor() {
    this._service = new TeamService();
  }

  public getAll: RequestHandler = async (_req, res) => {
    try {
      const { status, data } = await this._service.getAll();

      return res.status(status).json(data);
    } catch (error) {
      console.log(error);

      const { message } = error as ErrorProps;

      res.status(serverError).json({ message });
    }
  };
}
