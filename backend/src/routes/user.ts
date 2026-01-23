import { Router } from "express";
import UserController from "../controller/user";

class UserRouter {
  public readonly router: Router;
  private readonly userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
    this.router = Router();

    this.initRoutes();
  }

  private initRoutes() {
    this.router.post("/register", this.userController.register);
    this.router.post("/login", this.userController.login);
  }
}

export default UserRouter;
