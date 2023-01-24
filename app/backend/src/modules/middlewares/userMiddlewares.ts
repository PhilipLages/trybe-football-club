import { RequestHandler } from 'express';
import { Schema } from 'joi';
import * as jwt from 'jsonwebtoken';
import { secret } from '../../utils/jwt';

import httpStatus from '../../utils/httpStatus';
import ErrorProps from '../interfaces/errorProps';

export default class UserMiddleware {
  private _joiSchema;

  constructor(joiSchema: Schema) {
    this._joiSchema = joiSchema;
  }

  public validateLogin: RequestHandler = async (req, res, next) => {
    const login = req.body;

    try {
      const { error } = this._joiSchema.validate(login);

      return error
        ? res.status(httpStatus.required).json({ message: error.details[0].message })
        : next();
    } catch (error) {
      const { message } = error as ErrorProps;

      return res.status(httpStatus.serverError).json({ message });
    }
  };

  validateAuth: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(httpStatus.notFound).json({ message: 'Token not found' });
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
      const payload = jwt.verify(token, secret);

      req.body.user = payload;

      return next();
    } catch (error) {
      console.log(error);

      return res.status(httpStatus.invalid).json({ message: 'Token must be a valid token' });
    }
  };
}
