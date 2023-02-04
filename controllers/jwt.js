const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();

getLoggedInToken = (userId) => {
    return jwt.sign(
        {user_id: userId}, 
        'my-secret-has-here',
        {expiresIn: "15000s"}
    )
}

verifyToken = (token, secretVal) => {
    return jwt.verify(token, secretVal, function(err, decoded) {
        console.log("Return user decode value")
        console.log(decoded) // bar
        app.set('user_id', decoded.user_id)
        console.log(app.get("user_id"))
        return decoded;
    })
}

exports.getLoggedInToken = getLoggedInToken;
exports.verifyToken = verifyToken;