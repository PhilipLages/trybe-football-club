import { RequestHandler } from 'express';
import { Schema } from 'joi';
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
}
