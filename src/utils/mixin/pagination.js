/*
 * @Author: your name
 * @Date: 2019-11-19 10:55:41
 * @LastEditTime: 2019-11-19 20:46:56
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \saas-html-spd:\uface\boss\src\utils\mixin\pagination.js
 */
const mixin = {
  data() {
    return {
      pageDefault: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageDefault.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageDefault.currentPage = val
      this.getList()
    }
  }
}
export default mixin
