const mongoose=require('mongoose');
var userSchema=new mongoose.Schema({
    us:{type:String,require:true},
    ps:{type:String,require:true},
    age:{type:Number,default:0},
    sex:{type:Number,default:0},
    heard:{type:String,default:""},
    pe:{type:Number,default:0},
    nick:{type:String,default:'GuLing'},
    banned:{type:String,default:""}
});
//将schema对象转换成数据模型
var User = mongoose.model('user',userSchema);
//将User抛出
module.exports=User;