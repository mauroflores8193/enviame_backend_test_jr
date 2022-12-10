const createExpressApp = require('./frameworks/http/express');
const SequelizeClient = require('./frameworks/db/sequelize');

const SequelizeCategoriesRepository = require('./categories/repositories/sequelize-categories-repository');
const ManageCategoriesUsecase = require('./categories/usecases/manage-categories-usecase');
const createCategoriesRouter = require('./categories/http/categories-router');

const SequelizeUsersRepository = require('./users/repositories/sequelize-users-repository');
const ManageUsersUsecase = require('./users/usecases/manage-users-usecase');
const createUsersRouter = require('./users/http/users-router');

const SequelizeProductsRepository = require('./products/repositories/sequelize-products-repository');
const ManageProductsUsecase = require('./products/usecases/manage-products-usecase');
const createProductsRouter = require('./products/http/products-router');

const SequelizeTransactionsRepository = require('./transactions/repositories/sequelize-transactions-repository');
const ManageTransactionsUsecase = require('./transactions/usecases/manage-transactions-usecase');
const createTransactionsRouter = require('./transactions/http/transactions-router');

const sequelizeClient = new SequelizeClient();

const sequelizeCategoriesRepository = new SequelizeCategoriesRepository(sequelizeClient);
const manageCategoriesUsecase = new ManageCategoriesUsecase(sequelizeCategoriesRepository);

const sequelizeUsersRepository = new SequelizeUsersRepository(sequelizeClient);
const manageUsersUsecase = new ManageUsersUsecase(sequelizeUsersRepository);

const sequelizeProductsRepository = new SequelizeProductsRepository(sequelizeClient);
const manageProductsUsecase = new ManageProductsUsecase(sequelizeProductsRepository);

const sequelizeTransactionsRepository = new SequelizeTransactionsRepository(sequelizeClient);
const manageTransactionsUsecase = new ManageTransactionsUsecase(sequelizeTransactionsRepository);

sequelizeUsersRepository.userModel.hasMany(sequelizeProductsRepository.productModel, { as: 'SellerUser', foreignKey: 'SellerUserId' });
sequelizeProductsRepository.productModel.belongsTo(sequelizeUsersRepository.userModel, { as: 'SellerUser', foreignKey: 'SellerUserId' });

sequelizeCategoriesRepository.categoryModel.hasMany(sequelizeProductsRepository.productModel);
sequelizeProductsRepository.productModel.belongsTo(sequelizeCategoriesRepository.categoryModel);

sequelizeUsersRepository.userModel.hasMany(sequelizeTransactionsRepository.transactionModel, { as: 'BuyerUser', foreignKey: 'BuyerUserId' });
sequelizeTransactionsRepository.transactionModel.belongsTo(sequelizeUsersRepository.userModel, { as: 'BuyerUser', foreignKey: 'BuyerUserId' });

sequelizeTransactionsRepository.addProductRelation(sequelizeProductsRepository);
sequelizeProductsRepository.productModel.belongsToMany(sequelizeTransactionsRepository.transactionModel, { through: 'TransactionProducts' });

sequelizeClient.syncDatabase();

let routers = [
  createCategoriesRouter(manageCategoriesUsecase),
  createUsersRouter(manageUsersUsecase),
  createProductsRouter(manageProductsUsecase),
  createTransactionsRouter(manageTransactionsUsecase)
];

// Crear aplicación Express con dependencias inyectadas.

const app = createExpressApp(routers);
