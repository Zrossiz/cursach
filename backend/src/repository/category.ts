import { Category, PrismaClient } from "../generated/prisma/client.js";


class CategoryRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async getAll(): Promise<Category[]> {
        return await this.prisma.category.findMany();
    }
}

export default CategoryRepository;