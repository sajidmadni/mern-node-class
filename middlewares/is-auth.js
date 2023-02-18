const jwtFile = require("../controllers/jwt");

module.exports = (req, res, next) => {
    // Get JWT authorization headers
    const authHeader = req.headers['authorization'];
    const authToken = authHeader && authHeader.split(' ');
    // Get origional token value
    if(!authToken){
        return res.redirect("/")
    }
    const isAuthenticated = jwtFile.verifyToken(authToken[1], process.env.DB_NAME)
    if(!isAuthenticated){
        // res.status(401).json({message: "You don't have access to this route"})
        return res.status(401).redirect("/")
    } else {
        next()
    }
        
}