const { DataTypes } = require('sequelize');
const SequelizeRepository = require("./sequelize-repository");

class SequelizeTransactionsRepository extends SequelizeRepository {

  constructor(sequelizeClient, test = false) {
    super(sequelizeClient, "Transactions", "Transaction", test)
  }

  columns() {
    return {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      }
    };
  }

  async create(transaction) {
    const data = await super.create(transaction);
    for (let productId of transaction.productIds) {
      const product = await this.productsRepository.get(productId)
      if (product.status === 'active') {
        product.decrement('quantity', { by: 1 })
        data.addProduct(product)
      }
    }
    return data;
  }

  async get(id) {
    return await this.model.findByPk(id, {
      include: [{
        model: this.productsRepository.model,
        through: { attributes: [] }
      }]
    })
  }

  async delete(id) {
    const transaction = await this.get(id)
    for (let product of transaction.Products) {
      product.increment('quantity', { by: 1 })
    }
    await transaction.destroy();
  }

  addRelations(productsRepository, usersRepository) {
    this.productsRepository = productsRepository
    this.model.belongsToMany(productsRepository.model, { through: 'TransactionProducts', foreignKey: 'transactionId' })
    this.model.belongsTo(usersRepository.model, { as: 'BuyerUser', foreignKey: 'buyerUserId' });
  }

  async getTransactionsByBuyers() {
    return await this.sequelizeClient.query(`
      SELECT t.id, t.buyerUserId, u.name as buyer
      FROM Users as u JOIN Transactions as t ON u.id = t.buyerUserId
    `);
  }

  async getTransactionsBySellers() {
    return await this.sequelizeClient.query(`
      SELECT DISTINCT t.id, p.sellerUserId, u.name as seller
      FROM Transactions as t
       JOIN TransactionProducts as tp ON t.id = tp.transactionId
       JOIN Products as p ON tp.productId = p.id JOIN Users as u ON p.sellerUserId = u.id
    `);
  }

}

module.exports = SequelizeTransactionsRepository;
