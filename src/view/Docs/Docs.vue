<template>
  <div class="docs">
    <i class="el-icon-s-fold" v-show="!isFold" @click="changeFold"></i>
    <i class="el-icon-s-unfold" v-show="isFold" @click="changeFold"></i>
    <div class="left">
      <left-options :first-doc="firstDoc" :belong-id="ModelId"></left-options>
    </div>
    <div class="doc-detail" v-html="readmeContent">
      内容区

    </div>
  </div>
</template>

<script>
  import LeftOptions from "./ChildComponents/LeftOptions";
  import {request} from "../../network";
  import marked from "marked";

  export default {
    name: "Docs",
    components: {LeftOptions},
    data() {
      return {
        //模块id
        ModelId: null,
        isFold: true,
        firstDoc: [],
        description: ``
      }
    },
    mounted() {
      marked.setOptions({ // marked 设置
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
      })
      this.listenWidth()
      this.getFirstInfo()

      this.$bus.$on('GetAgain', () => {
        this.getFirstInfo()
        console.log('重新加载目录')
      })
    },
    watch: {
      $route(to, from) {
        if (to.path === '/docs') {
          console.log('进入模块');
          this.getFirstInfo()
        }
      }
    },
    methods: {
      //左边操作区
      changeFold() {
        console.log(2333);
        this.isFold = !this.isFold
        if (this.isFold) {
          document.getElementsByClassName('left')[0].style.left = -280 + 'px'
        } else {
          document.getElementsByClassName('left')[0].style.left = 0 + 'px'
        }

      },
      //监听窗口大小
      listenWidth() {
        this.$bus.$on('description', (e) => {
          this.description = e
          console.log(e);
        })


        //初次进入页面
        let element = document.getElementsByClassName('left')[0]
        window.onresize = () => {
          if (document.body.clientWidth >= 1200) {
            this.isFold = true
            element.style.left = 'calc((100vw - 1180px) / 2 - 10px)'
          } else {
            element.style.transition = 'all .3s';
            element.style.left = -280 + 'px'
          }
        }
      },
      //获取第一层信息
      getFirstInfo() {
        this.description = `### Hello World`
        this.ModelId = this.$route.query.id
        console.log(this.ModelId)
        request({
          url: `/document/all?belongId=${this.ModelId}&fatherId=-1`
        }).then(res => {
          if (res.data)
            this.firstDoc = res.data.documents
        })
      }

    },
    computed: {
      readmeContent() {
        return marked(this.description || "", {
          sanitize: true
        });
      }
    }
  }
</script>

<style scoped>
  .docs {
    overflow: hidden;
    transition: all .3s;
  }

  .left {
    position: fixed;
    left: calc((100vw - 1180px) / 2 - 10px);
    top: 80px;
    width: 280px;
    padding: 10px;
    box-shadow: 0 0 4px #ccc;
  }

  .doc-detail {
    transition: all .3s;
    margin-top: 80px;
    margin-left: calc((100vw - 1180px) / 2 + 280px);
    width: 900px;
    min-height: 1000px;
    box-shadow: 0 0 7px #ccc;
  }

  .el-icon-s-fold, .el-icon-s-unfold {
    display: none;
  }

  @media not screen and (min-width: 1200px) {
    .doc-detail {

      width: 100%;
      margin-left: 0;
    }

    .docs {
      padding: 0 3px;

    }

    .left {

      width: 280px;
      top: 40px;
      position: absolute;
      left: -280px;
    }

    .el-icon-s-fold, .el-icon-s-unfold {
      position: absolute;
      font-size: 20px;
      top: 10px;
      left: 20px;
      cursor: pointer;
      display: block;
    }

    .el-icon-s-fold, .el-icon-s-unfold:hover {
      color: blue;
    }
  }
</style>