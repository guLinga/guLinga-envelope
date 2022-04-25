<template>
  <div id="Login">
    <div class="Login LoginSign">
      <input type="email" class="loginIpt" placeholder="请输入邮箱" />
      <input type="password" class="loginIpt" placeholder="请输入密码" />
      <a class="forget" href="">忘记密码？</a>
      <input type="button" class="loginBtn" value="登录" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style lang="scss" scoped>
.Login {
  width: 100%;
  height: 350px;
  position: absolute;
  padding: 0 20px;
  top: 60px;
  left: 0;
  .loginIpt {
    width: 100%;
    height: 50px;
    border: 0;
    border-bottom: 1px solid #777575;
    margin-top: 20px;
    outline: none;
    padding: 0 20px;
  }
  .forget {
    display: block;
    margin-top: 10px;
    text-align: right;
    text-decoration: none;
    color: #23a9f2;
  }
  .loginBtn {
    cursor: pointer;
    width: 50%;
    height: 40px;
    text-align: center;
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    border: 0;
    background-color: #23a9f2;
    color: #ffffff;
  }
  .loginBtn:active {
    background-color: #d4d1d1;
    color: #000000;
  }
}
</style>
