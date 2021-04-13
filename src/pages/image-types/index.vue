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
      @row-save="save"
      @row-update="update"
      @row-del="del"
    >
      <!-- <template slot-scope="scope" slot="menu">
        <el-button
          @click.stop="editLink({ id: scope.row.id, mchNo: scope.row.mchNo })"
          size="small"
          >编辑</el-button
        >
      </template> -->
    </avue-crud>
  </div>
</template>

<script>
import mixin from '@/utils/mixin/crud'
import { imageTypes } from '../api'
import dayjs from 'dayjs'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [mixin],
  data() {
    return {
      searchForm: {},
      tableList: [],
      MODULE_ROUTER: {},
      MODULE_HTTP: imageTypes,
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
        // addBtn: true,
        // delBtn: false,
        // editBtn: false,
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
          }
        ]
      }
    }
  },
  filters: {
    time(val) {
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  computed: mapState({
    pictureTypes: state => state.actions.pictureTypes
  }),
  created() {},
  methods: {
    ...mapActions([
      'createPictureType',
      'delePictureType',
      'updatePictureType'
    ]),
    save(row, done, loading) {
      done()
      let data = {
        name: row.name,
        type: String(row.type)
      }
      this.createPictureType({
        data: data,
        callback: res => {
          this.$message.success(res.msg)
          this.query()
        }
      })
    },
    update(row, index, done, loading) {
      let data = {
        id: row.id,
        name: row.name,
        type: String(row.type)
      }
      done()
      this.updatePictureType({
        data: data,
        callback: res => {
          this.$message.success(res.msg)
          this.query()
        }
      })
    },
    del(row, index) {
      this.delePictureType({
        data: row.id,
        callback: res => {
          this.$message.success(res.msg)
          this.query()
        }
      })
    }
  }
}
</script>
