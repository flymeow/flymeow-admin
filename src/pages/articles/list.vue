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
          @click.stop="addLink()"
          >添加文章</el-button
        >
      </template>

      <template slot-scope="scope" slot="menu">
        <el-button
          icon="el-icon-edit"
          type="text"
          @click.stop="editLink({ id: scope.row.id, mchNo: scope.row.mchNo })"
          size="small"
          >编辑</el-button
        >
      </template>
    </avue-crud>
  </div>
</template>
<script>
import mixin from '@/utils/mixin/crud'
import { routeAcount, articleManage } from '../api'
import dayjs from 'dayjs'
const dicData = [
  {
    label: '全部',
    value: 0
  },
  {
    label: '代码',
    value: 1
  },
  {
    label: '文章',
    value: 2
  }
]
export default {
  mixins: [mixin],
  data() {
    return {
      searchForm: {},
      tableList: [],
      MODULE_ROUTER: {
        addRouter: routeAcount.Add(),
        editRouter: routeAcount.Edit
      },
      MODULE_HTTP: articleManage,
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
        delBtn: true,
        editBtn: false,
        column: [
          {
            label: 'ID',
            prop: 'id'
          },
          {
            label: '标题',
            prop: 'title',
            search: true
          },
          {
            label: '文章类型',
            prop: 'type',
            type: 'select',
            search: true,
            dicData: dicData,
            searchPlaceholder: '请选择'
          },
          {
            label: '阅读量',
            prop: 'view'
          },
          {
            label: '创建时间',
            prop: 'createTime',
            formatter: val => {
              return dayjs(val.createTime).format('YYYY-MM-DD')
            }
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
  methods: {
    async del(row, index) {
      let res = await articleManage.delete(row.id)
      this.$message.success(res.msg)
      this.query()
    }
  }
}
</script>
