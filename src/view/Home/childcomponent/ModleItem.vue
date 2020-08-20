<template>
  <div class="model-item">
    <!-- 标题-->
    <div class="title">{{Model.modlName}}</div>
    <i class="el-icon-delete" @click.stop="DeleteModel" v-if="show"></i>
  </div>
</template>

<script>
  import  {request} from "../../../network";

  export default {
    name: "ModleItem",
    props: {
      Model: {
        type: Object,
        default: {}
      },
      show:{
        type:Boolean,
        default: true
      }
    },
    mounted() {

    },
    methods: {
      DeleteModel(){
      //
        if(!this.$store.getters.getUsername){
          this.$toast.Message({
            type: 'error',// type:success error worn 可以不填
            message: '提示 : 请先登录!'
          })
        }else{
          //开启弹窗
          this.$bus.$emit('showConfirmBox',this.Model)
        }
      }
    }

  }
</script>

<style scoped>
  .model-item {
    cursor: pointer;
    padding: 0 10px;
    width: 180px;
    margin-left: 20px;
    margin-right: 0px;
    margin-top: 10px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 2px #ccc;
    font-weight: bold;
    border-radius: 4px;
    position: relative;
    background-color: #f7f7f7;
    color: #707070;
    letter-spacing: 1px;
    overflow: hidden;
    transition: .5s;
  }

  .model-item:hover {
    color: #ffffff;
    background-color: rgba(32, 160, 255, 0.66);
    box-shadow: 0 0 6px rgba(100, 100, 100, .5);
  }

  .model-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, #fff, transparent);
    transition: 0.5s;
  }

  /*????????????????????????????????????????????????????????????????????????????????????????????????
  ??????????????????????????????????????????????????????????????????????????????????????????????????*/
  .model-item:hover::before {
    left: 100%
  }


  .el-icon-delete{
    position: absolute;
    right: 2%;
    top:2%;

  }


  @media not screen and (min-width: 35em) {
    .model-item {
      width: 80%;
      margin: 30px auto;
    }
  }
</style>