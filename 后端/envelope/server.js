const express = require('express')
const db = require('./db/connect')
const path = require('path')

const app = express()

app.use('/public',express.static(path.join(__dirname,'./static')))

const userManagementRouter = require('./router/userManagementRouter')
app.use(userManagementRouter)

app.listen(3000,()=>{
    console.log('3000端口已开启')
});