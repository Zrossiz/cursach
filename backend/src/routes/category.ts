import { Router } from "express";
import CategoryController from "../controller/category";
import { jwtCookieAuth } from "../middleware/auth";

class CategoryRouter {
  public readonly router: Router;
  private readonly categoryController: CategoryController;
  private readonly JWT_SECRET: string;
  

  constructor(categoryController: CategoryController, JWT_SECRET: string) {
    this.categoryController = categoryController;
    this.router = Router();
    this.JWT_SECRET = JWT_SECRET

    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", jwtCookieAuth({secret: this.JWT_SECRET}), this.categoryController.getAll);
  }
}

export default CategoryRouter;
