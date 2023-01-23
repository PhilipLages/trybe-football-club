import { RequestHandler } from 'express';
import httpStatus from '../../utils/httpStatus';
import ErrorProps from '../interfaces/errorProps';
import UserService from '../services/userService';

const { serverError } = httpStatus;

export default class UserController {
  private _service;

  constructor() {
    this._service = new UserService();
  }

  public logIn: RequestHandler = async (req, res) => {
    const login = req.body;

    try {
      const { status, data } = await this._service.logIn(login);

      return res.status(status).json(data);
    } catch (error) {
      const { message } = error as ErrorProps;

      return res.status(serverError).json({ message });
    }
  };
}
