import { Router } from 'express';
import auth from './auth';
import post from './post';
import users from './users';

const router = Router();

export default():Router =>{
    auth(router);
    post(router);
    users(router);

    return router
}