<template>
  <div class="verificationC">
    <input
      v-model="code"
      type="text"
      class="verification code signIpt"
      placeholder="请输入验证码"
    />
    <input @click="sendCode" type="button" class="sendBtn code" value="发送验证码" />
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Code',
    props:['email','changeMsg'],
    data(){
        return {
            code:''
        }
    },
    watch:{
        code(){
            this.handleChangeMsg(this.code)
        }
    },
    methods:{
        //将验证码传值给父组件
        handleChangeMsg(values){
            this.changeMsg(values)
        },
        //发送验证码
        sendCode(){
            axios({
                url:'/users/getMailCode',
                method:'post',
                params:{
                    mail:this.email
                }
            }).then(values=>{
                console.log(values);
            },error=>{
                console.log(error);
            })
        }
    }
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
