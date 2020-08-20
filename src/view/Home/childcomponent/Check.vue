<template>
  <div class="checkBox">
    <!-- 输入框 -->
    <el-input
            v-model="checkCode"
            prefix-icon="el-icon-key"
            placeholder="验证码"></el-input>
    <div class="CheckCode" @click="chengeCode">

      <span class='itemcode'
        v-for="(item,index) in list"
        :style="{'color':item.color,'transform':`rotateZ(${item.deg}deg)`}"
      >{{item.code}}</span>
      <!-- 里面有一些点点和线 -->
      <span class='back' v-for="(item,index) in backList" :style="{'height':item.len+'px','background-color':item.color,'transform':`rotateZ(${item.deg}deg)`,'left':item.left}"></span>
    </div>
    <!-- 验证码显示区 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      //输入完毕后 根据code 和 check code来检查是否正确 都全部变成小写
      checkCode: "",
      code: "",
      //验证码列表
      list: [],
      backList:[]
    };
  },
  mounted() {
    this.chengeCode();
  },
  methods: {
    chengeCode() {
      this.list = [];
      this.code = "";
      let obj;
      let array = "abcdef0g0h1i2j3kl45m5n76123o7765p9q89r68s6tuvwxyz";
      array = array + array.toUpperCase();
      for (let i = 0; i < 4; i++) {
        obj = {};
        // 随机验证码
        let code = parseInt(Math.random() * array.length);
        obj.code = array.charAt(code);
        this.code += obj.code;
        //随机角度 从-90 到 90
        let deg = parseInt(Math.random() * 120 - 60);
        obj.deg = deg;
        obj.color = this.getColor();
        this.list.push(obj);
        // 随机颜色
      }
      this.code=this.code.toLowerCase()
      this.changeBack()
    },
    getColor() {
      return (
        "#" +
        ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
      );
    },
    changeBack(){
      //  长度 1-40  颜色   偏转-60-60   位置 left 0-100%  
      this.backList=[]
      let obj
      for(let i=0;i<15;i++){
        obj={}
        obj.len=parseInt(Math.random() *30+1);
        obj.color=this.getColor()
        obj.deg=parseInt(Math.random() * 180 - 90);
        obj.left=parseInt(Math.random()*100)+'%'
        this.backList.push(obj)
      }
    },
    check(){

      if(this.checkCode.toLowerCase()===this.code.toLowerCase()){
        this.$emit('login',1)
      }else{
        this.chengeCode()
        this.$emit('login',0)
      }
    }
  }
};
</script>

<style>
.checkBox {
  /*height: 30px;*/
  display: inline-flex;
}

.checkBox el-input {
  text-indent: 8px;
  width: 100px;
  outline: none;
  border: none;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.CheckCode {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 60px;
  position: relative;
  margin-left: 5px;
  border: 1px solid #ccc;
}
.CheckCode .itemcode {
  z-index: 999;
  box-sizing: border-box;
  width: 16px;
  display: flex;
  font-weight: 600;
  align-items: center;
  justify-content: center;
}
.CheckCode .back{
  position: absolute;
  width: 1px;

}
</style>