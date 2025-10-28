import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { env } from 'env';
import { logger } from '@utils/logger';
import ApiError from '@utils/ApiError';

type UnknownError = Partial<{
  statusCode: number;
  message: string;
  stack?: string;
}> & Error;

export const errorConverter = (
    err: unknown,
    _req: Request,
    _res: Response,
    next: NextFunction
) => {
    let error = err as UnknownError;

    if (!(error instanceof ApiError)) {
        const isMongooseError = error instanceof mongoose.Error;
        const statusCode =
            (error as UnknownError)?.statusCode ||
            (isMongooseError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR);

        const message =
            (error as UnknownError)?.message || getReasonPhrase(statusCode);

        error = new ApiError(statusCode, message, false, (error as UnknownError)?.stack);
    }
    if (error?.message?.includes('Not found')) {
        error.statusCode = StatusCodes.UNAUTHORIZED;
        error.message = 'Unauthorized or invalid Clerk session';
        return _res.json({message: "Invalid user or session. Please try to login again!"})
    }
    
    next(error);
};

export const errorHandler = (
    err: ApiError,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    let { statusCode, message } = err;

    if (env.ENV === 'production' && !err.isOperational) {
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
    }

    res.locals.errorMessage = err.message;

    const response: Record<string, unknown> = {
        code: statusCode,
        message,
        ...(env.ENV === 'development' && { stack: err.stack }),
    };

    if (env.ENV === 'development') {
        logger.error(err);
    }

    return res.status(statusCode).json(response);
};