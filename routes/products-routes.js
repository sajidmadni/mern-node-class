const express = require('express')
const route = express.Router();
const productsController = require("../controllers/products");
const { check, validationResult } = require('express-validator'); 
const { application } = require('express');

// app.use();
/*
* This method is to get all the products data
* GET Method URL: http://localhost:5000/api/products
*/
route.get('/', productsController.getAllProducts);

/*
* This method is to get the specific data by id
* GET Method URL: http://localhost:5000/api/products/1
*/
route.get('/:pid', productsController.getProductsById);

/*
* This method is to store the data in to the products array
* POST method URL: http://localhost:5000/api/products
*/
route.post('/', [
  check("title")
    .not()
    .isEmpty()
    .withMessage("Please enter title"),
  check('description')
    .not()
    .isEmpty()
    .withMessage("Please enter description")
    .isLength({min: 5})
    .withMessage("Description must be at least 5 characters long"),


], productsController.saveProduct)

/*
* This method is to update the data of a product
* PATCH method http://localhost:5000/api/products/1
*/
route.patch("/:pid", productsController.updateProduct)

/*
* This method is to delete the specific product by id
* DELETE method http://localhost:5000/api/products/1
*/
route.delete("/:pid", productsController.deleteProduct)

module.exports = route;

