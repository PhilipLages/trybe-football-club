import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).required().messages({
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled',
});

export default loginSchema;
