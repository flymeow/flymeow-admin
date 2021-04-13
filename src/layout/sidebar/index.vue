<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :unique-opened="true"
      :collapse-transition="false"
      :background-color="theme.menuBgColor"
      :text-color="theme.textColor"
      :active-text-color="theme.actTextColor"
      mode="vertical"
    >
      <sidebar-item
        v-for="item in menus"
        :key="item.name"
        :item="item"
        :base-path="item.path"
      />
    </el-menu>
  </el-scrollbar>
</template>
<script>
import theme from '@/assets/scss/variable.scss'
import { mapGetters } from 'vuex'
import sidebarItem from './sidebar-item'
export default {
  name: 'sidebar-flymeow',
  components: {
    sidebarItem
  },
  data() {
    this.theme = theme
    return {}
  },
  computed: {
    ...mapGetters('app', ['sidebar']),
    ...mapGetters('user', ['userInfo', 'menus']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
