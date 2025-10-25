import { env } from '@env/env';
import { logger } from '@utils/logger';
import morgan from 'morgan';
import type { Response } from 'express';

morgan.token('message', (req, res) => {
    const response = res as Response
    return response.locals?.errorMessage || ''
});

const getIpFormat = () => (env.ENV === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: { write: (message) => logger.error(message.trim()) },
});

export { successHandler, errorHandler };