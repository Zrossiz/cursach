import GoodRepository from "../repository/good.js"

class GoodService {
    private readonly goodRepo: GoodRepository;
    constructor(goodRepo: GoodRepository) {
        this.goodRepo = goodRepo
    }

    async getAllByCategoryId(categoryId: number) {
        return await this.goodRepo.getAllByCategoryId(categoryId);
    }

    async getOneById(goodId: number) {
        return await this.goodRepo.getOneById(goodId)
    }
}

export default GoodService