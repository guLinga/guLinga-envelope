const express = require('express');
const router = express.Router();
const User = require('../db/model/usersModel');
const sendMail = require('../utils/mail');
const crypto = require('../md5')
const verifyMail = require('../code')



let codes = undefined//保存验证码
let email = undefined//保存邮箱
let index = 0;//计时
//验证码过期
function CodesDelay(key) {
    this.timer = setInterval(() => {
        if(key!=undefined){
            clearInterval(this.timer)
        }else{
            index++;
            if (index == 60 * 5) {
                index = 0
                codes = undefined;
                clearInterval(timer);
            }
        }
    }, 1000)
    this.cancel = function(){
        clearInterval(this.timer)
    }
}
let codesDelay = new CodesDelay(1)


/**
 * @api {post} /user/login    登录
 * @apiName 登录
 * @apiGroup User
 *
 * @apiParam {String} us    用户名
 * @apiParam {String} ps    密码
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/login', (req, res) => {
    let { us, ps, _id, heard, pe, nick } = req.query;
    console.log(req.query);
    if (us && ps) {
        if (verifyMail(us)) {
            ps = crypto(ps)
            User.find({ us: us, ps: ps })
                .then((data) => {
                    console.log('data', data);
                    if (data.length > 0) {
                        res.send({ err: 0, msg: '登录成功', data: data });
                    } else {
                        res.send({ err: -2, msg: '用户名或密码错误' });
                    }
                    console.log(data);
                })
                .catch((err) => {
                    res.send({ err: -1, msg: '内部错误' });
                });
        } else {
            res.send({ err: -4, msg: '邮箱不符合规则' });
        }
    } else {
        res.send({ err: -3, msg: '请输入账号或密码' });
    }
});


/**
 * @api {post} /user/sign    注册
 * @apiName 注册
 * @apiGroup User
 *
 * @apiParam {String} us 邮箱
 * @apiParam {String} ps 密码
 * @apiParam {String} code 验证码
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/sign', (req, res) => {
    let { us, ps, age, sex, heard, pe, nick, code } = req.query;
    if(us==email){
        if (code == codes) {
            if (us && ps) {
                //判断邮箱是否存在
                User.find({ us })
                    .then((data) => {
                        if (data.length > 0) {
                            res.send({ err: -3, msg: '邮箱已存在' });
                        } else {
                            if (verifyMail(us)) {
                                if (ps.length >= 6) {
                                    ps = crypto(ps)
                                    //注册成功
                                    User.insertMany({ us, ps, age, sex, heard, pe, nick })
                                        .then((data) => {
                                            res.send({ err: 0, msg: '注册成功' });
                                        })
                                        .catch((err) => {
                                            res.send({ err: -2, msg: '注册失败' });
                                        });
                                } else {
                                    res.send({ err: -5, msg: '密码长度应大于6位数' });
                                }
                            } else {
                                res.send({ err: -4, msg: '邮箱格式不正确' });
                            }
    
                        }
                    })
            } else {
                //判断是否输入了用户名和密码
                return res.send({ err: -1, msg: "参数错误" });
            }
        } else {
            //验证码
            return res.send({ err: -1, msg: "参数错误" });
        }
    }else{
        res.send({ err: -2, msg: '发送验证码的邮箱改变，请填写正确的邮箱' });
    }
});


/**
* @api {post} /user/getMailCode    验证码
* @apiName 验证码
* @apiGroup User
*
* @apiParam {String} mail  邮箱
*
* @apiSuccess {String} firstname Firstname of the User.
* @apiSuccess {String} lastname  Lastname of the User.
*/
router.post('/getMailCode', (req, res) => {
    if (codes != undefined && index <= 60) {
        return res.send({ err: -2, msg: `请在${60 - index}秒后重新发送验证码` });
    } else {
        let { mail } = req.query;
        email = mail
        //判断mail的值是否正确
        let code = parseInt(Math.random() * 10000);
        //发送验证码信息
        if (verifyMail(mail)) {
            sendMail.SendMail(mail, code)
                .then((data) => {
                    console.log(data);
                    codes = code;
                    codesDelay.cancel()//取消定时器绑定
                    index = 0//重新计时
                    codesDelay = new CodesDelay()//重新绑定验证码失效事件
                    codesDelay.timer//运行
                    res.send({ err: 0, msg: '验证码发送成功' });
                })
                .catch((err) => {
                    console.log(err);
                    res.send({ err: -1, msg: '验证码发送失败' });
                });
        } else {
            return res.send({ err: -2, msg: '邮箱格式不正确' });
        }
    }
})


/**
 * @api {post} /user/idSearch    通过用户id获取信息
 * @apiName 通过用户id获取信息
 * @apiGroup User
 *
 * @apiParam {String} _id 用户_id
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/idSearch', (req, res) => {
    let { _id, heard } = req.query;
    if (_id) {
        User.find({ _id })
            .then((data) => {
                res.send({ err: 0, msg: '查寻成功', data: data });
            })
            .catch((err) => {
                res.send({ err: -2, msg: '查寻失败' });
            });
    } else {
        res.send({ err: -1, msg: '缺少参数' });
    }
})


module.exports = router;