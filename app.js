const express = require('express');
const app = express();
const productsRoutes = require('./routes/products-routes')
const usersRoutes = require('./routes/users-routes')
const fs = require("fs")
const bodyParse = require('body-parser');
const path = require('path');
// include session
const session = require("express-session")

// Availble the stored images to the frond end
//uploads/images
app.use('/uploads/images', express.static(path.join('uploads', 'images')))

// Handle errors on all requests
app.use((error, req, res, next) => {
    if(req.file){
        fs.unlink(req.file.path, (error) => {
            console.log("File delete error", {error})
        })
    }
})

// Initialize session
app.use(session({
    secret: "some-scret-session-value",
    user_id: "",
    resave: false,
    saveUninitialized: true
}))

// Allow CORS request
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    next();
})

// For template engine 
app.set('view engine', 'pug')   // Set template engine i.e. in our case using pug
app.set('views', 'views')       // Set to locat the views file i.e. in our case we are gettting view from view folder

// Parse every incoming request that has the body
app.use(bodyParse.json())

// Handle the products related routes
app.use('/api/products', productsRoutes)

// Handle the users related routes
app.use('/api/users', usersRoutes)

// The base or index or home page application route
app.use('/',(req, res, next) => {
    console.log("called base url")
    res.send("Base URL executed")
})

// Listen the application
app.listen(5000)

/*
*  Following code will be executed without expressjs
*  If you want to test this below code then comment above code and uncoment below code
*/
// const http = require('http')
// const server = http.createServer((req, res, next) => {
//     if(req.method === "POST"){
//         let body = '';
//         req.on('end', () => {
//             console.log(body)
//             const fullName = body.split("=")[1];
//             res.end("You name is = "+ fullName)
//         })
//         req.on('data', (chunk) => {
//             body += chunk;
//         })
//     } else {
//         res.end(`<h1>NodeJS</h1>
//                 <form method='POST'>
//                 <input type='text' name='fullname'><br><br>
//                 <input type='submit' value='Submit Form'>
//                 </form>`)
//     }
// })

// server.listen(5000)