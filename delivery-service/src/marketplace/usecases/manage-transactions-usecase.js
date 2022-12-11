const Transaction = require('../entities/transaction');

class ManageTransactionsUsecase {

  constructor(transactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  async getTransactions() {
    return await this.transactionsRepository.getAll();
  }

  async getTransaction(id) {
    return await this.transactionsRepository.get(id);
  }

  async createTransaction(data) {
    const transaction = new Transaction(undefined, data.buyerUserId, data.productIds);
    return await this.transactionsRepository.create(transaction);
  }

  async updateTransaction(id, data) {
    const transaction = new Transaction(id, data.buyerUserId);
    await this.transactionsRepository.update(transaction);
    return transaction;
  }

  async deleteTransaction(id) {
    await this.transactionsRepository.delete(id);
  }

  async getTransactionsByBuyers() {
    return await this.transactionsRepository.getTransactionsByBuyers();
  }

  async getTransactionsBySellers() {
    return await this.transactionsRepository.getTransactionsBySellers();
  }

}

module.exports = ManageTransactionsUsecase;
