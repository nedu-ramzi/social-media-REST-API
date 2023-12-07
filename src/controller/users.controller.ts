import { Request, Response } from "express";
import { User } from '../models/User.model';
import * as argon from 'argon2';


export class UserController {
    //update a user
    async updateAuser(req: Request, res: Response) {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            if (req.body.password) {
                try {
                    req.body.password = await argon.hash(req.body.password)
                } catch (err) {
                    return res.status(500).json(err)
                }
            }
            try {
                const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
                res.status(200).json("Account has been updated")
            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            return res.status(403).json("You can update only your account")
        }
    }

    //delete a user
    async deleteAuser(req: Request, res:Response){
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            try {
                const user = await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Account has been deleted successfully")
            } catch (error) {
                return res.status(500).json(error);
            }
        } else {
            return res.status(403).json("You can delete only your account")
        }
    }

    //get a user
    async getAuser(req: Request, res: Response){
        try {
            const user: any = await User.findById(req.params.id);
            const { password, updatedAt, ...other } = user._doc
            res.status(200).json(other)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    //follow a user
    async followAuser(req: Request, res: Response){
        if (req.body.userId !== req.params.id) {
            try {
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId)

                if (!user.followings.includes(req.body.userId)) {
                    await user.updateOne({ $push: { followings: req.body.userId } });
                    await currentUser.updateOne({ $push: { followings: req.params.id } });
                    res.status(200).json('user has been followed');
                } else {
                    res.status(403).json('You already follow this user')
                }
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(403).json('You can\'t follow yourself')
        }
    }

    //unfollow a user
    async unFollowAuser(req: Request, res: Response){
        if (req.body.userId !== req.params.id) {
            try {
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId)

                if (user.followers.includes(req.body.userId)) {
                    await user.updateOne({ $pull: { followers: req.body.userId } });
                    await currentUser.updateOne({ $pull: { followings: req.params.id } });
                    res.status(200).json('user has been unfollowed');
                } else {
                    res.status(403).json('You don\'t followed this user')
                }
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(403).json('You can\'t unfollow yourself')
        }
    }
}