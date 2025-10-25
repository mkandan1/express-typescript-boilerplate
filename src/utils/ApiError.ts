import { StatusCodes } from 'http-status-codes';

export default class ApiError extends Error {
    public statusCode: StatusCodes;
    public isOperational: boolean;

    constructor(
        statusCode: StatusCodes,
        message: string,
        isOperational = true,
        stack = ''
    ) {
        super(message);

        this.statusCode = statusCode;
        this.isOperational = isOperational;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
