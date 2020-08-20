<template>
  <div v-show="isShow" class="login-panel">
    <span class="goRegister" @click="Goregister" v-if="IsLogin">没有账号?注册......</span>
    <i class="el-icon-back" @click="IsLogin=true" v-show="!IsLogin"></i>
    <i class="el-icon-error" @click="closeLogin"></i>
    <h3 v-if="IsLogin">Login</h3>
    <h3 v-else>Register</h3>
    <div id="login-input-username">
      <span>用户名:</span>
      <el-input v-model="username"
                prefix-icon="el-icon-user"
                placeholder="请输入内容"
                class="login-input"></el-input>
    </div>

    <div id="login-input-password">
      <span >密&nbsp;&nbsp;  &nbsp;   码:</span>
      <el-input placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                v-model="password"
                show-password
                class="login-input"></el-input>
    </div>

    <div id="login-input-check">
      <span>验证码:</span>
      <Check @login="check"
             ref="check"
             class="login-input"></Check>
    </div>

    <div id="login-input-submit">
      <el-button v-if="IsLogin" type="primary"
                 @click="login"
                 class="login-input">登录
      </el-button>
      <el-button v-else type="primary"
                 @click="register"
                 class="login-input">注册
      </el-button>
    </div>

  </div>
</template>

<script>
  import Check from "../view/Home/childcomponent/Check";
  import {request} from "../network";

  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: '',
        flag: false,
        IsLogin: true
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Check
    },
    methods: {
      check(index) {
        if (index === 1) {
          this.flag = true
        } else {

          this.flag = false
        }
      },
      login() {
        /*-------注册和登录都有这个判断 可以抽离成一个方法--------*/
        let rep = /^[a-zA-Z0-9_-]{3,16}$/;
        this.$refs.check.check()
        if (!this.flag) {
          this.$toast.Message({
            type: 'error',// type:success error worn 可以不填
            message: '提示 : "验证码错误，请重新输入!"'
          })
        } else {//开始匹配输入的 username和passowrd
          if (!rep.test(this.username)) {
            this.$toast.Message({
              type: 'worn',// type:success error worn 可以不填
              message: '警告 : "用户名格式错误!由3到16位数组字母下划线组成"'
            })
          } else {//如果用户名格式没有错 就调用接口 传入username  password
            let username = this.username
            let password = this.password
            request({
              method: 'post',
              url: `/login/login?username=${username}&password=${password}`,
            }).then(res => {
              console.log(res);
              if(res.status==='success'){ //登录成功 将token保存起来
                /*------token-----*/

                localStorage.setItem('token',res.data.token)

                this.$toast.Message({
                  type: 'success',// type:success error worn 可以不填
                  message: '登录成功!'
                })
                localStorage.setItem('username',this.username)
                //发射一个事件  让Home组件请求加载所有模块
                this.$emit('LoginSuccess')
                //  登录成功后 关闭登录弹窗 显示用户名
                this.closeLogin()
                //  将username 存vuex
                this.$store.dispatch('changeUsername', this.username)
                this.username = ""
                this.password = ""
                //验证码重置
                this.$refs.check.chengeCode()
              }else{
                this.$toast.Message({
                  type: 'error',// type:success error worn 可以不填
                  message: res.message
                })
              }
            })



          }
        }
      },
      register() {
        let rep = /^[a-zA-Z0-9_-]{3,16}$/;
        this.$refs.check.check()
        if (!this.flag) {
          this.$toast.Message({
            type: 'error',// type:success error worn 可以不填
            message: '提示 : "验证码错误，请重新输入!"'
          })
        } else {//开始匹配输入的 username和passowrd
          if (!rep.test(this.username)) {
            this.$toast.Message({
              type: 'worn',// type:success error worn 可以不填
              message: '警告 : "用户名格式错误!由3到16位数组字母下划线组成"'
            })
          } else {//如果用户名格式没有错 就调用接口 传入username  password
            //发送请求将注册的信息存入数据库
            let username = this.username
            let password = this.password
            request({
              method: 'post',
              url: `/login/insert?username=${username}&password=${password}`
            }).then(res => {
              console.log(res);
              if (res.status === 'success') {//注册成功
                this.$toast.Message({
                  type: 'success',// type:success error worn 可以不填
                  message: '注册成功！!'
                })
                //  登录成功后 关闭登录弹窗 显示用户名
                this.closeLogin()
                this.username = ""
                this.password = ""
                //验证码重置
                this.$refs.check.chengeCode()
                this.IsLogin = true

              } else {//注册失败
                this.$toast.Message({
                  type: 'error',// type:success error worn 可以不填
                  message: res.message
                })
              }
            })
          }
        }
      },

      closeLogin() {
        this.$emit('closelogin')
      },
      Goregister() {//去注册
        this.IsLogin = false
      }
    }
  }
</script>

<style scoped>
  div {
    color: gray;
    text-align: center;
  }

  .login-panel {
    z-index: 999;
    min-width: 300px;
    position: fixed;
    transition: all .2s linear;
    overflow: hidden;
    width: 330px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px 10px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 0 4px rgba(100, 100, 100, .3);
  }

  .login-panel div {
    display: flex;
    text-align: left;
    width: 300px;
    padding-bottom: 10px;
    line-height: 40px;
    margin: 0 auto;
  }

  .login-input {
    flex: 3;
  }

  .login-panel div span {
    flex: 1;
  }

  #login-input-submit {
    width: 200px;
    padding: 0;
    text-align: center;
  }

  h3 {
    margin-top: 0px;
    margin-bottom: 30px;
  }

  .el-icon-error {
    position: absolute;
    top: 2%;
    right: 2%;
    cursor: pointer;
    color: #adadad;
    border-radius: 50%;
    font-size: 18px;
  }

  .el-icon-error:hover {
    color: #ff4450;
  }

  .goRegister {
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: pointer;
    color: blue;
    font-size: 14px;
  }
  .el-icon-back{
    font-weight: 600;
    cursor: pointer;
    font-size: 18px;
    position: absolute;
    left: 2%;
    top:2%;
  }
  .el-icon-back:hover{
    color: #f33263;
  }

  @media not screen and (min-width: 35em) {
    .login-panel {
      width: 90%;
      padding-bottom: 40px;
    }

    .login-panel div {
      width: 90%;
    }
  }

</style>