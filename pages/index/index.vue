<template>
	<view class="page">
		<!-- 顶部导师/学生切换 -->
		<view class="top-tabs">
			<u-tabs 
				:list="tabList" 
				:current="currentTab" 
				@change="switchTab"
				:scrollable="false"
				lineColor="#4285f4"
				lineWidth="30"
				lineHeight="3"
				activeStyle="color: #333; font-weight: bold; font-size: 36rpx"
				inactiveStyle="color: #333; font-weight: bold; font-size: 36rpx"
			></u-tabs>
		</view>

		<!-- 筛选表单 -->
		<view class="filter-form">
			<view class="form-row">
				<view class="form-item city-form-item">
					<text class="form-label">城市地区</text>
					<view class="picker-wrapper">
						<text class="picker-text" @tap.stop="showPickerByTap('city', $event)">{{cityOptions[cityIndex]}}</text>
						<text class="picker-arrow">∨</text>
						<!-- 城市选择弹窗 -->
						<view class="popup-content" v-if="showPopup && currentPickerType === 'city'" @click.stop>
							<view class="popup-arrow"></view>
							<view class="popup-grid">
								<view 
									class="popup-item" 
									v-for="(item, index) in currentOptions" 
									:key="index"
									@click="selectOption(index)"
								>
									<text class="popup-item-text">{{item}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="form-item grade-form-item">
					<text class="form-label">学段</text>
					<view class="picker-wrapper">
						<text class="picker-text" @tap.stop="showPickerByTap('grade', $event)">{{gradeOptions[gradeIndex]}}</text>
						<text class="picker-arrow">∨</text>
						<!-- 学段选择弹窗 -->
						<view class="popup-content" v-if="showPopup && currentPickerType === 'grade'" @click.stop>
							<view class="popup-arrow"></view>
							<view class="popup-grid">
								<view 
									class="popup-item" 
									v-for="(item, index) in currentOptions" 
									:key="index"
									@click="selectOption(index)"
								>
									<text class="popup-item-text">{{item}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="form-item subject-form-item">
					<text class="form-label">学科</text>
					<view class="picker-wrapper">
						<text class="picker-text" @tap.stop="showPickerByTap('subject', $event)">{{subjectOptions[subjectIndex]}}</text>
						<text class="picker-arrow">∨</text>
						<!-- 学科选择弹窗 -->
						<view class="popup-content" v-if="showPopup && currentPickerType === 'subject'" @click.stop>
							<view class="popup-arrow"></view>
							<view class="popup-grid">
								<view 
									class="popup-item" 
									v-for="(item, index) in currentOptions" 
									:key="index"
									@click="selectOption(index)"
								>
									<text class="popup-item-text">{{item}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 时间选择区域 -->
			<view class="time-section">
				<view class="time-header">
					<text class="selected-time">{{selectedDay}} {{selectedPeriod}}</text>
					<view class="multi-time-toggle">
						<text class="toggle-text">多时段选课</text>
						<u-switch 
							v-model="multiTimeMode" 
							@change="toggleMultiTime"
							size="25"
							activeColor="#4285f4"
						></u-switch>
					</view>
				</view>
				
				<view class="time-options">
					<view 
						class="time-option" 
						:class="{active: option.day === selectedDay && option.period === selectedPeriod}"
						v-for="option in timeOptions" 
						:key="option.id"
						@click="selectTime(option)"
					>
						<text class="time-text">{{option.day}}{{option.period}}</text>
					</view>
				</view>
			</view>

			<!-- 查询按钮 -->
			<u-button 
				@click="handleSearch"
				color="#4285f4"
				shape="circle"
				size="large"
				:customStyle="{marginTop: '30rpx'}"
			>
				查询
			</u-button>
		</view>

		<!-- 点击遮罩关闭弹窗 -->
		<view class="popup-mask" v-if="showPopup" @click="hidePopup"></view>
	</view>
</template>

<script>
import subjectData from '@/mock/subject_mock.json'

export default {
	data() {
		return {
			// tabs数据
			tabList: [
				{name: '我是学生'},
				{name: '我是导师'}
			],
			currentTab: 0,
			activeTab: 'student',
			
			// picker相关
			cityIndex: 0,
			cityOptions: ['海淀区', '朝阳区', '东城区', '西城区', '丰台区', '昌平区', '大兴区', '通州区'],
			gradeIndex: 0,
			gradeOptions: ['三年级', '一年级', '二年级', '四年级', '五年级', '六年级', '初一', '初二'],
			subjectIndex: 0,
			subjectOptions: [],  // 将在onLoad中填充
			
			selectedDay: '周六',
			selectedPeriod: '上午',
			multiTimeMode: false,
			timeOptions: [
				{id: 1, day: '周五', period: '晚上'},
				{id: 2, day: '周六', period: '上午'},
				{id: 3, day: '周六', period: '下午'},
				{id: 4, day: '周日', period: '上午'},
				{id: 5, day: '周日', period: '下午'}
			],
			
			// 弹窗相关
			showPopup: false,
			currentPickerType: '',
			currentOptions: [],
			popupStyle: {},
			windowWidth: 0
		}
	},
	onLoad() {
		// 获取系统信息
		uni.getSystemInfo({
			success: (res) => {
				this.windowWidth = res.windowWidth;
			}
		});
		
		// 从JSON文件加载学科数据
		this.subjectOptions = subjectData.data;
	},
	methods: {
		switchTab(item) {
			this.currentTab = item.index;
			this.activeTab = item.index === 0 ? 'student' : 'teacher';
		},
		
		showPickerByTap(type, event) {
			// 设置当前选项
			switch(type) {
				case 'city':
					this.currentOptions = this.cityOptions;
					break;
				case 'grade':
					this.currentOptions = this.gradeOptions;
					break;
				case 'subject':
					this.currentOptions = this.subjectOptions;
					break;
			}
			
			this.currentPickerType = type;
			this.showPopup = true;
		},
		
		hidePopup() {
			this.showPopup = false;
		},
		
		selectOption(index) {
			switch(this.currentPickerType) {
				case 'city':
					this.cityIndex = index;
					break;
				case 'grade':
					this.gradeIndex = index;
					break;
				case 'subject':
					this.subjectIndex = index;
					break;
			}
			this.hidePopup();
		},
		
		selectTime(option) {
			this.selectedDay = option.day;
			this.selectedPeriod = option.period;
		},
		
		toggleMultiTime(val) {
			this.multiTimeMode = val;
		},
		
		handleSearch() {
			const searchParams = {
				userType: this.activeTab,
				city: this.cityOptions[this.cityIndex],
				grade: this.gradeOptions[this.gradeIndex],
				subject: this.subjectOptions[this.subjectIndex],
				time: this.selectedDay + this.selectedPeriod,
				multiTime: this.multiTimeMode
			};
			
			// 跳转到搜索结果页面
			uni.navigateTo({
				url: '/pages/search-results/search-results'
			});
		}
	}
}
</script>

<style>
	.page {
		background-color: #f5f5f5;
		min-height: 100vh;
		padding-top: 20rpx;
		position: relative;
	}

	/* 顶部标签页 */
	.top-tabs {
		padding: 0 40rpx;
		margin-bottom: 40rpx;
	}

	/* 筛选表单 */
	.filter-form {
		background-color: white;
		margin: 0 40rpx;
		border-radius: 20rpx;
		padding: 40rpx 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.1);
	}

	.form-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 40rpx;
	}

	.form-item {
		flex: 1;
		margin: 0 10rpx;
	}

	.form-label {
		display: block;
		font-size: 32rpx;
		color: #666;
		margin-bottom: 15rpx;
		font-weight: 500;
	}

	.picker-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
		border-bottom: 2rpx solid #f0f0f0;
		cursor: pointer;
		position: relative;
	}

	.picker-text {
		font-size: 34rpx;
		color: #333;
		font-weight: 500;
		padding: 20rpx 0;
	}

	.picker-arrow {
		font-size: 28rpx;
		color: #999;
	}

	/* 时间选择区域 */
	.time-section {
		margin-bottom: 50rpx;
	}

	.time-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.selected-time {
		font-size: 40rpx;
		color: #333;
		font-weight: bold;
	}

	.multi-time-toggle {
		display: flex;
		align-items: center;
	}

	.toggle-text {
		font-size: 30rpx;
		color: #666;
		margin-right: 15rpx;
	}

	.time-options {
		display: flex;
		overflow-x: auto;
		gap: 20rpx;
		padding-bottom: 10rpx;
	}

	.time-option {
		flex-shrink: 0;
		min-width: 120rpx;
		text-align: center;
		padding: 20rpx 30rpx;
		border-radius: 25rpx;
		background-color: #f5f5f5;
		border: 2rpx solid transparent;
	}

	.time-option.active {
		background-color: #e8f4fd;
		border: 2rpx solid #4285f4;
	}

	.time-text {
		font-size: 32rpx;
		color: #999;
		font-weight: 500;
		white-space: nowrap;
	}

	.time-option.active .time-text {
		color: #4285f4;
		font-weight: bold;
	}

	/* 自定义弹窗 */
	.popup-content {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		background-color: white;
		border-radius: 16rpx;
		padding: 30rpx 20rpx 20rpx;
		box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.15);
		border: 1rpx solid #e0e0e0;
		z-index: 999;
		margin-top: 4px;
		width: 80vw;
	}

	.popup-arrow {
		position: absolute;
		top: -12rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 12rpx solid transparent;
		border-right: 12rpx solid transparent;
		border-bottom: 12rpx solid white;
		filter: drop-shadow(0 -2rpx 4rpx rgba(0, 0, 0, 0.1));
	}

	.popup-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 15rpx;
	}

	.popup-item {
		text-align: center;
		padding: 20rpx 8rpx;
		border-radius: 12rpx;
		background-color: #fafafa;
		border: 2rpx solid #f0f0f0;
		transition: all 0.2s ease;
	}

	.popup-item:active {
		background-color: #e3f2fd;
		border-color: #4285f4;
		transform: scale(0.95);
	}

	.popup-item-text {
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* 点击遮罩关闭弹窗 */
	.popup-mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: transparent;
		z-index: 998;
	}
</style>
