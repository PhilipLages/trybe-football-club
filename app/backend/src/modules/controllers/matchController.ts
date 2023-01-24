import { RequestHandler } from 'express';
import httpStatus from '../../utils/httpStatus';
import ErrorProps from '../interfaces/errorProps';
import MatchService from '../services/matchService';

export default class MatchController {
  private _service;

  constructor() {
    this._service = new MatchService();
  }

  public getAll: RequestHandler = async (_req, res) => {
    try {
      const { status, data } = await this._service.getAll();

      return res.status(status).json(data);
    } catch (error) {
      console.log(error);
      const { message } = error as ErrorProps;
      return res.status(httpStatus.serverError).json({ message });
    }
  };
}
