const { DataTypes } = require('sequelize');

class SequelizeTransactionsRepository {

  constructor(sequelizeClient, test = false) {
    this.sequelizeClient = sequelizeClient
    this.test = test;

    let tableName = "Transactions";
    if (test) {
      tableName += "_test";
    }

    const columns = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      }
    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.transactionModel = sequelizeClient.sequelize.define('Transaction', columns, options);
  }

  async getTransactions() {
    const transactions = await this.transactionModel.findAll({ raw: true });
    return transactions;
  }

  async getTransaction(id) {
    return await this.transactionModel.findByPk(id);
  }

  async createTransaction(transaction) {
    const data = await this.transactionModel.create(transaction);
    for (let productId of transaction.ProductIds) {
      const product = await this.productsRepository.getProduct(productId)
      if(product.status === 'active') {
        product.decrement('quantity', { by: 1 })
        data.addProduct(product)
      }
    }
    return data;
  }

  async updateTransaction(transaction) {
    const options = {
      where: {
        id: transaction.id,
      }
    };
    await this.transactionModel.update(transaction, options);
  }

  async deleteTransaction(id) {
    const transaction = await this.transactionModel.findByPk(id, {
      include: [{
        model: this.productsRepository.productModel,
        through: { attributes: [] }
      }]
    })
    for(let product of transaction.Products) {
      product.increment('quantity', { by: 1 })
    }
    await transaction.destroy();
  }

  async deleteAllTransactions() {
    if (this.test) {
      const options = {
        truncate: true
      };
      await this.transactionModel.destroy(options);
    }
  }

  async dropTransactionsTable() {
    if (this.test) {
      await this.transactionModel.drop();
    }
  }

  addProductRelation(productsRepository) {
    this.productsRepository = productsRepository
    this.transactionModel.belongsToMany(productsRepository.productModel, { through: 'TransactionProducts' })
  }

  async getTransactionsByBuyers() {
    return await this.sequelizeClient.query(
      "SELECT t.id, t.BuyerUserId, u.name as buyer " +
      "FROM Users as u JOIN Transactions as t ON u.id = t.BuyerUserId "
    );
  }

  async getTransactionsBySellers() {
    return await this.sequelizeClient.query(
      "SELECT DISTINCT t.id, p.SellerUserId, u.name as seller " +
      "FROM Transactions as t " +
      " JOIN TransactionProducts as tp ON t.id = tp.TransactionId " +
      " JOIN Products as p ON tp.ProductId = p.id JOIN Users as u ON p.SellerUserId = u.id "
    );
  }

}

module.exports = SequelizeTransactionsRepository;
