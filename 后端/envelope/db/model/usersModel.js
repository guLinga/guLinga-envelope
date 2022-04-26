const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    us: { type: String, require: true },//账号、邮箱
    ps: { type: String, require: true },//密码
    age: { type: Number, default: 0 },//年龄
    sex: { type: Number, default: 0 },//性别
    heard: { type: String, default: "" },//头像
    pe: { type: Number, default: 0 },//
    nick: { type: String, default: 'GuLing' },//昵称
    banned: { type: String, default: "" },//封禁
});
//将schema对象转换成数据模型
var User = mongoose.model('user', userSchema);
//将User抛出
module.exports = User;