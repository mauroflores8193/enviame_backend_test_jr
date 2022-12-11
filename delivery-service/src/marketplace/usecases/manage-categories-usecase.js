const Category = require('../entities/category');

class ManageCategoriesUsecase {

  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async getCategories() {
    return await this.categoriesRepository.getAll();
  }

  async getCategory(id) {
    return await this.categoriesRepository.get(id);
  }

  async createCategory(data) {
    const category = new Category(undefined, data.name, data.description);
    return await this.categoriesRepository.create(category);
  }

  async updateCategory(id, data) {
    const category = new Category(id, data.name, data.description);
    await this.categoriesRepository.update(category);
    return category;

  }

  async deleteCategory(id) {
    await this.categoriesRepository.delete(id);
  }


  async getCategoriesByBuyer(buyerId) {
    return await this.categoriesRepository.getCategoriesByBuyer(buyerId);
  }

}

module.exports = ManageCategoriesUsecase;
