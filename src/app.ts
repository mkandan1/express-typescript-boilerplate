import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import { xss } from 'express-xss-sanitizer'
import helmet from 'helmet';
import compression from 'compression'
import dotenv from 'dotenv';
import router from 'api/router';
import { env } from 'env';
import { successHandler, errorHandler } from '@config/morgan'
import ApiError from '@utils/ApiError';
import { StatusCodes } from 'http-status-codes';
import { errorConverter } from '@middlewares/errorHandler';
import { clerkMiddleware } from '@clerk/express';

dotenv.config();

const app = express();

if (env.ENV !== 'test') {
	app.use(successHandler);
	app.use(errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('/{*any}', cors());

app.use(clerkMiddleware())

// Health Check
app.get('/health', (_req, res) => {
	res.json({ message: 'Server is running' });
});

// Routes
app.use('/v1', router);

app.all('/{*any}', (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(StatusCodes.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
