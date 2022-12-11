const Product = require('../entities/product');

class ManageProductsUsecase {

  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async getProducts() {
    return await this.productsRepository.getAll();
  }

  async getProduct(id) {
    return await this.productsRepository.get(id);
  }

  async createProduct(data) {
    const product = new Product(undefined, data.name, data.description, data.quantity, data.sellerUserId, data.categoryId);
    return await this.productsRepository.create(product);
  }

  async updateProduct(id, data) {
    const product = new Product(id, data.name, data.description, data.quantity, data.sellerUserId, data.categoryId);
    await this.productsRepository.update(product);
    return product;
  }

  async deleteProduct(id) {
    await this.productsRepository.delete(id);
  }

}

module.exports = ManageProductsUsecase;
