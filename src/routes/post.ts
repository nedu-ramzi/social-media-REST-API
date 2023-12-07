import { Router } from "express";
import { PostController } from "../controller/posts.controller";

//instantiate PostController
const posts = new PostController();

export default(router: Router)=>{
    //create a post
    router.post('/posts/', posts.newPost);

    //update a post
    router.put('/posts/:id', posts.updatePost);

    //delete a post
    router.delete('/posts/:id', posts.deleteApost);

    //like / dislike a post
    router.put('/posts/:id/like', posts.likeAndUnlike);

    // get all user post
    router.get('/posts/', posts.getAllPost);

    //get a post
    router.get('/posts/:id', posts.getApost)

    //get all followed users post  || timeline post
    router.get('/posts/timeline/all', posts.getAllFollowedUserPost);
}

