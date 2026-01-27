import { Request, Response } from "express";
import CategoryService from "../service/category";
import { Logger } from "winston";

class CategoryController {
    private readonly categoryService: CategoryService;
    private readonly log: Logger;

    constructor(
        categoryService: CategoryService,
        log: Logger
    ) {
        this.categoryService = categoryService
        this.log = log
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const categories = await this.categoryService.getAll()

            return res.status(200).json(categories);
        } catch (err) {
            this.log.error("get all categories error", err)
            return res.status(500).json({
                message: "internal server error"
            })
        }
    }
}

export default CategoryController;