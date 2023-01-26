import { RequestHandler } from 'express';
import UserService from '../services/userService';

export default class UserController {
  private _service;

  constructor() {
    this._service = new UserService();
  }

  public logIn: RequestHandler = async (req, res) => {
    const login = req.body;

    const { status, data } = await this._service.logIn(login);

    return res.status(status).json(data);
  };

  public getUser: RequestHandler = async (req, res) => {
    const { user } = req.body;

    const { status, data } = await this._service.getUser(user);

    return res.status(status).json(data);
  };
}
