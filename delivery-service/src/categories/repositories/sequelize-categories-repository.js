const { DataTypes } = require('sequelize');

class SequelizeCategoriesRepository {

  constructor(sequelizeClient, test = false) {
    this.sequelizeClient = sequelizeClient
    this.test = test;

    let tableName = "Categories";
    if (test) {
      tableName += "_test";
    }

    const columns = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.categoryModel = sequelizeClient.sequelize.define('Category', columns, options);
  }

  async getCategories() {
    const categories = await this.categoryModel.findAll({
      raw: true
    });
    return categories;
  }

  async getCategory(id) {
    return await this.categoryModel.findByPk(id);
  }

  async createCategory(category) {
    const data = await this.categoryModel.create(category);
    return data.id;
  }

  async updateCategory(category) {
    const options = {
      where: {
        id: category.id,
      }
    };
    await this.categoryModel.update(category, options);
  }

  async deleteCategory(id) {
    const options = {
      where: {
        id: id,
      }
    };
    await this.categoryModel.destroy(options);
  }

  async deleteAllCategories() {
    if (this.test) {
      const options = {
        truncate: true
      };
      await this.categoryModel.destroy(options);
    }
  }

  async dropCategoriesTable() {
    if (this.test) {
      await this.categoryModel.drop();
    }
  }

  async getCategoriesByBuyer(buyerId) {
    console.log(buyerId)
    return await this.sequelizeClient.query(`
      SELECT DISTINCT c.id, c.name 
      FROM Categories as c 
        JOIN Products as p ON c.id = p.CategoryId 
        JOIN TransactionProducts as tp ON p.id = tp.ProductId 
        JOIN Transactions as t on tp.TransactionId = t.id
      WHERE t.BuyerUserId = ?       
    `, {replacements: [buyerId]});
  }

}

module.exports = SequelizeCategoriesRepository;
