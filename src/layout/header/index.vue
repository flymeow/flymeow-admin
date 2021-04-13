<template>
  <div class="nav">
    <span @click="collapsedSider">
      <i :class="rotateIcon"></i>
    </span>
    <div style="flex: 1 1 0%"></div>
    <div class="right-menu">
      <el-dropdown>
        <span class="el-dropdown-link">
          你好: {{ this.userInfo.nickName
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu class="header-dropdown" slot="dropdown">
          <el-dropdown-item @click.native="onLink">个人中心</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'header-flymeow',
  data() {
    return {}
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
    rotateIcon() {
      const opened = this.$store.state.app.sidebar.opened
      return ['fold', opened ? 'el-icon-s-fold' : 'el-icon-s-unfold']
    }
  },
  methods: {
    collapsedSider() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      const res = await this.$store.dispatch('user/logout')
      if (!res) {
        this.$router.push({
          path: '/login'
        })
      }
    },
    onLink() {
      this.$router.push({
        path: '/account'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.nav {
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  line-height: 60px;
  .fold {
    font-size: 30px;
    cursor: pointer;
  }
  .right-menu {
    cursor: pointer;
  }
}
.header-dropdown {
  overflow: auto;
  margin-top: 4px !important;
  padding: 5px 0;
  li {
    line-height: 28px;
    min-width: 100px;
  }
}
</style>
