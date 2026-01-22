import { Good, PrismaClient } from "../generated/prisma/client.js";

class GoodRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async getAllByCategoryId(categoryId: number): Promise<Good[]> {
        return await this.prisma.good.findMany({
            where: {
                categoryId
            }
        })
    }

    async getOneById(id: number): Promise<Good | null> {
        return await this.prisma.good.findFirst({
            where: {
                id
            }
        })
    }
}

export default GoodRepository;