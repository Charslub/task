<template>
  <div class="home">
    <Header @login="login"></Header>
    <Login :is-show="isShow" @closelogin="close" @LoginSuccess="LoginSuccess"></Login>
    <ModelItemList :banners="ModelList"></ModelItemList>
    <CreateModel @Create="createModel"></CreateModel>
<!--    一页11个数据-->
    <div style="text-align: center;margin-top: 20px">
      <el-button-group>
        <el-button :disabled="currentpage===1" type="primary" icon="el-icon-arrow-left" @click="changePage(-1)">上一页</el-button>
        <el-button type="primary" @click="changePage(1)">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
    </div>
  </div>
</template>
<script>
  import CreateModel from "./childcomponent/CreateModel";
  import Header from "./childcomponent/Header";
  import Login from "../../components/Login";
  import ModelItemList from "./childcomponent/ModelItemList";
  import {request} from "../../network";

  export default {
    name: "Home",
    data() {
      return {
        isShow: false,
        //  请求过来的模块数据
        ModelList: [],
        currentpage:1,
        pagesize:11,
      }
    },
    components: {
      Header,
      Login,
      ModelItemList,
      CreateModel
    },
    methods: {
      login() {
        this.isShow = !this.isShow
      },
      close() {
        this.isShow = false
      },
      createModel(config) {
        request({
          url: `/model/create?modlName=${config}`,
          method: 'post'
        }).then(res => {
          //创建模块成功后 再次获取数据
          console.log(res);
          if (res.status === 'success') {
            this.getAllModel()
            this.$toast.Message({
              type: 'success',// type:success error worn 可以不填
              message: '创建成功!'
            })
          }

        })
        //  将这个模块名 给接口发过去 数据库更新数据  再请求数据过来 将现在的数组 等于新数组
      },
      getAllModel() {
        // this.currentpage=1
        request({
          url: `/model/select?currentpage=${this.currentpage}&pagesize=${this.pagesize}`,
          method: 'get'
        }).then(res => {
          this.ModelList = res.data.modlList

        })
      },
      LoginSuccess() {
        this.getAllModel()
      },
      changePage(count){
        this.currentpage=this.currentpage+count
        if(this.currentpage===0){
          this.currentpage=1
        }
        this.getAllModel()
      }
    },
    mounted() {
      if(localStorage.getItem('token')){
        this.getAllModel()
      }

      //监听删除
      this.$bus.$on('ChangeList',(model)=>{
        let index=this.ModelList.findIndex(item=>{
          return item.id===model.id
        })
        console.log(index);
        this.ModelList.splice(index,1)
      })
    }
  }
</script>

<style scoped>
  .home {
    height: 100vh;
  }
</style>