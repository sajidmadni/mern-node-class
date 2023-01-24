const jwt = require('jsonwebtoken');

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
        // console.log(decoded.user_id) // bar
        return decoded;
    })
}

exports.getLoggedInToken = getLoggedInToken;
exports.verifyToken = verifyToken;