const mongoose = require("mongoose");

const url = 'mongodb+srv://admin_root:sAMrCgD7uu2ClLUS@cluster0.8shvuj6.mongodb.net/mern_test?retryWrites=true&w=majority';
// Create DB connection
const connectMongoose = mongoose.connect(
  url
).then(() => {
  console.log("DB connected successfully")
}).catch(() => {
  console.log("Something went wrong while connecting DB.")
});

exports.default = connectMongoose;