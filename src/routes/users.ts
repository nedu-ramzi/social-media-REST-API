import { Router } from "express";
import { UserController } from '../controller/users.controller'
// export const router = Router();

//instantiate UserController
const userController = new UserController();

export default (router: Router) => {

    router.put('/users/:id', userController.updateAuser)
    router.delete('/users/:id', userController.deleteAuser);
    router.get('/users/:id', userController.getAuser);
    router.put('/users/:id/follow', userController.followAuser);
    router.put('/users/:id/unfollow', userController.unFollowAuser);

}