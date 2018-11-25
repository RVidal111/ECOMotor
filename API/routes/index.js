const express = require('express'),
  router = express.Router()

router
  .get('/',(req,res,next)=>{
    res.sendFile(`${express.get('public')}/index.html`)
  })

module.exports = router