<template>
  <div class="Left">
    <div class="options">
      <el-tooltip content="删除目录/文档" placement="top">
        <i class="el-icon-delete-solid" @click="DeleteDocs"></i>
      </el-tooltip>
      <el-tooltip content="新建" placement="top">
        <i class="el-icon-plus" @click="XinJian"></i>
      </el-tooltip>
      <el-tooltip content="返回首页" placement="top">
        <i class="el-icon-back" @click="backHome"></i>
      </el-tooltip>
      <el-tooltip content="编辑文档" placement="top">
        <i class="el-icon-edit" @click="EditDocs"></i>
      </el-tooltip>



    </div>
<!--    /role/update-->

    <div style="display: flex;justify-content: center;flex-direction: column;align-items: center;background-color: white">
      添加管理员
      <el-input v-model="ControlUser" placeholder="管理员名字"></el-input>
      <el-button type="primary" round @click="addControl">添加</el-button>
    </div>
    <div>

    </div>
    <div class='catagory'>
      <el-tree
              ref="tree"
              @node-click="nodeClick"
              :data="data"
              style="background-color: rgba(247,247,247,0.42)"
              node-key="id"
              :props="defaultProps">
        <span class="custom-tree-node" slot-scope="{ node, data }"
              style="display: flex;align-items: center;width: 100%;justify-content: space-between;padding: 3px 5px">
          {{node.label}}
            <el-tooltip content="修改名字/位置" placement="top">
                 <i class="el-icon-s-order" @click="EditFile(node)"></i>
            </el-tooltip>


        </span>
      </el-tree>
    </div>
    <!--    //点击新建 弹出弹窗-->
    <div class="createToast" v-show="isShow">
      <!--      类型-->
      <div class="documentType">
        <el-radio v-model="documentType" label="1">目录</el-radio>
        <el-radio v-model="documentType" label="2">文档</el-radio>
      </div>

      <div class="documentName">
        <el-input v-model="documentName" placeholder="请输入目录/文档名"></el-input>
      </div>
      <div class="name" v-show="!checked">路径:{{Filename}}</div>
      <el-checkbox v-model="checked">根目录</el-checkbox>
      <!--      名字-->
      <div class="btn">
        <el-button type="primary" size="medium" @click="ConfirmCreate">新建</el-button>
        <el-button type="danger" size="medium" @click="CloseToast"> 取消</el-button>
      </div>
    </div>

    <!--删除弹窗-->
    <div class="DeleteToast" v-show="isShow2">
      <h5>请点击您需要删除的文件夹 / 文档</h5>
      <h3>目标:{{Filename}}</h3>
      <div>
        <el-button type="primary" size="medium" @click="ConfirmDelete">删除</el-button>
        <el-button type="danger" size="medium" @click="isShow2=false">取消</el-button>
      </div>
    </div>


    <!--    编辑弹窗-->
    <div class="EditToats" v-show="isShow3">
      <!--      名字 -->
      <div style="display: flex;align-items: center">
        名称:
        <el-input v-model="documentName1" style="width: 80%" placeholder="请输入内容"></el-input>
      </div>
      <!--      位置-->
      <div v-show="!checked">
        位置:{{Filename}}
      </div>
      <!--      根节点-->
      <el-checkbox v-model="checked">根节点</el-checkbox>
      <div>
        <el-button type="primary" size="medium" @click="ComfirmEdit">修改</el-button>
        <el-button type="danger" size="medium" @click="isShow3=false">取消</el-button>
      </div>
    </div>


  </div>
</template>

<script>
  import {request} from "../../../network";
  import store from "../../../store";

  export default {
    name: "LeftOptions",
    props: {
      firstDoc: {
        type: Array,
        default() {
          return []
        }
      },
      belongId: null
    },
    data() {
      return {
        //管理员名称
        ControlUser:'',
        //是否根目录
        checked: false,
        //新建弹窗得显示
        isShow: false,
        //是否显示删除弹窗
        isShow2: false,
        //是否显示编辑弹窗
        isShow3: false,
        //新建时候得名字
        documentName: '',
        documentType: "1",
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        //当前点击得结点
        currentNode: null,
        //编辑时候的名字
        documentName1: "",
        fatherNode: null,
        eidtNode: null
      }
    },
    methods: {
      //添加管理员
      addControl(){
        if(this.ControlUser===''){
          this.$toast.Message({
            type:'error',
            message: '提示:不能为空.'
          })
        }else{
          request({
            method:'put',
            url:`/role/update?username=${this.ControlUser}&modlId=${this.belongId}`
          }).then(res=>{
            console.log(res);
            this.$toast.Message({
              type:res.status,
              message: res.message
            })
          })
        }
      },
      ComfirmEdit() {//确认修改

        //判断名字是否为空
        if (this.documentName1 === '') {
          this.$toast.Message({
            type: 'worn',
            message: '提示:名称不能为空!.'
          })
        } else if (this.currentNode.documentType === 2) {
          this.$toast.Message({
            type: 'worn',
            message: '提示:不能放在文档下!!!.'
          })
        } else if (this.currentNode.id === this.eidtNode.id&&!this.checked) {
          this.$toast.Message({
            type: 'worn',
            message: '提示:不能自己放自己!!!.'
          })
        } else {
          //名字
          let name = this.documentName1
          //id
          let id = this.eidtNode.id
          //位置
          let fatherId
          fatherId = this.currentNode.id
          if (this.checked)
            fatherId = -1
          console.log(name, id, fatherId)
          request({
            method: 'put',
            url: `/document/update?fatherId=${fatherId}&id=${id}&documentName=${name}&belongId=${this.belongId}`
          }).then(res => {
            console.log(res);
            this.$toast.Message({
              type: res.status,
              message: res.message
            })
            this.isShow3 = false
            if (res.status === 'success') {
              this.$bus.$on('GetAgain')
            }
          })
        }
      },
      EditFile(node) {
        this.$toast.Message({
          message: '提示:点击左边目录，选择存放位置.'
        })
        if (this.currentNode === null) {
          this.checked = true
        }
        /*--------改名字和位置---------*/
        this.currentNode = node.data
        this.eidtNode = node.data
        this.documentName1 = node.data.documentName
        this.isShow3 = true
      },
      DeleteDocs() {
        this.isShow2 = true
      },
      backHome() {
        this.currentNode = null
        this.$router.push('/home')

      },
      //点击结点
      nodeClick(e, a, c) {
        //保存当前点击得结点得信息
        this.currentNode = e
        // 判断是不是目录
        if (e.documentType === 1) {//目录 就加载他下面的数据
          //如果这一层加载过了
          this.getInfo(e.id, e.belongId, e)

        } else {//文档 获取文档数据
          if (e.id)
            request({
              url: `/document/one?Id=${e.id}`
            }).then(res => {
              console.log(res);
              if (res.data.description !== null)
                this.$bus.$emit('description', res.data.description)
              else {
                this.$bus.$emit('description', `## 没有内容`)
              }
            })

        }
      },
      getInfo(id, belongId, e) {
        //首先根据id获取一层信息 再找到这个id的对象child 给push进去
        request({
          url: `/document/all?belongId=${belongId}&fatherId=${id}`
        }).then(res => {
          //得到这一层的下的数据
          let array = res.data.documents.map(item => {
            item.label = item.documentName
            return item
          })
          this.$set(e, 'children', []);
          e.children = array
          // console.log(array);
          // console.log(this.data)
        })
      },
      EditDocs() {
        console.log(2333);
        //把currentNode传过去
        if (!this.currentNode) {
          this.$toast.Message({
            type: 'worn',// type:success error worn 可以不填
            message: 'cnmd没东西让你编辑，先点击你要修改的东西'
          })
        } else if (this.currentNode.documentType === 1) {//目录
          //请编辑文档
          this.$toast.Message({
            type: 'worn',// type:success error worn 可以不填
            message: '要修改目录,去点那个蓝色的'
          })
        } else if (this.currentNode.documentType === 2) {//文档
          this.$router.push({
            path: '/edit',
            query: {
              node: this.currentNode
            }
          })
        }

      },
      //新建
      XinJian() {
        this.$toast.Message({
          type: 'success',// type:success error worn 可以不填
          message: '您可以点击新建文档存放得目录'
        })
        if (this.currentNode === null) {
          this.checked = true
        }
        this.isShow = true
      },
      //取消新建
      CloseToast() {
        this.description = ''
        this.isShow = false
      },
      //确认新建
      ConfirmCreate() {
        //确认名字是否为空
        if (this.documentName === '') {
          this.$toast.Message({
            type: 'worn',// type:success error worn 可以不填
            message: '目录/文档名不能为空!!!'
          })
        } else if (this.currentNode && this.currentNode.documentType === 2) {
          this.$toast.Message({
            type: 'worn',// type:success error worn 可以不填
            message: '不能在文档下新建!!!'
          })
        } else {
          //类型  documentType
          //名字 documentName
          //belongId  就是当前结点得belong  id  fatherId 就是当前结点得id
          let fatherId
          if (this.currentNode) {
            fatherId = this.currentNode.id
          } else {
            fatherId = -1
          }

          if (this.checked) {
            fatherId = -1
          }
          //  发送请求 请求新增
          request({
            //belongId fatherId documentName documentType
            method: 'post',
            url: `/document/insert?belongId=${this.belongId}&documentName=${this.documentName}&documentType=${this.documentType}&fatherId=${fatherId}`
          }).then(res => {
            console.log(res);
            this.$toast.Message({
              type: res.status,// type:success error worn 可以不填
              message: res.message
            })
            if (res.status === 'success') {
              //  关闭弹窗
              this.description = ''
              this.isShow = false
              console.log(this.isShow)
              //发送事件 重新获取一次第第一级文档
              this.$bus.$emit('GetAgain')

            }
          })

        }
      },
      //确认删除
      ConfirmDelete() {
        //  /document/delete 删除文件夹 文档
        console.log('删除');
        //判断
        if (!this.currentNode) {
          this.$toast.Message({
            type: 'error',// type:success error worn 可以不填
            message: '要删模块去首页删!!'
          })
        } else {
          //发送请求 删除
          request({
            url: `/document/delete?Id=${this.currentNode.id}`,
            method: 'delete'
          }).then(res => {
            console.log(res);
            this.$toast.Message({
              type: res.status,// type:success error worn 可以不填
              message: res.message
            })
            if (res.status === 'success') {
              this.isShow2 = false
              //发送事件 重新获取一次第第一级文档
              this.$bus.$emit('GetAgain')
            }
          })
        }
      }
    }
    ,
    watch: {
      //更新data第一层
      firstDoc() {
        //  在这里计算
        this.data = this.firstDoc.map(item => {
          item.label = item.documentName

          return item
        })
      }
      ,
      $route(to, from) {
        if (!this.$store.getters.getUsername) {
          this.$router.push('/home')
        }
        this.isShow3 = false
        this.isShow = false
        this.checked = false
        this.currentNode = null
      }
    }
    ,
    computed: {
      Filename() {
        if (this.currentNode === null) {
          return '根目录'
        } else {
          return this.currentNode.documentName
        }
      }
      ,

    }
  }
</script>

<style scoped>
  .EditToats {
    width: 300px;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #87ffcb;
    box-shadow: 0 0 4px #ccc;
    padding: 20px;
  }

  .el-icon-s-order {
    color: #0c84ff;
  }

  .DeleteToast {
    width: 300px;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #87ffcb;
    box-shadow: 0 0 4px #ccc;
    padding: 20px;
  }

  .Left {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .options {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    background-color: #ff5777;
  }

  .options i {
    cursor: pointer;
    font-size: 16px;
  }

  .catagory {
    background-color: #67C23A;
  }

  .createToast {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    height: 180px;
    width: 300px;
    background-color: #ececec;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  @media not screen and (min-width: 35em) {
    .createToast {
      width: 90%;
    }

    .DeleteToast {
      width: 90%;
    }

    .EditToats {
      width: 90%;
    }
  }
</style>