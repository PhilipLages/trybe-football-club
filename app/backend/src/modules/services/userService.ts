import { compareSync } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import User from '../../database/models/User';
import httpStatus from '../../utils/httpStatus';
import { config, secret } from '../../utils/jwt';
import ReturnProps from '../interfaces/returnProps';
import { LoginProps } from '../interfaces/userProps';

const { ok, invalid, notFound } = httpStatus;

export default class UserService {
  public model;

  constructor() {
    this.model = User;
  }

  public login = async ({ email, password }: LoginProps): Promise<ReturnProps> => {
    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      return { status: notFound, data: { message: 'User not found' } };
    }

    const isPasswordValid = compareSync(password, user?.password);

    if (!isPasswordValid) {
      return { status: invalid, data: { message: 'Incorrect email or password' } };
    }

    const data = { id: user?.id, username: user?.username };

    const token = jwt.sign(data, secret, config);

    return { status: ok, data: { token } };
  };
}
