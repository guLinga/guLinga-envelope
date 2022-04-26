<template>
  <div class="verificationC">
    <input
      v-model="code"
      type="text"
      class="verification code signIpt"
      placeholder="请输入验证码"
    />
    <input
      @click="sendCode"
      type="button"
      class="sendBtn code"
      v-model="codeNum"
    />
  </div>
</template>

<script>
import axios from "axios";
import verifyMail from '../../static/code'
export default {
  name: "Code",
  props: ["email", "changeMsg"],
  data() {
    return {
      code: "",
      delayCode: true,
      codeNum: "发送验证码",
    };
  },
  watch: {
    code() {
      this.handleChangeMsg(this.code);
    },
  },
  methods: {
    //将验证码传值给父组件
    handleChangeMsg(values) {
      this.changeMsg(values);
    },
    //判断是否点击验证码
    delayCodes() {
      //设置60秒后才能重新发送验证码
      let index = 0;
      let timer = setInterval(() => {
        this.codeNum = 60-index++ + "s";
        if (index == 60) {
          this.codeNum = "发送验证码";
          this.delayCode = true;
          clearInterval(timer);
        }
      }, 1000);
    },
    //发送验证码
    sendCode() {
      if(verifyMail(this.email)){
        if (this.delayCode) {
          axios({
            url: "/users/getMailCode",
            method: "post",
            params: {
              mail: this.email,
            },
          }).then(
            (values) => {
              console.log("color:red",values);
              if (values.data.err == 0) {
                //禁止发送验证码
                this.delayCode = false
                //判断是否发送验证码
                this.delayCodes();
              } else {
                console.log(values.data.msg);
              }
            },
            (error) => {
              console.log(error);
            }
          );
        }
      }else{
        console.log('邮箱格式不正确');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.verificationC {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  outline: none;
  display: flex;
  .sendBtn {
    cursor: pointer;
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
</style>
