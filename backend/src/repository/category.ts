import { PrismaClient, ProductCategory } from "@prisma/client";


class CategoryRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async getAll(): Promise<ProductCategory[]> {
        return await this.prisma.productCategory.findMany();
    }
}

export default CategoryRepository;