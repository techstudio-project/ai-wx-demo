<template>
	<view class="recharge-page">
		<view class="hero">
			<view class="hero-title">积分充值</view>
			<view class="hero-desc">精选官方充值档位，实时到账，支持微信支付。</view>
		</view>

		<view class="grid-wrap">
			<view
				v-for="item in rechargeOptions"
				:key="item.amount"
				class="amount-card"
				:class="{ active: selectedAmount === item.amount }"
				@click="selectAmount(item.amount)"
			>
				<view class="amount">¥{{ item.amount }}</view>
				<view class="points">得 {{ item.points }} 积分</view>
				<view v-if="item.tag" class="tag">{{ item.tag }}</view>
			</view>
		</view>

		<view class="summary-card">
			<view class="row">
				<text class="label">充值金额</text>
				<text class="value">¥{{ selectedPlan.amount }}</text>
			</view>
			<view class="row">
				<text class="label">到账积分</text>
				<text class="value highlight">{{ selectedPlan.points }} 分</text>
			</view>
		</view>

		<view class="pay-bar">
			<view class="pay-info">实付 ¥{{ selectedPlan.amount }}</view>
			<button class="pay-btn" @click="payNow">立即支付</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			selectedAmount: 200,
			rechargeOptions: [
				{ amount: 100, points: 100, tag: '' },
				{ amount: 200, points: 210, tag: '热门' },
				{ amount: 300, points: 320, tag: '' },
				{ amount: 500, points: 550, tag: '推荐' },
				{ amount: 1000, points: 1150, tag: '超值' }
			]
		}
	},
	computed: {
		selectedPlan() {
			return this.rechargeOptions.find((item) => item.amount === this.selectedAmount) || this.rechargeOptions[0]
		}
	},
	methods: {
		selectAmount(amount) {
			this.selectedAmount = amount
		},
		payNow() {
			uni.showToast({
				title: `提交支付：¥${this.selectedPlan.amount}`,
				icon: 'none'
			})
		}
	}
}
</script>

<style>
.recharge-page {
	min-height: 100vh;
	padding: 28rpx 24rpx 180rpx;
	box-sizing: border-box;
	background: linear-gradient(180deg, #f5f8ff 0%, #fafbff 48%, #ffffff 100%);
}

.hero {
	padding: 28rpx;
	border-radius: 24rpx;
	background: linear-gradient(135deg, #4c62f5 0%, #6f83ff 100%);
	color: #fff;
	box-shadow: 0 14rpx 32rpx rgba(56, 78, 206, 0.28);
}

.hero-title {
	font-size: 34rpx;
	font-weight: 600;
}

.hero-desc {
	margin-top: 10rpx;
	font-size: 24rpx;
	opacity: 0.95;
}

.grid-wrap {
	margin-top: 24rpx;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16rpx;
}

.amount-card {
	position: relative;
	padding: 24rpx 18rpx;
	border-radius: 18rpx;
	background: #fff;
	border: 1px solid #e8ecf7;
	box-shadow: 0 8rpx 20rpx rgba(27, 39, 88, 0.05);
}

.amount-card.active {
	border-color: #4f6cff;
	background: linear-gradient(135deg, #eef2ff 0%, #f7f9ff 100%);
	box-shadow: 0 10rpx 26rpx rgba(56, 81, 206, 0.16);
}

.amount {
	font-size: 40rpx;
	font-weight: 700;
	color: #1f2333;
}

.points {
	margin-top: 8rpx;
	font-size: 24rpx;
	color: #697089;
}

.tag {
	position: absolute;
	top: 12rpx;
	right: 12rpx;
	padding: 4rpx 10rpx;
	border-radius: 999rpx;
	font-size: 20rpx;
	color: #3d4fd6;
	background: #e9eeff;
}

.summary-card {
	margin-top: 24rpx;
	padding: 22rpx;
	border-radius: 20rpx;
	background: #fff;
	box-shadow: 0 10rpx 26rpx rgba(24, 34, 76, 0.08);
}

.row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8rpx 0;
}

.label {
	font-size: 25rpx;
	color: #6d758d;
}

.value {
	font-size: 29rpx;
	font-weight: 600;
	color: #1f2333;
}

.value.highlight {
	color: #3f56f4;
}

.pay-bar {
	position: fixed;
	left: 24rpx;
	right: 24rpx;
	bottom: 28rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16rpx 16rpx 16rpx 22rpx;
	border-radius: 20rpx;
	background: rgba(18, 23, 39, 0.92);
	box-shadow: 0 10rpx 28rpx rgba(11, 14, 24, 0.34);
}

.pay-info {
	font-size: 30rpx;
	font-weight: 600;
	color: #fff;
}

.pay-btn {
	margin: 0;
	height: 72rpx;
	line-height: 72rpx;
	padding: 0 36rpx;
	border-radius: 999rpx;
	font-size: 28rpx;
	font-weight: 600;
	color: #2d2200;
	background: linear-gradient(135deg, #ffd66f 0%, #ffebb0 100%);
}

.pay-btn::after {
	border: none;
}
</style>
