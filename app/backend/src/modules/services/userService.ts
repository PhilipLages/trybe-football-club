import { compareSync } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import User from '../../database/models/User';

import httpStatus from '../../utils/httpStatus';
import { config, secret } from '../../utils/jwt';

import LoginReturnProps from '../interfaces/loginReturnProps';
import { LoginProps } from '../interfaces/userProps';

const { ok, invalid } = httpStatus;

export default class UserService {
  private _model;

  constructor() {
    this._model = User;
  }

  public logIn = async ({ email, password }: LoginProps): Promise<LoginReturnProps> => {
    const user = await this._model.findOne({ where: { email } });

    const isPasswordValid = user && compareSync(password, user?.password);

    if (!isPasswordValid || !user) {
      return { status: invalid, data: { message: 'Incorrect email or password' } };
    }

    const data = { id: user?.id, username: user?.username };

    const token = jwt.sign(data, secret, config);

    return { status: ok, data: { token } };
  };
}
