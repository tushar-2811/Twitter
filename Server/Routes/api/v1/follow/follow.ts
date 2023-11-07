import { Router } from "express";
import { checkFollowingController, followController } from "../../../../Controllers/api/v1/follow/followController";

const followRouter = Router();

followRouter.get('/:currId/:userId/check' ,checkFollowingController )

followRouter.get('/:currId/:userId/:target' , followController);  
// target == "add" || "remove"

export default followRouter;
