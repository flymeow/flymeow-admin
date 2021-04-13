<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside :class="classObj">
      <sidebar-flymeow class="sidebar-container" />
    </el-aside>
    <!-- 主体内容 -->
    <el-container>
      <el-header class="main-header">
        <header-flymeow />
      </el-header>
      <el-main class="main-container" ref="main">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <router-view />
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import sidebarFlymeow from './sidebar'
import headerFlymeow from './header'
import { mapGetters } from 'vuex'

export default {
  components: {
    sidebarFlymeow,
    headerFlymeow
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('app', ['sidebar']),
    classObj() {
      console.log(this.sidebar)
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened
      }
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
// main
.main-container {
  min-height: 100%;
}
.main-header {
  background: #dcdfe6;
}
</style>
