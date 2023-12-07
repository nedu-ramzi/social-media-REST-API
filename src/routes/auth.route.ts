import { Router } from "express";
import { Authentication } from '../services/auth.services';
// instantiate Authentication class
const auth = new Authentication();

export const router = Router();


//Register User
router.post('/register', auth.register);

//Login User
router.post('/login', auth.login);