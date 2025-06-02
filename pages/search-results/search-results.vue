<template>
	<view class="page">
		<!-- 顶部搜索栏 -->
		<view class="search-bar">
			<view class="location">
				<text class="city">北京</text>
				<u-icon name="arrow-right" size="28" color="#999"></u-icon>
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
			<view class="option" :class="{active: currentSort === 'smart'}" @click="showSortPopup('smart')">
				<text>智能排序</text>
				<u-icon name="arrow-down" size="24" :color="currentSort === 'smart' ? '#4285f4' : '#666'"></u-icon>
			</view>
			<view class="option" :class="{active: currentSort === 'rating'}" @click="showSortPopup('rating')">
				<text>星级·评分</text>
				<u-icon name="arrow-down" size="24" :color="currentSort === 'rating' ? '#4285f4' : '#666'"></u-icon>
			</view>
			<view class="option" :class="{active: currentSort === 'price'}" @click="showSortPopup('price')">
				<text>价格</text>
				<u-icon name="arrow-down" size="24" :color="currentSort === 'price' ? '#4285f4' : '#666'"></u-icon>
			</view>
			<view class="option" :class="{active: currentSort === 'filter'}" @click="showSortPopup('filter')">
				<text>筛选</text>
				<u-icon name="arrow-down" size="24" :color="currentSort === 'filter' ? '#4285f4' : '#666'"></u-icon>
			</view>
		</view>

		<!-- 排序弹出层 -->
		<view class="sort-popup" v-if="showPopup" @click.stop>
			<view class="popup-mask" :style="{ top: popupTop + 'px' }" @click="closePopup"></view>
			<view class="popup-content" :style="{ top: popupTop + 'px' }">
				<view 
					class="sort-item" 
					v-for="(item, index) in sortOptions" 
					:key="index"
					:class="{ active: item.value === selectedSort }"
					@click="selectSort(item)"
				>
					<text class="sort-text">{{item.label}}</text>
					<text v-if="item.desc" class="sort-desc">{{item.desc}}</text>
					<u-icon v-if="item.value === selectedSort" name="checkmark" color="#4285f4" size="32"></u-icon>
				</view>
			</view>
		</view>
		
		<!-- 教师列表 -->
		<view class="teacher-list">
			<view class="teacher-card" v-for="(item, index) in teachers" :key="index">
				<view class="teacher-info">
					<image class="avatar" :src="item.course_card.user_info.avatar_url || '/static/image/search.png'" mode="aspectFill"></image>
					<view class="info-content">
						<view class="name-wrap">
							<text class="name">{{item.course_card.user_info.username}}</text>
							<image v-if="item.course_card.user_info.is_verified" class="verified-icon" src="/static/image/search.png" mode="aspectFit"></image>
						</view>
						<view class="stats">
							<text v-for="(tag, tagIndex) in item.course_card.user_info.tags" :key="tagIndex" class="stat">{{tag}}</text>
							<text class="stat">{{item.course_card.user_info.status}}</text>
						</view>
						<text class="description">{{item.course_card.user_info.profile}}</text>
					</view>
				</view>
				<view class="right-content">
					<text class="subject">{{item.course_card.course_info.subject || '暂无科目'}}</text>
					<text class="price">{{item.course_card.course_info.hourly_rate}}元/h</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import teacherListData from '@/mock/teacher_list_search_mock.json'

export default {
	data() {
		return {
			currentSort: 'smart',
			showPopup: false,
			selectedSort: 'smart',
			popupTop: 0,
			sortOptions: [
				{ label: '智能排序', value: 'smart' },
				{ label: '好评优先', value: 'rating', desc: '高分→低分' },
				{ label: '评价数', value: 'comment', desc: '评论多→评论少' },
				{ label: '经验优先', value: 'experience', desc: '上课多→上课少' },
				{ label: '低价优先', value: 'price_asc' },
				{ label: '高价优先', value: 'price_desc' }
			],
			teachers: []
		}
	},
	onLoad() {
		// 直接使用 mock 数据文件中的数据
		this.teachers = teacherListData.data.recommend_list;
	},
	methods: {
		handleSearchClick() {
			// 处理搜索框点击
		},
		showSortPopup(type) {
			if (type === 'smart') {
				// 获取排序选项的位置
				const query = uni.createSelectorQuery().in(this);
				query.select('.sort-options').boundingClientRect(data => {
					this.popupTop = data.bottom;
					this.showPopup = true;
				}).exec();
			}
		},
		closePopup() {
			this.showPopup = false;
		},
		selectSort(item) {
			this.selectedSort = item.value;
			this.currentSort = 'smart';
			this.closePopup();
			// 这里可以添加排序逻辑
			this.sortTeachers(item.value);
		},
		sortTeachers(sortType) {
			// 根据不同的排序类型对教师列表进行排序
			switch(sortType) {
				case 'rating':
					// 按评分排序
					break;
				case 'comment':
					// 按评价数排序
					break;
				case 'experience':
					// 按经验排序
					break;
				case 'price_asc':
					// 按价格升序
					break;
				case 'price_desc':
					// 按价格降序
					break;
				default:
					// 智能排序
					break;
			}
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

.sort-popup {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 100;
	pointer-events: none;
}

.popup-mask {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.4);
	pointer-events: auto;
}

.popup-content {
	position: absolute;
	left: 0;
	right: 0;
	background-color: #fff;
	z-index: 101;
	pointer-events: auto;
}

.sort-item {
	position: relative;
	padding: 30rpx;
	display: flex;
	align-items: center;
	border-bottom: 2rpx solid #f5f5f5;
}

.sort-item.active {
	color: #4285f4;
}

.sort-text {
	font-size: 28rpx;
	flex: 1;
}

.sort-desc {
	font-size: 24rpx;
	color: #999;
	margin-left: 20rpx;
}

.sort-item.active .sort-text {
	color: #4285f4;
	font-weight: 500;
}

.teacher-list {
	padding: 20rpx 30rpx;
}

.teacher-card {
	background-color: #fff;
	border-radius: 32rpx;
	padding: 24rpx 30rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.02);
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}

.teacher-info {
	flex: 1;
	margin-right: 20rpx;
}

.avatar {
	width: 72rpx;
	height: 72rpx;
	border-radius: 50%;
	margin-right: 16rpx;
	border: 1px solid #f5f5f5;
}

.info-content {
	flex: 1;
}

.name-wrap {
	display: flex;
	align-items: center;
	margin-bottom: 16rpx;
}

.name {
	font-size: 32rpx;
	color: #333;
	margin-right: 12rpx;
	font-weight: 600;
}

.verified-icon {
	width: 36rpx;
	height: 36rpx;
	color: #4285f4;
}

.stats {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
	margin-bottom: 16rpx;
}

.stat {
	font-size: 26rpx;
	color: #4285f4;
	background-color: rgba(66, 133, 244, 0.1);
	padding: 8rpx 24rpx;
	border-radius: 100rpx;
}

.description {
	font-size: 28rpx;
	color: #999;
	line-height: 1.4;
}

.right-content {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 16rpx;
}

.subject {
	font-size: 32rpx;
	color: #333;
	font-weight: 600;
}

.price {
	font-size: 40rpx;
	color: #4285f4;
	font-weight: bold;
	background-color: rgba(66, 133, 244, 0.1);
	padding: 12rpx 36rpx;
	border-radius: 100rpx;
	min-width: 200rpx;
	text-align: center;
}
</style> 