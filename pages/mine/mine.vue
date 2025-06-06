<template>
  <view class="mine-container">
    <!-- 用户信息区域 -->
    <view class="user-info">
      <view class="user-header">
        <view class="left">
          <image class="avatar" :src="userInfo.avatar" mode="aspectFill" @tap="handleAvatarClick"></image>
          <view class="user-detail">
            <view class="name-level">
              <text class="nickname">{{userInfo.nickname}}</text>
              <text class="level">{{userInfo.level}}</text>
            </view>
            <view class="income-star">
              <text class="income">收益：{{userInfo.income}}</text>
              <text class="star">星子值：{{userInfo.starValue}}</text>
            </view>
          </view>
        </view>
        <view class="right" @tap="handleSpaceClick">
          <text class="space">空间</text>
          <text class="arrow">></text>
        </view>
      </view>

      <!-- 统计信息 -->
      <view class="stats">
        <view class="stat-item">
          <text class="number">{{userInfo.stats.posts}}</text>
          <text class="label">帖子</text>
        </view>
        <view class="stat-item">
          <text class="number">{{userInfo.stats.follows}}</text>
          <text class="label">关注</text>
        </view>
        <view class="stat-item">
          <text class="number">{{userInfo.stats.fans}}</text>
          <text class="label">粉丝</text>
        </view>
      </view>
    </view>

    <!-- 菜单列表 -->
    <view class="menu-list">
      <view v-for="(group, groupIndex) in menuGroups" :key="groupIndex" class="menu-group">
        <view v-if="group.title" class="group-title">{{group.title}}</view>
        <view class="menu-items">
          <view
            v-for="(item, itemIndex) in group.items"
            :key="itemIndex"
            class="menu-item"
            @tap="handleItemClick(item)"
          >
            <view class="item-content">
              <text v-if="item.icon" :class="['iconfont', 'icon-' + item.icon]"></text>
              <text class="item-text">{{item.text}}</text>
              <switch
                v-if="item.type === 'switch'"
                :checked="item.value"
                @change="handleSwitchChange($event, group, item)"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import mineData from '../../mock/mineData.json'

export default {
  data() {
    return {
      userInfo: {},
      menuGroups: []
    }
  },
  onLoad() {
    this.userInfo = mineData.userInfo
    this.menuGroups = mineData.menuGroups
  },
  methods: {
    handleItemClick(item) {
      if (item.path) {
        uni.navigateTo({
          url: item.path
        })
      }
    },
    handleSwitchChange(event, group, item) {
      item.value = event.detail.value
    },
    handleAvatarClick() {
      uni.navigateTo({
        url: '/pages/personal-info-edit/personal-info-edit'
      })
    },
    handleSpaceClick() {
      uni.navigateTo({
        url: '/pages/personal-info/personal-info'
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../static/styles/iconfont.css';

.mine-container {
  min-height: 100vh;
  background-color: #f5f5f5;

  .user-info {
    background-color: #fff;
    padding: 30rpx;
    margin-bottom: 20rpx;

    .user-header {
      display: flex;
      margin-left: 30rpx;
      margin-right: 30rpx;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;

        .avatar {
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
          margin-right: 20rpx;
        }

        .user-detail {
          .name-level {
            display: flex;
            align-items: center;
            margin-bottom: 10rpx;

            .nickname {
              font-size: 32rpx;
              font-weight: bold;
              margin-right: 10rpx;
            }

            .level {
              font-size: 24rpx;
              color: #666;
              background-color: #f0f0f0;
              padding: 2rpx 10rpx;
              border-radius: 4rpx;
            }
          }

          .income-star {
            font-size: 24rpx;
            color: #666;

            .income {
              margin-right: 20rpx;
            }
          }
        }
      }

      .right {
        display: flex;
        align-items: center;
        color: #666;
        
        &:active {
          opacity: 0.7;
          transform: scale(0.98);
        }

        .space {
          font-size: 28rpx;
          margin-right: 10rpx;
        }

        .arrow {
          font-size: 24rpx;
        }
      }
    }

    .stats {
      display: flex;
      justify-content: space-around;
      margin-top: 30rpx;
      padding-top: 30rpx;
      border-top: 1rpx solid #eee;

      .stat-item {
        text-align: center;
        
        &:active {
          opacity: 0.7;
          transform: scale(0.98);
        }

        .number {
          font-size: 32rpx;
          font-weight: bold;
          margin-bottom: 10rpx;
          display: block;
        }

        .label {
          font-size: 24rpx;
          color: #666;
        }
      }
    }
  }

  .menu-list {
    background-color: #fff;
    padding: 20rpx;

    .menu-group {
      .group-title {
        font-size: 28rpx;
        color: #999;
        padding: 20rpx 30rpx;
      }

      .menu-items {
        display: flex;
        flex-wrap: wrap;
        
        .menu-item {
          width: 20%;
          padding: 20rpx;
          box-sizing: border-box;
          
          &:active {
            opacity: 0.7;
            transform: scale(0.98);
          }
          
          .item-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            .iconfont {
              font-size: 48rpx;
              color: #4080FF;
              margin-bottom: 10rpx;
              display: inline-block;
              width: 80rpx;
              height: 80rpx;
              line-height: 80rpx;
              text-align: center;
              background-color: #EBF3FF;
              border-radius: 50%;
            }

            .item-text {
              font-size: 24rpx;
              color: #333;
              margin-bottom: 10rpx;
            }
          }
        }
      }
    }
  }
}
</style>
