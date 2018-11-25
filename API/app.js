const express = require('express'),
  createError = require('http-errors'),
  logger = require('morgan'),
  favicon = require('serve-favicon'),
  session = require('express-session'),
  routes = require('./routes/index'),
  cookieParser = require('cookie-parser'),
  app = express()

app
  .set('port',(process.env.PORT || 3000))
  .set('views',`${__dirname}/views`)
  .use(favicon(`${__dirname}/public/images/ecomotor.png`))  
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({extended:false}))
  .use(cookieParser())
  .use(session({
    secret:'ecomotor',
    saveUninitialized:true,
    resave:true
  }))
  .use(express.static(`${__dirname}/public`))
  .use(routes)
  .use((req,res,next)=>next(createError(404)))
  .use((err,req,res,next)=>{
    res.status(err.status ||  500)
    res.send({erro:err.message,status:err.status})    
  })


module.exports = app;