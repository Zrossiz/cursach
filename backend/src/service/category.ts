import CategoryRepository from "../repository/category.js";

class CategoryService {
    private readonly categoryRepo: CategoryRepository;

    constructor(categoryRepo: CategoryRepository) {
        this.categoryRepo = categoryRepo;
    }

    async getAll() {
        return await this.categoryRepo.getAll()
    }
}  

export default CategoryService