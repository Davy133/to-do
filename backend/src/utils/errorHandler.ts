import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { apiResponse } from './apiResponse';
import {
  PrismaClientKnownRequestError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

interface HttpError extends Error {
  status?: number;
}

const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  let status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';

  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        status = StatusCodes.CONFLICT;
        message = 'A record with this value already exists.';
        break;
      case 'P2025':
        status = StatusCodes.NOT_FOUND;
        message = 'Record not found.';
        break;
      default:
        status = StatusCodes.BAD_REQUEST;
        message = 'Database error.';
        break;
    }
  }

  if (err instanceof PrismaClientInitializationError) {
    status = StatusCodes.SERVICE_UNAVAILABLE;
    message = 'Database connection error.';
  }

  if (err instanceof PrismaClientValidationError) {
    status = StatusCodes.BAD_REQUEST;
    message = 'Invalid data provided.';
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error('Error:', err);
  }

  res.status(status).json(apiResponse.fail({ message }));
};

export default errorHandler;
