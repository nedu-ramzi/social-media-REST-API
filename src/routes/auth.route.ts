import { Router, Request, Response } from "express";
import { User } from '../models/User.model';
import { ApplicationError } from "../helpers/errors.helpers";
import * as argon from 'argon2';
import { issueToken } from "../services/jwt.services";
export const router = Router();

//Register User
router.post('/register', async (req: Request, res: Response) => {
    try {
        //destructure request from req.body
        const {
            username,
            email,
            password,
            confirmPassword,
            profilePicture,
            coverPicture,
            followers,
            followings,
            isAdmin
        } = req.body;

        //password confirmation
        if (password !== confirmPassword) {
            throw new ApplicationError('Password do not match', 422);
        }
        //check if mail exist
        const existEmail = await User.findOne({ email: email })
        if (existEmail) {
            throw new ApplicationError('Email already exist', 422)
        }

        // import bcrypt and use like so insatead of argon2
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = bcrypt.hash(password, salt)

        //hashed password to save to db
        const hashedPassword = await argon.hash(password);

        //create info and save to db
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            profilePicture,
            coverPicture,
            followers,
            followings,
            isAdmin
        });
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'User successfully registered',
            data: { user }
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'User not registered',
            err: {
                err: error.message,
                code: error.code
            }
        })
    }
})

//Login User
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email });
        if (!user) throw new ApplicationError('User acount not found', 404)

        const verifyPassword = await argon.verify(user.password, password);
        if (!verifyPassword) throw new ApplicationError('Invalid Email or password', 401)

        // for bcrypt
        // const comparePassword = await bcrypt.compare(password, user.password)

        //generate token 
        const payload = {
            id: user.id,
            email: user.email,
            password: user.password,
            admin: user.isAdmin
        }
        const token = issueToken(payload);

        return res.status(200).json({
            success: true,
            message: 'User Logged in',
            authorization: {
                type: 'Bearer',
                token: token
            }
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Login failed',
            err: {
                err: error.message,
                code: error.code
            }
        })
    }


})