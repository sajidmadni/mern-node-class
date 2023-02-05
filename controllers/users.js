const express = require("express");
const { check, validationResult } = require('express-validator');
const jwtFile = require("./jwt")
const app = express();
const connectMongoose = require("../middlewares/mongoose_connect")
const User = require("../models/users");
connectMongoose.connectMongoose;

// Temporary users data that later will be replaced with DB(Mongo)
const users = [];


const register = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({message: error.array()})
    }
    const { firstName, lastName, email, password } = req.body;
    const userData = {
      id: Math.floor(Math.random() * 100), 
      firstName, 
      lastName, 
      email, 
      password,
    };
    // users.push(user);
    try {
      const createdUser = new User(userData)
      const user = await createdUser.save();
      return res.status(201).json({user})
    } catch (error) {
      return res.json({message: "Something went wrong"})
    }
    
}

const login = async (req, res, next) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
      return res.status(400).json({message: error.array()})
  }
  const { email, password } = req.body;

  const userData = { 
    firstName: "New User", 
    lastName: "Last user name", 
    email: "test@test.com", 
    password: "password",
    profileImg: req.file.path
  };
  const createdUser = new User(userData)
  await createdUser.save();

  // let user = users.find( (p) => p.email == email && p.password == password)
  const user = await User.findOne({email: email, password: password}).exec();
  if(!user){
      res.json({user: [], message: "User not found"})
  }
  // console.log("Get user obj");
  // console.log(user)  
  res.status(201).json({user, token: jwtFile.getLoggedInToken(user.id)})
}

const getAllUsers = (req, res, next) => {
  res.json({users})
}

exports.register = register;
exports.login = login;
exports.getAllUsers = getAllUsers;
