const nodeMailer=require('nodemailer');
let transporter=nodeMailer.createTransport({
    host:"smtp.qq.com",
        port:465,
        secure:true,
        auth:{
            user:"2634917964@qq.com",
            pass:"tqaspwkcieapecfb"
        }
});

function SendMail(mail,code){
    //邮件信息
    let Mail={
        from:'"1514"<2634917964@qq.com>',
        to:mail,
        subject:'GULING',
        html:`你的验证码是${code},5分钟有效`
    }
    return new Promise((resolve,reject)=>{
        transporter.sendMail(Mail,(err,data)=>{
            if(err){
                reject();
            }else{
                resolve();
            }
        });
    })
}

module.exports={SendMail}