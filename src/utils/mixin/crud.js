/*
 * @Author: your name
 * @Date: 2019-11-19 22:57:28
 * @LastEditTime: 2019-12-13 12:05:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \saas-html-spd:\uface\boss\src\utils\mixin\crud.js
 */
export default {
  data() {
    return {
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 10
        // pageSizes: [1, 2, 4]
      },
      isShowFirst: true,
      MODULE_ROUTER: {},
      MODULE_HTTP: {},
      mixinParams: {}
    }
  },
  mounted() {
    if (this.isShowFirst) {
      this.$nextTick().then(() => {
        this.query()
      })
    }
  },
  methods: {
    // 新增跳转
    addLink() {
      // this.$router.push({
      //   name: this.MODULE_ROUTER.addRouter.name
      // })
      this.$router.push(this.MODULE_ROUTER.addRouter)
    },
    // 编辑跳转
    editLink(row) {
      this.$router.push(this.MODULE_ROUTER.editRouter(row))
    },
    // 详情跳转
    viewLink(row) {
      if (row.windowOpen) {
        const that = this
        const routeData = this.$router.resolve({
          name: that.MODULE_ROUTER.viewRouter(row).path,
          query: row
        })
        const str = routeData.href.substr(routeData.href.indexOf('?') + 1)
        window.open('#' + routeData.location.name + '?' + str, '_blank')
      } else {
        this.$router.push(this.MODULE_ROUTER.viewRouter(row))
      }
    },
    // 返回
    back() {
      this.$router.go(-1)
    },
    // 混入自定义查询参数
    setSearchParams(params) {
      return params
    },
    // 跳转页码
    currentChange(val) {
      this.page.currentPage = val
      this.query()
    },
    // 选择分页条数
    sizeChange(val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      this.query()
    },
    // 点击查询搜索
    searchChange(params, done) {
      const paramKeys = Object.keys(params)
      paramKeys.forEach(item => {
        const props = item.split('|')
        if (props.includes('range')) {
          if (props[0]) {
            params[props[0] + 'putStartTime'] = params[item][0]
            params[props[0] + 'putEndTime'] =
              params[item][1].split(' ')[0] + ' 23:59:59' // params[item][1]
          } else {
            params['putStartTime'] =
              typeof params[item][0] === 'string' ? params[item][0] : undefined
            params['putEndTime'] = params[item][1]
              ? params[item][1].split(' ')[0] + ' 23:59:59'
              : params[item][1]
          }
          delete params[item]
        }
      })

      if (this.$refs.hasOwnProperty('params')) {
        params = Object.assign(
          {},
          this.mixinParams,
          params,
          this.$refs.params.searchForm
        )
      }
      this.query(params, 1, done)
    },
    // 初始化查询
    async query(params, current, done) {
      if (!params && this.$refs.hasOwnProperty('params')) {
        params = Object.assign(
          {},
          this.mixinParams,
          this.$refs.params.searchForm
          // this.$refs.params.option.searchForm
        )
      }

      if (current) {
        this.page.currentPage = current
      }
      // const form = {
      //   form: { ...params }
      // }
      const setp = this.setSearchParams({})
      const newParams = Object.assign(
        { page: this.page.currentPage, size: this.page.pageSize },
        setp,
        params
      )

      const res = await this.MODULE_HTTP.initList(newParams)
      this.tableList = res.data ? res.data : []
      this.page.total = res.totalSize || 0
      if (typeof done === 'function') {
        done()
      }
      // this.page.page = res.page || 1
    }
  }
}
