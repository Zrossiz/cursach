import { Request, Response } from "express"
import CardService from "../service/card"
import { Logger } from "winston";

class CardController {
    private readonly cardsService: CardService;
    private readonly log: Logger;

    constructor(cardsService: CardService, log: Logger) {
        this.cardsService = cardsService;
        this.log = log;
    }

    getCards = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401);
            }

            const cards = await this.cardsService.getUserCardsWithCashbacks(userId);

            return res.status(200).json(cards)
        } catch (err) {
            this.log.error("get cards: ", err)
            return res.status(500).json({
                message: "internal server error"
            });
        }
    }
}

export default CardController