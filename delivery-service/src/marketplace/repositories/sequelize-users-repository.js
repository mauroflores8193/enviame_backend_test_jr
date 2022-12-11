const {DataTypes} = require('sequelize');
const SequelizeRepository = require("./sequelize-repository");

class SequelizeUsersRepository extends SequelizeRepository {

  constructor(sequelizeClient, test = false) {
    super(sequelizeClient, "Users", "User", test)
  }

  columns() {
    return {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
    }
  }

  async getBuyers() {
    return await this.sequelizeClient.query(`
      SELECT u.id, u.name, u.email, count(t.id) as transactions
      FROM Users as u JOIN Transactions as t ON u.id = t.buyerUserId
      GROUP BY u.id, u.name, u.email
    `);
  }

  async getSellers() {
    return await this.sequelizeClient.query(`
      SELECT u.id, u.name, u.email, count(p.id) as products
      FROM Users as u JOIN Products as p ON u.id = p.sellerUserId
      GROUP BY u.id, u.name, u.email
    `);
  }

}

module.exports = SequelizeUsersRepository;
