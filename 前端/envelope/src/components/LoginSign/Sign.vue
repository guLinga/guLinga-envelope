<template>
  <div class="Sign LoginSign">
    <input type="email" class="signIpt" placeholder="请输入邮箱" />
    <input
      type="password"
      class="signIpt"
      placeholder="请输入密码(大于六位数字)"
    />
    <input
      type="password"
      class="signIpt"
      placeholder="请确认密码(大于六位数字)"
    />
    <div class="verificationC">
      <input
        type="text"
        class="verification code signIpt"
        placeholder="请输入验证码"
      />
      <input type="button" class="sendBtn code" value="发送验证码" />
    </div>
    <input type="button" class="signBtn" value="注册" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.LoginSign {
  width: 100%;
  height: 350px;
  position: absolute;
  padding: 0 20px;
  top: 60px;
  left: 0;
  .signIpt {
    width: 100%;
    height: 50px;
    border: 0;
    border-bottom: 1px solid #777575;
    margin-top: 20px;
    outline: none;
    padding: 0 20px;
  }
  .verificationC {
    width: 100%;
    height: 50px;
    margin-top: 20px;
    outline: none;
    display: flex;
    .sendBtn {
      border: 0;
      outline: none;
      height: 40px !important;
      margin-top: 10px;
      padding: 0 20px;
      background-color: #23a9f2;
      color: #ffffff;
    }
    .code {
      width: 50%;
      height: 100%;
      flex: 1;
    }
    .verification {
      border: 0;
      border-bottom: 1px solid #777575;
      margin-top: 0 !important;
      outline: none;
      padding: 0 20px;
    }
  }
  .sendBtn:active {
    background-color: #d4d1d1;
    color: #000000;
  }
  .signBtn {
    width: 50%;
    height: 40px;
    background-color: #23a9f2;
    outline: none;
    border: 0;
    margin-top: 10px !important;
    color: #ffffff;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  .signBtn:active {
    background-color: #d4d1d1;
    color: #000000;
  }
}
</style>
