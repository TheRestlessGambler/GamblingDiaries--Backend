import Joi from 'joi';

export const signupDto = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().regex(/^[a-zA-Z0-9]{3,30}$/),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});
