import {
    ReasonPhrases,
    StatusCodes,
  } from 'http-status-codes';
  
export const errorHandler = ((err, req, res, next) => {
    const response = {
      error: ReasonPhrases.INTERNAL_SERVER_ERROR
    }
    if(!process.env.ENVIORNMENT) response["message"] = err.message;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  });