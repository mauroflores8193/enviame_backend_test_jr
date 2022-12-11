const { DataTypes } = require('sequelize');
const SequelizeRepository = require("./sequelize-repository");

class SequelizeCategoriesRepository extends SequelizeRepository {

  constructor(sequelizeClient, test = false) {
    super(sequelizeClient, "Categories", "Category", test)
  }

  columns() {
    return {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    };
  }

  async getCategoriesByBuyer(buyerId) {
    return await this.sequelizeClient.query(`
      SELECT DISTINCT c.id, c.name 
      FROM Categories as c 
        JOIN Products as p ON c.id = p.categoryId 
        JOIN TransactionProducts as tp ON p.id = tp.productId 
        JOIN Transactions as t on tp.transactionId = t.id
      WHERE t.buyerUserId = ?       
    `, {replacements: [buyerId]});
  }

  addRelations(productsRepository) {
    this.model.hasMany(productsRepository.model, { foreignKey: 'categoryId' });
  }

}

module.exports = SequelizeCategoriesRepository;
