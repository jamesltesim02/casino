<template>
  <div class="login-page">
    <section class="logo-container">LOGO</section>
    <section class="login-panel">
      <input
        type="text"
        placeholder="请输入账号"
        v-model="account"
      >
      <input
        type="password"
        placeholder="请输入密码"
        v-model="password"
      >
      <v-touch
        tag="button"
        @tap="doLogin"
      >登录</v-touch>
    </section>
  </div>
</template>
<script>
import md5 from 'md5'
import { login } from '@/api/member'
import toPlatform from '@/utils/toPlatform'

export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    async doLogin () {
      // if (!/^\w{4,20}$/.test(this.account)) {
      //   this.$toast.bottom('账号必须4~20位')
      //   return
      // }
      if (!this.account) {
        this.$toast.bottom('账号不能为空')
        return
      }
      // if (!/^\w{6,20}$/.test(this.password)) {
      //   this.$toast.bottom('密码必须6~20位')
      //   return
      // }
      if (!this.password) {
        this.$toast.bottom('密码不能为空')
        return
      }
      try {
        this.$loading('登录中...')
        const usreinfo = await login({
          account: this.account,
          password: md5(this.password),
          terminal: 1
        })
        localStorage.setItem('nb-casino-userinfo', JSON.stringify(usreinfo))
        toPlatform()
      } catch ({ msg }) {
        this.$toast.center(msg || '未知错误,请稍后再试')
      } finally {
        this.$loading.close()
      }
    }
  }
}
</script>

<style lang="less">
.login-page {
  height: 100%;
  background: url(../assets/images/login-bg.jpg) no-repeat;
  background-size: 100% 100%;
  .logo-container {
    height: 2.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 0.18rem;
  }
  .login-panel {
    padding: 0 0.1rem;
    button,
    input {
      display: block;
      width: 100%;
      border: 0;
      line-height: 0.4rem;
      margin-top: 0.1rem;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 0.15rem;
      padding: 0 0.16rem;
    }

    button {
      margin-top: 0.2rem;
      font-size: 0.17rem;
      background: #53c0ff;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
