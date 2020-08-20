<template>
  <div class="toast">
    <div class="box">
      <div class="message" :style="{marginTop:item.mtop+'px'}" v-for="(item,index) in list">
        <div class="item" :class="item.type">
          <span> <img :src="require(`./img/${item.type}.png`)" alt=""></span>
          <span>{{item.message}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        //消息列表
        list: [],
        //消息长度 据此决定距离顶部的高度
        len: 0
      }
    },
    methods: {
      Message(config) {
        //如果没有传type
        if (typeof config.type === 'undefined')
          config.type = 'normal'
        //  加上一个dom
        let mtop = this.len * 50
        this.len = this.len + 1
        this.list.push({
          mtop,
          type: config.type,
          message: config.message
        })
        this.$nextTick(()=>{
            this.show()
        })
      },
      show() {
        /*获取最后一个Dom为其添 渐入  1秒后上移并消失*/
        let itemList = document.getElementsByClassName('message')
        let item = itemList[itemList.length - 1]
        //先达到渐入的效果
        item.style.opacity = '1'
        let martop = parseInt(item.style.marginTop) + (this.len - 1) * 10
        item.style.marginTop = martop + 'px'
        //一秒后上移并消失
        let timer = setTimeout(() => {
          item.style.opacity = 0
          item.style.marginTop = martop - this.len * 60 + 'px'
          item.style.transform = 'rotateX(100deg)'
          //开启定时器检测 如果到达了顶部 就把长度-1 使得下一个出现在正确位置
          let timer2 = setTimeout(() => {
            item.style.display = 'none'
            this.len = this.len - 1
            clearTimeout(timer2)
          }, 300)
          clearTimeout(timer)
        }, 2000)

      }
    }
  }
</script>

<style scoped>
  .toast {
    max-width: 700px;
    margin: 0 auto;
    top: 10px;
    left: 5%;
    right: 5%;
    position: fixed;
    max-height: 100vh;
    width: 90%;
  }

  .box {
    width: 100%;
    position: relative;
  }

  .message {
    border-radius: 8px;
    opacity: .4;
    transition: .5s all linear;
    position: absolute;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 49px;
    z-index: 999;
  }

  .message div {
    display: flex;
    justify-content: center;
  }


  .success {
    border-radius: 8px;
    color: #67C23A;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F0F9EB;
  }

  .error {
    border-radius: 8px;
    color: #F56C6C;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FEF0F0;
  }

  .worn {
    border-radius: 8px;
    color: #E6A242;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FDF6EC;
  }

  .normal {
    border-radius: 8px;
    color: #909399;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #EDF2FC;
  }

  .message img {
    width: 20px;
    margin-right: 20px;
  }

  .message span:first-child {
    flex: 1;
    text-align: center;
  }

  .message span:nth-child(2) {
    flex: 2;
  }

</style>