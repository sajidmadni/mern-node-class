const jwtFile = require("../controllers/jwt");

module.exports = (req, res, next) => {
    console.log("START: In is Auth")
    // Get JWT authorization headers
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const authToken = authHeader && authHeader.split(' ');
    console.log(console.log(authToken))
    // Get origional token value
    if(!authToken){
        return res.redirect("/")
    }
    console.log(authToken[1])
    // console.log(jwtFile.verifyToken(authToken[1], 'my-secret-has-here'))
    const isAuthenticated = jwtFile.verifyToken(authToken[1], 'my-secret-has-here')
    console.log("Get it here")
    console.log(isAuthenticated)

    console.log("END: In is Auth")
    if(!isAuthenticated){
        // res.status(401).json({message: "You don't have access to this route"})
        return res.status(401).redirect("/")
    } else {
        next()
    }
        
}