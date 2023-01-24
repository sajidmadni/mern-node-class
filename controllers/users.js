const express = require("express");
const { check, validationResult } = require('express-validator');
const jwtFile = require("./jwt")
const app = express();

// Temporary users data that later will be replaced with DB(Mongo)
const users = [];


const register = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({message: error.array()})
    }
    const { firstName, lastName, email, password } = req.body;
    const user = {
      id: Math.floor(Math.random() * 100), 
      firstName, 
      lastName, 
      email, 
      password
    };
    users.push(user);
    res.status(201).json({user})
}

const login = (req, res, next) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
      return res.status(400).json({message: error.array()})
  }
  const { email, password } = req.body;
  let user = users.find( (p) => p.email == email && p.password == password)
  if(!user){
      res.status(404).json(({message: "User not found"}))
  }
  console.log("Get user obj");
  console.log(user)
  app.set('id', user.id)  
  res.status(201).json({user, token: jwtFile.getLoggedInToken(3)})
}

const getAllUsers = (req, res, next) => {
  res.json({users})
}

exports.register = register;
exports.login = login;
exports.getAllUsers = getAllUsers;
