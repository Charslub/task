<template>
  <div class="edit">
    <div style="padding: 20px 0">文档名:{{docs.documentName}}</div>
    <div class="edit-area">
      <mavon-editor
              style="height: 100vh"
              @change="change"
              :codeStyle="codeStyle"
              v-model='editorContent'
              :ishljs="true"
              ref=md @imgAdd="imgAdd" @imgDel="imgDel"
      />
    </div>
    <el-button type="primary" round @click="submit">提交</el-button>
  </div>
</template>

<script>
  import {request} from "../../network";

  export default {
    name: "EditPage",
    data() {
      return {
        editorContent: '',
        codeStyle: 'docco',
        img_file: [],
        docs: {},
        html:''
      }
    },
    mounted() {
      //接收参数
      this.docs = this.$route.query.node
      this.editorContent = this.docs.description

    },
    methods: {
      //提交
      submit() {
        let formData=new FormData();
        formData.append('id',this.docs.id);
        formData.append('description',this.editorContent);
        request({
          method: 'put',
          url: `/document/update`,
          data:formData
        }).then(res => {
          console.log(res);
        })
      },
      change(render, html) {
        this.editorContent = render
        this.html=html
      },
      imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('files', $file);
        this.img_file[pos] = $file;
        request({
          url: '/file/upload',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((res) => {
          let data = res.data;
          console.log(data.urls[0]);
          // 将返回的url替换到文本原位置
          this.$refs.md.$img2Url(pos, data.urls[0]);
        })
      },
      imgDel(pos) {
        console.log('删除图片');
        console.log(pos);
        delete this.img_file[pos];
      }
    },
    watch: {
      $route(to, from) {
        //接收
        if (to.path === '/edit') {
          this.docs = this.$route.query.node
          this.editorContent = this.docs.description
        }
      }
    }
  }
</script>

<style scoped>

</style>