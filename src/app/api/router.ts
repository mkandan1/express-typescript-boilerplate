import { Router } from 'express'
import userRouter from './user/user.routes';

const router = Router();

const defaultRoutes = [
    {
        path: '/user',
        route: userRouter
    }
]

defaultRoutes.forEach((route)=> {
    router.use(route.path, route.route);
})


export default router;