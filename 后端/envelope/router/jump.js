const express = require('express')
const jump = express.Router()

jump.get('/loginSign',(req,res)=>{
    res.render('../static/templates/loginSign.html')
})

module.exports = jump