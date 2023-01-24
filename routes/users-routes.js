const express = require('express')
const route = express.Router();
const usersController = require("../controllers/users");
const { check, validationResult } = require('express-validator'); 
const isAuth = require("../middlewares/is-auth")

/*
* This method is to register user
* POST Method URL: http://localhost:5000/api/users/register
*/
route.post('/register', usersController.register);

/*
* This method is to login user
* POST Method URL: http://localhost:5000/api/users/login
*/
route.post('/login', usersController.login);

/*
* This method is to get all users
* GET Method URL: http://localhost:5000/api/users
*/
route.get('/', isAuth, usersController.getAllUsers);


module.exports = route;

