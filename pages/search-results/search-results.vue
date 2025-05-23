<template>
	<view class="page">
		<!-- 顶部搜索栏 -->
		<view class="search-bar">
			<view class="location">
				<text class="city">北京</text>
				<text class="arrow">></text>
			</view>
			<view class="search-input">
				<u-search
					placeholder="请输入搜索关键词"
					:showAction="false"
					:disabled="true"
					@click="handleSearchClick"
				></u-search>
			</view>
		</view>
		
		<!-- 筛选标签 -->
		<view class="filter-tags">
			<view class="tag">
				<text>海淀区</text>
				<text class="separator">|</text>
				<text>三年级</text>
				<text class="separator">|</text>
				<text>英语后蒙</text>
				<text class="separator">|</text>
				<text>周六上午 周六下午</text>
			</view>
		</view>
		
		<!-- 排序选项 -->
		<view class="sort-options">
			<view class="option" :class="{active: currentSort === 'smart'}" @click="setSort('smart')">
				<text>智能排序</text>
				<text class="arrow-down" v-if="currentSort === 'smart'">▼</text>
			</view>
			<view class="option" :class="{active: currentSort === 'rating'}" @click="setSort('rating')">
				<text>星级·评分</text>
				<text class="arrow-down" v-if="currentSort === 'rating'">▼</text>
			</view>
			<view class="option" :class="{active: currentSort === 'price'}" @click="setSort('price')">
				<text>价格</text>
				<text class="arrow-down" v-if="currentSort === 'price'">▼</text>
			</view>
			<view class="option" :class="{active: currentSort === 'filter'}" @click="setSort('filter')">
				<text>筛选</text>
				<text class="arrow-down" v-if="currentSort === 'filter'">▼</text>
			</view>
		</view>
		
		<!-- 教师列表 -->
		<view class="teacher-list">
			<view class="teacher-card" v-for="(teacher, index) in teachers" :key="index">
				<view class="teacher-info">
					<image class="avatar" :src="teacher.avatar" mode="aspectFill"></image>
					<view class="info-content">
						<view class="name-wrap">
							<text class="name">{{teacher.name}}</text>
							<image class="verified-icon" src="/static/image/search.png" mode="aspectFit"></image>
						</view>
						<view class="stats">
							<text class="stat">{{teacher.rating}}</text>
							<text class="stat">{{teacher.students}}</text>
							<text class="stat">{{teacher.experience}}</text>
						</view>
						<text class="description">{{teacher.description}}</text>
					</view>
				</view>
				<view class="subject-price">
					<text class="subject">{{teacher.subject}}</text>
					<text class="price">{{teacher.price}}/h</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentSort: 'smart',
			teachers: [
				{
					avatar: '/static/image/home_icon.png',
					name: '我是LUKA',
					rating: '985',
					students: '211',
					experience: '六年经验',
					description: '清华大学硕士在读，六年家教经验',
					subject: '高中化学',
					price: '200'
				},
				// 重复相同的数据以展示多个教师卡片
				{
					avatar: '/static/image/home_icon.png',
					name: '我是LUKA',
					rating: '985',
					students: '211',
					experience: '六年经验',
					description: '清华大学硕士在读，六年家教经验',
					subject: '高中化学',
					price: '200'
				},
				{
					avatar: '/static/image/home_icon.png',
					name: '我是LUKA',
					rating: '985',
					students: '211',
					experience: '六年经验',
					description: '清华大学硕士在读，六年家教经验',
					subject: '高中化学',
					price: '200'
				}
			]
		}
	},
	methods: {
		handleSearchClick() {
			// 处理搜索框点击
		},
		setSort(type) {
			this.currentSort = type;
		}
	}
}
</script>

<style>
.page {
	background-color: #f5f5f5;
	min-height: 100vh;
}

.search-bar {
	background-color: #fff;
	padding: 20rpx 30rpx;
	display: flex;
	align-items: center;
}

.location {
	display: flex;
	align-items: center;
	margin-right: 20rpx;
}

.city {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
}

.arrow {
	font-size: 24rpx;
	color: #999;
	margin-left: 8rpx;
}

.search-input {
	flex: 1;
}

.filter-tags {
	background-color: #fff;
	padding: 20rpx 30rpx;
	border-bottom: 2rpx solid #f0f0f0;
}

.tag {
	font-size: 28rpx;
	color: #666;
}

.separator {
	margin: 0 10rpx;
	color: #ddd;
}

.sort-options {
	display: flex;
	background-color: #fff;
	padding: 20rpx 0;
	margin-bottom: 20rpx;
}

.option {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 28rpx;
	color: #666;
}

.option.active {
	color: #4285f4;
}

.arrow-down {
	font-size: 24rpx;
	margin-left: 4rpx;
}

.teacher-list {
	padding: 0 30rpx;
}

.teacher-card {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
}

.teacher-info {
	display: flex;
	margin-bottom: 20rpx;
}

.avatar {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	margin-right: 20rpx;
}

.info-content {
	flex: 1;
}

.name-wrap {
	display: flex;
	align-items: center;
	margin-bottom: 10rpx;
}

.name {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-right: 10rpx;
}

.verified-icon {
	width: 32rpx;
	height: 32rpx;
}

.stats {
	margin-bottom: 10rpx;
}

.stat {
	font-size: 24rpx;
	color: #666;
	background-color: #f5f7fa;
	padding: 4rpx 16rpx;
	border-radius: 20rpx;
	margin-right: 16rpx;
}

.description {
	font-size: 26rpx;
	color: #999;
}

.subject-price {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 2rpx solid #f0f0f0;
	padding-top: 20rpx;
}

.subject {
	font-size: 30rpx;
	color: #333;
	font-weight: 500;
}

.price {
	font-size: 36rpx;
	color: #4285f4;
	font-weight: bold;
}
</style> 