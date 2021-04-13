<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <!-- 一个子菜单或没有子菜单 -->
    <template
      v-if="
        showOneChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <app-link
        class="link"
        v-if="onlyOneChild"
        :to="resolvePath(onlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="onlyOneChild.icon || item.icon"
            :title="onlyOneChild.name"
          />
        </el-menu-item>
      </app-link>
    </template>
    <el-sbumenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      propper-append-to-body
    >
      <template slot="title">
        <item v-if="item" :icon="item.icon" :title="item.name" />
      </template>
      <sidebar-item
        v-for="(child, index) in item.children"
        :key="index"
        :is-nest="true"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      ></sidebar-item>
    </el-sbumenu>
  </div>
</template>
<script>
import path from 'path'
import { isExternal } from '@/utils'
import Item from './item'
import AppLink from './link'
export default {
  name: 'sidebar-item',
  components: {
    Item,
    AppLink
  },
  props: {
    item: {
      type: Object,
      rquired: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    showOneChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) return false
        else {
          this.onlyOneChild = item
          return true
        }
      })
      // 如果只有一个子路由
      if (showingChildren.length === 1) {
        return true
      }
      // 没有子路由就直接显示父路由
      if (showingChildren.length === 0) {
        this.onlyOneChild = {
          ...parent,
          path: '',
          noShowingChildren: true
        }
        return true
      }
      console.log(this.onlyOneChild)
      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
