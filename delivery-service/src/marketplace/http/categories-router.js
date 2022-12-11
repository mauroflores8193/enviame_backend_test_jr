const express = require('express');
const appRoot = require('app-root-path');
const Category = require('../entities/category');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");
const authenticateToken = require("../../frameworks/middlewares/authenticate-token");

function createCategoriesRouter(manageCategoriesUsecase) {

  const router = express.Router();

  router.use(authenticateToken);

  router.get("/categories", async (req, res) => {
    const categories = await manageCategoriesUsecase.getCategories();
    res.status(200).send(categories);
  });

  router.get("/categories/:id", async (req, res) => {
    const id = req.params.id;
    const category = await manageCategoriesUsecase.getCategory(id);
    res.status(200).send(category);
  });

  router.post("/categories", async (req, res) => {
    const validation = validateSchema(Category.schema, req);
    if (validation === true) {
      const category = await manageCategoriesUsecase.createCategory(req.body);
      res.status(201).send(category);
    } else {
      res.status(422).send(validation)
    }
  });

  router.put("/categories/:id", async (req, res) => {
    const validation = validateSchema(Category.schema, req);
    if (validation === true) {
      const id = req.params.id;
      const category = await manageCategoriesUsecase.updateCategory(id, req.body);
      res.status(200).send(category);
    } else {
      res.status(422).send(validation);
    }
  });

  router.delete("/categories/:id", async (req, res) => {
    const id = req.params.id;
    await manageCategoriesUsecase.deleteCategory(id);
    res.status(200).send(`Deleted ${id}`);
  });

  router.get("/buyers/:buyerId/categories", async (req, res) => {
    const buyerId = req.params.buyerId;
    const categories = await manageCategoriesUsecase.getCategoriesByBuyer(buyerId);
    res.status(200).send(categories);
  });

  return router;

}

module.exports = createCategoriesRouter;
