import { PrismaClient } from "@prisma/client";

class CardRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async getAllCardsByUserWithCashbacks(userId: string) {
        return await this.prisma.card.findMany({
            where: {
                userId: userId
            },
            include: {
                cardCashbackRules: {
                    include: {
                        bankCashbackCategory: true,
                        productCategory: true,
                    }
                },
                
            }
        })
    }
}

export default CardRepository;