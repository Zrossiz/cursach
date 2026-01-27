import { Logger } from "winston";
import GoodService from "../service/good"
import { Request, Response } from "express";

class GoodController {
    private readonly goodService: GoodService;
    private readonly log: Logger

    constructor(goodService: GoodService, log: Logger) {
        this.goodService = goodService
        this.log = log
    }  

    getAllByCategoryId = async (req: Request, res: Response) => {
        try {
            const { categoryId } = req.params
            if (!categoryId || isNaN(Number(categoryId))) {
                return res.status(400).json({ 
                    message: 
                    "category_id is invalid or missing" 
                });
            }

            const goods = await this.goodService.getAllByCategoryId(+categoryId)
            return res.status(200).json(goods)
        } catch (err) {
            this.log.error("get all by category id", err)
            return res.status(500).json({
                message: "internal server error"
            })
        }
    }

    getOneById = async (req: Request, res: Response) => {
        try {
            const { goodId } = req.params;
            if (!goodId || isNaN(Number(goodId))) {
                return res.status(400).json({
                    message: "goodId is invalid or missing"
                })
            }

            const good = await this.goodService.getOneById(+goodId)

            return res.status(200).json(good);
        } catch (err) {
            this.log.error("get one by id", err)
            return res.status(500).json({
                message: "internal server error"
            })
        }
    }
}

export default GoodController