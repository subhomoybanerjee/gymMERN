const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const User=require('./model/userschema')
dotenv.config({path:'./config.env'})
require('./db/conn')

const app = express()
app.use(express.json())
app.use(require('./router/auth'))


const PORT=process.env.PORT


const middlewarebaji = (req,res,next) => {
    console.log('middlewarebaji') 
    next()
}


app.get('/',(req,res) => {
    res.send('hello')
    console.log('home')
})





app.listen(PORT,()=>{
    console.log('server running at '+(PORT));
})