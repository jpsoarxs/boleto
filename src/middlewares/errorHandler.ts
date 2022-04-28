import { Request, Response, NextFunction } from 'express';
import { CustomError } from './../utils/errorMessage';

function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  console.error(err)

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      'Ocorreu um erro inesperado, tente novamente mais tarde',
    );
  }

  res.status((customError as CustomError).status).send(customError);
};

export default handleError;