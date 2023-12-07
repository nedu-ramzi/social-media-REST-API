import { Router } from "express";
import { PostController } from "../controller/posts.controller";

export const router = Router();

//instantiate PostController
const posts = new PostController();

//create a post
router.post('/',  posts.newPost);

//update a post
router.put('/:id', posts.updatePost);

//delete a post
router.delete('/:id', posts.deleteApost);

//like / dislike a post
router.put('/:id/like', posts.likeAndUnlike);

// get all user post
router.get('/', posts.getAllPost);

//get a post
router.get('/:id', posts.getApost)

//get all followed users post  || timeline post
router.get('/timeline/all', posts.getAllFollowedUserPost)
