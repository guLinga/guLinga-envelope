<template>
  <div class="Sign LoginSign">
    <input
      v-model="email"
      type="email"
      class="signIpt"
      placeholder="请输入邮箱"
    />
    <input
      v-model="password"
      type="password"
      class="signIpt"
      placeholder="请输入密码(大于六位数字)"
    />
    <input
      v-model="repassword"
      type="password"
      class="signIpt"
      placeholder="请确认密码(大于六位数字)"
    />
    <Code :email="email" :changeMsg="handleChangeMsg" />
    <input @click="Sign" type="button" class="signBtn" value="注册" />
  </div>
</template>

<script>
import Code from "./Code.vue";
import axios from 'axios'
export default {
  name: "Sign",
  data() {
    return {
      email: "",
      password: "",
      repassword: "",
      codes: "",
    };
  },
  methods: {
    //获取验证码
    handleChangeMsg(values) {
      this.codes = values;
    },
    //注册
    Sign() {
      let { email, password, repassword, codes } = this;
      console.log(email,codes,password,repassword);
      if (email != "" && password != "" && repassword != "" && codes != "") {
        if(password==repassword){
          axios({
            url:'/users/sign',
            method:'post',
            params:{
              code:codes,
              us:email,
              ps:password
            }
          }).then(values=>{
            console.log(values);
          },error=>{
            console.log(error);
          })
        }else{
          console.log('两次密码输入不正确');
        }
      }else{
        console.log('请填写完整信息');
      }
    },
  },
  components: {
    Code,
  },
};
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
