<template>
  <div style="padding:20px;">
    <el-form
      :model="articleSingle"
      label-width="100px"
      ref="articleSingle"
      :rules="ruleValidate"
    >
      <el-form-item label="标题" prop="title" required>
        <el-input
          v-model="articleSingle.title"
          placeholder="请输入"
          style="width:100%"
        />
      </el-form-item>
      <el-form-item label="描述" prop="dic" required>
        <el-input
          v-model="articleSingle.dic"
          placeholder="请输入"
          style="width:100%"
        />
      </el-form-item>
      <el-form-item label="状态" prop="type">
        <el-select
          v-model="articleSingle.type"
          placeholder="请选择"
          style="width:20%"
          class="selectStatus"
        >
          <el-option
            v-for="(item, index) in couponList"
            :key="index"
            :value="item.value"
            :label="item.name"
          >
            {{ item.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="articleText">
        <mavon-editor
          :subfield="false"
          defaultOpen="edit"
          :ishljs="true"
          ref="md"
          @save="submit"
          @imgAdd="$imgAdd"
          v-model="articleSingle.articleText"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss">
.el-select-dropdown
  .el-scrollbar
  .el-scrollbar__view
  .el-select-dropdown__item {
  padding: 0 20px;
}
</style>
<script>
import { mapState, mapActions } from 'vuex'
import { Message } from 'element-ui'

export default {
  props: ['initialShopContrast', 'modalSwitch'],
  data() {
    return {
      couponList: [
        {
          value: 1,
          name: '代码'
        },
        {
          value: 2,
          name: '文章'
        }
      ],
      id: '',
      ImgPath: process.env.VUE_APP_IMG_PATH,
      articleSingle: {
        articleText: '',
        title: '',
        dic: '',
        type: 1
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur',
            whitespace: true
          },
          {
            max: 64,
            message: '字符长度只能为24位',
            trigger: 'blur',
            whitespace: true
          }
        ],
        dic: [
          {
            required: true,
            message: '描述不能为空',
            trigger: 'blur',
            whitespace: true
          },
          {
            max: 64,
            message: '字符长度只能为64位',
            trigger: 'blur',
            whitespace: true
          }
        ]
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getData()
  },
  computed: mapState({
    formItem: state => state.actions.articleSingle
  }),
  methods: {
    ...mapActions([
      'createArticle',
      'getImgToken',
      'upload',
      'getArticleSingle',
      'updateArticleSingle'
    ]),
    reset() {
      this.$refs['articleSingle'].resetFields()
    },
    getData() {
      if (this.id) {
        this.getArticleSingle({ data: this.id })
      }
    },
    close() {
      this.$emit('update:modalSwitch', false)
    },
    upbefore(file) {
      const reader = new FileReader()
      const image = new Image()
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      return new Promise((resovle, reject) => {
        reader.readAsDataURL(file)
        reader.onload = function(e) {
          image.src = e.target.result
          image.onload = function(e) {
            var originWidth = image.width
            var originHeight = image.height

            var targetWidth = originWidth / 1,
              targetHeight = originHeight / 1
            canvas.width = targetWidth > 1024 ? targetWidth : 1024
            canvas.height = targetHeight > 578 ? targetHeight : 578

            context.clearRect(0, 0, targetWidth, targetHeight)

            context.drawImage(image, 0, 0, targetWidth, targetHeight)

            canvas.toBlob(
              function(blob) {
                var file2 = new File([blob], file.name, { type: file.type })
                resovle(file2)
              },
              file.type,
              0.8
            )
          }
        }
      })
    },
    async $imgAdd(pos, $file) {
      let that = this
      await this.upbefore($file)

      let upToken = this.$store.state.actions.imgToken
      if (!upToken) {
        await this.getImgToken()
        upToken = this.$store.state.actions.imgToken
      }

      const formData = new FormData()
      formData.append('token', upToken)
      // formData.append('key', key) // key：文件名，可以不传，如果不传七牛则会自动生成随机文件名 hash
      formData.append('file', $file)

      this.upload({
        data: formData,
        callback: res => {
          console.log(res)
          let { key } = res
          that.$refs.md.$img2Url(pos, `${that.ImgPath + key}`)
        }
      })

      // this.imgToken({
      //   data: '',
      //   callback: res => {
      //     var formdata = new FormData()
      //     formdata.append('file', $file)
      //     let param = {
      //       formdata,
      //       token: res.token
      //     }
      //     self.upload({
      //       data: param,
      //       callback: res => {
      //         self.$refs.md.$img2Url(pos, self.ImgPath + res.filename)
      //       }
      //     })
      //   }
      // })
    },
    submit() {
      let self = this
      this.$refs['articleSingle'].validate(valid => {
        if (valid) {
          if (this.id) {
            this.updateArticleSingle({
              data: this.articleSingle,
              callback: () => {
                Message.success('更新成功')
                self.reset()
                setTimeout(() => {
                  this.$router.go(-1)
                }, 2000)
              }
            })
          } else {
            this.createArticle({
              data: this.articleSingle,
              callback: () => {
                Message.success('提交成功')
                self.reset()
                setTimeout(() => {
                  this.$router.go(-1)
                }, 2000)
              }
            })
          }
        } else {
          Message.error('请填写完整')
        }
      })
    }
  },
  watch: {
    initialShopContrast(obj) {
      if (!Object.keys(obj).length) {
        this.reset()
        return false
      }
      for (let key in this.articleSingle) {
        if (this.articleSingle.hasOwnProperty(key) === true && !!obj[key]) {
          this.articleSingle[key] = obj[key]
        }
      }
    },
    formItem(a) {
      this.articleSingle = {
        title: a.title,
        articleText: a.articleText,
        dic: a.dic,
        id: a.id,
        view: a.view,
        type: a.type
      }
    }
  }
}
</script>
