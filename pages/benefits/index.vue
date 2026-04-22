<template>
	<view class="benefits-page">
		<view class="hero">
			<view class="hero-title">会员权益中心</view>
			<view class="hero-desc">不同等级拥有不同权益，等级越高，专属福利越丰富。</view>
		</view>
		<view class="benefit-list">
			<view class="benefit-item" v-for="item in benefits" :key="item.title">
				<view class="benefit-left">
					<uni-icons :type="item.icon" size="20" color="#4a67ff" />
					<text class="benefit-title">{{ item.title }}</text>
				</view>
				<text class="benefit-tag">{{ item.level }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			benefits: [
				{ title: '每月积分加速', level: 'V1+', icon: 'star' },
				{ title: '课程优先预约', level: 'V2+', icon: 'calendar' },
				{ title: '专属客服通道', level: 'V3', icon: 'chatbubble' },
				{ title: '限量活动优先购', level: 'V2+', icon: 'flag' }
			]
		}
	}
}
</script>

<style>
.benefits-page {
	min-height: 100vh;
	padding: 30rpx;
	background: #f6f8ff;
	box-sizing: border-box;
}

.hero {
	padding: 28rpx;
	border-radius: 20rpx;
	background: linear-gradient(135deg, #4b6bff 0%, #7a8dff 100%);
	color: #fff;
}

.hero-title {
	font-size: 34rpx;
	font-weight: 600;
}

.hero-desc {
	margin-top: 10rpx;
	font-size: 24rpx;
	opacity: 0.95;
	line-height: 1.6;
}

.benefit-list {
	margin-top: 24rpx;
	padding: 10rpx 20rpx;
	border-radius: 20rpx;
	background: #fff;
}

.benefit-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 22rpx 0;
	border-bottom: 1px solid #eef1ff;
}

.benefit-item:last-child {
	border-bottom: none;
}

.benefit-left {
	display: flex;
	align-items: center;
	gap: 14rpx;
}

.benefit-title {
	font-size: 28rpx;
	color: #1f2333;
}

.benefit-tag {
	padding: 8rpx 16rpx;
	border-radius: 999rpx;
	font-size: 22rpx;
	color: #4b6bff;
	background: #edf1ff;
}
</style>
