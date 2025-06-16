<template>
  <view class="login-container">
    <view class="login-wrapper">
      <view class="logo">
        <image src="/static/logo.png" mode="aspectFit"></image>
        <text class="title">星子</text>
      </view>
      
      <view class="login-form">
        <view class="input-group">
          <input type="text" v-model="account" placeholder="账号" class="input" />
          <text class="clear" v-if="account" @tap="account = ''">×</text>
        </view>
        
        <view class="input-group">
          <input type="password" v-model="password" placeholder="密码" class="input" />
          <text class="clear" v-if="password" @tap="password = ''">×</text>
        </view>
        
        <view class="agreement">
          <checkbox :checked="agreed" @tap="agreed = !agreed"></checkbox>
          <text>我已阅读并同意</text>
          <text class="link">《用户服务》</text>
          <text>和</text>
          <text class="link">《个人信息保护》</text>
        </view>
        
        <button class="login-btn" @tap="handleLogin">登录</button>
      </view>
    </view>
  </view>
</template>

<script>
import { login } from '../../api-request/user.js'

export default {
  data() {
    return {
      account: '',
      password: '',
      agreed: false
    }
  },
  onLoad() {
    // 检查是否已登录
    const token = uni.getStorageSync('token')
    // if (token) {
    //   uni.reLaunch({
    //     url: '/pages/home/home'
    //   })
    // }
  },
  methods: {
    validateInput() {
      if (!this.account) {
        uni.showToast({
          title: '请输入账号',
          icon: 'none'
        })
        return false
      }
      if (!this.password) {
        uni.showToast({
          title: '请输入密码',
          icon: 'none'
        })
        return false
      }
      if (this.password.length < 6) {
        uni.showToast({
          title: '密码长度不能小于6位',
          icon: 'none'
        })
        return false
      }
      return true
    },
    async handleLogin() {
      if (!this.agreed) {
        uni.showToast({
          title: '请先同意用户协议',
          icon: 'none'
        })
        return
      }
      
      if (!this.validateInput()) {
        return
      }

      try {
        const res = await login(this.account, this.password);

        res.data
        if (res.data.code === 0) {
          // 保存token
          uni.setStorageSync('token', res.data.data.token)
          
          // 跳转到主页
          uni.reLaunch({
            url: '/pages/home/home'
          })
        } else {
          uni.showToast({
            title: res.data.message || '登录失败',
            icon: 'none'
          })
        }
      } catch (error) {
        console.error(error)
        uni.showToast({
          title: '登录失败，请重试',
          icon: 'none'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40rpx;
  box-sizing: border-box;
  
  .login-wrapper {
    width: 100%;
    max-width: 650rpx;
    margin: 0 auto;
  }

  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 60rpx 0;
    
    image {
      width: 120rpx;
      height: 120rpx;
    }
    
    .title {
      font-size: 40rpx;
      margin-top: 20rpx;
    }
  }
  
  .login-form {
    width: 100%;
    
    .input-group {
      position: relative;
      margin-bottom: 30rpx;
      
      .input {
        width: 100%;
        height: 90rpx;
        padding: 0 20rpx;
        background: #F5F5F5;
        border-radius: 8rpx;
        box-sizing: border-box;
      }
      
      .clear {
        position: absolute;
        right: 20rpx;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
        font-size: 40rpx;
      }
    }
    
    .agreement {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      color: #666;
      margin: 30rpx 0;
      
      .link {
        color: #4080FF;
      }
    }
    
    .login-btn {
      width: 100%;
      height: 90rpx;
      line-height: 90rpx;
      background: #4080FF;
      color: #fff;
      border-radius: 8rpx;
      margin-top: 40rpx;
    }
  }
}
</style>
