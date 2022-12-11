const express = require('express');
const appRoot = require('app-root-path');
const User = require('../entities/user');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");
const authenticateToken = require("../../frameworks/middlewares/authenticate-token");

function createUsersRouter(manageUsersUsecase) {

  const router = express.Router();

  router.use(authenticateToken);

  router.get("/users", async (req, res) => {
    const users = await manageUsersUsecase.getUsers();
    res.status(200).send(users);
  });

  router.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const book = await manageUsersUsecase.getUser(id);
    res.status(200).send(book);
  });

  router.post("/users", async (req, res) => {
    const validation = validateSchema(User.schema, req);
    if (validation === true) {
      const book = await manageUsersUsecase.createUser(req.body);
      res.status(201).send(book);
    } else {
      res.status(422).send(validation)
    }
  });

  router.put("/users/:id", async (req, res) => {
    const validation = validateSchema(User.schema, req);
    if (validation === true) {
      const id = req.params.id;
      const book = await manageUsersUsecase.updateUser(id, req.body);
      res.status(200).send(book);
    } else {
      res.status(422).send(validation);
    }
  });

  router.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    await manageUsersUsecase.deleteUser(id);
    res.status(200).send(`Deleted ${id}`);
  });

  router.get("/buyers", async (req, res) => {
    const buyers = await manageUsersUsecase.getBuyers();
    res.status(200).send(buyers);
  });

  router.get("/sellers", async (req, res) => {
    const sellers = await manageUsersUsecase.getSellers();
    res.status(200).send(sellers);
  });

  return router;

}

module.exports = createUsersRouter;
