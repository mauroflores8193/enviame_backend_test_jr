const createExpressApp = require('./frameworks/http/express');
const SequelizeClient = require('./frameworks/db/sequelize');

const createCategoriesRouter = require('./categories/http/categories-router');
const ManageCategoriesUsecase = require('./categories/usecases/manage-categories-usecase');
const SequelizeCategoriesRepository = require('./categories/repositories/sequelize-categories-repository');

const sequelizeClient = new SequelizeClient();
const sequelizeCategoriesRepository = new SequelizeCategoriesRepository(sequelizeClient);
sequelizeClient.syncDatabase();
const manageCategoriesUsecase = new ManageCategoriesUsecase(sequelizeCategoriesRepository);

let routers = [
  createCategoriesRouter(manageCategoriesUsecase),
];
  
// Crear aplicación Express con dependencias inyectadas.

const app = createExpressApp(routers);
