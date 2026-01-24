import { Router } from "express";
import { jwtCookieAuth } from "../middleware/auth";
import GoodController from "../controller/good";

class GoodRouter {
    public readonly router: Router;
    private readonly goodController: GoodController;
    private readonly JWT_SECRET: string;

  constructor(goodController: GoodController, JWT_SECRET: string) {
    this.goodController = goodController;
    this.router = Router();
    this.JWT_SECRET = JWT_SECRET

    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/category/:categoryId", jwtCookieAuth({secret: this.JWT_SECRET}), this.goodController.getAllByCategoryId);
    this.router.get("/:goodId", jwtCookieAuth({secret: this.JWT_SECRET}), this.goodController.getOneById);
  }
}

export default GoodRouter;