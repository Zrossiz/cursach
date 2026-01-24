import CardController from "../controller/card";
import { Router } from "express";
import { jwtCookieAuth } from "../middleware/auth";

class CardRouter {
    public readonly router: Router;
    private readonly cardController: CardController;
    private readonly JWT_SECRET: string;

  constructor(cardController: CardController, JWT_SECRET: string) {
    this.cardController = cardController;
    this.router = Router();
    this.JWT_SECRET = JWT_SECRET

    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", jwtCookieAuth({secret: this.JWT_SECRET}), this.cardController.getCards);
  }
}

export default CardRouter;