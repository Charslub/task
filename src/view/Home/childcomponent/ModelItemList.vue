<template>
  <div class="model-list">
    <div class="item-list" v-for="(item,index) in banners" :key="index" @click="GotoDoc(index)" >
      <ModleItem class="item" :Model="item"></ModleItem>
    </div>
    <div class="newModle" @click="createModle" >
      <ModleItem class="item" :show="false" :Model="{id:-1,modlName:'新建模块 +'}" ref="newModel" ></ModleItem>
    </div>


    <div class="confirm-box" v-show="showConfirm">
      <h5>此操作将会永久删除此模块，确定要删除吗?</h5>
      <div>
        <el-button type="primary" @click="ComfirmDelete">确定</el-button>
        <el-button type="danger" @click="showConfirm=false">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ModleItem from "./ModleItem";
  import {request} from "../../../network";

  export default {
    name: "ModelItemList",
    components: {ModleItem},
    data(){
      return {
        showConfirm:false,
        deleteModel:null
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    mounted() {

      this.$bus.$on('showConfirmBox',(Model)=>{
        this.showConfirm=true
        this.DeleteModel=Model
      })
    },
    methods:{
      createModle(){
        if(this.$store.getters.getUsername){
        //  这里采用事件总线
          this.$bus.$emit('show')
        }else{
          this.$toast.Message({
            type:'worn',// type:success error worn 可以不填
            message: '您还没有登录,请先登录!'
          })
        }
      },
      GotoDoc(index){
        if(this.$store.getters.getUsername){
          this.$router.push({
            path:'/docs',
            query:{
              id:this.banners[index].id
            }
          })
        }else{
          this.$toast.Message({
            type:'worn',// type:success error worn 可以不填
            message: '警告 : 请先登录！'
          })
        }
      },
      //确认删除 发送事件
      ComfirmDelete(){
        //确认删除
      //  根据deleteModel来删除
        request({
          url:`/model/delete?modlId=${this.DeleteModel.id}`,
          method:'delete'
        }).then(res=>{
          if(res.status==='success'){//删除成功
            this.$toast.Message({
              type: 'success',// type:success error worn 可以不填
              message: '删除成功!'
            })
            //删除成功后发送事件给Home 从List中删除这个Model
            this.$bus.$emit('ChangeList',this.DeleteModel)
          }else{
            this.$toast.Message({
              type: 'error',// type:success error worn 可以不填
              message: res.message
            })
          }
          this.showConfirm=false
        })
      }
    },

  }
</script>

<style scoped>
  .model-list {
    width: 60%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }
  .confirm-box{
    z-index: 9999;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(228, 228, 228);
    box-shadow: 0 0 2px #ccc;
  }


  @media not screen and (min-width: 35em) {
    .model-list {
      display: block;
      width: 100%;
    }
    .confirm-box{
      width: 95%;

    }
  }

</style>