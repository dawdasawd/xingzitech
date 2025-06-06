<template>
  <view class="personal-info-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="left" @tap="handleBack">
        <text class="back-arrow">〈</text>
      </view>
      <view class="title">{{userInfo.nickname}}</view>
      <view class="right">
        <view class="action-btn" @tap="handleStar">
          <text :class="['star-icon', {'active': isStarred}]">★</text>
        </view>
        <view class="action-btn" @tap="handleShare">
          <text class="share-icon">⇱</text>
        </view>
      </view>
    </view>
    <!-- 标签页切换 -->
    <view class="tabs">
      <view
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-item', { active: currentTab === index }]"
        @tap="switchTab(index)"
      >
        {{tab}}
      </view>
    </view>

    <!-- 主页内容 -->
    <view v-if="currentTab === 0">
      <!-- 基本信息区域 -->
      <view class="basic-info">
      <image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
      <view class="info-content">
        <view class="name-gender">
          <text class="nickname">{{userInfo.nickname}}</text>
          <text class="gender">{{userInfo.gender}}</text>
        </view>
        <view class="description">{{userInfo.description}}</view>
        <view class="tags">
          <text v-for="(tag, index) in userInfo.tags" :key="index" class="tag">{{tag}}</text>
        </view>
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
      <view class="stat-item">
        <text class="number">{{userInfo.stats.rating}}</text>
        <text class="label">评分</text>
      </view>
    </view>

    <!-- 认证信息 -->
    <view class="certification">
      <view class="section-title">认证信息</view>
      <view class="cert-content">
        <view class="cert-item">
          <text class="label">教育背景：</text>
          <text class="value">{{userInfo.certification.education}}</text>
        </view>
        <view class="cert-item">
          <text class="label">教学经验：</text>
          <text class="value">{{userInfo.certification.teachingExperience}}</text>
        </view>
        <view class="cert-item">
          <text class="label">教学科目：</text>
          <text class="value">{{userInfo.certification.subjects.join('、')}}</text>
        </view>
        <view class="cert-item">
          <text class="label">教学成就：</text>
          <text class="value">{{userInfo.certification.achievements.join('、')}}</text>
        </view>
        <view class="cert-item">
          <text class="label">持有证书：</text>
          <text class="value">{{userInfo.certification.certificates.join('、')}}</text>
        </view>
      </view>
    </view>

    <!-- 课程列表 -->
    <view class="courses">
      <view class="section-title">开设课程</view>
      <view class="course-list">
        <view v-for="(course, index) in userInfo.courses" :key="index" class="course-item">
          <view class="course-info">
            <text class="subject">{{course.subject}}</text>
            <view class="price-unit">
              <text class="price">¥{{course.price}}</text>
              <text class="unit">/{{course.unit}}</text>
            </view>
          </view>
          <view class="course-stats">
            <text class="rating">评分：{{course.rating}}</text>
            <text class="students">学生数：{{course.students}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
import personalInfo from '../../mock/personalInfo.json'

export default {
  data() {
    return {
      userInfo: {},
      isStarred: false,
      tabs: ['主页', '帖子'],
      currentTab: 0
    }
  },
  onLoad() {
    this.userInfo = personalInfo.userInfo
  },
  onShow() {
    // 每次显示页面时，默认显示主页标签
    this.currentTab = 0
  },
  methods: {
    handleBack() {
      uni.navigateBack()
    },
    handleStar() {
      this.isStarred = !this.isStarred
      uni.showToast({
        title: this.isStarred ? '已收藏' : '已取消收藏',
        icon: 'none'
      })
    },
    handleShare() {
      uni.showShareMenu({
        withShareTicket: true
      })
    },
    switchTab(index) {
      this.currentTab = index
    }
  },
}
</script>

<style lang="scss">
.personal-info-container {
  min-height: 100vh;
  background-color: #f5f5f5;

  .tabs {
    display: flex;
    background-color: #fff;
    padding: 0 30rpx;
    border-bottom: 1rpx solid #eee;

    .tab-item {
      position: relative;
      padding: 24rpx 40rpx;
      font-size: 30rpx;
      color: #666;
      margin-right: 40rpx;

      &.active {
        color: #333;
        font-weight: 600;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 48rpx;
          height: 4rpx;
          background-color: #333;
          border-radius: 2rpx;
        }
      }
    }
  }

  .nav-bar {
    // position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 88rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    // padding: 0 20rpx;
    z-index: 100;

    .left {
      width: 60rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      .back-arrow {
        font-size: 32rpx;
        color: #333;
      }
    }

    .title {
      flex: 1;
      text-align: center;
      font-size: 36rpx;
      font-weight: 600;
      color: #333;
      margin: 0 20rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .right {
      display: flex;
      align-items: center;
      gap: 20rpx;

      .action-btn {
        width: 60rpx;
        height: 60rpx;
        display: flex;
        align-items: center;
        justify-content: center;

        .star-icon, .share-icon {
          font-size: 40rpx;
          color: #333;

          &.active {
            color: #FFD700;
          }
        }
      }
    }
  }

  padding: 108rpx 20rpx 20rpx;

  .basic-info {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    display: flex;

    .avatar {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      margin-right: 30rpx;
    }

    .info-content {
      flex: 1;

      .name-gender {
        display: flex;
        align-items: center;
        margin-bottom: 16rpx;

        .nickname {
          font-size: 36rpx;
          font-weight: bold;
          margin-right: 20rpx;
        }

        .gender {
          font-size: 24rpx;
          color: #666;
          background-color: #f0f0f0;
          padding: 4rpx 16rpx;
          border-radius: 20rpx;
        }
      }

      .description {
        font-size: 28rpx;
        color: #333;
        line-height: 1.5;
        margin-bottom: 16rpx;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;

        .tag {
          font-size: 24rpx;
          color: #4080FF;
          background-color: #EBF3FF;
          padding: 6rpx 20rpx;
          border-radius: 20rpx;
          margin-right: 16rpx;
          margin-bottom: 12rpx;
        }
      }
    }
  }

  .stats {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    display: flex;
    justify-content: space-around;

    .stat-item {
      text-align: center;

      .number {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
        display: block;
        margin-bottom: 8rpx;
      }

      .label {
        font-size: 24rpx;
        color: #666;
      }
    }
  }

  .certification, .courses {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;

    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
    }
  }

  .certification {
    .cert-content {
      .cert-item {
        display: flex;
        margin-bottom: 16rpx;

        .label {
          font-size: 28rpx;
          color: #666;
          width: 160rpx;
          flex-shrink: 0;
        }

        .value {
          font-size: 28rpx;
          color: #333;
          flex: 1;
        }
      }
    }
  }

  .courses {
    .course-list {
      .course-item {
        background-color: #f8f8f8;
        border-radius: 8rpx;
        padding: 20rpx;
        margin-bottom: 16rpx;

        .course-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12rpx;

          .subject {
            font-size: 30rpx;
            font-weight: bold;
            color: #333;
          }

          .price-unit {
            .price {
              font-size: 32rpx;
              color: #ff6b6b;
              font-weight: bold;
            }

            .unit {
              font-size: 24rpx;
              color: #999;
            }
          }
        }

        .course-stats {
          display: flex;
          justify-content: space-between;
          font-size: 24rpx;
          color: #666;

          .rating, .students {
            background-color: #fff;
            padding: 4rpx 12rpx;
            border-radius: 4rpx;
          }
        }
      }
    }
  }
}
</style>
