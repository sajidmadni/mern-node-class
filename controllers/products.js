const { check, validationResult } = require('express-validator');
// const mongoose = require("mongoose");
const connectMongoose = require("../middlewares/mongoose_connect")
const Product = require("../models/products");
connectMongoose.connectMongoose;
const express = require("express");
const app = express();

// Temporary products data that later will be replaced with DB(Mongo)
const products = [ ];

const getAllProducts = async (req, res, next) => {
    console.log("Get session data")
    console.log(req.session.user_id)
    const products = await Product.find().exec();
    res.json({products});
}

const getProductsById = async (req, res, next) => { 
    const prodId = req.params.pid;

    let product = await Product.findById(prodId).exec();
    if(!product){
        res.status(404).json(({message: "Product not found"}))
    }
    res.json({product})
}

const saveProduct = async (req, res, next) => {
  const error = validationResult(req);
  // Error handling
  if(!error.isEmpty()){
      return res.status(400).json({message: error.array()})
  }

  const { title, description, price } = req.body;
  console.log("Save product");
  console.log(app.get("user_id"))
  const productData = {
    title, 
    description, 
    price,
    user_id: ""
  };
  const createdProduct = new Product(productData);

  const result = await createdProduct.save();
  res.status(201).json({result})
}

const updateProduct = async (req, res, next) => {
    const productId = req.params.pid;
    const { title, description } = req.body;
  
    // Copy the products to avoid any changes before make sure the status 200 returns
    // const updatedProduct = {...products.find(p => p.id == productId)}
    // const productIndex = products.findIndex(p => p.id == productId);
    // updatedProduct.title = title;
    // updatedProduct.description = description;
    // products[productIndex] = updatedProduct;
    let product;
    try {
      product = await Product.findById(productId).exec();
    } catch (error) {
      
    }

    product.title = title;
    product.description = description;

    try {
      await product.save();
    } catch (error) {
      
    }

    res.status(200).json({product}) 
  };

  const deleteProduct = async (req, res, next) => {
    const productId = req.params.pid;
    // products = products.filter( p => p.id != placeId);
    let product;
    try {
      product = await Product.findById(productId).exec();
    } catch (error) {
      
    }
    product.remove();
    res.status(200).json({message: "product deleted successfully"})
  }

exports.getAllProducts = getAllProducts;
exports.getProductsById = getProductsById;
exports.saveProduct = saveProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
