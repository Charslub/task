<template>
  <div class="home-header">

    <div class="header-content">
      <!--logo-->
      <div class="logo-wrap">
        <img src="../img/logo.png" alt="">
        <span class="name">EasyDocs</span>
      </div>
      <!--      login-->
      <div class="login-wrap">
        <!--        根据vuex或者localstorage判断显示内容-->
        <span @click="login" class="login" v-if="!$store.getters.getUsername">登录</span>

        <span class="login" v-else>
          <el-dropdown :hide-on-click="false" @command="logoOut">
            <span class="el-dropdown-link">
              {{$store.getters.getUsername}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    methods: {
      login() {
        this.$emit('login')
      },
      logoOut(e){
        this.$store.dispatch('changeUsername',null)
      }
    }
  }
</script>

<style scoped>
  .home-header {
    transition: all .3s linear;
    height: 120px;
  }

  .header-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  .logo-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .login-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-wrap img {
    height: 30px;
  }

  .logo-wrap .name {
    cursor: pointer;
    font-size: 25px;
    font-weight: 600;
    color: #545454;
    margin-left: 4px;
  }

  .login-wrap .login {
    cursor: pointer;
    color: rgba(0, 0, 255, 0.76);
  }
  .login /deep/ .el-dropdown-link{
    color: rgb(32,160,255);
  }

  .login-wrap .login:hover {
    color: #383838;
  }

  @media not screen and (min-width: 35em) {
    .header-content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
    }
    .logo-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }

    .login-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }


    .login {
      width: 100%;
      text-align: right;
    }
  }
</style>