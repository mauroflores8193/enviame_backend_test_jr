const createExpressApp = require('./frameworks/http/express');
const SequelizeClient = require('./frameworks/db/sequelize');

const createCategoriesRouter = require('./categories/http/categories-router');
const ManageCategoriesUsecase = require('./categories/usecases/manage-categories-usecase');
const SequelizeCategoriesRepository = require('./categories/repositories/sequelize-categories-repository');

const createUsersRouter = require('./users/http/users-router');
const ManageUsersUsecase = require('./users/usecases/manage-users-usecase');
const SequelizeUsersRepository = require('./users/repositories/sequelize-users-repository');

const sequelizeClient = new SequelizeClient();

const sequelizeCategoriesRepository = new SequelizeCategoriesRepository(sequelizeClient);
const manageCategoriesUsecase = new ManageCategoriesUsecase(sequelizeCategoriesRepository);

const sequelizeUsersRepository = new SequelizeUsersRepository(sequelizeClient);
const manageUsersUsecase = new ManageUsersUsecase(sequelizeUsersRepository);

sequelizeClient.syncDatabase();

let routers = [
  createCategoriesRouter(manageCategoriesUsecase),
  createUsersRouter(manageUsersUsecase),
];
  
// Crear aplicación Express con dependencias inyectadas.

const app = createExpressApp(routers);
