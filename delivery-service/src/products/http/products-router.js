const express = require('express');
const appRoot = require('app-root-path');
const Product = require('../entities/product');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");
const authenticateToken = require("../../frameworks/middlewares/authenticate-token");

function createProductsRouter(manageProductsUsecase) {

  const router = express.Router();

  router.use(authenticateToken);

  router.get("/products", async (req, res) => {
    const products = await manageProductsUsecase.getProducts();
    res.status(200).send(products);
  });

  router.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    const book = await manageProductsUsecase.getProduct(id);
    res.status(200).send(book);
  });

  router.post("/products", async (req, res) => {
    const validation = validateSchema(Product.schema, req);
    if (validation === true) {
      const book = await manageProductsUsecase.createProduct(req.body);
      res.status(201).send(book);
    } else {
      res.status(422).send(validation)
    }
  });

  router.put("/products/:id", async (req, res) => {
    const validation = validateSchema(Product.schema, req);
    if (validation === true) {
      const id = req.params.id;
      const book = await manageProductsUsecase.updateProduct(id, req.body);
      res.status(200).send(book);
    } else {
      res.status(422).send(validation);
    }
  });

  router.delete("/products/:id", async (req, res) => {
    const id = req.params.id;
    await manageProductsUsecase.deleteProduct(id);
    res.status(200).send(`Deleted ${id}`);
  });

  return router;

}

module.exports = createProductsRouter;
