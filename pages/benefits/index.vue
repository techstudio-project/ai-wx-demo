<template>
	<view class="benefits-page">
		<view class="hero">
			<view class="hero-top">
				<view class="hero-title">会员权益中心</view>
				<view class="hero-current">当前：{{ currentLevelName }}</view>
			</view>
			<view class="hero-desc">选择适合你的会员等级，解锁更高阶学习权益。</view>
		</view>

		<swiper
			class="plan-swiper"
			:current="currentIndex"
			:previous-margin="swiperMargin"
			:next-margin="swiperMargin"
			:circular="false"
			@change="onPlanChange"
		>
			<swiper-item v-for="(plan, index) in plans" :key="plan.level">
					<view class="plan-card" :style="{ background: plan.background }">
						<view v-if="isCurrentPlan(plan)" class="current-tag">当前等级</view>
						<view class="plan-header">
							<view class="plan-name-wrap">
								<view class="plan-name">{{ plan.name }}</view>
								<view class="plan-sub">尊享会员权益</view>
							</view>
							<view class="plan-level">{{ plan.level }}</view>
						</view>
						<view class="plan-price-wrap">
							<text class="price-sign">¥</text>
							<text class="plan-price">{{ plan.price }}</text>
							<text class="price-unit">/{{ plan.period }}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>

		<view class="dots">
			<view
				v-for="(item, index) in plans"
				:key="item.level"
				class="dot"
				:class="{ active: currentIndex === index }"
			></view>
		</view>

		<view class="benefit-panel">
			<view class="panel-title">{{ activePlan.level }} {{ activePlan.name }} 专属权益</view>
			<view v-for="benefit in activePlan.benefits" :key="benefit" class="benefit-item">
				<uni-icons type="checkbox-filled" size="16" color="#4f6cff" />
				<text class="benefit-text">{{ benefit }}</text>
			</view>
		</view>

		<view class="buy-bar">
			<view class="buy-price">¥{{ activePlan.price }} / {{ activePlan.period }}</view>
			<button class="buy-btn" :class="{ disabled: !canPurchaseActivePlan }" @click="buyMembership">
				{{ buyButtonText }}
			</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentUserLevel: 'v2',
			currentIndex: 0,
			swiperMargin: '28rpx',
			plans: [
					{
						level: 'V1',
						levelKey: 'v1',
						rank: 1,
						name: '青铜会员',
					price: 39,
					period: '月',
					background: 'linear-gradient(135deg, #9c7b63 0%, #c09f86 100%)',
					benefits: ['积分获取 1.2 倍', '课程预约优先提醒', '每月 1 张专属优惠券']
				},
					{
						level: 'V2',
						levelKey: 'v2',
						rank: 2,
					name: '白银会员',
					price: 99,
					period: '季',
					background: 'linear-gradient(135deg, #2f5f93 0%, #5a8fc6 100%)',
					benefits: ['积分获取 1.6 倍', '热门课程优先预约', '专属学习顾问 1v1 答疑']
				},
					{
						level: 'V3',
						levelKey: 'v3',
						rank: 3,
					name: '黑金会员',
					price: 299,
					period: '年',
					background: 'linear-gradient(135deg, #1d1f25 0%, #3b3f4b 55%, #7b6643 100%)',
					benefits: ['积分获取 2 倍', '全部课程优先名额', '专属客服绿色通道', '线下活动优先席位']
				}
			]
		}
	},
	computed: {
		activePlan() {
			return this.plans[this.currentIndex] || this.plans[0]
		},
		currentUserRank() {
			const plan = this.plans.find((item) => item.levelKey === this.currentUserLevel)
			return plan ? plan.rank : 0
		},
		canPurchaseActivePlan() {
			return this.activePlan.rank >= this.currentUserRank
		},
		buyButtonText() {
			if (this.isCurrentPlan(this.activePlan)) {
				return '立即续费'
			}
			if (!this.canPurchaseActivePlan) {
				return '当前等级不可降级购买'
			}
			return '立即购买'
		},
		currentLevelName() {
			const plan = this.plans.find((item) => item.levelKey === this.currentUserLevel)
			return plan ? `${plan.level} ${plan.name}` : '未开通会员'
		}
	},
	onLoad() {
		const currentLevelIndex = this.plans.findIndex((item) => item.levelKey === this.currentUserLevel)
		this.currentIndex = currentLevelIndex > -1 ? currentLevelIndex : 0
	},
	methods: {
		onPlanChange(event) {
			this.currentIndex = event.detail.current
		},
		isCurrentPlan(plan) {
			return plan.levelKey === this.currentUserLevel
		},
		buyMembership() {
			if (!this.canPurchaseActivePlan) {
				uni.showToast({
					title: '当前已是更高等级会员',
					icon: 'none'
				})
				return
			}
			uni.showToast({
				title: `已选择${this.activePlan.level}${this.activePlan.name}`,
				icon: 'none'
			})
		}
	}
}
</script>

<style>
.benefits-page {
	min-height: 100vh;
	padding: 28rpx 24rpx 190rpx;
	background: linear-gradient(180deg, #f5f8ff 0%, #fbfcff 42%, #ffffff 100%);
	box-sizing: border-box;
}

.hero {
	padding: 28rpx;
	border-radius: 24rpx;
	background: linear-gradient(135deg, #4158d0 0%, #6f86ff 48%, #8ea2ff 100%);
	color: #fff;
	box-shadow: 0 16rpx 36rpx rgba(54, 80, 194, 0.28);
}

.hero-top {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.hero-title {
	font-size: 34rpx;
	font-weight: 600;
}

.hero-current {
	padding: 8rpx 16rpx;
	border-radius: 999rpx;
	font-size: 22rpx;
	background: rgba(255, 255, 255, 0.2);
}

.hero-desc {
	margin-top: 14rpx;
	font-size: 24rpx;
	opacity: 0.95;
}

.plan-swiper {
	height: 290rpx;
	margin-top: 26rpx;
}

.plan-card {
	position: relative;
	height: 260rpx;
	margin: 0 10rpx;
	padding: 28rpx;
	border-radius: 26rpx;
	color: #fff;
	box-shadow: 0 10rpx 22rpx rgba(21, 31, 70, 0.14);
	overflow: hidden;
}

.plan-card::after {
	content: '';
	position: absolute;
	right: -70rpx;
	top: -70rpx;
	width: 200rpx;
	height: 200rpx;
	background: radial-gradient(circle, rgba(255, 255, 255, 0.26) 0%, rgba(255, 255, 255, 0) 68%);
}

.plan-header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 12rpx;
	margin-top: 8rpx;
}

.plan-name-wrap {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.plan-name {
	font-size: 30rpx;
	font-weight: 600;
	opacity: 0.96;
}

.plan-sub {
	font-size: 22rpx;
	opacity: 0.84;
}

.plan-level {
	font-size: 56rpx;
	font-weight: 700;
	line-height: 1;
}

.plan-price-wrap {
	margin-top: 32rpx;
	display: flex;
	align-items: baseline;
}

.price-sign {
	font-size: 28rpx;
}

.plan-price {
	font-size: 56rpx;
	font-weight: 700;
	line-height: 1;
	margin: 0 6rpx;
}

.price-unit {
	font-size: 24rpx;
	opacity: 0.9;
}

.current-tag {
	position: absolute;
	top: 0;
	left: 50%;
	transform: translate(-50%, -24%);
	padding: 9rpx 22rpx 14rpx;
	border-radius: 0 0 18rpx 18rpx;
	font-size: 20rpx;
	background: rgba(255, 255, 255, 0.26);
	border: 1px solid rgba(255, 255, 255, 0.45);
	border-top: none;
	box-shadow: 0 6rpx 12rpx rgba(16, 20, 43, 0.2);
}

.dots {
	margin-top: 2rpx;
	display: flex;
	justify-content: center;
	gap: 10rpx;
}

.dot {
	width: 14rpx;
	height: 14rpx;
	border-radius: 50%;
	background: #d2d8ea;
	transition: all 0.2s;
}

.dot.active {
	width: 34rpx;
	border-radius: 999rpx;
	background: #5b78ff;
}

.benefit-panel {
	margin-top: 22rpx;
	background: #fff;
	border-radius: 24rpx;
	padding: 26rpx 24rpx;
	box-shadow: 0 10rpx 28rpx rgba(24, 34, 76, 0.08);
}

.panel-title {
	font-size: 30rpx;
	font-weight: 600;
	color: #202538;
	margin-bottom: 20rpx;
}

.benefit-item {
	display: flex;
	align-items: center;
	gap: 12rpx;
	padding: 12rpx 0;
}

.benefit-text {
	font-size: 26rpx;
	color: #3d455b;
}

.buy-bar {
	position: fixed;
	left: 24rpx;
	right: 24rpx;
	bottom: 28rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 18rpx 18rpx 18rpx 24rpx;
	border-radius: 20rpx;
	background: rgba(20, 25, 43, 0.92);
	backdrop-filter: blur(10rpx);
	box-shadow: 0 10rpx 30rpx rgba(10, 13, 27, 0.34);
}

.buy-price {
	font-size: 30rpx;
	font-weight: 600;
	color: #ffffff;
}

.buy-btn {
	margin: 0;
	padding: 0 38rpx;
	height: 72rpx;
	line-height: 72rpx;
	border-radius: 999rpx;
	font-size: 28rpx;
	font-weight: 600;
	color: #2a1c03;
	background: linear-gradient(135deg, #ffd66f 0%, #ffebaf 100%);
}

.buy-btn.disabled {
	color: #717888;
	background: linear-gradient(135deg, #cfd5e6 0%, #e3e7f2 100%);
}

.buy-btn::after {
	border: none;
}
</style>
