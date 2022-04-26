const mongoose = require('mongoose')
const uri = 'mongodb://localhost/test'
const options = {
    socketTimeoutMS: 0,
    keepAlive: true,
}
mongoose.connect(uri, options)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
    console.log('数据库连接成功');
})