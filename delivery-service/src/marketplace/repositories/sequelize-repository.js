class SequelizeRepository {

  constructor(sequelizeClient, tableName, modelName, test = false) {
    this.sequelizeClient = sequelizeClient
    this.test = test;
    if (test) {
      tableName += "_test";
    }

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.model = sequelizeClient.sequelize.define(modelName, this.columns(), options);
  }

  columns() {}

  async getAll() {
    return await this.model.findAll({ raw: true });
  }

  async get(id) {
    return await this.model.findByPk(id);
  }

  async create(obj) {
    return await this.model.create(obj);
  }

  async update(obj) {
    const options = {
      where: { id: obj.id }
    };
    await this.model.update(obj, options);
  }

  async delete(id) {
    const options = {
      where: {
        id: id,
      }
    };
    await this.model.destroy(options);
  }

  async deleteAll() {
    if (this.test) {
      const options = {
        truncate: true
      };
      await this.model.destroy(options);
    }
  }

  async dropTable() {
    if (this.test) {
      await this.model.drop();
    }
  }
}

module.exports = SequelizeRepository
