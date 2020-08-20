<template>
  <div class="bom">
    <img src="./img/circle.png" speedx='2' speedy='1' alt="" class="dsyimg">
    <img src="./img/square.png" speedx='1' speedy='2' alt="" class="dsyimg">
    <img src="./img/trangle.png" speedx='2' speedy='1' alt="" class="dsyimg">
    <img src="./img/circle.png" speedx='1' speedy='1' alt="" class="dsyimg">
    <img src="./img/square.png" speedx='1' speedy='2' alt="" class="dsyimg">
  </div>
</template>

<script>
  export default {
    name: "Boom",
    mounted() {
      let doms = document.getElementsByClassName('dsyimg')
      for (let i = 0; i < doms.length; i++) {
        doms[i].style.left = i * 30 + 'px'
        doms[i].style.top = i * 50 + 'px'
        this.Move(doms[i])
      }
    },
    methods: {
      Move(node) {
        // 给结点添加定时器 让其滚动
        let pp = setInterval(() => {
          // 获取结点自带的属性值的 速度
          let speedx = parseInt(node.getAttribute('speedx'))
          let speedy = parseInt(node.getAttribute('speedy'))
          // 结点当前的位置
          let currentLeft = parseInt(node.style.left)
          let currentTop = parseInt(node.style.top)
          // ----------检测左右碰撞---------
          // 1.获取页面宽度
          let pageWidth = document.body.clientWidth
          // 2.获取模型宽度
          let modelWidth = node.offsetWidth
          // 3.模型距离左边的宽度
          let ModelLeft = node.offsetLeft
          // 检测
          if (ModelLeft < -20 || ModelLeft + modelWidth + 40 > pageWidth) { //这里不用0  而用2为了防止bug
            // 横向反向
            speedx = -speedx
            // 将值设置回去
            node.setAttribute('speedx', speedx)
          }

          // --------------检测上下碰撞---------------
          // 1.获取页面高度
          let pageHeight = window.screen.availHeight
          // 2.获取模型高度
          let modelHeight = node.offsetHeight
          // 3.模型距离上面的高度
          let ModelTop = node.offsetTop
          // 检测
          if (ModelTop < -10 || ModelTop + modelHeight > pageHeight) { //这里不用0  而用2为了防止bug
            // 横向反向
            speedy = -speedy
            // 将值设置回去
            node.setAttribute('speedy', speedy)
          }

          node.style.left = currentLeft + speedx + 'px'
          node.style.top = currentTop + speedy + 'px'
          // 在定时器里面进行碰撞检测

        }, 10)

      }
    }

  }
</script>

<style scoped>


  img {
    z-index: 9999;
    position: absolute;
    height: 40px;
    left: 0px;
    top: 0px;
    width: 40px;
    opacity: 0.5;
    transform: rotate(360deg);
    animation: pp 8s linear infinite;
  }

  @-webkit-keyframes pp {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }


  @media not screen and (min-width: 45em) {
    .bom img:nth-child(1) {
      display: none;
    }



    .bom img {
      opacity: 0.4;
      width: 30px;
      height: 30px;
    }
  }

</style>