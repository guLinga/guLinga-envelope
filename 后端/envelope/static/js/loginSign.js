let LS = document.getElementsByClassName('LS');
let LoginSign = document.getElementsByClassName('LoginSign');
LS[0].onclick = function () {
    LS[1].style.borderBottom = '2px solid #ffffff';
    LS[0].style.borderBottom = '2px solid #23a9f2';
    LS[1].style.color = '#000000';
    LS[0].style.color = '#23a9f2';
    LoginSign[0].style.display = 'block';
    LoginSign[1].style.display = 'none';
}
LS[1].onclick = function () {
    LS[0].style.borderBottom = '2px solid #ffffff';
    LS[1].style.borderBottom = '2px solid #23a9f2';
    LS[0].style.color = '#000000';
    LS[1].style.color = '#23a9f2';
    LoginSign[1].style.display = 'block';
    LoginSign[0].style.display = 'none';
}

/*登录*/
let loginIpt = document.getElementsByClassName('loginIpt');
let loginBtn = document.getElementsByClassName('loginBtn')[0];
for (let i = 0; i < loginIpt.length; i++) {
    loginIpt[i].onfocus = function () {
        loginIpt[i].style.borderBottom = "1px solid #23a9f2"
    }
    loginIpt[i].onblur = function () {
        loginIpt[i].style.borderBottom = "1px solid #777575"
    }
}
let mailCode = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
loginBtn.onclick = function () {
    if (loginIpt[0].value == '' || loginIpt[1].value == '') {
        Error('请输入账号和密码');
    } else if (!mailCode.test(loginIpt[0].value)) {
        Error('请输入正确的邮箱格式');
    } else {
        Login(loginIpt[0].value, loginIpt[1].value);
    }
}
function Login(a, b) {

}
/*error*/
function Error(i) {
    let error = document.getElementsByClassName('error')[0];
    error.innerHTML = i;
    error.style.top = '100px';
    setTimeout(function () {
        error.style.top = '-40px';
    }, 2000);
}

//获取验证码
let sendBtn = document.getElementsByClassName('sendBtn')[0];
let signIpt0 = document.getElementsByClassName('signIpt')[0];
let codes = null;
function Send() {

}
sendBtn.onclick = function () {
    SendCode();
    function SendCode() {
        if (!mailCode.test(signIpt0.value)) {
            Error('邮箱格式不正确');
        } else {
            Send();
            let i = 60;
            let timer = setInterval(function () {
                sendBtn.value = i + "s";
                if (i !== 0) {
                    sendBtn.onclick = function () {

                    }
                } else {
                    codes = null;
                    clearInterval(timer);
                    sendBtn.value = "发送验证码";
                    sendBtn.onclick = function () {
                        SendCode();
                    }
                }
                i--;
            }, 1000);
        }
    }
}
//注册
let signIpt = document.getElementsByClassName('signIpt');
let signBtn = document.getElementsByClassName('signBtn')[0];
for (let i = 0; i < signIpt.length; i++) {
    signIpt[i].onfocus = function () {
        signIpt[i].style.borderBottom = "1px solid #23a9f2"
    }
    signIpt[i].onblur = function () {
        signIpt[i].style.borderBottom = "1px solid #777575"
    }
}
signBtn.onclick = function () {
    if (!mailCode.test(signIpt[0].value)) {
        Error('请输入正确的邮箱格式');
    } else if (signIpt[1].value.length < 6) {
        Error('密码大于等于六位数');
    } else if (signIpt[2].value == '') {
        Error('请确认密码');
    } else if (signIpt[1].value != signIpt[2].value) {
        Error('两次密码不一致');
    } else if (signIpt[3].value == '') {
        Error('请输入验证码');
    } else if (signIpt[3].value != codes) {
        Error('验证码错误');
        console.log(codes);
    } else {
        Sign(signIpt[0].value, signIpt[1].value);
    }
}
function Sign(us, ps) {

}