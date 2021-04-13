<template>
  <div id="login">
    <el-form
      class="form"
      ref="formInline"
      :model="formItem"
      :rules="ruleInline"
    >
      <el-form-item prop="name">
        <el-input
          type="text"
          v-model="formItem.name"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" class="pass">
        <el-input
          type="password"
          v-model="formItem.password"
          placeholder="密码"
          autocomplete="off"
          @keyup.enter.native="onEnter"
        ></el-input>
      </el-form-item>
      <div class="remember">
        <el-checkbox @change="rememberHandle" v-model="remember"
          >记住用户名</el-checkbox
        >
      </div>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit('formInline')"
          >登 录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss">
#login {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('../../assets/images/login-bg.jpg') 0 0 no-repeat;
  background-size: cover;
  form {
    width: 320px;
    margin: 120px auto;
    text-align: center;
    input {
      height: 44px;
    }
    button {
      padding: 14px 15px;
      color: #fff;
      border-radius: 3px;
      width: 100%;
      font-size: 16px;
    }
    .remember {
      margin-bottom: 10px;
      text-align: left;
    }
  }
}
</style>
<script>
import { Message } from 'element-ui'

export default {
  data() {
    return {
      formItem: {
        name: '',
        password: ''
      },
      ruleInline: {
        name: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            message: '密码长度不能小于6位',
            trigger: 'blur'
          }
        ]
      },
      remember: false
    }
  },
  created() {
    let name = localStorage.getItem('currentUser')
    if (name) {
      this.formItem.name = name
      this.remember = true
    }
  },
  methods: {
    onEnter() {
      this.handleSubmit('formInline')
    },
    rememberHandle(res) {
      if (!res) {
        localStorage.removeItem('currentUser')
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.remember) {
            localStorage.setItem('currentUser', this.formItem.name)
          } else {
            localStorage.removeItem('currentUser')
          }
          this.$store.dispatch('user/login', this.formItem).then(res => {
            if (!res) {
              Message({
                message: '登录成功',
                type: 'success',
                duration: 1e3
              })
              this.$router.push({
                path: '/'
              })
            }
          })
        }
      })
    }
  }
}
</script>
