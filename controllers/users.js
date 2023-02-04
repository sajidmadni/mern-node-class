const express = require("express");
const { check, validationResult } = require('express-validator');
const jwtFile = require("./jwt")
const User = require("../models/users");
const connectMongoose = require("../middlewares/mongoose_connect") 

connectMongoose.connectMongoose;
const app = express();

// Temporary users data that later will be replaced with DB(Mongo)
const users = [];


const register = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({message: error.array()})
    }
    const { firstName, lastName, email, password } = req.body;
    const userData = {
      firstName, 
      lastName, 
      email, 
      password,
      products: []
    };
    // users.push(user);
    const createdUser = new User(userData);
    const user = await createdUser.save();
    res.status(201).json({user})
}

const login = async (req, res, next) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
      return res.status(400).json({message: error.array()})
  }
  const { email, password } = req.body;
  // let user = users.find( (p) => p.email == email && p.password == password)
  const user = await User.findOne({email: email, password: password}).exec();
  if(!user){
      res.status(404).json(({message: "User not found"}))
  }
  // console.log("Get user obj");
  // console.log(user)  
  res.status(201).json({user, token: jwtFile.getLoggedInToken(user.id)})
}

const getAllUsers = async (req, res, next) => {
  const users = await User.find().exec();
  res.json({users})
}

exports.register = register;
exports.login = login;
exports.getAllUsers = getAllUsers;
