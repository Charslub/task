<template>
	<div class="model-config" v-show="IsShow && $store.getters.getUsername">
		<h2 style="padding: 10% 0 5% 0">模块新建</h2>
    <div class="creator" style="color: rgb(31,159,255)">
      创建者: <span>{{$store.getters.getUsername}}</span>
    </div>
    <!--    模块名-->
		<div class="model-content">
			<el-input
							placeholder="模块名"
							v-model="ModelName"
							clearable>
			</el-input>
    </div>
    <div class="model-button">
      <el-button type="primary" style="flex: 1" @click="ConfirmCreate">确认创建</el-button>
      <el-button type="danger" style="flex: 1" @click="close">取消创建</el-button>
    </div>

	</div>
</template>

<script>
	export default {
		name: "CreateModel",
		data() {
			return {
				ModelName: "",
				IsShow: false
			}
		},
		mounted() {
			this.$bus.$on('show', () => {
				this.show()
			})
		},
		methods: {
			show() {
				this.IsShow = true
			},
			close() {
				this.IsShow = false
			},
			ConfirmCreate() {
				if (this.ModelName !== '') {
					this.$emit('Create', this.ModelName)
					this.ModelName = ""
					this.close()
				} else {
					this.$toast.Message({
						type: 'error',// type:success error worn 可以不填
						message: '文档名不能为空!!'
					})
				}
			}
		}
	}
</script>

<style scoped>
	.model-config {
		z-index: 99999;
		width: 400px;
		position: fixed;
		height: 300px;
		background-color: #ffffff;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 5px #ccc;
    text-align: center;
    border-radius: 10px;
	}

	.model-content {
		height: 30%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		padding:0 10%;
	}

  .model-button {
    display: flex;
    padding:3% 10%;
  }

	@media not screen and (min-width: 35em) {
		.model-config {
			width: 90%;
		}
	}
</style>