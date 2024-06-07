const express = require("express");
const routes = express.Router();

const restauranteController = require('./app/controller/restauranteController');
//GET ALL
routes.get("/restaurante", restauranteController.getAll)
// GET BY ID
routes.get("/restaurante/:id", restauranteController.getId)
// POST
routes.post("/restaurante", restauranteController.post)
// PUT BY ID
routes.put("/restaurante/:id", restauranteController.put)
//PATCH BY ID
routes.patch("/restaurante/:id", restauranteController.patch)
//DELETE BY ID
routes.delete("/restaurante/:id", restauranteController.deleteID)

module.exports = routes;