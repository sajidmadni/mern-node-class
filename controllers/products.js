const { check, validationResult } = require('express-validator');

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

const getAllProducts = (req, res, next) => {
    // Generate Cookie
    // res.setHeader('Set-Cookie', "isLogged=true; Max-Age=1000; HttpOnly")
    req.session.userId = 3;
    console.log(req.session.userId)
    // Render views using pug
    res.render('products', {prod: products, title: "Products Data"})
}

const getProductsById = (req, res, next) => { 
    // Get cookie value here
    // console.log(req.get("Cookie").trim().split("=")[1].trim())
    let product = products.find( (p) => p.id == req.params.pid)
    if(!product){
        res.status(404).json(({message: "Product not found"}))
    }
    res.json({product})
}

const saveProduct = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({message: error.array()})
    }

    const { id, title, description, price } = req.body;

    const product = {
      id, title, description, price
    };
    products.push(product);
    res.status(201).json({product})
  }

const updateProduct = (req, res, next) => {
    const productId = req.params.pid;
    const { title, description } = req.body;
  
    // Copy the products to avoid any changes before make sure the status 200 returns
    const updatedProduct = {...products.find(p => p.id == productId)}
    const productIndex = products.findIndex(p => p.id == productId);
    updatedProduct.title = title;
    updatedProduct.description = description;
    products[productIndex] = updatedProduct;
    res.status(200).json({product: updatedProduct}) 
  };

  const deleteProduct = (req, res, next) => {
    const placeId = req.params.pid;
    products = products.filter( p => p.id != placeId);
    res.status(200).json({message: "product deleted successfully"})
  }

exports.getAllProducts = getAllProducts;
exports.getProductsById = getProductsById;
exports.saveProduct = saveProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
