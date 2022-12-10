const Product = require('../entities/product');

class ManageProductsUsecase {

  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async getProducts() {
    return await this.productsRepository.getProducts();
  }

  async getProduct(id) {
    return await this.productsRepository.getProduct(id);
  }

  async createProduct(data) {
    const product = new Product(undefined, data.name, data.description, data.quantity, data.seller_user_id, data.category_id);
    const id = await this.productsRepository.createProduct(product);
    product.id = id;
    return product;
  }

  async updateProduct(id, data) {
    const product = new Product(id, data.name, data.description, data.quantity, data.seller_user_id, data.category_id);
    await this.productsRepository.updateProduct(product);
    return product;
  }

  async deleteProduct(id) {
    await this.productsRepository.deleteProduct(id);
  }

}

module.exports = ManageProductsUsecase;
