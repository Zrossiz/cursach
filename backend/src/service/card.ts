import { CardDTO } from "../dto/card.js";
import { CashbackCategory } from "../dto/cashbackCategory.js";
import CardRepository from "../repository/card.js";

class CardService {
    private readonly cardRepo: CardRepository

    constructor(cardRepo: CardRepository) {
        this.cardRepo = cardRepo
    }

    async getUserCardsWithCashbacks(userId: string): Promise<CardDTO[]> {
        const cards = await this.cardRepo.getAllCardsByUserWithCashbacks(userId)
        const data: CardDTO[] = cards.map(card => {
            const cardWithCashBack: CardDTO = {
                id: card.id,
                name: card.name,
                cashbackCategories: []
            }
            
            const cashbacks: CashbackCategory[] = card.cardCashbackRules.map(item => {
                return {
                    id: item.id,
                    categoryId: item.productCategoryId,
                    name: item.bankCashbackCategory.name,
                    percent: item.percent,
                }
            })

            cardWithCashBack.cashbackCategories = cashbacks;

            return cardWithCashBack
        });
        return data;
    }
}

export default CardService;