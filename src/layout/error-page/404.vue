<template functional>
  <div class="page-error">
    <img :src="require('./404.png')" />
    <p class="error">抱歉，你访问的页面不存在。</p>
    <el-button type="primary">
      <router-link to="/" class="back">
        <span>
          返回首页
        </span>
      </router-link>
    </el-button>
  </div>
</template>

<style lang="scss">
@import 'index.scss';
</style>
