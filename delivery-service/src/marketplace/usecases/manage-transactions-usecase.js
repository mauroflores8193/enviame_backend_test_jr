const Transaction = require('../entities/transaction');

class ManageTransactionsUsecase {

  constructor(transactionsRepository, productsRepository) {
    this.transactionsRepository = transactionsRepository;
    this.productsRepository = productsRepository;
  }

  async getTransactions() {
    return await this.transactionsRepository.getAll();
  }

  async getTransaction(id) {
    return await this.transactionsRepository.get(id);
  }

  async createTransaction(data) {
    const transactionEntity = new Transaction(undefined, data.buyerUserId);
    const transaction = await this.transactionsRepository.create(transactionEntity);
    const products = await this.productsRepository.getActives(data.productIds)
    transaction.addProducts(products)
    for (let product of products) {
      product.decrement('quantity', { by: 1 })
    }
    return transaction
  }

  async updateTransaction(id, data) {
    const transaction = new Transaction(id, data.buyerUserId);
    await this.transactionsRepository.update(transaction);
    return transaction;
  }

  async deleteTransaction(id) {
    const transaction = await this.transactionsRepository.get(id)
    for (let product of transaction.Products) {
      product.increment('quantity', { by: 1 })
    }
    await transaction.destroy();
  }

  async getTransactionsByBuyers() {
    return await this.transactionsRepository.getTransactionsByBuyers();
  }

  async getTransactionsBySellers() {
    return await this.transactionsRepository.getTransactionsBySellers();
  }

}

module.exports = ManageTransactionsUsecase;
