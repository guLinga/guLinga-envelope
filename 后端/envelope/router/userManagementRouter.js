const express=require('express');
const router=express.Router();
const userModel=require('../db/model/usersModel');
/**
 * @api {get} /userManagement/KWSearch    用户关键字查询
 * @apiName 关键字查询
 * @apiGroup userManagement
 *
 * @apiParam {String} kw 关键字
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/KWSearch',(req,res)=>{
    let {kw}=req.query;
    let reg=new RegExp(kw);
    userModel.find({$or:[{us:{$regex:reg}},{ps:{$regex:reg}},{nick:{$regex:reg}},{pe:{$regex:reg}},{age:{$regex:reg}},{sex:{$regex:reg}},{_id:{$regex:reg}}]})
    .then((data)=>{
        if(data.length>0){
            res.send({err:0,msg:'查询成功',data:data});
        }else{
            res.send({err:-2,msg:'没有查询到该关键字'});
        }
    })
    .catch((err)=>{
        res.send({err:-1,msg:'查询失败'});
    });
});


/**
 * @api {get} /userManagement/delete    用户删除
 * @apiName 用户删除
 * @apiGroup userManagement
 *
 * @apiParam {String} us 账号
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
    router.get('/delete',(req,res)=>{
        let {us}=req.query;
        userModel.find({us})
        .then((data)=>{
            console.log(data);
            if(data.length==0){
                res.send({err:-2,msg:'没有该用户'});
            }else{
                userModel.remove({us})
                .then((data)=>{
                    res.send({err:0,msg:'删除成功'});
                })
                .catch((err)=>{
                    res.send({err:-1,msg:'删除失败'});
                });
            }
        })
    })

/**
 * @api {get} /userManagement/update    用户修改
 * @apiName 用户修改
 * @apiGroup userManagement
 *
 * @apiParam {String} _id   id(必填)
 * @apiParam {Number} ps    密码
 * @apiParam {String} age   年龄
 * @apiParam {Number} sex   性别（0：男，1：女）
 * @apiParam {String} nick  昵称
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
 router.get('/update',(req,res)=>{
    let {ps,age,sex,nick,_id}=req.query;
    userModel.find({_id})
        .then((data)=>{
            console.log(data);
            if(data.length==0){
                res.send({err:-2,msg:'没有该用户'});
            }else{
                userModel.updateOne({_id},{ps,age,sex,nick})
                .then((data)=>{
                    res.send({err:0,msg:'修改成功',data:data});
                })
                .catch((err)=>{
                    res.send({err:-1,msg:'修改失败'});
                });
                    
            }
        })
});

/**
 * @api {get} /userManagement/searchPages    用户分页
 * @apiName 用户分页
 * @apiGroup userManagement
 *
 * @apiParam {Number} pageSize  每页条数（默认每页两条） 
 * @apiParam {Number} page      第几页（默认第一页）
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/searchPages',(req,res)=>{
    let pageSize=req.query.pageSize||2;
    let page=req.query.page||1;
    let len=null;
    let reg=new RegExp("@");
    userModel.find({$or:[{us:{$regex:reg}}]})
    .then((data)=>{
        if(data.length>0){
            len=data.length;
            userModel.find().limit(Number(pageSize)).skip(((page-1)*pageSize))
            .then((data)=>{
                res.send({err:0,msg:'查询成功',data:data,length:len});
            })
            .catch((err)=>{
                res.send({err:-1,msg:'查询失败'});
            });
        }
    })
})

/**
 * @api {get} /userManagement/updateHeard    修改头像
 * @apiName 修改头像
 * @apiGroup userManagement
 *
 * @apiParam {String} _id   用户_id(必填)
 * @apiParam {String} heard 上传头像的地址
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
    router.get('/updateHeard',(req,res)=>{
        let {heard,_id}=req.query;
        userModel.find({_id})
            .then((data)=>{
                console.log(data);
                if(data.length==0){
                    res.send({err:-2,msg:'没有该用户'});
                }else{
                    userModel.updateOne({_id},{heard})
                    .then((data)=>{
                        res.send({err:0,msg:'修改成功',data:data});
                    })
                    .catch((err)=>{
                        res.send({err:-1,msg:'修改失败'});
                    });
                        
                }
            })
    });

module.exports=router;