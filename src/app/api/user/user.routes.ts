import { Router, Request, Response, NextFunction } from 'express'
import { ProductController } from './user.controller';
import { requireAuth } from '@clerk/express';

const userRouter = Router();

const productController = new ProductController();

userRouter.get("/", requireAuth(), (req: Request, res: Response, next: NextFunction) => productController.getAll(req, res, next));
userRouter.post("/",(req: Request, res: Response, next: NextFunction) => productController.create(req, res, next));

export default userRouter;