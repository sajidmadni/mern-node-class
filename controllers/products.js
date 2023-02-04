const { check, validationResult } = require('express-validator');
// const mongoose = require("mongoose");
const connectMongoose = require("../middlewares/mongoose_connect")
const Product = require("../models/products");
connectMongoose.connectMongoose;
const express = require("express");
const app = express();

// const url = 'mongodb+srv://admin_root:sAMrCgD7uu2ClLUS@cluster0.8shvuj6.mongodb.net/mern_test?retryWrites=true&w=majority';
// Create DB connection
// mongoose.connect(
//   url
// ).then(() => {
//   console.log("DB connected successfully")
// }).catch(() => {
//   console.log("Something went wrong while connecting DB.")
// });

// Temporary products data that later will be replaced with DB(Mongo)
const products = [
    {
      "id": 1,
      "title": "iPhone 10",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
      ]
    },
    {
      "id": 2,
      "title": "Samsung A52",
      "description": "A samsung mobile",
      "price": 200,
      "discountPercentage": 12.96,
      "rating": 3.69,
      "stock": 150,
      "brand": "Samsung",
      "category": "smartphones",
      "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
      ]
    }
  ];

const getAllProducts = async (req, res, next) => {
    const products = await Product.find().exec();
    res.json({products});
}

const getProductsById = async (req, res, next) => { 
    const prodId = req.params.pid;

    let product = await Product.find({price: 400}).exec();
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
    user_id: "63de0806cdf12d276efe911b"
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
