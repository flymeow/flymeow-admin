<template>
  <div>
    <avue-crud
      :option="option"
      ref="params"
      :data="tableList"
      :page="page"
      @search-change="searchChange"
      @current-change="currentChange"
      @size-change="sizeChange"
      @row-del="del"
    >
      <template slot="menuLeft">
        <el-button
          icon="el-icon-plus"
          type="primary"
          size="small"
          @click.stop="createImg"
          >新 增</el-button
        >
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button
          type="text"
          @click.stop="edit(scope.row)"
          size="small"
          icon="el-icon-edit"
          >编辑</el-button
        >
      </template>
    </avue-crud>

    <el-dialog
      :visible.sync="dialog"
      @close="cancel"
      :title="isEdit ? '编辑' : '新增图片'"
    >
      <el-form
        :model="picture"
        label-width="80px"
        ref="picture"
        :rules="ruleValidate"
        label-position="right"
      >
        <el-form-item label="分类" prop="type">
          <el-select
            v-model="picture.type"
            placeholder="请选择"
            @change="autoPut"
          >
            <el-option
              v-for="(item, index) in pictureTypes"
              :key="index"
              :label="item.name"
              :value="item.type"
            >
              {{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name" required>
          <el-input
            v-model="picture.name"
            placeholder="请输入"
            style="width:100%"
          />
        </el-form-item>

        <el-form-item label="图片上传" prop="url" required>
          <div class="row-up">
            <span class="up"
              >上传<input
                @change="uploadImg"
                accpet="image/gif,image/png,image/jpeg,image/jpg,image/webp"
                type="file"
            /></span>
            <span style="margin-left:20px;">
              <img
                width="60"
                v-if="picture.url"
                :src="ImgPath + picture.url"
                alt=""
              />
            </span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="text" size="large" @click="cancel">取消</el-button>
        <el-button type="primary" size="large" @click="onSave">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.el-select-dropdown
  .el-scrollbar
  .el-scrollbar__view
  .el-select-dropdown__item {
  padding: 0 20px;
}
.row-up {
  display: flex;
}
input[type='file'] {
  position: absolute;
  width: 80px;
  height: 30px;
  opacity: 0;
  top: 0;
  left: 0;
  padding: 0;
  cursor: pointer;
}
input[type='file' i]::-webkit-file-upload-button {
  cursor: pointer;
}
.up {
  position: relative;
  height: 30px;
  line-height: 30px;
  color: #fff;
  text-align: center;
  display: inline-block;
  background: #2196f3;
  border-radius: 20px;
  width: 80px;
  cursor: pointer;
}
.progress {
  display: inline-block;
  font-size: 16px;
  margin: 0 10px;
  line-height: 30px;
}
</style>
<script>
import mixin from '@/utils/mixin/crud'
import { pictureList } from '../api'
import dayjs from 'dayjs'
import { mapState, mapActions } from 'vuex'
const qiniu = require('qiniu-js')

console.log(qiniu)

export default {
  mixins: [mixin],
  data() {
    return {
      dialog: false,
      isEdit: false,
      picture: {
        name: '',
        type: '',
        url: ''
      },
      searchForm: {},
      tableList: [],
      MODULE_ROUTER: {},
      MODULE_HTTP: pictureList,
      ImgPath: process.env.VUE_APP_IMG_PATH,
      option: {
        align: 'center',
        index: false,
        indexLabel: '',
        indexWidth: 100,
        searchMenuSpan: 1,
        menuAlign: 'center',
        stripe: true,
        // 刷新
        refreshBtn: false,
        // 列显隐按钮
        columnBtn: false,
        // 默认搜索按钮
        searchSubBtn: true,
        // 搜索区域显隐按钮
        searchBtn: false,
        // 清空
        searchResetBtn: false,
        // 查询按钮ICON
        showSearchIcon: false,
        addBtn: false,
        // delBtn: false,
        editBtn: false,
        column: [
          {
            label: 'id',
            prop: 'id',
            addDisplay: false,
            editDisplay: false
          },
          {
            label: '名称',
            prop: 'name',
            rules: [
              {
                required: true,
                message: '名称不能为空',
                trigger: 'blur'
              },
              {
                max: 24,
                message: '字符长度只能为24位',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '图片路径',
            prop: 'url',
            formatter: row => {
              return `<img style="height:50px;" src=${this.ImgPath +
                row.url} />`
            }
          },
          {
            label: '图片类型',
            prop: 'type',
            type: 'number',
            valueDefault: '1',
            rules: [
              {
                required: true,
                message: '类型不能为空',
                trigger: 'change',
                type: 'number'
              },
              {
                max: 10,
                min: 1,
                message: '范围在1-10',
                trigger: 'blur',
                type: 'number'
              }
            ]
          },
          {
            label: '创建时间',
            prop: 'createdAt',
            formatter: row => {
              return dayjs(row.createdAt).format('YYYY-MM-DD HH:MM')
            }
          }
        ]
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur',
            whitespace: true
          },
          {
            max: 24,
            message: '字符长度只能为24位',
            trigger: 'blur',
            whitespace: true
          }
        ],
        type: [
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
        ],
        url: [{ required: true, message: '图片不能为空', trigger: 'chagne' }]
      }
    }
  },
  filters: {
    time(val) {
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  computed: {
    pictureTypes() {
      return this.$store.state.actions.pictureTypes
    },
    imgToken() {
      return this.$store.state.actions.imgToken
    }
  },
  async created() {
    await this.getPictureType()
  },
  methods: {
    ...mapActions([
      'createImgItem',
      'deleteImg',
      'updateImgItem',
      'getPictureType',
      'getImgToken',
      'upload'
    ]),
    async createImg() {
      this.dialog = true
    },
    reset() {
      this.picture = {
        name: '',
        type: '',
        url: ''
      }
      this.$refs['picture'].resetFields()
      this.dialog = false
    },
    cancel() {
      this.reset()
    },
    autoPut(e, a) {
      let ele = this.pictureTypes.find(ele => ele.type === e)
      this.picture.name = ele.name
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
            canvas.width = targetWidth
            canvas.height = targetHeight

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
    async uploadImg(e) {
      let that = this
      const file = e.target.files[0]
      if (!file) {
        return
      }
      const newfile = await this.upbefore(file)

      let upToken = this.$store.state.actions.imgToken
      if (!upToken) {
        await this.getImgToken()
        upToken = this.$store.state.actions.imgToken
      }

      const formData = new FormData()
      formData.append('token', upToken)
      // formData.append('key', key) // key：文件名，可以不传，如果不传七牛则会自动生成随机文件名 hash
      formData.append('file', newfile)

      this.upload({
        data: formData,
        callback: res => {
          console.log(res)
          let { key } = res
          that.picture.url = key
        }
      })

      // console.log(upToken, newfile)
      // this.imgToken({
      //   data: '',
      //   callback: res => {
      //     var formdata = new FormData()
      //     formdata.append('file', newfile)
      //     let param = {
      //       formdata,
      //       token: res.token
      //     }
      //     // self.upload({
      //     //   data: param,
      //     //   callback: res => {
      //     //     self.picture.url = res.filename
      //     //   }
      //     // })
      //   }
      // })
    },
    onSave(id) {
      let self = this
      this.$refs['picture'].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.updateImgItem({
              data: this.picture,
              callback: res => {
                this.$message.success(res.msg)
                this.reset()
                this.query()
              }
            })
          } else {
            this.createImgItem({
              data: this.picture,
              callback: res => {
                this.$message.success(res.msg)
                this.reset()
                this.query()
              }
            })
          }
        } else {
          this.$message.error('请填写完整')
          this.dialog = true
        }
      })
    },
    del(row, index) {
      this.deleteImg({
        data: row.id,
        callback: res => {
          this.$message.success(res.msg)
          this.query()
        }
      })
    },
    edit(row) {
      this.isEdit = true
      this.dialog = true
      this.getPictureType()

      this.picture = {
        id: row.id,
        name: row.name,
        type: row.type,
        url: row.url
      }
    }
  }
}
</script>
