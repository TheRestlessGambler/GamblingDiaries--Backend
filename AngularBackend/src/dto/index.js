export * from "./signup.js"
export * from "./login.js"
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';
export const validator = (bodySchema = null, querySchema = null, paramsSchema = null) => {
  return async (req, res, next) => {
    try {
      const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
      };
      if (bodySchema) {
       req.body = await bodySchema.validateAsync(req.body, options);

      }
      if (querySchema) {
        req.query = await querySchema.validateAsync(req.query, options);
      }
      if (paramsSchema) {
        req.header = await paramsSchema.validateAsync(req.params, options);
      }
      next();
    } catch (error) {
      const details = error.details.map(detail => ({
        message: detail.message.replace(/\\/g, ''), 
        path: detail.path,
      }));
      const message = {
        message: ReasonPhrases.BAD_REQUEST,
        error: details
      }
      res.status(StatusCodes.BAD_REQUEST).json(message);
    }
  }
};