import { Router } from "express";
import { UserController } from '../controller/users.controller'
export const router = Router();

//instantiate UserController
const userController = new UserController();

router.put('/:id', userController.updateAuser)

router.delete('/:id', userController.deleteAuser);

router.get('/:id', userController.getAuser);

router.put('/:id/follow', userController.followAuser);

router.put('/:id/unfollow', userController.unFollowAuser);