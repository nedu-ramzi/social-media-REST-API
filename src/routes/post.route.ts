import { Router, Request, Response } from "express";
import { Post } from "../models/Post.model";
export const router = Router();

//create a post
router.post('/',async (req:Request, res: Response) => {
    
})
//update a post
//delete a post
//like a post
//get a post
//get all followed users post  || timeline post
router.get('/')
