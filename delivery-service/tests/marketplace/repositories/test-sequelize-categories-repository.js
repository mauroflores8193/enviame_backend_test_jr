const appRoot = require('app-root-path');
const assert = require('assert');

const SequelizeClient = require(appRoot + '/src/frameworks/db/sequelize');
const SequelizeCategoriesRepository = require(appRoot + '/src/marketplace/repositories/sequelize-categories-repository');
const Category = require(appRoot + '/src/marketplace/entities/category');

describe("TestSequelizeCategoriesRepository", function () {

  const client = new SequelizeClient();
  const repository = new SequelizeCategoriesRepository(client, true);

  const name = "TestName";
  const description = "TestDescription";
  const newCategoryEntity = new Category(undefined, name, description);

  before(async function () {
    await client.syncDatabase();
  });

  beforeEach(async function () {
    await repository.deleteAll();
  });

  after(async function () {
    await repository.dropTable();
  });

  it("should create and get a category", async function () {
    const { id } = await repository.create(newCategoryEntity);
    const obtainedCategory = await repository.get(id);

    assert.equal(obtainedCategory.id, id);
    assert.equal(obtainedCategory.name, name);
    assert.equal(obtainedCategory.description, description);
  });

  it("should create and delete a category", async function () {
    const { id } = await repository.create(newCategoryEntity)
    await repository.delete(id);

    const categories = await repository.getAll();
    assert.equal(categories.length, 0);
  });

  it("should create three categories and get them all", async function () {
    const categoriesAmount = 3;

    for (let i = 0; i < categoriesAmount; i++) {
      await repository.create(newCategoryEntity);
    }

    const categories = await repository.getAll();
    assert.equal(categoriesAmount, categories.length);
  });

});
