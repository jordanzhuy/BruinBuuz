//call this file server.js instead of index.js, but this is the main file any way
const express = require('express') //import express
const app = express()//initialize express in app variable
const mongoose = require('mongoose')//import mongoose to connect to database
const dotenv = require('dotenv')//import dotenv to pass in url safely
//mongodb+srv://Aloe:<password>@cluster0.pttxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const routesUrls = require('./routes/routes')// import routes.js
const cors = require('cors')//import cors


//activate dotenv
dotenv.config()
//use dotenv instead of directly type in url above
mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected"))

//activate body passer as middleware in application
app.use(express.json())
app.use(cors())//another middleware
//use routes.js as a middleware
app.use('/app', routesUrls)//first argument is base path, second argument will be appended
//this case www.mywebsite.com/app/signup
// eg in routers.js if exist router.get('/signin', ...)
//then the total url will be www.mywebsite.com/app/signin

app.listen(4000, () => console.log("server is up and running"))//listen on port 4000
//react app by default run on port 3000
//() is a call back function
