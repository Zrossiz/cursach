import { Router } from "express";
import CategoryController from "../controller/category";

class CategoryRouter {
  public readonly router: Router;
  private readonly categoryController: CategoryController;

  constructor(categoryController: CategoryController) {
    this.categoryController = categoryController;
    this.router = Router();

    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", this.categoryController.getAll);
  }
}

export default CategoryRouter;
