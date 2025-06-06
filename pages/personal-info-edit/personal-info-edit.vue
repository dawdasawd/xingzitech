<template>
  <view class="edit-container">
    <view class="steps">
      <text class="step active">编辑资料</text>
      <text class="separator">—</text>
      <text class="step">个人认证</text>
      <text class="separator">—</text>
      <text class="step">课程信息</text>
    </view>

    <view class="avatar-section">
      <image class="avatar" :src="formData.avatar" mode="aspectFill" @tap="chooseImage"></image>
      <view class="edit-icon">
        <text class="iconfont icon-edit"></text>
      </view>
    </view>

    <view class="form-section">
      <view v-for="(field, index) in fields" :key="index" class="form-item">
        <text class="label">
          <text v-if="field.required" class="required">*</text>
          {{field.label}}
        </text>

        <!-- 文本输入 -->
        <input
          v-if="field.type === 'text'"
          v-model="formData[field.key]"
          :placeholder="field.placeholder"
          :maxlength="field.maxLength"
          class="input"
        />

        <!-- 单选框 -->
        <view v-if="field.type === 'radio'" class="radio-group">
          <view
            v-for="(option, idx) in field.options"
            :key="idx"
            class="radio-item"
            :class="{ active: formData[field.key] === option.value }"
            @tap="handleRadioChange(field.key, option.value)"
          >
            {{option.label}}
          </view>
        </view>

        <!-- 文本域 -->
        <textarea
          v-if="field.type === 'textarea'"
          v-model="formData[field.key]"
          :placeholder="field.placeholder"
          :maxlength="field.maxLength"
          class="textarea"
        />

        <!-- 标签输入 -->
        <view v-if="field.type === 'tags'" class="tags-section">
          <view class="tags-list">
            <view
              v-for="(tag, tagIndex) in formData[field.key] || []"
              :key="tagIndex"
              class="tag"
              :class="{ active: true }"
              @tap="removeTag(field.key, tagIndex)"
            >
              {{tag}}
            </view>
            <view
              v-if="(formData[field.key] || []).length < field.maxTags"
              class="add-tag"
              @tap="showTagInput = field.key"
            >
              <text>+</text>
              <text>待添加</text>
            </view>
          </view>
          <input
            v-if="showTagInput === field.key"
            v-model="newTag"
            :placeholder="field.placeholder"
            :maxlength="field.maxLength"
            class="tag-input"
            @blur="handleTagBlur(field)"
            @confirm="handleTagConfirm(field)"
          />
        </view>
      </view>
    </view>

    <view class="stats-section">
      <view
        v-for="(stat, index) in stats"
        :key="index"
        class="stat-item"
        :class="{ active: stat.value }"
      >
        {{stat.label}}
      </view>
    </view>

    <view class="button-section">
      <button class="next-button" @tap="handleNext">下一步</button>
    </view>
  </view>
</template>

<script>
import personalInfoData from '../../mock/personalInfoEdit.json'

export default {
  data() {
    return {
      fields: personalInfoData.fields,
      stats: personalInfoData.stats,
      formData: {
        avatar: personalInfoData.avatar,
        name: '',
        gender: '',
        description: '',
        tags: []
      },
      showTagInput: '',
      newTag: ''
    }
  },
  methods: {
    chooseImage() {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          this.formData.avatar = res.tempFilePaths[0]
        }
      })
    },
    handleRadioChange(key, value) {
      this.formData[key] = value
    },
    handleTagBlur(field) {
      if (this.newTag) {
        this.addTag(field)
      }
      this.showTagInput = ''
      this.newTag = ''
    },
    handleTagConfirm(field) {
      if (this.newTag) {
        this.addTag(field)
      }
      this.showTagInput = ''
      this.newTag = ''
    },
    addTag(field) {
      if (!this.formData[field.key]) {
        this.formData[field.key] = []
      }
      if (this.formData[field.key].length < field.maxTags && !this.formData[field.key].includes(this.newTag)) {
        this.formData[field.key].push(this.newTag)
      }
    },
    removeTag(key, index) {
      this.formData[key].splice(index, 1)
    },
    handleNext() {
      // 表单验证
      let isValid = true
      let message = ''

      for (const field of this.fields) {
        if (field.required) {
          const value = this.formData[field.key]
          if (!value || (Array.isArray(value) && value.length === 0)) {
            isValid = false
            message = `请填写${field.label}`
            break
          }
        }
      }

      if (!isValid) {
        uni.showToast({
          title: message,
          icon: 'none'
        })
        return
      }

      // 跳转到下一步
      uni.navigateTo({
        url: '/pages/personal-certification/personal-certification'
      })
    }
  }
}
</script>

<style lang="scss">
.edit-container {
  min-height: 100vh;
  background-color: #fff;
  padding: 30rpx;

  .steps {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40rpx;

    .step {
      font-size: 28rpx;
      color: #999;

      &.active {
        color: #4080FF;
        font-weight: bold;
      }
    }

    .separator {
      margin: 0 20rpx;
      color: #999;
    }
  }

  .avatar-section {
    position: relative;
    width: 200rpx;
    height: 200rpx;
    margin: 0 auto 40rpx;

    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .edit-icon {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 60rpx;
      height: 60rpx;
      background-color: #4080FF;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      .iconfont {
        color: #fff;
        font-size: 32rpx;
      }
    }
  }

  .form-section {
    .form-item {
      margin-bottom: 30rpx;

      .label {
        display: block;
        margin-bottom: 20rpx;
        font-size: 28rpx;
        color: #333;

        .required {
          color: #ff4d4f;
          margin-right: 4rpx;
        }
      }

      .input {
        width: 100%;
        height: 80rpx;
        background-color: #f5f5f5;
        border-radius: 8rpx;
        padding: 0 20rpx;
        font-size: 28rpx;
      }

      .radio-group {
        display: flex;
        gap: 20rpx;

        .radio-item {
          padding: 20rpx 40rpx;
          background-color: #f5f5f5;
          border-radius: 8rpx;
          font-size: 28rpx;
          color: #666;

          &.active {
            background-color: #4080FF;
            color: #fff;
          }

          &:active {
            opacity: 0.8;
          }
        }
      }

      .textarea {
        width: 100%;
        height: 200rpx;
        background-color: #f5f5f5;
        border-radius: 8rpx;
        padding: 20rpx;
        font-size: 28rpx;
      }

      .tags-section {
        .tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20rpx;
          margin-bottom: 20rpx;

          .tag {
            padding: 10rpx 30rpx;
            background-color: #f5f5f5;
            border-radius: 30rpx;
            font-size: 24rpx;
            color: #666;

            &.active {
              background-color: #4080FF;
              color: #fff;
            }

            &:active {
              opacity: 0.8;
            }
          }

          .add-tag {
            padding: 10rpx 30rpx;
            background-color: #f5f5f5;
            border-radius: 30rpx;
            font-size: 24rpx;
            color: #999;
            display: flex;
            align-items: center;
            gap: 4rpx;

            &:active {
              opacity: 0.8;
            }
          }
        }

        .tag-input {
          width: 100%;
          height: 60rpx;
          background-color: #f5f5f5;
          border-radius: 8rpx;
          padding: 0 20rpx;
          font-size: 24rpx;
        }
      }
    }
  }

  .stats-section {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    margin-bottom: 60rpx;

    .stat-item {
      padding: 10rpx 30rpx;
      background-color: #f5f5f5;
      border-radius: 30rpx;
      font-size: 24rpx;
      color: #666;

      &.active {
        background-color: #4080FF;
        color: #fff;
      }
    }
  }

  .button-section {
    .next-button {
      width: 100%;
      height: 88rpx;
      background-color: #4080FF;
      color: #fff;
      font-size: 32rpx;
      border-radius: 44rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>