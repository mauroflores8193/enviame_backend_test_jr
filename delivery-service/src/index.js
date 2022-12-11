const createExpressApp = require('./frameworks/http/express');
const SequelizeClient = require('./frameworks/db/sequelize');

const SequelizeCategoriesRepository = require('./marketplace/repositories/sequelize-categories-repository');
const ManageCategoriesUsecase = require('./marketplace/usecases/manage-categories-usecase');
const createCategoriesRouter = require('./marketplace/http/categories-router');

const SequelizeUsersRepository = require('./marketplace/repositories/sequelize-users-repository');
const ManageUsersUsecase = require('./marketplace/usecases/manage-users-usecase');
const createUsersRouter = require('./marketplace/http/users-router');

const SequelizeProductsRepository = require('./marketplace/repositories/sequelize-products-repository');
const ManageProductsUsecase = require('./marketplace/usecases/manage-products-usecase');
const createProductsRouter = require('./marketplace/http/products-router');

const SequelizeTransactionsRepository = require('./marketplace/repositories/sequelize-transactions-repository');
const ManageTransactionsUsecase = require('./marketplace/usecases/manage-transactions-usecase');
const createTransactionsRouter = require('./marketplace/http/transactions-router');

const sequelizeClient = new SequelizeClient();

const sequelizeCategoriesRepository = new SequelizeCategoriesRepository(sequelizeClient);
const manageCategoriesUsecase = new ManageCategoriesUsecase(sequelizeCategoriesRepository);

const sequelizeUsersRepository = new SequelizeUsersRepository(sequelizeClient);
const manageUsersUsecase = new ManageUsersUsecase(sequelizeUsersRepository);

const sequelizeProductsRepository = new SequelizeProductsRepository(sequelizeClient);
const manageProductsUsecase = new ManageProductsUsecase(sequelizeProductsRepository);

const sequelizeTransactionsRepository = new SequelizeTransactionsRepository(sequelizeClient);
const manageTransactionsUsecase = new ManageTransactionsUsecase(sequelizeTransactionsRepository);

sequelizeUsersRepository.userModel.hasMany(sequelizeProductsRepository.productModel, {
  as: 'SellerUser',
  foreignKey: 'sellerUserId'
});
sequelizeProductsRepository.productModel.belongsTo(sequelizeUsersRepository.userModel, {
  as: 'SellerUser',
  foreignKey: 'sellerUserId'
});

sequelizeCategoriesRepository.categoryModel.hasMany(sequelizeProductsRepository.productModel, { foreignKey: 'categoryId' });
sequelizeProductsRepository.productModel.belongsTo(sequelizeCategoriesRepository.categoryModel, { foreignKey: 'categoryId' });

sequelizeUsersRepository.userModel.hasMany(sequelizeTransactionsRepository.transactionModel, {
  as: 'BuyerUser',
  foreignKey: 'buyerUserId'
});
sequelizeTransactionsRepository.transactionModel.belongsTo(sequelizeUsersRepository.userModel, {
  as: 'BuyerUser',
  foreignKey: 'buyerUserId'
});

sequelizeTransactionsRepository.addProductRelation(sequelizeProductsRepository);
sequelizeProductsRepository.productModel.belongsToMany(sequelizeTransactionsRepository.transactionModel, {
  through: 'TransactionProducts',
  foreignKey: 'productId'
});

sequelizeClient.syncDatabase();

let routers = [
  createCategoriesRouter(manageCategoriesUsecase),
  createUsersRouter(manageUsersUsecase),
  createProductsRouter(manageProductsUsecase),
  createTransactionsRouter(manageTransactionsUsecase)
];

// Crear aplicación Express con dependencias inyectadas.

const app = createExpressApp(routers);
