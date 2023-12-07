import { Request, Response } from "express";
import { Post } from "../models/Post.model";
import { User } from "../models/User.model";


export class PostController {
    async newPost(req: Request, res: Response) {
        const newPost: any = new Post(req.body);
        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async updatePost(req: Request, res: Response) {
        try {
            const post: any = await Post.findById(req.params.id);
            if (post.userId === req.body.userId) {
                await post.updateOne({ $set: req.body });
                res.status(200).json('The post has been updated')
            } else {
                res.status(403).json('You can update only your post')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async deleteApost(req: Request, res: Response) {
        try {
            const post: any = await Post.findById(req.params.id);
            if (post.userId === req.body.userId) {
                await post.deleteOne();
                res.status(200).json('The post has been deleted')
            } else {
                res.status(403).json('You can delete only your post')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async likeAndUnlike(req: Request, res: Response) {
        try {
            const post: any = await Post.findById(req.params.id);
            if (!post.likes.includes(req.body.userId)) {
                await post.updateOne({ $push: { likes: req.body.userId } });
                res.status(200).json('liked post');
            } else {
                await post.updateOne({ $pull: { likes: req.body.userId } });
                res.status(200).json('unliked post')
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async getAllPost(req: Request, res: Response){
        try {
            const post: any = await Post.find();
            res.status(200).json(post);
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async getApost(req: Request, res: Response){
        try {
            const post: any = await Post.findById(req.params.id);
            res.status(200).json(post);
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async getAllFollowedUserPost(req: Request, res: Response){
        try {
            const currentUser = await User.findById(req.body.userId);
            const userPosts = await Post.find({ userId: currentUser._id });
            const friendPosts = await Promise.all(
                currentUser.followers.map((friendId) => {
                    return Post.find({ userId: friendId });
                })
            );
            res.status(200).json(userPosts.concat(...friendPosts));
        } catch (error) {
            res.status(500).json(error)
        }
    }
}