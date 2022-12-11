const { DataTypes } = require('sequelize');
const SequelizeRepository = require("./sequelize-repository");

class SequelizeProductsRepository extends SequelizeRepository {

  constructor(sequelizeClient, test = false) {
    super(sequelizeClient, "Products", "Product", test)
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
      quantity: DataTypes.INTEGER,
      status: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.quantity > 0 ? 'active' : 'inactive';
        }
      }
    };
  }

  addRelations(usersRepository, categoriesRepository, transactionsRepository) {
    this.model.belongsTo(usersRepository.model, { as: 'SellerUser', foreignKey: 'sellerUserId' });
    this.model.belongsTo(categoriesRepository.model, { foreignKey: 'categoryId' });
    this.model.belongsToMany(transactionsRepository.model, { through: 'TransactionProducts', foreignKey: 'productId' });
  }


}

module.exports = SequelizeProductsRepository;
