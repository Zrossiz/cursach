import { PrismaClient } from "../generated/prisma/client.js";

class CardRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async getAllCardsByUserWithCashbacks(userId: string) {
        return await this.prisma.card.findMany({
            where: {
                userId: userId
            },
            include: {
                cashbackCategories: {
                    include: {
                        category: true
                    }
                },
                
            }
        })
    }
}

export default CardRepository;