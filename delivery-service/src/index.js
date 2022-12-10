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

const sequelizeClient = new SequelizeClient();

const sequelizeCategoriesRepository = new SequelizeCategoriesRepository(sequelizeClient);
const manageCategoriesUsecase = new ManageCategoriesUsecase(sequelizeCategoriesRepository);

const sequelizeUsersRepository = new SequelizeUsersRepository(sequelizeClient);
const manageUsersUsecase = new ManageUsersUsecase(sequelizeUsersRepository);

const sequelizeProductsRepository = new SequelizeProductsRepository(sequelizeClient);
const manageProductsUsecase = new ManageProductsUsecase(sequelizeProductsRepository);

sequelizeUsersRepository.userModel.hasMany(sequelizeProductsRepository.productModel, { foreignKey: 'seller_user_id' });
sequelizeProductsRepository.productModel.belongsTo(sequelizeUsersRepository.userModel, { foreignKey: 'seller_user_id' });

sequelizeCategoriesRepository.categoryModel.hasMany(sequelizeProductsRepository.productModel, { foreignKey: 'category_id' });
sequelizeProductsRepository.productModel.belongsTo(sequelizeCategoriesRepository.categoryModel, { foreignKey: 'category_id' });

sequelizeClient.syncDatabase();

let routers = [
  createCategoriesRouter(manageCategoriesUsecase),
  createUsersRouter(manageUsersUsecase),
  createProductsRouter(manageProductsUsecase),
];

// Crear aplicación Express con dependencias inyectadas.

const app = createExpressApp(routers);
