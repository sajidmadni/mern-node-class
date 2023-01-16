const express = require('express')
const route = express.Router();

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

/*
* This method is to get all the products data
* GET Method URL: http://localhost:5000/api/products
*/
route.get('/', (req, res, next) => {
    res.json({products})
});

/*
* This method is to get the specific data by id
* GET Method URL: http://localhost:5000/api/products/1
*/
route.get('/:pid', (req, res, next) => { 
    let product = products.find( (p) => p.id == req.params.pid)
    if(!product){
      res.status(404).json(({message: "Product not found"}))
    }
    res.json({product})
});

/*
* This method is to store the data in to the products array
* POST method URL: http://localhost:5000/api/products
*/
route.post('/', (req, res, next) => {
  const { id, title, description, price } = req.body;
  const product = {
    id, title, description, price
  };
  products.push(product);
  res.status(201).json({product})
})

/*
* This method is to update the data of a product
* PATCH method http://localhost:5000/api/products/1
*/
route.patch("/:pid", (req, res, next) => {
  const productId = req.params.pid;
  const { title, description } = req.body;

  // Copy the products to avoid any changes before make sure the status 200 returns
  const updatedProduct = {...products.find(p => p.id == productId)}
  const productIndex = products.findIndex(p => p.id == productId);
  updatedProduct.title = title;
  updatedProduct.description = description;
  products[productIndex] = updatedProduct;
  res.status(200).json({product: updatedProduct}) 
})

/*
* This method is to delete the specific product by id
* DELETE method http://localhost:5000/api/products/1
*/
route.delete("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  products = products.filter( p => p.id != placeId);
  res.status(200).json({message: "product deleted successfully"})
})

module.exports = route;

