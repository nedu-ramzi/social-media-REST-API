import { Router } from "express";
import { Authentication } from '../services/auth.services';
// instantiate Authentication class
const auth = new Authentication();

export default(router: Router)=>{
    //Register User
    router.post('/auth/register', auth.register);

    //Login User
    router.post('/auth/login', auth.login);
}